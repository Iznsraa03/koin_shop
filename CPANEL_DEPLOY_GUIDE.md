# Panduan Deploy di cPanel (Next.js Static Export)

Panduan ini menyiapkan project agar bisa di-upload ke cPanel sebagai aplikasi Node.js sederhana yang melayani hasil static export (`out/`).

## 1) Persiapan lokal
1. Install dependency:
   ```bash
   npm install
   ```
2. Build & export:
   ```bash
   npm run export
   ```
   Folder `out/` akan berisi hasil static export.

## 2) Upload ke cPanel
1. Buat folder project di File Manager (misalnya `coin_shop`).
2. Upload semua file berikut:
   - `server.js`
   - `package.json`
   - `package-lock.json`
   - Folder `out/` (beserta isinya)

> Penting (static upload ke `public_html`): jika kamu meng-upload isi `out/` langsung ke `public_html`, pastikan file `.htaccess` ikut ada di `public_html/.htaccess` untuk memperbaiki MIME type asset seperti `/_next/static/*.js`.
3. Pastikan struktur di server:
   ```
   coin_shop/
   ├─ server.js
   ├─ package.json
   ├─ package-lock.json
   └─ out/
   ```

## 3) Setup Node.js App di cPanel
1. Masuk ke **Setup Node.js App**.
2. Klik **Create Application**.
3. Isi:
   - **Node.js version**: pilih versi LTS terbaru (misalnya 18+).
   - **Application mode**: Production.
   - **Application root**: `coin_shop`
   - **Application startup file**: `server.js`
4. Klik **Create**.

## 4) Install dependency di server
1. Pada halaman **Setup Node.js App**, buka terminal atau **Run NPM Install**.
2. Jalankan:
   ```bash
   npm install --production
   ```

## 5) Jalankan aplikasi
1. Di halaman **Setup Node.js App**, klik **Restart**.
2. Akses domain/subdomain yang diarahkan ke app tersebut.

## Catatan
- Karena memakai `output: "export"`, build menghasilkan static site, sehingga server hanya bertugas menyajikan file `out/`.
- Jika melakukan perubahan kode, ulangi `npm run export` secara lokal lalu upload ulang folder `out/`.
