"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

type Role = {
  index: number;
  title: readonly string[];
  organisation: string;
  meta: readonly string[];
  capabilities: readonly string[];
  objectWord: string;
  orbit: readonly string[];
  image?: { src: string; alt: string };
  metrics?: readonly string[];
};

const roles: readonly Role[] = [
  {
    index: 1,
    title: ["LEADER"],
    organisation: "TEAM EVOLVEX",
    meta: ["United Institute of Technology", "Prayagraj"],
    capabilities: ["TEAM COORDINATION", "PROJECT PLANNING", "IDEATION", "PROTOTYPING", "TECHNICAL DIRECTION", "MENTORING", "EXECUTION"],
    objectWord: "LEAD",
    orbit: ["PLAN", "BUILD", "COORDINATE", "EXECUTE"],
    image: { src: "/images/aditya/campus-leadership.webp", alt: "Aditya Rai at United Institute of Technology" },
  },
  {
    index: 2,
    title: ["HEAD GRAPHIC", "DESIGNER"],
    organisation: "E-CELL UIT",
    meta: ["Creative leadership / visual systems"],
    capabilities: ["CREATIVE DIRECTION", "EVENT BRANDING", "VISUAL IDENTITY", "SOCIAL MEDIA", "PROMOTIONAL DESIGN", "TEAM LEADERSHIP"],
    objectWord: "DIRECT",
    orbit: ["BRAND", "SHAPE", "SIGNAL", "CREATE"],
    metrics: ["20+ DESIGN / UI/UX PROJECTS", "~30% BRAND VISIBILITY IMPROVEMENT"],
  },
  {
    index: 3,
    title: ["HEAD GRAPHIC", "DESIGNER"],
    organisation: "UNITED INCUBATION HUB",
    meta: ["Innovation ecosystem / startup culture"],
    capabilities: ["STARTUPS", "INNOVATION", "BRANDING", "EVENTS", "CREATIVE DIRECTION"],
    objectWord: "STORY",
    orbit: ["START", "INVENT", "FRAME", "GROW"],
  },
  {
    index: 4,
    title: ["SMART INDIA", "HACKATHON"],
    organisation: "TEAM LEADER",
    meta: ["JAN 2025 — OCT 2025"],
    capabilities: ["PROBLEM", "IDEATION", "PLANNING", "DEVELOPMENT", "TESTING", "PRESENTATION"],
    objectWord: "SOLVE",
    orbit: ["THINK", "TEST", "ITERATE", "PITCH"],
  },
  {
    index: 5,
    title: ["DESIGNER"],
    organisation: "E-CELL UIT",
    meta: ["JAN 2025 — PRESENT"],
    capabilities: ["20+ PROJECTS", "UI/UX", "GRAPHIC DESIGN", "VISUAL COMMUNICATION"],
    objectWord: "MAKE",
    orbit: ["INTERFACE", "VISUAL", "SYSTEM", "CLARITY"],
  },
  {
    index: 6,
    title: ["DATA ANALYST"],
    organisation: "CAPEX ALLOCATION ADVISORY",
    meta: ["MUMBAI", "JAN 2023 — JAN 2024"],
    capabilities: ["DATA ANALYSIS", "VISUALIZATION", "REPORTING", "AUTOMATION", "DECISION SUPPORT"],
    objectWord: "INSIGHT",
    orbit: ["SIGNAL", "MODEL", "REPORT", "DECIDE"],
  },
] as const;

type Progress = MotionValue<number>;

function Capability({ label, index, total, progress }: Readonly<{ label: string; index: number; total: number; progress: Progress }>) {
  const start = 0.14 + index * (0.49 / total);
  const opacity = useTransform(progress, [start, start + 0.065, 0.88], [0, 1, 0]);
  const x = useTransform(progress, [start, start + 0.09, 0.9], [28, 0, -18]);
  const filter = useTransform(progress, [start, start + 0.07], ["blur(6px)", "blur(0px)"]);

  return (
    <motion.li style={{ opacity, x, filter }}>
      <i />
      {label}
    </motion.li>
  );
}

function RoleMetric({ metric, index, progress }: Readonly<{ metric: string; index: number; progress: Progress }>) {
  const start = 0.58 + index * 0.1;
  const opacity = useTransform(progress, [start, start + 0.08, 0.92], [0, 1, 0]);
  const y = useTransform(progress, [start, start + 0.08], [14, 0]);

  return (
    <motion.span style={{ opacity, y }}>
      {metric}
    </motion.span>
  );
}

function RoleOrbit({ word, index, progress }: Readonly<{ word: string; index: number; progress: Progress }>) {
  const opacity = useTransform(progress, [0.12, 0.24, 0.82, 1], [0, 1, 1, 0]);
  const scale = useTransform(progress, [0.12, 0.5, 1], [0.8, 1, 0.65]);
  const rotate = useTransform(progress, [0, 1], [index % 2 === 0 ? -7 : 8, index % 2 === 0 ? 8 : -7]);

  return (
    <motion.span className={`experience-orbit-word experience-orbit-word--${index + 1}`} style={{ opacity, scale, rotate }}>
      {word}
    </motion.span>
  );
}

