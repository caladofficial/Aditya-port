"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { setFluidScene, type FluidSceneName } from "@/lib/fluid-bubbles";
import { eases, spring } from "@/lib/motion";

type WorldId = "technology" | "design" | "leadership";

type World = {
  id: WorldId;
  label: string;
  scene: FluidSceneName;
  skills: readonly string[];
};

const worlds: readonly World[] = [
  {
    id: "technology",
    label: "TECHNOLOGY",
    scene: "technology",
    skills: ["AI/ML", "Python", "React", "Django", "Java", "SQL", "Firebase", "Data Analytics"],
  },
  {
    id: "design",
    label: "DESIGN",
    scene: "design",
    skills: ["UI/UX", "Figma", "Graphic Design", "Brand Identity", "Visual Communication", "Adobe Creative Suite"],
  },
  {
    id: "leadership",
    label: "LEADERSHIP",
    scene: "leadership",
    skills: ["Team Management", "Project Planning", "Technical Coordination", "Creative Direction", "Mentoring", "Innovation"],
  },
] as const;

function IdentityStatement({
  children,
  progress,
  start,
  end,
  className,
}: Readonly<{
  children: React.ReactNode;
  progress: MotionValue<number>;
  start: number;
  end: number;
  className: string;
}>) {
  const opacity = useTransform(progress, [start, start + 0.075, end - 0.085, end], [0, 1, 1, 0.2]);
  const y = useTransform(progress, [start, start + 0.11, end], [46, 0, -22]);
  const scale = useTransform(progress, [start, start + 0.1, end], [1.035, 1, 0.96]);
  const clipPath = useTransform(progress, [start, start + 0.12], ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]);

  return (
    <motion.p className={`identity-statement ${className}`} style={{ opacity, y, scale, clipPath }}>
      {children}
    </motion.p>
  );
}

function IdentityWorld({
  world,
  index,
  active,
  isQuiet,
  onActivate,
  onDeactivate,
}: Readonly<{
  world: World;
  index: number;
  active: boolean;
  isQuiet: boolean;
  onActivate: (id: WorldId) => void;
  onDeactivate: () => void;
}>) {
  const reduce = useReducedMotion();

  return (
    <motion.button
      className={`identity-world identity-world--${world.id}`}
      type="button"
      aria-pressed={active}
      aria-label={`${world.label}: reveal capabilities`}
      animate={{ scale: active ? 1.055 : isQuiet ? 0.94 : 1, opacity: isQuiet ? 0.38 : 1 }}
      transition={reduce ? { duration: 0 } : spring.gentle}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") onActivate(world.id);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "touch") onDeactivate();
      }}
      onFocus={() => onActivate(world.id)}
      onBlur={onDeactivate}
      onClick={() => onActivate(world.id)}
    >
      <span className="identity-world-sheen" aria-hidden="true" />
      <span className="identity-world-number">0{index + 1}</span>
      <span className="identity-world-title">{world.label}</span>
      <motion.ul className="identity-world-skills" initial={false} animate={active ? "active" : "idle"}>
        {world.skills.map((skill, skillIndex) => (
          <motion.li
            key={skill}
            variants={{
              idle: { opacity: 0, y: 12, filter: "blur(5px)" },
              active: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.48, delay: skillIndex * 0.038, ease: eases.enter },
              },
            }}
          >
            {skill}
          </motion.li>
        ))}
      </motion.ul>
      <span className="identity-world-hint">{active ? "ACTIVE" : "EXPLORE"}</span>
    </motion.button>
  );
}

