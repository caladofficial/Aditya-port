"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type ScrollTarget = string | HTMLElement;

type ScrollOptions = {
  offset?: number;
  immediate?: boolean;
  onComplete?: () => void;
};

type SmoothScrollApi = {
  scrollTo: (target: ScrollTarget, options?: ScrollOptions) => void;
  start: () => void;
  stop: () => void;
};

const SmoothScrollContext = createContext<SmoothScrollApi | null>(null);

function resolveTarget(target: ScrollTarget) {
  if (typeof target !== "string") return target;
  const id = target.startsWith("#") ? target.slice(1) : target;
  return document.getElementById(id);
}

export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    throw new Error("useSmoothScroll must be used inside SmoothScroll");
  }
  return context;
}

/**
 * Owns the site's only smooth-scroll loop. Desktop uses Lenis; touch and
 * reduced-motion users keep native scrolling. Navigation consumes the shared
 * API so anchor behavior never competes with a second scrolling engine.
 */
export function SmoothScroll({ children }: Readonly<{ children: React.ReactNode }>) {
  const prefersReducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const usesNativeScrollRef = useRef(true);

  const scrollTo = useCallback((target: ScrollTarget, options: ScrollOptions = {}) => {
    const element = resolveTarget(target);
    if (!element) return;

    const { offset = 0, immediate = false, onComplete } = options;
    const lenis = lenisRef.current;

    if (lenis && !usesNativeScrollRef.current) {
      lenis.scrollTo(element, {
        offset,
        immediate,
        duration: immediate ? 0 : 1.12,
        force: true,
        lock: false,
        onComplete,
      });
      return;
    }

    const top = element.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({
      top,
      behavior: prefersReducedMotion || immediate ? "auto" : "smooth",
    });
    if (onComplete) window.setTimeout(onComplete, prefersReducedMotion || immediate ? 0 : 520);
  }, [prefersReducedMotion]);

  const start = useCallback(() => lenisRef.current?.start(), []);
  const stop = useCallback(() => lenisRef.current?.stop(), []);

  useEffect(() => {
    const root = document.documentElement;
    const usesCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    usesNativeScrollRef.current = Boolean(prefersReducedMotion || usesCoarsePointer);

    if (prefersReducedMotion) {
      root.dataset.motion = "reduced";
      return () => delete root.dataset.motion;
    }

    if (usesCoarsePointer) {
      root.dataset.motion = "touch";
      return () => delete root.dataset.motion;
    }

    root.dataset.motion = "full";
    const lenis = new Lenis({
      duration: 1.12,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.88,
    });
    lenisRef.current = lenis;

    let frame = 0;
    let running = true;
    const raf = (time: number) => {
      if (!running) return;
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };
    const onVisibilityChange = () => {
      running = document.visibilityState === "visible";
      if (running && !frame) frame = window.requestAnimationFrame(raf);
      if (!running) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    frame = window.requestAnimationFrame(raf);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      lenis.destroy();
      lenisRef.current = null;
      delete root.dataset.motion;
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const navigateToHash = (immediate = false) => {
      if (!window.location.hash) return;
      scrollTo(window.location.hash, { immediate, offset: -76 });
    };

    const frame = window.requestAnimationFrame(() => navigateToHash(true));
    const onHashChange = () => navigateToHash(Boolean(prefersReducedMotion));
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [prefersReducedMotion, scrollTo]);

  const value = useMemo(() => ({ scrollTo, start, stop }), [scrollTo, start, stop]);

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
}
