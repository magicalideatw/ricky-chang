"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stageMagicPhotos } from "@/lib/stage-magic-photos";

type PhotoTileProps = {
  index: number;
  className?: string;
  imageClassName?: string;
  sizes: string;
  priority?: boolean;
  onOpen: (index: number) => void;
};

function PhotoTile({
  index,
  className = "",
  imageClassName = "",
  sizes,
  priority = false,
  onOpen,
}: PhotoTileProps) {
  const photo = stageMagicPhotos[index];

  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      className={`group relative block w-full overflow-hidden bg-neutral-100 text-left ${className}`}
      aria-label={`View stage magic photo ${index + 1}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority={priority}
        className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${imageClassName}`}
        sizes={sizes}
      />
      <div
        className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10"
        aria-hidden="true"
      />
    </button>
  );
}

export function StageMagicSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <section
        id="stage-magic"
        aria-labelledby="stage-magic-heading"
        className="bg-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32 lg:px-16 lg:py-40">
          <ScrollReveal>
            <SectionHeading id="stage-magic-heading" className="mb-6 md:mb-8">
              STAGE MAGIC
            </SectionHeading>
            <p className="font-chinese mb-4 text-base font-light tracking-wide text-muted md:text-lg">
              舞台魔術
            </p>
            <p className="mb-12 max-w-xl text-[10px] font-medium tracking-[0.28em] text-muted uppercase md:mb-20 md:text-xs">
              Visual magic. Powerful moments.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-4 lg:gap-5">
              <PhotoTile
                index={0}
                priority
                onOpen={setLightboxIndex}
                sizes="(max-width: 768px) 100vw, 58vw"
                className="col-span-2 aspect-[4/5] md:col-span-7 md:row-span-2 md:aspect-auto md:min-h-[560px] lg:min-h-[620px]"
                imageClassName="object-[center_35%]"
              />

              <PhotoTile
                index={1}
                onOpen={setLightboxIndex}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="col-span-1 aspect-[3/4] md:col-span-5 md:aspect-[4/5]"
              />

              <PhotoTile
                index={2}
                onOpen={setLightboxIndex}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="col-span-1 aspect-[3/4] md:col-span-5 md:aspect-[4/5]"
              />

              <PhotoTile
                index={3}
                onOpen={setLightboxIndex}
                sizes="(max-width: 768px) 100vw, 66vw"
                className="col-span-2 aspect-[16/10] md:col-span-7 md:aspect-[16/9]"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {lightboxIndex !== null && (
        <ImageLightbox
          photos={stageMagicPhotos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
