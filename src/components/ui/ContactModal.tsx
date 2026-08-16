"use client";

import {
  useCallback,
  useEffect,
  useId,
  useState,
  type FormEvent,
} from "react";
import { TurnstileWidget } from "@/components/ui/TurnstileWidget";
import { contactConfig } from "@/lib/contact-config";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

const initialFormState = {
  name: "",
  email: "",
  inquiryType: contactConfig.inquiryTypes[0].value as string,
  message: "",
  website: "",
};

const fieldClassName =
  "h-11 w-full border border-foreground/15 bg-white px-3 py-2 text-sm font-light tracking-wide text-foreground outline-none transition-colors duration-300 focus:border-foreground/40";

const textareaClassName =
  "h-[128px] min-h-[120px] max-h-[140px] w-full resize-none border border-foreground/15 bg-white px-3 py-2 text-sm font-light tracking-wide text-foreground outline-none transition-colors duration-300 focus:border-foreground/40";

const labelClassName =
  "mb-1.5 block text-[10px] font-medium tracking-[0.28em] text-foreground uppercase";

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const titleId = useId();
  const [formState, setFormState] = useState(initialFormState);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const resetTurnstile = useCallback(() => {
    setTurnstileToken("");
    setTurnstileKey((current) => current + 1);
  }, []);

  const handleTurnstileSuccess = useCallback((token: string) => {
    setTurnstileToken(token);
    setErrorMessage((current) =>
      current === "請完成安全驗證後再送出。" ||
      current === "安全驗證失敗，請重新整理後再試一次。" ||
      current === "安全驗證失敗，請重新嘗試。"
        ? ""
        : current
    );
  }, []);

  const handleTurnstileError = useCallback(() => {
    setTurnstileToken("");
    setErrorMessage("安全驗證失敗，請重新整理後再試一次。");
  }, []);

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken("");
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setFormState(initialFormState);
      setTurnstileToken("");
      setTurnstileKey((current) => current + 1);
      setStatus("idle");
      setErrorMessage("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = () => {
    if (status !== "submitting") onClose();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "submitting" || status === "success") return;

    if (formState.website.trim()) {
      setStatus("error");
      setErrorMessage("訊息送出失敗，請稍後再試。");
      return;
    }

    if (!turnstileToken) {
      setStatus("error");
      setErrorMessage("請完成安全驗證後再送出。");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          inquiryType: formState.inquiryType,
          message: formState.message,
          website: formState.website,
          turnstileToken,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus("error");

        if (data.error === "安全驗證失敗，請重新嘗試。") {
          setErrorMessage("安全驗證失敗，請重新嘗試。");
          resetTurnstile();
          return;
        }

        setErrorMessage("訊息送出失敗，請稍後再試。");
        resetTurnstile();
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("訊息送出失敗，請稍後再試。");
      resetTurnstile();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 md:px-6 md:py-8"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close contact form"
        className="absolute inset-0 bg-black/20 animate-fade-in"
        onClick={handleBackdropClick}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative isolate z-[101] flex w-[calc(100%-32px)] max-w-[640px] flex-col overflow-hidden border border-foreground bg-white p-6 animate-fade-in md:max-h-[min(85vh,760px)] md:w-full md:max-w-[660px] md:p-10 max-h-[90vh]"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={(event) => {
            event.stopPropagation();
            if (status !== "submitting") onClose();
          }}
          disabled={status === "submitting"}
          className="absolute top-3 right-3 z-[110] flex h-10 w-10 items-center justify-center text-xl leading-none text-foreground/50 pointer-events-auto transition-colors duration-300 hover:bg-foreground/5 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
        >
          ×
        </button>

        {status === "success" ? (
          <div className="relative z-0 flex min-h-0 flex-1 flex-col justify-center space-y-6 pt-1">
            <div className="space-y-3 pr-8">
              <h2
                id={titleId}
                className="font-display text-xl font-light tracking-wide md:text-2xl"
              >
                THANK YOU.
              </h2>
              <p className="font-chinese text-xs font-light leading-relaxed tracking-wide text-muted md:text-sm">
                訊息已成功送出，我們會盡快與您聯絡。
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-[50px] items-center justify-center border border-foreground px-10 text-[10px] font-medium tracking-[0.35em] transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground hover:text-white md:text-xs"
            >
              CLOSE
            </button>
          </div>
        ) : (
          <>
            <div className="relative z-0 shrink-0 pr-10">
              <h2
                id={titleId}
                className="font-display text-xl font-light tracking-wide md:text-2xl"
              >
                GET IN TOUCH
              </h2>
              <p className="font-chinese mt-2 text-xs font-light leading-relaxed tracking-wide text-muted md:text-sm">
                演出、藝術合作、創作、教育與其他合作邀約，歡迎與 Ricky 聯絡。
              </p>
            </div>

            <div className="relative z-0 mt-4 min-h-0 flex-1 overflow-y-auto overflow-x-hidden md:mt-5">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="absolute left-[-9999px] h-px w-px overflow-hidden opacity-0">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formState.website}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        website: event.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <label htmlFor="contact-name" className={labelClassName}>
                    姓名
                    <span className="ml-2 tracking-[0.2em] text-muted">Name</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    maxLength={contactConfig.fieldLimits.name}
                    autoComplete="name"
                    value={formState.name}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    className={fieldClassName}
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className={labelClassName}>
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    maxLength={contactConfig.fieldLimits.email}
                    autoComplete="email"
                    value={formState.email}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    className={fieldClassName}
                  />
                </div>

                <div>
                  <label htmlFor="contact-inquiry" className={labelClassName}>
                    合作類型
                    <span className="ml-2 tracking-[0.2em] text-muted">
                      Type of Inquiry
                    </span>
                  </label>
                  <select
                    id="contact-inquiry"
                    name="inquiryType"
                    required
                    value={formState.inquiryType}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        inquiryType: event.target.value,
                      }))
                    }
                    className={`${fieldClassName} appearance-none`}
                  >
                    {contactConfig.inquiryTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className={labelClassName}>
                    訊息
                    <span className="ml-2 tracking-[0.2em] text-muted">
                      Message
                    </span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    maxLength={contactConfig.fieldLimits.message}
                    value={formState.message}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        message: event.target.value,
                      }))
                    }
                    className={textareaClassName}
                  />
                </div>

                {turnstileSiteKey ? (
                  <div className="-mt-1">
                    <TurnstileWidget
                      key={turnstileKey}
                      siteKey={turnstileSiteKey}
                      onSuccess={handleTurnstileSuccess}
                      onError={handleTurnstileError}
                      onExpire={handleTurnstileExpire}
                    />
                  </div>
                ) : null}

                {status === "error" && errorMessage ? (
                  <p className="font-chinese text-xs font-light leading-relaxed text-foreground/70 md:text-sm">
                    {errorMessage}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex h-[50px] w-full items-center justify-center border border-foreground text-[10px] font-medium tracking-[0.35em] transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground hover:text-white disabled:cursor-not-allowed disabled:opacity-50 md:text-xs"
                >
                  {status === "submitting" ? "寄送中..." : "SEND INQUIRY"}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
