"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

type Progress = MotionValue<number>;

type EditorialBlockProps = {
  progress: Progress;
  start: number;
  end: number;
  label: string;
  children: React.ReactNode;
  className: string;
};

function EditorialBlock({ progress, start, end, label, children, className }: Readonly<EditorialBlockProps>) {
  const opacity = useTransform(progress, [start, start + 0.08, end - 0.12, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, start + 0.1, end], [30, 0, -24]);
  const clipPath = useTransform(progress, [start, start + 0.1], ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]);

  return (
    <motion.article className={`about-editorial-block ${className}`} style={{ opacity, y, clipPath }}>
      <span>{label}</span>
      <p>{children}</p>
    </motion.article>
  );
}

function Keyword({ word, index, progress }: Readonly<{ word: string; index: number; progress: Progress }>) {
  const start = 0.16 + index * 0.1;
  const opacity = useTransform(progress, [start, start + 0.07, 0.93], [0, 1, 0.45]);
  const y = useTransform(progress, [start, start + 0.1, 1], [36, 0, -16]);
  const scale = useTransform(progress, [start, start + 0.1], [1.06, 1]);

  return (
    <motion.span className={`about-keyword about-keyword--${index + 1}`} style={{ opacity, y, scale }}>
      {word}
    </motion.span>
  );
}

type OrbitConfig = {
  id: string;
  label: string;
  x: string[];
  y: string[];
};

const orbitNodes: readonly OrbitConfig[] = [
  { id: "aiml", label: "AI/ML", x: ["0vw", "-4vw", "-25vw"], y: ["0vh", "-5vh", "-17vh"] },
  { id: "development", label: "DEVELOPMENT", x: ["0vw", "5vw", "25vw"], y: ["0vh", "-4vh", "-10vh"] },
  { id: "design", label: "DESIGN", x: ["0vw", "6vw", "21vw"], y: ["0vh", "5vh", "16vh"] },
  { id: "data", label: "DATA", x: ["0vw", "-5vw", "-21vw"], y: ["0vh", "6vh", "17vh"] },
  { id: "leadership", label: "LEADERSHIP", x: ["0vw", "-8vw", "-29vw"], y: ["0vh", "1vh", "4vh"] },
];

function OrbitNode({ node, progress }: Readonly<{ node: OrbitConfig; progress: Progress }>) {
  const x = useTransform(progress, [0, 0.57, 1], node.x);
  const y = useTransform(progress, [0, 0.57, 1], node.y);
  const opacity = useTransform(progress, [0, 0.13, 0.75, 1], [0, 1, 1, 0]);
  const scale = useTransform(progress, [0, 0.5, 1], [0.86, 1, 0.7]);

  return (
    <motion.div className={`about-orbit-node about-orbit-node--${node.id}`} style={{ x, y, opacity, scale }}>
      <span>{node.label}</span>
    </motion.div>
  );
}

function PhilosophyLine({
  children,
  progress,
  start,
  className,
}: Readonly<{ children: React.ReactNode; progress: Progress; start: number; className: string }>) {
  const opacity = useTransform(progress, [start, start + 0.09, 0.92], [0, 1, 0.28]);
  const y = useTransform(progress, [start, start + 0.11, 1], [38, 0, -26]);
  const clipPath = useTransform(progress, [start, start + 0.12], ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]);

  return (
    <motion.p className={`about-philosophy-line ${className}`} style={{ opacity, y, clipPath }}>
      {children}
    </motion.p>
  );
}

