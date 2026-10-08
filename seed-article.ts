import { query } from './lib/db';

async function seedArticle() {
  console.log('Seeding article...');

  const articleData = {
    title: 'Cara Top Up Royal Dream Termurah, Aman, dan Langsung Masuk (2024)',
    slug: 'top-up-royal-dream-termurah',
    category: 'Panduan Top Up',
    tags: ['royal dream', 'top up royal dream', 'chip royal dream murah', 'koin royal dream'],
    author_name: 'Tim Koin Shop',
    featured_image: 'https://koinshop.id/images/banner-royal-dream.jpg', // You can change this later
    alt_image: 'Banner Top Up Royal Dream Koin Shop',
    excerpt: 'Panduan lengkap cara top up Royal Dream termurah, aman, dan instan via QRIS, DANA, dan e-wallet lainnya di Koin Shop. Proses cepat 24 jam!',
    content: `
<p>Bermain Royal Dream memang sangat seru, terutama saat kita sedang mengejar kemenangan besar. Namun, tak jarang koin kita habis di saat yang tidak tepat. Jika Anda mencari cara untuk <strong>top up koin Royal Dream termurah</strong> dan cepat, Anda berada di tempat yang tepat!</p>

<h2>Mengapa Memilih Koin Shop?</h2>
<p>Di luar sana ada banyak jasa top up, tapi tidak semuanya menawarkan kecepatan dan keamanan yang terjamin. Berikut adalah alasan mengapa pemain profesional selalu mempercayakan akun mereka kepada kami:</p>
<ul>
    <li><strong>Harga Paling Murah:</strong> Kami memberikan jaminan harga terbaik tanpa biaya admin tersembunyi.</li>
    <li><strong>Proses Otomatis (Instan):</strong> Tidak perlu menunggu admin membalas pesan. Begitu pembayaran selesai, sistem kami langsung mengirimkan koin ke akun Anda dalam hitungan detik!</li>
    <li><strong>Metode Pembayaran Lengkap:</strong> Mendukung QRIS (bisa dari semua bank dan e-wallet seperti DANA, OVO, Gopay, LinkAja, ShopeePay).</li>
</ul>

<h2>Panduan Langkah-demi-Langkah Top Up Royal Dream</h2>
<p>Proses pembelian koin sangat sederhana. Ikuti panduan praktis berikut ini:</p>
<ol>
    <li>Kunjungi halaman beranda <strong>Koin Shop</strong> dan pilih ikon game Royal Dream.</li>
    <li>Masukkan <strong>ID Pengguna (User ID)</strong> Anda dengan benar. <em>(Pastikan tidak salah ketik agar koin tidak nyasar!)</em></li>
    <li>Pilih <strong>nominal koin</strong> yang Anda butuhkan (Tersedia mulai dari 500M hingga 10B).</li>
    <li>Pilih metode pembayaran favorit Anda (contoh: QRIS).</li>
    <li>Selesaikan pembayaran, lalu koin akan otomatis masuk ke akun Anda.</li>
</ol>

<p>Sangat mudah, bukan? Jangan biarkan keseruan bermain Anda terhenti hanya karena kehabisan koin. Segera isi ulang dan raih kemenangan maksimal Anda hari ini!</p>
`,
    seo_title: 'Cara Top Up Royal Dream Termurah, Aman, dan Langsung Masuk (2024)',
    meta_description: 'Panduan lengkap cara top up Royal Dream termurah, aman, dan instan via QRIS, DANA, dan e-wallet lainnya di Koin Shop. Proses cepat 24 jam!',
    canonical_url: 'https://koinshop.id/artikel/top-up-royal-dream-termurah',
    is_indexed: true,
    status: 'published',
    main_question: 'Bagaimana cara top up koin Royal Dream termurah dan tercepat?',
    direct_answer: 'Anda dapat melakukan top up koin Royal Dream termurah melalui Koin Shop dengan memasukkan ID pengguna, memilih nominal koin yang diinginkan, dan menyelesaikan pembayaran via QRIS atau e-wallet. Koin akan masuk secara otomatis dalam hitungan detik.',
    key_takeaways: [
      'Pilih agen top up resmi dan terpercaya seperti Koin Shop untuk menghindari akun terkena ban atau penipuan.',
      'Tersedia berbagai pilihan nominal koin mulai dari 500M hingga 10B.',
      'Mendukung pembayaran 24 jam nonstop dengan proses otomatis dan instan.'
    ],
    main_entity: 'Top Up Royal Dream',
    faqs: [
      {
        question: 'Berapa lama proses koin masuk ke akun saya?',
        answer: 'Proses masuknya koin sangat instan (kurang dari 1 menit) setelah pembayaran Anda berhasil dikonfirmasi oleh sistem otomatis kami.'
      },
      {
        question: 'Apakah top up di Koin Shop aman dan anti ban?',
        answer: '100% aman. Kami adalah penyedia top up legal dan menggunakan jalur resmi, sehingga akun Anda dipastikan terhindar dari pemblokiran (banned).'
      },
      {
        question: 'Bagaimana jika koin belum masuk setelah bayar?',
        answer: 'Jika dalam 5 menit koin belum masuk, Anda dapat menghubungi Customer Service Koin Shop yang siap siaga 24/7 melalui tombol WhatsApp di pojok layar. Sertakan Nomor Invoice (Pesanan) Anda.'
      }
    ],
    cta_text: 'Isi Koin Royal Dream Sekarang!',
    cta_url: '/#store',
    schema_type: 'Article',
  };

  try {
    // Check if exists
    const check = await query('SELECT id FROM articles WHERE slug = $1', [articleData.slug]);
    
    if (check.rows.length > 0) {
      console.log('Updating existing article...');
      const id = check.rows[0].id;
      await query(
        `UPDATE articles SET 
          title = $1, category = $2, tags = $3, author_name = $4, featured_image = $5, alt_image = $6, 
          excerpt = $7, content = $8, seo_title = $9, meta_description = $10, canonical_url = $11, 
          is_indexed = $12, status = $13, main_question = $14, direct_answer = $15, key_takeaways = $16, 
          main_entity = $17, faqs = $18, cta_text = $19, cta_url = $20, schema_type = $21, updated_at = CURRENT_TIMESTAMP
         WHERE id = $22`,
        [
          articleData.title, articleData.category, articleData.tags, articleData.author_name, articleData.featured_image, articleData.alt_image,
          articleData.excerpt, articleData.content, articleData.seo_title, articleData.meta_description, articleData.canonical_url,
          articleData.is_indexed, articleData.status, articleData.main_question, articleData.direct_answer, articleData.key_takeaways,
          articleData.main_entity, JSON.stringify(articleData.faqs), articleData.cta_text, articleData.cta_url, articleData.schema_type,
          id
        ]
      );
      console.log('Update successful!');
    } else {
      console.log('Inserting new article...');
      await query(
        `INSERT INTO articles (
          title, slug, category, tags, author_name, featured_image, alt_image, excerpt, content, seo_title, meta_description,
          canonical_url, is_indexed, status, main_question, direct_answer, key_takeaways, main_entity, faqs, cta_text, cta_url, schema_type
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22
        )`,
        [
          articleData.title, articleData.slug, articleData.category, articleData.tags, articleData.author_name, articleData.featured_image, articleData.alt_image,
          articleData.excerpt, articleData.content, articleData.seo_title, articleData.meta_description, articleData.canonical_url,
          articleData.is_indexed, articleData.status, articleData.main_question, articleData.direct_answer, articleData.key_takeaways,
          articleData.main_entity, JSON.stringify(articleData.faqs), articleData.cta_text, articleData.cta_url, articleData.schema_type
        ]
      );
      console.log('Insert successful!');
    }
  } catch (err) {
    console.error('Error seeding article:', err);
  } finally {
    process.exit(0);
  }
}

seedArticle();
