"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { eases } from "@/animations/motion";
import { ExpertiseVisual } from "@/components/foundation/ExpertiseVisual";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { expertiseItems } from "@/data/expertise";
import { useCharacterSequence } from "@/hooks/useCharacterSequence";

export function ExpertiseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useCharacterSequence(sectionRef, { source: "expertise" });

  return (
    <section
      ref={sectionRef}
      id="expertise"
      className="expertise-section page-section"
      aria-labelledby="expertise-title"
      tabIndex={-1}
    >
      <div className="expertise-grid" aria-hidden="true" />
      <div className="expertise-progress" aria-hidden="true"><i /></div>

      <SectionLabel index="02" note="Resume-verified capabilities">Expertise / Skills</SectionLabel>

      <header className="expertise-heading">
        <motion.span
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.62, ease: eases.reveal }}
        >Design · Development · Data · Systems</motion.span>
        <motion.h2
          id="expertise-title"
          initial={reduceMotion ? false : { opacity: 0, y: 42 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.86, delay: 0.06, ease: eases.reveal }}
        >Skills in<br /><em>practice.</em></motion.h2>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.12, ease: eases.reveal }}
        >A focused index of the design, development, data, methodology, and computer-science capabilities documented in my resume.</motion.p>
      </header>

      <div id="skills" className="expertise-list" tabIndex={-1} aria-label="Skills by expertise area">
        {expertiseItems.map((item, index) => (
          <motion.article
            key={item.number}
            className={`expertise-item expertise-item--${item.visual}`}
            data-character-sequence-state={item.state}
            initial={reduceMotion ? false : { opacity: 0, y: 46 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.78, delay: index === 0 ? 0.05 : 0, ease: eases.reveal }}
          >
            <span className="expertise-number">{item.number}</span>
            <h3>{item.title}</h3>
            <ul aria-label={`${item.title} skills`}>
              {item.skills.map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
            <ExpertiseVisual type={item.visual} />
          </motion.article>
        ))}
      </div>

      <footer className="expertise-footer" aria-hidden="true">
        <span>05 disciplines</span>
        <i />
        <b>Resume / Skills index</b>
      </footer>
    </section>
  );
}
