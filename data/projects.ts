import type { CharacterState } from "@/components/character/character.types";
import { resume } from "@/data/resume";

export type ProjectVisualType = "transport-map" | "health-data";

export type ProjectMetric = {
  value: string;
  label: string;
};

export type ProjectCaseStudy = {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  period: string;
  type: string;
  technologies: readonly string[];
  description: string;
  features: readonly string[];
  metrics: readonly ProjectMetric[];
  safetyNote?: string;
  visual: ProjectVisualType;
  characterState: CharacterState;
  layout: "split" | "immersive";
};

const [transport, heartGuard] = resume.projects;

/** Extensible case-study records derived from the authoritative resume data. */
export const projectCaseStudies: readonly ProjectCaseStudy[] = [
  {
    id: "transport-tracking",
    number: "01",
    title: transport.name,
    period: transport.period,
    type: transport.type,
    technologies: transport.technologies,
    description: transport.summary,
    features: transport.features,
    metrics: transport.outcomes,
    visual: "transport-map",
    characterState: "point",
    layout: "split",
  },
  {
    id: "heart-guard",
    number: "02",
    title: heartGuard.name,
    subtitle: heartGuard.subtitle,
    period: heartGuard.period,
    type: heartGuard.type,
    technologies: heartGuard.technologies,
    description: heartGuard.summary,
    features: heartGuard.features,
    metrics: [],
    safetyNote: heartGuard.safetyNote,
    visual: "health-data",
    characterState: "analyze",
    layout: "immersive",
  },
];
