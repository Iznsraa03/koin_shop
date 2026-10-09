import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PillNav from '@/components/PillNav';
import ContactFooter from '@/components/sections/ContactFooter';
import { getArticleBySlug, getArticles } from '@/app/actions/articles';
import { getCommentsByArticleId } from '@/app/actions/comments';
import ArticleSidebar from '@/components/article/ArticleSidebar';
import ArticleFaqAccordion from '@/components/article/ArticleFaqAccordion';
import ArticleShareButtons from '@/components/article/ArticleShareButtons';
import ArticleComments from '@/components/article/ArticleComments';
import TableOfContents from '@/components/article/TableOfContents';

// Ponytail: Simple Server Component fetching data and rendering natively. No extra state needed.

export const dynamic = 'force-dynamic';

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

  // Fetch related articles (for simplicity, we just fetch latest published and exclude current)
  const allArticles = await getArticles('published');
  const relatedArticles = allArticles.filter(a => a.id !== article.id).slice(0, 3);

  // Fetch comments
  const initialComments = await getCommentsByArticleId(article.id);

  const siteUrl = 'https://koinshop.id';
  const currentUrl = `${siteUrl}/artikel/${slug}`;

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Top Up", href: "/#store" },
    { label: "Cek Pesanan", href: "/cek-pesanan" },
    { label: "Panduan", href: "/artikel" },
    { label: "Tentang Kami", href: "/#about" },
  ] as const;

  // Build JSON-LD Schema
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': article.schema_type || 'Article',
    headline: article.seo_title || article.title,
    image: article.featured_image ? [article.featured_image] : [],
    datePublished: new Date(article.published_at || article.created_at).toISOString(),
    dateModified: new Date(article.updated_at || article.created_at).toISOString(),
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
    <main className="min-h-screen bg-base-color text-white">
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
        baseColor="#090B12"
        pillColor="#F6C90E"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#0f172b"
        initialLoadAnimation={false}
      />

      <div className="mx-auto max-w-6xl px-6 pt-32 pb-20">
        
        {/* Breadcrumbs */}
        <div className="mb-6 text-sm font-semibold text-white/40 flex items-center gap-2">
          <a href="/" className="hover:text-[#F6C90E] transition-colors">Home</a>
          <span>/</span>
          <a href="/artikel" className="hover:text-[#F6C90E] transition-colors">Blog</a>
          <span>/</span>
          <span className="text-white/80 line-clamp-1">{article.title}</span>
        </div>

        {/* Hero / Header */}
        <header className="mb-12 border-b border-white/5 pb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#F6C90E] mb-6 leading-tight max-w-4xl">
            {article.title}
          </h1>
          <p className="text-xl text-white/60 mb-8 max-w-3xl leading-relaxed">
            {article.excerpt}
          </p>
          
          <div className="flex flex-wrap items-center gap-6 text-white/50 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#131827] flex items-center justify-center font-bold text-[#F6C90E] border border-[#F6C90E]/20">
                {article.author_name ? article.author_name.charAt(0).toUpperCase() : 'K'}
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold">{article.author_name}</span>
                <span className="text-[11px] uppercase tracking-wider text-[#F6C90E]">{article.category}</span>
              </div>
            </div>
            <div className="h-6 w-[1px] bg-white/10 hidden sm:block"></div>
            <time className="flex items-center gap-2" dateTime={article.published_at}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {new Date(article.published_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <div className="h-6 w-[1px] bg-white/10 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              5 menit baca
            </div>
          </div>
        </header>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Main Content (Left Column) */}
          <div className="lg:col-span-8">
            
            {article.featured_image && (
              <div className="mb-12 rounded-[24px] overflow-hidden border border-white/5 relative group">
                <div className="absolute inset-0 bg-[#F6C90E]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                <img src={article.featured_image} alt={article.alt_image || article.title} className="w-full object-cover aspect-[21/9] group-hover:scale-105 transition-transform duration-700" />
              </div>
            )}

            <TableOfContents />

            {/* AI Key Takeaways (GEO / AEO Box) */}
            {(article.main_question || (article.key_takeaways && article.key_takeaways.length > 0)) && (
              <div className="bg-[#131827]/50 border-l-[4px] border-[#F6C90E] p-6 md:p-8 rounded-r-[20px] mb-12 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                {article.main_question && <h3 className="text-xl md:text-2xl font-bold mb-4">{article.main_question}</h3>}
                {article.direct_answer && <p className="text-white/70 mb-6 leading-relaxed">{article.direct_answer}</p>}
                {article.key_takeaways && article.key_takeaways.length > 0 && (
                  <>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F6C90E]/80 mb-4">Key Takeaways:</h4>
                    <ul className="space-y-3">
                      {article.key_takeaways.map((point: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                           <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#F6C90E]/20 flex items-center justify-center text-[#F6C90E] font-bold text-[10px] mt-0.5">✓</div>
                           <span className="text-white/80 leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}

            {/* Main Content */}
            <div 
              className="prose prose-invert prose-lg max-w-none 
                prose-headings:text-white prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-6 prose-h2:mt-12
                prose-h3:text-2xl prose-h3:font-bold prose-h3:mb-4 prose-h3:mt-8
                prose-p:text-white/70 prose-p:leading-[1.8] prose-p:mb-6 
                prose-a:text-[#F6C90E] prose-a:no-underline hover:prose-a:underline 
                prose-ul:list-none prose-ul:pl-0 prose-li:text-white/70 prose-li:mb-2 
                prose-ol:list-decimal prose-ol:pl-5 prose-ol:marker:text-[#F6C90E] prose-ol:marker:font-bold
                prose-strong:text-white prose-blockquote:border-l-[#F6C90E] prose-blockquote:bg-[#131827] prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic
                pb-10"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags Section */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-4 mb-10 flex flex-wrap gap-2">
                <span className="text-sm font-semibold text-white/30 mr-2 flex items-center uppercase tracking-widest">Tags:</span>
                {article.tags.map((tag: string, i: number) => (
                  <span key={i} className="px-4 py-1.5 bg-[#131827] hover:bg-[#171d2d] border border-white/5 hover:border-[#F6C90E]/30 rounded-full text-[13px] text-white/60 hover:text-[#F6C90E] transition-all cursor-default">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* FAQ Section */}
            {article.faqs && article.faqs.length > 0 && (
              <div className="mt-14 mb-10 border-t border-white/5 pt-10">
                <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[#F6C90E]/80 mb-2">FAQ</p>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Pertanyaan Umum</h2>
                <ArticleFaqAccordion faqs={article.faqs} />
              </div>
            )}

            <ArticleShareButtons url={currentUrl} title={article.title} />

            {/* Author Bio */}
            <section className="mt-12 flex flex-col sm:flex-row gap-6 items-start sm:items-center py-8 border-t border-b border-white/5">
              <div className="shrink-0 w-16 h-16 rounded-full bg-[#131827] border border-white/10 flex items-center justify-center p-2">
                <img src="/logo.png" alt="Koin Shop Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="block mb-1 text-[11px] font-bold uppercase tracking-wider text-[#F6C90E]">Tentang Penulis</span>
                <h3 className="text-xl font-bold text-white mb-2">{article.author_name || 'Tim Koin Shop'}</h3>
                <p className="text-[14px] text-white/60 leading-relaxed max-w-2xl m-0">
                  Tim editorial resmi yang menyajikan panduan top up instan, tips keamanan akun, dan pembaruan game terkini agar pengalaman bermain Anda selalu maksimal tanpa kendala.
                </p>
              </div>
            </section>

            {/* Dynamic Comments Section */}
            <ArticleComments articleId={article.id} slug={article.slug} initialComments={initialComments} />

          </div>

          {/* Sidebar (Right Column) */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-32">
              <ArticleSidebar article={article} siteUrl={siteUrl} relatedArticles={relatedArticles} />
            </div>
          </div>

        </div>

      </div>

      <ContactFooter />
    </main>
  );
}
