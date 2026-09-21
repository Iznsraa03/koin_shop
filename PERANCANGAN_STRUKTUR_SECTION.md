# Perancangan Struktur Section & Fitur Koin Shop (Updated)

Dokumen ini memuat perancangan ulang arsitektur halaman utama (*Landing Page* / Beranda) Koin Shop. Struktur ini dirancang dengan prinsip **pemisahan fungsi (separation of concerns)**, di mana seluruh transaksi dan katalog produk lengkap berada di halaman khusus (`/store`), sedangkan beranda berfokus penuh pada **branding, edukasi alur top-up, social proof, dan optimasi SEO**.

---

## 1. Header (Navigasi Utama)
**Tujuan**: Memberikan navigasi cepat, branding kuat, dan akses langsung ke toko.
* **Komponen & Konten**:
  * **Logo Brand**: Koin Shop dengan alt-text deskriptif (SEO).
  * **Menu Navigasi**: Beranda, Cara Top Up, Keunggulan, Testimoni, FAQ.
  * **CTA Utama (Toko)**: Tombol kontras bertuliskan **"Kunjungi Toko / Top Up"** yang mengarahkan langsung ke rute `/store`.
  * **Aksi Tambahan**: Tombol "Cek Transaksi" / "Lacak Pesanan".

---

## 2. Hero Section (First Impression & Primary Keywords)
**Tujuan**: Menangkap perhatian pengunjung dalam 3 detik pertama dan menanamkan kata kunci utama (H1).
* **Komponen & Konten**:
  * **Headline Utama (H1)**: *"Top Up Royal Dream Murah, Cepat & Terpercaya 24 Jam"*.
  * **Sub-headline (p)**: Deskripsi singkat keunggulan harga, kecepatan proses, serta metode bayar lengkap.
  * **Status Kicker**: Badge hijau interaktif: *"Layanan Aktif & Otomatis 24/7"*.
  * **Primary CTA**: Tombol utama menonjol: **"Mulai Top Up Sekarang →"** (link ke `/store`).
  * **Secondary CTA**: Tombol outline: **"Pelajari Cara Top Up"** (smooth scroll ke section timeline panduan).
  * **Visual Hero**: Dynamic banner carousel promosi atau ilustrasi grafis koin bertema dark-gold premium.

---

## 3. Trust Bar & Payment Marquee
**Tujuan**: Membangun rasa aman dan kredibilitas instan bagi calon pelanggan baru.
* **Komponen & Konten**:
  * **Statistik Cepat**: Angka riil/perkiraan transaksi sukses (misal: *10.000+ Transaksi*, *Proses Rata-rata < 1 Menit*, *Rating Kepuasan 4.9/5*).
  * **Marquee Logo Pembayaran**: Animasi pita berjalan berisi logo resmi metode pembayaran yang didukung: QRIS, DANA, GoPay, OVO, ShopeePay, Transfer Bank.

---

## 4. Showcase Nominal Populer (Quick Teaser to Store)
**Tujuan**: Memberikan patokan harga murah tanpa membebani beranda dengan katalog transaksi lengkap.
* **Komponen & Konten**:
  * **Judul Section (H2)**: *"Pilihan Paket Koin Terpopuler"*.
  * **Deskripsi Singkat**: Memberitahu bahwa transaksi lengkap dan pilihan denominasi lainnya ada di toko resmi.
  * **3-4 Card Teaser Paling Laris**:
    * Ikon Koin 3D.
    * Nama Denominasi (Contoh: *1B Koin Emas*, *2B Koin Emas*, *5B Koin Emas*).
    * Label Badge (Contoh: *"Paling Laris"*, *"Best Value"*).
    * Informasi Harga Mulai Dari (transparan & kompetitif).
    * Tombol pada setiap card: **"Beli di Toko"** (langsung redirect ke `/store` dengan pre-select nominal jika memungkinkan).
  * **Bottom Store Banner / CTA**: Tombol lebar: **"Lihat Seluruh Pilihan Nominal di Toko Resmi →"** menuju `/store`.

---

