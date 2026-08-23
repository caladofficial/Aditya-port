"use client";

import { motion } from "framer-motion";
import { eases } from "@/lib/motion";

const academicFocus = [
  "Data Structures & Algorithms",
  "Object-Oriented Programming",
  "DBMS",
  "Operating Systems",
  "Python",
  "Java",
  "SQL",
  "Software Development",
  "Agile",
  "SDLC",
] as const;

const certifications = [
  { title: "POWER BI WITH AI", detail: "Certificate of Completion — Unstop" },
  { title: "LEETCODE DATA NAVIGATOR", detail: "" },
  { title: "LEETCODE ARCHITECTURE BUILDER", detail: "" },
  { title: "SMART INDIA HACKATHON", detail: "Team Leader" },
] as const;

function EditorialLine() {
  return <motion.span className="education-line" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.65 }} transition={{ duration: 0.85, ease: eases.enter }} aria-hidden="true" />;
}

function Qualification({
  label,
  institution,
  location,
  period,
}: Readonly<{ label: string; institution: string; location?: string; period: string }>) {
  return (
    <motion.article
      className="education-qualification"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: eases.enter }}
    >
      <EditorialLine />
      <div>
        <span>{label}</span>
        <h3>{institution}</h3>
        {location && <p>{location}</p>}
      </div>
      <time>{period}</time>
    </motion.article>
  );
}

export function EducationSection() {
  return (
    <section className="education-section" data-fluid-scene="technology" aria-labelledby="education-heading">
      <section className="education-primary">
        <div className="education-primary-grid">
          <motion.p className="education-kicker" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: eases.enter }}>
            12 / EDUCATION & ACHIEVEMENTS
          </motion.p>
          <motion.div className="education-degree" initial={{ opacity: 0, y: 32, scale: 1.02 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.9, ease: eases.enter }}>
            <h2 id="education-heading">B.TECH</h2>
            <p>United Institute of Technology</p>
            <span>Prayagraj</span>
          </motion.div>
          <motion.time className="education-primary-period" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
            2024 — PRESENT
          </motion.time>
          <motion.div className="education-focus" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.08, ease: eases.enter }}>
            <p>ACADEMIC FOCUS</p>
            <ul>
              {academicFocus.map((focus, index) => (
                <li key={focus}>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  {focus}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="education-foundations" aria-label="School education">
        <Qualification label="CLASS XII / PCM" institution="Northwest Accreditation Commission" location="Delhi" period="2021 — 2022" />
        <Qualification label="CLASS X" institution="Sunbeam School" location="Varanasi" period="2019 — 2020" />
      </section>

      <section className="education-certifications" aria-label="Certifications and achievements">
        <motion.p className="education-certifications-title" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.65, ease: eases.enter }}>
          CERTIFICATIONS <em>&</em> ACHIEVEMENTS
        </motion.p>
        <div className="education-certification-list">
          {certifications.map((certification, index) => (
            <motion.article
              key={certification.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -16 : 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.62, delay: index * 0.06, ease: eases.enter }}
            >
              <EditorialLine />
              <b>{String(index + 1).padStart(2, "0")}</b>
              <h3>{certification.title}</h3>
              {certification.detail && <p>{certification.detail}</p>}
            </motion.article>
          ))}
        </div>
      </section>
    </section>
  );
}
