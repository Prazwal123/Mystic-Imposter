import type { Metadata } from 'next'
import skillCategories from '@/data/skills'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'Technical skills and areas of interest of Prazwal Bhusal — programming languages, frameworks, tools, and technology domains.',
  alternates: { canonical: '/skills' },
}

export default function SkillsPage() {
  return (
    <div className="min-h-screen">
      {/* ── Page header ──────────────────────────────────────────────────── */}
      <section
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--bg-secondary)] border-b border-[var(--border)]"
        aria-labelledby="skills-heading"
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-[var(--accent)] text-sm font-semibold uppercase tracking-widest mb-3">
            Skills
          </p>
          <h1
            id="skills-heading"
            className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4"
          >
            Technologies &amp;{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, var(--gradient-from), var(--gradient-to))',
              }}
            >
              Interests
            </span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl leading-relaxed">
            A collection of the languages, tools, and technology areas I work
            with and actively explore. This list grows as I learn.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {skillCategories.map((category, index) => (
          <section key={category.id} aria-labelledby={`category-${category.id}`}>
            <div className="flex items-center gap-4 mb-6">
              {/* Category number */}
              <span
                className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--accent-subtle)] text-[var(--accent-text)] text-xs font-bold flex items-center justify-center border border-[var(--accent)]/20"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h2
                  id={`category-${category.id}`}
                  className="text-xl font-bold text-[var(--text-primary)]"
                >
                  {category.label}
                </h2>
                <p className="text-[var(--text-muted)] text-sm">
                  {category.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-3 py-4 text-center transition-all duration-200 hover:border-[var(--accent)] hover:bg-[var(--bg-card-hover)] hover:-translate-y-0.5"
                >
                  <span className="text-[var(--text-primary)] text-sm font-medium group-hover:text-[var(--accent)] transition-colors">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Note about skill levels */}
        <aside
          className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6"
          aria-label="Note about skill levels"
        >
          <div className="flex items-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="text-[var(--text-primary)] font-medium text-sm mb-1">
                About these skills
              </p>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                These are technologies and areas I have studied, practiced, or am
                actively learning as part of my IT education. They represent where
                I am in my learning journey, not a claim of expert-level proficiency.
                I&apos;m always adding to this list as I continue to grow.
              </p>
            </div>
          </div>
        </aside>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            style={{
              backgroundImage:
                'linear-gradient(135deg, var(--gradient-from), var(--gradient-to))',
            }}
          >
            See these in action →
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            Let&apos;s collaborate
          </Link>
        </div>
      </div>
    </div>
  )
}
