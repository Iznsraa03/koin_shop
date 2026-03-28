import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Jika nanti ada halaman admin atau private, bisa dimasukkan di sini
      // disallow: ['/admin/', '/private/'],
    },
    // sitemap: 'https://koinshop.id/sitemap.xml',
    sitemap: 'https://koinshop.id/sitemap.xml',
  }
}
