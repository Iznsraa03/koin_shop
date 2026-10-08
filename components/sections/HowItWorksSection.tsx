"use client";

import AnimatedContent from "../AnimatedContent";

const steps = [
  {
    num: "1",
    title: "Kunjungi Toko & Masukkan ID",
    desc: "Buka halaman Store, lalu masukkan ID game Royal Dream Anda dengan benar pada kolom yang tersedia.",
  },
  {
    num: "2",
    title: "Tentukan Nominal Koin",
    desc: "Pilih nominal koin yang Anda butuhkan. Kami menyediakan berbagai pilihan mulai dari 500M hingga 10B.",
  },
  {
    num: "3",
    title: "Pilih Metode & Bayar",
    desc: "Selesaikan pembayaran secara aman menggunakan QRIS, e-wallet, atau transfer bank pilihan Anda.",
  },
  {
    num: "4",
    title: "Koin Masuk Otomatis",
    desc: "Sistem akan memproses pesanan 24 jam penuh. Koin langsung masuk ke akun Anda dalam hitungan detik.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="js-section relative bg-[#090b12] px-6 py-24 border-t border-white/5">
      {/* Background glow subtle */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[#F6C90E]/5 blur-[120px] rounded-full pointer-events-none opacity-50" />
      
      <div className="mx-auto max-w-5xl relative z-10">
        <AnimatedContent distance={30} delay={0.1}>
          <div className="mb-16 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[#F6C90E]/80">
              Panduan
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Cara Mudah Top Up di Koin Shop
            </h2>
          </div>
        </AnimatedContent>

        <div className="grid gap-12 lg:grid-cols-4 sm:grid-cols-2">
          {steps.map((step, index) => (
            <AnimatedContent
              key={index}
              distance={30}
              delay={0.1 * index}
              className="relative group"
            >
              {/* Connector line untuk desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-full h-[1px] bg-gradient-to-r from-[#F6C90E]/50 to-transparent" />
              )}
              
              <div className="flex flex-col items-center text-center gap-5">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#131827] border border-[#F6C90E]/30 shadow-[0_0_20px_rgba(246,201,14,0.1)] transition-all group-hover:scale-110 group-hover:border-[#F6C90E] group-hover:shadow-[0_0_30px_rgba(246,201,14,0.25)]">
                  <div className="absolute inset-2 rounded-full border border-dashed border-[#F6C90E]/20 animate-spin-slow" style={{ animationDuration: '8s' }} />
                  <span className="text-xl font-black text-[#F6C90E]">{step.num}</span>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#F6C90E] transition-colors">{step.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
