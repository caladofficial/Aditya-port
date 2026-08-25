/**
 * The single authoritative content source for Aditya Rai's portfolio.
 * Transcribed from the resume image supplied by the user on 2026-08-25.
 *
 * Presentation components may shorten copy for layout, but they must not add,
 * infer, or alter factual claims without updating this source from a new resume.
 */
export const resume = {
  source: {
    label: "Aditya Rai resume",
    receivedAt: "2026-08-25",
    format: "user-supplied resume image",
  },
  profile: {
    name: "Aditya Rai",
    phone: "6394030440",
    email: "adi9910119238@gmail.com",
    location: "Prayagraj, India",
    professionalIdentity: ["UI/UX Designer", "Frontend Developer", "B.Tech Student"],
    objective:
      "Results-oriented B.Tech student specializing in UI/UX design and frontend development with strong foundations in Data Structures and Algorithms. Experienced in building scalable web applications using React, Python, and Firebase. Proven leadership as Smart India Hackathon Team Leader. A quick learner with a drive for innovation, collaboration, and technical excellence in every project.",
  },
  education: [
    {
      institution: "United Institute of Technology, Prayagraj",
      period: "Jan 2024 – Present",
      qualification: "Bachelor of Technology",
      details: [
        "Specialized in Data Structures, Algorithms, OOP, DBMS, and OS.",
        "Hands-on experience in Python, Java, SQL, Git.",
        "Applied Agile and SDLC principles.",
        "Developed scalable, efficient software solutions.",
      ],
    },
    {
      institution: "Northwest Accreditation Commission, Delhi",
      period: "Jan 2021 – Jan 2022",
      qualification: "12th Standard",
      details: ["Physics, Chemistry, Mathematics, English"],
    },
    {
      institution: "Sunbeam School, Varanasi",
      period: "Jan 2019 – Jan 2020",
      qualification: "10th Standard",
      details: ["Strong foundation in Mathematics, Science, and Languages"],
    },
  ],
  experience: [
    {
      role: "SIH Team Leader",
      organisation: "Smart India Hackathon",
      location: "Prayagraj",
      period: "Jan 2025 – Oct 2025",
      summary: "Led a cross-functional team and developed innovative solutions recognized for technical innovation.",
      responsibilities: ["Project planning", "Mentoring", "Agile workflow", "Scalable prototype"],
      highlights: [
        "Led a cross-functional team and developed innovative solutions recognized for technical innovation.",
        "Managed project planning, mentoring, and agile workflow; designed a scalable prototype.",
      ],
    },
    {
      role: "Designer",
      organisation: "E-cell UIT",
      location: "Prayagraj",
      period: "Jan 2025 – Present",
      summary: "Created visual assets boosting brand visibility by 30%.",
      skills: ["Figma", "Adobe Suite", "UI/UX", "Brand consistency"],
      delivery: "20+ projects delivered.",
      highlights: [
        "Created visual assets boosting brand visibility by 30%; designed UI/UX interfaces using Figma & Adobe Suite.",
        "Delivered 20+ projects ensuring brand consistency across all deliverables.",
      ],
    },
    {
      role: "Data Analyst",
      organisation: "Capex Allocation Advisory",
      location: "Mumbai",
      period: "Jan 2023 – Jan 2024",
      summary: "Assisted in data visualization and reporting automation to support decision-making.",
      highlights: [
        "Assisted in data visualization and reporting automation to support decision-making processes.",
      ],
    },
  ],
  projects: [
    {
      name: "All Rounder Transport Tracking System",
      period: "Jan 2025 – Oct 2025",
      highlights: [
        "Developed real-time GPS tracking system using Python (Django) and React.",
        "Implemented route optimization reducing fuel usage by 15% and improving delivery speed by 20%.",
        "Enhanced customer experience by 25% through live tracking and real-time updates.",
      ],
      technologies: ["Python", "Django", "React", "GPS tracking"],
    },
    {
      name: "Heart Guard – AI-Based Heart Diagnosis Support System",
      period: "Jan 2026 – Present",
      highlights: [
        "Built AI-powered web application for heart disease risk prediction using real-time health data.",
        "Integrated chatbot for user interaction and preventive healthcare guidance.",
        "Designed intuitive, responsive UI for non-technical users; utilized Firebase for secure real-time data sync.",
      ],
      technologies: ["AI", "Firebase", "Responsive UI", "Real-time data"],
    },
  ],
  certificationsAndAchievements: [
    {
      name: "Power BI with AI",
      detail: "Certificate of Completion from Unstop.",
      category: "certification",
    },
    {
      name: "LeetCode Data Navigator Badge",
      detail: "Mastery in data query and manipulation.",
      category: "achievement",
    },
    {
      name: "LeetCode Architecture Builder Badge",
      detail: "Building robust systems and software architecture.",
      category: "achievement",
    },
    {
      name: "Smart India Hackathon Team Leader",
      detail: "Designed scalable prototype recognized for technical innovation.",
      category: "achievement",
    },
    {
      name: "E-cell UIT Designer",
      detail: "Delivered 20+ visual & UI/UX projects boosting brand visibility by 30%.",
      category: "achievement",
    },
  ],
  skills: {
    design: ["Figma", "Adobe Suite", "UI/UX Design"],
    development: ["React", "Python", "Java", "SQL", "Git"],
    fundamentals: ["DSA", "OOP", "DBMS", "Operating Systems"],
    data: ["Power BI", "Data Visualization", "Reporting Automation"],
    methodology: ["Agile", "SDLC"],
    technical: ["React", "Python", "Java", "SQL", "Git", "Agile", "Power BI"],
    computerScience: ["Data Structures and Algorithms", "OOP", "DBMS"],
    soft: [
      "Communication",
      "Teamwork",
      "Creativity",
      "Attention To Detail",
      "Adaptability",
      "Critical Thinking",
    ],
  },
  languages: [
    { name: "Hindi", proficiency: "Native" },
    { name: "English", proficiency: "Highly Proficient" },
    { name: "French", proficiency: "Working Knowledge" },
  ],
} as const;

export type Resume = typeof resume;
export type ResumeEducation = Resume["education"][number];
export type ResumeExperience = Resume["experience"][number];
export type ResumeProject = Resume["projects"][number];
