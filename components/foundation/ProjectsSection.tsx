"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { eases } from "@/animations/motion";
import { ProjectCaseStudyDialog } from "@/components/foundation/ProjectCaseStudyDialog";
import { ProjectVisual } from "@/components/foundation/ProjectVisual";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { projectCaseStudies, type ProjectCaseStudy } from "@/data/projects";
import { useCharacterSequence } from "@/hooks/useCharacterSequence";

function ProjectChapter({
  project,
  onOpen,
}: Readonly<{
  project: ProjectCaseStudy;
  onOpen: (project: ProjectCaseStudy) => void;
}>) {
  const chapterRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: chapterRef, offset: ["start end", "end start"] });
  const visualY = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : -34, reduceMotion ? 0 : 34]);
  const titleX = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : 24, reduceMotion ? 0 : -18]);

  return (
    <article
      ref={chapterRef}
      className="project-chapter"
      data-layout={project.layout}
      data-character-sequence-state={project.characterState}
      data-character-state={project.characterState}
    >
      <header className="project-chapter-meta">
        <span>Project {project.number}</span>
        <time>{project.period}</time>
      </header>

      <motion.div className="project-title" style={{ x: titleX }}>
        <h3>{project.title}</h3>
        {project.subtitle ? <p>{project.subtitle}</p> : null}
      </motion.div>

      <div className="project-body">
        <motion.figure
          className="project-visual"
          style={{ y: visualY }}
          data-character-state={project.characterState}
        >
          <div className="project-visual-media"><ProjectVisual type={project.visual} /></div>
          <figcaption>Abstract system visualization · Not a product screenshot</figcaption>
        </motion.figure>

        <div className="project-copy">
          <dl>
            <div><dt>Type</dt><dd>{project.type}</dd></div>
            <div><dt>Technology</dt><dd>{project.technologies.join(" / ")}</dd></div>
          </dl>

          <p className="project-description">{project.description}</p>
          {project.safetyNote ? <p className="project-safety"><i />{project.safetyNote}</p> : null}

          <div className="project-features">
            <span>Features</span>
            <ul>
              {project.features.map((feature, index) => (
                <li key={feature}><b>{String(index + 1).padStart(2, "0")}</b>{feature}</li>
              ))}
            </ul>
          </div>

          <Button
            cursorLabel="VIEW"
            characterState={project.characterState}
            onClick={() => onOpen(project)}
          >View Case Study</Button>
        </div>
      </div>

      <div className="project-metrics">
        <span>Verified metrics</span>
        {project.metrics.length ? project.metrics.map((metric) => (
          <p key={metric.label}><strong>{metric.value}</strong>{metric.label}</p>
        )) : <p className="project-metrics-empty">No quantitative outcome is claimed.</p>}
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);

  useCharacterSequence(sectionRef, {
    source: "projects",
    progressProperty: "--projects-progress",
  });

  const closeCaseStudy = useCallback(() => setSelectedProject(null), []);

  return (
    <>
      <section
        ref={sectionRef}
        id="projects"
        className="projects-section page-section"
        aria-labelledby="projects-title"
        tabIndex={-1}
      >
        <div className="projects-grid" aria-hidden="true" />
        <div className="projects-progress" aria-hidden="true"><i /></div>

        <SectionLabel index="04" note="Resume-verified projects">Selected Work</SectionLabel>

        <header className="projects-heading">
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: eases.reveal }}
          >Case studies / 2025—Present</motion.span>
          <motion.h2
            id="projects-title"
            initial={reduceMotion ? false : { opacity: 0, y: 44 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.88, delay: 0.06, ease: eases.reveal }}
          >SELECTED<br /><em>WORK</em></motion.h2>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.12, ease: eases.reveal }}
          >Two resume-verified systems presented through abstract interface studies rather than fabricated screenshots.</motion.p>
        </header>

        <div className="projects-list">
          {projectCaseStudies.map((project) => (
            <ProjectChapter key={project.id} project={project} onOpen={setSelectedProject} />
          ))}
        </div>
      </section>

      <ProjectCaseStudyDialog project={selectedProject} onClose={closeCaseStudy} />
    </>
  );
}
