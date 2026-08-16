import { LazyYouTubeEmbed } from "@/components/ui/LazyYouTubeEmbed";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredPerformances } from "@/lib/featured-performances";

export function FeaturedPerformancesSection() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="bg-neutral-50"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32 lg:px-16 lg:py-40">
        <ScrollReveal>
          <SectionHeading id="work-heading" className="mb-6 md:mb-8">
            FEATURED PERFORMANCES
          </SectionHeading>
          <p className="font-chinese mb-4 text-base font-light tracking-wide text-muted md:text-lg">
            精選演出
          </p>
          <p className="font-chinese mb-12 max-w-xl text-sm font-light leading-relaxed tracking-wide text-muted md:mb-16 md:text-base">
            張煜晟 Ricky Chang
            的魔術演出與舞台魔術作品。舞台上的每一次演出，都是讓不可能發生的瞬間。
          </p>
        </ScrollReveal>

        <div className="space-y-16">
          {featuredPerformances.map((performance, index) => (
            <ScrollReveal
              key={performance.youtubeId}
              delay={150 + index * 80}
            >
              <article aria-labelledby={`performance-title-${performance.youtubeId}`}>
                <LazyYouTubeEmbed
                  youtubeId={performance.youtubeId}
                  title={performance.seoTitle}
                />
                <p className="sr-only">{performance.seoDescription}</p>

                <div
                  id={`performance-title-${performance.youtubeId}`}
                  className="mt-6 md:mt-8"
                >
                  <p className="text-[10px] font-medium tracking-[0.3em] text-foreground uppercase md:text-xs">
                    {performance.title}
                  </p>
                  {performance.subtitleEn ? (
                    <>
                      <p className="font-chinese mt-2 text-sm font-light tracking-wide text-foreground/85 md:text-base">
                        {performance.subtitle}
                      </p>
                      <p className="mt-1 text-[10px] font-medium tracking-[0.25em] text-muted uppercase md:text-xs">
                        {performance.subtitleEn}
                      </p>
                    </>
                  ) : (
                    <p className="mt-1 text-[10px] font-medium tracking-[0.25em] text-muted uppercase md:text-xs">
                      {performance.subtitle}
                    </p>
                  )}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
