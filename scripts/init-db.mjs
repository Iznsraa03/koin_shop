import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  user: process.env.PGUSER || 'potah',
  host: process.env.PGHOST || '127.0.0.1',
  database: process.env.PGDATABASE || 'koinshop',
  password: process.env.PGPASSWORD || '',
  port: parseInt(process.env.PGPORT || '5432', 10),
});

const createArticlesTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS articles (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        featured_image TEXT,
        alt_image VARCHAR(255),
        category VARCHAR(100),
        tags TEXT[], -- array of tags
        author_name VARCHAR(100) DEFAULT 'Admin Koin Shop',
        published_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'published', 'archived'
        
        -- SEO Fields
        focus_keyword VARCHAR(150),
        secondary_keyword VARCHAR(255),
        seo_title VARCHAR(255),
        meta_description TEXT,
        canonical_url TEXT,
        is_indexed BOOLEAN DEFAULT TRUE,
        
        -- Links (Stored as JSONB array: [{"anchor_text": "...", "target_url": "..."}])
        internal_links JSONB DEFAULT '[]'::jsonb,
        external_links JSONB DEFAULT '[]'::jsonb,
        
        -- Related Product & CTA
        related_product_id VARCHAR(100),
        related_product_name VARCHAR(255),
        product_url TEXT,
        cta_text VARCHAR(100) DEFAULT 'Top Up Sekarang',
        cta_url TEXT,
        
        -- AI Search (AEO / GEO / Perplexity / Google AI Overviews)
        main_question TEXT,
        direct_answer TEXT,
        key_takeaways TEXT[], -- array of bullet points
        related_questions TEXT[],
        main_entity VARCHAR(150),
        
        -- FAQ (Stored as JSONB array: [{"question": "...", "answer": "..."}])
        faqs JSONB DEFAULT '[]'::jsonb,
        
        -- Source
        source_name VARCHAR(200),
        source_url TEXT,
        
        -- Schema Type
        schema_type VARCHAR(50) DEFAULT 'Article', -- 'Article', 'BlogPosting', 'NewsArticle', 'HowTo'
        
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
    CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
  `;

  try {
    await pool.query(query);
    console.log('Successfully created articles table');
  } catch (err) {
    console.error('Error creating articles table', err);
  } finally {
    await pool.end();
  }
};

createArticlesTable();
