import { query } from './lib/db';

async function createCommentsTable() {
  console.log('Membuat tabel article_comments...');
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS article_comments (
        id SERIAL PRIMARY KEY,
        article_id INTEGER NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        comment TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Create an index to make fetching comments for an article faster
    await query(`
      CREATE INDEX IF NOT EXISTS idx_article_comments_article_id ON article_comments(article_id);
    `);

    console.log('Tabel article_comments berhasil dibuat!');
  } catch (error) {
    console.error('Gagal membuat tabel:', error);
  } finally {
    process.exit(0);
  }
}

createCommentsTable();
