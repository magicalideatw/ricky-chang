"use client";

import { navLinks } from "@/lib/site-config";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <div
      className={`fixed inset-0 z-40 bg-white transition-all duration-500 md:hidden ${
        open ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <nav className="flex h-full flex-col items-center justify-center gap-10">
        {navLinks.map((link, index) => (
          <a
            key={link.label}
            href={link.href}
            onClick={onClose}
            className="text-sm font-medium tracking-[0.3em] text-foreground transition-all duration-300 hover:opacity-50"
            style={{ transitionDelay: open ? `${index * 60}ms` : "0ms" }}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
