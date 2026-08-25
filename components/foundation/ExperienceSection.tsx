"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { eases } from "@/animations/motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { experienceTimeline } from "@/data/experience";
import { useCharacterSequence } from "@/hooks/useCharacterSequence";

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useCharacterSequence(sectionRef, {
    source: "experience",
    progressProperty: "--timeline-progress",
    transitionState: "walk",
    reverseTransitionState: "walkBack",
  });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="experience-section page-section"
      aria-labelledby="experience-title"
      tabIndex={-1}
    >
      <div className="experience-grid" aria-hidden="true" />

      <div className="experience-inner">
        <SectionLabel index="03" note="Resume-verified timeline">Experience</SectionLabel>

        <header className="experience-heading">
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: eases.reveal }}
          >Leadership · Design · Data</motion.span>
          <motion.h2
            id="experience-title"
            initial={reduceMotion ? false : { opacity: 0, y: 42 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.86, delay: 0.05, ease: eases.reveal }}
          >Experience,<br /><em>drawn in time.</em></motion.h2>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.12, ease: eases.reveal }}
          >Three resume-verified roles across technical leadership, visual design, and data analysis.</motion.p>
        </header>

        <div className="experience-list" aria-label="Professional experience timeline">
          <div className="experience-timeline" aria-hidden="true"><i /></div>
          {experienceTimeline.map((item) => (
            <motion.article
              key={item.number}
              className="experience-item"
              data-character-sequence-state={item.state}
              initial={reduceMotion ? false : { opacity: 0, y: 54 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.24 }}
              transition={{ duration: 0.82, ease: eases.reveal }}
            >
              <span className="experience-marker" aria-hidden="true"><i /></span>
              <span className="experience-number">{item.number}</span>

              <div className="experience-content">
                <div className="experience-meta">
                  <span>{item.role}</span>
                  <span>{item.location}</span>
                  <time>{item.period}</time>
                </div>

                <h3>{item.organisation}</h3>
                <p className="experience-summary">{item.summary}</p>

                {item.details ? (
                  <div className="experience-details">
                    <span>{item.detailLabel}</span>
                    <ul>
                      {item.details.map((detail) => <li key={detail}>{detail}</li>)}
                    </ul>
                  </div>
                ) : null}

                {item.delivery ? <strong className="experience-delivery">{item.delivery}</strong> : null}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
