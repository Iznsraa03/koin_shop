import { query } from './lib/db';

async function updateArticleData() {
  console.log('Updating article to match exact dummy text...');

  const content = `
<p>Royal Dream memiliki sistem koin yang digunakan untuk berbagai kebutuhan di dalam permainan. Saat saldo koin mulai berkurang, pemain dapat melakukan top up dengan memilih nominal yang sesuai.</p>
<p>Hal paling utama adalah memastikan ID pemain benar, nominal sesuai kebutuhan, dan pembayaran dilakukan melalui metode yang tersedia.</p>

<h2 id="apa-itu-top-up">Apa itu Top Up Royal Dream?</h2>
<p>Top up Royal Dream adalah proses menambah saldo koin ke akun game. Setelah pembayaran berhasil diverifikasi, pesanan diproses sesuai data akun yang dimasukkan saat transaksi.</p>
<blockquote style="border-left-color: #F6C90E; background-color: #131827; padding: 10px 20px; border-radius: 0 10px 10px 0;">
  <strong>Pastikan data akun benar.</strong><br/>
  Periksa kembali ID pemain sebelum melakukan pembayaran. Kesalahan input ID dapat membuat pesanan masuk ke akun yang salah.
</blockquote>

<h2 id="cara-top-up">Cara Top Up Royal Dream</h2>
<p>Berikut alur transaksi yang dapat digunakan pada halaman top up.</p>
<ol>
  <li><strong>Masukkan ID Royal Dream</strong><br/>Isi ID akun dengan teliti sesuai data yang tampil di dalam game.</li>
  <li><strong>Pilih nominal koin</strong><br/>Pilih paket koin berdasarkan kebutuhan permainan dan anggaran.</li>
  <li><strong>Pilih metode pembayaran</strong><br/>Gunakan metode pembayaran yang tersedia pada halaman checkout.</li>
  <li><strong>Masukkan nomor WhatsApp</strong><br/>Nomor digunakan untuk informasi pesanan dan kebutuhan konfirmasi transaksi.</li>
  <li><strong>Selesaikan pembayaran</strong><br/>Bayar sesuai nominal transaksi dan instruksi yang tampil.</li>
  <li><strong>Cek status pesanan</strong><br/>Gunakan menu Cek Pesanan untuk melihat perkembangan transaksi.</li>
</ol>

<blockquote style="border-left-color: #F6C90E; background-color: #131827; padding: 20px; border-radius: 0 10px 10px 0; margin-top: 30px;">
  <strong style="display: block; font-size: 1.2rem; margin-bottom: 10px;">Butuh koin Royal Dream sekarang?</strong>
  <p style="margin-bottom: 15px;">Pilih nominal yang sesuai, masukkan ID akun, lalu lanjutkan pembayaran melalui halaman top up.</p>
  <a href="/store" style="display: inline-block; padding: 10px 20px; background-color: #F6C90E; color: #090B12; text-decoration: none; font-weight: bold; border-radius: 8px;">Mulai Top Up</a>
</blockquote>

<h2 id="metode-pembayaran">Metode Pembayaran</h2>
<p>Anda dapat menampilkan pilihan pembayaran seperti QRIS, transfer bank, e-wallet, dan metode lain yang sudah aktif di sistem transaksi website.</p>
<ul>
  <li><strong>QRIS</strong> untuk pembayaran cepat melalui aplikasi pembayaran yang mendukung QR.</li>
  <li><strong>Transfer bank</strong> untuk pengguna rekening bank.</li>
  <li><strong>E-wallet</strong> untuk transaksi dari dompet digital.</li>
  <li>Metode pembayaran lain sesuai payment gateway website.</li>
</ul>

<h2 id="tips-transaksi">Tips agar Transaksi Lebih Aman</h2>
<ul>
  <li>Periksa kembali ID pemain sebelum checkout.</li>
  <li>Gunakan metode pembayaran yang tersedia di halaman resmi.</li>
  <li>Simpan nomor atau kode pesanan setelah transaksi.</li>
  <li>Jangan memberikan PIN, password, atau kode OTP akun kepada siapa pun.</li>
  <li>Hubungi admin melalui kontak resmi jika transaksi belum masuk sesuai status pesanan.</li>
</ul>
  `;

  const faqs = [
    { question: 'Berapa lama proses top up Royal Dream?', answer: 'Waktu proses mengikuti status pembayaran dan sistem transaksi. Setelah pembayaran terverifikasi, pesanan masuk ke tahap pemrosesan.' },
    { question: 'Bagaimana jika salah memasukkan ID?', answer: 'Jika ID salah namun pesanan sudah terkirim, maka koin akan masuk ke ID tersebut. Pastikan untuk mengecek dua kali sebelum membayar.' },
    { question: 'Apakah perlu memberikan password akun?', answer: 'Tidak. Transaksi resmi Koin Shop hanya memerlukan ID Pengguna. Jangan pernah memberikan password kepada siapa pun.' },
    { question: 'Bagaimana cara mengecek pesanan?', answer: 'Anda dapat menggunakan menu Cek Pesanan di halaman utama kami dan memasukkan nomor transaksi Anda.' }
  ];

  try {
    await query(
      `UPDATE articles SET 
        title = $1, author_name = $2, content = $3, faqs = $4, updated_at = CURRENT_TIMESTAMP
       WHERE slug = $5`,
      [
        'Cara Top Up Royal Dream dengan Cepat dan Aman',
        'Royal Dream Guide',
        content,
        JSON.stringify(faqs),
        'top-up-royal-dream-termurah'
      ]
    );
    console.log('Update successful!');
  } catch (err) {
    console.error('Error updating article:', err);
  } finally {
    process.exit(0);
  }
}

updateArticleData();
