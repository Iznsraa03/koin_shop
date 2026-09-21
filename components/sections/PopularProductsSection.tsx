"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedContent from "../AnimatedContent";

export default function PopularProductsSection() {
  // Ambil 4 produk terlaris sebagai teaser dari list Stecu
  const popularProducts = [
    { id: "500m", name: "Chip 500M", priceText: "Rp 33.000", badge: "Hemat", image: "/img/coin.png" },
    { id: "1b", name: "Chip 1B", priceText: "Rp 65.000", badge: "Terlaris", image: "/img/coin.png" },
    { id: "10b", name: "Chip 10B+", priceText: "Rp 64.000/1B", badge: "Grosir", image: "/img/coin.png" },
    { id: "500b", name: "Chip 500B+", priceText: "Rp 62.000/1B", badge: "Sultan", image: "/img/coin.png" },
  ];

  return (
    <section id="popular" className="js-section bg-transparent px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <AnimatedContent distance={30} delay={0.1}>
            <div className="text-center sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[#F6C90E]/80">
                Pilihan Terbaik
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Paket Koin Terpopuler
              </h2>
            </div>
          </AnimatedContent>
          <AnimatedContent distance={30} delay={0.2}>
            <Link
              href="/store"
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-[#F6C90E]/50 hover:text-[#F6C90E]"
            >
              Lihat Semua Nominal
            </Link>
          </AnimatedContent>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popularProducts.map((product, index) => (
            <AnimatedContent
              key={product.id}
              distance={40}
              delay={0.1 * index}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111c33]/80 p-6 transition-all hover:border-[#F6C90E]/50 hover:shadow-[0_10px_40px_-10px_rgba(246,201,14,0.15)]"
            >
              {product.badge && (
                <div className="absolute top-4 right-4 z-10 rounded-full bg-gradient-to-r from-[#F6C90E] to-[#FBE36A] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#0f172b]">
                  {product.badge}
                </div>
              )}
              
              <div className="relative mb-6 flex h-32 w-full items-center justify-center transition-transform duration-500 group-hover:scale-110">
                <div className="absolute inset-0 bg-[#F6C90E]/20 blur-3xl rounded-full scale-50 opacity-0 transition-opacity group-hover:opacity-100" />
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  width={100} 
                  height={100} 
                  className="relative z-10 object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] rounded-lg" 
                />
              </div>

              <div className="mt-auto flex flex-col gap-2">
                <h3 className="text-lg font-bold text-white">{product.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-[#F6C90E]">
                    {product.priceText}
                  </span>
                </div>
                
                <Link
                  href="/store"
                  className="mt-4 flex w-full items-center justify-center rounded-xl bg-white/5 py-3 text-sm font-bold text-white transition-all group-hover:bg-[#F6C90E] group-hover:text-[#0f172b]"
                >
                  Beli di Toko
                </Link>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
