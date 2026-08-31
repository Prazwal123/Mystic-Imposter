import type { MetadataRoute } from 'next'

const BASE_URL = 'https://prazwalbhusal.com.np'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Disallow build artifacts and private paths that should never be indexed
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
