import { Resend } from "resend";
import { NextResponse } from "next/server";
import { contactConfig, type ContactFormPayload } from "@/lib/contact-config";

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

function validatePayload(body: unknown): ContactFormPayload | null {
  if (!body || typeof body !== "object") return null;

  const { name, email, inquiryType, message } = body as Record<string, unknown>;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof inquiryType !== "string" ||
    typeof message !== "string"
  ) {
    return null;
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (!trimmedName || !trimmedEmail || !inquiryType || !trimmedMessage) {
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
  };
}

function buildEmailText(payload: ContactFormPayload, inquiryLabel: string): string {
  return [
    "新的聯絡詢問",
    "",
    `姓名：${payload.name}`,
    `Email：${payload.email}`,
    `合作類型：${inquiryLabel}`,
    "",
    "訊息內容：",
    payload.message,
  ].join("\n");
}

function buildEmailHtml(
  payload: ContactFormPayload,
  inquiryLabel: string
): string {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #111111;">
      <h2 style="margin: 0 0 24px; font-size: 20px; font-weight: 400; letter-spacing: 0.04em;">
        新的聯絡詢問
      </h2>
      <p style="margin: 0 0 12px;"><strong>姓名</strong><br />${escapeHtml(payload.name)}</p>
      <p style="margin: 0 0 12px;"><strong>Email</strong><br />${escapeHtml(payload.email)}</p>
      <p style="margin: 0 0 12px;"><strong>合作類型</strong><br />${escapeHtml(inquiryLabel)}</p>
      <p style="margin: 0 0 8px;"><strong>訊息內容</strong></p>
      <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(payload.message)}</p>
    </div>
  `.trim();
}

export async function POST(request: Request) {
  try {
    const payload = validatePayload(await request.json());

    if (!payload) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFromEmail = process.env.RESEND_FROM_EMAIL;

    if (!resendApiKey || !resendFromEmail) {
      return NextResponse.json(
        {
          error:
            "Contact form email service is not configured yet. Please set RESEND_API_KEY and RESEND_FROM_EMAIL.",
        },
        { status: 503 }
      );
    }

    const inquiryLabel = getInquiryTypeLabel(payload.inquiryType);
    const resend = new Resend(resendApiKey);

    const { error } = await resend.emails.send({
      from: resendFromEmail,
      to: contactConfig.recipientEmail,
      replyTo: payload.email,
      subject: `【Ricky Chang Website】新的聯絡詢問｜${inquiryLabel}`,
      html: buildEmailHtml(payload, inquiryLabel),
      text: buildEmailText(payload, inquiryLabel),
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { error: "Unable to send your message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Unable to send your message. Please try again." },
      { status: 500 }
    );
  }
}
