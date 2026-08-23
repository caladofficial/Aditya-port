export type ProjectKind = "sphere" | "route";

export type ProjectOutcome = {
  value: string;
  label: string;
};

export type Project = {
  id: "healthguard" | "all-rounder-transport";
  index: number;
  kind: ProjectKind;
  name: string;
  subtitle: string;
  period: string;
  skills: readonly string[];
  details: readonly string[];
  technologies: readonly string[];
  outcomes?: readonly ProjectOutcome[];
};

/**
 * Add future case studies here. ProjectChapter selects an experience treatment
 * from `kind`, so project data remains separate from the visual system.
 */
export const projects: readonly Project[] = [
  {
    id: "healthguard",
    index: 1,
    kind: "sphere",
    name: "HEALTHGUARD",
    subtitle: "AI-BASED HEART DIAGNOSIS SUPPORT SYSTEM",
    period: "JAN 2026 — PRESENT",
    skills: ["AI / ML", "PYTHON", "REACT", "FIREBASE", "UI/UX", "DATA PROCESSING"],
    details: [
      "AI-POWERED HEALTHCARE APPLICATION.",
      "PRELIMINARY HEART-DISEASE RISK ANALYSIS.",
      "INTERACTIVE CHATBOT.",
      "PREVENTIVE HEALTHCARE GUIDANCE.",
      "RESPONSIVE UI/UX.",
      "FIREBASE REAL-TIME DATA SYNCHRONIZATION.",
    ],
    technologies: ["PYTHON", "REACT", "FIREBASE"],
  },
  {
    id: "all-rounder-transport",
    index: 2,
    kind: "route",
    name: "ALL ROUNDER TRANSPORT",
    subtitle: "TRACKING SYSTEM",
    period: "JAN 2025 — OCT 2025",
    skills: ["REAL-TIME GPS", "ROUTE OPTIMIZATION", "LIVE TRACKING", "REAL-TIME STATUS"],
    details: ["PYTHON / DJANGO", "REACT"],
    technologies: ["PYTHON / DJANGO", "REACT"],
    outcomes: [
      { value: "15%", label: "REDUCTION IN FUEL USAGE" },
      { value: "20%", label: "IMPROVEMENT IN DELIVERY SPEED" },
      { value: "25%", label: "IMPROVEMENT IN CUSTOMER EXPERIENCE" },
    ],
  },
] as const;

export type ProjectId = (typeof projects)[number]["id"];
