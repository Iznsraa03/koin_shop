import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PillNav from '@/components/PillNav';
import ContactFooter from '@/components/sections/ContactFooter';
import { getArticleBySlug } from '@/app/actions/articles';

// Ponytail: Simple Server Component fetching data and rendering natively. No extra state needed.

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  const siteUrl = 'https://koinshop.id';
  
  return {
    title: article.seo_title || article.title,
    description: article.meta_description || article.excerpt,
    alternates: {
      canonical: article.canonical_url || `${siteUrl}/artikel/${article.slug}`,
    },
    robots: {
      index: article.is_indexed,
      follow: article.is_indexed,
    },
    openGraph: {
      title: article.seo_title || article.title,
      description: article.meta_description || article.excerpt,
      url: `${siteUrl}/artikel/${article.slug}`,
      siteName: 'Koin Shop',
      locale: 'id_ID',
      type: 'article',
      images: article.featured_image ? [
        {
          url: article.featured_image,
          width: 1200,
          height: 630,
          alt: article.alt_image || article.title,
        },
      ] : [],
    },
  };
}

export default async function DynamicArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  
  if (!article || article.status !== 'published') {
    notFound();
  }

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/#features" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ] as const;

  // Build JSON-LD Schema
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': article.schema_type || 'Article',
    headline: article.seo_title || article.title,
    image: article.featured_image ? [article.featured_image] : [],
    datePublished: new Date(article.published_at).toISOString(),
    dateModified: new Date(article.updated_at).toISOString(),
    author: [{
        '@type': 'Person',
        name: article.author_name || 'Admin',
        url: 'https://koinshop.id'
    }]
  };

  const faqSchema = article.faqs && article.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map((faq: any) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  } : null;

  return (
    <main className="min-h-screen bg-[#0f172b] text-white">
      {/* Inject Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <PillNav
        logo="/logo.png"
        logoAlt="Koin Shop logo"
        items={navItems as any}
        activeHref=""
        progressByHref={{}}
        className=""
        ease="power2.easeOut"
        baseColor="#0f172b"
        pillColor="#F6C90E"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#0f172b"
        initialLoadAnimation={false}
      />

      <article className="mx-auto max-w-4xl px-6 pt-32 pb-20">
        
        {/* Header */}
        <header className="mb-10 text-center">
          {article.category && (
            <span className="inline-block px-3 py-1 bg-white/10 text-[#F6C90E] rounded-full text-sm font-semibold mb-4 border border-white/20">
              {article.category}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-[#F6C90E] mb-6 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-white/60 text-sm">
            <span>Oleh: {article.author_name}</span>
            <span>•</span>
            <time dateTime={article.published_at}>{new Date(article.published_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
          </div>
        </header>

        {article.featured_image && (
          <div className="mb-12 rounded-2xl overflow-hidden border border-white/10">
            <img src={article.featured_image} alt={article.alt_image || article.title} className="w-full object-cover" />
          </div>
        )}

        {/* AI Key Takeaways (GEO / AEO Box) */}
        {(article.main_question || (article.key_takeaways && article.key_takeaways.length > 0)) && (
          <div className="bg-white/5 border-l-4 border-[#F6C90E] p-6 rounded-r-xl mb-10">
            {article.main_question && <h3 className="text-xl font-bold mb-2">{article.main_question}</h3>}
            {article.direct_answer && <p className="text-white/80 mb-4">{article.direct_answer}</p>}
            {article.key_takeaways && article.key_takeaways.length > 0 && (
              <>
                <h4 className="font-semibold text-[#F6C90E] mb-2">Key Takeaways:</h4>
                <ul className="list-disc pl-5 text-white/80 space-y-1">
                  {article.key_takeaways.map((point: string, i: number) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        {/* Main Content */}
        {/* Using standard prose tailwind classes matching existing styles */}
        <div 
          className="prose prose-invert prose-blue max-w-none prose-headings:text-[#F6C90E] prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6 prose-p:text-white/80 prose-p:leading-relaxed prose-p:mb-6 prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-ul:list-disc prose-ul:pl-6 prose-li:text-white/80 prose-li:mb-2 border-b border-white/10 pb-10"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* FAQ Section */}
        {article.faqs && article.faqs.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-[#F6C90E] mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {article.faqs.map((faq: any, i: number) => (
                <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-xl">
                  <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                  <p className="text-white/70">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Source References */}
        {article.source_url && (
          <div className="mt-8 text-sm text-white/50">
            Sumber: <a href={article.source_url} target="_blank" rel="nofollow noreferrer" className="hover:text-white transition">{article.source_name || article.source_url}</a>
          </div>
        )}

        {/* CTA Section */}
        {(article.cta_url || article.related_product_id) && (
          <div className="mt-12 text-center p-8 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-2xl font-bold text-[#F6C90E] mb-4">Siap untuk Menang?</h2>
            {article.related_product_name && (
              <p className="text-white/70 mb-4 text-lg">Top Up {article.related_product_name} Termurah & Instan!</p>
            )}
            <p className="text-white/70 mb-8">Dapatkan saldo game Anda secara instan dan aman sekarang juga.</p>
            <a
              href={article.cta_url || '/'}
              className="inline-flex items-center justify-center rounded-full border border-[#F6C90E] bg-[#F6C90E] px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#0f172b] shadow-[0_0_30px_rgba(246,201,14,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(246,201,14,0.35)]"
            >
              {article.cta_text || 'Top Up Sekarang'}
            </a>
          </div>
        )}
      </article>

      <ContactFooter />
    </main>
  );
}
