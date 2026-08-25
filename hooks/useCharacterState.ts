"use client";

import { useEffect, useState } from "react";
import {
  characterSections,
  isCharacterState,
} from "@/components/character/character.config";
import {
  CHARACTER_SCENE_EVENT,
  type CharacterSceneDetail,
} from "@/components/character/character.events";
import type {
  CharacterSectionConfig,
  CharacterSnapshot,
  CharacterState,
  CharacterViewport,
} from "@/components/character/character.types";

type UseCharacterStateOptions = {
  enabled?: boolean;
  sections?: readonly CharacterSectionConfig[];
};

const initialSnapshot: CharacterSnapshot = {
  state: "idle",
  activeSection: "top",
  sectionProgress: 0,
  position: "right",
  viewport: "desktop",
  scale: 0.9,
};

function getViewport(width: number): CharacterViewport {
  if (width < 480) return "compact";
  if (width < 768) return "mobile";
  if (width < 1200) return "tablet";
  if (width < 1536) return "desktop";
  return "wide";
}

function getScale(viewport: CharacterViewport) {
  return {
    compact: 0.82,
    mobile: 0.88,
    tablet: 0.92,
    desktop: 0.96,
    wide: 1,
  }[viewport];
}

function adaptStateForViewport(state: CharacterState, viewport: CharacterViewport) {
  if (viewport !== "compact") return state;
  if (state === "celebrate") return "wave";
  return state;
}

/**
 * Central character state machine.
 *
 * It resolves one state from section position, section progress, scroll
 * direction, hovered/focused intent targets, and viewport capability. Scene
 * components never own animation choreography.
 */
export function useCharacterState({
  enabled = true,
  sections = characterSections,
}: UseCharacterStateOptions = {}): CharacterSnapshot {
  const [snapshot, setSnapshot] = useState<CharacterSnapshot>(initialSnapshot);

  useEffect(() => {
    if (!enabled) return;

    const sectionElements = sections
      .map((section) => ({ config: section, element: document.getElementById(section.id) }))
      .filter((entry): entry is { config: CharacterSectionConfig; element: HTMLElement } => Boolean(entry.element));

    if (sectionElements.length === 0) return;

    let frame = 0;
    let previousScrollY = window.scrollY;
    let direction: "forward" | "backward" = "forward";
    let hoverState: CharacterState | null = null;
    let sceneOverride: CharacterSceneDetail | null = null;
    let pointerLook: CharacterState | null = null;
    let pointerReset = 0;

    const evaluate = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      const activationLine = viewportHeight * 0.46;
      const viewport = getViewport(window.innerWidth);
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - previousScrollY) > 2) {
        direction = currentScrollY > previousScrollY ? "forward" : "backward";
      }
      previousScrollY = currentScrollY;

      let activeIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      sectionElements.forEach(({ element }, index) => {
        const rect = element.getBoundingClientRect();
        const sectionAnchor = Math.min(Math.max(activationLine, rect.top), rect.bottom);
        const distance = Math.abs(sectionAnchor - activationLine);
        const isOnActivationLine = rect.top <= activationLine && rect.bottom >= activationLine;
        const weightedDistance = isOnActivationLine ? -1 : distance;

        if (weightedDistance < closestDistance) {
          closestDistance = weightedDistance;
          activeIndex = index;
        }
      });

      const active = sectionElements[activeIndex];
      const rect = active.element.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (activationLine - rect.top) / Math.max(rect.height, 1)));
      let nextState: CharacterState = active.config.state;

      const approachingBoundary = (
        (progress > 0.82 && activeIndex < sectionElements.length - 1)
        || (progress < 0.08 && activeIndex > 0)
      );

      if (approachingBoundary) {
        nextState = direction === "forward" ? "walk" : "walkBack";
      }
      if (active.config.id === "top" && pointerLook && !approachingBoundary) {
        nextState = pointerLook;
      }
      if (sceneOverride?.state) nextState = sceneOverride.state;
      if (hoverState) nextState = hoverState;
      nextState = adaptStateForViewport(nextState, viewport);

      const nextSnapshot: CharacterSnapshot = {
        state: nextState,
        activeSection: active.config.id,
        sectionProgress: Math.round(progress * 100) / 100,
        position: viewport === "compact" || viewport === "mobile" ? "right" : active.config.position,
        viewport,
        scale: getScale(viewport),
      };

      setSnapshot((current) => (
        current.state === nextSnapshot.state
        && current.activeSection === nextSnapshot.activeSection
        && current.sectionProgress === nextSnapshot.sectionProgress
        && current.position === nextSnapshot.position
        && current.viewport === nextSnapshot.viewport
        ? current
        : nextSnapshot
      ));
    };

    const scheduleEvaluation = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(evaluate);
    };

    const stateFromTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return null;
      const stateTarget = target.closest<HTMLElement>("[data-character-state]");
      const value = stateTarget?.dataset.characterState;
      return isCharacterState(value) ? value : null;
    };

    const handleSceneState = (event: Event) => {
      const detail = (event as CustomEvent<CharacterSceneDetail>).detail;
      if (!detail) return;
      if (detail.state === null && sceneOverride?.source !== detail.source) return;
      sceneOverride = detail.state === null ? null : detail;
      scheduleEvaluation();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || window.innerWidth < 768) return;
      const nextLook = event.clientX < window.innerWidth * 0.42
        ? "lookLeft"
        : event.clientX > window.innerWidth * 0.58
          ? "lookRight"
          : null;

      if (pointerLook !== nextLook) {
        pointerLook = nextLook;
        scheduleEvaluation();
      }

      window.clearTimeout(pointerReset);
      if (nextLook) {
        pointerReset = window.setTimeout(() => {
          pointerLook = null;
          scheduleEvaluation();
        }, 720);
      }
    };

    const handlePointerOver = (event: PointerEvent) => {
      const nextHoverState = stateFromTarget(event.target);
      if (!nextHoverState) return;
      hoverState = nextHoverState;
      scheduleEvaluation();
    };

    const handlePointerOut = (event: PointerEvent) => {
      const leaving = stateFromTarget(event.target);
      const entering = stateFromTarget(event.relatedTarget);
      if (!leaving || leaving === entering) return;
      hoverState = entering;
      scheduleEvaluation();
    };

    const handleFocusIn = (event: FocusEvent) => {
      const nextHoverState = stateFromTarget(event.target);
      if (!nextHoverState) return;
      hoverState = nextHoverState;
      scheduleEvaluation();
    };

    const handleFocusOut = (event: FocusEvent) => {
      const entering = stateFromTarget(event.relatedTarget);
      hoverState = entering;
      scheduleEvaluation();
    };

    window.addEventListener("scroll", scheduleEvaluation, { passive: true });
    window.addEventListener("resize", scheduleEvaluation, { passive: true });
    window.addEventListener(CHARACTER_SCENE_EVENT, handleSceneState);
    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);
    scheduleEvaluation();

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(pointerReset);
      window.removeEventListener("scroll", scheduleEvaluation);
      window.removeEventListener("resize", scheduleEvaluation);
      window.removeEventListener(CHARACTER_SCENE_EVENT, handleSceneState);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, [enabled, sections]);

  return snapshot;
}
