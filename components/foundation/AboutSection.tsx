"use client";

import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { resume } from "@/data/resume";
import { useCharacterScrollScene } from "@/hooks/useCharacterScrollScene";

const resumeBackedFocus = [
  "UI/UX Design",
  "Frontend Development",
  "Data Structures & Algorithms",
  "React",
  "Python",
  "Firebase",
  "SIH Team Leadership",
  "E-cell Design Experience",
] as const;

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useCharacterScrollScene(sectionRef, {
    source: "about",
    enteringState: "walk",
    activeState: "lookRight",
    compactActiveState: "lookLeft",
    leavingState: "walk",
    reverseState: "walkBack",
    activeRange: [0.3, 0.78],
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-section page-section"
      aria-labelledby="about-title"
      tabIndex={-1}
    >
      <div className="about-grid" aria-hidden="true" />
      <div className="about-progress" aria-hidden="true"><i /></div>

      <SectionLabel index="01" note="Profile / Resume verified">About</SectionLabel>

      <Reveal className="about-heading" distance={48}>
        <span>Designer · Developer · Student</span>
        <h2 id="about-title">
          <span>HELLO, I&apos;M</span>
          <em>ADITYA.</em>
        </h2>
      </Reveal>

      <Reveal className="about-introduction" delay={0.08} distance={36}>
        <p>
          I’m a B.Tech student specializing in UI/UX design and frontend development, with strong foundations in Data Structures and Algorithms. I build web applications using React, Python, and Firebase.
        </p>
        <p>
          I’ve led a cross-functional team at Smart India Hackathon and work as a Designer with E-cell UIT, creating visual assets and UI/UX interfaces.
        </p>

        <div className="about-roles" aria-label="Professional roles">
          {resume.profile.professionalIdentity.map((role, index) => (
            <span key={role}><b>0{index + 1}</b>{role}</span>
          ))}
        </div>
      </Reveal>

      <div className="about-focus" aria-label="Resume-backed focus areas">
        {resumeBackedFocus.map((item, index) => (
          <Reveal key={item} delay={index * 0.035} distance={18}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{item}</p>
          </Reveal>
        ))}
      </div>

      <div className="about-footnote" aria-hidden="true">
        <span>AR / ABOUT</span>
        <b>Scroll-directed character scene</b>
      </div>
    </section>
  );
}
