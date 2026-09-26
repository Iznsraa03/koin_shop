import Link from 'next/link';
import PillNav from '@/components/PillNav';
import { getArticles } from '@/app/actions/articles';

export const metadata = {
  title: 'Manajemen Artikel | Admin Koin Shop',
};

export default async function AdminArtikelPage() {
  const articles = await getArticles();

  const navItems = [
    { label: "← Back to Home", href: "/" },
  ] as const;

  return (
    <div className="bg-[#0f172b] min-h-screen text-white font-sans pb-20">
      <PillNav
        logo="/logo.png"
        logoAlt="Koin Shop logo"
        items={navItems as any}
        activeHref=""
        progressByHref={{}}
        className="mb-8"
        ease="power2.easeOut"
        baseColor="#0f172b"
        pillColor="#F6C90E"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#0f172b"
        initialLoadAnimation={false}
      />

      <div className="max-w-7xl mx-auto px-6 pt-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-[#F6C90E]">Manajemen Artikel</h1>
          <Link 
            href="/admin/artikel/tambah" 
            className="inline-flex items-center justify-center rounded-full border border-[#F6C90E] bg-[#F6C90E] px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-[#0f172b] shadow-[0_0_20px_rgba(246,201,14,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(246,201,14,0.35)]"
          >
            + Tambah Artikel Baru
          </Link>
        </div>

        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-white/10 border-b border-white/10 text-white/80">
                <tr>
                  <th className="p-5 font-semibold">Judul</th>
                  <th className="p-5 font-semibold">Status</th>
                  <th className="p-5 font-semibold">Kategori</th>
                  <th className="p-5 font-semibold">Tanggal</th>
                  <th className="p-5 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {articles.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-10 text-center text-white/50">Belum ada artikel. Klik tombol tambah untuk memulai.</td>
                  </tr>
                ) : (
                  articles.map(article => (
                    <tr key={article.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-5">
                        <div className="font-semibold text-white mb-1">
                          <Link href={`/admin/artikel/edit/${article.id}`} className="hover:text-[#F6C90E] transition-colors">{article.title}</Link>
                        </div>
                        <div className="text-xs text-white/40 font-mono">/{article.slug}</div>
                      </td>
                      <td className="p-5">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${article.status === 'published' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'}`}>
                          {article.status}
                        </span>
                      </td>
                      <td className="p-5 text-white/60">{article.category || '-'}</td>
                      <td className="p-5 text-white/60">{new Date(article.published_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                      <td className="p-5 text-right">
                        <div className="flex justify-end gap-3">
                          <Link href={`/admin/artikel/edit/${article.id}`} className="text-blue-400 hover:text-blue-300 transition-colors font-medium">Edit</Link>
                          <Link href={`/artikel/${article.slug}`} target="_blank" className="text-green-400 hover:text-green-300 transition-colors font-medium">View</Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