export function AboutSection() {
  const openingRef = useRef<HTMLElement>(null);
  const objectRef = useRef<HTMLElement>(null);
  const philosophyRef = useRef<HTMLElement>(null);
  const { scrollYProgress: openingProgress } = useScroll({ target: openingRef, offset: ["start start", "end end"] });
  const { scrollYProgress: objectProgress } = useScroll({ target: objectRef, offset: ["start start", "end end"] });
  const { scrollYProgress: philosophyProgress } = useScroll({ target: philosophyRef, offset: ["start start", "end end"] });

  const openingOpacity = useTransform(openingProgress, [0, 0.1, 0.86, 1], [0, 1, 1, 0]);
  const openingY = useTransform(openingProgress, [0, 0.18, 1], [38, 0, -80]);
  const openingScale = useTransform(openingProgress, [0, 1], [1.04, 0.9]);
  const objectScale = useTransform(objectProgress, [0, 0.52, 0.85, 1], [0.76, 1, 1.45, 4.8]);
  const objectOpacity = useTransform(objectProgress, [0, 0.12, 0.9, 1], [0, 1, 1, 0.08]);
  const objectRotate = useTransform(objectProgress, [0, 1], [-7, 17]);
  const handoffScale = useTransform(philosophyProgress, [0.65, 0.9, 1], [0.1, 1.1, 6.4]);
  const handoffOpacity = useTransform(philosophyProgress, [0.6, 0.76, 1], [0, 0.88, 1]);
  const handoffLabelOpacity = useTransform(philosophyProgress, [0.83, 0.98], [0, 1]);

  return (
    <section id="about" className="about-section" data-fluid-scene="about" aria-labelledby="about-heading">
      <section ref={openingRef} className="about-opening" aria-label="About introduction">
        <div className="about-opening-stage">
          <p className="about-kicker" id="about-heading">
            04 / ABOUT
          </p>
          <motion.h2 className="about-opening-title" style={{ opacity: openingOpacity, y: openingY, scale: openingScale }}>
            A MULTIDISCIPLINARY
            <span>TECHNOLOGY PROFESSIONAL.</span>
          </motion.h2>
          <figure className="about-profile-stamp">
            <Image src="/images/aditya/poster-head.webp" alt="Portrait of Aditya Rai" fill sizes="(max-width: 760px) 32vw, 18vw" quality={82} loading="lazy" />
          </figure>
          <div className="about-keywords" aria-label="Disciplines">
            {["AI", "MACHINE LEARNING", "SOFTWARE", "DESIGN", "DATA", "LEADERSHIP"].map((word, index) => (
              <Keyword key={word} word={word} index={index} progress={openingProgress} />
            ))}
          </div>
          <span className="about-opening-note" aria-hidden="true">
            MULTIPLE DISCIPLINES / ONE DIRECTION
          </span>
        </div>
      </section>

      <section ref={objectRef} className="about-object-section" aria-label="Capabilities in motion">
        <div className="about-object-stage">
          <p className="about-kicker">05 / PRACTICE IN MOTION</p>
          <div className="about-orbit-system" aria-label="AI/ML, development, design, data and leadership orbiting one practice">
            <motion.div className="about-fluid-core" style={{ scale: objectScale, opacity: objectOpacity, rotate: objectRotate }} aria-hidden="true">
              <span className="about-fluid-core-glint" />
              <span className="about-fluid-core-refraction" />
            </motion.div>
            {orbitNodes.map((node) => (
              <OrbitNode key={node.id} node={node} progress={objectProgress} />
            ))}
          </div>

          <EditorialBlock progress={objectProgress} start={0.08} end={0.52} label="01 / FOUNDATION" className="about-editorial-block--one">
            RESULTS-DRIVEN B.TECH STUDENT.
          </EditorialBlock>
          <EditorialBlock progress={objectProgress} start={0.24} end={0.68} label="02 / SYSTEMS" className="about-editorial-block--two">
            AI, MACHINE LEARNING & FRONTEND DEVELOPMENT.
          </EditorialBlock>
          <EditorialBlock progress={objectProgress} start={0.42} end={0.84} label="03 / LANGUAGE" className="about-editorial-block--three">
            UI/UX, GRAPHIC DESIGN & VISUAL COMMUNICATION.
          </EditorialBlock>
          <EditorialBlock progress={objectProgress} start={0.58} end={1} label="04 / MOMENTUM" className="about-editorial-block--four">
            DATA ANALYTICS, PRODUCT THINKING & TECHNICAL LEADERSHIP.
          </EditorialBlock>
        </div>
      </section>

      <section ref={philosophyRef} className="about-philosophy" aria-label="Working philosophy">
        <div className="about-philosophy-stage">
          <p className="about-kicker">06 / PHILOSOPHY</p>
          <PhilosophyLine progress={philosophyProgress} start={0.06} className="about-philosophy-line--one">
            TECHNOLOGY.
          </PhilosophyLine>
          <PhilosophyLine progress={philosophyProgress} start={0.25} className="about-philosophy-line--two">
            DESIGN.
          </PhilosophyLine>
          <PhilosophyLine progress={philosophyProgress} start={0.44} className="about-philosophy-line--three">
            LEADERSHIP.
          </PhilosophyLine>
          <PhilosophyLine progress={philosophyProgress} start={0.68} className="about-philosophy-line--final">
            ONE IDEA.<br />
            <em>THREE PERSPECTIVES.</em>
          </PhilosophyLine>

          <motion.div className="about-experience-fluid" style={{ scale: handoffScale, opacity: handoffOpacity }} aria-hidden="true" />
          <motion.p className="about-experience-handoff" style={{ opacity: handoffLabelOpacity }}>
            07 / EXPERIENCE
          </motion.p>
        </div>
      </section>
    </section>
  );
}
