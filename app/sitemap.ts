import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://koinshop.id',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Jika nanti ada halaman dinamis (seperti halaman detail game), bisa ditambah di bawah
    // {
    //   url: 'https://koinshop.com/game/royal-dream',
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.8,
    // },
  ]
}
