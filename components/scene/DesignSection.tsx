"use client";

import Image from "next/image";
import { memo, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

type DesignProject = {
  id: string;
  title: string;
  category: string;
  image: string;
  role: string;
  objective: string;
  approach: string;
  tools: readonly string[];
};

const designProjects: readonly DesignProject[] = [
  {
    id: "ecell-visual-system",
    title: "E-CELL UIT / VISUAL SYSTEM",
    category: "EVENT BRANDING",
    image: "/design/ecell-visual-system.webp",
    role: "HEAD GRAPHIC DESIGNER — E-CELL UIT",
    objective: "Create a recognisable and adaptable visual language for innovation-led events and communication.",
    approach: "Build an editorial system that can scale across event branding, promotional design and social communication.",
    tools: ["Figma", "Adobe Creative Suite", "Visual Branding"],
  },
  {
    id: "incubation-storytelling",
    title: "INCUBATION / STORYTELLING",
    category: "BRAND COMMUNICATION",
    image: "/design/incubation-storytelling.webp",
    role: "HEAD GRAPHIC DESIGNER — UNITED INCUBATION HUB",
    objective: "Give startups and innovation activity a clear, energetic visual presence.",
    approach: "Use flexible identity elements and narrative-led compositions to make complex ideas feel accessible.",
    tools: ["Graphic Design", "Visual Branding", "Adobe Creative Suite"],
  },
  {
    id: "interface-study",
    title: "INTELLIGENT INTERFACE STUDY",
    category: "UI / UX DESIGN",
    image: "/design/interface-study.webp",
    role: "UI/UX & FRONTEND DESIGNER",
    objective: "Translate technical systems into interfaces that feel focused, usable and human.",
    approach: "Pair information hierarchy with responsive interaction patterns and a deliberately reduced visual language.",
    tools: ["Figma", "UI/UX Design", "React"],
  },
  {
    id: "brand-motion",
    title: "BRAND MOTION LANGUAGE",
    category: "VISUAL IDENTITY",
    image: "/design/brand-motion.webp",
    role: "GRAPHIC DESIGNER & CREATIVE LEAD",
    objective: "Create visual movement that strengthens recognition without becoming decoration.",
    approach: "Develop modular forms, colour behaviour and motion cues that can adapt across branded communication.",
    tools: ["Adobe Creative Suite", "Graphic Design", "Visual Branding"],
  },
] as const;

type Progress = MotionValue<number>;

const LazyDesignImage = memo(function LazyDesignImage({ project, eligible }: Readonly<{ project: DesignProject; eligible: boolean }>) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.1, once: true });
  const shouldLoad = eligible && isInView;

  return (
    <div ref={ref} className="design-image-frame">
      {shouldLoad ? (
        <Image src={project.image} alt={`${project.title} abstract visual composition`} fill sizes="(max-width: 760px) 68vw, (max-width: 1100px) 38vw, 28vw" quality={82} loading="lazy" />
      ) : (
        <span className="design-image-placeholder" aria-hidden="true" />
      )}
    </div>
  );
});

const DesignComposition = memo(function DesignComposition({
  project,
  index,
  progress,
  eligible,
  onSelect,
}: Readonly<{
  project: DesignProject;
  index: number;
  progress: Progress;
  eligible: boolean;
  onSelect: (project: DesignProject) => void;
}>) {
  const x = useTransform(progress, [0, 0.55, 1], [index % 2 === 0 ? -24 : 28, index % 2 === 0 ? 16 : -14, index % 2 === 0 ? 52 : -46]);
  const y = useTransform(progress, [0, 0.55, 1], [index === 0 ? 14 : index === 1 ? -20 : 28, index === 0 ? -18 : index === 1 ? 24 : -14, index % 2 === 0 ? -50 : 44]);
  const rotate = useTransform(progress, [0, 1], [index % 2 === 0 ? -4 : 5, index % 2 === 0 ? 6 : -5]);
  const opacity = useTransform(progress, [0, 0.08, 0.9, 1], [0, 1, 1, 0.22]);

  return (
    <motion.div className={`design-composition design-composition--${index + 1}`} style={{ x, y, rotate, opacity }}>
      <motion.button
        type="button"
        data-cursor="project"
        data-cursor-label="VIEW"
        aria-label={`View ${project.title}`}
        onClick={() => onSelect(project)}
        whileHover={{ scale: 1.045, y: -8, transition: { type: "spring", stiffness: 220, damping: 18 } }}
        whileTap={{ scale: 0.985 }}
      >
        <LazyDesignImage project={project} eligible={eligible} />
        <span className="design-composition-glass" aria-hidden="true" />
        <span className="design-composition-category">{project.category}</span>
        <strong>{project.title}</strong>
        <i aria-hidden="true">VIEW PROJECT</i>
      </motion.button>
    </motion.div>
  );
});

