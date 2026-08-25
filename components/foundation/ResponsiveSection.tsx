import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { breakpoints } from "@/data/design-system";

export function ResponsiveSection() {
  return (
    <section id="projects" className="responsive-section page-section" aria-labelledby="responsive-title" tabIndex={-1}>
      <SectionLabel index="03" note="Responsive logic">Same identity, different behavior</SectionLabel>
      <Reveal className="responsive-heading">
        <h2 id="responsive-title">One system.<br /><em>Five expressions.</em></h2>
        <p>Responsiveness is not a scaled desktop. Composition, density, input method, and motion all adapt together.</p>
      </Reveal>
      <div className="breakpoint-list">
        {breakpoints.map((breakpoint, index) => (
          <Reveal className="breakpoint-row" delay={index * 0.045} key={breakpoint.name}>
            <span>0{index + 1}</span>
            <b>{breakpoint.range}</b>
            <h3>{breakpoint.name}</h3>
            <i>{breakpoint.columns}</i>
            <p>{breakpoint.behavior}</p>
          </Reveal>
        ))}
      </div>
      <Reveal className="responsive-demo" data-character-state="lookRight">
        <div className="device device--desktop"><i /><span>12</span></div>
        <div className="device device--tablet"><i /><span>08</span></div>
        <div className="device device--mobile"><i /><span>04</span></div>
        <p>Grid density decreases.<br />Clarity does not.</p>
      </Reveal>
    </section>
  );
}
