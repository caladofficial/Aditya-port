"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type PreloaderProps = {
  onReveal: () => void;
  onComplete: () => void;
};

type IntroParticle = {
  angle: number;
  orbit: number;
  size: number;
  phase: number;
  blue: boolean;
};

const clamp = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max);
const smooth = (value: number) => {
  const clamped = clamp(value);
  return clamped * clamped * (3 - 2 * clamped);
};
const range = (value: number, from: number, to: number) => smooth((value - from) / (to - from));

/**
 * Short opening-film sequence. It does not wait for unrelated network work:
 * on a fast load it completes in ~2 seconds, then dissolves into the hero.
 */
export function Preloader({ onReveal, onComplete }: Readonly<PreloaderProps>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    document.documentElement.dataset.preloading = "true";

    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let frame = 0;
    let releaseTimer = 0;
    let revealed = false;
    let completed = false;
    let previousVisibleProgress = -1;
    const isCompact = window.matchMedia("(max-width: 760px)").matches;
    const particles: IntroParticle[] = Array.from({ length: isCompact ? 17 : 31 }, (_, index) => ({
      angle: (index / (isCompact ? 17 : 31)) * Math.PI * 2 + index * 0.19,
      orbit: 8 + ((index * 17) % 29),
      size: index % 7 === 0 ? 1.55 : index % 3 === 0 ? 1.05 : 0.65,
      phase: index * 1.31,
      blue: index % 3 !== 0,
    }));

    // A deliberate, compact film sequence. Font readiness only adds a small
    // cushion, so the preloader never becomes an asset-loading roadblock.
    const fontsPending = "fonts" in document && document.fonts.status !== "loaded";
    const duration = prefersReducedMotion ? 180 : isCompact ? 1760 : fontsPending ? 2320 : 2040;
    const startTime = performance.now();

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, isCompact ? 1.1 : 1.4);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const drawParticle = (x: number, y: number, size: number, opacity: number, blue: boolean) => {
      context.fillStyle = blue
        ? `rgba(130, 229, 255, ${opacity})`
        : `rgba(178, 145, 255, ${opacity * 0.85})`;
      context.beginPath();
      context.arc(x, y, size, 0, Math.PI * 2);
      context.fill();
    };

    const drawSmallFluid = (progressValue: number, time: number, cx: number, cy: number) => {
      const formation = range(progressValue, 0.14, 0.53);
      if (formation <= 0) return;
      const radius = 7 + formation * 17;
      const pulse = Math.sin(time * 0.003) * 1.7;
      const offsets = [
        [-0.54, 0.1, "111, 229, 255"],
        [0.34, -0.28, "92, 124, 255"],
        [0.28, 0.4, "168, 133, 255"],
      ] as const;

      context.save();
      context.globalCompositeOperation = "lighter";
      context.filter = `blur(${4 + formation * 4}px)`;
      for (const [xOffset, yOffset, color] of offsets) {
        const x = cx + xOffset * radius + Math.sin(time * 0.0018 + xOffset * 4) * formation * 2;
        const y = cy + yOffset * radius + Math.cos(time * 0.0015 + yOffset * 4) * formation * 2;
        const gradient = context.createRadialGradient(x - radius * 0.2, y - radius * 0.22, 1, x, y, radius);
        gradient.addColorStop(0, `rgba(${color}, ${0.38 * formation})`);
        gradient.addColorStop(0.55, `rgba(${color}, ${0.13 * formation})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);
        context.fillStyle = gradient;
        context.beginPath();
        context.ellipse(x, y, radius * (0.92 + pulse * 0.01), radius * 0.76, 0.28, 0, Math.PI * 2);
        context.fill();
      }
      context.restore();
    };

    const drawFinalMetaball = (progressValue: number, time: number, cx: number, cy: number) => {
      const expansion = range(progressValue, 0.58, 1);
      if (expansion <= 0) return;

      const diagonal = Math.hypot(width, height);
      const radius = 25 + diagonal * Math.pow(expansion, 1.72) * 0.9;
      const x = cx + (width * 0.06) * expansion + Math.sin(time * 0.001) * 3 * (1 - expansion);
      const y = cy - (height * 0.035) * expansion;
      const aspect = 0.74 + Math.sin(time * 0.0017) * 0.025 * (1 - expansion);

      context.save();
      context.globalCompositeOperation = "lighter";
      context.filter = `blur(${Math.min(34, 8 + radius * 0.035)}px)`;
      const outer = context.createRadialGradient(x - radius * 0.28, y - radius * aspect * 0.33, radius * 0.05, x, y, radius);
      outer.addColorStop(0, `rgba(128, 231, 255, ${0.47 * expansion})`);
      outer.addColorStop(0.38, `rgba(96, 129, 255, ${0.32 * expansion})`);
      outer.addColorStop(0.72, `rgba(159, 124, 255, ${0.17 * expansion})`);
      outer.addColorStop(1, "rgba(87, 104, 255, 0)");
      context.fillStyle = outer;
      context.beginPath();
      context.ellipse(x, y, radius * 1.05, radius * aspect, -0.21, 0, Math.PI * 2);
      context.fill();
      context.restore();

      context.save();
      context.globalCompositeOperation = "source-over";
      const surface = context.createRadialGradient(x - radius * 0.23, y - radius * aspect * 0.3, 0, x, y, radius * 1.04);
      surface.addColorStop(0, `rgba(243, 252, 255, ${0.12 * expansion})`);
      surface.addColorStop(0.31, `rgba(125, 228, 255, ${0.08 * expansion})`);
      surface.addColorStop(0.72, `rgba(139, 116, 255, ${0.025 * expansion})`);
      surface.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = surface;
      context.beginPath();
      context.ellipse(x, y, radius * 0.97, radius * aspect * 0.96, -0.21, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const draw = (progressValue: number, time: number) => {
      context.fillStyle = "#07080c";
      context.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.51;
      const formation = range(progressValue, 0.1, 0.52);
      const acceleration = range(progressValue, 0.54, 0.88);
      const visibleCount = Math.max(1, Math.floor(range(progressValue, 0.02, 0.42) * particles.length));

      context.save();
      context.globalCompositeOperation = "lighter";
      for (let index = 0; index < visibleCount; index += 1) {
        const particle = particles[index];
        const orbit = particle.orbit * (1 - formation * 0.55) + acceleration * (34 + (index % 5) * 12);
        const speed = 0.00045 + acceleration * 0.0021;
        const angle = particle.angle + time * speed + Math.sin(time * 0.001 + particle.phase) * 0.16;
        const x = cx + Math.cos(angle) * orbit * (1 + Math.sin(particle.phase + time * 0.001) * 0.08);
        const y = cy + Math.sin(angle) * orbit * 0.68;
        const alpha = (0.21 + formation * 0.45) * (0.55 + (index % 4) * 0.1);
        drawParticle(x, y, particle.size * (1 + acceleration * 0.34), alpha, particle.blue);
      }
      context.restore();

      drawSmallFluid(progressValue, time, cx, cy);
      drawFinalMetaball(progressValue, time, cx, cy);
    };

    const tick = (time: number) => {
      const normalizedProgress = clamp((time - startTime) / duration);
      const displayedProgress = Math.round(normalizedProgress * 100);
      if (displayedProgress !== previousVisibleProgress) {
        previousVisibleProgress = displayedProgress;
        setProgress(displayedProgress);
      }

      draw(normalizedProgress, time);

      if (!revealed && normalizedProgress >= 0.83) {
        revealed = true;
        onReveal();
      }

      if (normalizedProgress < 1) {
        frame = window.requestAnimationFrame(tick);
        return;
      }

      if (!revealed) {
        revealed = true;
        onReveal();
      }
      setExiting(true);
      releaseTimer = window.setTimeout(() => {
        if (!completed) {
          completed = true;
          onComplete();
        }
      }, prefersReducedMotion ? 80 : 520);
    };

    resize();
    draw(0, startTime);
    frame = window.requestAnimationFrame(tick);
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(releaseTimer);
      window.removeEventListener("resize", resize);
      delete document.documentElement.dataset.preloading;
    };
  }, [onComplete, onReveal, prefersReducedMotion]);

  const phase = progress < 18 ? "particle" : progress < 42 ? "forming" : progress < 58 ? "mark" : progress < 83 ? "name" : "release";
  const progressLabel = Math.max(1, progress);

  return (
    <div className={`preloader ${exiting ? "is-exiting" : ""}`} data-phase={phase} role="status" aria-live="polite" aria-label="Loading Aditya Rai portfolio">
      <span className="sr-only">Loading Aditya Rai portfolio, {progressLabel} percent.</span>
      <canvas ref={canvasRef} className="preloader-canvas" aria-hidden="true" />
      <div className="preloader-copy" aria-live="polite">
        <div className="preloader-mark" aria-hidden="true">
          AR
        </div>
        <p className="preloader-name">ADITYA RAI</p>
      </div>
      <div className="preloader-progress" aria-label={`${progressLabel}% loaded`}>
        <span>{String(progressLabel).padStart(2, "0")}</span>
        <i style={{ transform: `scaleX(${progress / 100})` }} />
        <b>100</b>
      </div>
    </div>
  );
}
