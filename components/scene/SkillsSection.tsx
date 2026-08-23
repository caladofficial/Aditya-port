"use client";

import { useCallback, useMemo, useState, type CSSProperties } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

type Orbit = {
  id: "aiml" | "development" | "design" | "data";
  label: string;
  radius: string;
  skills: readonly string[];
};

const orbits: readonly Orbit[] = [
  {
    id: "aiml",
    label: "AI / ML",
    radius: "min(12vw, 14vh)",
    skills: ["Python", "Data Processing", "Predictive Analytics", "Conversational AI"],
  },
  {
    id: "development",
    label: "DEVELOPMENT",
    radius: "min(22vw, 25vh)",
    skills: ["React", "JavaScript", "Django", "Java", "SQL", "Firebase", "Git"],
  },
  {
    id: "design",
    label: "DESIGN",
    radius: "min(31vw, 35vh)",
    skills: ["Figma", "UI/UX", "Graphic Design", "Adobe Creative Suite", "Brand Identity"],
  },
  {
    id: "data",
    label: "DATA",
    radius: "min(40vw, 42vh)",
    skills: ["Power BI", "Data Analysis", "Data Visualization", "Reporting"],
  },
] as const;

const connections: Record<string, readonly string[]> = {
  React: ["Frontend", "JavaScript", "UI", "Responsive Development"],
  Python: ["AI / ML", "Data Processing", "Predictive Analytics", "Automation"],
  "Conversational AI": ["Natural Language", "Interaction", "Data", "User Guidance"],
  Figma: ["UI", "Systems", "Prototype", "Visual Design"],
  "Graphic Design": ["Visual Communication", "Branding", "Creative Direction", "Layout"],
  "Power BI": ["Data Analysis", "Visualization", "Reporting", "Decision Support"],
  Firebase: ["React", "Real-Time Data", "Backend", "Product"],
  SQL: ["Data", "Reporting", "Analysis", "Systems"],
};

function SkillNode({
  skill,
  angle,
  activeSkill,
  related,
  hasActive,
  onActivate,
  onDeactivate,
}: Readonly<{
  skill: string;
  angle: number;
  activeSkill: string | null;
  related: readonly string[];
  hasActive: boolean;
  onActivate: (skill: string) => void;
  onDeactivate: () => void;
}>) {
  const isActive = activeSkill === skill;
  const isRelated = related.includes(skill);

  return (
    <div className="skill-node-shell" style={{ transform: `rotate(${angle}deg) translateX(var(--orbit-radius))` }}>
      <motion.button
        type="button"
        className="skill-node"
        style={{ rotate: -angle }}
        data-cursor-label="EXPLORE"
        aria-pressed={isActive}
        animate={{ scale: isActive ? 1.18 : isRelated ? 1.07 : hasActive ? 0.82 : 1, opacity: hasActive && !isActive && !isRelated ? 0.34 : 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 21, mass: 0.6 }}
        onPointerEnter={(event) => {
          if (event.pointerType !== "touch") onActivate(skill);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType !== "touch") onDeactivate();
        }}
        onFocus={() => onActivate(skill)}
        onBlur={onDeactivate}
        onClick={() => onActivate(skill)}
      >
        {skill}
      </motion.button>
    </div>
  );
}

function SkillOrbit({
  orbit,
  index,
  activeSkill,
  related,
  onActivate,
  onDeactivate,
}: Readonly<{
  orbit: Orbit;
  index: number;
  activeSkill: string | null;
  related: readonly string[];
  onActivate: (skill: string) => void;
  onDeactivate: () => void;
}>) {
  const hasActive = activeSkill !== null;

  return (
    <div className={`skills-orbit skills-orbit--${orbit.id}`} style={{ "--orbit-radius": orbit.radius } as CSSProperties}>
      <span className="skills-orbit-label">{orbit.label}</span>
      {orbit.skills.map((skill, skillIndex) => (
        <SkillNode
          key={skill}
          skill={skill}
          angle={(skillIndex / orbit.skills.length) * 360 - 90 + index * 7}
          activeSkill={activeSkill}
          related={related}
          hasActive={hasActive}
          onActivate={onActivate}
          onDeactivate={onDeactivate}
        />
      ))}
    </div>
  );
}

export function SkillsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-7, 7]), { stiffness: 80, damping: 18, mass: 0.8 });
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [6, -6]), { stiffness: 80, damping: 18, mass: 0.8 });
  const related = useMemo(() => (activeSkill ? connections[activeSkill] ?? [] : []), [activeSkill]);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (prefersReducedMotion || event.pointerType === "touch") return;
      pointerX.set(event.clientX / window.innerWidth - 0.5);
      pointerY.set(event.clientY / window.innerHeight - 0.5);
    },
    [pointerX, pointerY, prefersReducedMotion],
  );

  const resetPerspective = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  return (
    <section id="skills" className="skills-section" data-fluid-scene="skills" aria-labelledby="skills-heading">
      <div className="skills-ecosystem" onPointerMove={handlePointerMove} onPointerLeave={resetPerspective}>
        <div className="skills-stage">
          <p className="skills-kicker" id="skills-heading">11 / SKILL ECOSYSTEM</p>
          <p className="skills-instruction">MOVE THROUGH THE SYSTEM</p>
          <motion.div className="skills-galaxy" style={prefersReducedMotion ? undefined : { rotateX, rotateY }}>
            <div className="skills-core">
              <span>ADITYA</span>
              <strong>RAI</strong>
            </div>
            {orbits.map((orbit, index) => (
              <SkillOrbit
                key={orbit.id}
                orbit={orbit}
                index={index}
                activeSkill={activeSkill}
                related={related}
                onActivate={setActiveSkill}
                onDeactivate={() => setActiveSkill(null)}
              />
            ))}
          </motion.div>
          <div className={`skills-related ${activeSkill ? "is-active" : ""}`} aria-live="polite">
            {activeSkill && (
              <>
                <strong>{activeSkill}</strong>
                <span>{related.length ? related.map((item) => <i key={item}>→ {item}</i>) : <i>→ MULTIDISCIPLINARY PRACTICE</i>}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
