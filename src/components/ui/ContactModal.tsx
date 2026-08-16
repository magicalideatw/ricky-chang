"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { contactConfig } from "@/lib/contact-config";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

const initialFormState = {
  name: "",
  email: "",
  inquiryType: contactConfig.inquiryTypes[0].value as string,
  message: "",
};

const fieldClassName =
  "w-full border border-foreground/15 bg-white px-4 py-3 text-sm font-light tracking-wide text-foreground outline-none transition-colors duration-300 focus:border-foreground/40";

const labelClassName =
  "mb-2 block text-[10px] font-medium tracking-[0.28em] text-foreground uppercase";

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const titleId = useId();
  const [formState, setFormState] = useState(initialFormState);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

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
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(
          data.error ?? "Unable to send your message. Please try again."
        );
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Unable to send your message. Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-5 py-8 md:px-6"
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
        className="relative z-[101] w-full max-w-[600px] border border-foreground bg-white px-6 py-8 animate-fade-in md:px-10 md:py-10"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          disabled={status === "submitting"}
          className="absolute top-5 right-5 text-lg leading-none text-foreground/50 transition-colors duration-300 hover:text-foreground disabled:cursor-not-allowed"
        >
          ×
        </button>

        {status === "success" ? (
          <div className="space-y-8 pt-2">
            <div className="space-y-4">
              <h2
                id={titleId}
                className="font-display text-2xl font-light tracking-wide md:text-3xl"
              >
                THANK YOU.
              </h2>
              <p className="font-chinese text-sm font-light leading-relaxed tracking-wide text-muted md:text-base">
                已收到你的訊息，Ricky 會盡快與你聯絡。
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-block border border-foreground px-10 py-4 text-[10px] font-medium tracking-[0.35em] transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground hover:text-white md:text-xs"
            >
              CLOSE
            </button>
          </div>
        ) : (
          <div className="space-y-8 pt-2">
            <div className="space-y-4 pr-8">
              <h2
                id={titleId}
                className="font-display text-2xl font-light tracking-wide md:text-3xl"
              >
                GET IN TOUCH
              </h2>
              <p className="font-chinese text-sm font-light leading-relaxed tracking-wide text-muted md:text-base">
                演出、藝術合作、創作、教育與其他合作邀約，歡迎與 Ricky 聯絡。
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
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
                  rows={6}
                  value={formState.message}
                  onChange={(event) =>
                    setFormState((current) => ({
                      ...current,
                      message: event.target.value,
                    }))
                  }
                  className={`${fieldClassName} min-h-[160px] resize-y`}
                />
              </div>

              {status === "error" && errorMessage ? (
                <p className="font-chinese text-sm font-light leading-relaxed text-foreground/70">
                  {errorMessage}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-block border border-foreground px-10 py-4 text-[10px] font-medium tracking-[0.35em] transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground hover:text-white disabled:cursor-not-allowed disabled:opacity-50 md:text-xs"
              >
                {status === "submitting" ? "SENDING..." : "SEND INQUIRY"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
