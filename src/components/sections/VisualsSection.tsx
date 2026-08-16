"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { visualPhotos } from "@/lib/visuals-photos";

type VisualTileProps = {
  index: number;
  className?: string;
  sizes: string;
  priority?: boolean;
  onOpen: (index: number) => void;
};

function VisualTile({
  index,
  className = "",
  sizes,
  priority = false,
  onOpen,
}: VisualTileProps) {
  const photo = visualPhotos[index];
  const fit = photo.objectFit ?? "cover";

  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      className={`group relative block w-full overflow-hidden bg-neutral-100 text-left ${className}`}
      aria-label={`View visual ${index + 1}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority={priority}
        className={`transition-transform duration-700 ease-out group-hover:scale-[1.02] ${
          fit === "contain" ? "object-contain" : "object-cover"
        }`}
        style={
          photo.objectPosition ? { objectPosition: photo.objectPosition } : undefined
        }
        sizes={sizes}
      />
      <div
        className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/5"
        aria-hidden="true"
      />
    </button>
  );
}

export function VisualsSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxPhotos = visualPhotos.map((photo) => ({
    src: photo.src,
    alt: photo.alt,
  }));

  return (
    <>
      <section
        id="visuals"
        aria-labelledby="visuals-heading"
        className="bg-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32 lg:px-16 lg:py-40">
          <ScrollReveal>
            <SectionHeading id="visuals-heading" className="mb-12 md:mb-16">
              VISUALS
            </SectionHeading>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="flex flex-col gap-3 md:grid md:grid-cols-12 md:gap-4 lg:gap-5">
              <VisualTile
                index={0}
                priority
                onOpen={setLightboxIndex}
                sizes="(max-width: 768px) 100vw, 58vw"
                className="aspect-[4/3] md:col-span-7 md:aspect-[5/4] md:min-h-[480px] lg:min-h-[540px]"
              />

              <VisualTile
                index={1}
                onOpen={setLightboxIndex}
                sizes="(max-width: 768px) 100vw, 38vw"
                className="aspect-[4/3] md:col-span-5 md:aspect-[4/5] md:min-h-[480px]"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {lightboxIndex !== null && (
        <ImageLightbox
          photos={lightboxPhotos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
