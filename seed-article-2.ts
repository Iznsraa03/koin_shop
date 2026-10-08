import { query } from './lib/db';

async function seedSecondArticle() {
  console.log('Seeding second article (Scam Prevention)...');

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

<blockquote style="border-left-color: #F6C90E; background-color: #131827; padding: 15px 20px; border-radius: 0 10px 10px 0; margin: 25px 0;">
  <strong>Ingat baik-baik!</strong><br/>
  Layanan top up resmi dan profesional <strong>tidak akan pernah</strong> meminta password atau kode OTP akun Anda. Transaksi legal hanya membutuhkan ID Pemain atau User ID saja.
</blockquote>

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

<blockquote style="border-left-color: #F6C90E; background-color: #131827; padding: 20px; border-radius: 0 10px 10px 0; margin-top: 30px;">
  <strong style="display: block; font-size: 1.2rem; margin-bottom: 10px;">Top Up Aman dan Otomatis 24 Jam</strong>
  <p style="margin-bottom: 15px;">Jangan ambil risiko. Gunakan layanan Koin Shop yang 100% legal, aman, dan diproses seketika tanpa perlu login.</p>
  <a href="/store" style="display: inline-block; padding: 10px 20px; background-color: #F6C90E; color: #090B12; text-decoration: none; font-weight: bold; border-radius: 8px;">Top Up Sekarang</a>
</blockquote>
  `;

  const faqs = [
    { question: 'Apakah Koin Shop membutuhkan password untuk top up?', answer: 'Sama sekali tidak. Kami hanya membutuhkan User ID Anda. Sistem kami terhubung langsung secara resmi sehingga saldo bertambah tanpa perlu login.' },
    { question: 'Bagaimana jika saya sudah terlanjur memberikan password ke penipu?', answer: 'Segera ganti password Anda, aktifkan Autentikasi Dua Faktor (2FA), dan log out dari semua perangkat (Sign out all sessions) melalui pengaturan keamanan akun Anda.' },
    { question: 'Apakah koin yang sangat murah pasti penipuan?', answer: 'Sebagian besar ya. Jika harga koin jauh di bawah modal dasar developer, itu berindikasi penipuan atau pengisian ilegal yang bisa berujung banned.' },
    { question: 'Bagaimana cara memastikan sebuah website top up itu aman?', answer: 'Periksa metode pembayarannya. Website aman biasanya menggunakan QRIS atau Virtual Account resmi dari payment gateway, serta memiliki layanan Customer Service yang jelas.' }
  ];

  try {
    const slug = 'bahaya-penipuan-top-up-game-ilegal';
    
    // Check if it already exists
    const res = await query('SELECT id FROM articles WHERE slug = $1', [slug]);
    
    if (res.rows.length > 0) {
      // Update
      await query(
        `UPDATE articles SET 
          title = $1, excerpt = $2, content = $3, category = $4, tags = $5,
          seo_title = $6, meta_description = $7, main_question = $8,
          direct_answer = $9, key_takeaways = $10, faqs = $11, updated_at = CURRENT_TIMESTAMP
         WHERE slug = $12`,
        [
          'Bahaya Penipuan Top Up Game Ilegal: Cara Menghindari Scam',
          'Modus penipuan top up game semakin marak. Ketahui ciri-cirinya dan pelajari cara menghindari scam agar akun serta uang Anda tetap aman.',
          content,
          'Tips dan Trik',
          ['Penipuan', 'Keamanan', 'Scam', 'Tips', 'Akun Aman'],
          'Awas! Bahaya Penipuan Top Up Game Ilegal & Cara Mencegahnya',
          'Jangan sampai jadi korban scam! Pelajari ciri-ciri penipuan top up game ilegal dan panduan lengkap cara melindungi akun Anda dari hacker.',
          'Apa ciri utama penipuan top up game ilegal?',
          'Ciri utamanya adalah penawaran harga yang tidak masuk akal (terlalu murah), meminta password akun, dan meminta transfer dana ke rekening pribadi yang mencurigakan.',
          ['Hindari harga koin yang terlalu murah.', 'Jangan pernah berikan password atau OTP.', 'Gunakan agen resmi yang hanya meminta ID Game.', 'Waspadai link phishing (palsu).'],
          JSON.stringify(faqs),
          slug
        ]
      );
      console.log('Article updated successfully!');
    } else {
      // Insert
      await query(
        `INSERT INTO articles (
          title, slug, excerpt, content, category, tags, author_name, 
          status, seo_title, meta_description, is_indexed,
          main_question, direct_answer, key_takeaways, faqs
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
        )`,
        [
          'Bahaya Penipuan Top Up Game Ilegal: Cara Menghindari Scam',
          slug,
          'Modus penipuan top up game semakin marak. Ketahui ciri-cirinya dan pelajari cara menghindari scam agar akun serta uang Anda tetap aman.',
          content,
          'Tips dan Trik',
          ['Penipuan', 'Keamanan', 'Scam', 'Tips', 'Akun Aman'],
          'Koin Shop Security',
          'published',
          'Awas! Bahaya Penipuan Top Up Game Ilegal & Cara Mencegahnya',
          'Jangan sampai jadi korban scam! Pelajari ciri-ciri penipuan top up game ilegal dan panduan lengkap cara melindungi akun Anda dari hacker.',
          true,
          'Apa ciri utama penipuan top up game ilegal?',
          'Ciri utamanya adalah penawaran harga yang tidak masuk akal (terlalu murah), meminta password akun, dan meminta transfer dana ke rekening pribadi yang mencurigakan.',
          ['Hindari harga koin yang terlalu murah.', 'Jangan pernah berikan password atau OTP.', 'Gunakan agen resmi yang hanya meminta ID Game.', 'Waspadai link phishing (palsu).'],
          JSON.stringify(faqs)
        ]
      );
      console.log('Article inserted successfully!');
    }
  } catch (err) {
    console.error('Error seeding second article:', err);
  } finally {
    process.exit(0);
  }
}

seedSecondArticle();
