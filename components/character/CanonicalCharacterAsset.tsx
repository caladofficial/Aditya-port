"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import {
  characterArmBackVariants,
  characterArmFrontVariants,
  characterBodyVariants,
  characterHeadVariants,
  characterLegBackVariants,
  characterLegFrontVariants,
  characterRigVariants,
  characterSecondaryMotion,
} from "@/animations/characterAnimations";
import { CANONICAL_CHARACTER } from "@/components/character/character.config";
import type { CharacterState } from "@/components/character/character.types";

type CanonicalCharacterAssetProps = {
  state: CharacterState;
  reducedMotion: boolean;
};

/**
 * Replaceable identity boundary for the character system.
 *
 * Every articulated layer samples the same canonical supplied photograph. No
 * alternate face is generated for an animation state. The intentionally
 * angular masks create an editorial 2.5D photo rig until an approved layered
 * cutout can replace this implementation.
 */
export function CanonicalCharacterAsset({
  state,
  reducedMotion,
}: Readonly<CanonicalCharacterAssetProps>) {
  const instanceId = useId().replaceAll(":", "");
  const id = (name: string) => `${instanceId}-${name}`;
  const image = (
    <image
      href={CANONICAL_CHARACTER.source}
      width={CANONICAL_CHARACTER.width}
      height={CANONICAL_CHARACTER.height}
      preserveAspectRatio="xMidYMid slice"
    />
  );

  return (
    <svg
      className="character-svg"
      viewBox={`0 0 ${CANONICAL_CHARACTER.width} ${CANONICAL_CHARACTER.height}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={id("leg-back")}>
          <polygon points="150,970 410,950 410,1496 82,1496 94,1230" />
        </clipPath>
        <clipPath id={id("leg-front")}>
          <polygon points="374,948 641,1012 650,1496 346,1496" />
        </clipPath>
        <clipPath id={id("body")}>
          <polygon points="166,333 450,305 611,399 662,678 594,1065 224,1110 126,676" />
        </clipPath>
        <clipPath id={id("arm-back")}>
          <polygon points="485,325 650,405 737,554 731,814 629,1087 527,1013 609,707 526,500" />
        </clipPath>
        <clipPath id={id("arm-front")}>
          <polygon points="127,515 265,482 262,725 292,899 225,1073 145,1008 164,755" />
        </clipPath>
        <clipPath id={id("face")}>
          <polygon points="125,173 380,153 431,278 361,457 185,452 83,292" />
        </clipPath>
        <clipPath id={id("hair")}>
          <polygon points="83,95 334,80 425,167 413,278 322,242 223,249 121,309 70,235" />
        </clipPath>
      </defs>

      <ellipse className="character-svg-shadow" cx="384" cy="1453" rx="244" ry="25" />

      <motion.g
        className="character-rig"
        variants={characterRigVariants}
        initial={false}
        animate={reducedMotion ? "idle" : state}
        style={{ transformBox: "fill-box", transformOrigin: "50% 96%" }}
      >
        <motion.g
          data-character-layer="legs-back"
          clipPath={`url(#${id("leg-back")})`}
          variants={characterLegBackVariants}
          style={{ transformBox: "fill-box", transformOrigin: "54% 3%" }}
        >
          {image}
        </motion.g>

        <motion.g
          data-character-layer="arm-back"
          clipPath={`url(#${id("arm-back")})`}
          variants={characterArmBackVariants}
          style={{ transformBox: "fill-box", transformOrigin: "27% 10%" }}
        >
          <motion.g
            animate={reducedMotion ? undefined : characterSecondaryMotion.arm}
            style={{ transformBox: "fill-box", transformOrigin: "27% 10%" }}
          >
            {image}
          </motion.g>
        </motion.g>

        <motion.g
          data-character-layer="body"
          clipPath={`url(#${id("body")})`}
          variants={characterBodyVariants}
          style={{ transformBox: "fill-box", transformOrigin: "50% 96%" }}
        >
          <motion.g
            animate={reducedMotion ? undefined : characterSecondaryMotion.breath}
            style={{ transformBox: "fill-box", transformOrigin: "50% 96%" }}
          >
            {image}
          </motion.g>
        </motion.g>

        <motion.g
          data-character-layer="legs-front"
          clipPath={`url(#${id("leg-front")})`}
          variants={characterLegFrontVariants}
          style={{ transformBox: "fill-box", transformOrigin: "44% 3%" }}
        >
          {image}
        </motion.g>

        <motion.g
          data-character-layer="arm-front"
          clipPath={`url(#${id("arm-front")})`}
          variants={characterArmFrontVariants}
          style={{ transformBox: "fill-box", transformOrigin: "55% 8%" }}
        >
          {image}
        </motion.g>

        <motion.g
          data-character-layer="head"
          variants={characterHeadVariants}
          style={{ transformBox: "fill-box", transformOrigin: "50% 88%" }}
        >
          <motion.g
            animate={reducedMotion ? undefined : characterSecondaryMotion.head}
            style={{ transformBox: "fill-box", transformOrigin: "50% 88%" }}
          >
            <g data-character-layer="face" clipPath={`url(#${id("face")})`}>
              {image}
            </g>
            <g data-character-layer="hair" clipPath={`url(#${id("hair")})`}>
              {image}
            </g>
            <motion.g
              className="character-blink"
              animate={reducedMotion ? undefined : characterSecondaryMotion.blink}
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            >
              <path d="M197 264 Q221 271 244 262" />
              <path d="M291 255 Q317 262 341 250" />
            </motion.g>
          </motion.g>
        </motion.g>
      </motion.g>
    </svg>
  );
}
