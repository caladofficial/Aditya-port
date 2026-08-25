import type { CharacterState } from "@/components/character/character.types";

export const CHARACTER_SCENE_EVENT = "aditya:character-scene";

export type CharacterSceneDetail = {
  source: string;
  state: CharacterState | null;
};

/** Sends a temporary scene-level state to the central character director. */
export function dispatchCharacterScene(detail: CharacterSceneDetail) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<CharacterSceneDetail>(CHARACTER_SCENE_EVENT, { detail }));
}
