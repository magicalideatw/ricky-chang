"use client";

import { useEffect, useRef } from "react";

type TurnstileWidgetProps = {
  siteKey: string;
  onSuccess: (token: string) => void;
  onError: () => void;
  onExpire: () => void;
};

type TurnstileRenderOptions = {
  sitekey: string;
  callback: (token: string) => void;
  "error-callback": () => void;
  "expired-callback": () => void;
  theme: "light" | "dark" | "auto";
};

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
    onTurnstileLoad?: () => void;
  }
}

const TURNSTILE_SCRIPT_ID = "cf-turnstile-script";

function loadTurnstileScript(onLoad: () => void) {
  if (window.turnstile) {
    onLoad();
    return;
  }

  const existingScript = document.getElementById(TURNSTILE_SCRIPT_ID);

  if (existingScript) {
    if (window.turnstile) {
      onLoad();
      return;
    }

    const previousOnLoad = window.onTurnstileLoad;
    window.onTurnstileLoad = () => {
      previousOnLoad?.();
      onLoad();
    };
    return;
  }

  window.onTurnstileLoad = onLoad;

  const script = document.createElement("script");
  script.id = TURNSTILE_SCRIPT_ID;
  script.src =
    "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad";
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

export function TurnstileWidget({
  siteKey,
  onSuccess,
  onError,
  onExpire,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !siteKey) return;

    let cancelled = false;

    const renderWidget = () => {
      if (cancelled || !containerRef.current || !window.turnstile) return;

      if (widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }

      requestAnimationFrame(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;

        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: onSuccess,
          "error-callback": onError,
          "expired-callback": onExpire,
          theme: "light",
        });
      });
    };

    loadTurnstileScript(renderWidget);

    return () => {
      cancelled = true;

      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, onSuccess, onError, onExpire]);

  if (!siteKey) return null;

  return (
    <div
      ref={containerRef}
      className="relative z-0 max-w-full overflow-visible [&_iframe]:max-w-full"
      style={{ minHeight: "65px" }}
    />
  );
}
