export const characterStates = [
  "idle",
  "walk",
  "walkBack",
  "lookLeft",
  "lookRight",
  "point",
  "design",
  "code",
  "analyze",
  "present",
  "celebrate",
  "wave",
] as const;

export type CharacterState = (typeof characterStates)[number];
export type CharacterPosition = "left" | "center" | "right";
export type CharacterViewport = "compact" | "mobile" | "tablet" | "desktop" | "wide";

export type CharacterSectionConfig = {
  id: string;
  state: CharacterState;
  position: CharacterPosition;
};

export type CharacterSnapshot = {
  state: CharacterState;
  activeSection: string;
  sectionProgress: number;
  position: CharacterPosition;
  viewport: CharacterViewport;
  scale: number;
};
