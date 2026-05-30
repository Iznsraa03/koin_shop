import Link from "next/link";
import type { Metadata } from "next";
import { products } from "@/src/data/products";
import ProductCard from "@/components/ui/ProductCard";

export const metadata: Metadata = {
  title: "Produk Chip Royal Dream | Koin Shop",
  description:
    "Daftar lengkap paket chip Royal Dream murah dan instan. Beli chip Royal Dream 250K hingga 10 Juta dengan harga terbaik hanya di Koin Shop.",
  alternates: { canonical: "https://koinshop.id/produk" },
  robots: { index: true, follow: true },
};

export default function ProdukPage() {
  return (
    <main className="min-h-screen bg-[#0a1628] text-white">
      {/* Background grid pattern */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-2xl px-4 py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-gray-500">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-blue-400"
              >
                Home
              </Link>
            </li>
            <li className="text-gray-600">/</li>
            <li className="text-gray-300">Produk</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-2">
            <span className="h-5 w-1 rounded-full bg-[#2563eb]" />
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
              Royal Dream
            </p>
          </div>
          <h1 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">
            Katalog{" "}
            <span className="text-[#F6C90E]">Chip Royal Dream</span>
          </h1>
          <p className="text-sm text-gray-400">
            Pilih paket chip sesuai kebutuhan. Proses instan, harga terjamin.
          </p>
        </div>

        {/* Stats bar */}
        <div className="mb-6 flex items-center gap-4 rounded-xl border border-[#2563eb]/20 bg-[#0f1c35]/80 px-4 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
            <span className="text-xs text-gray-300">
              <span className="font-bold text-white">
                {products.length} Paket
              </span>{" "}
              Tersedia
            </span>
          </div>
          <div className="h-3 w-px bg-white/10" />
          <span className="text-xs text-gray-400">Update harga real-time</span>
        </div>

        {/* 2-Column Product Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-[#2563eb]/20 bg-gradient-to-br from-[#0f1c35] to-[#0a1628] p-6 text-center">
          <p className="text-sm font-semibold text-white">
            Tidak menemukan paket yang kamu cari?
          </p>
          <p className="text-xs text-gray-400">
            Hubungi kami untuk harga custom atau pembelian massal.
          </p>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-green-500/40 bg-green-500/10 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-green-400 transition-all hover:bg-green-500/20 hover:border-green-400"
          >
            <span>💬</span> Hubungi via WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
