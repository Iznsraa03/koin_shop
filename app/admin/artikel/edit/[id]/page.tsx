import ArticleEditor from '@/components/admin/ArticleEditor';
import PillNav from '@/components/PillNav';
import { getArticleById } from '@/app/actions/articles';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Edit Artikel | Admin Koin Shop',
};

export const dynamic = 'force-dynamic';

export default async function EditArtikelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await getArticleById(id);
  
  if (!article) {
    notFound();
  }

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
        <h1 className="text-3xl font-bold text-[#F6C90E]">Edit Artikel</h1>
      </div>
      <ArticleEditor initialData={article} />
    </div>
  );
}
