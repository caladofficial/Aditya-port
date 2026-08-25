import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { colors, radii, spacing, typography } from "@/data/design-system";

export function TokenSection() {
  return (
    <section id="expertise" className="tokens-section page-section" aria-labelledby="tokens-title" tabIndex={-1}>
      <SectionLabel index="01" note="Core tokens">The visible grammar</SectionLabel>
      <SectionHeading
        id="tokens-title"
        className="chapter-heading"
        eyebrow="System / Colour"
        title={<>Colour works<br />like <em>light.</em></>}
        description="Black establishes depth. Off-white keeps the experience tactile. Crimson marks the moments that matter."
      />

      <div className="color-grid">
        {colors.map((color, index) => (
          <Reveal className="color-token" delay={index * 0.035} key={color.name}>
            <div className="color-swatch" style={{ backgroundColor: color.value }}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <i style={{ backgroundColor: color.value }} />
            </div>
            <div className="color-data">
              <strong>{color.name}</strong>
              <code>{color.value}</code>
              <p>{color.use}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="type-system" aria-labelledby="type-title">
        <Reveal className="type-intro">
          <span>System / Typography</span>
          <h3 id="type-title">Precision meets <em>emotion.</em></h3>
          <p>Manrope carries interface clarity. Instrument Serif introduces warmth, tension, and editorial contrast.</p>
        </Reveal>
        <Reveal className="type-specimen" delay={0.08} data-character-state="design">
          <div className="type-specimen-meta"><span>Display / Instrument Serif</span><b>Responsive 72—240</b></div>
          <p contentEditable suppressContentEditableWarning spellCheck={false} role="textbox" aria-label="Editable display type specimen">Ideas should<br /><em>leave a mark.</em></p>
          <small>Click the specimen to type</small>
        </Reveal>
        <div className="type-scale">
          {typography.map((item, index) => (
            <Reveal className={`type-row type-row--${item.className}`} delay={index * 0.025} key={item.role}>
              <span>{item.role}</span>
              <p>{item.sample}</p>
              <b>{item.token}</b>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="spacing-system" aria-labelledby="spacing-title">
        <Reveal className="spacing-copy">
          <span>System / Spacing</span>
          <h3 id="spacing-title">Rhythm before decoration.</h3>
          <p>A four-pixel base expands into deliberate editorial whitespace. Layout breathes at section scale and stays efficient inside controls.</p>
        </Reveal>
        <div className="spacing-bars">
          {spacing.map((item, index) => (
            <Reveal className="spacing-row" delay={index * 0.025} key={item.token}>
              <span>{item.token}</span>
              <i style={{ "--bar-width": `${item.value}px` } as CSSProperties} />
              <b>{item.value}px</b>
              <small>{item.label}</small>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="radius-system" aria-labelledby="radius-title">
        <Reveal>
          <span className="subsystem-label">System / Geometry</span>
          <h3 id="radius-title">Mostly sharp.<br /><em>Soft only with purpose.</em></h3>
        </Reveal>
        <div className="radius-grid">
          {radii.map((radius, index) => (
            <Reveal className="radius-item" delay={index * 0.04} key={radius.name}>
              <div style={{ borderRadius: radius.value }}><i /></div>
              <span>{radius.name}</span><code>{radius.value}</code><small>{radius.use}</small>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
