"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { saveArticle, getProductsForSelect } from '@/app/actions/articles';
import { ChevronDown, ChevronUp, Image as ImageIcon, Search, MessageSquare, Tag, Settings, FileText, ShoppingCart } from 'lucide-react';

function Accordion({ title, icon: Icon, children, defaultOpen = false }: any) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  // Ensure hydration matches by just rendering standard elements safely
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-[#151f32] rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 shadow-lg mb-6">
      <button 
        type="button" 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/5 rounded-lg text-[#F6C90E]">
            <Icon size={18} />
          </div>
          <span className="font-bold text-lg text-white">{title}</span>
        </div>
        {mounted && (isOpen ? <ChevronUp size={20} className="text-white/40" /> : <ChevronDown size={20} className="text-white/40" />)}
      </button>
      {isOpen && (
        <div className="px-6 pb-6 pt-2">
          {children}
        </div>
      )}
    </div>
  );
}

export default function ArticleEditor({ initialData = null }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);
  
  // Hydration fix for any dynamic client stuff
  useEffect(() => {
    setIsClient(true);
    getProductsForSelect().then(setProducts);
  }, []);

  const [formData, setFormData] = useState({
    id: initialData?.id || null,
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    content: initialData?.content || '',
    excerpt: initialData?.excerpt || '',
    featured_image: initialData?.featured_image || '',
    alt_image: initialData?.alt_image || '',
    category: initialData?.category || '',
    tags: initialData?.tags?.join(', ') || '',
    author_name: initialData?.author_name || 'Admin',
    status: initialData?.status || 'draft',
    focus_keyword: initialData?.focus_keyword || '',
    secondary_keyword: initialData?.secondary_keyword || '',
    seo_title: initialData?.seo_title || '',
    meta_description: initialData?.meta_description || '',
    canonical_url: initialData?.canonical_url || '',
    is_indexed: initialData?.is_indexed ?? true,
    internal_links: initialData?.internal_links || [],
    external_links: initialData?.external_links || [],
    related_product_id: initialData?.related_product_id || '',
    related_product_name: initialData?.related_product_name || '',
    product_url: initialData?.product_url || '',
    cta_text: initialData?.cta_text || 'Top Up Sekarang',
    cta_url: initialData?.cta_url || '',
    main_question: initialData?.main_question || '',
    direct_answer: initialData?.direct_answer || '',
    key_takeaways: initialData?.key_takeaways?.join('\n') || '',
    related_questions: initialData?.related_questions?.join('\n') || '',
    main_entity: initialData?.main_entity || '',
    faqs: initialData?.faqs || [],
    source_name: initialData?.source_name || '',
    source_url: initialData?.source_url || '',
    schema_type: initialData?.schema_type || 'Article',
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayChange = (field: string, index: number, subField: string, value: string) => {
    const newArray = [...formData[field as keyof typeof formData] as any[]];
    newArray[index][subField] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: string, emptyItem: any) => {
    setFormData(prev => ({ ...prev, [field]: [...(prev[field as keyof typeof prev] as any[]), emptyItem] }));
  };

  const removeArrayItem = (field: string, index: number) => {
    const newArray = [...formData[field as keyof typeof formData] as any[]];
    newArray.splice(index, 1);
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formDataObj = new FormData();
    formDataObj.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataObj,
      });
      const data = await res.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, featured_image: data.url }));
      } else {
        alert(data.error || 'Gagal mengupload gambar');
      }
    } catch (err) {
      alert('Terjadi kesalahan saat upload');
    }
    setUploading(false);
  };

  const wordCount = formData.content.trim() ? formData.content.trim().split(/\s+/).length : 0;
  
  let seoScore = 0;
  if (formData.focus_keyword && formData.title.toLowerCase().includes(formData.focus_keyword.toLowerCase())) seoScore += 30;
  if (formData.focus_keyword && formData.meta_description.toLowerCase().includes(formData.focus_keyword.toLowerCase())) seoScore += 20;
  if (formData.seo_title.length >= 50 && formData.seo_title.length <= 60) seoScore += 20;
  if (formData.meta_description.length >= 120 && formData.meta_description.length <= 160) seoScore += 20;
  if (wordCount > 300) seoScore += 10;

  let aiScore = 0;
  if (formData.main_question) aiScore += 25;
  if (formData.direct_answer) aiScore += 25;
  if (formData.key_takeaways) aiScore += 25;
  if (formData.main_entity) aiScore += 25;

  const handleSave = async (status: string) => {
    setLoading(true);
    let finalSlug = formData.slug;
    if (!finalSlug && formData.title) {
      finalSlug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    const payload = {
      ...formData,
      slug: finalSlug,
      status,
      tags: formData.tags.split(',').map((t: string) => t.trim()).filter(Boolean),
      key_takeaways: formData.key_takeaways.split('\n').filter(Boolean),
      related_questions: formData.related_questions.split('\n').filter(Boolean),
    };

    const res = await saveArticle(payload);
    if (res.success) {
      alert(`Artikel ${status} berhasil disimpan!`);
      if (!formData.id) {
        router.push(`/admin/artikel/edit/${res.data.id}`);
      } else {
        router.refresh();
      }
    } else {
      alert('Gagal menyimpan artikel: ' + res.error);
    }
    setLoading(false);
  };

  const inputClasses = "w-full bg-[#0a0f1d] border border-white/10 p-3.5 rounded-xl text-white placeholder-white/20 focus:border-[#F6C90E] focus:ring-1 focus:ring-[#F6C90E] outline-none transition-all font-medium";
  const labelClasses = "block text-sm font-semibold mb-2 text-white/70";

  // Prevent hydration mismatch fully by returning null during SSR for complex UI if needed, 
  // but standard DOM is fine as long as classes match perfectly.
  if (!isClient) {
    return <div className="p-10 text-center text-white">Memuat Editor...</div>;
  }

  return (
    <div className="relative pb-40"> {/* pb-40 for sticky bottom bar spacing */}
      
      {/* 1 COLUMN LAYOUT (Stacked) */}
      <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto bg-transparent text-white">
        
        {/* Real-time Metrics Card (Top Info) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
          <div className="bg-[#151f32] p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center">
            <span className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Total Kata</span>
            <span className="text-2xl font-black text-white">{wordCount}</span>
          </div>
          <div className="bg-[#151f32] p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center">
            <span className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">SEO Score</span>
            <span className={`text-2xl font-black ${seoScore >= 80 ? 'text-green-400' : seoScore >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>{seoScore}%</span>
          </div>
          <div className="bg-[#151f32] p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center">
            <span className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">AEO Score</span>
            <span className={`text-2xl font-black ${aiScore >= 75 ? 'text-green-400' : aiScore >= 50 ? 'text-yellow-400' : 'text-gray-400'}`}>{aiScore}%</span>
          </div>
          <div className="bg-[#151f32] p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center">
            <span className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Total FAQ</span>
            <span className="text-2xl font-black text-[#F6C90E]">{formData.faqs.length}</span>
          </div>
        </div>

        {/* Editor Utama */}
        <div className="bg-[#151f32] p-8 rounded-3xl shadow-xl border border-white/5 space-y-6">
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            placeholder="Judul Artikel Menarik..." 
            className="w-full text-4xl md:text-5xl font-bold bg-transparent border-none outline-none placeholder-white/20 focus:ring-0 text-white leading-tight"
          />
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-white/50 bg-[#0a0f1d] p-3 rounded-xl border border-white/5">
            <span className="font-semibold px-2">Slug URL:</span>
            <div className="flex-1 flex items-center">
              <span className="text-white/30 mr-1">koinshop.id/artikel/</span>
              <input 
                type="text" 
                name="slug" 
                value={formData.slug} 
                onChange={handleChange} 
                placeholder="auto-generated-slug"
                className="bg-transparent border-none w-full focus:ring-0 outline-none text-[#F6C90E] font-medium placeholder-white/20 p-0"
              />
            </div>
          </div>

          <textarea 
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Mulai menulis cerita Anda di sini..."
            className="w-full h-[600px] bg-transparent border-none resize-none p-2 outline-none focus:ring-0 font-sans text-lg leading-relaxed text-white/90 placeholder-white/20 transition-colors"
          />
        </div>

        {/* Featured Image */}
        <Accordion title="Featured Image" icon={ImageIcon} defaultOpen={true}>
          <div className="space-y-4 pt-2">
            {formData.featured_image ? (
              <div className="relative group rounded-xl overflow-hidden border border-white/10 shadow-lg aspect-video bg-[#0a0f1d] max-w-2xl mx-auto">
                <img src={formData.featured_image} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button onClick={() => setFormData(p => ({...p, featured_image: ''}))} className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold">Hapus Gambar</button>
                </div>
              </div>
            ) : (
              <div className="aspect-video max-w-2xl mx-auto bg-[#0a0f1d] rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-white/30 p-4 text-center">
                <ImageIcon size={48} className="mb-4 opacity-50" />
                <span className="text-sm font-medium">Belum ada gambar utama (Masukkan URL di bawah)</span>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className={labelClasses}>URL Gambar atau Upload</label>
                <div className="flex gap-2">
                  <input type="text" name="featured_image" value={formData.featured_image} onChange={handleChange} className={`${inputClasses} flex-1`} placeholder="https://..." />
                  <label className="flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-4 rounded-xl cursor-pointer transition-colors border border-white/10">
                    {uploading ? '...' : 'Upload'}
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </div>
              <div>
                <label className={labelClasses}>Teks Alternatif (ALT SEO)</label>
                <input type="text" name="alt_image" value={formData.alt_image} onChange={handleChange} className={inputClasses} placeholder="Deskripsi gambar" />
              </div>
            </div>
          </div>
        </Accordion>

        {/* Taxonomy / Meta */}
        <Accordion title="Taksonomi & Format" icon={Tag}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div>
              <label className={labelClasses}>Kategori</label>
              <input type="text" name="category" value={formData.category} onChange={handleChange} className={inputClasses} placeholder="Tutorial, Tips, Berita..." />
            </div>
            <div>
              <label className={labelClasses}>Tags (Pisahkan koma)</label>
              <input type="text" name="tags" value={formData.tags} onChange={handleChange} className={inputClasses} placeholder="mobile legends, item build" />
            </div>
            <div>
              <label className={labelClasses}>Tipe Artikel (Schema)</label>
              <select name="schema_type" value={formData.schema_type} onChange={handleChange} className={`${inputClasses} appearance-none [&>option]:bg-[#0f172b]`}>
                <option value="Article">Standard Article</option>
                <option value="BlogPosting">Blog Posting</option>
                <option value="NewsArticle">News / Berita</option>
                <option value="HowTo">Tutorial / How-To</option>
              </select>
            </div>
          </div>
        </Accordion>

        <Accordion title="SEO & Metadata Optimization" icon={Search}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <label className={labelClasses}>Focus Keyword</label>
              <input type="text" name="focus_keyword" value={formData.focus_keyword} onChange={handleChange} className={inputClasses} placeholder="misal: top up royal dream" />
            </div>
            <div>
              <label className={labelClasses}>Secondary Keyword</label>
              <input type="text" name="secondary_keyword" value={formData.secondary_keyword} onChange={handleChange} className={inputClasses} />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className={labelClasses}>SEO Title (Opsional)</label>
              <input type="text" name="seo_title" value={formData.seo_title} onChange={handleChange} className={inputClasses} placeholder="60 karakter optimal" />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className={labelClasses}>Meta Description</label>
              <textarea name="meta_description" value={formData.meta_description} onChange={handleChange} className={`${inputClasses} h-28 resize-none`} placeholder="Ringkasan 160 karakter untuk Google..." />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className={labelClasses}>Canonical URL (Opsional)</label>
              <input type="text" name="canonical_url" value={formData.canonical_url} onChange={handleChange} className={inputClasses} />
            </div>
            <div className="col-span-1 md:col-span-2 flex items-center mt-2 p-4 bg-[#0a0f1d] rounded-xl border border-white/5 cursor-pointer hover:border-white/20 transition-colors">
              <input type="checkbox" name="is_indexed" checked={formData.is_indexed} onChange={handleChange} id="idx_cb" className="mr-4 h-5 w-5 accent-[#F6C90E] cursor-pointer" />
              <label htmlFor="idx_cb" className="text-sm font-semibold cursor-pointer select-none">Index Artikel (Izinkan Google membaca & menampilkan)</label>
            </div>
          </div>
        </Accordion>

        <Accordion title="AI Search Optimization (GEO)" icon={Settings}>
          <div className="space-y-6 pt-2">
            <div>
              <label className={labelClasses}>Main Question (Target Pertanyaan)</label>
              <input type="text" name="main_question" value={formData.main_question} onChange={handleChange} className={inputClasses} placeholder="Apa itu Royal Dream?" />
            </div>
            <div>
              <label className={labelClasses}>Direct Answer (Jawaban padat)</label>
              <textarea name="direct_answer" value={formData.direct_answer} onChange={handleChange} className={`${inputClasses} h-24 resize-none`} placeholder="Royal Dream adalah..." />
            </div>
            <div>
              <label className={labelClasses}>Key Takeaways (Gunakan baris baru tiap poin)</label>
              <textarea name="key_takeaways" value={formData.key_takeaways} onChange={handleChange} className={`${inputClasses} h-32 resize-none`} placeholder="Poin 1...&#10;Poin 2..." />
            </div>
            <div>
              <label className={labelClasses}>Main Entity (Topik Utama)</label>
              <input type="text" name="main_entity" value={formData.main_entity} onChange={handleChange} className={inputClasses} placeholder="Misal: Top Up Mobile Legends" />
            </div>
          </div>
        </Accordion>

        <Accordion title="Related Product (CTA Box)" icon={ShoppingCart}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="col-span-1 md:col-span-2">
              <label className={labelClasses}>Pilih Produk Integrasi</label>
              <select 
                name="related_product_id" 
                value={formData.related_product_id} 
                onChange={(e) => {
                  handleChange(e);
                  const prod = products.find(p => p.id === e.target.value);
                  if (prod) {
                    setFormData(prev => ({...prev, related_product_name: prod.name}));
                  }
                }}
                className={`${inputClasses} appearance-none [&>option]:bg-[#0f172b] cursor-pointer`}
              >
                <option value="">-- Tidak ada CTA Produk --</option>
                {products.map(p => <option key={p.id} value={p.id} className="bg-[#0f172b]">{p.name} - Rp{p.price}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClasses}>Teks Tombol CTA</label>
              <input type="text" name="cta_text" value={formData.cta_text} onChange={handleChange} className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>Custom CTA URL (Opsional)</label>
              <input type="text" name="cta_url" value={formData.cta_url} onChange={handleChange} className={inputClasses} placeholder="Kosongkan jika pakai produk default" />
            </div>
          </div>
        </Accordion>

        <Accordion title="FAQ (Frequently Asked Questions)" icon={MessageSquare}>
          <div className="space-y-4 pt-2">
            {formData.faqs.map((faq: any, i: number) => (
              <div key={i} className="flex flex-col gap-3 mb-4 p-5 rounded-2xl bg-[#0a0f1d] border border-white/5 relative group">
                <div>
                  <label className="text-xs font-bold text-white/40 mb-1 block uppercase tracking-wider">Pertanyaan</label>
                  <input type="text" placeholder="Contoh: Apakah aman?" value={faq.question} onChange={e => handleArrayChange('faqs', i, 'question', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white font-bold outline-none focus:border-[#F6C90E] transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-bold text-white/40 mb-1 block uppercase tracking-wider">Jawaban</label>
                  <textarea placeholder="Tulis jawaban komprehensif..." value={faq.answer} onChange={e => handleArrayChange('faqs', i, 'answer', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white/80 outline-none focus:border-[#F6C90E] transition-colors h-24 resize-none" />
                </div>
                <button type="button" onClick={() => removeArrayItem('faqs', i)} className="absolute top-4 right-4 text-white/30 hover:text-red-400 p-2 rounded-lg transition-colors" title="Hapus FAQ">
                  ✕
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem('faqs', { question: '', answer: '' })} className="w-full border-2 border-dashed border-[#F6C90E]/30 text-[#F6C90E] px-4 py-5 rounded-2xl text-sm font-bold hover:bg-[#F6C90E]/10 hover:border-[#F6C90E]/60 transition-all flex items-center justify-center gap-2">
              <span className="text-xl leading-none">+</span> Tambah Pertanyaan Baru
            </button>
          </div>
        </Accordion>
      </div>

      {/* STICKY BOTTOM BAR (Publish Actions) */}
      <div className="fixed bottom-0 left-0 w-full bg-[#0a0f1d]/90 backdrop-blur-md border-t border-white/10 p-4 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.3)]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          
          <div className="flex items-center gap-4">
            <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest ${formData.status === 'published' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'}`}>
              Status: {formData.status}
            </span>
            {formData.slug && (
              <a href={`/artikel/${formData.slug}`} target="_blank" rel="noreferrer" className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors">
                ↗ Lihat Preview
              </a>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button disabled={loading} onClick={() => handleSave('draft')} className="flex-1 sm:flex-none px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors font-semibold text-white/80">
              Save Draft
            </button>
            <button disabled={loading} onClick={() => handleSave('published')} className="flex-1 sm:flex-none px-8 py-3 bg-gradient-to-r from-[#F6C90E] to-yellow-400 text-[#0f172b] font-black rounded-xl hover:brightness-110 shadow-[0_0_20px_rgba(246,201,14,0.4)] transition-all flex justify-center items-center gap-2">
              <FileText size={18} />
              {formData.status === 'published' ? 'Update Artikel' : 'Publish'}
            </button>
          </div>
          
        </div>
      </div>
      
    </div>
  );
}
