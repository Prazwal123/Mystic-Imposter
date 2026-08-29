import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mystic Imposter | Prazwal Bhusal',
  description:
    'Mystic Imposter — a Nepal-themed social deduction word game featuring 500+ culturally grounded word entries with Nepanglish-style hints, multiple game modes, and an admin panel.',
}

export default function GameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Slim back-to-portfolio bar above the game */}
      <div className="fixed top-0 left-0 right-0 z-[9999] flex items-center justify-between px-4 py-2 bg-[#1A0B2E]/95 backdrop-blur-sm border-b border-[#2D1B69]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-[#A89BC2] hover:text-[#00F0FF] transition-colors"
          aria-label="Back to Prazwal Bhusal portfolio"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-3.5 h-3.5"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M14 8a.75.75 0 0 1-.75.75H4.56l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 1.06L4.56 7.25h8.69A.75.75 0 0 1 14 8Z"
              clipRule="evenodd"
            />
          </svg>
          Back to Portfolio
        </Link>
        <span className="text-xs text-[#A89BC2]/50">prazwalbhusal.com.np</span>
      </div>

      {/* Push content below the fixed bar (40px bar height) */}
      <div className="pt-10 min-h-screen bg-[#1A0B2E]">
        {children}
      </div>
    </>
  )
}
