import type { Metadata } from 'next'
import projects from '@/data/projects'
import ProjectCard from '@/components/ProjectCard'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Projects by Prazwal Bhusal — web development, cybersecurity, networking, and software development work.',
  alternates: { canonical: '/projects' },
}

export default function ProjectsPage() {
  const categories = [...new Set(projects.map((p) => p.category))]

  return (
    <div className="min-h-screen">
      {/* ── Page header ──────────────────────────────────────────────────── */}
      <section
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--bg-secondary)] border-b border-[var(--border)]"
        aria-labelledby="projects-heading"
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-[var(--accent)] text-sm font-semibold uppercase tracking-widest mb-3">
            Projects
          </p>
          <h1
            id="projects-heading"
            className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4"
          >
            My{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, var(--gradient-from), var(--gradient-to))',
              }}
            >
              Work
            </span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl leading-relaxed">
            A collection of projects I&apos;ve built or am currently working on.
            Each project has its own dedicated page with full details.
          </p>

          {/* Category pills */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6" aria-label="Project categories">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-secondary)]"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-[var(--text-muted)] text-lg mb-2">No projects yet.</p>
            <p className="text-[var(--text-muted)] text-sm">
              Projects will appear here once added to{' '}
              <code className="text-[var(--accent)] font-mono text-xs">src/data/projects.ts</code>.
            </p>
          </div>
        )}

        {/* How to add projects note */}
        <aside
          className="mt-12 rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--bg-card)] p-6"
          aria-label="Developer note"
        >
          <p className="text-[var(--text-muted)] text-xs font-mono">
            💡 To add a new project: update{' '}
            <span className="text-[var(--accent)]">src/data/projects.ts</span> and
            create a folder at{' '}
            <span className="text-[var(--accent)]">src/app/projects/[slug]/page.tsx</span>.
            No other files need to be changed.
          </p>
        </aside>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-[var(--text-secondary)] text-sm mb-4">
            Interested in working together?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            style={{
              backgroundImage:
                'linear-gradient(135deg, var(--gradient-from), var(--gradient-to))',
            }}
          >
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  )
}
