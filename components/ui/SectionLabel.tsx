import type { ReactNode } from "react";

type SectionLabelProps = {
  index: string;
  note: string;
  children: ReactNode;
};

/** Compact editorial chapter marker shared by every portfolio section. */
export function SectionLabel({ index, note, children }: Readonly<SectionLabelProps>) {
  return (
    <div className="section-label">
      <span>{index}</span>
      <p>{children}</p>
      <small>{note}</small>
    </div>
  );
}
