"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { magnetic } from "@/lib/motion";

type MagneticProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  cursorLabel?: "VIEW" | "EXPLORE";
};

/**
 * Opt-in magnetic affordance for high-intent controls only. It uses compositor
 * transforms and returns to centre via the shared motion language in CSS.
 */
export function Magnetic({
  children,
  className = "",
  strength = magnetic.defaultStrength,
  cursorLabel,
}: Readonly<MagneticProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || event.pointerType === "touch" || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const x = (event.clientX - (bounds.left + bounds.width / 2)) * strength;
    const y = (event.clientY - (bounds.top + bounds.height / 2)) * strength;
    ref.current.style.setProperty("--magnetic-x", `${x}px`);
    ref.current.style.setProperty("--magnetic-y", `${y}px`);
  };

  const reset = () => {
    ref.current?.style.setProperty("--magnetic-x", "0px");
    ref.current?.style.setProperty("--magnetic-y", "0px");
  };

  return (
    <div
      ref={ref}
      className={`magnetic ${className}`}
      data-magnetic
      data-cursor-label={cursorLabel}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      {children}
    </div>
  );
}
