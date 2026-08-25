import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const attributes = ["Cinematic", "Technical", "Editorial", "Minimal", "Human", "Precise"];

export function DirectionSection() {
  return (
    <section id="about" className="direction-section page-section" aria-labelledby="direction-title" tabIndex={-1}>
      <SectionLabel index="00" note="Creative directive">Identity before interface</SectionLabel>
      <Reveal className="direction-heading">
        <p id="direction-title">Not a template.</p>
        <h2>Quiet structure.<br /><em>Controlled</em> intensity.</h2>
      </Reveal>
      <Reveal className="direction-copy" delay={0.08}>
        <p>The system balances a rational developer grid with expressive editorial typography. Crimson behaves like a signal—not a fill—so every moment of colour carries meaning.</p>
        <span>Reference influence: atmosphere, pacing, transition craft. Never identity, copy, or layout.</span>
      </Reveal>
      <div className="attribute-marquee" aria-label="Design attributes">
        <div>
          {[...attributes, ...attributes].map((attribute, index) => (
            <span key={`${attribute}-${index}`}>{attribute}<i /></span>
          ))}
        </div>
      </div>
    </section>
  );
}
