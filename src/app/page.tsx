import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import ProjectCard from '@/components/ProjectCard'
import Link from 'next/link'
import { getFeaturedProjects } from '@/data/projects'
import skillCategories from '@/data/skills'

export const metadata: Metadata = {
  title: 'Prazwal Bhusal | IT Student & Technology Enthusiast',
  description:
    'Personal portfolio of Prazwal Bhusal, an IT student from Kathmandu, Nepal interested in cybersecurity, networking, software development, AI, and technology.',
  alternates: { canonical: '/' },
}

export default function HomePage() {
  const featured = getFeaturedProjects()
  // Show the first two categories on the home page as a teaser
  const previewCategories = skillCategories.slice(0, 2)

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <Hero />

      {/* ── About snapshot ───────────────────────────────────────────────── */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--bg-secondary)]"
        aria-labelledby="about-heading-home"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[var(--accent)] text-sm font-semibold uppercase tracking-widest mb-3">
                About Me
              </p>
              <h2
                id="about-heading-home"
                className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-5"
              >
                IT Student from{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      'linear-gradient(135deg, var(--gradient-from), var(--gradient-to))',
                  }}
                >
                  Kathmandu
                </span>
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                I&apos;m Prazwal Bhusal, currently pursuing a Bachelor of Information
                Technology at Padmashree College, Kathmandu, Nepal. I have a strong
                interest in cybersecurity, computer networking, and software development.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                Beyond academics, I enjoy exploring new technologies, traveling, and
                bike riding. I&apos;m always looking to learn and build things that solve
                real problems.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
              >
                More about me
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  label: 'Education',
                  value: 'Bachelor of Information Technology',
                  sub: 'Padmashree College',
                  icon: '🎓',
                },
                {
                  label: 'Location',
                  value: 'Kathmandu, Nepal',
                  sub: 'Available remotely',
                  icon: '📍',
                },
                {
                  label: 'Focus',
                  value: 'Cybersecurity & Networking',
                  sub: 'Also: Software Dev, AI',
                  icon: '🔒',
                },
                {
                  label: 'Status',
                  value: 'Currently Studying',
                  sub: 'Open to opportunities',
                  icon: '📚',
                },
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5"
                >
                  <span className="text-2xl mb-3 block" aria-hidden="true">
                    {card.icon}
                  </span>
                  <p className="text-[var(--text-muted)] text-xs uppercase tracking-widest mb-1">
                    {card.label}
                  </p>
                  <p className="text-[var(--text-primary)] font-semibold text-sm">
                    {card.value}
                  </p>
                  <p className="text-[var(--text-muted)] text-xs mt-0.5">{card.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills teaser ────────────────────────────────────────────────── */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        aria-labelledby="skills-heading-home"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[var(--accent)] text-sm font-semibold uppercase tracking-widest mb-2">
                Skills
              </p>
              <h2
                id="skills-heading-home"
                className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]"
              >
                Technologies I Work With
              </h2>
            </div>
            <Link
              href="/skills"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
            >
              View all
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {previewCategories.map((cat) => (
              <div
                key={cat.id}
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6"
              >
                <h3 className="text-[var(--text-primary)] font-semibold mb-1">
                  {cat.label}
                </h3>
                <p className="text-[var(--text-muted)] text-xs mb-4">
                  {cat.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[var(--accent-subtle)] text-[var(--accent-text)] border border-[var(--accent)]/20"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Link
              href="/skills"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)]"
            >
              View all skills →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured projects ─────────────────────────────────────────────── */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--bg-secondary)]"
        aria-labelledby="projects-heading-home"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[var(--accent)] text-sm font-semibold uppercase tracking-widest mb-2">
                Projects
              </p>
              <h2
                id="projects-heading-home"
                className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]"
              >
                Featured Work
              </h2>
            </div>
            <Link
              href="/projects"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
            >
              View all
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          {featured.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <p className="text-[var(--text-muted)] text-sm">
              Projects coming soon.
            </p>
          )}

          <div className="mt-6 sm:hidden">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)]"
            >
              View all projects →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA strip ────────────────────────────────────────────────────── */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        aria-labelledby="cta-heading"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2
            id="cta-heading"
            className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4"
          >
            Let&apos;s work together
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
            Whether you have a project idea, want to collaborate, or just want to say
            hi — my inbox is always open.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            style={{
              backgroundImage:
                'linear-gradient(135deg, var(--gradient-from), var(--gradient-to))',
            }}
          >
            Get in touch
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}
