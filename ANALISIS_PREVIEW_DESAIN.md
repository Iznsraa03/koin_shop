# Laporan Analisis: Preview Desain vs Project Koin Shop Saat Ini

## 1. Pendahuluan
Dokumen ini berisi analisis terhadap file `preview desain website koin shop.html` dan perbandingannya dengan struktur tampilan pada project Next.js Koin Shop saat ini. Selain itu, terdapat analisis dan rekomendasi penyelarasan konten pada file HTML preview untuk meningkatkan optimasi mesin pencari (SEO).

---

## 2. Perbandingan Tampilan & Struktur (Preview HTML vs Current Project)

| Aspek                 | Preview HTML (`preview desain website koin shop.html`)                                                                             | Current Project (Next.js App Router)                                                                                  |
| :----------------------| :-----------------------------------------------------------------------------------------------------------------------------------| :----------------------------------------------------------------------------------------------------------------------|
| **Teknologi Styling** | Menggunakan CSS Native murni dengan CSS Variables (`--bg`, `--yellow`, dll) yang disematkan langsung di dalam tag `<style>`.       | Menggunakan **Tailwind CSS** dengan konfigurasi warna custom (`bg-base-color`, dll).                                  |
| **Header / Navigasi** | Menggunakan navbar standar dengan efek *glassmorphism* (backdrop-filter) ketika di-scroll (`.site-header.scrolled`).               | Menggunakan komponen custom interaktif `PillNav` yang dinamis dan terintegrasi dengan animasi **GSAP**.               |
| **Hero Section**      | Berupa *grid layout* (teks kiri, gambar/banner statis kanan) dengan *kicker status* dan tombol aksi (CTA).                         | Menggunakan *Carousel/Slider* dinamis (`HeroSection`) yang membaca aset gambar dari folder public.                    |
| **Daftar Produk**     | Memiliki struktur `.product-layout` yang rapi (kombinasi grid daftar produk di kiri dan `.store-aside` / sidebar promo di kanan).  | Masih dalam tahap pengembangan layout produk (diasumsikan berada di rute `/store` atau menggunakan section terpisah). |
| **Komponen Tambahan** | Menampilkan *Trust Bar* (statistik kepercayaan), *Timeline Guide* (cara top-up), dan *Payment Marquee* (logo pembayaran berjalan). | Menggunakan komponen terpisah seperti `FeaturesSection`, `TestimoniSection`, `AboutSection`, `FAQSection`.            |
| **Animasi**           | Murni menggunakan transisi CSS sederhana (hover efek, sticky navbar).                                                              | Menggunakan *ScrollTrigger* (GSAP) dan Framer Motion untuk transisi dan efek *fade-up*/*scale-in*.                    |

**Kesimpulan Perbandingan:** 
Secara visual, tema *dark premium* dengan aksen kuning (`#ffd21a` vs `#F6C90E`) sangat selaras. Namun, implementasi desain baru ini membutuhkan konversi dari HTML/CSS Native ke struktur komponen React dengan Tailwind CSS jika ingin digabungkan sepenuhnya.

---

## 3. Penyelarasan Konten `shop.html` untuk SEO (Search Engine Optimization)

Untuk mempermudah SEO jika desain HTML preview ini akan diterapkan, berikut adalah analisis dan hal-hal yang perlu diselaraskan:

### A. Struktur Meta Tag & Title
- **Current State di Preview**: Sudah memiliki tag dasar seperti `<title>`, `<meta name="description">`, dan *Open Graph* (og:title, og:description).
- **Rekomendasi**: Pastikan *keyword* utama tertarget. Misalnya:
  - Title: `Top Up Royal Dream Murah, Cepat & Terpercaya | Koin Shop`
  - Meta Description: Pastikan panjangnya antara 150-160 karakter agar tidak terpotong di hasil pencarian.

### B. Hierarki Heading (H1, H2, H3)
- **Current State di Preview**: `<h1 >` berada di hero, `<h2>` untuk bagian promo/panduan, dan `<h3>` untuk nama produk/item panduan.
- **Rekomendasi**: 
  - Pastikan **hanya ada satu tag `<h1>`** dalam satu halaman (sudah diterapkan).
  - Teks pada `<h1 >` harus mengandung *Primary Keyword* (contoh: "Top Up Royal Dream Murah dan Cepat").
  - Sisipkan *Secondary Keywords* pada tag `<h2>` (contoh: "Cara Top Up Koin", "Daftar Harga Royal Dream").

### C. Penggunaan Tag Semantik HTML5
- **Current State di Preview**: Masih banyak menggunakan tag umum seperti `<div class="site-header">`, `<div class="nav">`, `<div class="hero">`.
- **Rekomendasi**: Ubah struktur *container* utama menggunakan tag semantik agar struktur dokumen lebih mudah dipahami crawler (Googlebot):
  - Ubah `<div class="site-header">` menjadi `<header class="site-header">`.
  - Ubah `<div class="nav">` menjadi `<nav class="nav">`.
  - Ubah `<div class="hero">`, `<div class="section">` menjadi `<section class="...">`.
  - Ubah `<div class="store-aside">` menjadi `<aside class="store-aside">`.
  - Gunakan `<main>` untuk membungkus konten inti di luar header dan footer.

### D. Optimasi Gambar (Image Alt-Text)
- **Current State di Preview**: Tag `<img>` yang ada di banner dan koin belum semuanya memiliki atribut `alt` yang deskriptif (misalnya gambar produk hanya menggunakan `<img src="...">`).
- **Rekomendasi**: Wajib menambahkan atribut `alt="..."` pada setiap tag gambar.
  - Contoh salah: `<img src="coin.png">`
  - Contoh benar: `<img src="coin.png" alt="Koin Royal Dream Kuning 1B">`

### E. Penambahan Schema Markup (JSON-LD) Khusus E-Commerce
- **Current State di Preview**: Sudah ada Schema Markup tipe `Organization` dan `WebSite`.
- **Rekomendasi**: Tambahkan Schema tipe `Product`, `Offer`, atau `AggregateRating` untuk produk Royal Dream. Ini memungkinkan munculnya **Rich Snippets** (seperti harga dan rating bintang) langsung di halaman pencarian Google, yang secara drastis meningkatkan persentase klik (CTR).

---

## 4. Langkah Selanjutnya (Next Steps)
Jika pengguna menyetujui:
1. **Konversi Kode**: Memindahkan struktur HTML statis dan CSS dari file preview ke dalam arsitektur Next.js (mengubah ke `.tsx` dan menggunakan Tailwind).
2. **Penerapan SEO**: Mengaplikasikan perubahan semantik (Header, Main, Section) dan penyempurnaan SEO secara langsung ke file produksi di folder `app/`.
3. **Integrasi Komponen**: Menggantikan komponen interaktif (seperti Header) dengan komponen Next.js yang sudah ada (`PillNav`), atau memperbarui `PillNav` sesuai desain preview.

*(Laporan ini dihasilkan tanpa melakukan eksekusi/perubahan kode pada sistem sesuai dengan permintaan awal).*
