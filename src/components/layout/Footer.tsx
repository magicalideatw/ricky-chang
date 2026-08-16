import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-16 text-center md:px-10 lg:px-16">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.3em]">RICKY CHANG</p>
          <p className="font-chinese text-sm font-light tracking-widest text-muted">
            張煜晟
          </p>
          <p className="text-[11px] tracking-[0.2em] text-muted">
            {siteConfig.tagline}
          </p>
        </div>

        <div className="flex items-center gap-8">
          {siteConfig.socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-[0.2em] text-muted transition-opacity duration-300 hover:opacity-50"
            >
              {link.label}
            </a>
          ))}
        </div>

        <p className="text-[10px] tracking-[0.15em] text-muted/70">
          Copyright © {new Date().getFullYear()} Ricky Chang
        </p>
      </div>
    </footer>
  );
}
