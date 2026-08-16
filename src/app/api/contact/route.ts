import { Resend } from "resend";
import { NextResponse } from "next/server";
import {
  contactConfig,
  type ContactFormPayload,
  type ContactRequestBody,
} from "@/lib/contact-config";

const GENERIC_ERROR = "訊息送出失敗，請稍後再試。";
const TURNSTILE_ERROR = "安全驗證失敗，請重新嘗試。";

type TurnstileVerifyResponse = {
  success: boolean;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getInquiryTypeLabel(inquiryType: string): string {
  return (
    contactConfig.inquiryTypes.find((type) => type.value === inquiryType)
      ?.label ?? inquiryType
  );
}

function getClientIp(request: Request): string | undefined {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }

  return request.headers.get("x-real-ip")?.trim() || undefined;
}

function validatePayload(body: unknown): ContactRequestBody | null {
  if (!body || typeof body !== "object") return null;

  const record = body as Record<string, unknown>;
  const { name, email, inquiryType, message, turnstileToken, website } = record;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof inquiryType !== "string" ||
    typeof message !== "string" ||
    typeof turnstileToken !== "string"
  ) {
    return null;
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();
  const trimmedToken = turnstileToken.trim();
  const honeypot =
    typeof website === "string" ? website.trim() : "";

  if (
    !trimmedName ||
    !trimmedEmail ||
    !inquiryType ||
    !trimmedMessage ||
    !trimmedToken
  ) {
    return null;
  }

  if (
    trimmedName.length > contactConfig.fieldLimits.name ||
    trimmedEmail.length > contactConfig.fieldLimits.email ||
    trimmedMessage.length > contactConfig.fieldLimits.message
  ) {
    return null;
  }

  if (!isValidEmail(trimmedEmail)) return null;

  const validInquiry = contactConfig.inquiryTypes.some(
    (type) => type.value === inquiryType
  );

  if (!validInquiry) return null;

  return {
    name: trimmedName,
    email: trimmedEmail,
    inquiryType,
    message: trimmedMessage,
    turnstileToken: trimmedToken,
    website: honeypot,
  };
}

async function verifyTurnstileToken(
  token: string,
  remoteIp?: string
): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.error("Turnstile secret key is not configured.");
    return false;
  }

  const params = new URLSearchParams({
    secret: secretKey,
    response: token,
  });

  if (remoteIp) {
    params.set("remoteip", remoteIp);
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      }
    );

    if (!response.ok) {
      console.error("Turnstile verification request failed.");
      return false;
    }

    const result = (await response.json()) as TurnstileVerifyResponse;
    return result.success === true;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
}

function buildEmailText(payload: ContactFormPayload, subjectLabel: string): string {
  return [
    "網站聯絡表單通知",
    "",
    `姓名：${payload.name}`,
    `Email：${payload.email}`,
    `合作類型：${subjectLabel}`,
    "",
    "訊息內容：",
    payload.message,
  ].join("\n");
}

function buildEmailHtml(
  payload: ContactFormPayload,
  subjectLabel: string
): string {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #111111;">
      <h2 style="margin: 0 0 24px; font-size: 20px; font-weight: 400; letter-spacing: 0.04em;">
        網站聯絡表單通知
      </h2>
      <p style="margin: 0 0 12px;"><strong>姓名</strong><br />${escapeHtml(payload.name)}</p>
      <p style="margin: 0 0 12px;"><strong>Email</strong><br />${escapeHtml(payload.email)}</p>
      <p style="margin: 0 0 12px;"><strong>合作類型</strong><br />${escapeHtml(subjectLabel)}</p>
      <p style="margin: 0 0 8px;"><strong>訊息內容</strong></p>
      <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(payload.message)}</p>
    </div>
  `.trim();
}

export async function POST(request: Request) {
  try {
    const body = validatePayload(await request.json());

    if (!body) {
      return NextResponse.json(
        { error: "請完整填寫所有必填欄位。" },
        { status: 400 }
      );
    }

    if (body.website) {
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 });
    }

    const turnstileValid = await verifyTurnstileToken(
      body.turnstileToken,
      getClientIp(request)
    );

    if (!turnstileValid) {
      return NextResponse.json({ error: TURNSTILE_ERROR }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error("Resend API key is not configured.");
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 503 });
    }

    const { turnstileToken: _token, website: _website, ...payload } = body;
    const subjectLabel = getInquiryTypeLabel(payload.inquiryType);
    const resend = new Resend(resendApiKey);

    const { error } = await resend.emails.send({
      from: contactConfig.fromEmail,
      to: contactConfig.recipientEmail,
      replyTo: payload.email,
      subject: `【網站聯絡表單】${subjectLabel}`,
      html: buildEmailHtml(payload, subjectLabel),
      text: buildEmailText(payload, subjectLabel),
    });

    if (error) {
      console.error("Resend API error:", {
        name: error.name,
        message: error.message,
        statusCode: "statusCode" in error ? error.statusCode : undefined,
      });
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
  }
}
