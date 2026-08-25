"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { MouseEvent } from "react";
import { useRef } from "react";
import { eases } from "@/animations/motion";
import { useSmoothScroll } from "@/components/system/SmoothScroll";
import { Button } from "@/components/ui/Button";
import { identity } from "@/data/design-system";

const statement = ["Design.", "Build.", "Create."] as const;

export function FoundationHero({ ready }: Readonly<{ ready: boolean }>) {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollTo } = useSmoothScroll();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const statementY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -90]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 54]);
  const motionDuration = (duration: number) => reduceMotion ? 0 : duration;
  const motionDelay = (delay: number) => reduceMotion ? 0 : delay;

  const navigateTo = (targetId: string) => (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const target = document.getElementById(targetId);
    if (!target) return;
    event.preventDefault();
    window.history.pushState(null, "", `#${targetId}`);
    scrollTo(target, {
      offset: -76,
      onComplete: event.detail === 0 ? () => target.focus({ preventScroll: true }) : undefined,
    });
  };

  return (
    <section ref={heroRef} id="top" className="foundation-hero" aria-labelledby="foundation-title">
      <motion.div
        className="hero-background"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ duration: motionDuration(0.62), ease: eases.reveal }}
        aria-hidden="true"
      >
        <div className="hero-grid" />
        <div className="hero-depth" />
        <motion.div
          className="hero-signal"
          initial={{ opacity: 0, scale: 0.78, rotate: -12 }}
          animate={ready ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
          transition={{ duration: motionDuration(1.1), delay: motionDelay(0.1), ease: eases.reveal }}
        ><i /><i /></motion.div>
      </motion.div>

      <motion.div
        className="hero-identity"
        initial={{ opacity: 0, y: 14 }}
        animate={ready ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: motionDuration(0.64), delay: motionDelay(0.2), ease: eases.reveal }}
      >
        <p><span>AR / 001</span>{identity.name}</p>
        <div>
          {identity.professionalIdentity.map((role, index) => (
            <span key={role}><b>0{index + 1}</b>{role}</span>
          ))}
        </div>
      </motion.div>

      <motion.div className="hero-statement" style={{ y: statementY }}>
        <h1 id="foundation-title">
          {statement.map((line, index) => (
            <span className="hero-line-mask" key={line}>
              <motion.span
                initial={{ y: "115%", rotate: index === 2 ? 2 : 0 }}
                animate={ready ? { y: "0%", rotate: 0 } : undefined}
                transition={{
                  duration: motionDuration(0.92),
                  delay: motionDelay(0.32 + index * 0.12),
                  ease: eases.reveal,
                }}
              >{line}</motion.span>
            </span>
          ))}
        </h1>
      </motion.div>

      <motion.figure
        className="hero-portrait"
        style={{ y: portraitY }}
        initial={{
          opacity: 0,
          scale: 1.08,
          clipPath: "polygon(42% 43%, 57% 40%, 61% 57%, 45% 61%)",
        }}
        animate={ready ? {
          opacity: 1,
          scale: 1,
          clipPath: "polygon(8% 4%, 91% 0, 100% 88%, 81% 100%, 0 93%, 3% 16%)",
        } : undefined}
        transition={{ duration: motionDuration(1.08), delay: motionDelay(0.72), ease: eases.reveal }}
      >
        <Image
          src="/images/aditya/hero-portrait.webp"
          alt={`Portrait of ${identity.name}`}
          fill
          priority
          sizes="(max-width: 767px) 58vw, 31vw"
          quality={88}
        />
        <span className="hero-portrait-wash" aria-hidden="true" />
        <span className="hero-portrait-grain" aria-hidden="true" />
        <figcaption><span>Portrait / 01</span><b>Aditya Rai</b></figcaption>
      </motion.figure>

      <motion.div
        className="hero-support"
        initial={{ opacity: 0, y: 18 }}
        animate={ready ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: motionDuration(0.68), delay: motionDelay(1.18), ease: eases.reveal }}
      >
        <p>I’m Aditya Rai, a UI/UX designer and frontend developer focused on creating thoughtful digital experiences through design, code, and technology.</p>
      </motion.div>

      <motion.div
        className="hero-actions"
        initial={{ opacity: 0, y: 16 }}
        animate={ready ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: motionDuration(0.68), delay: motionDelay(1.36), ease: eases.reveal }}
      >
        <Button href="#projects" cursorLabel="EXPLORE" characterState="point" onClick={navigateTo("projects")}>View My Work</Button>
        <Button href="#contact" variant="text" magnetic characterState="wave" onClick={navigateTo("contact")}>Contact Me</Button>
      </motion.div>

      <motion.div
        className="hero-scroll-note"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ duration: motionDuration(0.5), delay: motionDelay(1.52) }}
        aria-hidden="true"
      >
        <span>Scroll to explore</span><i />
      </motion.div>
    </section>
  );
}
