import type { TargetAndTransition, Transition, Variants } from "framer-motion";
import { eases, spring } from "@/animations/motion";

const settle: Transition = {
  ...spring.settle,
  restDelta: 0.001,
};

const articulate: Transition = {
  duration: 0.62,
  ease: eases.reveal,
};

export const characterRigVariants: Variants = {
  idle: { rotate: 0, x: 0, transition: settle },
  walk: { rotate: 1.4, x: 3, transition: articulate },
  walkBack: { rotate: -1.2, x: -3, transition: articulate },
  lookLeft: { rotate: -0.7, x: -2, transition: settle },
  lookRight: { rotate: 0.7, x: 2, transition: settle },
  point: { rotate: -0.5, transition: settle },
  design: { rotate: -0.8, transition: settle },
  code: { rotate: 0.5, transition: settle },
  analyze: { rotate: -0.35, transition: settle },
  present: { rotate: 0.4, transition: settle },
  celebrate: { rotate: 0, transition: settle },
  wave: { rotate: -0.5, transition: settle },
};

export const characterBodyVariants: Variants = {
  idle: { rotate: 0, transition: settle },
  walk: { rotate: 1.8, transition: articulate },
  walkBack: { rotate: -1.6, transition: articulate },
  lookLeft: { rotate: -0.6, transition: settle },
  lookRight: { rotate: 0.6, transition: settle },
  point: { rotate: -1.2, transition: settle },
  design: { rotate: -0.9, transition: settle },
  code: { rotate: 0.8, transition: settle },
  analyze: { rotate: -0.5, transition: settle },
  present: { rotate: 1.1, transition: settle },
  celebrate: { rotate: 0, transition: settle },
  wave: { rotate: -0.8, transition: settle },
};

export const characterHeadVariants: Variants = {
  idle: { rotate: 0, x: 0, y: 0, transition: settle },
  walk: { rotate: 1.4, x: 2, y: 1, transition: articulate },
  walkBack: { rotate: -1.6, x: -2, y: 1, transition: articulate },
  lookLeft: { rotate: -6.5, x: -5, y: 0, transition: settle },
  lookRight: { rotate: 6, x: 5, y: 0, transition: settle },
  point: { rotate: -2.5, x: -2, y: 2, transition: settle },
  design: { rotate: -4, x: -2, y: 3, transition: settle },
  code: { rotate: 3.2, x: 2, y: 3, transition: settle },
  analyze: { rotate: -2.2, x: -1, y: 2, transition: settle },
  present: { rotate: 4, x: 3, y: -1, transition: settle },
  celebrate: { rotate: -3, y: -4, transition: settle },
  wave: { rotate: 5, x: 3, y: -1, transition: settle },
};

export const characterArmBackVariants: Variants = {
  idle: { rotate: 0, x: 0, y: 0, transition: settle },
  walk: { rotate: [-2, 3, -2], transition: { duration: 0.86, repeat: Infinity, ease: "easeInOut" } },
  walkBack: { rotate: [2, -3, 2], transition: { duration: 0.92, repeat: Infinity, ease: "easeInOut" } },
  lookLeft: { rotate: -1, transition: settle },
  lookRight: { rotate: 1, transition: settle },
  point: { rotate: -8, x: -3, y: -3, transition: settle },
  design: { rotate: -5, x: -2, y: 4, transition: settle },
  code: { rotate: 3, x: 2, y: 3, transition: settle },
  analyze: { rotate: -7, x: -3, y: 2, transition: settle },
  present: { rotate: -12, x: -6, y: -5, transition: settle },
  celebrate: { rotate: -18, x: -7, y: -10, transition: settle },
  wave: { rotate: -6, x: -3, y: -5, transition: settle },
};

