"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Owns the only smooth-scroll loop. Touch devices retain native inertial
 * scrolling; this avoids forcing desktop physics onto mobile interaction.
 */
export function SmoothScroll({ children }: Readonly<{ children: React.ReactNode }>) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    const usesCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion) {
      root.dataset.motion = "reduced";
      return;
    }

    if (usesCoarsePointer) {
      root.dataset.motion = "touch";
      return () => delete root.dataset.motion;
    }

    root.dataset.motion = "full";
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
    });

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
      delete root.dataset.motion;
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
}
