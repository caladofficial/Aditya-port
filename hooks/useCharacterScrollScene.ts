"use client";

import { useReducedMotion } from "framer-motion";
import type { RefObject } from "react";
import { useEffect } from "react";
import { createGsapScope, getGsap } from "@/animations/gsap";
import { dispatchCharacterScene } from "@/components/character/character.events";
import type { CharacterState } from "@/components/character/character.types";

const DEFAULT_ACTIVE_RANGE = [0.2, 0.8] as const;

type CharacterScrollSceneOptions = {
  source: string;
  enteringState: CharacterState;
  activeState: CharacterState;
  compactActiveState?: CharacterState;
  leavingState: CharacterState;
  reverseState?: CharacterState;
  activeRange?: readonly [number, number];
};

/**
 * Connects a section's ScrollTrigger progress to the central character state.
 * The section declares intent; animation variants remain inside the character system.
 */
export function useCharacterScrollScene<T extends HTMLElement>(
  sectionRef: RefObject<T | null>,
  {
    source,
    enteringState,
    activeState,
    compactActiveState = activeState,
    leavingState,
    reverseState = "walkBack",
    activeRange = DEFAULT_ACTIVE_RANGE,
  }: CharacterScrollSceneOptions,
) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let currentState: CharacterState | null = null;
    const resolvedActiveState = () => window.innerWidth < 768 ? compactActiveState : activeState;
    const emit = (state: CharacterState | null) => {
      if (currentState === state) return;
      currentState = state;
      dispatchCharacterScene({ source, state });
    };

    if (reduceMotion) {
      section.style.setProperty("--scene-progress", "1");
      const observer = new IntersectionObserver(([entry]) => {
        emit(entry.isIntersecting ? resolvedActiveState() : null);
      }, { threshold: 0.22 });
      observer.observe(section);
      return () => {
        observer.disconnect();
        emit(null);
      };
    }

    const cleanupGsap = createGsapScope(section, () => {
      const { ScrollTrigger } = getGsap();
      ScrollTrigger.create({
        trigger: section,
        start: "top 88%",
        end: "bottom 12%",
        onUpdate: (trigger) => {
          const progress = trigger.progress;
          section.style.setProperty("--scene-progress", progress.toFixed(4));

          if (progress < activeRange[0]) {
            emit(trigger.direction >= 0 ? enteringState : reverseState);
          } else if (progress > activeRange[1]) {
            emit(trigger.direction >= 0 ? leavingState : reverseState);
          } else {
            emit(resolvedActiveState());
          }
        },
        onLeave: () => emit(null),
        onLeaveBack: () => emit(null),
      });
    });

    return () => {
      cleanupGsap();
      section.style.removeProperty("--scene-progress");
      emit(null);
    };
  }, [activeRange, activeState, compactActiveState, enteringState, leavingState, reduceMotion, reverseState, sectionRef, source]);
}
