import type { Transition, Variants } from "framer-motion";

/** Shared motion grammar. Feature code composes these values; it does not invent timing. */
export const eases = {
  reveal: [0.16, 1, 0.3, 1],
  glide: [0.22, 1, 0.36, 1],
  exit: [0.7, 0, 0.84, 0],
  linear: [0, 0, 1, 1],
} as const;

export const duration = {
  micro: 0.16,
  quick: 0.32,
  base: 0.56,
  reveal: 0.82,
  cinematic: 1.15,
} as const;

export const spring = {
  magnetic: { type: "spring", stiffness: 230, damping: 20, mass: 0.55 },
  settle: { type: "spring", stiffness: 150, damping: 22, mass: 0.8 },
} satisfies Record<string, Transition>;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.reveal, ease: eases.reveal } },
};

export const maskReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: duration.cinematic, ease: eases.reveal } },
};

export const stagger = (step = 0.055, delayChildren = 0) => ({
  transition: { staggerChildren: step, delayChildren },
});

export const magnetic = {
  defaultStrength: 0.12,
  strongStrength: 0.18,
  transition: spring.magnetic,
} as const;
