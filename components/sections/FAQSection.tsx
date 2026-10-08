"use client";

import { useState } from "react";
import AnimatedContent from "../AnimatedContent";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Apakah top up Royal Dream di Koin Shop aman?",
    answer:
      "Ya, 100% aman. Koin Shop hanya menyediakan koin legal dari sumber resmi. Sistem kami terenkripsi dan memproses transaksi secara otomatis langsung ke ID game Anda. Ribuan pelanggan telah membuktikan keamanan layanan kami.",
  },
  {
    question: "Berapa lama proses top up Royal Dream?",
    answer:
      "Proses top up berlangsung instan, hanya dalam 5–30 detik setelah pembayaran terverifikasi. Sistem kami berjalan 24 jam penuh sehingga Anda bisa top up kapan saja tanpa harus menunggu admin.",
  },
  {
    question: "Metode pembayaran apa saja yang tersedia di Koin Shop?",
    answer:
      "Kami mendukung berbagai metode pembayaran populer: QRIS, Dana, OVO, GoPay, LinkAja, ShopeePay, Transfer Bank (BCA, BRI, BNI, Mandiri), serta Virtual Account. Pilih yang paling nyaman untuk Anda.",
  },
  {
    question: "Apakah ada minimal pembelian koin Royal Dream?",
    answer:
      "Tidak ada minimal pembelian yang ketat. Kami menyediakan berbagai pilihan paket mulai dari yang terjangkau hingga paket sultan. Sesuaikan dengan kebutuhan dan budget gaming Anda.",
  },
  {
    question: "Bagaimana jika koin tidak masuk setelah pembayaran?",
    answer:
      "Jika koin tidak masuk dalam 30 menit setelah pembayaran berhasil, segera hubungi CS kami via WhatsApp dengan menyertakan bukti pembayaran. Kami akan memproses refund atau mengirim ulang koin dalam waktu 1x24 jam.",
  },
  {
    question: "Apakah top up di Koin Shop bisa menyebabkan akun banned?",
    answer:
      "Tidak. Koin Shop menggunakan metode top up resmi melalui platform game langsung, sehingga akun Anda aman dari risiko banned. Kami tidak menggunakan bot, hack, atau metode ilegal apapun.",
  },
  {
    question: "Apakah Koin Shop melayani pembelian dalam jumlah besar (grosir)?",
    answer:
      "Ya! Kami melayani pembelian grosir dengan harga spesial dan lebih hemat. Hubungi CS kami via WhatsApp untuk mendapatkan penawaran harga grosir koin Royal Dream terbaik.",
  },
  {
    question: "Cara mengetahui ID game Royal Dream saya?",
    answer:
      "ID game Royal Dream Anda dapat ditemukan di profil akun dalam game. Buka aplikasi Royal Dream → klik foto profil → ID Anda akan tertera di bagian atas. Pastikan memasukkan ID yang benar sebelum melakukan pembayaran.",
  },
];

// JSON-LD FAQ schema untuk Rich Results Google
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="faq"
      className="js-section bg-transparent px-6 py-20 border-t border-white/5"
      aria-label="FAQ Top Up Royal Dream"
    >
      {/* Inject JSON-LD FAQPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto max-w-3xl">
        <AnimatedContent distance={30} delay={0.1}>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-[#F6C90E] sm:text-4xl">
              Pertanyaan yang Sering Ditanyakan
            </h2>
            <p className="mt-3 text-sm text-white/50">
              FAQ seputar top up Royal Dream di Koin Shop
            </p>
          </div>
        </AnimatedContent>

        <div className="flex flex-col gap-[14px]">
          {faqs.map((faq, i) => {
            const isActive = openIndex === i;
            return (
              <AnimatedContent key={i} distance={20} delay={0.05 * i}>
                <div 
                  className={`rounded-[18px] border overflow-hidden transition-all duration-300 ease-in-out ${
                    isActive 
                      ? 'border-[#F6C90E]/30 bg-[#171d2d] shadow-[0_14px_34px_rgba(0,0,0,0.2)]' 
                      : 'border-white/[0.08] bg-[#131827] hover:border-white/[0.15]'
                  }`}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between p-5 md:p-[24px] bg-transparent border-none text-left cursor-pointer"
                    aria-expanded={isActive}
                    aria-controls={`faq-answer-${i}`}
                    id={`faq-question-${i}`}
                  >
                    <span className="text-white text-[15px] md:text-[16px] font-bold leading-snug pr-4">
                      {faq.question}
                    </span>
                    <span 
                      className={`flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-[18px] transition-all duration-300 ease-in-out ${
                        isActive 
                          ? 'bg-[#F6C90E]/15 text-[#ffdf8a] rotate-45' 
                          : 'bg-white/5 text-[#ffdf8a]'
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    className={`transition-all duration-300 ease-in-out px-5 md:px-[24px] ${
                      isActive 
                        ? 'max-h-[500px] opacity-100 pb-[24px]' 
                        : 'max-h-0 opacity-0 pb-0 overflow-hidden'
                    }`}
                  >
                    <p className="text-[#aab2c5] text-[14px] leading-[1.7] m-0">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </AnimatedContent>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
