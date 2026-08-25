"use client";

import { useReducedMotion } from "framer-motion";
import type { RefObject } from "react";
import { useEffect } from "react";
import { createGsapScope, getGsap } from "@/animations/gsap";
import { isCharacterState } from "@/components/character/character.config";
import { dispatchCharacterScene } from "@/components/character/character.events";
import type { CharacterState } from "@/components/character/character.types";

type CharacterSequenceOptions = {
  source: string;
  itemSelector?: string;
  progressProperty?: `--${string}`;
  transitionState?: CharacterState;
  reverseTransitionState?: CharacterState;
};

/** Drives a sequence of character poses from editorial scroll chapters. */
export function useCharacterSequence<T extends HTMLElement>(
  sectionRef: RefObject<T | null>,
  {
    source,
    itemSelector = "[data-character-sequence-state]",
    progressProperty = "--expertise-progress",
    transitionState,
    reverseTransitionState = "walkBack",
  }: CharacterSequenceOptions,
) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = Array.from(section.querySelectorAll<HTMLElement>(itemSelector));
    if (items.length === 0) return;

    let currentState: CharacterState | null = null;
    const emit = (state: CharacterState | null) => {
      if (currentState === state) return;
      currentState = state;
      dispatchCharacterScene({ source, state });
    };

    const stateFor = (item: HTMLElement) => {
      const state = item.dataset.characterSequenceState;
      return isCharacterState(state) ? state : null;
    };

    if (reduceMotion) {
      section.style.setProperty(progressProperty, "1");
      let frame = 0;
      const update = () => {
        frame = 0;
        const marker = window.innerHeight * 0.5;
        let closest = items[0];
        let distance = Number.POSITIVE_INFINITY;
        for (const item of items) {
          const bounds = item.getBoundingClientRect();
          const itemCenter = bounds.top + bounds.height / 2;
          const nextDistance = Math.abs(itemCenter - marker);
          if (nextDistance < distance) {
            closest = item;
            distance = nextDistance;
          }
        }

        const sectionBounds = section.getBoundingClientRect();
        emit(sectionBounds.top < window.innerHeight && sectionBounds.bottom > 0 ? stateFor(closest) : null);
      };
      const schedule = () => {
        if (!frame) frame = window.requestAnimationFrame(update);
      };
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
      schedule();
      return () => {
        window.cancelAnimationFrame(frame);
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        section.style.removeProperty(progressProperty);
        emit(null);
      };
    }

    const cleanupGsap = createGsapScope(section, () => {
      const { ScrollTrigger } = getGsap();

      ScrollTrigger.create({
        trigger: section,
        start: "top 90%",
        end: "bottom 10%",
        onUpdate: (trigger) => {
          section.style.setProperty(progressProperty, trigger.progress.toFixed(4));
        },
        onEnter: () => {
          if (transitionState) emit(transitionState);
        },
        onEnterBack: () => {
          if (transitionState) emit(reverseTransitionState);
        },
        onLeave: () => emit(null),
        onLeaveBack: () => emit(null),
      });

      items.forEach((item) => {
        const state = stateFor(item);
        if (!state) return;
        ScrollTrigger.create({
          trigger: item,
          start: "top 58%",
          end: "top 24%",
          onEnter: () => emit(state),
          onEnterBack: () => emit(state),
          onLeave: () => {
            if (transitionState) emit(transitionState);
          },
          onLeaveBack: () => {
            if (transitionState) emit(reverseTransitionState);
          },
          onToggle: (trigger) => {
            if (trigger.isActive) emit(state);
          },
        });
      });
    });

    return () => {
      cleanupGsap();
      section.style.removeProperty(progressProperty);
      emit(null);
    };
  }, [
    itemSelector,
    progressProperty,
    reduceMotion,
    reverseTransitionState,
    sectionRef,
    source,
    transitionState,
  ]);
}
