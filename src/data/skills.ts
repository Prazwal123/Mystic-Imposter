// ─── Skills data ──────────────────────────────────────────────────────────────
// To add a new skill, append an entry to the relevant category array.
// To add a new category, add a new SkillCategory object to the `skillCategories` array.

export interface Skill {
  name: string;
  /** Optional icon identifier — can be used with an icon library later */
  icon?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  /** Short description shown on the skills section */
  description: string;
  skills: Skill[];
}

// ─── Skill categories ──────────────────────────────────────────────────────
const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "Programming Languages",
    description: "Languages I have learned and practiced",
    skills: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "Python" },
      { name: "C" },
      { name: "C++" },
      { name: "SQL" },
      // ── Add more languages here ──
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks & Libraries",
    description: "Tools and frameworks I work with",
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Node.js" },
      // ── Add more frameworks here ──
    ],
  },
  {
    id: "tools",
    label: "Tools & Platforms",
    description: "Development tools and platforms I use",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "VS Code" },
      { name: "Linux" },
      { name: "Terminal / CLI" },
      // ── Add more tools here ──
    ],
  },
  {
    id: "interests",
    label: "Areas of Interest",
    description: "Topics I am actively learning and exploring",
    skills: [
      { name: "Cybersecurity" },
      { name: "Computer Networking" },
      { name: "Software Development" },
      { name: "Web Development" },
      { name: "Artificial Intelligence" },
      { name: "Information Technology" },
      // ── Add more interest areas here ──
    ],
  },
];

export default skillCategories;
