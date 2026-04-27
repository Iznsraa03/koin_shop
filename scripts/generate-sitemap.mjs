// scripts/generate-sitemap.mjs
// Run: node scripts/generate-sitemap.mjs
// Auto-runs after `npm run build` via postbuild script

import { writeFileSync } from 'fs'

const BASE_URL = 'https://koinshop.id'

const products = [
  { slug: 'mobile-legends' },
  { slug: 'free-fire' },
  { slug: 'pubg-mobile' },
]

function urlEntry(url, priority = 0.8, changefreq = 'weekly') {
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

const staticPages = [
  urlEntry(BASE_URL, 1.0, 'daily'),
  urlEntry(`${BASE_URL}/produk`, 0.9, 'daily'),
  urlEntry(`${BASE_URL}/artikel/top-up-royal-dream-termurah`, 0.8, 'weekly'),
]

const productPages = products.map((p) =>
  urlEntry(`${BASE_URL}/produk/${p.slug}`, 0.8, 'weekly')
)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticPages, ...productPages].join('\n')}
</urlset>`

writeFileSync('out/sitemap.xml', sitemap)
console.log('✅ sitemap.xml generated at out/sitemap.xml')
