"use client";

import { useState } from "react";
import Image from "next/image";
import StecuOrderModal from "./StecuOrderModal";

export default function StoreCards() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Royal Urban Card */}
        <div className="group relative flex flex-col items-center justify-between overflow-hidden rounded-2xl border border-[#F6C90E]/30 bg-[#111c33] p-8 text-center shadow-lg transition-all hover:-translate-y-1 hover:border-[#F6C90E]/80 hover:shadow-[0_0_35px_rgba(246,201,14,0.15)]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#F6C90E]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-[#111c33] outline outline-2 outline-[#F6C90E] shadow-xl">
              <Image
                src="/icon/royalurban_icon.jpeg"
                alt="Royal Urban Logo"
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-2">
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 px-3 py-1 text-xs font-semibold text-[#22c55e]">
                <span className="flex h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse"></span>
                Otomatis 24 Jam
              </span>
              <h2 className="text-2xl font-bold tracking-wide text-white">Royal Urban</h2>
              <p className="mt-2 text-sm text-white/70">
                Platform top up web otomatis. Checkout instan, pembayaran terintegrasi, langsung masuk tanpa tunggu admin.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-8 w-full">
            <a
              href="https://royalurban.net"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F6C90E] to-[#FBE36A] px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-[#0f172b] transition-all hover:opacity-90 hover:shadow-[0_0_20px_rgba(246,201,14,0.4)]"
            >
              Kunjungi Web Store
            </a>
          </div>
        </div>

        {/* Stecu Store Card */}
        <div className="group relative flex flex-col items-center justify-between overflow-hidden rounded-2xl border border-[#2563eb]/40 bg-[#111c33] p-8 text-center shadow-lg transition-all hover:-translate-y-1 hover:border-[#2563eb]/80 hover:shadow-[0_0_35px_rgba(37,99,235,0.15)]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#2563eb]/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-[#111c33] outline outline-2 outline-[#2563eb] shadow-xl bg-white">
              <Image
                src="/icon/stecu_logo.jpeg"
                alt="Stecu Store Logo"
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-2">
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/20 px-3 py-1 text-xs font-semibold text-[#60a5fa]">
                <span className="flex h-1.5 w-1.5 rounded-full bg-[#60a5fa]"></span>
                Promo Spesial WhatsApp
              </span>
              <h2 className="text-2xl font-bold tracking-wide text-white">Stecu Store</h2>
              <p className="mt-2 text-sm text-white/70">
                Pusat grosir dan penawaran spesial. Pesan langsung via WhatsApp dengan admin ramah & fast respon.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-8 w-full">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#3b82f6] px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-all hover:opacity-90 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
              Lihat Paket & Order
            </button>
          </div>
        </div>
      </div>

      <StecuOrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
