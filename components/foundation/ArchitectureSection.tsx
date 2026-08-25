import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { architecture } from "@/data/design-system";

export function ArchitectureSection() {
  return (
    <section id="skills" className="architecture-section page-section" aria-labelledby="architecture-title" tabIndex={-1}>
      <SectionLabel index="05" note="Implementation model">A system that scales</SectionLabel>
      <SectionHeading
        id="architecture-title"
        className="architecture-heading"
        eyebrow="System / Architecture"
        title={<>Build from<br /><em>the inside out.</em></>}
        description="Resume-led content will enter at the scene layer only after the foundation is approved."
      />
      <div className="architecture-stack">
        {architecture.map((item, index) => (
          <Reveal className="architecture-layer" delay={index * 0.06} key={item.layer}>
            <span>{item.layer}</span>
            <h3>{item.name}</h3>
            <p>{item.detail}</p>
            <b style={{ "--layer-scale": `${1 - index * 0.08}` } as CSSProperties} />
          </Reveal>
        ))}
      </div>
      <Reveal className="architecture-note">
        <span>Source verified</span>
        <p>The supplied resume is normalized in the authoritative data layer. Its education, experience, project, certification, achievement, and contact content remains intentionally unrendered in this foundation phase.</p>
        <b>Content model ready →</b>
      </Reveal>
    </section>
  );
}
