import { resume } from "@/data/resume";

export const identity = {
  name: resume.profile.name,
  initials: "AR",
  professionalIdentity: resume.profile.professionalIdentity,
  brandAxis: ["Design", "Code", "AI", "Impact"],
} as const;

export const colors = [
  { name: "Background", token: "--background", value: "#0A0A0A", use: "Primary near-black canvas" },
  { name: "Foreground", token: "--foreground", value: "#F5F3EE", use: "Primary off-white text" },
  { name: "Muted", token: "--muted", value: "#8B8B8B", use: "Secondary information" },
  { name: "Accent", token: "--accent", value: "#C8102E", use: "Sparse brand signal" },
  { name: "Border", token: "--border", value: "rgba(245,243,238,.16)", use: "Fine structural rules" },
  { name: "Card", token: "--card", value: "#121212", use: "Quiet raised surface" },
  { name: "Overlay", token: "--overlay", value: "rgba(10,10,10,.82)", use: "Navigation and media veil" },
] as const;

export const typography = [
  { role: "Display XL", token: "--type-display-xl", sample: "ADITYA", className: "display-xl" },
  { role: "Display L", token: "--type-display-l", sample: "Design × Code", className: "display-l" },
  { role: "Heading 1", token: "--type-heading-1", sample: "Ideas into interfaces.", className: "heading-1" },
  { role: "Heading 2", token: "--type-heading-2", sample: "Crafted with intent.", className: "heading-2" },
  { role: "Heading 3", token: "--type-heading-3", sample: "Systems with soul.", className: "heading-3" },
  { role: "Body Large", token: "--type-body-large", sample: "Designing useful digital experiences through clarity and restraint.", className: "body-large" },
  { role: "Body", token: "--type-body", sample: "Every element supports hierarchy, usability, and a clear narrative.", className: "body" },
  { role: "Caption", token: "--type-caption", sample: "Selected work / case study / 2026", className: "caption" },
  { role: "Technical Label", token: "--type-technical-label", sample: "UI/UX DESIGNER — FRONTEND DEVELOPER", className: "technical-label" },
] as const;

export const spacing = [
  { token: "01", value: "4", label: "Micro" },
  { token: "02", value: "8", label: "Tight" },
  { token: "03", value: "12", label: "Inline" },
  { token: "04", value: "16", label: "Base" },
  { token: "05", value: "24", label: "Cluster" },
  { token: "06", value: "32", label: "Component" },
  { token: "07", value: "48", label: "Block" },
  { token: "08", value: "64", label: "Layout" },
  { token: "09", value: "96", label: "Section" },
  { token: "10", value: "144", label: "Cinematic" },
] as const;

export const radii = [
  { name: "Zero", value: "0px", use: "Editorial structure" },
  { name: "Hair", value: "2px", use: "Rules and controls" },
  { name: "Soft", value: "8px", use: "Functional surfaces" },
  { name: "Frame", value: "18px", use: "Feature media only" },
  { name: "Round", value: "999px", use: "Signals and status" },
] as const;

export const motionPrinciples = [
  { number: "01", title: "Reveal hierarchy", detail: "Motion introduces reading order. It never competes with the message." },
  { number: "02", title: "Preserve continuity", detail: "Shared elements carry visual energy across section boundaries." },
  { number: "03", title: "Respond with intent", detail: "Hover and pointer effects are reserved for meaningful choices." },
  { number: "04", title: "Respect stillness", detail: "Reduced-motion and touch modes remove spectacle without removing content." },
] as const;

export const breakpoints = [
  { range: "320—479", name: "Compact", columns: "4 col", behavior: "Native scroll · no cursor · linear stories" },
  { range: "480—767", name: "Mobile", columns: "4 col", behavior: "Touch-first · reduced atmosphere" },
  { range: "768—1199", name: "Tablet", columns: "8 col", behavior: "Editorial split · restrained parallax" },
  { range: "1200—1535", name: "Desktop", columns: "12 col", behavior: "Full choreography · precision cursor" },
  { range: "1536+", name: "Wide", columns: "12 col", behavior: "Capped content · expanded negative space" },
] as const;

export const architecture = [
  { layer: "01", name: "Tokens", detail: "Colour · type · spacing · geometry · motion" },
  { layer: "02", name: "Primitives", detail: "Reveal · magnetic action · label · rule · frame" },
  { layer: "03", name: "Compositions", detail: "Editorial header · chapter intro · media index" },
  { layer: "04", name: "Scenes", detail: "Future resume-led portfolio narratives" },
] as const;
