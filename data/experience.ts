import type { CharacterState } from "@/components/character/character.types";
import { resume } from "@/data/resume";

type ExperienceTimelineItem = {
  number: string;
  organisation: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  state: CharacterState;
  detailLabel?: string;
  details?: readonly string[];
  delivery?: string;
};

const [sih, ecell, capex] = resume.experience;

/** Timeline presentation derived only from the authoritative resume transcription. */
export const experienceTimeline: readonly ExperienceTimelineItem[] = [
  {
    number: "01",
    organisation: sih.organisation.toUpperCase(),
    role: sih.role,
    location: sih.location,
    period: sih.period,
    summary: sih.summary,
    state: "present",
    detailLabel: "Responsibilities",
    details: sih.responsibilities,
  },
  {
    number: "02",
    organisation: ecell.organisation.toUpperCase(),
    role: ecell.role,
    location: ecell.location,
    period: ecell.period,
    summary: ecell.summary,
    state: "design",
    detailLabel: "Practice",
    details: ecell.skills,
    delivery: ecell.delivery,
  },
  {
    number: "03",
    organisation: capex.organisation.toUpperCase(),
    role: capex.role,
    location: capex.location,
    period: capex.period,
    summary: capex.summary,
    state: "analyze",
  },
];
