export const site = {
  name: "Aditya Rai",
  shortName: "AR",
  location: "Prayagraj, India",
  email: "adi9910119238@gmail.com",
  phone: "6394030440",
  statement:
    "Building intelligent technology with thoughtful design and strong leadership.",
  disciplines: [
    "AI/ML & Frontend Development",
    "UI/UX & Graphic Design",
    "Technology & Design Leadership",
  ],
  roles: [
    { title: "Leader", organisation: "Team Evolvex" },
    { title: "Head Graphic Designer", organisation: "E-Cell UIT" },
    { title: "Head Graphic Designer", organisation: "United Incubation Hub" },
  ],
  education: {
    degree: "B.Tech",
    institution: "United Institute of Technology, Prayagraj",
    period: "2024 – Present",
  },
} as const;

export type SiteRole = (typeof site.roles)[number];
