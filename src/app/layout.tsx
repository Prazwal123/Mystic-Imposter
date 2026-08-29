import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MainWrapper from '@/components/MainWrapper'
import FooterWrapper from '@/components/FooterWrapper'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Prazwal Bhusal | IT Student & Technology Enthusiast',
    template: '%s | Prazwal Bhusal',
  },
  description:
    'Personal portfolio of Prazwal Bhusal, an IT student from Kathmandu, Nepal interested in cybersecurity, networking, software development, AI, and technology.',
  metadataBase: new URL('https://prazwalbhusal.com.np'),
  alternates: {
    canonical: '/',
  },
  keywords: [
    'Prazwal Bhusal',
    'IT Student',
    'Cybersecurity',
    'Networking',
    'Software Development',
    'Web Development',
    'Artificial Intelligence',
    'Kathmandu',
    'Nepal',
    'Portfolio',
    'Padmashree College',
  ],
  authors: [{ name: 'Prazwal Bhusal', url: 'https://prazwalbhusal.com.np' }],
  creator: 'Prazwal Bhusal',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://prazwalbhusal.com.np',
    siteName: 'Prazwal Bhusal',
    title: 'Prazwal Bhusal | IT Student & Technology Enthusiast',
    description:
      'Personal portfolio of Prazwal Bhusal, an IT student from Kathmandu, Nepal interested in cybersecurity, networking, software development, AI, and technology.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prazwal Bhusal | IT Student & Technology Enthusiast',
    description:
      'Personal portfolio of Prazwal Bhusal, an IT student from Kathmandu, Nepal.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        {/* Inline script: reads localStorage and sets data-theme before first paint.
            suppressHydrationWarning on <html> tells React to accept the DOM value. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased">
        <Navbar />
        {/* pt-16 offsets the fixed navbar height for non-game pages.
            The /game route has its own layout that manages spacing. */}
        <MainWrapper>
          {children}
        </MainWrapper>
        <FooterWrapper />
      </body>
    </html>
  )
}
