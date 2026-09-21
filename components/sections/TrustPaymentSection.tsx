"use client";

import AnimatedContent from "../AnimatedContent";
import { CreditCard, Wallet, Smartphone, ShieldCheck, Zap } from "lucide-react";

const payments = [
  { name: "QRIS", icon: <Smartphone className="h-5 w-5" /> },
  { name: "DANA", icon: <Wallet className="h-5 w-5" /> },
  { name: "GoPay", icon: <Wallet className="h-5 w-5" /> },
  { name: "OVO", icon: <Wallet className="h-5 w-5" /> },
  { name: "ShopeePay", icon: <Wallet className="h-5 w-5" /> },
  { name: "Transfer Bank", icon: <CreditCard className="h-5 w-5" /> },
];

export default function TrustPaymentSection() {
  return (
    <section className="js-section relative overflow-hidden bg-transparent py-12 border-t border-b border-white/5">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          {/* Stats */}
          <AnimatedContent distance={30} delay={0.1}>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F6C90E]/10 text-[#F6C90E]">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">10.000+</p>
                  <p className="text-xs text-white/50 uppercase tracking-widest">Pelanggan Aktif</p>
                </div>
              </div>
              <div className="hidden sm:block w-px bg-white/10" />
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F6C90E]/10 text-[#F6C90E]">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">&lt; 1 Menit</p>
                  <p className="text-xs text-white/50 uppercase tracking-widest">Proses Rata-rata</p>
                </div>
              </div>
            </div>
          </AnimatedContent>

          {/* Marquee */}
          <AnimatedContent distance={30} delay={0.2} className="relative overflow-hidden w-full flex items-center">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0f172b] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0f172b] to-transparent z-10" />
            
            <div className="flex whitespace-nowrap overflow-hidden py-2" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
              <div className="animate-marquee flex gap-12 items-center w-max">
                {[...payments, ...payments, ...payments].map((payment, i) => (
                  <div key={i} className="flex items-center gap-2 text-white/40 grayscale transition-all hover:grayscale-0 hover:text-[#F6C90E]">
                    {payment.icon}
                    <span className="font-bold tracking-wider">{payment.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedContent>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}} />
    </section>
  );
}
