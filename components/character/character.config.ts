import {
  characterStates,
  type CharacterSectionConfig,
  type CharacterState,
} from "@/components/character/character.types";

/**
 * Canonical identity boundary.
 *
 * The current rig intentionally uses one supplied photograph as a structured
 * editorial placeholder. A future approved cutout or illustrated rig can be
 * swapped inside CanonicalCharacterAsset without changing section logic.
 */
export const CANONICAL_CHARACTER = {
  source: "/images/aditya/designer-figure.webp",
  width: 770,
  height: 1496,
  alt: "Stylized animated portrait of Aditya Rai",
  status: "canonical-photo-placeholder",
} as const;

/** Section direction is centralized here rather than embedded in scene components. */
export const characterSections = [
  { id: "top", state: "idle", position: "right" },
  { id: "about", state: "lookRight", position: "left" },
  { id: "expertise", state: "design", position: "right" },
  { id: "experience", state: "analyze", position: "left" },
  { id: "projects", state: "code", position: "right" },
  { id: "achievements", state: "celebrate", position: "left" },
  { id: "skills", state: "present", position: "right" },
  { id: "contact", state: "wave", position: "left" },
] as const satisfies readonly CharacterSectionConfig[];

export const characterStateLabels: Record<CharacterState, string> = {
  idle: "Ready / observing",
  walk: "Moving forward",
  walkBack: "Retracing path",
  lookLeft: "Scanning left",
  lookRight: "Scanning right",
  point: "Directing focus",
  design: "Design mode",
  code: "Build mode",
  analyze: "Analysis mode",
  present: "Presenting system",
  celebrate: "Milestone reached",
  wave: "Signing off",
};

export function isCharacterState(value: string | undefined): value is CharacterState {
  return characterStates.includes(value as CharacterState);
}
