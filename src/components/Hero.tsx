import Link from 'next/link'

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
      aria-label="Hero section"
    >
      {/* Background gradient blobs */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[var(--accent)] opacity-[0.07] blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-[var(--gradient-to)] opacity-[0.07] blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(var(--border-strong) 1px, transparent 1px), linear-gradient(90deg, var(--border-strong) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--accent)] bg-[var(--accent-subtle)] text-[var(--accent-text)] text-xs font-medium mb-8 animate-fade-in"
          aria-label="Status: Available for opportunities"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" aria-hidden="true" />
          Available for opportunities
        </div>

        {/* Name */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--text-primary)] tracking-tight mb-4 animate-fade-in-up">
          Prazwal{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, var(--gradient-from), var(--gradient-to))',
            }}
          >
            Bhusal
          </span>
        </h1>

        {/* Role */}
        <p className="text-lg sm:text-xl md:text-2xl text-[var(--text-secondary)] font-medium mb-6 animate-fade-in-up animation-delay-100">
          IT Student &nbsp;&bull;&nbsp; Technology Enthusiast
        </p>

        {/* Bio */}
        <p className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-in-up animation-delay-200">
          I&apos;m an IT student from{' '}
          <span className="text-[var(--text-primary)] font-medium">Kathmandu, Nepal</span>,
          interested in cybersecurity, networking, software development, and emerging
          technologies. Currently pursuing my Bachelor of Information Technology at{' '}
          <span className="text-[var(--text-primary)] font-medium">Padmashree College</span>.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-300">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
            style={{
              backgroundImage: 'linear-gradient(135deg, var(--gradient-from), var(--gradient-to))',
            }}
          >
            View My Projects
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
            </svg>
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border border-[var(--border-strong)] text-[var(--text-primary)] bg-[var(--bg-card)] transition-all duration-200 hover:bg-[var(--bg-card-hover)] hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
          >
            Contact Me
          </Link>

          {/* CV / Resume — TODO: Replace href with the real path once you have a CV file */}
          <a
            href="#"
            aria-label="Download CV (placeholder — link not active yet)"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
              <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
            </svg>
            Download CV
          </a>
        </div>

        {/* Scroll hint */}
        <div
          className="mt-20 flex flex-col items-center gap-2 text-[var(--text-muted)] text-xs animate-fade-in animation-delay-500"
          aria-hidden="true"
        >
          <span>Scroll to explore</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 animate-bounce"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}