export const characterArmFrontVariants: Variants = {
  idle: { rotate: 0, x: 0, y: 0, transition: settle },
  walk: { rotate: [2.5, -3, 2.5], transition: { duration: 0.86, repeat: Infinity, ease: "easeInOut" } },
  walkBack: { rotate: [-2.5, 3, -2.5], transition: { duration: 0.92, repeat: Infinity, ease: "easeInOut" } },
  lookLeft: { rotate: 1, transition: settle },
  lookRight: { rotate: -1, transition: settle },
  point: { rotate: 15, x: 14, y: -16, transition: settle },
  design: { rotate: 8, x: 7, y: -6, transition: settle },
  code: { rotate: -6, x: -4, y: 5, transition: settle },
  analyze: { rotate: 10, x: 6, y: -9, transition: settle },
  present: { rotate: 17, x: 13, y: -20, transition: settle },
  celebrate: { rotate: 21, x: 10, y: -24, transition: settle },
  wave: {
    rotate: [8, 20, 11, 20, 8],
    x: 9,
    y: -18,
    transition: { duration: 1.75, repeat: Infinity, repeatDelay: 1.8, ease: eases.glide },
  },
};

export const characterLegBackVariants: Variants = {
  idle: { rotate: 0, x: 0, transition: settle },
  walk: { rotate: [-2.8, 3, -2.8], x: [-1, 2, -1], transition: { duration: 0.86, repeat: Infinity, ease: "easeInOut" } },
  walkBack: { rotate: [2.5, -2.7, 2.5], x: [1, -2, 1], transition: { duration: 0.92, repeat: Infinity, ease: "easeInOut" } },
  lookLeft: { rotate: 0, transition: settle },
  lookRight: { rotate: 0, transition: settle },
  point: { rotate: 0.6, transition: settle },
  design: { rotate: -0.5, transition: settle },
  code: { rotate: 0.5, transition: settle },
  analyze: { rotate: -0.4, transition: settle },
  present: { rotate: 0.4, transition: settle },
  celebrate: { rotate: -1, transition: settle },
  wave: { rotate: 0.5, transition: settle },
};

export const characterLegFrontVariants: Variants = {
  idle: { rotate: 0, x: 0, transition: settle },
  walk: { rotate: [3, -2.8, 3], x: [2, -1, 2], transition: { duration: 0.86, repeat: Infinity, ease: "easeInOut" } },
  walkBack: { rotate: [-2.7, 2.5, -2.7], x: [-2, 1, -2], transition: { duration: 0.92, repeat: Infinity, ease: "easeInOut" } },
  lookLeft: { rotate: 0, transition: settle },
  lookRight: { rotate: 0, transition: settle },
  point: { rotate: -0.5, transition: settle },
  design: { rotate: 0.5, transition: settle },
  code: { rotate: -0.5, transition: settle },
  analyze: { rotate: 0.4, transition: settle },
  present: { rotate: -0.4, transition: settle },
  celebrate: { rotate: 1, transition: settle },
  wave: { rotate: -0.5, transition: settle },
};

export const characterSecondaryMotion = {
  breath: {
    scaleY: [1, 1.0045, 1],
    transition: { duration: 4.8, repeat: Infinity, ease: "easeInOut" },
  },
  head: {
    rotate: [0, -0.65, 0, 0.45, 0],
    y: [0, -0.7, 0, 0.5, 0],
    transition: { duration: 6.4, repeat: Infinity, ease: "easeInOut" },
  },
  arm: {
    rotate: [0, 0.55, 0, -0.35, 0],
    transition: { duration: 5.6, repeat: Infinity, ease: "easeInOut" },
  },
  blink: {
    opacity: [0, 0, 0.52, 0, 0, 0.38, 0, 0],
    scaleY: [0.15, 0.15, 1, 0.15, 0.15, 0.8, 0.15, 0.15],
    transition: {
      duration: 5.8,
      repeat: Infinity,
      times: [0, 0.81, 0.825, 0.845, 0.91, 0.925, 0.945, 1],
      ease: "linear",
    },
  },
} satisfies Record<string, TargetAndTransition>;
