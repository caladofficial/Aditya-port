import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { motionPrinciples } from "@/data/design-system";

export function MotionSection() {
  return (
    <section id="experience" className="motion-section page-section" aria-labelledby="motion-title" tabIndex={-1}>
      <div className="motion-field" aria-hidden="true"><i /><i /><i /></div>
      <SectionLabel index="03" note="Interaction language">Meaning, then movement</SectionLabel>
      <SectionHeading
        id="motion-title"
        className="motion-heading"
        eyebrow="System / Motion"
        title={<>Movement with<br /><em>a reason.</em></>}
      />
      <div className="motion-layout">
        <div className="motion-principles">
          {motionPrinciples.map((principle, index) => (
            <Reveal className="motion-principle" delay={index * 0.055} key={principle.number}>
              <span>{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.detail}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="motion-lab" delay={0.1}>
          <div className="motion-lab-header"><span>Live behavior study</span><b>Hover / focus</b></div>
          <svg className="motion-signal-route" viewBox="0 0 640 520" preserveAspectRatio="none" aria-hidden="true">
            <path d="M-20 436 C 118 418, 92 264, 236 286 S 357 86, 486 126 S 574 244, 674 72" />
            <circle cx="236" cy="286" r="5" />
            <circle cx="486" cy="126" r="5" />
          </svg>
          <button className="motion-object" type="button" data-cursor-label="PLAY" data-character-state="analyze" aria-label="Preview the motion language">
            <span>Intent</span>
            <i /><i /><i />
          </button>
          <div className="motion-timing">
            <span><b>160</b> micro</span>
            <span><b>560</b> base</span>
            <span><b>820</b> reveal</span>
            <span><b>1150</b> cinematic</span>
          </div>
        </Reveal>
      </div>
      <Reveal className="motion-rule">
        <p>Transform + opacity first.</p>
        <span>One dominant motion per viewport. No scroll hijacking on touch. No hidden content when motion is reduced.</span>
      </Reveal>
    </section>
  );
}
