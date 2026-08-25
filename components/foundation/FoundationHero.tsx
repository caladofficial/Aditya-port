"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { identity } from "@/data/design-system";
import { eases } from "@/animations/motion";

export function FoundationHero({ ready }: Readonly<{ ready: boolean }>) {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -120]);
  const metaOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const motionDuration = (duration: number) => reduceMotion ? 0 : duration;

  return (
    <section ref={heroRef} id="top" className="foundation-hero" aria-labelledby="foundation-title">
      <div className="hero-grid" aria-hidden="true" />
      <motion.div
        className="hero-signal"
        initial={{ opacity: 0, scale: 0.72, rotate: -18 }}
        animate={ready ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
        transition={{ duration: motionDuration(1.25), ease: eases.reveal }}
        aria-hidden="true"
      ><i /><i /></motion.div>

      <motion.div className="hero-title-wrap" style={{ y: titleY }}>
        <motion.p
          className="hero-kicker"
          initial={{ opacity: 0, y: 14 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: motionDuration(0.7), delay: motionDuration(0.08), ease: eases.reveal }}
        ><span>AR / 01</span> {identity.brandAxis.join(" × ")}</motion.p>
        <h1 id="foundation-title">
          <span className="hero-line-mask">
            <motion.span
              initial={{ y: "110%" }}
              animate={ready ? { y: "0%" } : undefined}
              transition={{ duration: motionDuration(1.05), ease: eases.reveal }}
            >Design</motion.span>
          </span>
          <em className="hero-line-mask">
            <motion.span
              initial={{ y: "115%", rotate: 3 }}
              animate={ready ? { y: "0%", rotate: 0 } : undefined}
              transition={{ duration: motionDuration(1.15), delay: motionDuration(0.08), ease: eases.reveal }}
            >system.</motion.span>
          </em>
        </h1>
        <motion.p
          className="hero-intent"
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: motionDuration(0.7), delay: motionDuration(0.42), ease: eases.reveal }}
        >A cinematic interface language for <strong>{identity.name}.</strong></motion.p>
      </motion.div>

      <motion.div
        className="hero-roles"
        style={{ opacity: metaOpacity }}
        initial={{ x: 28 }}
        animate={ready ? { x: 0 } : undefined}
        transition={{ duration: motionDuration(0.9), delay: motionDuration(0.46), ease: eases.reveal }}
      >
        {identity.professionalIdentity.map((role, index) => (
          <motion.span
            key={role}
            initial={{ opacity: 0, x: 18 }}
            animate={ready ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: motionDuration(0.6), delay: motionDuration(0.52 + index * 0.09), ease: eases.reveal }}
          ><b>0{index + 1}</b>{role}</motion.span>
        ))}
      </motion.div>

      <motion.div className="hero-scroll-note" style={{ opacity: metaOpacity }} aria-hidden="true">
        <span>Scroll to inspect</span><i />
      </motion.div>
      <div className="hero-name-ticker" aria-hidden="true">
        <div>{Array.from({ length: 6 }, (_, index) => <span key={index}>{identity.name.toUpperCase()} <i>✦</i></span>)}</div>
      </div>
    </section>
  );
}
