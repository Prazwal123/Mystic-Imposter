import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p
        className="text-8xl font-bold bg-clip-text text-transparent mb-4 select-none"
        style={{
          backgroundImage:
            'linear-gradient(135deg, var(--gradient-from), var(--gradient-to))',
        }}
        aria-hidden="true"
      >
        404
      </p>
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
        Page Not Found
      </h1>
      <p className="text-[var(--text-secondary)] text-sm max-w-sm mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        style={{
          backgroundImage:
            'linear-gradient(135deg, var(--gradient-from), var(--gradient-to))',
        }}
      >
        Back to Home
      </Link>
    </div>
  )
}
