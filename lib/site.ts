import { resume } from "@/data/resume";

/** Minimal global identity used by system-level UI. Resume content remains canonical. */
export const site = {
  name: resume.profile.name,
  initials: "AR",
  professionalIdentity: resume.profile.professionalIdentity,
  location: resume.profile.location,
  email: resume.profile.email,
  phone: resume.profile.phone,
} as const;
