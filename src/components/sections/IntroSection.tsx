import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const aboutImage = {
  src: "/images/hero-placeholder.svg",
  alt: "張煜晟 Ricky Chang｜台灣舞台魔術師 Stage Magician",
};

const careerHighlights = [
  { value: "20+", label: "YEARS OF MAGIC" },
  { value: "FISM 2015", label: "TAIWAN REPRESENTATIVE" },
  { value: "THE MAGIC CASTLE", label: "PERFORMER · 2019" },
] as const;

const chineseParagraphs = [
  "張煜晟（Ricky Chang）是一名台灣舞台魔術師、表演者與創作者，長期投入魔術、舞台表演與藝術教育，致力於以視覺、戲劇與舞台語言創造獨特的表演作品。",
  "14 歲開始接觸魔術，從對魔術的熱愛一路走上專業舞台。",
  "以鮮明的個人風格與獨特的表演元素，持續探索魔術在舞台上的不同可能。代表作品《魔幻調酒狂想》，融合魔術、音樂與舞台表演，成為具代表性的演出作品。",
  "多年來參與國內外魔術競賽並屢獲佳績，亦多次受邀擔任國內外魔術大會及活動演出嘉賓，將舞台魔術帶到不同城市與舞台。",
  "對 Ricky 而言，魔術不只是技巧，而是結合視覺、戲劇、創意與舞台的藝術。",
] as const;

const englishParagraphs = [
  "Ricky Chang is a Taiwanese stage magician, performer, and creator who has devoted himself to magic, stage performance, and arts education.",
  "Since discovering magic at the age of 14, Ricky has developed a distinctive performance style that combines visual magic, theatrical expression, and stage language to create unique performance works.",
  "His signature act, “Bartender Magic,” blends magic, music, and theatrical performance, and has become one of his representative works.",
  "Over the years, Ricky has received recognition in numerous magic competitions and has been invited to perform at magic conventions and events in Taiwan and around the world.",
  "For Ricky, magic is more than a technique. It is an art form shaped by visual storytelling, theatrical expression, creativity, and the stage.",
] as const;

function AboutPhoto({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-[3/4] w-full overflow-hidden ${className}`}>
      <ImagePlaceholder
        src={aboutImage.src}
        alt={aboutImage.alt}
        className="absolute inset-0"
        objectPosition="center top"
      />
    </div>
  );
}

function CareerHighlights({ className = "" }: { className?: string }) {
  return (
    <div className={`space-y-8 border-t border-border pt-8 ${className}`}>
      {careerHighlights.map((item) => (
        <div key={item.label} className="space-y-2">
          <p className="font-display text-3xl font-light tracking-wide md:text-4xl">
            {item.value}
          </p>
          <p className="text-[10px] font-medium tracking-[0.28em] text-muted uppercase">
            {item.label}
          </p>
        </div>
      ))}
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
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-16 xl:gap-24">
          <div className="space-y-10 lg:space-y-12">
            <ScrollReveal>
              <SectionHeading id="about-heading" className="mb-4 md:mb-5">ABOUT RICKY</SectionHeading>
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

            <ScrollReveal delay={100} className="lg:hidden">
              <AboutPhoto />
            </ScrollReveal>

            <ScrollReveal delay={150}>
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

            <ScrollReveal delay={200}>
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

            <ScrollReveal delay={250} className="lg:hidden">
              <CareerHighlights />
            </ScrollReveal>

            <ScrollReveal delay={300} className="hidden lg:block">
              <ChineseBrandQuote />
            </ScrollReveal>
          </div>

          <div className="hidden space-y-10 lg:block lg:space-y-12">
            <ScrollReveal delay={100}>
              <AboutPhoto />
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <CareerHighlights />
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal delay={300} className="mt-12 lg:hidden">
          <ChineseBrandQuote />
        </ScrollReveal>
      </div>
    </section>
  );
}
