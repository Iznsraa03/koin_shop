import { Pool } from 'pg';

// Ponytail: Singleton DB connection pool
// No complex ORMs, standard driver for minimal overhead.

const pool = new Pool({
  // Fallbacks if env vars are missing (assuming local dev setup like standard PostgreSQL brew install)
  user: process.env.PGUSER || 'potah',
  host: process.env.PGHOST || '127.0.0.1',
  database: process.env.PGDATABASE || 'koinshop',
  password: process.env.PGPASSWORD || '',
  port: parseInt(process.env.PGPORT || '5432', 10),
});

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};

export default pool;