function ExperienceRole({ role }: Readonly<{ role: Role }>) {
  const roleRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: roleRef, offset: ["start start", "end end"] });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1, 0.84, 1], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.13, 1], [46, 0, -88]);
  const objectScale = useTransform(scrollYProgress, [0, 0.42, 0.83, 1], [0.72, 1, 1.28, 3.8]);
  const objectRotate = useTransform(scrollYProgress, [0, 1], [-8 + role.index * 2, 18 - role.index]);
  const objectOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const metaOpacity = useTransform(scrollYProgress, [0.06, 0.16, 0.79, 0.95], [0, 1, 1, 0]);

  return (
    <section ref={roleRef} className={`experience-role experience-role--${role.index}`} aria-label={`${role.title.join(" ")} at ${role.organisation}`}>
      <div className="experience-role-stage">
        <span className="experience-role-index" aria-hidden="true">
          {String(role.index).padStart(2, "0")}
        </span>
        <p className="experience-kicker">EXPERIENCE / {String(role.index).padStart(2, "0")}</p>

        <motion.div className="experience-role-heading" style={{ opacity: titleOpacity, y: titleY }}>
          <h3>
            {role.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h3>
          <p>{role.organisation}</p>
        </motion.div>

        <motion.div className="experience-role-meta" style={{ opacity: metaOpacity }}>
          {role.meta.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </motion.div>

        {role.image && (
          <figure className="experience-role-portrait">
            <Image src={role.image.src} alt={role.image.alt} fill sizes="(max-width: 760px) 30vw, 16vw" quality={80} loading="lazy" />
          </figure>
        )}

        <div className="experience-object-system" aria-hidden="true">
          <motion.div className="experience-organic-object" style={{ scale: objectScale, rotate: objectRotate, opacity: objectOpacity }}>
            <span className="experience-object-glint" />
            <strong>{role.objectWord}</strong>
          </motion.div>
          {role.orbit.map((word, index) => (
            <RoleOrbit key={word} word={word} index={index} progress={scrollYProgress} />
          ))}
        </div>

        <ul className="experience-capabilities">
          {role.capabilities.map((capability, index) => (
            <Capability key={capability} label={capability} index={index} total={role.capabilities.length} progress={scrollYProgress} />
          ))}
        </ul>

        {role.metrics && (
          <div className="experience-role-metrics">
            {role.metrics.map((metric, index) => (
              <RoleMetric key={metric} metric={metric} index={index} progress={scrollYProgress} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ExperienceIntro() {
  const introRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: introRef, offset: ["start start", "end end"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const titleScale = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.87, 0.65]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);
  const numberScale = useTransform(scrollYProgress, [0, 1], [1, 4.4]);
  const numberOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [0.22, 0.46, 0]);

  return (
    <section ref={introRef} className="experience-intro" aria-labelledby="experience-heading">
      <div className="experience-intro-stage">
        <p className="experience-kicker">07 / PRACTICE & LEADERSHIP</p>
        <motion.h2 id="experience-heading" style={{ y: titleY, scale: titleScale, opacity: titleOpacity }}>
          EXPERIENCE
        </motion.h2>
        <motion.span className="experience-intro-number" style={{ scale: numberScale, opacity: numberOpacity }} aria-hidden="true">
          01
        </motion.span>
        <p className="experience-intro-note">A VERTICAL JOURNEY THROUGH LEADERSHIP, DESIGN & SYSTEMS.</p>
      </div>
    </section>
  );
}

function ConvergenceOrb({
  progress,
  index,
  xEnd,
  yEnd,
  opacity,
}: Readonly<{ progress: Progress; index: number; xEnd: string; yEnd: string; opacity: MotionValue<number> }>) {
  // Each role-object begins in its own orbit, then converges into one centre.
  const x = useTransform(progress, [0, 1], [xEnd, "0vw"]);
  const y = useTransform(progress, [0, 1], [yEnd, "0vh"]);
  const scale = useTransform(progress, [0, 0.68, 1], [0.64, 1, 0.35]);

  return <motion.span className={`experience-convergence-orb experience-convergence-orb--${index + 1}`} style={{ x, y, scale, opacity }} aria-hidden="true" />;
}

function ExperienceConvergence() {
  const convergenceRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: convergenceRef, offset: ["start start", "end end"] });
  const positions = [
    ["-26vw", "-16vh"],
    ["23vw", "-18vh"],
    ["29vw", "11vh"],
    ["-24vw", "17vh"],
    ["-7vw", "24vh"],
    ["7vw", "-27vh"],
  ] as const;
  const objectOpacity = useTransform(scrollYProgress, [0, 0.72, 1], [0.82, 1, 0]);
  const coreScale = useTransform(scrollYProgress, [0.65, 1], [0.16, 2]);
  const coreOpacity = useTransform(scrollYProgress, [0.62, 0.82, 1], [0, 0.86, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0.83, 1], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.83, 1], [24, 0]);

  return (
    <section ref={convergenceRef} className="experience-convergence" aria-label="Experience convergence">
      <div className="experience-convergence-stage">
        <p className="experience-kicker">08 / CONVERGENCE</p>
        {positions.map(([xEnd, yEnd], index) => (
          <ConvergenceOrb key={index} progress={scrollYProgress} index={index} xEnd={xEnd} yEnd={yEnd} opacity={objectOpacity} />
        ))}
        <motion.div className="experience-convergence-core" style={{ scale: coreScale, opacity: coreOpacity }} aria-hidden="true" />
        <motion.h2 className="experience-convergence-title" style={{ opacity: titleOpacity, y: titleY }}>
          BUILDING<br />
          <em>EXPERIENCE.</em>
        </motion.h2>
        <motion.p className="experience-projects-handoff" style={{ opacity: titleOpacity }}>
          09 / PROJECTS
        </motion.p>
      </div>
    </section>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="experience-section" data-fluid-scene="experience">
      <ExperienceIntro />
      {roles.map((role) => (
        <ExperienceRole key={role.index} role={role} />
      ))}
      <ExperienceConvergence />
    </section>
  );
}
