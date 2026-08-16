"use client";

import { useLayoutEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HERO_OPENING_STORAGE_KEY,
  useHeroOpening,
} from "@/context/HeroOpeningContext";

const PANEL_DELAY_MS = 100;
const PANEL_DURATION_MS = 1100;
const TEXT_REVEAL_MS = 1100;
const OPENING_FINISH_MS = 2200;

function hasForceOpeningParam(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("opening") === "1";
}

function shouldPlayOpening(): boolean {
  if (typeof window === "undefined") return false;

  if (hasForceOpeningParam()) return true;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) return false;

  try {
    return sessionStorage.getItem(HERO_OPENING_STORAGE_KEY) !== "true";
  } catch {
    return false;
  }
}

export function HeroSection() {
  const { beginOpening, finishOpening, skipOpening } = useHeroOpening();
  const [openingSkipped, setOpeningSkipped] = useState<boolean | null>(null);
  const [textReady, setTextReady] = useState(false);
  const [overlayDone, setOverlayDone] = useState(false);

  useLayoutEffect(() => {
    const play = shouldPlayOpening();

    if (!play) {
      skipOpening();
      setOpeningSkipped(true);
      setTextReady(true);
      setOverlayDone(true);
      return;
    }

    beginOpening();
    setOpeningSkipped(false);

    const textTimer = window.setTimeout(() => {
      setTextReady(true);
    }, TEXT_REVEAL_MS);

    const overlayTimer = window.setTimeout(() => {
      setOverlayDone(true);
    }, PANEL_DELAY_MS + PANEL_DURATION_MS);

    const finishTimer = window.setTimeout(() => {
      finishOpening(hasForceOpeningParam());
    }, OPENING_FINISH_MS);

    return () => {
      window.clearTimeout(textTimer);
      window.clearTimeout(overlayTimer);
      window.clearTimeout(finishTimer);
    };
  }, [beginOpening, finishOpening, skipOpening]);

  const isOpening = openingSkipped === false;
  const showOverlay = openingSkipped !== true && !overlayDone;
  const overlayAnimating = openingSkipped !== true;
  const contentInteractive = openingSkipped === true || textReady;

  return (
    <section className="hero-motion-active relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <div className="hero-bg-motion absolute inset-0">
          <Image
            src="/images/Hero.jpg"
            alt="張煜晟 Ricky Chang 舞台魔術演出"
            fill
            priority
            className="hero-bg-image object-cover"
            sizes="100vw"
          />
        </div>

        <div
          className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent md:from-black/75 md:via-black/25 md:to-transparent lg:max-w-[65%]"
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-transparent md:from-black/30 md:via-transparent md:to-black/25"
          aria-hidden="true"
        />

        <div
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent md:h-24"
          aria-hidden="true"
        />
      </div>

      {showOverlay && (
        <div
          className={`hero-opening-overlay pointer-events-none absolute inset-0 z-40 overflow-hidden ${overlayAnimating ? "hero-opening-overlay-active" : ""}`}
          aria-hidden="true"
        >
          <div className="hero-opening-panel-left absolute inset-y-0 left-0 w-[calc(50%-0.375rem)] bg-black" />
          <div className="hero-opening-panel-right absolute inset-y-0 right-0 w-[calc(50%-0.375rem)] bg-black" />
        </div>
      )}

      <div className="relative z-10 flex h-full">
        <div
          className={`mx-auto flex w-full max-w-7xl flex-col justify-start px-6 pt-28 pb-14 sm:max-w-[88%] md:max-w-none md:justify-center md:px-10 md:py-0 md:pb-0 lg:px-16 xl:px-24 ${contentInteractive ? "" : "pointer-events-none"}`}
        >
          <div
            className={`max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-md ${isOpening ? "hero-opening-text" : ""} ${textReady ? "hero-opening-text-ready" : ""} ${openingSkipped ? "hero-opening-text-settled" : ""}`}
          >
            <h1 className="hero-stagger-title font-display text-[2.25rem] font-light leading-[0.92] tracking-[0.05em] text-white sm:text-[2.85rem] md:text-[3.5rem] lg:text-[4.5rem] xl:text-[4.75rem]">
              <span className="block">RICKY</span>
              <span className="block">CHANG</span>
            </h1>

            <p className="hero-stagger-role font-chinese mt-5 text-[15px] font-light tracking-[0.28em] text-white/90 sm:mt-6 sm:text-base md:mt-7 md:text-lg md:tracking-[0.32em]">
              舞台魔術師
            </p>

            <p className="hero-stagger-tagline font-chinese mt-5 max-w-[260px] text-[13px] font-light leading-[1.85] tracking-[0.06em] text-white/70 sm:mt-6 sm:max-w-xs sm:text-sm md:mt-7 md:max-w-sm md:text-[15px] md:leading-[1.9] md:tracking-[0.08em]">
              用魔術，讓舞台發生不可能。
            </p>

            <div className="hero-stagger-cta mt-9 flex flex-col gap-2.5 sm:mt-10 sm:flex-row sm:gap-3 md:mt-12">
              <Link
                href="#work"
                className="inline-flex items-center justify-center border border-white/35 px-7 py-3 text-center text-[11px] font-medium tracking-[0.18em] text-white/80 transition-all duration-300 hover:border-white/55 hover:text-white sm:min-w-[168px] sm:px-8 sm:py-3.5 sm:text-xs"
              >
                觀看演出作品
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center border border-white/75 bg-white/[0.06] px-7 py-3 text-center text-[11px] font-medium tracking-[0.18em] text-white transition-all duration-300 hover:border-white hover:bg-white/[0.12] sm:min-w-[168px] sm:px-8 sm:py-3.5 sm:text-xs"
              >
                演出洽詢
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
