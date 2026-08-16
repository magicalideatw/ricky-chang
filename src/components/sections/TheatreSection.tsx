import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TheatreSection() {
  return (
    <section className="bg-white px-6 py-24 md:px-10 md:py-32 lg:px-16 lg:py-40">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20 xl:gap-24">
        <ScrollReveal className="order-2 lg:order-1">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-50">
            <Image
              src="/images/05.jpg"
              alt="張煜晟 Ricky Chang 與晟心誠藝劇團舞台演出"
              fill
              className="theatre-photo object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150} className="order-1 lg:order-2">
          <div className="space-y-8 lg:space-y-10 lg:pl-4">
            <SectionHeading>THEATRE</SectionHeading>

            <div className="space-y-4">
              <h3 className="font-chinese text-2xl font-light tracking-widest md:text-3xl">
                晟心誠藝劇團
              </h3>
              <p className="text-xs tracking-[0.25em] text-muted">
                Artistic Director
              </p>
            </div>

            <p className="font-chinese max-w-md text-sm font-light leading-[2] tracking-wide text-foreground/70 md:text-base">
              以魔術、戲劇與舞蹈為核心，
              <br className="hidden sm:block" />
              創作舞台作品，並投入藝術教育與表演培訓。
            </p>

            <a
              href="https://chengart.tw/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-b border-foreground/20 pb-1 text-[10px] font-medium tracking-[0.3em] text-foreground/60 transition-all duration-300 hover:border-accent hover:text-accent"
            >
              EXPLORE THE THEATRE
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
