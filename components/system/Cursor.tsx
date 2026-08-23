"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Desktop-only cursor. Interactive elements can provide data-cursor-label="VIEW"
 * or data-cursor-label="EXPLORE"; ordinary interactive elements only expand it.
 */
export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const supportsCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (prefersReducedMotion || !supportsCursor) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let frame = 0;
    let isVisible = false;
    const target = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };

    const render = () => {
      current.x += (target.x - current.x) * 0.2;
      current.y += (target.y - current.y) * 0.2;
      cursor.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;

      if (Math.abs(target.x - current.x) > 0.08 || Math.abs(target.y - current.y) > 0.08 || !isVisible) {
        frame = window.requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };

    const updateInteractiveState = (element: HTMLElement | null) => {
      const interactive = element?.closest<HTMLElement>("[data-cursor], [data-magnetic], a, button");
      const label = interactive?.dataset.cursorLabel?.trim() ?? "";
      const isActive = Boolean(interactive);
      const mode = interactive?.dataset.cursor ?? (interactive?.hasAttribute("data-magnetic") ? "magnetic" : interactive?.tagName.toLowerCase() ?? "default");

      cursor.dataset.active = String(isActive);
      cursor.dataset.mode = mode;
      if (label) cursor.dataset.label = label;
      else delete cursor.dataset.label;
    };

    const move = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      isVisible = true;
      cursor.dataset.visible = "true";
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const over = (event: PointerEvent) => updateInteractiveState(event.target as HTMLElement | null);
    const out = (event: PointerEvent) => {
      const next = event.relatedTarget as HTMLElement | null;
      updateInteractiveState(next);
    };
    const leaveWindow = () => {
      isVisible = false;
      cursor.dataset.visible = "false";
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerout", out, { passive: true });
    document.documentElement.addEventListener("mouseleave", leaveWindow);
    document.documentElement.dataset.cursor = "active";

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerout", out);
      document.documentElement.removeEventListener("mouseleave", leaveWindow);
      delete cursor.dataset.mode;
      delete cursor.dataset.label;
      delete document.documentElement.dataset.cursor;
    };
  }, [prefersReducedMotion]);

  return <div ref={cursorRef} className="cursor" aria-hidden="true" />;
}
