import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProjectBySlug, getAllProjectSlugs } from '@/data/projects'

// Pre-generate all project routes at build time
export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata(
  props: PageProps<'/projects/[slug]'>
): Promise<Metadata> {
  const { slug } = await props.params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.shortDescription,
    alternates: { canonical: `/projects/${slug}` },
  }
}

export default async function ProjectDetailPage(
  props: PageProps<'/projects/[slug]'>
) {
  const { slug } = await props.params
  const project = getProjectBySlug(slug)

  if (!project) notFound()

  return (
    <div className="min-h-screen">
      {/* ── Breadcrumb + header ─────────────────────────────────────────── */}
      <section
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--bg-secondary)] border-b border-[var(--border)]"
        aria-label="Project header"
      >
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-[var(--text-muted)]" role="list">
              <li>
                <Link href="/" className="hover:text-[var(--accent)] transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/projects" className="hover:text-[var(--accent)] transition-colors">
                  Projects
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[var(--text-primary)] font-medium truncate max-w-48" aria-current="page">
                {project.title}
              </li>
            </ol>
          </nav>

          {/* Category + status */}
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border border-[var(--accent)]/20 bg-[var(--accent-subtle)] text-[var(--accent-text)]">
              {project.category}
            </span>
            <span className={`text-xs font-medium ${project.status === 'Completed' ? 'text-green-400' : project.status === 'In Progress' ? 'text-yellow-400' : 'text-[var(--text-muted)]'}`}>
              {project.status}
            </span>
            {project.date && (
              <span className="text-[var(--text-muted)] text-xs">{project.date}</span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-4">
            {project.title}
          </h1>

          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
            {project.shortDescription}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-6" aria-label="Technologies used">
            {project.tech.map((t) => (
              <span
                key={t.name}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)]"
              >
                {t.name}
              </span>
            ))}
          </div>

          {/* External links */}
          <div className="flex flex-wrap gap-3">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-[var(--border-strong)] text-[var(--text-secondary)] bg-[var(--bg-card)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                View on GitHub
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-dashed border-[var(--border)] text-[var(--text-muted)] cursor-default">
                {/* TODO: Add GitHub URL to src/data/projects.ts when available */}
                GitHub — coming soon
              </span>
            )}

            {project.internalRoute && (
              <Link
                href={project.internalRoute}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, var(--gradient-from), var(--gradient-to))',
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.84Z" />
                </svg>
                {project.internalRouteLabel ?? 'Open'}
              </Link>
            )}

            {project.liveUrl && !project.internalRoute && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, var(--gradient-from), var(--gradient-to))',
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z" />
                  <path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z" />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── Project details ──────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">

        {/* Overview */}
        <section aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="text-xl font-bold text-[var(--text-primary)] mb-4">
            Overview
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            {project.description}
          </p>
        </section>

        {/* Screenshots placeholder */}
        <section aria-labelledby="screenshots-heading">
          <h2 id="screenshots-heading" className="text-xl font-bold text-[var(--text-primary)] mb-4">
            Screenshots
          </h2>
          <div className="rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--bg-card)] p-10 text-center">
            <p className="text-[var(--text-muted)] text-sm">
              {/* TODO: Add project screenshots to /public/images/projects/ and reference them here */}
              📸 Screenshots will be added here. Place images in{' '}
              <code className="text-[var(--accent)] font-mono text-xs">
                public/images/projects/{slug}/
              </code>
            </p>
          </div>
        </section>

        {/* Problem statement, features, process, challenges, solutions, future improvements
            — all clearly marked as placeholders to fill in per-project */}
        {[
          { id: 'problem',      title: 'Problem Statement',    placeholder: 'Describe what problem this project solves.' },
          { id: 'features',     title: 'Key Features',         placeholder: 'List the main features of this project.' },
          { id: 'process',      title: 'Development Process',  placeholder: 'Describe how you built this project.' },
          { id: 'challenges',   title: 'Challenges',           placeholder: 'Describe the main challenges you faced.' },
          { id: 'solutions',    title: 'Solutions',            placeholder: 'Describe how you overcame those challenges.' },
          { id: 'future',       title: 'Future Improvements',  placeholder: 'List ideas for future enhancements.' },
        ].map(({ id, title, placeholder }) => (
          <section key={id} aria-labelledby={`${id}-heading`}>
            <h2 id={`${id}-heading`} className="text-xl font-bold text-[var(--text-primary)] mb-4">
              {title}
            </h2>
            <div className="rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--bg-card)] p-6">
              <p className="text-[var(--text-muted)] text-sm italic">
                {/* TODO: Fill in this section in src/data/projects.ts or directly in this page */}
                📌 {placeholder}
              </p>
            </div>
          </section>
        ))}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path fillRule="evenodd" d="M14 8a.75.75 0 0 1-.75.75H4.56l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 1.06L4.56 7.25h8.69A.75.75 0 0 1 14 8Z" clipRule="evenodd" />
            </svg>
            All projects
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
          >
            Collaborate on something similar
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
