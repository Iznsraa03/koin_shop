import Link from 'next/link';

interface Props {
  article: any;
  siteUrl: string;
  relatedArticles?: any[];
}

export default function ArticleSidebar({ article, siteUrl, relatedArticles = [] }: Props) {
  const categories = [
    'Panduan Game',
    'Panduan Top Up',
    'Tips dan Trik',
    'Update Game',
    'Event dan Promo'
  ];

  return (
    <aside className="w-full flex flex-col gap-10">
      
      {/* Promo / CTA Widget */}
      <div className="rounded-2xl bg-[#131827] border border-white/10 p-6 md:p-8">
        <h3 className="text-white text-xl font-bold leading-tight mb-2">
          Isi Koin {article.related_product_name || 'Sekarang'}
        </h3>
        
        <p className="text-white/60 text-sm leading-relaxed mb-6">
          Pilih nominal, masukkan ID, selesaikan pembayaran, lalu cek status pesanan dengan proses transparan dan instan.
        </p>
        
        <Link 
          href={article.cta_url || '/'}
          className="flex w-full py-3 items-center justify-center bg-[#F6C90E] hover:bg-[#ffdf8a] text-[#090b12] text-sm font-bold rounded-xl transition-colors mb-6"
        >
          {article.cta_text || 'Top Up Sekarang'}
        </Link>

        <div className="flex flex-col gap-3">
           <div className="flex items-start gap-2 text-white/70 text-sm">
             <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#42d392]/20 flex items-center justify-center text-[#42d392] font-bold text-[9px] mt-0.5">✓</div>
             Proses transaksi jelas
           </div>
           <div className="flex items-start gap-2 text-white/70 text-sm">
             <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#42d392]/20 flex items-center justify-center text-[#42d392] font-bold text-[9px] mt-0.5">✓</div>
             Pilihan nominal lengkap
           </div>
           <div className="flex items-start gap-2 text-white/70 text-sm">
             <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#42d392]/20 flex items-center justify-center text-[#42d392] font-bold text-[9px] mt-0.5">✓</div>
             Mendukung beberapa pembayaran
           </div>
           <div className="flex items-start gap-2 text-white/70 text-sm">
             <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#42d392]/20 flex items-center justify-center text-[#42d392] font-bold text-[9px] mt-0.5">✓</div>
             Status pesanan dapat dicek
           </div>
        </div>
      </div>

      {/* Kategori Blog */}
      <div className="flex flex-col bg-[#090b12] rounded-3xl p-8 border border-white/5">
        <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-[#F6C90E]/80 mb-6 font-['Space_Grotesk']">Kategori Blog</h4>
        <div className="flex flex-col">
          {categories.map((cat, i) => (
            <Link key={i} href={`/kategori/${cat.toLowerCase().replace(/\\s+/g, '-')}`} className="flex items-center justify-between py-4 border-b border-white/5 text-white/70 hover:text-[#F6C90E] hover:pl-2 transition-all group last:border-0 last:pb-0">
              <span className="text-[15px] font-bold">{cat}</span>
              <span className="text-white/20 group-hover:text-[#F6C90E] transition-colors text-xl leading-none group-hover:translate-x-1">›</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Artikel Terkait */}
      {relatedArticles.length > 0 && (
        <div className="flex flex-col bg-[#090b12] rounded-3xl p-8 border border-white/5">
          <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-[#F6C90E]/80 mb-8 font-['Space_Grotesk']">Artikel Terkait</h4>
          <div className="flex flex-col gap-8">
            {relatedArticles.map((rel, i) => (
              <Link key={i} href={`/artikel/${rel.slug}`} className="flex gap-5 group items-start">
                <div className="text-[32px] font-black text-white/10 group-hover:text-[#F6C90E]/30 transition-colors leading-none font-['Space_Grotesk'] -mt-1">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#F6C90E]/70 mb-2">{rel.category}</span>
                  <h5 className="text-[15px] font-bold text-white/90 group-hover:text-[#F6C90E] leading-snug mb-2 transition-colors">{rel.title}</h5>
                  <p className="text-[13px] text-white/50 line-clamp-2 leading-relaxed">{rel.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </aside>
  );
}
