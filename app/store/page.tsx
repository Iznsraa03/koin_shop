import Link from "next/link";
import type { Metadata } from "next";
import StoreCards from "@/components/store/StoreCards";

export const metadata: Metadata = {
  title: "Pilih Store Top Up | Koin Shop",
  description:
    "Pilih platform top up Royal Dream Koin Shop. Tersedia layanan otomatis 24 jam via Royal Urban dan pesanan spesial grosir via Stecu Store WhatsApp.",
  alternates: { canonical: "https://koinshop.id/store" },
  robots: { index: true, follow: true },
};

export default function StorePage() {
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

      <div className="relative mx-auto max-w-4xl px-4 py-12 md:py-20">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs font-medium text-gray-500">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-[#F6C90E]">
                Home
              </Link>
            </li>
            <li className="text-gray-600">/</li>
            <li className="text-white/80">Store Selection</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F6C90E]/30 bg-[#F6C90E]/10 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-[#F6C90E] animate-pulse" />
            <p className="text-xs font-bold uppercase tracking-widest text-[#F6C90E]">
              Kemitraan Koin Shop
            </p>
          </div>
          <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            Pilih Platform <span className="text-[#F6C90E]">Top Up</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-400 md:text-base">
            Kami menyediakan dua metode pemesanan untuk kenyamanan Anda. Gunakan Royal Urban untuk transaksi web otomatis, atau hubungi admin Stecu Store untuk pesanan spesial grosir.
          </p>
        </div>

        {/* Store Cards Client Component */}
        <StoreCards />
        
        {/* Bottom Helper text */}
        <div className="mt-12 text-center">
          <p className="text-xs text-white/40">
            Koin Shop beroperasi sebagai penghubung layanan top up terpercaya. Seluruh transaksi dijamin keamanannya oleh platform mitra terkait.
          </p>
        </div>
      </div>
    </main>
  );
}
