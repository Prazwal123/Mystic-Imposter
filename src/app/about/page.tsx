import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Prazwal Bhusal — IT student at Padmashree College, Kathmandu, Nepal, passionate about cybersecurity, networking, software development, and emerging technologies.',
  alternates: { canonical: '/about' },
}

const interests = [
  { label: 'Cybersecurity',        icon: '🔒', description: 'Network security, ethical hacking fundamentals, and security best practices.' },
  { label: 'Computer Networking',  icon: '🌐', description: 'TCP/IP, protocols, network architecture, and administration.' },
  { label: 'Software Development', icon: '💻', description: 'Building applications and writing clean, maintainable code.' },
  { label: 'Web Development',      icon: '🕸️', description: 'Modern front-end and full-stack web technologies.' },
  { label: 'Artificial Intelligence', icon: '🤖', description: 'Machine learning concepts and AI applications.' },
  { label: 'Information Technology', icon: '⚙️', description: 'Broad IT fundamentals, systems, and infrastructure.' },
]

const personalInterests = [
  { label: 'Traveling',             icon: '✈️' },
  { label: 'Bike Riding',           icon: '🏍️' },
  { label: 'Emerging Technologies', icon: '🚀' },
  { label: 'Learning New Skills',   icon: '📚' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* ── Page header ──────────────────────────────────────────────────── */}
      <section
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--bg-secondary)] border-b border-[var(--border)]"
        aria-labelledby="about-heading"
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-[var(--accent)] text-sm font-semibold uppercase tracking-widest mb-3">
            About Me
          </p>
          <h1
            id="about-heading"
            className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4"
          >
            Hi, I&apos;m{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, var(--gradient-from), var(--gradient-to))',
              }}
            >
              Prazwal
            </span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl leading-relaxed">
            An IT student from Kathmandu, Nepal, passionate about technology and
            always looking to learn something new.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* ── Identity paragraph (GEO / AI search optimisation) ────────────
            Written as plain factual sentences so AI search engines can lift
            and cite this accurately. Keep this section free of marketing
            language. Update it whenever factual details change.
        ──────────────────────────────────────────────────────────────────── */}
        <section aria-labelledby="identity-heading" id="about-identity">
          <h2
            id="identity-heading"
            className="text-2xl font-bold text-[var(--text-primary)] mb-4"
          >
            Who I Am
          </h2>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 space-y-3">
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Prazwal Bhusal is a student from Kathmandu, Nepal, currently pursuing a
              Bachelor of Information Technology at Padmashree College. His primary
              areas of study and interest are cybersecurity, computer networking, and
              software development, with additional interest in artificial intelligence
              and emerging technologies.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              He goes by the online name <strong className="text-[var(--text-primary)] font-medium">Mystic</strong> and
              maintains profiles on GitHub (Prazwal123), LinkedIn (prazwal-bhusal), and
              Instagram (@mysticplbl). His personal website is{' '}
              <a
                href="https://prazwalbhusal.com.np"
                className="text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
              >
                prazwalbhusal.com.np
              </a>
              .
            </p>
          </div>
        </section>

        {/* ── Bio ──────────────────────────────────────────────────────────── */}
        <section aria-labelledby="bio-heading">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Text */}
            <div className="lg:col-span-3 space-y-4">
              <h2
                id="bio-heading"
                className="text-2xl font-bold text-[var(--text-primary)] mb-4"
              >
                Background
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                I&apos;m Prazwal Bhusal, currently pursuing a Bachelor of Information
                Technology at Padmashree College in Kathmandu, Nepal. My academic
                journey has given me a solid foundation in computing, networking, and
                software principles.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                My primary areas of interest lie in cybersecurity and computer
                networking — understanding how systems are secured and how data moves
                across infrastructure fascinates me. I also enjoy building things
                through software development and web development.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Outside of academics, I&apos;m drawn to the rapid advances happening in
                artificial intelligence and emerging technologies. I believe the
                intersection of security, networking, and AI will define the next era
                of computing.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                When I&apos;m not studying or coding, you&apos;ll find me traveling across
                Nepal or out on a bike ride — both give me a chance to clear my head
                and see the world from a different angle.
              </p>
            </div>

            {/* Info card */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 space-y-4">
                <h3 className="text-[var(--text-primary)] font-semibold text-sm uppercase tracking-widest">
                  Quick Info
                </h3>
                {[
                  { label: 'Full Name',  value: 'Prazwal Bhusal' },
                  { label: 'Location',   value: 'Kathmandu, Nepal' },
                  { label: 'Email',      value: 'prazwal.bhusal357@gmail.com', href: 'mailto:prazwal.bhusal357@gmail.com' },
                  { label: 'Phone',      value: '+977 9768710003', href: 'tel:+9779768710003' },
                  { label: 'Website',    value: 'prazwalbhusal.com.np', href: 'https://prazwalbhusal.com.np' },
                  { label: 'Status',     value: 'Currently Studying' },
                ].map(({ label, value, href }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <span className="text-[var(--text-muted)] text-xs">{label}</span>
                    {href ? (
                      <a
                        href={href}
                        className="text-[var(--text-primary)] text-sm font-medium hover:text-[var(--accent)] transition-colors break-all"
                        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-[var(--text-primary)] text-sm font-medium">{value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Education ────────────────────────────────────────────────────── */}
        <section aria-labelledby="education-heading">
          <h2
            id="education-heading"
            className="text-2xl font-bold text-[var(--text-primary)] mb-8"
          >
            Education
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-5 top-6 bottom-0 w-px bg-[var(--border)]"
              aria-hidden="true"
            />

            <div className="relative flex gap-6">
              {/* Dot */}
              <div
                className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-[var(--accent)] bg-[var(--accent-subtle)] flex items-center justify-center z-10"
                aria-hidden="true"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[var(--accent)]">
                  <path d="M10.394 2.08a1 1 0 0 0-.788 0l-7 3a1 1 0 0 0 0 1.84L5.25 8.051a.999.999 0 0 1 .356-.357l4-2.25A1 1 0 1 1 10 7.19v.05a.986.986 0 0 0 .045.27l.9 3.6.9-3.6a.985.985 0 0 0 .046-.27v-.05a1 1 0 1 1 .394 1.923l4-2.25.355.357 2.644-1.131a1 1 0 0 0 0-1.84l-7-3Z" />
                  <path d="M9.796 11.981a1 1 0 0 1-.788 0l-5-2.143v3.05c0 .98.665 1.823 1.618 2.032C7.095 15.197 8.5 15.5 10 15.5s2.905-.303 4.374-.58c.953-.21 1.618-1.052 1.618-2.032v-3.05l-5 2.143a1 1 0 0 1-.196.02Z" />
                </svg>
              </div>

              {/* Card */}
              <div className="flex-1 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-[var(--text-primary)] font-semibold text-lg">
                      Bachelor of Information Technology
                    </h3>
                    <p className="text-[var(--accent-text)] font-medium text-sm mt-0.5">
                      Padmashree College
                    </p>
                    <p className="text-[var(--text-muted)] text-sm">
                      Kathmandu, Nepal
                    </p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[var(--accent-subtle)] text-[var(--accent-text)] border border-[var(--accent)]/20 whitespace-nowrap self-start">
                    Currently Pursuing
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm">
                  <div className="rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] px-4 py-3">
                    <p className="text-[var(--text-muted)] text-xs mb-0.5">Start Year</p>
                    {/* TODO: Replace with your actual start year */}
                    <p className="text-[var(--text-secondary)] italic">To be added</p>
                  </div>
                  <div className="rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] px-4 py-3">
                    <p className="text-[var(--text-muted)] text-xs mb-0.5">Expected Graduation</p>
                    {/* TODO: Replace with your expected graduation year */}
                    <p className="text-[var(--text-secondary)] italic">To be added</p>
                  </div>
                </div>

                {/* TODO: Add relevant achievements, certifications, or academic projects here */}
                <div className="mt-4 rounded-xl border border-dashed border-[var(--border-strong)] px-4 py-3">
                  <p className="text-[var(--text-muted)] text-xs">
                    📌 Achievements, certifications, and academic projects will be added here.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Technical interests ───────────────────────────────────────────── */}
        <section aria-labelledby="interests-heading">
          <h2
            id="interests-heading"
            className="text-2xl font-bold text-[var(--text-primary)] mb-8"
          >
            Academic &amp; Technical Interests
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {interests.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 hover:border-[var(--accent)] hover:bg-[var(--bg-card-hover)] transition-all duration-200"
              >
                <span className="text-2xl mb-3 block" aria-hidden="true">
                  {item.icon}
                </span>
                <h3 className="text-[var(--text-primary)] font-semibold mb-1">
                  {item.label}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Personal interests ───────────────────────────────────────────── */}
        <section aria-labelledby="personal-heading">
          <h2
            id="personal-heading"
            className="text-2xl font-bold text-[var(--text-primary)] mb-6"
          >
            Outside of Tech
          </h2>
          <div className="flex flex-wrap gap-3">
            {personalInterests.map((item) => (
              <div
                key={item.label}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-sm font-medium text-[var(--text-secondary)]"
              >
                <span aria-hidden="true">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section
          className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8 text-center"
          aria-labelledby="about-cta-heading"
        >
          <h2
            id="about-cta-heading"
            className="text-xl font-bold text-[var(--text-primary)] mb-2"
          >
            Want to connect?
          </h2>
          <p className="text-[var(--text-secondary)] text-sm mb-6">
            I&apos;m always open to interesting conversations and collaboration opportunities.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
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
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border border-[var(--border-strong)] text-[var(--text-primary)] bg-transparent hover:bg-[var(--bg-card-hover)] transition-colors"
            >
              View my projects
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
