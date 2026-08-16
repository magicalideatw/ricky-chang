import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const experiences = [
  {
    year: "FISM 2015",
    title: "Taiwan Representative",
    detail: "International Federation of Magic Societies",
  },
  {
    year: "The Magic Castle",
    title: "Special Award · 2012 / 2017",
    detail: "Hollywood, USA",
  },
  {
    year: "Taipei Magic Festival · 2024",
    title: "Guest Performer",
    detail: "Taipei, Taiwan",
  },
  {
    year: "Beijing Magic Exchange · 2013",
    title: "Champion",
    detail: "International Magic Competition",
  },
  {
    year: "Bangkok International Magic Competition · 2014",
    title: "1st Runner-Up",
    detail: "Bangkok, Thailand",
  },
  {
    year: "Malaysia Magic Extravaganza · 2012",
    title: "1st Runner-Up",
    detail: "Malaysia",
  },
] as const;

export function InternationalExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="bg-neutral-950 px-6 py-24 text-white md:px-10 md:py-32 lg:px-16 lg:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <SectionHeading id="experience-heading" className="mb-16 text-white/80 md:mb-20">
            INTERNATIONAL EXPERIENCE
          </SectionHeading>
        </ScrollReveal>

        <div className="space-y-0">
          {experiences.map((item, index) => (
            <ScrollReveal key={item.year} delay={index * 100}>
              <div className="group grid gap-4 border-t border-white/10 py-10 transition-colors duration-500 hover:border-accent/30 md:grid-cols-[1fr_2fr] md:gap-12 md:py-14 lg:grid-cols-[1fr_1.5fr_1fr]">
                <p className="font-display text-xl font-light tracking-wide text-white/90 md:text-2xl lg:text-3xl">
                  {item.year}
                </p>
                <div>
                  <p className="text-sm font-medium tracking-[0.2em] md:text-base">
                    {item.title}
                  </p>
                </div>
                <p className="text-xs tracking-[0.15em] text-white/40 md:text-right">
                  {item.detail}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
