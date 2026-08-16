"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import type { StageMagicPhoto } from "@/lib/stage-magic-photos";

type ImageLightboxProps = {
  photos: StageMagicPhoto[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function ImageLightbox({
  photos,
  currentIndex,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const photo = photos[currentIndex];
  const hasMultiple = photos.length > 1;

  const goPrev = useCallback(() => {
    onNavigate((currentIndex - 1 + photos.length) % photos.length);
  }, [currentIndex, onNavigate, photos.length]);

  const goNext = useCallback(() => {
    onNavigate((currentIndex + 1) % photos.length);
  }, [currentIndex, onNavigate, photos.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goNext, goPrev, onClose]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 px-4 py-16 sm:px-8"
      role="dialog"
      aria-modal="true"
      aria-label="Stage magic photo viewer"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center text-white/70 transition-colors duration-300 hover:text-white sm:top-8 sm:right-8"
        aria-label="Close"
      >
        <span className="text-2xl leading-none">&times;</span>
      </button>

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="absolute top-1/2 left-2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-white/60 transition-colors duration-300 hover:text-white sm:left-6"
            aria-label="Previous photo"
          >
            <span className="text-3xl leading-none">&lsaquo;</span>
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute top-1/2 right-2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-white/60 transition-colors duration-300 hover:text-white sm:right-6"
            aria-label="Next photo"
          >
            <span className="text-3xl leading-none">&rsaquo;</span>
          </button>
        </>
      )}

      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0"
        aria-label="Close photo viewer"
      />

      <div className="relative z-[1] h-[min(78vh,820px)] w-full max-w-5xl">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 80vw"
          priority
        />
      </div>
    </div>
  );
}