## 5. Timeline Panduan Top Up (How It Works)
**Tujuan**: Mengedukasi pengguna tentang betapa mudah dan amannya bertransaksi di Koin Shop.
* **Komponen & Konten**:
  * **Judul Section (H2)**: *"Cara Mudah Top Up di Koin Shop"*.
  * **Visual Step-by-Step (Timeline UI)**:
    1. **Langkah 1: Kunjungi Toko & Masukkan ID**: Masukkan ID game Royal Dream Anda dengan benar di halaman toko.
    2. **Langkah 2: Tentukan Nominal Koin**: Pilih nominal koin yang Anda butuhkan sesuai kebutuhan.
    3. **Langkah 3: Pembayaran Instan**: Bayar mudah melalui scan QRIS atau e-wallet pilihan Anda.
    4. **Langkah 4: Koin Masuk Otomatis**: Sistem memproses pesanan otomatis 24 jam dalam hitungan detik.

---

## 6. Fitur & Nilai Tambah Layanan (Why Choose Us)
**Tujuan**: Memberikan alasan kuat mengapa harus memilih Koin Shop dibanding tempat lain.
* **Komponen & Konten**:
  * **Judul Section (H2)**: *"Mengapa Memilih Koin Shop?"*.
  * **Grid Keunggulan (Card)**:
    * **Proses Serba Otomatis 24 Jam**: Tanpa antre manual, sistem terintegrasi langsung.
    * **Jaminan Harga Termurah**: Penawaran rate koin terbaik dan promo berkala.
    * **Keamanan 100% Terjamin**: Legal, tanpa meminta password atau data sensitif akun.
    * **Bantuan CS Responsif**: Tim dukungan siap membantu jika ada kendala transaksi.

---

## 7. Testimoni Pelanggan (Social Proof)
**Tujuan**: Mengonfirmasi kepuasan pengguna sebelumnya untuk mendorong konversi.
* **Komponen & Konten**:
  * **Judul Section (H2)**: *"Ulasan Pelanggan Koin Shop"*.
  * **Card Testimoni**: Rating bintang 5, testimoni singkat, nama pembeli yang disamarkan (*misal: Rian***), dan keterangan waktu.
  * **Notification Toast (Fitur Interaktif)**: Popup kecil di pojok bawah yang sesekali menampilkan notifikasi transaksi sukses real-time.

---

## 8. SEO Content Section (Artikel Informasi & Keywords)
**Tujuan**: Memaksimalkan peringkat pencarian di Google dengan kata kunci long-tail tanpa merusak estetika UI.
* **Komponen & Konten**:
  * **Judul Sub-heading (H2 & H3)**: *"Pusat Layanan Top Up Game Royal Dream Terpercaya di Indonesia"*.
  * **Konten Teks Edukatif**: Ulasan tentang ekosistem game, tips keamanan bertransaksi, panduan memilih nominal koin, serta jaminan layanan Koin Shop.
  * **Penempatan**: Berada di area bawah sebelum FAQ sehingga tidak mengganggu user flow transaksi.

---

## 9. FAQ (Pertanyaan Umum & Kendala)
**Tujuan**: Mengurangi beban Customer Service dengan menjawab pertanyaan umum secara mandiri.
* **Komponen & Konten**:
  * **Judul Section (H2)**: *"Pertanyaan yang Sering Diajukan (FAQ)"*.
  * **Accordion Interaktif**:
    * *Berapa lama koin masuk setelah pembayaran berhasil?*
    * *Apakah aman top up di Koin Shop tanpa password?*
    * *Metode pembayaran apa saja yang tersedia?*
    * *Bagaimana jika salah memasukkan User ID saat transaksi?*

---

## 10. Footer (Navigasi Penutup & Legalitas)
**Tujuan**: Memberikan legalitas, kejelasan kontak, serta link navigasi pelengkap.
* **Komponen & Konten**:
  * **Identitas & Disclaimer**: Penjelasan singkat bahwa Koin Shop adalah penyedia layanan independen.
  * **Tautan Menu**: Halaman Toko (`/store`), Syarat & Ketentuan, Kebijakan Privasi, Hubungi Kami.
  * **Saluran Bantuan Resmi**: Tautan langsung ke WhatsApp/Telegram resmi CS Koin Shop.
  * **Copyright**: *"© 2026 Koin Shop. All Rights Reserved."*