function DesignModal({ project, onClose }: Readonly<{ project: DesignProject; onClose: () => void }>) {
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let focusFrame = 0;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
      if (!focusable.length) return;
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

    focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div className="design-modal" role="dialog" aria-modal="true" aria-labelledby="design-modal-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.article
        ref={panelRef}
        className="design-modal-panel"
        initial={{ y: 34, scale: 0.97, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 18, scale: 0.985, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="design-modal-image">
          <Image src={project.image} alt={`${project.title} visual composition`} fill sizes="(max-width: 760px) 100vw, 58vw" quality={88} priority />
        </div>
        <div className="design-modal-content">
          <button ref={closeRef} className="design-modal-close" type="button" onClick={onClose} aria-label="Close project presentation">
            CLOSE <i />
          </button>
          <p>PROJECT / {project.category}</p>
          <h3 id="design-modal-title">{project.title}</h3>
          <dl>
            <div>
              <dt>ROLE</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>OBJECTIVE</dt>
              <dd>{project.objective}</dd>
            </div>
            <div>
              <dt>DESIGN APPROACH</dt>
              <dd>{project.approach}</dd>
            </div>
            <div>
              <dt>TOOLS</dt>
              <dd className="design-modal-tools">{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</dd>
            </div>
          </dl>
        </div>
      </motion.article>
    </motion.div>
  );
}

function DesignOpening() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const firstOpacity = useTransform(scrollYProgress, [0.03, 0.16, 0.56], [0, 1, 0.3]);
  const firstY = useTransform(scrollYProgress, [0.03, 0.17, 1], [42, 0, -68]);
  const secondOpacity = useTransform(scrollYProgress, [0.36, 0.5, 0.92], [0, 1, 1]);
  const secondY = useTransform(scrollYProgress, [0.36, 0.52], [42, 0]);

  return (
    <section ref={ref} className="design-opening" aria-labelledby="design-heading">
      <div className="design-opening-stage">
        <p>10 / DESIGN PRACTICE</p>
        <motion.h2 id="design-heading" style={{ opacity: firstOpacity, y: firstY }}>
          DESIGN IS NOT<br />
          <span>DECORATION.</span>
        </motion.h2>
        <motion.h3 style={{ opacity: secondOpacity, y: secondY }}>
          IT IS <em>COMMUNICATION.</em>
        </motion.h3>
      </div>
    </section>
  );
}

function DesignCanvas({ onSelect }: Readonly<{ onSelect: (project: DesignProject) => void }>) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [galleryLevel, setGalleryLevel] = useState(1);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value > 0.65) setGalleryLevel((current) => Math.max(current, 4));
    else if (value > 0.32) setGalleryLevel((current) => Math.max(current, 2));
  });

  return (
    <section ref={ref} className="design-canvas-section" aria-label="Selected design compositions">
      <div className="design-canvas-stage">
        <p className="design-canvas-label">SELECTED COMPOSITIONS / DRAG THE EYE</p>
        <span className="design-canvas-coordinate design-canvas-coordinate--one" aria-hidden="true">VISUAL / 24°</span>
        <span className="design-canvas-coordinate design-canvas-coordinate--two" aria-hidden="true">DEPTH / ACTIVE</span>
        {designProjects.map((project, index) => (
          <DesignComposition key={project.id} project={project} index={index} progress={scrollYProgress} eligible={index < galleryLevel} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}

function DesignLeadership() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.12, 0.82], [0, 1, 0]);
  const leftY = useTransform(scrollYProgress, [0.16, 0.3], [34, 0]);
  const rightY = useTransform(scrollYProgress, [0.34, 0.5], [34, 0]);
  const blocksOpacity = useTransform(scrollYProgress, [0.16, 0.3, 0.9], [0, 1, 0]);

  return (
    <section ref={ref} className="design-leadership" aria-label="Design leadership">
      <div className="design-leadership-stage">
        <figure className="design-leadership-portrait">
          <Image src="/images/aditya/designer-figure.webp" alt="Aditya Rai, graphic and UI/UX designer" fill sizes="(max-width: 760px) 42vw, 24vw" quality={82} loading="lazy" />
        </figure>
        <motion.p className="design-leadership-title" style={{ opacity: titleOpacity }}>DESIGN LEADERSHIP</motion.p>
        <motion.article className="design-leadership-role design-leadership-role--one" style={{ y: leftY, opacity: blocksOpacity }}>
          <span>HEAD GRAPHIC DESIGNER</span>
          <h3>E-CELL UIT</h3>
        </motion.article>
        <motion.article className="design-leadership-role design-leadership-role--two" style={{ y: rightY, opacity: blocksOpacity }}>
          <span>HEAD GRAPHIC DESIGNER</span>
          <h3>UNITED INCUBATION HUB</h3>
        </motion.article>
        <motion.p className="design-leadership-practice" style={{ opacity: blocksOpacity }}>
          CREATIVE DIRECTION <i /> TEAM MANAGEMENT <i /> BRANDING <i /> VISUAL COMMUNICATION <i /> MENTORING
        </motion.p>
      </div>
    </section>
  );
}

export function DesignSection() {
  const [selected, setSelected] = useState<DesignProject | null>(null);

  return (
    <section id="design" className="design-section" data-fluid-scene="design">
      <DesignOpening />
      <DesignCanvas onSelect={setSelected} />
      <DesignLeadership />
      <AnimatePresence>{selected && <DesignModal project={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </section>
  );
}
