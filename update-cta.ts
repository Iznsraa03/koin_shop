import { query } from './lib/db';

async function updateScamArticleCTA() {
  console.log('Updating second article CTA...');

  const content = `
<p>Dunia gaming saat ini semakin berkembang, dan kebutuhan akan mata uang virtual (koin atau diamond) juga terus meningkat. Sayangnya, tingginya permintaan ini memancing oknum tidak bertanggung jawab untuk melancarkan aksi penipuan atau <em>scam</em> top up game.</p>
<p>Banyak pemain yang tergiur dengan harga sangat murah, namun akhirnya harus merelakan uang dan bahkan kehilangan akses ke akun kesayangan mereka.</p>

<h2 id="modus-penipuan">Modus Penipuan yang Paling Sering Terjadi</h2>
<p>Para penipu biasanya memiliki pola yang hampir mirip. Berikut adalah beberapa modus yang patut Anda waspadai:</p>
<ul>
  <li><strong>Menawarkan Harga Tidak Masuk Akal:</strong> Penipu mengiklankan paket koin dengan harga yang jauh lebih murah dibandingkan harga resmi di dalam game atau agen top up terpercaya.</li>
  <li><strong>Phishing Link:</strong> Mengirimkan link palsu yang menyerupai website resmi untuk mencuri data <em>login</em> Anda.</li>
  <li><strong>Meminta Password atau OTP:</strong> Berdalih bahwa mereka membutuhkan password atau kode OTP Anda untuk memproses pengisian koin.</li>
  <li><strong>Transaksi Pribadi (Direct Transfer):</strong> Menolak menggunakan <em>payment gateway</em> resmi atau e-commerce, dan meminta Anda mentransfer langsung ke rekening pribadi yang sering berganti-ganti.</li>
</ul>

<div style="background: linear-gradient(135deg, #171d2d, #131827); border: 1px solid rgba(246,201,14,0.15); border-radius: 24px; padding: 24px; margin: 32px 0; box-shadow: 0 8px 32px rgba(0,0,0,0.2), inset 0 0 20px rgba(246,201,14,0.05); position: relative; overflow: hidden;">
  <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle at 50% 0%, rgba(246,201,14,0.1) 0%, transparent 60%); pointer-events: none;"></div>
  <div style="position: relative; z-index: 10;">
    <h3 style="color: #F6C90E; font-size: 20px; font-weight: 800; margin-top: 0; margin-bottom: 12px; font-family: 'Space Grotesk', sans-serif;">Ingat baik-baik!</h3>
    <p style="color: rgba(255,255,255,0.8); font-size: 15px; line-height: 1.6; margin: 0;">
      Layanan top up resmi dan profesional <strong>tidak akan pernah</strong> meminta password atau kode OTP akun Anda. Transaksi legal hanya membutuhkan ID Pemain atau User ID saja.
    </p>
  </div>
</div>

<h2 id="risiko-top-up-ilegal">Risiko Melakukan Top Up Ilegal</h2>
<p>Menggunakan jasa top up dari pihak yang tidak jelas bukan hanya berisiko kehilangan uang, tetapi juga membawa petaka bagi akun game Anda.</p>
<ol>
  <li><strong>Akun Terkena Banned Permanen:</strong> Developer game memiliki sistem deteksi untuk pengisian koin ilegal (seperti hasil <em>carding</em> atau eksploitasi bug). Jika terdeteksi, akun Anda bisa diblokir permanen.</li>
  <li><strong>Pencurian Data Pribadi (Phishing):</strong> Data yang Anda berikan bisa digunakan untuk meretas akun email atau media sosial yang terhubung.</li>
  <li><strong>Koin Minus (Minus Balance):</strong> Beberapa game akan menarik kembali koin ilegal yang sudah masuk, menyebabkan saldo koin Anda menjadi minus. Anda tidak akan bisa bermain normal hingga utang koin tersebut dilunasi.</li>
</ol>

<h2 id="cara-mencegah">Cara Menghindari Penipuan Top Up</h2>
<p>Anda bisa dengan mudah terhindar dari jeratan <em>scammer</em> jika selalu menerapkan langkah-langkah preventif berikut:</p>
<ul>
  <li><strong>Pilih Platform Resmi:</strong> Selalu gunakan website top up yang memiliki reputasi baik, sistem otomatis, dan menggunakan <em>payment gateway</em> yang legal.</li>
  <li><strong>Cek Ulasan dan Testimoni:</strong> Sebelum membeli di tempat baru, cari tahu review dari pelanggan lain di media sosial atau forum gaming.</li>
  <li><strong>Rahasiakan Data Login:</strong> Cukup berikan ID Game dan Nickname Anda. Jika ada yang meminta password, segera blokir!</li>
</ul>

<div style="background: linear-gradient(135deg, rgba(246,201,14,0.08), #131827); border: 1px solid rgba(246,201,14,0.3); border-radius: 24px; padding: 32px; margin: 40px 0; text-align: center; box-shadow: 0 10px 40px rgba(246,201,14,0.05), inset 0 0 30px rgba(246,201,14,0.05); position: relative; overflow: hidden;">
  <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at 50% 50%, rgba(246,201,14,0.15) 0%, transparent 70%); pointer-events: none;"></div>
  <div style="position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; justify-content: center;">
    <h3 style="color: #F6C90E; font-size: 24px; font-weight: 900; margin-top: 0; margin-bottom: 16px; font-family: 'Space Grotesk', sans-serif;">Top Up Aman dan Otomatis 24 Jam</h3>
    <p style="color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.6; margin: 0 0 24px 0; max-width: 500px;">
      Jangan ambil risiko. Gunakan layanan Koin Shop yang 100% legal, aman, dan diproses seketika tanpa perlu login.
    </p>
    <a href="/#store" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #F6C90E, #D99B2B); color: #090B12; text-decoration: none; font-weight: 800; font-size: 16px; border-radius: 12px; box-shadow: 0 8px 24px -2px rgba(246,201,14,0.35); text-transform: uppercase; letter-spacing: 1px; transition: transform 0.2s;">
      Top Up Sekarang
    </a>
  </div>
</div>
  `;

  try {
    const slug = 'bahaya-penipuan-top-up-game-ilegal';
    
    await query(
      `UPDATE articles SET content = $1 WHERE slug = $2`,
      [content, slug]
    );
    console.log('Article CTA updated successfully!');
  } catch (err) {
    console.error('Error updating article CTA:', err);
  } finally {
    process.exit(0);
  }
}

updateScamArticleCTA();
