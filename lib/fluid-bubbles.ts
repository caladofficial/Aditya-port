export const FLUID_SCENE_EVENT = "aditya:fluid-scene";

export type BubbleKind = "hero" | "section" | "content" | "interactive";
export type FluidSceneName = "hero" | "technology" | "design" | "leadership" | "about" | "experience" | "projects" | "skills" | "philosophy" | "contact";

type SceneRule = {
  shift: readonly [number, number];
  radius: number;
  opacity: number;
  energy: number;
};

export type FluidScene = {
  name: FluidSceneName;
  scrollResponse: number;
  rules: Record<BubbleKind, SceneRule>;
};

export type FluidBubbleSeed = {
  id: string;
  kind: BubbleKind;
  /** Normalized resting position. */
  position: readonly [number, number];
  /** Required physical properties — materialized in canvas pixels at runtime. */
  velocity: readonly [number, number];
  mass: number;
  radius: number;
  opacity: number;
  depth: number;
  interactionStrength: number;
  color: string;
  mergeGroup: "cool" | "violet" | "neutral";
};

const heroRules: Record<BubbleKind, SceneRule> = {
  hero: { shift: [0, 0], radius: 1, opacity: 1, energy: 1 },
  section: { shift: [0, 0], radius: 1, opacity: 0.9, energy: 0.84 },
  content: { shift: [0, 0], radius: 1, opacity: 0.78, energy: 1.05 },
  interactive: { shift: [0, 0], radius: 1, opacity: 0.92, energy: 1.2 },
};

/**
 * A future section only needs `data-fluid-scene="design"` to retune this one
 * global system. The field springs into these targets rather than remounting.
 */
export const fluidScenes: Record<FluidSceneName, FluidScene> = {
  hero: { name: "hero", scrollResponse: 0.62, rules: heroRules },
  technology: {
    name: "technology",
    scrollResponse: 0.9,
    rules: {
      hero: { shift: [0.13, -0.1], radius: 0.82, opacity: 0.78, energy: 0.7 },
      section: { shift: [-0.08, 0.02], radius: 1.2, opacity: 1, energy: 1.1 },
      content: { shift: [0.05, -0.06], radius: 0.88, opacity: 0.82, energy: 0.82 },
      interactive: { shift: [-0.04, 0.06], radius: 1.06, opacity: 0.92, energy: 1.35 },
    },
  },
  design: {
    name: "design",
    scrollResponse: 0.7,
    rules: {
      hero: { shift: [-0.17, 0.06], radius: 0.75, opacity: 0.6, energy: 0.72 },
      section: { shift: [0.11, -0.12], radius: 1.28, opacity: 1, energy: 0.85 },
      content: { shift: [-0.12, 0.1], radius: 1.14, opacity: 1, energy: 1.18 },
      interactive: { shift: [0.09, 0.03], radius: 1.18, opacity: 1, energy: 1.3 },
    },
  },
  leadership: {
    name: "leadership",
    scrollResponse: 0.56,
    rules: {
      hero: { shift: [0.04, 0.15], radius: 0.9, opacity: 0.72, energy: 0.55 },
      section: { shift: [-0.16, -0.08], radius: 1.08, opacity: 0.9, energy: 0.62 },
      content: { shift: [0.12, -0.11], radius: 0.78, opacity: 0.68, energy: 0.7 },
      interactive: { shift: [0.02, -0.14], radius: 0.95, opacity: 0.86, energy: 0.92 },
    },
  },
  about: {
    name: "about",
    scrollResponse: 0.64,
    rules: {
      hero: { shift: [-0.06, 0.08], radius: 0.8, opacity: 0.64, energy: 0.58 },
      section: { shift: [0.08, -0.05], radius: 1.18, opacity: 0.96, energy: 0.8 },
      content: { shift: [-0.09, 0.04], radius: 1.08, opacity: 0.94, energy: 1.08 },
      interactive: { shift: [0.12, -0.1], radius: 0.94, opacity: 0.84, energy: 1.1 },
    },
  },
  experience: {
    name: "experience",
    scrollResponse: 0.78,
    rules: {
      hero: { shift: [0.09, -0.06], radius: 0.72, opacity: 0.54, energy: 0.64 },
      section: { shift: [-0.12, 0.08], radius: 1.32, opacity: 1, energy: 1.03 },
      content: { shift: [0.11, -0.1], radius: 1.05, opacity: 0.94, energy: 1.16 },
      interactive: { shift: [0.05, 0.1], radius: 1.1, opacity: 1, energy: 1.3 },
    },
  },
  projects: {
    name: "projects",
    scrollResponse: 0.84,
    rules: {
      hero: { shift: [-0.1, 0.04], radius: 0.78, opacity: 0.62, energy: 0.74 },
      section: { shift: [0.1, -0.12], radius: 1.26, opacity: 1, energy: 1.1 },
      content: { shift: [-0.06, 0.13], radius: 1.12, opacity: 1, energy: 1.28 },
      interactive: { shift: [0.08, 0.02], radius: 1.22, opacity: 1, energy: 1.45 },
    },
  },
  skills: {
    name: "skills",
    scrollResponse: 0.7,
    rules: {
      hero: { shift: [0.04, -0.11], radius: 0.7, opacity: 0.48, energy: 0.48 },
      section: { shift: [-0.08, 0.1], radius: 1.18, opacity: 0.9, energy: 0.8 },
      content: { shift: [0.1, 0.04], radius: 1.22, opacity: 1, energy: 1.2 },
      interactive: { shift: [-0.07, -0.06], radius: 1.15, opacity: 0.94, energy: 1.22 },
    },
  },
  philosophy: {
    name: "philosophy",
    scrollResponse: 0.2,
    rules: {
      hero: { shift: [-0.06, 0.07], radius: 1.04, opacity: 0.72, energy: 0.25 },
      section: { shift: [0.06, -0.04], radius: 0.95, opacity: 0.58, energy: 0.2 },
      content: { shift: [-0.03, 0.05], radius: 0.8, opacity: 0.44, energy: 0.15 },
      interactive: { shift: [0.04, -0.06], radius: 0.78, opacity: 0.42, energy: 0.18 },
    },
  },
  contact: {
    name: "contact",
    scrollResponse: 0.5,
    rules: {
      hero: { shift: [-0.05, -0.13], radius: 0.72, opacity: 0.45, energy: 0.42 },
      section: { shift: [0.1, 0.12], radius: 0.78, opacity: 0.56, energy: 0.5 },
      content: { shift: [-0.14, -0.08], radius: 0.64, opacity: 0.58, energy: 0.6 },
      interactive: { shift: [0.02, 0.04], radius: 1.25, opacity: 1, energy: 1.15 },
    },
  },
};

