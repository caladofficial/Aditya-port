"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion, type MotionValue } from "framer-motion";
import {
  FLUID_SCENE_EVENT,
  fluidBubbleSeeds,
  fluidScenes,
  isFluidSceneName,
  type FluidBubbleSeed,
  type FluidSceneName,
} from "@/lib/fluid-bubbles";

type RuntimeBubble = FluidBubbleSeed & {
  x: number;
  y: number;
  vx: number;
  vy: number;
  anchorX: number;
  anchorY: number;
  targetRadius: number;
  targetOpacity: number;
  sceneEnergy: number;
  scale: number;
  targetScale: number;
  squash: number;
  targetSquash: number;
  rotation: number;
  targetRotation: number;
  pulse: number;
  scrollScale: number;
  phase: number;
};

type RuntimeParticle = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  depth: number;
  size: number;
  opacity: number;
  phase: number;
};

type Ripple = {
  x: number;
  y: number;
  progress: number;
  strength: number;
  color: string;
};

type FluidMetaballSystemProps = {
  initialScene?: FluidSceneName;
  /** Keeps the canvas composed but suspends active physics behind the preloader. */
  active?: boolean;
  /** Optional sticky-hero scroll progress; read inside the shared canvas loop. */
  heroProgress?: MotionValue<number>;
  className?: string;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;
const distance = (x1: number, y1: number, x2: number, y2: number) => Math.hypot(x2 - x1, y2 - y1);

const visibleSeedsFor = (viewportWidth: number, lowPower: boolean) => {
  if (viewportWidth < 760 || lowPower) {
    return fluidBubbleSeeds.filter((bubble) =>
      ["hero-cyan", "hero-violet", "content-cyan", "interactive-explore"].includes(bubble.id),
    );
  }

  if (viewportWidth < 1080) {
    return fluidBubbleSeeds.filter((bubble) => !["content-violet", "section-lilac"].includes(bubble.id));
  }

  return fluidBubbleSeeds;
};

/**
 * Global, physics-driven canvas environment.
 *
 * It owns all bubble logic in one place: hero / section / content / interactive
 * metaballs, particles, proximity forces, visual bridge-merging, ripple events,
 * scroll energy and section-scene transitions. Future sections only add a
 * `data-fluid-scene` attribute — no bubble code is duplicated per section.
 */
export function FluidMetaballSystem({
  initialScene = "hero",
  active = true,
  heroProgress,
  className = "",
}: Readonly<FluidMetaballSystemProps>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const deviceNavigator = navigator as Navigator & { deviceMemory?: number };
    const lowPower = Boolean(
      (deviceNavigator.deviceMemory && deviceNavigator.deviceMemory <= 4) ||
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4),
    );

    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let previousWidth = 0;
    let previousHeight = 0;
    let frame = 0;
    let resizeFrame = 0;
    let running = true;
    let lastFrame = 0;
    let activeScene: FluidSceneName = initialScene;
    let scrollEnergy = 0;
    let lastScrollY = window.scrollY;
    let lastScrollTime = performance.now();
    const pointer = { x: -10000, y: -10000, active: false };
    let bubbles: RuntimeBubble[] = [];
    let particles: RuntimeParticle[] = [];
    let ripples: Ripple[] = [];

    const getUnit = () => Math.min(width, height);

    const refreshTargets = () => {
      const scene = fluidScenes[activeScene];
      const unit = getUnit();

      for (const bubble of bubbles) {
        const rule = scene.rules[bubble.kind];
        bubble.anchorX = width * clamp(bubble.position[0] + rule.shift[0], -0.12, 1.12);
        bubble.anchorY = height * clamp(bubble.position[1] + rule.shift[1], -0.12, 1.12);
        bubble.targetRadius = unit * bubble.radius * rule.radius;
        bubble.targetOpacity = bubble.opacity * rule.opacity;
        bubble.sceneEnergy = rule.energy;
      }
    };

    const createBubbles = () => {
      const unit = getUnit();
      bubbles = visibleSeedsFor(width, lowPower).map((seed, index) => ({
        ...seed,
        x: width * seed.position[0],
        y: height * seed.position[1],
        vx: seed.velocity[0],
        vy: seed.velocity[1],
        anchorX: width * seed.position[0],
        anchorY: height * seed.position[1],
        targetRadius: unit * seed.radius,
        targetOpacity: seed.opacity,
        sceneEnergy: 1,
        scale: 1,
        targetScale: 1,
        squash: 1,
        targetSquash: 1,
        rotation: 0,
        targetRotation: 0,
        pulse: 0,
        scrollScale: 1,
        phase: index * 1.79 + seed.mass * 0.13,
      }));
      refreshTargets();
    };

    const createParticles = () => {
      const count = width < 760 || lowPower ? 8 : width < 1080 ? 14 : 22;
      particles = Array.from({ length: count }, (_, index) => {
        const x = width * ((index * 0.61803398875 + 0.12) % 1);
        const y = height * ((index * 0.38196601125 + 0.18) % 1);
        return {
          x,
          y,
          baseX: x,
          baseY: y,
          vx: 0,
          vy: 0,
          depth: 0.12 + (index % 5) * 0.12,
          size: index % 5 === 0 ? 1.35 : 0.7,
          opacity: index % 4 === 0 ? 0.17 : 0.085,
          phase: index * 1.618,
        };
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      previousWidth = width;
      previousHeight = height;
      width = rect.width;
      height = rect.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, width < 760 || lowPower ? 1.1 : 1.45);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const visibleSeeds = visibleSeedsFor(width, lowPower);
      const shouldRebuild = bubbles.length !== visibleSeeds.length || previousWidth === 0 || previousHeight === 0;

      if (shouldRebuild) {
        createBubbles();
        createParticles();
      } else {
        for (const bubble of bubbles) {
          bubble.x = (bubble.x / previousWidth) * width;
          bubble.y = (bubble.y / previousHeight) * height;
        }
        for (const particle of particles) {
          particle.x = (particle.x / previousWidth) * width;
          particle.y = (particle.y / previousHeight) * height;
          particle.baseX = (particle.baseX / previousWidth) * width;
          particle.baseY = (particle.baseY / previousHeight) * height;
        }
        refreshTargets();
      }
    };

    const scheduleResize = () => {
      if (resizeFrame) return;
      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = 0;
        resize();
        render(performance.now());
      });
    };

    const setScene = (scene: FluidSceneName) => {
      if (activeScene === scene) return;
      activeScene = scene;
      refreshTargets();
    };

    const bubbleRadius = (bubble: RuntimeBubble) => bubble.targetRadius * bubble.scale * bubble.scrollScale;

    const applyMergeForces = (step: number) => {
      for (let firstIndex = 0; firstIndex < bubbles.length; firstIndex += 1) {
        const first = bubbles[firstIndex];

        for (let secondIndex = firstIndex + 1; secondIndex < bubbles.length; secondIndex += 1) {
          const second = bubbles[secondIndex];
          if (first.mergeGroup !== second.mergeGroup) continue;

          const dx = second.x - first.x;
          const dy = second.y - first.y;
          const dist = Math.max(Math.hypot(dx, dy), 0.001);
          const mergeRange = (bubbleRadius(first) + bubbleRadius(second)) * 0.78;
          if (dist >= mergeRange) continue;

          // Gentle cohesion makes compatible close forms behave like one liquid mass.
          const cohesion = Math.pow(1 - dist / mergeRange, 2) * 0.095 * step;
          const nx = dx / dist;
          const ny = dy / dist;
          first.vx += (nx * cohesion) / first.mass;
          first.vy += (ny * cohesion) / first.mass;
          second.vx -= (nx * cohesion) / second.mass;
          second.vy -= (ny * cohesion) / second.mass;
        }
      }
    };

    const updateBubbles = (time: number, step: number) => {
      const scene = fluidScenes[activeScene];
      const heroExit =
        activeScene === "hero" ? clamp(((heroProgress?.get() ?? 0) - 0.045) / 0.955, 0, 1) : 0;
      const philosophyConvergence = activeScene === "philosophy";
      scrollEnergy *= Math.pow(philosophyConvergence ? 0.72 : 0.91, step);

      for (const bubble of bubbles) {
        const primaryTransitionBubble = bubble.id === "hero-cyan";
        const scrollScaleTarget = philosophyConvergence
          ? primaryTransitionBubble
            ? 1.62
            : 0.84
          : primaryTransitionBubble
            ? 1 + heroExit * 4.65
            : 1 - heroExit * 0.08 * bubble.depth;
        bubble.scrollScale = lerp(bubble.scrollScale, scrollScaleTarget, (philosophyConvergence ? 0.045 : 0.075) * step);

        const radius = bubbleRadius(bubble);
        const calmFactor = philosophyConvergence ? 0.13 : 1;
        const calmFloatX = Math.sin(time * 0.00015 * bubble.sceneEnergy + bubble.phase) * radius * 0.017 * calmFactor;
        const calmFloatY = Math.cos(time * 0.00012 * bubble.sceneEnergy + bubble.phase) * radius * 0.015 * calmFactor;
        const springStrength = ((philosophyConvergence ? 0.019 : 0.008) * bubble.sceneEnergy) / bubble.mass;
        const scrollAnchorX = primaryTransitionBubble ? lerp(bubble.anchorX, width * 0.55, heroExit) : bubble.anchorX;
        const scrollAnchorY = primaryTransitionBubble ? lerp(bubble.anchorY, height * 0.52, heroExit) : bubble.anchorY;
        const targetAnchorX = philosophyConvergence ? lerp(scrollAnchorX, width * 0.52, 0.94) : scrollAnchorX;
        const targetAnchorY = philosophyConvergence ? lerp(scrollAnchorY, height * 0.5, 0.94) : scrollAnchorY;

        bubble.vx += (targetAnchorX + calmFloatX - bubble.x) * springStrength * step;
        bubble.vy += (targetAnchorY + calmFloatY - bubble.y) * springStrength * step;
        bubble.vy += scrollEnergy * bubble.depth * scene.scrollResponse * 0.22 * step;

        bubble.targetScale = 1 + bubble.pulse * 0.16;
        bubble.targetSquash = 1;
        bubble.targetRotation = Math.sin(time * 0.00008 + bubble.phase) * 0.08;

        if (pointer.active && !philosophyConvergence) {
          const dx = bubble.x - pointer.x;
          const dy = bubble.y - pointer.y;
          const dist = Math.max(Math.hypot(dx, dy), 0.001);
          const influenceRadius = radius * 1.38 + 78;

          if (dist < influenceRadius) {
            const proximity = Math.pow(1 - dist / influenceRadius, 2);
            const nearCore = dist < influenceRadius * 0.42;
            const direction = nearCore ? 1 : -0.18;
            const force = proximity * bubble.interactionStrength * 1.05 * direction * step;
            bubble.vx += (dx / dist) * force;
            bubble.vy += (dy / dist) * force;
            bubble.targetScale += proximity * (nearCore ? 0.09 : 0.035) * bubble.interactionStrength;
            bubble.targetSquash = 1 + proximity * 0.13 * bubble.interactionStrength;
            bubble.targetRotation = Math.atan2(dy, dx) * 0.16;
          }
        }

        bubble.pulse *= Math.pow(0.91, step);
        bubble.scale = lerp(bubble.scale, bubble.targetScale, 0.11 * step);
        bubble.squash = lerp(bubble.squash, bubble.targetSquash, 0.12 * step);
        bubble.rotation = lerp(bubble.rotation, bubble.targetRotation, 0.08 * step);
        bubble.vx *= Math.pow(philosophyConvergence ? 0.84 : 0.89, step);
        bubble.vy *= Math.pow(philosophyConvergence ? 0.84 : 0.89, step);
        bubble.x += bubble.vx * step;
        bubble.y += bubble.vy * step;
      }

      applyMergeForces(step);
    };

    const updateParticles = (time: number, step: number) => {
      const philosophyConvergence = activeScene === "philosophy";
      for (const particle of particles) {
        const driftFactor = philosophyConvergence ? 0.1 : 1;
        const floatX = Math.sin(time * 0.00011 + particle.phase) * 7 * particle.depth * driftFactor;
        const floatY = Math.cos(time * 0.00009 + particle.phase) * 6 * particle.depth * driftFactor;
        const anchorX = philosophyConvergence ? lerp(particle.baseX, width * 0.52, 0.9) : particle.baseX;
        const anchorY = philosophyConvergence ? lerp(particle.baseY, height * 0.5, 0.9) : particle.baseY;
        particle.vx += (anchorX + floatX - particle.x) * (philosophyConvergence ? 0.008 : 0.0035) * step;
        particle.vy += (anchorY + floatY - particle.y) * (philosophyConvergence ? 0.008 : 0.0035) * step;
        particle.vy += scrollEnergy * particle.depth * 0.12 * step;
        particle.vx *= Math.pow(philosophyConvergence ? 0.84 : 0.89, step);
        particle.vy *= Math.pow(philosophyConvergence ? 0.84 : 0.89, step);
        particle.x += particle.vx * step;
        particle.y += particle.vy * step;
      }
    };

    const updateRipples = (step: number) => {
      ripples = ripples.filter((ripple) => {
        ripple.progress += (0.018 + ripple.strength * 0.003) * step;
        if (ripple.progress >= 1) return false;

        const ringRadius = ripple.progress * Math.min(width, height) * 0.32;
        const ringWidth = 24 + ripple.progress * 24;
        for (const particle of particles) {
          const dx = particle.x - ripple.x;
          const dy = particle.y - ripple.y;
          const dist = Math.max(Math.hypot(dx, dy), 0.001);
          const band = 1 - Math.abs(dist - ringRadius) / ringWidth;
          if (band <= 0) continue;
          const impulse = band * 0.36 * ripple.strength * (1 - ripple.progress);
          particle.vx += (dx / dist) * impulse;
          particle.vy += (dy / dist) * impulse;
        }
        return true;
      });
    };

    const drawParticles = (time: number) => {
      context.save();
      context.globalCompositeOperation = "source-over";
      context.filter = "none";

      for (const particle of particles) {
        const shimmer = 0.64 + Math.sin(time * 0.001 + particle.phase) * 0.36;
        context.fillStyle = `rgba(202, 221, 255, ${particle.opacity * shimmer})`;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      }
      context.restore();
    };

    const drawMergeBridge = (first: RuntimeBubble, second: RuntimeBubble) => {
      if (first.mergeGroup !== second.mergeGroup) return;
      const firstRadius = bubbleRadius(first);
      const secondRadius = bubbleRadius(second);
      const dist = distance(first.x, first.y, second.x, second.y);
      const mergeRange = (firstRadius + secondRadius) * 0.9;
      if (dist >= mergeRange) return;

      const amount = clamp(1 - dist / mergeRange, 0, 1);
      const bridgeGradient = context.createLinearGradient(first.x, first.y, second.x, second.y);
      bridgeGradient.addColorStop(0, `rgba(${first.color}, ${first.targetOpacity * 0.48 * amount})`);
      bridgeGradient.addColorStop(1, `rgba(${second.color}, ${second.targetOpacity * 0.48 * amount})`);

      context.save();
      context.globalCompositeOperation = "lighter";
      context.filter = `blur(${Math.min(firstRadius, secondRadius) * 0.11}px)`;
      context.strokeStyle = bridgeGradient;
      context.lineCap = "round";
      context.lineWidth = Math.min(firstRadius, secondRadius) * (0.46 + amount * 0.42);
      context.beginPath();
      context.moveTo(first.x, first.y);
      context.lineTo(second.x, second.y);
      context.stroke();
      context.restore();
    };

    const drawBubble = (bubble: RuntimeBubble, time: number) => {
      const radius = bubbleRadius(bubble);
      const organicWave = Math.sin(time * 0.00024 + bubble.phase) * 0.035;
      const rx = radius * (1.04 + organicWave) * bubble.squash;
      const ry = radius * (0.82 - organicWave * 0.65) / Math.max(bubble.squash * 0.9, 0.72);
      const opacity = bubble.targetOpacity;

      context.save();
      context.translate(bubble.x, bubble.y);
      context.rotate(bubble.rotation);
      context.globalCompositeOperation = "lighter";
      context.filter = `blur(${Math.min(20, radius * 0.09)}px)`;
      const outer = context.createRadialGradient(-rx * 0.32, -ry * 0.36, radius * 0.04, 0, 0, Math.max(rx, ry));
      outer.addColorStop(0, `rgba(${bubble.color}, ${opacity})`);
      outer.addColorStop(0.46, `rgba(${bubble.color}, ${opacity * 0.44})`);
      outer.addColorStop(1, `rgba(${bubble.color}, 0)`);
      context.fillStyle = outer;
      context.beginPath();
      context.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      context.fill();
      context.restore();

      // A quiet material pass: highlight + internal refraction, not a glossy orb.
      context.save();
      context.translate(bubble.x, bubble.y);
      context.rotate(bubble.rotation);
      context.globalCompositeOperation = "source-over";
      const surface = context.createRadialGradient(-rx * 0.28, -ry * 0.34, 0, 0, 0, Math.max(rx, ry));
      surface.addColorStop(0, `rgba(246, 251, 255, ${opacity * 0.19})`);
      surface.addColorStop(0.34, `rgba(${bubble.color}, ${opacity * 0.12})`);
      surface.addColorStop(0.78, `rgba(${bubble.color}, ${opacity * 0.025})`);
      surface.addColorStop(1, "rgba(255, 255, 255, 0)");
      context.fillStyle = surface;
      context.beginPath();
      context.ellipse(0, 0, rx * 0.94, ry * 0.94, 0, 0, Math.PI * 2);
      context.fill();

      context.strokeStyle = `rgba(222, 239, 255, ${opacity * 0.12})`;
      context.lineWidth = Math.max(0.5, radius * 0.004);
      context.beginPath();
      context.ellipse(-rx * 0.07, -ry * 0.04, rx * 0.86, ry * 0.86, 0, Math.PI * 1.03, Math.PI * 1.7);
      context.stroke();

      if (bubble.kind === "interactive") {
        context.fillStyle = `rgba(245, 251, 255, ${opacity * 0.6})`;
        context.beginPath();
        context.arc(-rx * 0.22, -ry * 0.24, Math.max(1.1, radius * 0.022), 0, Math.PI * 2);
        context.fill();
      }
      context.restore();
    };

    const drawRipples = () => {
      for (const ripple of ripples) {
        const radius = ripple.progress * Math.min(width, height) * 0.32;
        const alpha = (1 - ripple.progress) * 0.25;
        context.save();
        context.globalCompositeOperation = "lighter";
        context.shadowColor = `rgba(${ripple.color}, ${alpha})`;
        context.shadowBlur = 18;
        context.strokeStyle = `rgba(${ripple.color}, ${alpha})`;
        context.lineWidth = 1.1 + (1 - ripple.progress) * 1.2;
        context.beginPath();
        context.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
        context.stroke();
        context.restore();
      }
    };

    const render = (time: number) => {
      context.clearRect(0, 0, width, height);
      drawParticles(time);

      const depthOrdered = [...bubbles].sort((first, second) => first.depth - second.depth);
      for (let firstIndex = 0; firstIndex < depthOrdered.length; firstIndex += 1) {
        for (let secondIndex = firstIndex + 1; secondIndex < depthOrdered.length; secondIndex += 1) {
          drawMergeBridge(depthOrdered[firstIndex], depthOrdered[secondIndex]);
        }
      }
      for (const bubble of depthOrdered) drawBubble(bubble, time);
      drawRipples();
    };

    const loop = (time: number) => {
      if (!running) return;
      // The ambient canvas yields time to primary interaction: ~30fps desktop,
      // ~24fps on compact or low-power hardware.
      const frameBudget = width < 760 || lowPower ? 41 : 31;
      if (time - lastFrame > frameBudget) {
        const step = Math.min(2.25, Math.max(0.55, (time - lastFrame || 16.67) / 16.67));
        updateBubbles(time, step);
        updateParticles(time, step);
        updateRipples(step);
        render(time);
        lastFrame = time;
      }
      frame = window.requestAnimationFrame(loop);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!active || event.pointerType === "touch") return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;

      const hoveringInteractiveBubble = bubbles.some(
        (bubble) =>
          bubble.kind === "interactive" &&
          distance(event.clientX, event.clientY, bubble.x, bubble.y) <= bubbleRadius(bubble) * 1.14,
      );
      document.documentElement.dataset.fluidInteractive = String(hoveringInteractiveBubble);
    };

    const onPointerLeave = () => {
      pointer.active = false;
      delete document.documentElement.dataset.fluidInteractive;
    };

    const onPointerUp = (event: PointerEvent) => {
      // Touch users can trigger the same soft ripple without desktop hover physics.
      if (!active || prefersReducedMotion) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("a, button, input, textarea")) return;

      const hit = [...bubbles]
        .sort((first, second) => second.depth - first.depth)
        .find(
          (bubble) =>
            bubble.kind === "interactive" &&
            distance(event.clientX, event.clientY, bubble.x, bubble.y) <= bubbleRadius(bubble) * 1.08,
        );
      if (!hit) return;

      hit.pulse = 1;
      ripples = [
        ...ripples.slice(-2),
        { x: hit.x, y: hit.y, progress: 0, strength: hit.interactionStrength, color: hit.color },
      ];
    };

    const onScroll = () => {
      if (!active) return;
      const now = performance.now();
      const elapsed = Math.max(16, now - lastScrollTime);
      const rawVelocity = (window.scrollY - lastScrollY) / elapsed;
      scrollEnergy = clamp(rawVelocity * 0.72, -1.25, 1.25);
      lastScrollY = window.scrollY;
      lastScrollTime = now;
    };

    const onSceneEvent = (event: Event) => {
      const requestedScene = (event as CustomEvent<FluidSceneName>).detail;
      if (isFluidSceneName(requestedScene)) setScene(requestedScene);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
        const requestedScene = activeEntry?.target.getAttribute("data-fluid-scene") ?? undefined;
        if (isFluidSceneName(requestedScene)) setScene(requestedScene);
      },
      { rootMargin: "-18% 0px -42% 0px", threshold: [0.1, 0.35, 0.65] },
    );

    const observeSceneMarker = (element: HTMLElement) => observer.observe(element);
    document.querySelectorAll<HTMLElement>("[data-fluid-scene]").forEach(observeSceneMarker);

    // Deferred route chapters can mount after the global field. Observe only
    // newly added scene markers rather than polling the document on scroll.
    const sceneMutationObserver = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches("[data-fluid-scene]")) observeSceneMarker(node);
          node.querySelectorAll<HTMLElement>("[data-fluid-scene]").forEach(observeSceneMarker);
        });
      }
    });
    sceneMutationObserver.observe(document.body, { childList: true, subtree: true });

    const onVisibilityChange = () => {
      running = document.visibilityState === "visible";
      if (running && active && !prefersReducedMotion) frame = window.requestAnimationFrame(loop);
    };

    resize();
    render(0);
    window.addEventListener("resize", scheduleResize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("blur", onPointerLeave, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener(FLUID_SCENE_EVENT, onSceneEvent as EventListener);
    document.addEventListener("visibilitychange", onVisibilityChange);

    if (active && !prefersReducedMotion) frame = window.requestAnimationFrame(loop);

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(resizeFrame);
      observer.disconnect();
      sceneMutationObserver.disconnect();
      window.removeEventListener("resize", scheduleResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("blur", onPointerLeave);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      delete document.documentElement.dataset.fluidInteractive;
      window.removeEventListener(FLUID_SCENE_EVENT, onSceneEvent as EventListener);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [active, heroProgress, initialScene, prefersReducedMotion]);

  return <canvas ref={canvasRef} className={`fluid-metaball-system ${className}`.trim()} aria-hidden="true" />;
}
