import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Education',
  description:
    'Education background of Prazwal Bhusal — Bachelor of Information Technology at Padmashree College, Kathmandu, Nepal.',
  alternates: { canonical: '/education' },
}

const studyAreas = [
  {
    label: 'Cybersecurity',
    icon: '🔒',
    description: 'Network security, ethical hacking fundamentals, and security best practices.',
  },
  {
    label: 'Computer Networking',
    icon: '🌐',
    description: 'TCP/IP, routing, switching, network protocols, and administration.',
  },
  {
    label: 'Software Development',
    icon: '💻',
    description: 'Programming paradigms, data structures, algorithms, and software engineering.',
  },
  {
    label: 'Web Development',
    icon: '🕸️',
    description: 'Front-end and full-stack web technologies, frameworks, and deployment.',
  },
  {
    label: 'Artificial Intelligence',
    icon: '🤖',
    description: 'Machine learning concepts, neural networks, and AI applications.',
  },
  {
    label: 'Database Systems',
    icon: '🗄️',
    description: 'Relational databases, SQL, data modeling, and database design.',
  },
  {
    label: 'Operating Systems',
    icon: '⚙️',
    description: 'System architecture, process management, memory management, and Linux.',
  },
  {
    label: 'Information Systems',
    icon: '📊',
    description: 'IT infrastructure, systems analysis, and information management.',
  },
]

export default function EducationPage() {
  return (
    <div className="min-h-screen">
      {/* ── Page header ──────────────────────────────────────────────────── */}
      <section
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--bg-secondary)] border-b border-[var(--border)]"
        aria-labelledby="education-heading"
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-[var(--accent)] text-sm font-semibold uppercase tracking-widest mb-3">
            Education
          </p>
          <h1
            id="education-heading"
            className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4"
          >
            Academic{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, var(--gradient-from), var(--gradient-to))',
              }}
            >
              Background
            </span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl leading-relaxed">
            My formal education in Information Technology, building a foundation in computing,
            networking, and software development.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* ── Degree card ─────────────────────────────────────────────────── */}
        <section aria-labelledby="degree-heading">
          <h2
            id="degree-heading"
            className="text-2xl font-bold text-[var(--text-primary)] mb-8"
          >
            Degree
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-5 top-6 bottom-0 w-px bg-[var(--border)]"
              aria-hidden="true"
            />

            <div className="relative flex gap-6">
              {/* Timeline dot */}
              <div
                className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-[var(--accent)] bg-[var(--accent-subtle)] flex items-center justify-center z-10"
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 text-[var(--accent)]"
                >
                  <path d="M10.394 2.08a1 1 0 0 0-.788 0l-7 3a1 1 0 0 0 0 1.84L5.25 8.051a.999.999 0 0 1 .356-.357l4-2.25A1 1 0 1 1 10 7.19v.05a.986.986 0 0 0 .045.27l.9 3.6.9-3.6a.985.985 0 0 0 .046-.27v-.05a1 1 0 1 1 .394 1.923l4-2.25.355.357 2.644-1.131a1 1 0 0 0 0-1.84l-7-3Z" />
                  <path d="M9.796 11.981a1 1 0 0 1-.788 0l-5-2.143v3.05c0 .98.665 1.823 1.618 2.032C7.095 15.197 8.5 15.5 10 15.5s2.905-.303 4.374-.58c.953-.21 1.618-1.052 1.618-2.032v-3.05l-5 2.143a1 1 0 0 1-.196.02Z" />
                </svg>
              </div>

              {/* Degree card */}
              <div className="flex-1 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-[var(--text-primary)] font-bold text-xl">
                      Bachelor of Information Technology
                    </h3>
                    <p className="text-[var(--accent-text)] font-semibold text-base mt-1">
                      Padmashree College
                    </p>
                    <p className="text-[var(--text-muted)] text-sm mt-0.5">
                      Kathmandu, Nepal
                    </p>
                  </div>
                  <span className="inline-flex items-center self-start px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--accent-subtle)] text-[var(--accent-text)] border border-[var(--accent)]/20 whitespace-nowrap">
                    Currently Pursuing
                  </span>
                </div>

                {/* Timeline placeholders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div className="rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] px-4 py-3">
                    <p className="text-[var(--text-muted)] text-xs mb-1">Start Year</p>
                    {/* TODO: Replace with actual start year */}
                    <p className="text-[var(--text-secondary)] text-sm italic">To be added</p>
                  </div>
                  <div className="rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] px-4 py-3">
                    <p className="text-[var(--text-muted)] text-xs mb-1">Expected Graduation</p>
                    {/* TODO: Replace with expected graduation year */}
                    <p className="text-[var(--text-secondary)] text-sm italic">To be added</p>
                  </div>
                </div>

                {/* Key facts */}
                <ul className="space-y-2">
                  {[
                    'Four-year undergraduate program in Information Technology',
                    'Curriculum covers networking, cybersecurity, software development, databases, and AI',
                    'Practical coursework with hands-on programming and lab sessions',
                  ].map((fact) => (
                    <li key={fact} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 text-[var(--accent)] flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {fact}
                    </li>
                  ))}
                </ul>

                {/* Achievements placeholder */}
                <div className="mt-4 rounded-xl border border-dashed border-[var(--border-strong)] px-4 py-3">
                  <p className="text-[var(--text-muted)] text-xs">
                    {/* TODO: Add academic achievements, certifications, or notable projects */}
                    📌 Academic achievements, certifications, and notable projects will be added here.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Relevant study areas ─────────────────────────────────────────── */}
        <section aria-labelledby="study-areas-heading">
          <h2
            id="study-areas-heading"
            className="text-2xl font-bold text-[var(--text-primary)] mb-3"
          >
            Relevant Study Areas
          </h2>
          <p className="text-[var(--text-secondary)] text-sm mb-8">
            Topics covered in the Bachelor of Information Technology curriculum.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {studyAreas.map((area) => (
              <div
                key={area.label}
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 hover:border-[var(--accent)] hover:bg-[var(--bg-card-hover)] transition-all duration-200"
              >
                <span className="text-2xl mb-3 block" aria-hidden="true">
                  {area.icon}
                </span>
                <h3 className="text-[var(--text-primary)] font-semibold text-sm mb-1.5">
                  {area.label}
                </h3>
                <p className="text-[var(--text-secondary)] text-xs leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Learning philosophy ──────────────────────────────────────────── */}
        <section
          className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8"
          aria-labelledby="learning-heading"
        >
          <h2
            id="learning-heading"
            className="text-xl font-bold text-[var(--text-primary)] mb-4"
          >
            Approach to Learning
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: '📚',
                title: 'Academic Study',
                body: 'Pursuing a structured IT degree to build solid theoretical foundations across core computing disciplines.',
              },
              {
                icon: '🛠️',
                title: 'Hands-on Practice',
                body: 'Building personal projects and experimenting with tools to reinforce what I learn in the classroom.',
              },
              {
                icon: '🔍',
                title: 'Continuous Exploration',
                body: 'Staying curious about emerging technologies — especially cybersecurity, AI, and networking.',
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-2">
                <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                <h3 className="text-[var(--text-primary)] font-semibold text-sm">
                  {item.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            style={{
              backgroundImage:
                'linear-gradient(135deg, var(--gradient-from), var(--gradient-to))',
            }}
          >
            View my skills →
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            More about me
          </Link>
        </div>
      </div>
    </div>
  )
}