/**
 * This single inventory gives the global field its five distinct roles. The
 * normalized seed data gets converted to physical values by the canvas system.
 */
export const fluidBubbleSeeds: readonly FluidBubbleSeed[] = [
  {
    id: "hero-cyan",
    kind: "hero",
    position: [0.75, 0.26],
    velocity: [-0.02, 0.015],
    mass: 11,
    radius: 0.245,
    opacity: 0.34,
    depth: 0.96,
    interactionStrength: 1,
    color: "104, 227, 255",
    mergeGroup: "cool",
  },
  {
    id: "hero-blue",
    kind: "hero",
    position: [0.57, 0.64],
    velocity: [0.014, -0.018],
    mass: 9.5,
    radius: 0.205,
    opacity: 0.3,
    depth: 0.84,
    interactionStrength: 0.82,
    color: "87, 121, 255",
    mergeGroup: "cool",
  },
  {
    id: "hero-violet",
    kind: "hero",
    position: [0.29, 0.76],
    velocity: [0.018, 0.01],
    mass: 10.5,
    radius: 0.18,
    opacity: 0.24,
    depth: 0.72,
    interactionStrength: 0.65,
    color: "164, 131, 255",
    mergeGroup: "violet",
  },
  {
    id: "section-azure",
    kind: "section",
    position: [0.92, 0.8],
    velocity: [-0.03, 0.012],
    mass: 6.8,
    radius: 0.115,
    opacity: 0.18,
    depth: 0.48,
    interactionStrength: 0.62,
    color: "74, 177, 238",
    mergeGroup: "cool",
  },
  {
    id: "section-lilac",
    kind: "section",
    position: [0.16, 0.18],
    velocity: [0.015, -0.022],
    mass: 7.2,
    radius: 0.108,
    opacity: 0.15,
    depth: 0.38,
    interactionStrength: 0.5,
    color: "145, 114, 227",
    mergeGroup: "violet",
  },
  {
    id: "content-cyan",
    kind: "content",
    position: [0.48, 0.42],
    velocity: [0.038, 0.026],
    mass: 3.8,
    radius: 0.058,
    opacity: 0.17,
    depth: 0.64,
    interactionStrength: 1.12,
    color: "103, 226, 255",
    mergeGroup: "cool",
  },
  {
    id: "content-blue",
    kind: "content",
    position: [0.69, 0.9],
    velocity: [-0.04, 0.018],
    mass: 3.4,
    radius: 0.052,
    opacity: 0.14,
    depth: 0.56,
    interactionStrength: 1.04,
    color: "105, 129, 248",
    mergeGroup: "cool",
  },
  {
    id: "content-violet",
    kind: "content",
    position: [0.08, 0.56],
    velocity: [0.03, -0.035],
    mass: 3.9,
    radius: 0.049,
    opacity: 0.13,
    depth: 0.31,
    interactionStrength: 0.88,
    color: "177, 139, 255",
    mergeGroup: "violet",
  },
  {
    id: "interactive-explore",
    kind: "interactive",
    position: [0.84, 0.52],
    velocity: [-0.028, 0.04],
    mass: 2.7,
    radius: 0.064,
    opacity: 0.23,
    depth: 1,
    interactionStrength: 1.3,
    color: "111, 229, 255",
    mergeGroup: "cool",
  },
  {
    id: "interactive-ripple",
    kind: "interactive",
    position: [0.4, 0.2],
    velocity: [0.032, -0.026],
    mass: 2.5,
    radius: 0.056,
    opacity: 0.19,
    depth: 0.9,
    interactionStrength: 1.25,
    color: "162, 129, 255",
    mergeGroup: "violet",
  },
] as const;

export const isFluidSceneName = (value: string | undefined): value is FluidSceneName =>
  Boolean(value && value in fluidScenes);

export function setFluidScene(scene: FluidSceneName) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<FluidSceneName>(FLUID_SCENE_EVENT, { detail: scene }));
}
