"use client";

import { Fragment, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion";
import { projects, type Project, type ProjectId } from "@/lib/projects";
import { TransitionBridge } from "@/components/system/ScrollChoreography";

type Progress = MotionValue<number>;

function ProjectSkill({ label, index, total, progress, className = "" }: Readonly<{ label: string; index: number; total: number; progress: Progress; className?: string }>) {
  const start = 0.12 + index * (0.44 / total);
  const opacity = useTransform(progress, [start, start + 0.07, 0.78, 0.96], [0, 1, 1, 0]);
  const scale = useTransform(progress, [start, start + 0.08], [0.84, 1]);
  const y = useTransform(progress, [start, start + 0.08], [18, 0]);

  return (
    <motion.span className={className} style={{ opacity, scale, y }}>
      {label}
    </motion.span>
  );
}

function ProjectDetail({ detail, index, progress }: Readonly<{ detail: string; index: number; progress: Progress }>) {
  const start = 0.52 + index * 0.055;
  const opacity = useTransform(progress, [start, start + 0.065, 0.92], [0, 1, 0]);
  const x = useTransform(progress, [start, start + 0.075, 0.94], [28, 0, -16]);
  const filter = useTransform(progress, [start, start + 0.07], ["blur(6px)", "blur(0px)"]);

  return (
    <motion.li style={{ opacity, x, filter }}>
      <i />
      {detail}
    </motion.li>
  );
}

function ProjectHeading({ project, progress }: Readonly<{ project: Project; progress: Progress }>) {
  const opacity = useTransform(progress, [0, 0.08, 0.77, 0.95], [0, 1, 1, 0]);
  const y = useTransform(progress, [0, 0.11, 0.95], [40, 0, -70]);

  return (
    <motion.header className="project-heading" style={{ opacity, y }}>
      <p>
        PROJECT / {String(project.index).padStart(2, "0")}
        {project.id === "healthguard" && <em> / FLAGSHIP SYSTEM</em>}
      </p>
      <h3>{project.name}</h3>
      <span>{project.subtitle}</span>
      <small>{project.period}</small>
    </motion.header>
  );
}

function RouteLine({ progress, className = "" }: Readonly<{ progress: Progress; className?: string }>) {
  const pathLength = useTransform(progress, [0.65, 1], [0, 1]);
  const opacity = useTransform(progress, [0.64, 0.73, 1], [0, 1, 0.64]);

  return (
    <motion.svg className={`project-route-line ${className}`} viewBox="0 0 1000 520" fill="none" aria-hidden="true" style={{ opacity }}>
      <motion.path d="M-30 420C142 412 169 120 342 183C506 243 510 415 667 308C777 234 834 73 1040 112" pathLength={pathLength} />
    </motion.svg>
  );
}

function HealthguardWorld({ project, progress }: Readonly<{ project: Project; progress: Progress }>) {
  const sphereScale = useTransform(progress, [0, 0.31, 0.67, 0.84, 1], [0.64, 1, 4.25, 7.2, 0.5]);
  const sphereOpacity = useTransform(progress, [0, 0.08, 0.8, 0.96, 1], [0, 1, 1, 0.35, 0]);
  const sphereRotate = useTransform(progress, [0, 1], [-9, 16]);
  const nameOpacity = useTransform(progress, [0.08, 0.2, 0.68], [0, 1, 0]);
  const infoOpacity = useTransform(progress, [0.54, 0.65, 0.91], [0, 1, 0]);
  const routeOpacity = useTransform(progress, [0.79, 0.92, 1], [0, 1, 1]);

  return (
    <>
      <div className="healthguard-world">
        <motion.div className="healthguard-sphere" style={{ scale: sphereScale, opacity: sphereOpacity, rotate: sphereRotate }}>
          <span className="healthguard-sphere-glint" />
          <motion.strong style={{ opacity: nameOpacity }}>HEALTHGUARD</motion.strong>
        </motion.div>
        <div className="healthguard-skill-ring" aria-label="HealthGuard technologies">
          {project.skills.map((skill, index) => (
            <ProjectSkill key={skill} label={skill} index={index} total={project.skills.length} progress={progress} className={`healthguard-skill healthguard-skill--${index + 1}`} />
          ))}
        </div>
      </div>

      <motion.ul className="healthguard-details" style={{ opacity: infoOpacity }}>
        {project.details.map((detail, index) => (
          <ProjectDetail key={detail} detail={detail} index={index} progress={progress} />
        ))}
      </motion.ul>
      <motion.div className="healthguard-route-morph" style={{ opacity: routeOpacity }}>
        <RouteLine progress={progress} />
      </motion.div>
    </>
  );
}

function ProjectOutcome({ value, label, index, progress }: Readonly<{ value: string; label: string; index: number; progress: Progress }>) {
  const start = 0.46 + index * 0.12;
  const opacity = useTransform(progress, [start, start + 0.085, 0.93], [0, 1, 0]);
  const y = useTransform(progress, [start, start + 0.09], [44, 0]);
  const scale = useTransform(progress, [start, start + 0.09], [0.9, 1]);

  return (
    <motion.article style={{ opacity, y, scale }}>
      <strong>{value}</strong>
      <span>{label}</span>
    </motion.article>
  );
}

function TransportWorld({ project, progress }: Readonly<{ project: Project; progress: Progress }>) {
  const mapOpacity = useTransform(progress, [0, 0.09, 0.92, 1], [0, 1, 1, 0]);
  const vehicleX = useTransform(progress, [0.08, 0.26, 0.49, 0.72, 1], ["-31vw", "-18vw", "0vw", "19vw", "33vw"]);
  const vehicleY = useTransform(progress, [0.08, 0.26, 0.49, 0.72, 1], ["18vh", "-4vh", "8vh", "-10vh", "4vh"]);
  const vehicleScale = useTransform(progress, [0.08, 0.2, 1], [0, 1, 0.7]);
  const techOpacity = useTransform(progress, [0.21, 0.35, 0.88], [0, 1, 0]);

  return (
    <>
      <motion.div className="transport-map-environment" style={{ opacity: mapOpacity }} aria-hidden="true">
        <span className="transport-map-grid" />
        <RouteLine progress={progress} className="transport-route" />
        <motion.span className="transport-vehicle" style={{ x: vehicleX, y: vehicleY, scale: vehicleScale }} />
        <span className="transport-origin">ORIGIN</span>
        <span className="transport-destination">DESTINATION</span>
      </motion.div>

      <div className="transport-capabilities" aria-label="Transport system capabilities">
        {project.skills.map((skill, index) => (
          <ProjectSkill key={skill} label={skill} index={index} total={project.skills.length} progress={progress} className="transport-capability" />
        ))}
      </div>
      <motion.div className="transport-technologies" style={{ opacity: techOpacity }}>
        {project.technologies.map((technology) => (
          <span key={technology}>{technology}</span>
        ))}
      </motion.div>
      <div className="transport-outcomes">
        {project.outcomes?.map((outcome, index) => (
          <ProjectOutcome key={outcome.value} value={outcome.value} label={outcome.label} index={index} progress={progress} />
        ))}
      </div>
    </>
  );
}

function ProjectChapter({ project, onPreview }: Readonly<{ project: Project; onPreview: (id: ProjectId) => void }>) {
  const projectRef = useRef<HTMLElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const { scrollYProgress } = useScroll({ target: projectRef, offset: ["start start", "end end"] });
  const mobileItems = project.kind === "sphere" ? project.details : [...project.skills, ...project.technologies];

  return (
    <section
      ref={projectRef}
      className={`project-chapter project-chapter--${project.kind}`}
      aria-label={`${project.name} project`}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") onPreview(project.id);
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const distance = event.changedTouches[0].clientX - touchStartX.current;
        if (distance > 52) setMobileExpanded(true);
        if (distance < -52) setMobileExpanded(false);
        touchStartX.current = null;
      }}
    >
      <div className="project-stage" data-cursor="project" data-cursor-label="VIEW" data-mobile-expanded={mobileExpanded}>
        <ProjectHeading project={project} progress={scrollYProgress} />
        {project.kind === "sphere" ? <HealthguardWorld project={project} progress={scrollYProgress} /> : <TransportWorld project={project} progress={scrollYProgress} />}
        <button className="project-mobile-expand" type="button" onClick={() => setMobileExpanded((expanded) => !expanded)} aria-expanded={mobileExpanded}>
          <span>{mobileExpanded ? "CLOSE PROJECT DETAILS" : "TAP TO EXPAND"}</span>
          <i aria-hidden="true">+</i>
        </button>
        <motion.div className="project-mobile-panel" aria-hidden={!mobileExpanded} animate={{ opacity: mobileExpanded ? 1 : 0, y: mobileExpanded ? 0 : 18 }} transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}>
          <p>{project.subtitle}</p>
          <ul>{mobileItems.map((item) => <li key={item}>{item}</li>)}</ul>
          {project.outcomes && <div>{project.outcomes.map((outcome) => <span key={outcome.value}><b>{outcome.value}</b>{outcome.label}</span>)}</div>}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectIndex({ preview, onPreview, visible }: Readonly<{ preview: ProjectId; onPreview: (id: ProjectId) => void; visible: boolean }>) {
  return (
    <aside className={`projects-index ${visible ? "is-visible" : ""}`} aria-label="Project index">
      <p>INDEX</p>
      {projects.map((project) => (
        <button
          key={project.id}
          className={preview === project.id ? "is-active" : ""}
          type="button"
          onPointerEnter={() => onPreview(project.id)}
          onFocus={() => onPreview(project.id)}
          onClick={() => onPreview(project.id)}
        >
          <b>{String(project.index).padStart(2, "0")}</b>
          <span>{project.id === "healthguard" ? "HEALTHGUARD" : "ALL ROUNDER TRANSPORT"}</span>
        </button>
      ))}
      <div className={`projects-index-preview projects-index-preview--${preview}`} aria-hidden="true">
        <span className="index-preview-sphere" />
        <span className="index-preview-route" />
        <i />
      </div>
    </aside>
  );
}

