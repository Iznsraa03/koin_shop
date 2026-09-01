"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Check } from "lucide-react";

interface StecuOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRODUCTS = [
  { id: "100m", name: "100M", price: "8K", value: "100M - Rp 8.000" },
  { id: "200m", name: "200M", price: "15K", value: "200M - Rp 15.000" },
  { id: "300m", name: "300M", price: "21K", value: "300M - Rp 21.000" },
  { id: "400m", name: "400M", price: "28K", value: "400M - Rp 28.000" },
  { id: "500m", name: "500M", price: "33K", value: "500M - Rp 33.000" },
  { id: "600m", name: "600M", price: "39K", value: "600M - Rp 39.000" },
  { id: "700m", name: "700M", price: "46K", value: "700M - Rp 46.000" },
  { id: "800m", name: "800M", price: "55K", value: "800M - Rp 55.000" },
  { id: "900m", name: "900M", price: "60K", value: "900M - Rp 60.000" },
  { id: "1b", name: "1B", price: "65K", value: "1B - Rp 65.000" },
];

const SPECIAL_PRODUCTS = [
  { id: "10b", name: "10B+", price: "X64K", value: "10B+ (Rp 64.000/1B)" },
  { id: "30b", name: "30B+", price: "X63K", value: "30B+ (Rp 63.000/1B)" },
  { id: "500b", name: "500B+", price: "X62K", value: "500B+ (Rp 62.000/1B) 💯✅" },
];

export default function StecuOrderModal({ isOpen, onClose }: StecuOrderModalProps) {
  const [phone, setPhone] = useState("");
  const [gameId, setGameId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isMounted || !isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !gameId || !selectedProduct) return;

    const message = `👑WELCOME TO👑
    *STECU STORE*
=======================
*📌 ORDER ROYAL DREAM*
- ID Game: ${gameId}
- No HP: ${phone}
- Pilihan Paket: *${selectedProduct}*

========================
*💳PAYMENT💳*
Saya akan melakukan konfirmasi & mengirim bukti transfer via chat ini.
(BCA / SEABANK / MANDIRI / DANA / QRIS)`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/6282345568812?text=${encodedMessage}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0f172b]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        className="relative flex w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-[#2563eb]/30 bg-[#111c33] shadow-2xl transition-all max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 overflow-hidden rounded-full border-2 border-[#F6C90E]">
              <Image 
                src="/icon/stecu_logo.jpeg" 
                alt="Stecu Store" 
                width={40} 
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h2 id="modal-title" className="text-lg font-bold text-white">Stecu Store</h2>
              <p className="text-xs text-[#22c55e]">Online • Fast Respon</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="rounded-full p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Tutup"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-5 custom-scrollbar">
          <form id="stecu-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* User Info Fields */}
            <div className="space-y-4">
              <div>
                <label htmlFor="gameId" className="mb-1.5 block text-sm font-medium text-white/90">
                  ID Game Royal Dream <span className="text-red-400">*</span>
                </label>
                <input 
                  type="text" 
                  id="gameId"
                  value={gameId}
                  onChange={(e) => setGameId(e.target.value)}
                  placeholder="Contoh: 12345678"
                  className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-2.5 text-white placeholder-white/30 outline-none transition-colors focus:border-[#F6C90E] focus:ring-1 focus:ring-[#F6C90E]/50"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-white/90">
                  Nomor Telepon / WhatsApp <span className="text-red-400">*</span>
                </label>
                <input 
                  type="tel" 
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-2.5 text-white placeholder-white/30 outline-none transition-colors focus:border-[#F6C90E] focus:ring-1 focus:ring-[#F6C90E]/50"
                  required
                />
              </div>
            </div>

            {/* Product Selection */}
            <div>
              <label className="mb-3 block text-sm font-medium text-white/90">
                Pilih Paket Royal Dream <span className="text-red-400">*</span>
              </label>
              
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {PRODUCTS.map((prod) => (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => setSelectedProduct(prod.value)}
                    className={`relative flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition-all ${
                      selectedProduct === prod.value 
                        ? "border-[#F6C90E] bg-[#F6C90E]/10" 
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                  >
                    <span className="font-semibold text-white">{prod.name}</span>
                    <span className="text-xs text-[#F6C90E]">{prod.price}</span>
                    {selectedProduct === prod.value && (
                      <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#F6C90E] text-black">
                        <Check size={10} strokeWidth={3} />
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#F6C90E]">🫵 Special Price 🫵</p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {SPECIAL_PRODUCTS.map((prod) => (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => setSelectedProduct(prod.value)}
                      className={`relative flex flex-col items-center justify-center rounded-lg border p-3 text-center transition-all ${
                        selectedProduct === prod.value 
                          ? "border-[#F6C90E] bg-gradient-to-b from-[#F6C90E]/20 to-[#F6C90E]/5" 
                          : "border-white/10 bg-white/5 hover:border-white/30"
                      }`}
                    >
                      <span className="text-lg font-bold text-white">{prod.name}</span>
                      <span className="mt-1 text-xs font-medium text-[#F6C90E]">{prod.price}</span>
                      {selectedProduct === prod.value && (
                        <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#F6C90E] text-black">
                          <Check size={10} strokeWidth={3} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="rounded-xl border border-[#2563eb]/20 bg-[#0f172b] p-4 text-sm">
              <h4 className="mb-2 font-bold text-white">💳 PAYMENT</h4>
              <p className="text-xs leading-relaxed text-white/70">
                Wajib konfirmasi terlebih dahulu ‼️<br/>
                <span className="text-red-400">⚠️ PERHATIAN ⚠️</span><br/>
                📌 Wajib mengirim bukti transfer via WhatsApp.<br/>
                <span className="font-medium text-white">TF Bank BCA / SeaBank / Mandiri / DANA & QRIS</span>
              </p>
            </div>

          </form>
        </div>

        {/* Footer / Actions */}
        <div className="border-t border-white/10 bg-[#0f172b] px-6 py-4">
          <button
            type="submit"
            form="stecu-form"
            disabled={!phone || !gameId || !selectedProduct}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#22c55e] px-4 py-3 font-bold text-white shadow-lg transition-all hover:bg-[#16a34a] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Pesan via WhatsApp
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
