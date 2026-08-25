"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { CanonicalCharacterAsset } from "@/components/character/CanonicalCharacterAsset";
import {
  CANONICAL_CHARACTER,
  characterStateLabels,
} from "@/components/character/character.config";
import type {
  CharacterPosition,
  CharacterState,
} from "@/components/character/character.types";

type CharacterCoordinates = {
  x?: number | string;
  y?: number | string;
};

export type AdityaCharacterProps = {
  state?: CharacterState;
  position?: CharacterPosition | CharacterCoordinates;
  scale?: number;
  className?: string;
  reducedMotion?: boolean;
};

type CharacterStyle = CSSProperties & {
  "--character-scale": number;
  "--character-x": string;
  "--character-y": string;
};

function positionValue(value: number | string | undefined) {
  if (typeof value === "number") return `${value}px`;
  return value ?? "0px";
}

/** Reusable, state-driven visual identity for Aditya Rai. */
export function AdityaCharacter({
  state = "idle",
  position = "right",
  scale = 1,
  className = "",
  reducedMotion,
}: Readonly<AdityaCharacterProps>) {
  const systemReducedMotion = useReducedMotion();
  const shouldReduceMotion = reducedMotion ?? Boolean(systemReducedMotion);
  const coordinates = typeof position === "object" ? position : undefined;
  const positionName = typeof position === "string" ? position : "custom";
  const style: CharacterStyle = {
    "--character-scale": scale,
    "--character-x": positionValue(coordinates?.x),
    "--character-y": positionValue(coordinates?.y),
  };

  return (
    <figure
      className={`aditya-character ${className}`.trim()}
      data-state={state}
      data-position={positionName}
      style={style}
      role="img"
      aria-label={CANONICAL_CHARACTER.alt}
    >
      <div className="character-shadow" aria-hidden="true" />
      <div className="character-frame" aria-hidden="true">
        <CanonicalCharacterAsset state={state} reducedMotion={shouldReduceMotion} />
        <motion.div
          className="character-accessory"
          initial={false}
          animate={shouldReduceMotion
            ? { opacity: 0.72, x: 0, scale: 1 }
            : { opacity: 1, x: [0, 2, 0], scale: 1 }}
          transition={{ duration: 2.8, repeat: shouldReduceMotion ? 0 : Infinity, ease: "easeInOut" }}
        >
          <i />
          <span>{characterStateLabels[state]}</span>
          <b>{state === "code" ? "</>" : state === "design" ? "✦" : "AR"}</b>
        </motion.div>
        <div className="character-signal" aria-hidden="true"><i /><i /></div>
      </div>
      <figcaption aria-hidden="true">
        <span>Aditya / 01</span>
        <b>{state}</b>
      </figcaption>
    </figure>
  );
}
