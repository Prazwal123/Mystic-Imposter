import type { Metadata } from 'next'
import Link from 'next/link'
import { getProjectBySlug } from '@/data/projects'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Mystic Imposter',
  description:
    'A Nepal-themed social deduction word game featuring 500+ culturally grounded word entries with Nepanglish-style hints, multiple game modes, and an admin panel.',
  alternates: { canonical: '/projects/mystic-imposter' },
}

export default function MysticImposterPage() {
  const project = getProjectBySlug('mystic-imposter')
  if (!project) notFound()

  const features = [
    {
      title: '500+ Word Entries',
      description:
        'Over 500 culturally grounded words with Nepanglish-style hints that make the game feel authentic and fun for Nepali players.',
      icon: '📖',
    },
    {
      title: 'Multiple Game Modes',
      description:
        'Classic, Double Trouble, Blind Imposter, Spy Infiltration, and Chaos Mode — each with different rules to keep every game fresh.',
      icon: '🎮',
    },
    {
      title: 'Online Multiplayer',
      description:
        'Real-time online rooms powered by Socket.IO. Create or join a room with a code and play with friends remotely.',
      icon: '🌐',
    },
    {
      title: 'Statistics & History',
      description:
        'Tracks wins, losses, streaks, and full game history per player using browser localStorage.',
      icon: '📊',
    },
    {
      title: 'Custom Word Packs',
      description:
        'Create and manage your own word packs to personalize the game for your group.',
      icon: '📦',
    },
    {
      title: 'Admin Panel',
      description:
        'Password-protected admin panel for managing word entries, categories, and game data.',
      icon: '🛡️',
    },
  ]

  const gameModes = [
    { name: 'Classic', description: 'One Imposter. Standard rules. The foundation of the game.' },
    { name: 'Double Trouble', description: 'Two Imposters. Neither knows the other.' },
    { name: 'The Trio', description: 'Up to three Imposters, none aware of each other.' },
    { name: 'Blind Imposter', description: 'Imposter receives no hint at all — pure bluffing.' },
    { name: 'Spy Infiltration', description: 'One Citizen gets a misleading fake word.' },
    { name: 'Chaos Mode', description: 'A random rule modifier each game adds unpredictability.' },
  ]

  return (
    <div className="min-h-screen">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <section
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--bg-secondary)] border-b border-[var(--border)]"
        aria-label="Project header"
      >
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-[var(--text-muted)]" role="list">
              <li><Link href="/" className="hover:text-[var(--accent)] transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/projects" className="hover:text-[var(--accent)] transition-colors">Projects</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-[var(--text-primary)] font-medium" aria-current="page">Mystic Imposter</li>
            </ol>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border border-blue-500/20 bg-blue-500/10 text-blue-400">
              Web Development
            </span>
            <span className="text-xs font-medium text-green-400">Completed</span>
            <span className="text-[var(--text-muted)] text-xs">2024</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Mystic Imposter
          </h1>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
            A Nepal-themed social deduction word game featuring 500+ culturally grounded word
            entries with Nepanglish-style hints, multiple game modes, real-time online
            multiplayer, and an admin panel.
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

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/game"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              style={{
                backgroundImage: 'linear-gradient(135deg, var(--gradient-from), var(--gradient-to))',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.84Z" />
              </svg>
              Play Game
            </Link>
            <span className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border border-dashed border-[var(--border)] text-[var(--text-muted)] cursor-default">
              {/* TODO: Add GitHub URL when repository is public */}
              GitHub — coming soon
            </span>
          </div>
        </div>
      </section>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-14">

        {/* Overview */}
        <section aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="text-xl font-bold text-[var(--text-primary)] mb-4">
            Overview
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
            Mystic Imposter is a pass-the-device social deduction party game inspired by the
            classic word game format, but designed specifically for Nepali culture. Players sit
            in a group and take turns receiving a secret word with culturally grounded,
            Nepanglish-style hints. One player — the Imposter — receives only a vague hint
            and must blend in with the group without knowing the real word.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            After a discussion phase, players vote on who they think is the Imposter. If the
            Imposter is caught, they get one last chance to guess the secret word. The game
            supports local pass-and-play mode as well as real-time online multiplayer via
            Socket.IO rooms.
          </p>
        </section>

        {/* Features */}
        <section aria-labelledby="features-heading">
          <h2 id="features-heading" className="text-xl font-bold text-[var(--text-primary)] mb-6">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5"
              >
                <span className="text-2xl mb-3 block" aria-hidden="true">{f.icon}</span>
                <h3 className="text-[var(--text-primary)] font-semibold text-sm mb-1.5">
                  {f.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Game modes */}
        <section aria-labelledby="modes-heading">
          <h2 id="modes-heading" className="text-xl font-bold text-[var(--text-primary)] mb-6">
            Game Modes
          </h2>
          <div className="space-y-3">
            {gameModes.map((mode) => (
              <div
                key={mode.name}
                className="flex items-start gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4"
              >
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--accent-subtle)] flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="text-[var(--accent)] text-xs font-bold">
                    {mode.name[0]}
                  </span>
                </div>
                <div>
                  <p className="text-[var(--text-primary)] font-semibold text-sm">{mode.name}</p>
                  <p className="text-[var(--text-secondary)] text-sm mt-0.5">{mode.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech details */}
        <section aria-labelledby="tech-heading">
          <h2 id="tech-heading" className="text-xl font-bold text-[var(--text-primary)] mb-4">
            Technical Details
          </h2>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 space-y-4">
            {[
              {
                label: 'Frontend',
                value: 'Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion',
              },
              {
                label: 'Real-time',
                value: 'Socket.IO for online multiplayer rooms',
              },
              {
                label: 'Data Storage',
                value: 'Browser localStorage for game statistics, settings, and custom packs',
              },
              {
                label: 'Word Data',
                value: '500+ TypeScript-defined word entries with Nepanglish-style cultural hints',
              },
              {
                label: 'Deployment',
                value: 'Integrated into the portfolio at prazwalbhusal.com.np/game',
              },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col sm:flex-row sm:gap-4">
                <span className="text-[var(--text-muted)] text-xs uppercase tracking-widest w-28 flex-shrink-0 mt-0.5">
                  {label}
                </span>
                <span className="text-[var(--text-secondary)] text-sm">{value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Screenshots placeholder */}
        <section aria-labelledby="screenshots-heading">
          <h2 id="screenshots-heading" className="text-xl font-bold text-[var(--text-primary)] mb-4">
            Screenshots
          </h2>
          <div className="rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--bg-card)] p-10 text-center">
            <p className="text-[var(--text-muted)] text-sm">
              {/* TODO: Add project screenshots to /public/images/projects/mystic-imposter/ */}
              📸 Screenshots will be added here.
            </p>
          </div>
        </section>

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
            href="/game"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.84Z" />
            </svg>
            Play now
          </Link>
        </div>
      </div>
    </div>
  )
}
