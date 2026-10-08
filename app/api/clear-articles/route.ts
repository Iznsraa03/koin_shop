import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: Request) {
  // IMPORTANT: For security, you should normally protect this with a secret key or admin session check.
  // We're leaving it accessible via a secret query param for you to run once on production.
  
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  if (secret !== 'kosongkan-sekarang-123') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await query('TRUNCATE TABLE articles RESTART IDENTITY CASCADE');
    return NextResponse.json({ success: true, message: 'Semua data artikel di database berhasil dihapus dan dikosongkan secara permanen!' });
  } catch (error: any) {
    console.error('Error truncating articles:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
