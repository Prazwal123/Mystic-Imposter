// ─── Project data ─────────────────────────────────────────────────────────────
// To add a new project:
//   1. Add an entry to this array following the Project interface below.
//   2. Create a matching route folder at src/app/projects/[your-slug]/page.tsx
//      (copy an existing project page as a starting point).
//   3. No other files need to be modified.

export interface ProjectTech {
  name: string
  color?: string
}

export interface Project {
  /** URL-friendly slug — must match the folder name under app/projects/ */
  slug: string
  title: string
  shortDescription: string
  description: string
  category: 'Web Development' | 'Cybersecurity' | 'Networking' | 'AI/ML' | 'Software' | 'Other'
  tech: ProjectTech[]
  githubUrl?: string
  liveUrl?: string
  /** For internal routes (e.g. /game) — used instead of liveUrl for the Play button */
  internalRoute?: string
  /** Label for the internal route button */
  internalRouteLabel?: string
  featured: boolean
  status: 'Completed' | 'In Progress' | 'Planned'
  date?: string
  coverImage?: string
}

// ─── Projects list ─────────────────────────────────────────────────────────
const projects: Project[] = [
  // ── Mystic Imposter ───────────────────────────────────────────────────────
  {
    slug: 'mystic-imposter',
    title: 'Mystic Imposter',
    shortDescription:
      'A Nepal-themed social deduction word game featuring 500+ culturally grounded word entries with Nepanglish-style hints, multiple game modes, and an admin panel.',
    description:
      'Mystic Imposter is a Nepal-themed social deduction party game. Players receive secret words with culturally grounded, Nepanglish-style hints. One player is the "Imposter" who tries to blend in without knowing the real word. The game includes 500+ word entries, multiple game modes (Classic, Double Trouble, Blind Imposter, Spy Mode, Chaos Mode), real-time online multiplayer via Socket.IO, a statistics tracker, game history, custom word packs, and an admin panel for managing word entries.',
    category: 'Web Development',
    tech: [
      { name: 'Next.js' },
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
      { name: 'Supabase' },
      { name: 'Socket.IO' },
      { name: 'Framer Motion' },
    ],
    // TODO: Add GitHub repository URL when public
    githubUrl: undefined,
    liveUrl: undefined,
    internalRoute: '/game',
    internalRouteLabel: 'Play Game',
    featured: true,
    status: 'Completed',
    date: '2024',
  },

  // ── Portfolio Website ──────────────────────────────────────────────────────
  {
    slug: 'portfolio-website',
    title: 'Personal Portfolio Website',
    shortDescription:
      'A responsive personal portfolio built with Next.js App Router, TypeScript, and Tailwind CSS.',
    description:
      'This portfolio website showcases my skills, projects, and background as an IT student. Built using Next.js App Router for server-side rendering and optimal performance, TypeScript for type safety, and Tailwind CSS for a modern, responsive design. Includes dark/light mode, smooth animations, and a contact form.',
    category: 'Web Development',
    tech: [
      { name: 'Next.js' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
      { name: 'React' },
    ],
    // TODO: Replace with your actual GitHub repository URL
    githubUrl: undefined,
    liveUrl: 'https://prazwalbhusal.com.np',
    featured: true,
    status: 'In Progress',
    date: '2024',
  },

  // ── Network Scanner ────────────────────────────────────────────────────────
  // TODO: Replace with a real project once available.
  {
    slug: 'network-scanner',
    title: 'Network Scanner Tool',
    shortDescription:
      'A Python-based tool for basic network reconnaissance and port scanning.',
    description:
      'A command-line network scanner developed as a learning project for understanding networking protocols, TCP/IP fundamentals, and basic security reconnaissance techniques. Built with Python using socket programming.',
    category: 'Networking',
    tech: [
      { name: 'Python' },
      { name: 'Networking' },
      { name: 'Socket Programming' },
    ],
    // TODO: Replace with your actual GitHub repository URL
    githubUrl: undefined,
    liveUrl: undefined,
    featured: false,
    status: 'Completed',
    date: '2024',
  },

  // ── Cybersecurity Notes ────────────────────────────────────────────────────
  // TODO: Replace with a real project once available.
  {
    slug: 'cybersecurity-notes',
    title: 'Cybersecurity Study Notes',
    shortDescription:
      'A structured collection of notes and resources on cybersecurity fundamentals.',
    description:
      'A personal knowledge base documenting key concepts in cybersecurity including network security, cryptography, ethical hacking fundamentals, and security best practices. Created as part of academic study and self-learning.',
    category: 'Cybersecurity',
    tech: [
      { name: 'Markdown' },
      { name: 'Git' },
      { name: 'Cybersecurity' },
    ],
    // TODO: Replace with your actual GitHub repository URL
    githubUrl: undefined,
    liveUrl: undefined,
    featured: false,
    status: 'In Progress',
    date: '2024',
  },
]

export default projects

/** Get a single project by slug */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

/** Get all featured projects */
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}

/** Get all project slugs (used for generateStaticParams) */
export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug)
}
