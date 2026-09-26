import ArticleEditor from '@/components/admin/ArticleEditor';
import PillNav from '@/components/PillNav';

export const metadata = {
  title: 'Tambah Artikel Baru | Admin Koin Shop',
};

export default function TambahArtikelPage() {
  const navItems = [
    { label: "← Back to Articles", href: "/admin/artikel" },
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
      
      <div className="pt-32 mb-8 max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-[#F6C90E]">Tambah Artikel Baru</h1>
      </div>
      <ArticleEditor />
    </div>
  );
}
