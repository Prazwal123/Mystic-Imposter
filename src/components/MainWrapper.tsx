'use client'

import { usePathname } from 'next/navigation'

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isGame = pathname.startsWith('/game')

  return (
    <main
      id="main-content"
      className={`flex-1${isGame ? '' : ' pt-16'}`}
    >
      {children}
    </main>
  )
}
