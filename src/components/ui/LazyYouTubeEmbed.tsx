"use client";

import { useEffect, useRef, useState } from "react";
import { getYouTubeEmbedUrl } from "@/lib/featured-performances";

type LazyYouTubeEmbedProps = {
  youtubeId: string;
  title: string;
  className?: string;
};

export function LazyYouTubeEmbed({
  youtubeId,
  title,
  className = "",
}: LazyYouTubeEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`aspect-[16/9] w-full overflow-hidden rounded-sm bg-neutral-950 transition-transform duration-700 ease-out hover:scale-[1.01] ${className}`}
    >
      {shouldLoad ? (
        <iframe
          src={getYouTubeEmbedUrl(youtubeId)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="lazy"
          className="h-full w-full border-0"
        />
      ) : (
        <div className="h-full w-full bg-neutral-950" aria-hidden="true" />
      )}
    </div>
  );
}
