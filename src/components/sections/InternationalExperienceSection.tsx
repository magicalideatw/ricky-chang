import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type ExperienceEntry = {
  title: string;
  role: string;
  detail?: string;
  featured?: boolean;
};

type ExperienceYearGroup = {
  year: string;
  entries: ExperienceEntry[];
};

const experienceGroups: ExperienceYearGroup[] = [
  {
    year: "2024",
    entries: [
      {
        title: "Taipei Magic Festival",
        role: "Guest Performer",
        detail: "Taipei, Taiwan",
      },
    ],
  },
  {
    year: "2019",
    entries: [
      {
        title: "The Magic Castle",
        role: "Performance",
        detail: "Hollywood, USA",
        featured: true,
      },
    ],
  },
  {
    year: "2017",
    entries: [
      {
        title: "Magic Castle Special Award",
        role: "International Award",
        detail: "Hollywood, USA",
      },
    ],
  },
  {
    year: "2015",
    entries: [
      {
        title: "FISM World Championship of Magic",
        role: "Taiwan Representative",
        detail: "International Federation of Magic Societies",
        featured: true,
      },
    ],
  },
  {
    year: "2014",
    entries: [
      {
        title: "Bangkok International Magic Competition",
        role: "1st Runner-Up",
        detail: "Bangkok, Thailand",
      },
    ],
  },
  {
    year: "2013",
    entries: [
      {
        title: "Beijing Magic Exchange",
        role: "Champion",
        detail: "International Magic Competition",
      },
    ],
  },
  {
    year: "2012",
    entries: [
      {
        title: "Magic Castle Special Award",
        role: "International Award",
        detail: "Hollywood, USA",
      },
      {
        title: "Malaysia International Magic Competition",
        role: "1st Runner-Up",
        detail: "Malaysia",
      },
      {
        title: "TMA Conference",
        role: "3rd Place",
      },
      {
        title: "Taiwan Magic Competition",
        role: "Champion",
        detail: "Taiwan",
      },
    ],
  },
  {
    year: "2011",
    entries: [
      {
        title: "Taiwan Magic Competition",
        role: "Professional Group Grand Champion",
        detail: "Taiwan",
      },
    ],
  },
];

const experienceRows = experienceGroups.flatMap((group) =>
  group.entries.map((entry, index) => ({
    ...entry,
    year: group.year,
    isFirstInYear: index === 0,
  })),
);

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
          {experienceRows.map((item, index) => (
            <ScrollReveal
              key={`${item.year}-${item.title}-${item.role}`}
              delay={index * 80}
            >
              <div
                className={`group grid gap-3 border-t border-white/10 transition-colors duration-500 hover:border-accent/30 md:grid-cols-[1fr_2fr] md:gap-12 lg:grid-cols-[1fr_1.5fr_1fr] ${
                  item.isFirstInYear ? "py-10 md:py-14" : "py-6 md:py-8"
                }`}
              >
                {item.isFirstInYear ? (
                  <p className="font-display text-xl font-light tracking-wide text-white/90 md:text-2xl lg:text-3xl">
                    {item.year}
                  </p>
                ) : (
                  <div aria-hidden="true" className="hidden md:block" />
                )}

                <div className={item.isFirstInYear ? "" : "md:col-start-2"}>
                  <p
                    className={`text-sm tracking-[0.2em] md:text-base ${
                      item.featured
                        ? "font-medium text-white"
                        : "font-medium text-white/90"
                    }`}
                  >
                    {item.title}
                  </p>
                  <p
                    className={`mt-1 text-xs tracking-[0.15em] md:text-sm ${
                      item.featured ? "text-white/60" : "text-white/45"
                    }`}
                  >
                    {item.role}
                  </p>
                </div>

                {item.detail ? (
                  <p className="text-xs tracking-[0.15em] text-white/40 md:text-right">
                    {item.detail}
                  </p>
                ) : (
                  <div aria-hidden="true" className="hidden lg:block" />
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
