import { MetadataRoute } from 'next';
import { getArticles } from '@/app/actions/articles';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = 'https://koinshop.id';

  // Static routes
  const staticRoutes = [
    '',
    '/store',
    '/produk',
    '/artikel',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic articles
  const articles = await getArticles('published');
  const articleRoutes = articles.map((article: any) => ({
    url: `${siteUrl}/artikel/${article.slug}`,
    lastModified: new Date(article.updated_at || article.published_at || article.created_at || new Date()).toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // We could also add products if we have a fetcher for products.
  // For now we just return static and articles.

  return [...staticRoutes, ...articleRoutes];
}
