"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ProjectVisualType } from "@/data/projects";

export function ProjectVisual({ type }: Readonly<{ type: ProjectVisualType }>) {
  const reduceMotion = useReducedMotion();

  if (type === "transport-map") {
    return (
      <div className="project-visual-canvas project-visual-canvas--transport" aria-hidden="true">
        <div className="project-visual-grid" />
        <svg viewBox="0 0 720 540" preserveAspectRatio="xMidYMid meet">
          <path className="transport-road" d="M-40 437 C104 397 116 265 245 292 S384 115 500 158 S592 319 760 77" />
          <path className="transport-road transport-road--secondary" d="M65 40 C169 143 146 216 255 229 S432 371 556 337 S654 416 735 473" />
          <circle cx="245" cy="292" r="8" />
          <circle cx="500" cy="158" r="8" />
          <circle cx="556" cy="337" r="8" />
          <motion.g
            className="transport-vehicle"
            initial={false}
            animate={reduceMotion ? { x: 245, y: 292 } : {
              x: [68, 245, 500, 650],
              y: [405, 292, 158, 178],
              rotate: [-8, -18, 16, -22],
            }}
            transition={{ duration: 8.5, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" }}
          >
            <rect x="-20" y="-11" width="40" height="22" rx="3" />
            <circle cx="-11" cy="13" r="4" />
            <circle cx="11" cy="13" r="4" />
          </motion.g>
        </svg>
        <span className="project-visual-label project-visual-label--top">GPS / Live route</span>
        <span className="project-visual-label project-visual-label--bottom">Route optimization</span>
        <div className="transport-signal"><i /><i /><i /></div>
      </div>
    );
  }

  return (
    <div className="project-visual-canvas project-visual-canvas--health" aria-hidden="true">
      <div className="project-visual-grid" />
      <svg viewBox="0 0 720 540" preserveAspectRatio="xMidYMid meet">
        <path className="health-signal" d="M-20 287 H107 L139 287 L171 193 L216 368 L257 247 L291 287 H744" />
        <circle className="health-orbit" cx="535" cy="210" r="108" />
        <circle className="health-orbit health-orbit--inner" cx="535" cy="210" r="61" />
        <g className="health-nodes">
          <line x1="445" y1="367" x2="535" y2="271" />
          <line x1="535" y1="271" x2="636" y2="345" />
          <line x1="535" y1="271" x2="425" y2="163" />
          <circle cx="445" cy="367" r="7" />
          <circle cx="636" cy="345" r="7" />
          <circle cx="425" cy="163" r="7" />
          <circle cx="535" cy="271" r="9" />
        </g>
      </svg>
      <div className="health-data-stack">
        <span><i /> Real-time data</span>
        <span><i /> Risk support</span>
        <span><i /> Firebase sync</span>
      </div>
      <span className="project-visual-label project-visual-label--top">AI / Decision support</span>
      <span className="project-visual-label project-visual-label--bottom">Guidance interface</span>
    </div>
  );
}
