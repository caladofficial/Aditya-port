"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

type BridgeKind =
  | "hero-identity"
  | "identity-about"
  | "about-experience"
  | "experience-projects"
  | "health-transport"
  | "projects-design"
  | "design-skills"
  | "skills-education"
  | "education-final"
  | "final-contact";

type Progress = MotionValue<number>;

const sceneByBridge: Record<BridgeKind, string> = {
  "hero-identity": "hero",
  "identity-about": "about",
  "about-experience": "experience",
  "experience-projects": "projects",
  "health-transport": "projects",
  "projects-design": "design",
  "design-skills": "skills",
  "skills-education": "technology",
  "education-final": "philosophy",
  "final-contact": "contact",
};

/** A short, event-driven velocity signal shared by all bridges through CSS. */
export function ScrollVelocityController() {
  useEffect(() => {
    const root = document.documentElement;
    let lastY = window.scrollY;
    let lastTime = performance.now();
    let target = 0;
    let current = 0;
    let frame = 0;

    const settle = () => {
      current += (target - current) * 0.16;
      target *= 0.86;
      root.style.setProperty("--scroll-velocity", current.toFixed(3));

      if (current > 0.004 || target > 0.004) {
        frame = window.requestAnimationFrame(settle);
      } else {
        root.style.setProperty("--scroll-velocity", "0");
        frame = 0;
      }
    };

    const onScroll = () => {
      const now = performance.now();
      const elapsed = Math.max(16, now - lastTime);
      const delta = Math.abs(window.scrollY - lastY);
      target = Math.min(1, delta / elapsed / 1.5);
      lastY = window.scrollY;
      lastTime = now;
      if (!frame) frame = window.requestAnimationFrame(settle);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      root.style.removeProperty("--scroll-velocity");
    };
  }, []);

  return null;
}

function Dot({ progress, fromX, fromY, toX = 0, toY = 0, index }: Readonly<{ progress: Progress; fromX: number; fromY: number; toX?: number; toY?: number; index: number }>) {
  const x = useTransform(progress, [0, 1], [fromX, toX]);
  const y = useTransform(progress, [0, 1], [fromY, toY]);
  const scale = useTransform(progress, [0, 0.7, 1], [0.7, 1, 0.45]);
  const opacity = useTransform(progress, [0, 0.1, 0.9, 1], [0.15, 0.8, 1, 0]);

  return <motion.span className={`bridge-dot bridge-dot--${(index % 3) + 1}`} style={{ x, y, scale, opacity }} aria-hidden="true" />;
}

function HeroIdentityBridge({ progress }: Readonly<{ progress: Progress }>) {
  const scale = useTransform(progress, [0, 0.7, 1], [0.44, 2.1, 8]);
  const opacity = useTransform(progress, [0, 0.92, 1], [0.4, 0.9, 0]);
  return <motion.span className="bridge-core bridge-core--hero" style={{ scale, opacity }} aria-hidden="true" />;
}

function IdentityAboutBridge({ progress }: Readonly<{ progress: Progress }>) {
  const coreScale = useTransform(progress, [0.48, 1], [0.18, 1.5]);
  const coreOpacity = useTransform(progress, [0.4, 0.7, 1], [0, 0.88, 1]);
  return (
    <>
      <Dot progress={progress} fromX={-260} fromY={-145} index={0} />
      <Dot progress={progress} fromX={245} fromY={-125} index={1} />
      <Dot progress={progress} fromX={35} fromY={190} index={2} />
      <motion.span className="bridge-core bridge-core--merge" style={{ scale: coreScale, opacity: coreOpacity }} aria-hidden="true" />
    </>
  );
}

function AboutExperienceBridge({ progress }: Readonly<{ progress: Progress }>) {
  const scaleY = useTransform(progress, [0, 0.65, 1], [0.35, 2.7, 8]);
  const scaleX = useTransform(progress, [0, 1], [0.9, 1.2]);
  const opacity = useTransform(progress, [0, 0.9, 1], [0.1, 0.95, 0]);
  return <motion.span className="bridge-stretch" style={{ scaleX, scaleY, opacity }} aria-hidden="true" />;
}

function ExperienceProjectsBridge({ progress }: Readonly<{ progress: Progress }>) {
  const coreScale = useTransform(progress, [0.45, 1], [0.2, 1.7]);
  const coreOpacity = useTransform(progress, [0.4, 0.72, 1], [0, 0.8, 1]);
  return (
    <>
      {[
        [-250, -145], [220, -160], [280, 118], [-240, 152], [-55, 220], [70, -230],
      ].map(([x, y], index) => <Dot key={index} progress={progress} fromX={x} fromY={y} index={index} />)}
      <motion.span className="bridge-core bridge-core--project" style={{ scale: coreScale, opacity: coreOpacity }} aria-hidden="true" />
    </>
  );
}

