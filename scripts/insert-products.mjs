import pg from 'pg';
import crypto from 'crypto';

const { Pool } = pg;

const pool = new Pool({
  user: process.env.PGUSER || 'potah',
  host: process.env.PGHOST || '127.0.0.1',
  database: process.env.PGDATABASE || 'koinshop',
  password: process.env.PGPASSWORD || '',
  port: parseInt(process.env.PGPORT || '5432', 10),
});

const products = [
  { name: '100M Royal Dream', price: 8000, chip_amount: 100, unit: 'M' },
  { name: '200M Royal Dream', price: 15000, chip_amount: 200, unit: 'M' },
  { name: '300M Royal Dream', price: 21000, chip_amount: 300, unit: 'M' },
  { name: '400M Royal Dream', price: 28000, chip_amount: 400, unit: 'M' },
  { name: '500M Royal Dream', price: 33000, chip_amount: 500, unit: 'M' },
  { name: '600M Royal Dream', price: 39000, chip_amount: 600, unit: 'M' },
  { name: '700M Royal Dream', price: 46000, chip_amount: 700, unit: 'M' },
  { name: '800M Royal Dream', price: 55000, chip_amount: 800, unit: 'M' },
  { name: '900M Royal Dream', price: 60000, chip_amount: 900, unit: 'M' },
  { name: '1B Royal Dream', price: 65000, chip_amount: 1, unit: 'B' },
  { name: '10B Royal Dream', price: 640000, chip_amount: 10, unit: 'B' },
  { name: '30B Royal Dream', price: 1890000, chip_amount: 30, unit: 'B' },
  { name: '500B Royal Dream', price: 31000000, chip_amount: 500, unit: 'B' }
];

const insert = async () => {
  for (const p of products) {
    const id = 'prd-' + crypto.randomBytes(12).toString('hex').toUpperCase();
    await pool.query(
      `INSERT INTO products (id, name, price, chip_amount, unit, created_at) 
       VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)`,
      [id, p.name, p.price, p.chip_amount, p.unit]
    );
    console.log(`Inserted ${p.name}`);
  }
  pool.end();
};

insert();
