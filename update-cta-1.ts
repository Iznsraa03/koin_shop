import { query } from './lib/db';

async function updateFirstArticleCTA() {
  console.log('Updating first article CTA...');

  // The original block to replace
  const oldCTA = `
<blockquote style="border-left-color: #F6C90E; background-color: #131827; padding: 20px; border-radius: 0 10px 10px 0; margin-top: 30px;">
  <strong style="display: block; font-size: 1.2rem; margin-bottom: 10px;">Butuh koin Royal Dream sekarang?</strong>
  <p style="margin-bottom: 15px;">Pilih nominal yang sesuai, masukkan ID akun, lalu lanjutkan pembayaran melalui halaman top up.</p>
  <a href="/store" style="display: inline-block; padding: 10px 20px; background-color: #F6C90E; color: #090B12; text-decoration: none; font-weight: bold; border-radius: 8px;">Mulai Top Up</a>
</blockquote>`;

  // The new beautiful CTA card style
  const newCTA = `
<div style="background: linear-gradient(135deg, rgba(246,201,14,0.08), #131827); border: 1px solid rgba(246,201,14,0.3); border-radius: 24px; padding: 32px; margin: 40px 0; text-align: center; box-shadow: 0 10px 40px rgba(246,201,14,0.05), inset 0 0 30px rgba(246,201,14,0.05); position: relative; overflow: hidden;">
  <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at 50% 50%, rgba(246,201,14,0.15) 0%, transparent 70%); pointer-events: none;"></div>
  <div style="position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; justify-content: center;">
    <h3 style="color: #F6C90E; font-size: 24px; font-weight: 900; margin-top: 0; margin-bottom: 16px; font-family: 'Space Grotesk', sans-serif;">Butuh Koin Royal Dream Sekarang?</h3>
    <p style="color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.6; margin: 0 0 24px 0; max-width: 500px;">
      Pilih nominal yang sesuai, masukkan ID akun, lalu lanjutkan pembayaran seketika tanpa ribet.
    </p>
    <a href="/#store" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #F6C90E, #D99B2B); color: #090B12; text-decoration: none; font-weight: 800; font-size: 16px; border-radius: 12px; box-shadow: 0 8px 24px -2px rgba(246,201,14,0.35); text-transform: uppercase; letter-spacing: 1px; transition: transform 0.2s;">
      Mulai Top Up
    </a>
  </div>
</div>`;

  // The original block to replace (Warning CTA)
  const oldWarning = `
<blockquote style="border-left-color: #F6C90E; background-color: #131827; padding: 10px 20px; border-radius: 0 10px 10px 0;">
  <strong>Pastikan data akun benar.</strong><br/>
  Periksa kembali ID pemain sebelum melakukan pembayaran. Kesalahan input ID dapat membuat pesanan masuk ke akun yang salah.
</blockquote>`;

  const newWarning = `
<div style="background: linear-gradient(135deg, #171d2d, #131827); border: 1px solid rgba(246,201,14,0.15); border-radius: 24px; padding: 24px; margin: 32px 0; box-shadow: 0 8px 32px rgba(0,0,0,0.2), inset 0 0 20px rgba(246,201,14,0.05); position: relative; overflow: hidden;">
  <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle at 50% 0%, rgba(246,201,14,0.1) 0%, transparent 60%); pointer-events: none;"></div>
  <div style="position: relative; z-index: 10;">
    <h3 style="color: #F6C90E; font-size: 20px; font-weight: 800; margin-top: 0; margin-bottom: 12px; font-family: 'Space Grotesk', sans-serif;">Pastikan data akun benar.</h3>
    <p style="color: rgba(255,255,255,0.8); font-size: 15px; line-height: 1.6; margin: 0;">
      Periksa kembali ID pemain sebelum melakukan pembayaran. Kesalahan input ID dapat membuat pesanan masuk ke akun yang salah.
    </p>
  </div>
</div>`;

  try {
    const slug = 'top-up-royal-dream-termurah';
    
    // Fetch current content
    const res = await query('SELECT content FROM articles WHERE slug = $1', [slug]);
    if (res.rows.length === 0) {
      console.log('Article not found!');
      return;
    }
    
    let content = res.rows[0].content;
    
    // Replace the strings
    content = content.replace(oldCTA.trim(), newCTA.trim());
    content = content.replace(oldWarning.trim(), newWarning.trim());
    
    await query(
      `UPDATE articles SET content = $1 WHERE slug = $2`,
      [content, slug]
    );
    console.log('First article CTA updated successfully!');
  } catch (err) {
    console.error('Error updating article CTA:', err);
  } finally {
    process.exit(0);
  }
}

updateFirstArticleCTA();