export function CoreIdentitySection() {
  const introRef = useRef<HTMLElement>(null);
  const worldsRef = useRef<HTMLElement>(null);
  const [activeWorld, setActiveWorld] = useState<WorldId | null>(null);
  const { scrollYProgress: introProgress } = useScroll({ target: introRef, offset: ["start start", "end end"] });
  const { scrollYProgress: worldsProgress } = useScroll({ target: worldsRef, offset: ["start start", "end end"] });

  const technologyX = useTransform(worldsProgress, [0, 0.71, 1], ["0vw", "0vw", "26vw"]);
  const technologyY = useTransform(worldsProgress, [0, 0.71, 1], ["0vh", "0vh", "19vh"]);
  const designX = useTransform(worldsProgress, [0, 0.71, 1], ["0vw", "0vw", "0vw"]);
  const designY = useTransform(worldsProgress, [0, 0.71, 1], ["0vh", "0vh", "-19vh"]);
  const leadershipX = useTransform(worldsProgress, [0, 0.71, 1], ["0vw", "0vw", "-26vw"]);
  const leadershipY = useTransform(worldsProgress, [0, 0.71, 1], ["0vh", "0vh", "16vh"]);
  const worldsOpacity = useTransform(worldsProgress, [0.73, 1], [1, 0]);
  const worldsScale = useTransform(worldsProgress, [0.7, 1], [1, 0.58]);
  const mergeScale = useTransform(worldsProgress, [0.72, 1], [0.12, 1.6]);
  const mergeOpacity = useTransform(worldsProgress, [0.7, 0.86, 1], [0, 0.82, 1]);
  const finalNameOpacity = useTransform(worldsProgress, [0.84, 0.98], [0, 1]);
  const finalNameY = useTransform(worldsProgress, [0.84, 1], [18, 0]);

  useEffect(() => {
    if (!activeWorld) return;
    setFluidScene(worlds.find((world) => world.id === activeWorld)?.scene ?? "technology");
  }, [activeWorld]);

  const activate = (id: WorldId) => setActiveWorld(id);
  const deactivate = () => {
    setActiveWorld(null);
    setFluidScene("technology");
  };

  return (
    <section className="core-identity" data-fluid-scene="technology" aria-labelledby="identity-heading">
      <section ref={introRef} className="identity-intro" aria-label="Core identity introduction">
        <div className="identity-intro-stage">
          <p className="identity-eyebrow" id="identity-heading">
            02 / CORE IDENTITY
          </p>
          <IdentityStatement progress={introProgress} start={0.03} end={0.37} className="identity-statement--one">
            I DON&apos;T JUST BUILD SOFTWARE.
          </IdentityStatement>
          <IdentityStatement progress={introProgress} start={0.25} end={0.59} className="identity-statement--two">
            I DESIGN EXPERIENCES.
          </IdentityStatement>
          <IdentityStatement progress={introProgress} start={0.47} end={0.81} className="identity-statement--three">
            I LEAD IDEAS INTO EXECUTION.
          </IdentityStatement>
          <IdentityStatement progress={introProgress} start={0.69} end={1} className="identity-statement--four">
            I BUILD <em>INTELLIGENT</em> TECHNOLOGY.
          </IdentityStatement>
          <span className="identity-intro-coordinate" aria-hidden="true">
            THREE WORLDS / ONE PRACTICE
          </span>
        </div>
      </section>

      <section ref={worldsRef} className="identity-worlds-section" aria-label="Technology, design and leadership worlds">
        <div className="identity-worlds-stage">
          <p className="identity-eyebrow identity-eyebrow--worlds">03 / EXPLORE THE SYSTEM</p>
          <motion.div className="identity-world-wrap identity-world-wrap--technology" style={{ x: technologyX, y: technologyY, opacity: worldsOpacity, scale: worldsScale }}>
            <IdentityWorld
              world={worlds[0]}
              index={0}
              active={activeWorld === "technology"}
              isQuiet={activeWorld !== null && activeWorld !== "technology"}
              onActivate={activate}
              onDeactivate={deactivate}
            />
          </motion.div>
          <motion.div className="identity-world-wrap identity-world-wrap--design" style={{ x: designX, y: designY, opacity: worldsOpacity, scale: worldsScale }}>
            <IdentityWorld
              world={worlds[1]}
              index={1}
              active={activeWorld === "design"}
              isQuiet={activeWorld !== null && activeWorld !== "design"}
              onActivate={activate}
              onDeactivate={deactivate}
            />
          </motion.div>
          <motion.div className="identity-world-wrap identity-world-wrap--leadership" style={{ x: leadershipX, y: leadershipY, opacity: worldsOpacity, scale: worldsScale }}>
            <IdentityWorld
              world={worlds[2]}
              index={2}
              active={activeWorld === "leadership"}
              isQuiet={activeWorld !== null && activeWorld !== "leadership"}
              onActivate={activate}
              onDeactivate={deactivate}
            />
          </motion.div>

          <motion.div className="identity-merge-core" style={{ opacity: mergeOpacity, scale: mergeScale }} aria-hidden="true">
            <span className="identity-merge-glint" />
            <motion.span className="identity-merge-name" style={{ opacity: finalNameOpacity, y: finalNameY }}>
              ADITYA RAI
            </motion.span>
          </motion.div>
          <motion.p className="identity-merge-caption" style={{ opacity: finalNameOpacity }}>
            TECHNOLOGY <i /> DESIGN <i /> LEADERSHIP
          </motion.p>
        </div>
      </section>
    </section>
  );
}
