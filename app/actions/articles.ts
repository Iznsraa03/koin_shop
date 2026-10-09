'use server'

import { query } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getArticles(status?: string) {
  let text = 'SELECT * FROM articles ORDER BY created_at DESC';
  let params: any[] = [];

  if (status) {
    text = 'SELECT * FROM articles WHERE status = $1 ORDER BY created_at DESC';
    params = [status];
  }

  const { rows } = await query(text, params);
  return rows;
}

export async function getArticleBySlug(slug: string) {
  const decodedSlug = decodeURIComponent(slug);
  const { rows } = await query('SELECT * FROM articles WHERE slug = $1 LIMIT 1', [decodedSlug]);
  return rows[0] || null;
}

export async function getArticleById(id: number | string) {
  const { rows } = await query('SELECT * FROM articles WHERE id = $1 LIMIT 1', [id]);
  return rows[0] || null;
}

export async function saveArticle(data: any) {
  // Ponytail approach: manual dynamic query builder for minimum required functionality.
  const isUpdate = !!data.id;

  // Server-side slug sanitization
  let slug = data.slug || data.title || '';
  slug = slug
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '');
  data.slug = slug;

  // Auto-set published_at when publishing
  if (data.status === 'published' && !data.published_at) {
    data.published_at = new Date().toISOString();
  }
  
  // Fields to save
  const fields = [
    'title', 'slug', 'content', 'excerpt', 'featured_image', 'alt_image', 
    'category', 'tags', 'author_name', 'published_at', 'status',
    'focus_keyword', 'secondary_keyword', 'seo_title', 'meta_description', 
    'canonical_url', 'is_indexed', 'internal_links', 'external_links',
    'related_product_id', 'related_product_name', 'product_url', 'cta_text', 'cta_url',
    'main_question', 'direct_answer', 'key_takeaways', 'related_questions', 'main_entity',
    'faqs', 'source_name', 'source_url', 'schema_type'
  ];

  const jsonFields = new Set(['internal_links', 'external_links', 'faqs']);
  const arrayFields = new Set(['tags', 'key_takeaways', 'related_questions']);

  const values: any[] = [];
  const params: string[] = [];
  
  fields.forEach((field, index) => {
    let val = data[field] !== undefined ? data[field] : null;
    if (jsonFields.has(field)) {
      val = val ? JSON.stringify(val) : '[]';
    } else if (arrayFields.has(field)) {
      val = Array.isArray(val) ? val : [];
    }
    values.push(val);
    params.push(`$${index + 1}`);
  });

  let sql = '';
  
  if (isUpdate) {
    const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(', ');
    values.push(data.id);
    sql = `UPDATE articles SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $${values.length} RETURNING *`;
  } else {
    sql = `INSERT INTO articles (${fields.join(', ')}) VALUES (${params.join(', ')}) RETURNING *`;
  }

  try {
    const { rows } = await query(sql, values);
    revalidatePath('/admin/artikel');
    revalidatePath('/artikel');
    if (rows[0]?.slug) {
        revalidatePath(`/artikel/${rows[0].slug}`);
    }
    return { success: true, data: rows[0] };
  } catch (error: any) {
    console.error('Save article error:', error);
    return { success: false, error: error.message };
  }
}

export async function getProductsForSelect() {
  const { rows } = await query('SELECT id, name, price, unit FROM products ORDER BY name ASC');
  return rows;
}
