'use server';

import { query } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getCommentsByArticleId(articleId: number) {
  try {
    const { rows } = await query(
      'SELECT id, name, comment, created_at FROM article_comments WHERE article_id = $1 ORDER BY created_at DESC',
      [articleId]
    );
    return rows;
  } catch (error) {
    console.error('Failed to get comments:', error);
    return [];
  }
}

export async function submitComment(articleId: number, name: string, comment: string, slug: string) {
  if (!name.trim() || !comment.trim()) {
    return { success: false, error: 'Nama dan komentar harus diisi.' };
  }

  try {
    const { rows } = await query(
      'INSERT INTO article_comments (article_id, name, comment) VALUES ($1, $2, $3) RETURNING id, name, comment, created_at',
      [articleId, name.trim(), comment.trim()]
    );
    
    // Revalidate the article page so the new comment shows up immediately
    revalidatePath(`/artikel/${slug}`);
    
    return { success: true, data: rows[0] };
  } catch (error: any) {
    console.error('Failed to submit comment:', error);
    return { success: false, error: error.message || 'Terjadi kesalahan saat menyimpan komentar.' };
  }
}
