"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { AboutSection } from "@/components/scene/AboutSection";
import { CoreIdentitySection } from "@/components/scene/CoreIdentitySection";
import { DesignSection } from "@/components/scene/DesignSection";
import { EducationSection } from "@/components/scene/EducationSection";
import { ExperienceSection } from "@/components/scene/ExperienceSection";
import { FinalPhilosophySection, ContactSection } from "@/components/scene/FinalPhilosophySection";
import { ProjectsSection } from "@/components/scene/ProjectsSection";
import { SkillsSection } from "@/components/scene/SkillsSection";
import { Cursor } from "@/components/system/Cursor";
import { FluidMetaballSystem } from "@/components/system/FluidMetaballSystem";
import { GlobalNavigation } from "@/components/system/GlobalNavigation";
import { ScrollVelocityController, TransitionBridge } from "@/components/system/ScrollChoreography";
import { Preloader } from "@/components/system/Preloader";
import { SmoothScroll } from "@/components/system/SmoothScroll";
import { eases } from "@/lib/motion";

const disciplines = [
  "AI/ML & FRONTEND DEVELOPER",
  "UI/UX & GRAPHIC DESIGNER",
  "TECHNOLOGY & DESIGN LEADER",
] as const;

function HeroWord({ word, line, ready }: Readonly<{ word: string; line: number; ready: boolean }>) {
  const reduce = useReducedMotion();

  return (
    <span className="hero-word" aria-hidden="true">
      {Array.from(word).map((character, index) => (
        <span className="hero-letter-mask" key={`${character}-${index}`}>
          <motion.span
            className="hero-letter"
            initial={{ y: reduce ? "0%" : "118%", scale: reduce ? 1 : 1.08, opacity: reduce ? 1 : 0, filter: reduce ? "blur(0px)" : "blur(12px)" }}
            animate={
              ready || reduce
                ? { y: "0%", scale: 1, opacity: 1, filter: "blur(0px)" }
                : { y: "118%", scale: 1.08, opacity: 0, filter: "blur(12px)" }
            }
            transition={{
              duration: reduce ? 0 : 0.88,
              delay: ready && !reduce ? 0.08 + line * 0.18 + index * 0.052 : 0,
              ease: eases.enter,
            }}
          >
            {character}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function FoundationalScene() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const [introReady, setIntroReady] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const parallaxX = useSpring(pointerX, { stiffness: 100, damping: 22, mass: 0.5 });
  const parallaxY = useSpring(pointerY, { stiffness: 100, damping: 22, mass: 0.5 });
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end end"] });

  const nameY = useTransform(scrollYProgress, [0, 0.56, 1], [0, -72, -290]);
  const nameScale = useTransform(scrollYProgress, [0, 0.58, 1], [1, 0.92, 0.73]);
  const nameScaleY = useTransform(scrollYProgress, [0, 0.63, 1], [1, 0.94, 0.68]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.68, 0.97], [1, 1, 0]);
  const nameMask = useTransform(scrollYProgress, [0.54, 1], ["inset(0 0% 0 0)", "inset(0 0% 100% 0)"]);
  const nameBlur = useTransform(scrollYProgress, [0, 0.68, 1], ["blur(0px)", "blur(0.5px)", "blur(12px)"]);
  const detailY = useTransform(scrollYProgress, [0, 0.58, 1], [0, 34, 106]);
  const detailOpacity = useTransform(scrollYProgress, [0, 0.45, 0.86], [1, 1, 0]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0]);
  const lensScale = useTransform(scrollYProgress, [0, 1], [1, 3.8]);
  const lensOpacity = useTransform(scrollYProgress, [0, 0.72, 1], [0.28, 0.36, 0]);
  const portraitY = useTransform(scrollYProgress, [0, 0.72, 1], [0, -24, -112]);
  const portraitScale = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1.04, 0.82]);
  const portraitOpacity = useTransform(scrollYProgress, [0, 0.74, 1], [0.72, 0.46, 0]);

  const revealHero = useCallback(() => setIntroReady(true), []);
  const completePreloader = useCallback(() => setShowPreloader(false), []);
  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (event.pointerType === "touch") return;
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 13);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * 9);
    },
    [pointerX, pointerY],
  );
  const resetPointer = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  return (
    <SmoothScroll>
      <main id="main-content" className="foundation-page" aria-busy={!introReady} tabIndex={-1}>
        <FluidMetaballSystem className="global-fluid-system" initialScene="hero" active={introReady} heroProgress={scrollYProgress} />
        <Cursor />
        <GlobalNavigation />
        <ScrollVelocityController />
        <section ref={heroRef} id="top" className="hero-scroll" data-fluid-scene="hero" aria-label="Aditya Rai introduction">
          <div className="hero-stage" onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
            {showPreloader && <Preloader onReveal={revealHero} onComplete={completePreloader} />}
            <div className="ambient-noise" aria-hidden="true" />
            <div className="foundation-frame" aria-hidden="true" />
            <motion.figure className="hero-portrait" style={{ y: portraitY, scale: portraitScale, opacity: portraitOpacity }}>
              <Image
                src="/images/aditya/hero-portrait.webp"
                alt="Aditya Rai, AI and design professional"
                fill
                priority
                sizes="(max-width: 760px) 0px, (max-width: 1100px) 32vw, 28vw"
                quality={86}
              />
            </motion.figure>

            <motion.div
              className="hero-name-scroll"
              style={{ y: nameY, scale: nameScale, scaleY: nameScaleY, opacity: nameOpacity, clipPath: nameMask, filter: nameBlur }}
            >
              <motion.h1 className="hero-name" aria-label="Aditya Rai" style={{ x: parallaxX, y: parallaxY }}>
                <HeroWord word="ADITYA" line={0} ready={introReady} />
                <HeroWord word="RAI" line={1} ready={introReady} />
              </motion.h1>
            </motion.div>

            <motion.div className="hero-fluid-lens" style={{ x: parallaxX, y: parallaxY, scale: lensScale, opacity: lensOpacity }} aria-hidden="true" />

            <motion.div className="hero-details-scroll" style={{ y: detailY, opacity: detailOpacity }}>
              <motion.div
                className="hero-disciplines"
                initial={{ opacity: 0, y: 22 }}
                animate={introReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                transition={{ duration: reduce ? 0 : 0.75, delay: reduce ? 0 : 0.72, ease: eases.enter }}
              >
                {disciplines.map((discipline, index) => (
                  <span key={discipline}>
                    <b>0{index + 1}</b>
                    {discipline}
                  </span>
                ))}
              </motion.div>
              <motion.p
                className="hero-axis"
                initial={{ opacity: 0, y: 12 }}
                animate={introReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: reduce ? 0 : 0.64, delay: reduce ? 0 : 0.88, ease: eases.enter }}
              >
                TECHNOLOGY <i /> DESIGN <i /> LEADERSHIP
              </motion.p>
            </motion.div>

            <motion.div className="hero-scroll-indicator" style={{ opacity: indicatorOpacity }} aria-hidden="true">
              <span>SCROLL TO EXPLORE</span>
              <i />
            </motion.div>
          </div>
        </section>
        <TransitionBridge kind="hero-identity" />
        <CoreIdentitySection />
        <TransitionBridge kind="identity-about" />
        <AboutSection />
        <TransitionBridge kind="about-experience" />
        <ExperienceSection />
        <TransitionBridge kind="experience-projects" />
        <ProjectsSection />
        <TransitionBridge kind="projects-design" />
        <DesignSection />
        <TransitionBridge kind="design-skills" />
        <SkillsSection />
        <TransitionBridge kind="skills-education" />
        <EducationSection />
        <TransitionBridge kind="education-final" />
        <FinalPhilosophySection />
        <TransitionBridge kind="final-contact" />
        <ContactSection />
      </main>
    </SmoothScroll>
  );
}
