"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { eases } from "@/animations/motion";
import { ProjectVisual } from "@/components/foundation/ProjectVisual";
import { useSmoothScroll } from "@/components/system/SmoothScroll";
import type { ProjectCaseStudy } from "@/data/projects";

type ProjectCaseStudyDialogProps = {
  project: ProjectCaseStudy | null;
  onClose: () => void;
};

export function ProjectCaseStudyDialog({ project, onClose }: Readonly<ProjectCaseStudyDialogProps>) {
  const dialogRef = useRef<HTMLElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { start, stop } = useSmoothScroll();

  useEffect(() => {
    if (!project) return;

    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const body = document.body;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    stop();

    const focusFrame = window.requestAnimationFrame(() => {
      dialogRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      body.style.overflow = previousOverflow;
      start();
      window.requestAnimationFrame(() => previousFocus.current?.focus());
    };
  }, [onClose, project, start, stop]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.aside
          ref={dialogRef}
          className="case-study-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`case-study-${project.id}`}
          initial={reduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          animate={reduceMotion ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
          exit={reduceMotion ? { opacity: 0 } : { clipPath: "inset(100% 0 0 0)" }}
          transition={{ duration: reduceMotion ? 0.12 : 0.72, ease: eases.reveal }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <div className="case-study-dialog-inner">
            <header className="case-study-dialog-header">
              <span>Case study / {project.number}</span>
              <button type="button" onClick={onClose} aria-label={`Close ${project.title} case study`}>
                Close <i aria-hidden="true" />
              </button>
            </header>

            <div className="case-study-dialog-title">
              <span>{project.period}</span>
              <h2 id={`case-study-${project.id}`}>{project.title}</h2>
              {project.subtitle ? <p>{project.subtitle}</p> : null}
            </div>

            <figure className="case-study-dialog-visual">
              <ProjectVisual type={project.visual} />
            </figure>

            <div className="case-study-dialog-overview">
              <section>
                <span>Type</span>
                <p>{project.type}</p>
              </section>
              <section>
                <span>Technology</span>
                <p>{project.technologies.join(" / ")}</p>
              </section>
              <section>
                <span>Description</span>
                <p>{project.description}</p>
              </section>
            </div>

            <div className="case-study-dialog-details">
              <section>
                <span>Features</span>
                <ol>
                  {project.features.map((feature, index) => (
                    <li key={feature}><b>{String(index + 1).padStart(2, "0")}</b>{feature}</li>
                  ))}
                </ol>
              </section>
              <section>
                <span>Verified metrics</span>
                {project.metrics.length ? (
                  <div className="case-study-dialog-metrics">
                    {project.metrics.map((metric) => (
                      <p key={metric.label}><strong>{metric.value}</strong>{metric.label}</p>
                    ))}
                  </div>
                ) : <p className="case-study-no-metrics">No quantitative outcome is claimed.</p>}
              </section>
            </div>

            {project.safetyNote ? <p className="case-study-safety"><i />{project.safetyNote}</p> : null}
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