function ProjectsIntro() {
  const introRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: introRef, offset: ["start start", "end end"] });
  const titleScale = useTransform(scrollYProgress, [0, 0.84, 1], [1, 0.88, 0.62]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.83, 1], [1, 1, 0]);

  return (
    <section ref={introRef} className="projects-intro" aria-labelledby="projects-heading">
      <div className="projects-intro-stage">
        <p>09 / SELECTED WORK</p>
        <motion.h2 id="projects-heading" style={{ scale: titleScale, y: titleY, opacity: titleOpacity }}>
          PROJECTS
        </motion.h2>
        <span className="projects-intro-orbit" aria-hidden="true" />
        <small>INTERACTIVE WORLDS / 01 — 02</small>
      </div>
    </section>
  );
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.03 });
  const [preview, setPreview] = useState<ProjectId>("healthguard");

  return (
    <section ref={sectionRef} id="projects" className="projects-section" data-fluid-scene="projects">
      <ProjectIndex preview={preview} onPreview={setPreview} visible={isInView} />
      <ProjectsIntro />
      {projects.map((project) => (
        <Fragment key={project.id}>
          <ProjectChapter project={project} onPreview={setPreview} />
          {project.kind === "sphere" && <TransitionBridge kind="health-transport" />}
        </Fragment>
      ))}
    </section>
  );
}
