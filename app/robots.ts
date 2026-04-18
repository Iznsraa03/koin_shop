import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Cegah crawler Google mengindex link email-protection dari Cloudflare (menghindari error 404)
      disallow: ['/cdn-cgi/'],
    },
    // sitemap: 'https://koinshop.id/sitemap.xml',
    sitemap: 'https://koinshop.id/sitemap.xml',
  }
}
