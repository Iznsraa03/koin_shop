import Link from 'next/link';
import PillNav from '@/components/PillNav';
import ContactFooter from '@/components/sections/ContactFooter';
import { getArticles } from '@/app/actions/articles';

export const metadata = {
  title: 'Artikel & Tips Gaming Terbaru | Koin Shop',
  description: 'Baca artikel terbaru seputar tips top up game, panduan Mobile Legends, Royal Dream, dan berita esport terkini.',
};

export const dynamic = 'force-dynamic';

export default async function ArtikelIndexPage() {
  const articles = await getArticles('published');

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/#features" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ] as const;

  return (
    <main className="min-h-screen bg-base-color text-white flex flex-col">
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

      <section className="mx-auto max-w-6xl px-6 pt-32 pb-20 flex-1 w-full">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#F6C90E] mb-4">
            Artikel & Tips Gaming
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Temukan panduan, tips rahasia, dan update terbaru seputar game favoritmu agar makin jago dan hemat saat top up.
          </p>
        </header>

        {articles.length === 0 ? (
          <div className="text-center py-20 text-white/50">
            Belum ada artikel yang dipublikasikan saat ini.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: any) => (
              <Link href={`/artikel/${article.slug}`} key={article.id} className="group flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#F6C90E]/50 transition-colors">
                <div className="aspect-[16/9] w-full bg-white/5 overflow-hidden">
                  {article.featured_image ? (
                    <img 
                      src={article.featured_image} 
                      alt={article.alt_image || article.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20 font-bold text-xl">Koin Shop</div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  {article.category && (
                    <span className="text-[#F6C90E] text-xs font-bold uppercase tracking-wider mb-2 block">
                      {article.category}
                    </span>
                  )}
                  <h2 className="text-xl font-bold mb-3 group-hover:text-[#F6C90E] transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-white/60 text-sm mb-4 line-clamp-3 flex-1">
                    {article.excerpt || article.meta_description || 'Baca selengkapnya artikel terbaru dari Koin Shop.'}
                  </p>
                  <div className="flex justify-between items-center text-xs text-white/40 pt-4 border-t border-white/10">
                    <span>{article.author_name}</span>
                    <span>{new Date(article.published_at || article.created_at).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <ContactFooter />
    </main>
  );
}