function RouteBridge({ progress, design = false }: Readonly<{ progress: Progress; design?: boolean }>) {
  const routeOpacity = useTransform(progress, [0, 0.5, 1], [0.8, 1, 0]);
  const compositionsOpacity = useTransform(progress, [0.48, 0.76, 1], [0, 0.9, 1]);
  const compositionScale = useTransform(progress, [0.48, 1], [0.4, 1]);
  return (
    <>
      <motion.svg className="bridge-route" viewBox="0 0 1000 520" fill="none" style={{ opacity: routeOpacity }} aria-hidden="true">
        <motion.path d="M-20 382C134 414 197 105 360 180C516 253 507 404 668 293C786 213 832 96 1034 124" pathLength={progress} />
      </motion.svg>
      {design && <motion.div className="bridge-compositions" style={{ opacity: compositionsOpacity, scale: compositionScale }} aria-hidden="true"><i /><i /><i /></motion.div>}
    </>
  );
}

function DesignSkillsBridge({ progress }: Readonly<{ progress: Progress }>) {
  const opacity = useTransform(progress, [0, 0.45, 1], [0.8, 1, 0]);
  return (
    <>
      <motion.div className="bridge-design-collapse" style={{ opacity }} aria-hidden="true"><i /><i /><i /><i /></motion.div>
      {[
        [-180, -95], [175, -105], [205, 118], [-190, 125], [0, -205], [0, 205],
      ].map(([x, y], index) => <Dot key={index} progress={progress} fromX={x} fromY={y} index={index} />)}
    </>
  );
}

function SkillsEducationBridge({ progress }: Readonly<{ progress: Progress }>) {
  const dotsOpacity = useTransform(progress, [0, 0.6, 1], [0.8, 0.65, 0]);
  const typeOpacity = useTransform(progress, [0.52, 0.78, 1], [0, 0.86, 1]);
  const typeScale = useTransform(progress, [0.52, 1], [0.86, 1.12]);
  return (
    <>
      <motion.div className="bridge-settling-dots" style={{ opacity: dotsOpacity }} aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></motion.div>
      <motion.span className="bridge-settled-type" style={{ opacity: typeOpacity, scale: typeScale }}>EDUCATION</motion.span>
    </>
  );
}

function EducationFinalBridge({ progress }: Readonly<{ progress: Progress }>) {
  const scale = useTransform(progress, [0, 1], [0.52, 3.1]);
  const opacity = useTransform(progress, [0, 0.85, 1], [0.25, 0.92, 0]);
  return <motion.span className="bridge-growing-type" style={{ scale, opacity }}>TECHNOLOGY · DESIGN · LEADERSHIP</motion.span>;
}

function FinalContactBridge({ progress }: Readonly<{ progress: Progress }>) {
  const scale = useTransform(progress, [0, 0.65, 1], [0.65, 1.3, 4.6]);
  const opacity = useTransform(progress, [0, 0.7, 1], [0.75, 0.85, 0]);
  return <motion.span className="bridge-core bridge-core--contact" style={{ scale, opacity }} aria-hidden="true" />;
}

function Visual({ kind, progress }: Readonly<{ kind: BridgeKind; progress: Progress }>) {
  switch (kind) {
    case "hero-identity": return <HeroIdentityBridge progress={progress} />;
    case "identity-about": return <IdentityAboutBridge progress={progress} />;
    case "about-experience": return <AboutExperienceBridge progress={progress} />;
    case "experience-projects": return <ExperienceProjectsBridge progress={progress} />;
    case "health-transport": return <RouteBridge progress={progress} />;
    case "projects-design": return <RouteBridge progress={progress} design />;
    case "design-skills": return <DesignSkillsBridge progress={progress} />;
    case "skills-education": return <SkillsEducationBridge progress={progress} />;
    case "education-final": return <EducationFinalBridge progress={progress} />;
    case "final-contact": return <FinalContactBridge progress={progress} />;
  }
}

export function TransitionBridge({ kind }: Readonly<{ kind: BridgeKind }>) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section ref={ref} className={`transition-bridge transition-bridge--${kind}`} data-fluid-scene={sceneByBridge[kind]} aria-hidden="true">
      <div className="transition-bridge-stage">
        <div className="transition-bridge-velocity"><Visual kind={kind} progress={scrollYProgress} /></div>
      </div>
    </section>
  );
}
