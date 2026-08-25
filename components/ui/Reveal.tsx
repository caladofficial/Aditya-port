"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { eases, duration } from "@/animations/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  distance?: number;
};

export function Reveal({ children, delay = 0, distance = 28, className, ...props }: Readonly<RevealProps>) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: distance }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: duration.reveal, delay, ease: eases.reveal }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
