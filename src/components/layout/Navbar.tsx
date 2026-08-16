"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { navLinks } from "@/lib/site-config";
import { useHeroOpening } from "@/context/HeroOpeningContext";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const { showNavbar } = useHeroOpening();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? "bg-white/90 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        } ${showNavbar ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-18 md:px-10 lg:px-16">
          <Link
            href="/"
            className={`text-xs font-medium tracking-[0.3em] transition-colors duration-300 ${
              scrolled || menuOpen ? "text-foreground" : "text-white"
            }`}
          >
            RICKY CHANG
          </Link>

          <ul className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`text-[11px] font-medium tracking-[0.25em] transition-all duration-300 hover:opacity-60 ${
                    scrolled ? "text-foreground" : "text-white/90"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className={`relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden ${
              scrolled || menuOpen ? "text-foreground" : "text-white"
            }`}
          >
            <span
              className={`block h-px w-5 bg-current transition-all duration-300 ${
                menuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-current transition-all duration-300 ${
                menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
