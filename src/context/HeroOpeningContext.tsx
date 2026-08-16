"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const HERO_OPENING_STORAGE_KEY = "ricky-opening-seen";

type HeroOpeningContextValue = {
  isOpening: boolean;
  showNavbar: boolean;
  beginOpening: () => void;
  finishOpening: (skipPersist?: boolean) => void;
  skipOpening: () => void;
};

const HeroOpeningContext = createContext<HeroOpeningContextValue | null>(null);

export function HeroOpeningProvider({ children }: { children: ReactNode }) {
  const [isOpening, setIsOpening] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  const beginOpening = useCallback(() => {
    setIsOpening(true);
    setShowNavbar(false);
  }, []);

  const finishOpening = useCallback((skipPersist = false) => {
    setIsOpening(false);
    setShowNavbar(true);
    if (skipPersist) return;
    try {
      sessionStorage.setItem(HERO_OPENING_STORAGE_KEY, "true");
    } catch {
      /* sessionStorage unavailable */
    }
  }, []);

  const skipOpening = useCallback(() => {
    setIsOpening(false);
    setShowNavbar(true);
  }, []);

  const value = useMemo(
    () => ({
      isOpening,
      showNavbar,
      beginOpening,
      finishOpening,
      skipOpening,
    }),
    [isOpening, showNavbar, beginOpening, finishOpening, skipOpening]
  );

  return (
    <HeroOpeningContext.Provider value={value}>
      {children}
    </HeroOpeningContext.Provider>
  );
}

export function useHeroOpening() {
  const context = useContext(HeroOpeningContext);
  if (!context) {
    throw new Error("useHeroOpening must be used within HeroOpeningProvider");
  }
  return context;
}
