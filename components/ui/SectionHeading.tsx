import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

type SectionHeadingProps = {
  id: string;
  title: ReactNode;
  className: string;
  eyebrow?: ReactNode;
  description?: ReactNode;
  delay?: number;
};

/** Responsive section introduction with one semantic heading and optional context. */
export function SectionHeading({
  id,
  title,
  className,
  eyebrow,
  description,
  delay = 0,
}: Readonly<SectionHeadingProps>) {
  return (
    <Reveal className={className} delay={delay}>
      {eyebrow ? <span>{eyebrow}</span> : null}
      <h2 id={id}>{title}</h2>
      {description ? <p>{description}</p> : null}
    </Reveal>
  );
}
