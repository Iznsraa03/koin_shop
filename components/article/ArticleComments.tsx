'use client';

import { useState } from 'react';
import { submitComment } from '@/app/actions/comments';

interface Comment {
  id: number;
  name: string;
  comment: string;
  created_at: string | Date;
}

interface Props {
  articleId: number;
  slug: string;
  initialComments: Comment[];
}

export default function ArticleComments({ articleId, slug, initialComments }: Props) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [name, setName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!name.trim() || !commentText.trim()) {
      setError('Nama dan komentar wajib diisi.');
      return;
    }

    setLoading(true);
    const res = await submitComment(articleId, name, commentText, slug);
    
    if (res.success && res.data) {
      setComments([res.data, ...comments]);
      setName('');
      setCommentText('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError(res.error || 'Gagal mengirim komentar.');
    }
    setLoading(false);
  };

  return (
    <section className="py-10 border-t border-white/5 mt-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Diskusi & Komentar</h3>
          <p className="text-sm text-white/50">{comments.length} komentar</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-10 max-w-2xl">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-[12px] font-bold text-white/50 mb-2">Nama Anda</label>
            <input 
              type="text" 
              placeholder="Masukkan nama" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              className="w-full bg-[#131827] border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white placeholder-white/20 focus:outline-none focus:border-[#F6C90E] transition-all disabled:opacity-50" 
              required 
            />
          </div>
          <div>
            <label className="block text-[12px] font-bold text-white/50 mb-2">Komentar</label>
            <textarea 
              rows={4} 
              placeholder="Tulis pendapat atau pertanyaan Anda..." 
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              disabled={loading}
              className="w-full bg-[#131827] border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white placeholder-white/20 focus:outline-none focus:border-[#F6C90E] transition-all resize-y disabled:opacity-50" 
              required
            ></textarea>
          </div>
        </div>

        {error && <p className="text-red-400 text-sm font-medium">{error}</p>}
        {success && <p className="text-green-400 text-sm font-medium">Komentar Anda berhasil dipublikasikan!</p>}

        <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 mt-2">
          <span className="text-[12px] text-white/40">
            Komentar tersimpan aman di browser Anda.
          </span>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 bg-[#F6C90E] text-[#090b12] text-[14px] font-bold rounded-xl hover:bg-[#ffdf8a] transition-colors disabled:opacity-50"
          >
            {loading ? 'Mengirim...' : 'Kirim Komentar'}
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="py-10 border border-white/5 rounded-2xl text-center bg-[#131827]">
            <p className="text-[14px] text-white/40">Belum ada komentar. Jadilah yang pertama berkomentar.</p>
          </div>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="pb-6 border-b border-white/5 last:border-0 last:pb-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#171d2d] flex items-center justify-center font-bold text-[#F6C90E] border border-white/5">
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-white text-[14px]">{c.name}</h4>
                  <p className="text-[11px] text-white/40">
                    {new Date(c.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' })}
                  </p>
                </div>
              </div>
              <p className="text-white/70 text-[14px] leading-relaxed pl-[52px]">
                {c.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
