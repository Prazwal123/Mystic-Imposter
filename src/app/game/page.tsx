'use client'

import dynamic from 'next/dynamic'

// Dynamic import with SSR disabled — the game uses browser APIs
// (localStorage, canvas, Audio, window) that cannot run on the server.
const GameApp = dynamic(() => import('@/game/GameApp'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#1A0B2E] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-[#00F0FF]/30 border-t-[#00F0FF] animate-spin" />
        <p className="text-[#A89BC2] text-sm">Loading Mystic Imposter…</p>
      </div>
    </div>
  ),
})

export default function GamePage() {
  return <GameApp />
}
