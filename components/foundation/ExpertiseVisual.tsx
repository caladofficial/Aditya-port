import type { ExpertiseVisual as ExpertiseVisualType } from "@/data/expertise";

type ExpertiseVisualProps = {
  type: ExpertiseVisualType;
};

export function ExpertiseVisual({ type }: Readonly<ExpertiseVisualProps>) {
  if (type === "wireframe") {
    return (
      <div className="expertise-visual expertise-visual--wireframe" aria-hidden="true">
        <span><i /><i /><i /></span>
        <div><i /><i /><i /><i /></div>
        <b /><b />
      </div>
    );
  }

  if (type === "code") {
    return (
      <div className="expertise-visual expertise-visual--code" aria-hidden="true">
        <code><span>01</span><i>const</i> interface = <b>design</b>;</code>
        <code><span>02</span><i>function</i> build() {'{'}</code>
        <code><span>03</span>&nbsp;&nbsp;return <b>experience</b>;</code>
        <code><span>04</span>{'}'}</code>
      </div>
    );
  }

  if (type === "data") {
    return (
      <div className="expertise-visual expertise-visual--data" aria-hidden="true">
        <svg viewBox="0 0 300 170" preserveAspectRatio="none">
          <path d="M0 138 C48 130 45 94 91 105 S151 44 193 64 S245 79 300 20" />
          <line x1="0" y1="140" x2="300" y2="140" />
          <line x1="0" y1="94" x2="300" y2="94" />
          <line x1="0" y1="48" x2="300" y2="48" />
          <circle cx="91" cy="105" r="4" />
          <circle cx="193" cy="64" r="4" />
        </svg>
        <div><i /><i /><i /><i /><i /></div>
      </div>
    );
  }

  if (type === "architecture") {
    return (
      <div className="expertise-visual expertise-visual--architecture" aria-hidden="true">
        <svg viewBox="0 0 320 170">
          <path d="M51 85 H108 M146 85 H201 M239 85 H290" />
          <circle cx="32" cy="85" r="18" />
          <rect x="108" y="65" width="38" height="40" />
          <rect x="201" y="65" width="38" height="40" />
          <circle cx="290" cy="85" r="18" />
        </svg>
        <span>System</span><span>UI</span><span>Logic</span><span>Data</span>
      </div>
    );
  }

  return (
    <div className="expertise-visual expertise-visual--logic" aria-hidden="true">
      <svg viewBox="0 0 300 170">
        <path d="M35 85 H93 L124 45 H185 L215 85 H266" />
        <path d="M124 45 L153 126 L185 45" />
        <circle cx="35" cy="85" r="8" />
        <circle cx="124" cy="45" r="8" />
        <circle cx="153" cy="126" r="8" />
        <circle cx="185" cy="45" r="8" />
        <circle cx="266" cy="85" r="8" />
      </svg>
      <i />
    </div>
  );
}
