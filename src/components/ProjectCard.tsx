import Link from 'next/link'
import type { Project } from '@/data/projects'

interface Props {
  project: Project
}

const categoryColors: Record<Project['category'], string> = {
  'Web Development': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Cybersecurity':   'bg-red-500/10  text-red-400  border-red-500/20',
  'Networking':      'bg-green-500/10 text-green-400 border-green-500/20',
  'AI/ML':           'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Software':        'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'Other':           'bg-gray-500/10  text-gray-400  border-gray-500/20',
}

const statusColors: Record<Project['status'], string> = {
  'Completed':   'text-green-400',
  'In Progress': 'text-yellow-400',
  'Planned':     'text-[var(--text-muted)]',
}

export default function ProjectCard({ project }: Props) {
  return (
    <article className="group relative flex flex-col h-full rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--bg-card-hover)] hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--accent)]/5">

      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${categoryColors[project.category]}`}
        >
          {project.category}
        </span>
        <span className={`text-xs font-medium ${statusColors[project.status]}`}>
          {project.status}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-[var(--text-primary)] font-semibold text-lg leading-snug mb-2 group-hover:text-[var(--accent)] transition-colors">
        {project.title}
      </h3>

      {/* Short description */}
      <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4 flex-1">
        {project.shortDescription}
      </p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2 mb-5" aria-label="Technologies used">
        {project.tech.map((t) => (
          <span
            key={t.name}
            className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-[var(--accent-subtle)] text-[var(--accent-text)] border border-[var(--accent)]/20"
          >
            {t.name}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 flex-wrap mt-auto">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          style={{
            backgroundImage: 'linear-gradient(135deg, var(--gradient-from), var(--gradient-to))',
          }}
        >
          View Details
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
            <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
          </svg>
        </Link>

        {/* Internal route button (e.g. Play Game for Mystic Imposter) */}
        {project.internalRoute && (
          <Link
            href={project.internalRoute}
            aria-label={`${project.internalRouteLabel ?? 'Open'} ${project.title}`}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-[var(--accent)]/40 text-[var(--accent)] hover:bg-[var(--accent-subtle)] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
              <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.84Z" />
            </svg>
            {project.internalRouteLabel ?? 'Open'}
          </Link>
        )}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} on GitHub`}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-[var(--border-strong)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)] transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
        )}

        {project.liveUrl && !project.internalRoute && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View live demo of ${project.title}`}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-[var(--border-strong)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
              <path d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z" />
              <path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z" />
            </svg>
            Live Demo
          </a>
        )}
      </div>
    </article>
  )
}
