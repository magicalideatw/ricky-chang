import { ScrollReveal } from "@/components/ui/ScrollReveal";

const identities = [
  {
    title: "MAGICIAN",
    titleZh: "舞台魔術師",
    description: "以精準的手法與舞台語言，呈現視覺與心理交織的魔術藝術。",
  },
  {
    title: "PERFORMER",
    titleZh: "表演者",
    description: "融合戲劇、音樂與身體，在舞台上建構完整的表演體驗。",
  },
  {
    title: "CREATOR",
    titleZh: "創作者",
    description: "跨足魔術、戲劇與教育，持續探索表演藝術的創作可能。",
  },
] as const;

export function IdentitySection() {
  return (
    <section className="border-y border-border bg-white px-6 py-24 md:px-10 md:py-32 lg:px-16 lg:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-3 md:gap-12 lg:gap-16">
        {identities.map((identity, index) => (
          <ScrollReveal key={identity.title} delay={index * 100}>
            <div className="group space-y-4 md:space-y-5">
              <div className="h-px w-8 bg-accent transition-all duration-500 group-hover:w-12" />
              <h3 className="text-xs font-medium tracking-[0.3em]">
                {identity.title}
              </h3>
              <p className="font-chinese text-sm font-light tracking-widest text-muted">
                {identity.titleZh}
              </p>
              <p className="font-chinese text-sm font-light leading-relaxed text-foreground/70">
                {identity.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
