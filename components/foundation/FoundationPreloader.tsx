"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { eases } from "@/animations/motion";
import { identity } from "@/data/design-system";

type FoundationPreloaderProps = {
  onReveal: () => void;
  onComplete: () => void;
};

const PORTRAIT_SOURCE = "/images/aditya/poster-head.webp";

export function FoundationPreloader({ onReveal, onComplete }: Readonly<FoundationPreloaderProps>) {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const revealSent = useRef(false);

  useEffect(() => {
    const body = document.body;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    document.documentElement.dataset.loading = "true";

    const revealHero = () => {
      if (revealSent.current) return;
      revealSent.current = true;
      onReveal();
    };

    const unlockPage = () => {
      body.style.overflow = previousOverflow;
      delete document.documentElement.dataset.loading;
    };

    if (reduceMotion) {
      revealHero();
      const timer = window.setTimeout(() => {
        unlockPage();
        setVisible(false);
      }, 60);
      return () => {
        window.clearTimeout(timer);
        unlockPage();
      };
    }

    let assetsReady = false;
    let disposed = false;
    let frame = 0;
    let lastRenderedProgress = -1;
    let finishStartedAt: number | null = null;
    const startedAt = performance.now();

    const portraitReady = new Promise<void>((resolve) => {
      const portrait = new window.Image();
      const finish = () => resolve();
      portrait.onload = finish;
      portrait.onerror = finish;
      portrait.src = PORTRAIT_SOURCE;
      if (portrait.complete) finish();
    });

    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    Promise.all([portraitReady, fontsReady]).then(() => {
      if (!disposed) assetsReady = true;
    });

    // Never let one slow optional asset trap the user behind the introduction.
    const assetSafety = window.setTimeout(() => {
      assetsReady = true;
    }, 1350);

    const render = (now: number) => {
      const elapsed = now - startedAt;
      let nextProgress: number;

      if (elapsed < 620) {
        // The identity sequence advances to the portrait handoff without waiting.
        nextProgress = (elapsed / 620) * 70;
      } else if (!assetsReady) {
        // A slow asset may advance toward 92%, but never claim completion early.
        nextProgress = 70 + Math.min(22, ((elapsed - 620) / 730) * 22);
      } else {
        if (finishStartedAt === null) finishStartedAt = now;
        nextProgress = 70 + Math.min(30, ((now - finishStartedAt) / 280) * 30);
      }

      if (nextProgress >= 70) revealHero();
      const rounded = Math.min(100, Math.round(nextProgress));
      if (rounded !== lastRenderedProgress) {
        lastRenderedProgress = rounded;
        setProgress(rounded);
      }

      if (rounded >= 100) {
        window.clearTimeout(assetSafety);
        unlockPage();
        setVisible(false);
        return;
      }

      frame = window.requestAnimationFrame(render);
    };

    frame = window.requestAnimationFrame(render);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      window.clearTimeout(assetSafety);
      unlockPage();
    };
  }, [onReveal, reduceMotion]);

  const displayedProgress = reduceMotion ? 100 : progress;
  const nameVisible = displayedProgress >= 30;
  const rolesVisible = displayedProgress >= 48;
  const portraitVisible = displayedProgress >= 70;
  const lineProgress = Math.min(1, displayedProgress / 30);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          className="foundation-preloader"
          initial={false}
          exit={reduceMotion
            ? { opacity: 0 }
            : { clipPath: "inset(0 0 100% 0)", y: "-1.5%", scale: 1.01 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.52, ease: eases.exit }}
          role="status"
          aria-live="polite"
          aria-label={`Preparing ${identity.name} portfolio`}
        >
          <div className="preloader-grid" aria-hidden="true" />

          <motion.div
            className="preloader-accent-line"
            style={{ scaleX: lineProgress }}
            aria-hidden="true"
          />

          <div className="preloader-identity" aria-hidden="true">
            <div className="preloader-name-mask">
              <motion.h1
                initial={{ y: "110%", opacity: 0 }}
                animate={nameVisible ? { y: "0%", opacity: 1 } : undefined}
                transition={{ duration: 0.38, ease: eases.reveal }}
              >{identity.name}</motion.h1>
            </div>
            <motion.div
              className="preloader-roles"
              initial={{ opacity: 0, y: 12 }}
              animate={rolesVisible ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.3, ease: eases.reveal }}
            >
              <span>UI/UX Designer</span>
              <span>Frontend Developer</span>
            </motion.div>
          </div>

          <motion.figure
            className="preloader-portrait"
            initial={{ opacity: 0, scale: 1.08, clipPath: "inset(42% 28% 42% 28%)" }}
            animate={portraitVisible
              ? { opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }
              : undefined}
            transition={{ duration: 0.34, ease: eases.reveal }}
            aria-hidden="true"
          >
            <Image
              src={PORTRAIT_SOURCE}
              alt=""
              fill
              priority
              sizes="(max-width: 767px) 48vw, 24vw"
              quality={80}
            />
            <i />
          </motion.figure>

          <div className="preloader-progress" aria-hidden="true">
            <span>Loading identity</span>
            <div><i style={{ transform: `scaleX(${displayedProgress / 100})` }} /></div>
            <b>{String(displayedProgress).padStart(3, "0")}<small>%</small></b>
          </div>
          <span className="preloader-monogram" aria-hidden="true">AR / 2026</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
