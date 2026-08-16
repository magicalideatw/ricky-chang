"use client";

import { useState } from "react";
import { ContactModal } from "@/components/ui/ContactModal";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ContactSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="border-t border-border bg-neutral-50 px-6 py-24 md:px-10 md:py-32 lg:px-16 lg:py-40"
      >
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2
              id="contact-heading"
              className="font-display mb-6 text-3xl font-light tracking-wide md:text-4xl lg:text-5xl"
            >
              LET&apos;S CREATE SOMETHING.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="font-chinese mb-12 text-sm font-light leading-relaxed tracking-wide text-muted md:mb-16 md:text-base">
              演出、藝術合作、創作、教育與其他合作邀約。
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-block border border-foreground px-10 py-4 text-[10px] font-medium tracking-[0.35em] transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground hover:text-white md:text-xs"
            >
              CONTACT RICKY
            </button>
          </ScrollReveal>
        </div>
      </section>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
