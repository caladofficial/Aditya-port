"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { eases } from "@/animations/motion";
import { AdityaCharacter } from "@/components/character/AdityaCharacter";
import { useCharacterState } from "@/hooks/useCharacterState";

type CharacterDirectorProps = {
  ready: boolean;
};

type DirectorStyle = CSSProperties & {
  "--section-progress": number;
};

/** Owns global placement and connects the character rig to the state machine. */
export function CharacterDirector({ ready }: Readonly<CharacterDirectorProps>) {
  const reduceMotion = useReducedMotion();
  const character = useCharacterState({ enabled: ready });
  const style: DirectorStyle = { "--section-progress": character.sectionProgress };

  return (
    <AnimatePresence>
      {ready && (
        <motion.aside
          className="character-director"
          data-position={character.position}
          data-section={character.activeSection}
          data-viewport={character.viewport}
          style={style}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.72, ease: eases.reveal }}
          aria-label="Aditya character system"
        >
          <motion.div
            className="character-positioner"
            layout={reduceMotion ? false : "position"}
            transition={{ duration: 0.82, ease: eases.glide }}
          >
            <AdityaCharacter
              state={character.state}
              position={character.position}
              scale={character.scale}
              reducedMotion={Boolean(reduceMotion)}
            />
          </motion.div>

          <div className="character-director-rail" aria-hidden="true">
            <span>{character.activeSection}</span>
            <i><b /></i>
            <small>{String(Math.round(character.sectionProgress * 100)).padStart(2, "0")}</small>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
