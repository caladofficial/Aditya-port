import { ArrowUpRight } from "@/components/ui/ArrowUpRight";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function ComponentsSection() {
  return (
    <section id="achievements" className="components-section page-section" aria-labelledby="components-title" tabIndex={-1}>
      <SectionLabel index="05" note="Primitive library">Reusable, never generic</SectionLabel>
      <SectionHeading
        id="components-title"
        className="components-heading"
        eyebrow="System / Components"
        title={<>Primitives,<br /><em>not templates.</em></>}
        description="Every component carries the same typographic tension, quiet geometry, and crimson interaction signal."
      />

      <div className="component-board">
        <Reveal className="component-cell component-cell--actions">
          <span className="component-caption">01 / Actions</span>
          <div className="action-stack">
            <Button cursorLabel="EXPLORE" characterState="point">Primary action</Button>
            <Button variant="text" magnetic={false} characterState="lookLeft">Secondary action</Button>
          </div>
        </Reveal>

        <Reveal className="component-cell component-cell--labels" delay={0.04}>
          <span className="component-caption">02 / Signals</span>
          <div className="signal-stack">
            <span className="status-chip"><i /> Available</span>
            <span className="index-chip">04 / 09</span>
            <span className="discipline-chip">UI/UX Design</span>
          </div>
        </Reveal>

        <Reveal className="component-cell component-cell--project" delay={0.08}>
          <span className="component-caption">03 / Project index prototype</span>
          <button className="project-prototype" type="button" data-cursor-label="VIEW" data-character-state="present">
            <span>01</span>
            <div><small>Selected work / case study</small><strong>Project title</strong></div>
            <p>Role / Year</p>
            <i><ArrowUpRight /></i>
          </button>
        </Reveal>

        <Reveal className="component-cell component-cell--quote" delay={0.12}>
          <span className="component-caption">04 / Editorial statement</span>
          <blockquote>Design with<br /><em>clarity.</em> Build<br />with intent.</blockquote>
          <span className="quote-rule" />
        </Reveal>
      </div>
    </section>
  );
}
