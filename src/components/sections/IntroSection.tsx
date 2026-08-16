import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const aboutPortrait = {
  src: "/images/02.jpg",
  alt: "張煜晟 Ricky Chang 舞台魔術漂浮酒杯表演",
};

const chineseParagraphs = [
  "張煜晟（Ricky Chang）是一名台灣舞台魔術師、表演者與創作者，長期投入魔術、舞台表演與藝術教育，致力於以視覺、戲劇與舞台語言創造獨特的表演作品。",
  "14 歲開始接觸魔術，從對魔術的熱愛一路走上專業舞台。",
  "以鮮明的個人風格與獨特的表演元素，持續探索魔術在舞台上的不同可能。代表作品《魔幻調酒狂想》，融合魔術、音樂與舞台表演，成為具代表性的演出作品。",
  "亦多次受邀擔任國內外魔術大會及活動演出嘉賓，將舞台魔術帶到不同城市與舞台。",
  "對 Ricky 而言，魔術不只是技巧，而是結合視覺、戲劇、創意與舞台的藝術。",
] as const;

const englishParagraphs = [
  "Ricky Chang is a Taiwanese stage magician, performer, and creator who has devoted himself to magic, stage performance, and arts education.",
  "Since discovering magic at the age of 14, Ricky has developed a distinctive performance style that combines visual magic, theatrical expression, and stage language to create unique performance works.",
  "His signature act, “Bartender Magic,” blends magic, music, and theatrical performance, and has become one of his representative works.",
  "Ricky has been invited to perform at magic conventions and events in Taiwan and around the world.",
  "For Ricky, magic is more than a technique. It is an art form shaped by visual storytelling, theatrical expression, creativity, and the stage.",
] as const;

function AboutPortrait({ className = "" }: { className?: string }) {
  return (
    <div
      className={`group relative w-full overflow-hidden bg-neutral-100 ${className}`}
    >
      <Image
        src={aboutPortrait.src}
        alt={aboutPortrait.alt}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        style={{ objectPosition: "52% 42%" }}
        sizes="(max-width: 1024px) 100vw, 42vw"
      />
    </div>
  );
}

function ChineseBrandQuote({ className = "" }: { className?: string }) {
  return (
    <blockquote
      className={`font-chinese text-lg font-light leading-relaxed tracking-wide text-foreground/85 md:text-xl lg:text-2xl ${className}`}
    >
      <span className="font-display block italic leading-snug">
        讓不可思議，成為舞台上值得記住的瞬間。
      </span>
    </blockquote>
  );
}

export function IntroSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-white px-6 py-24 md:px-10 md:py-32 lg:px-16 lg:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <div className="lg:grid lg:grid-cols-[11fr_9fr] lg:items-start lg:gap-16 xl:gap-20">
          <div className="space-y-10 lg:space-y-12">
            <ScrollReveal>
              <SectionHeading id="about-heading" className="mb-4 md:mb-5">
                ABOUT RICKY
              </SectionHeading>
              <p className="font-chinese text-sm font-light tracking-wide text-muted md:text-base">
                關於 Ricky
              </p>
              <h3 className="font-display mt-8 text-2xl font-light tracking-wide md:text-3xl lg:text-4xl">
                張煜晟 Ricky Chang
              </h3>
              <p className="font-chinese mt-3 text-sm font-light tracking-wide text-muted md:text-base">
                舞台魔術師｜表演者｜創作者
              </p>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="space-y-5">
                {chineseParagraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 12)}
                    className="font-chinese text-sm font-light leading-[2] tracking-wide text-foreground/80 md:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="space-y-5 border-t border-border pt-10">
                {englishParagraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 24)}
                    className="text-sm font-light leading-[1.9] tracking-wide text-foreground/75 md:text-base"
                  >
                    {paragraph}
                  </p>
                ))}

                <p className="font-display pt-4 text-lg italic leading-relaxed tracking-wide text-foreground/85 md:text-xl">
                  &ldquo;Magic is not just about the impossible.
                  <br className="hidden sm:block" />
                  It is about creating a performance people remember.&rdquo;
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200} className="lg:hidden">
              <AboutPortrait className="aspect-[4/3]" />
            </ScrollReveal>
          </div>

          <div className="hidden lg:block lg:pt-[5.75rem]">
            <ScrollReveal delay={100}>
              <AboutPortrait className="aspect-[4/5] max-h-[720px]" />
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal delay={250} className="mt-12 md:mt-16">
          <ChineseBrandQuote className="border-t border-border pt-10 md:pt-12" />
        </ScrollReveal>
      </div>
    </section>
  );
}
