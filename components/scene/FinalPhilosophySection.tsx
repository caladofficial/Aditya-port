"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Magnetic } from "@/components/system/Magnetic";

type Progress = MotionValue<number>;

function ClosingWord({ word, start, progress, className }: Readonly<{ word: string; start: number; progress: Progress; className: string }>) {
  const opacity = useTransform(progress, [start, start + 0.07, start + 0.2, start + 0.3], [0, 1, 1, 0.22]);
  const y = useTransform(progress, [start, start + 0.1, start + 0.3], [44, 0, -26]);
  const clipPath = useTransform(progress, [start, start + 0.1], ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]);

  return <motion.p className={`closing-word ${className}`} style={{ opacity, y, clipPath }}>{word}</motion.p>;
}

function ActionWord({ word, start, progress, index }: Readonly<{ word: string; start: number; progress: Progress; index: number }>) {
  const opacity = useTransform(progress, [start, start + 0.055, 0.68], [0, 1, 0.16]);
  const y = useTransform(progress, [start, start + 0.075], [24, 0]);
  const scale = useTransform(progress, [start, start + 0.075], [1.08, 1]);

  return <motion.span className={`closing-action closing-action--${index + 1}`} style={{ opacity, y, scale }}>{word}</motion.span>;
}

export function FinalPhilosophySection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const statementOpacity = useTransform(scrollYProgress, [0.5, 0.61, 0.88, 0.98], [0, 1, 1, 0]);
  const statementY = useTransform(scrollYProgress, [0.5, 0.63, 0.98], [48, 0, -80]);
  const statementScale = useTransform(scrollYProgress, [0.5, 0.77], [1.04, 1]);
  const objectScale = useTransform(scrollYProgress, [0.72, 0.91, 1], [0.18, 1.18, 2.8]);
  const objectOpacity = useTransform(scrollYProgress, [0.69, 0.78, 0.94, 1], [0, 0.9, 1, 0]);
  const markOpacity = useTransform(scrollYProgress, [0.76, 0.84, 0.95], [0, 1, 0]);
  const nameOpacity = useTransform(scrollYProgress, [0.85, 0.93, 0.98], [0, 1, 0]);
  const nameY = useTransform(scrollYProgress, [0.85, 0.93], [16, 0]);

  return (
    <section ref={ref} className="final-philosophy" data-fluid-scene="philosophy" aria-labelledby="final-philosophy-heading">
      <div className="final-philosophy-stage">
        <p className="final-philosophy-kicker">13 / FINAL PHILOSOPHY</p>
        <div className="closing-words" id="final-philosophy-heading">
          <ClosingWord word="TECHNOLOGY." start={0.05} progress={scrollYProgress} className="closing-word--one" />
          <ClosingWord word="DESIGN." start={0.19} progress={scrollYProgress} className="closing-word--two" />
          <ClosingWord word="LEADERSHIP." start={0.33} progress={scrollYProgress} className="closing-word--three" />
        </div>

        <div className="closing-actions" aria-label="Idea, design, build, lead, impact">
          {["IDEA.", "DESIGN.", "BUILD.", "LEAD.", "IMPACT."].map((word, index) => (
            <ActionWord key={word} word={word} start={0.38 + index * 0.055} progress={scrollYProgress} index={index} />
          ))}
        </div>

        <motion.p className="final-brand-statement" style={{ opacity: statementOpacity, y: statementY, scale: statementScale }}>
          Building intelligent technology with thoughtful design and strong leadership.
        </motion.p>

        <motion.div className="final-brand-object" style={{ scale: objectScale, opacity: objectOpacity }} aria-hidden="true">
          <span className="final-brand-glint" />
          <motion.strong style={{ opacity: markOpacity }}>AR</motion.strong>
          <motion.span style={{ opacity: nameOpacity, y: nameY }}>ADITYA RAI</motion.span>
        </motion.div>
      </div>
    </section>
  );
}

type ContactOptionProps = {
  label: string;
  value: string;
  href?: string;
  cursorLabel: string;
  external?: boolean;
};

function ContactOption({ label, value, href, cursorLabel, external = false }: Readonly<ContactOptionProps>) {
  const contents = (
    <>
      <span className="contact-option-label">{label}</span>
      <strong>{value}</strong>
      <i aria-hidden="true" />
    </>
  );

  return (
    <Magnetic className="contact-option-magnetic" strength={0.09}>
      {href ? (
        <a className="contact-option" href={href} data-cursor="contact" data-cursor-label={cursorLabel} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
          {contents}
        </a>
      ) : (
        <address className="contact-option" data-cursor="contact" data-cursor-label={cursorLabel}>
          {contents}
        </address>
      )}
    </Magnetic>
  );
}

export function ContactSection() {
  const currentYear = new Date().getFullYear();

  return (
    <section id="contact" className="contact-section" data-fluid-scene="contact" aria-labelledby="contact-heading">
      <div className="contact-shell">
        <p className="contact-kicker">14 / CONTACT</p>
        <h2 id="contact-heading">LET&apos;S BUILD<br /><em>SOMETHING.</em></h2>

        <div className="contact-options" aria-label="Contact options">
          <ContactOption label="EMAIL" value="adi9910119238@gmail.com" href="mailto:adi9910119238@gmail.com" cursorLabel="EMAIL" />
          <ContactOption label="PHONE" value="6394030440" href="tel:+916394030440" cursorLabel="CALL" />
          <ContactOption label="LOCATION" value="Prayagraj, India" cursorLabel="LOCATION" />
        </div>

        <figure className="contact-portrait">
          <Image src="/images/aditya/headshot.webp" alt="Aditya Rai" fill sizes="(max-width: 760px) 0px, 14vw" quality={80} loading="lazy" />
        </figure>

        <div className="contact-socials" aria-label="Professional links">
          <Magnetic className="contact-social-magnetic" strength={0.12}>
            <a href="https://www.linkedin.com/in/aditya-rai-b43407374?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" data-cursor="magnetic" data-cursor-label="OPEN" aria-label="Open Aditya Rai LinkedIn profile in a new tab">LINKEDIN</a>
          </Magnetic>
          <Magnetic className="contact-social-magnetic" strength={0.12}>
            <a href="https://github.com/caladofficial" target="_blank" rel="noreferrer" data-cursor="magnetic" data-cursor-label="OPEN" aria-label="Open Aditya Rai GitHub profile in a new tab">GITHUB</a>
          </Magnetic>
          <Magnetic className="contact-social-magnetic" strength={0.12}>
            <a href="https://drive.google.com/file/d/1d7pOZtIcAvA6OR5E11orHT7bn9DSl8Hi/view?usp=drivesdk" target="_blank" rel="noreferrer" data-cursor="magnetic" data-cursor-label="OPEN" aria-label="Open Aditya Rai resume in a new tab">RESUME</a>
          </Magnetic>
        </div>

        <Magnetic className="contact-cta-magnetic" strength={0.13}>
          <a className="contact-cta" href="mailto:adi9910119238@gmail.com?subject=Let%27s%20work%20together" data-cursor="magnetic" data-cursor-label="START">
            <span>LET&apos;S WORK TOGETHER</span>
            <i aria-hidden="true">↗</i>
          </a>
        </Magnetic>
      </div>

      <footer className="contact-footer">
        <span>ADITYA RAI</span>
        <p>AI/ML <i /> DEVELOPMENT <i /> DESIGN <i /> LEADERSHIP</p>
        <small>© {currentYear}</small>
      </footer>
    </section>
  );
}
