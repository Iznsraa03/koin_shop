# Project Context: Koin Shop Integrated System

## 1. Executive Summary
Koin Shop adalah platform e-commerce top-up game (fokus saat ini: Royal Dream) yang sedang bertransisi dari landing page statis ke sistem terintegrasi yang dinamis.

## 2. Tech Stack & Architecture
Sistem menggunakan arsitektur decoupled:
- **Frontend (Current Focus):** Next.js 16, TypeScript, Tailwind CSS.
- **Backend:** Golang (GoFiber) dengan implementasi Goroutines untuk concurrency.
- **Database:** PostgreSQL.

## 3. Visual Identity (Strict Rules)
Setiap komponen UI wajib mengikuti skema warna berikut:
- **Background:** `#303841` (Deep Charcoal / Black)
- **Primary Accents:** Electric Blue (untuk komponen, border, & buttons)
- **Text:** White (Primary), Blue-400 (Secondary)
- **Typography:** Modern Sans-Serif (Inter/Roboto/Outfit)

## 4. Database Schema (PostgreSQL)

### A. Table: `products`
| Field | Type | Description |
| :--- | :--- | :--- |
| id | VARCHAR(50) | PK (ULID/UUID) |
| name | VARCHAR(100) | Product Name |
| price | DECIMAL(12,2)| Selling Price |
| gimmick_price | DECIMAL(12,2)| Discounted/Strike Price |
| chip_amount | INTEGER | Chip Value |
| image_url | TEXT | Product Image Path |
| created_at | TIMESTAMP | Creation Date |

### B. Table: `transactions`
| Field | Type | Description |
| :--- | :--- | :--- |
| id | VARCHAR(50) | PK (Order ID) |
| created_at | TIMESTAMP | Transaction Date |
| player_id | VARCHAR(50) | Game User ID |
| chip_description| TEXT | Purchased Product Info |
| amount | DECIMAL(12,2)| Total Amount Paid |
| status | ENUM | pending, success, failure |
| is_settled | BOOLEAN | Backend Process Status |

## 5. Development Roadmap
1.  **Phase 1 (Frontend):** Landing Page & Katalog Produk Dinamis (Next.js).
2.  **Phase 2 (Backend):** API Development (GoFiber) & DB Migration.
3.  **Phase 3 (Admin):** Integrated Dashboard (Next.js) & CRUD Management.

## 6. Development Rules
- **Token Efficiency:** Fokus langsung pada konteks prompt, hindari penjelasan yang bertele-tele.
- **Consistency:** Pastikan tema warna Hitam & Biru diterapkan di setiap komponen baru.
- **Clean Code:** Gunakan TypeScript untuk keamanan tipe data di frontend.