import type { Transition, Variants } from "framer-motion";

/**
 * One motion language for the entire portfolio. Components should compose this
 * file rather than declaring isolated timings/easings in feature code.
 */
export const eases = {
  enter: [0.16, 1, 0.3, 1],
  settle: [0.22, 1, 0.36, 1],
  exit: [0.7, 0, 0.84, 0],
  linear: [0.45, 0, 0.55, 1],
} as const;

export const duration = {
  micro: 0.18,
  quick: 0.36,
  base: 0.58,
  reveal: 0.86,
  cinematic: 1.2,
  liquid: 1.35,
} as const;

export const spring = {
  gentle: { type: "spring", stiffness: 160, damping: 20, mass: 0.8 },
  magnetic: { type: "spring", stiffness: 220, damping: 18, mass: 0.55 },
  springBack: { type: "spring", stiffness: 260, damping: 22, mass: 0.7 },
} satisfies Record<string, Transition>;

export const stagger = (step = 0.055, delayChildren = 0) => ({
  transition: { staggerChildren: step, delayChildren },
});

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.base, ease: eases.enter } },
  exit: { opacity: 0, transition: { duration: duration.quick, ease: eases.exit } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.reveal, ease: eases.enter } },
  exit: { opacity: 0, y: -10, transition: { duration: duration.quick, ease: eases.exit } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: duration.reveal, ease: eases.enter } },
  exit: { opacity: 0, scale: 1.035, transition: { duration: duration.quick, ease: eases.exit } },
};

/** Wrap text in an overflow-hidden parent before using these y-based variants. */
export const textReveal: Variants = {
  hidden: { opacity: 0, y: "112%" },
  visible: (index = 0) => ({
    opacity: 1,
    y: "0%",
    transition: { duration: duration.cinematic, delay: index * 0.075, ease: eases.enter },
  }),
};

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "105%", rotate: 1.5 },
  visible: (index = 0) => ({
    opacity: 1,
    y: "0%",
    rotate: 0,
    transition: { duration: duration.reveal, delay: index * 0.065, ease: eases.enter },
  }),
};

export const characterReveal: Variants = {
  hidden: { opacity: 0, y: "0.72em", rotate: 5 },
  visible: (index = 0) => ({
    opacity: 1,
    y: "0em",
    rotate: 0,
    transition: { duration: duration.base, delay: index * 0.024, ease: eases.enter },
  }),
};

export const maskReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: duration.cinematic, ease: eases.enter } },
};

export const clipReveal: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: duration.reveal, ease: eases.enter },
  },
};

export const floating: Variants = {
  rest: { y: 0, rotate: 0 },
  float: {
    y: [-4, 5, -4],
    rotate: [-0.5, 0.75, -0.5],
    transition: { duration: 7.2, ease: "easeInOut", repeat: Infinity },
  },
};

/** Use on an element whose border-radius is deliberately allowed to morph. */
export const liquidTransition: Variants = {
  initial: { scale: 0.94, opacity: 0, borderRadius: "58% 42% 55% 45% / 48% 58% 42% 52%" },
  enter: {
    scale: 1,
    opacity: 1,
    borderRadius: "45% 55% 43% 57% / 55% 44% 56% 45%",
    transition: { duration: duration.liquid, ease: eases.enter },
  },
  exit: {
    scale: 1.05,
    opacity: 0,
    borderRadius: "61% 39% 58% 42% / 38% 62% 38% 62%",
    transition: { duration: duration.base, ease: eases.exit },
  },
};

export const bubbleMerge: Variants = {
  apart: { x: 0, y: 0, scale: 1, opacity: 0.72 },
  merge: {
    x: 0,
    y: 0,
    scale: 1.16,
    opacity: 1,
    transition: { duration: duration.base, ease: eases.settle },
  },
};

export const bubbleSplit: Variants = {
  merged: { x: 0, y: 0, scale: 1.14, opacity: 1 },
  split: (offset: { x: number; y: number }) => ({
    x: offset.x,
    y: offset.y,
    scale: 0.9,
    opacity: 0.72,
    transition: { duration: duration.reveal, ease: eases.enter },
  }),
};

/**
 * A scroll target helper. Pass a MotionValue from useScroll/useTransform rather
 * than creating a per-section rAF loop.
 */
export const parallax = (distance = 72) => ({
  from: distance * -0.5,
  to: distance * 0.5,
});

export const magnetic = {
  defaultStrength: 0.14,
  projectStrength: 0.1,
  transition: spring.magnetic,
} as const;
