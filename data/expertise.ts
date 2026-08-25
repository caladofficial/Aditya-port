import type { CharacterState } from "@/components/character/character.types";
import { resume } from "@/data/resume";

export type ExpertiseVisual = "wireframe" | "code" | "data" | "architecture" | "logic";

export type ExpertiseItem = {
  number: string;
  title: string;
  state: CharacterState;
  skills: readonly string[];
  visual: ExpertiseVisual;
};

/** Every rendered capability resolves to the verified resume data layer. */
export const expertiseItems = [
  {
    number: "01",
    title: "UI/UX Design",
    state: "design",
    skills: resume.skills.design,
    visual: "wireframe",
  },
  {
    number: "02",
    title: "Frontend Development",
    state: "code",
    skills: resume.skills.development,
    visual: "code",
  },
  {
    number: "03",
    title: "AI & Data",
    state: "analyze",
    skills: resume.skills.data,
    visual: "data",
  },
  {
    number: "04",
    title: "Product Development",
    state: "present",
    skills: resume.skills.methodology,
    visual: "architecture",
  },
  {
    number: "05",
    title: "Problem Solving",
    state: "analyze",
    skills: resume.skills.fundamentals,
    visual: "logic",
  },
] as const satisfies readonly ExpertiseItem[];
