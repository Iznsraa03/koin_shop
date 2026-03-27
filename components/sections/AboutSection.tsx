"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import AnimatedContent from "../AnimatedContent";

type ModalKey = "privasi" | "syarat" | "refund" | "faq" | null;

const faqsData = [
  {
    q: "Apakah top up Royal Dream di Koin Shop aman?",
    a: "Ya, semua transaksi diproses dengan sistem aman dan langsung ke akun game kamu.",
  },
  {
    q: "Berapa lama proses top up?",
    a: "Proses hanya beberapa detik setelah pembayaran berhasil.",
  },
  {
    q: "Metode pembayaran apa saja yang tersedia?",
    a: "Kami mendukung e-wallet, transfer bank, dan QRIS.",
  },
  {
    q: "Apakah tersedia layanan 24 jam?",
    a: "Ya, layanan Koin Shop aktif 24/7.",
  },
];

const modalContent: Record<Exclude<ModalKey, null>, { title: string; body: React.ReactNode }> = {
  privasi: {
    title: "Kebijakan Privasi",
    body: (
      <div className="space-y-4 text-sm text-white/70 leading-relaxed">
        <p>Koinshop.id berkomitmen untuk melindungi dan menjaga kerahasiaan data pribadi pelanggan.</p>
        <div>
          <p className="font-semibold text-white mb-1">1. Informasi yang Kami Kumpulkan</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>ID Game</li>
            <li>Nomor WhatsApp</li>
            <li>Alamat Email (jika diperlukan)</li>
            <li>Data transaksi pembayaran</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white mb-1">2. Penggunaan Informasi</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Memproses pesanan top up</li>
            <li>Menghubungi pelanggan terkait transaksi</li>
            <li>Meningkatkan kualitas layanan</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white mb-1">3. Perlindungan Data</p>
          <p>Kami menggunakan sistem keamanan dan enkripsi untuk menjaga data pelanggan agar tidak disalahgunakan.</p>
        </div>
        <div>
          <p className="font-semibold text-white mb-1">4. Pembagian Informasi</p>
          <p>Kami tidak menjual atau membagikan data pelanggan kepada pihak ketiga, kecuali diperlukan untuk proses pembayaran resmi.</p>
        </div>
        <div>
          <p className="font-semibold text-white mb-1">5. Perubahan Kebijakan</p>
          <p>Kebijakan ini dapat diperbarui sewaktu-waktu tanpa pemberitahuan sebelumnya.</p>
        </div>
        <p className="text-white/50 text-xs border-t border-white/10 pt-3">
          Dengan menggunakan layanan Koinshop.id, Anda dianggap telah membaca dan menyetujui kebijakan ini.
        </p>
      </div>
    ),
  },
  syarat: {
    title: "Syarat dan Ketentuan",
    body: (
      <div className="space-y-3 text-sm text-white/70 leading-relaxed">
        <p>Dengan melakukan transaksi di Koinshop.id, pelanggan dianggap telah menyetujui ketentuan berikut:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Koinshop.id adalah penyedia layanan top up pihak ketiga.</li>
          <li>Kami tidak berafiliasi secara resmi dengan publisher game Royal Dream.</li>
          <li>Pastikan ID game yang dimasukkan sudah benar sebelum melakukan pembayaran.</li>
          <li>Kesalahan input ID bukan tanggung jawab kami.</li>
          <li>Proses top up dilakukan secara otomatis atau manual sesuai sistem.</li>
          <li>Estimasi waktu proses dapat bervariasi tergantung kondisi server game.</li>
          <li>Kami berhak membatalkan transaksi jika terindikasi aktivitas mencurigakan.</li>
        </ol>
        <p className="text-white/50 text-xs border-t border-white/10 pt-3">
          Dengan melakukan pembelian, pelanggan setuju mengikuti semua ketentuan ini.
        </p>
      </div>
    ),
  },
  refund: {
    title: "Kebijakan Refund",
    body: (
      <div className="space-y-4 text-sm text-white/70 leading-relaxed">
        <div>
          <p className="font-semibold text-white mb-1">1. Refund berlaku apabila:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Terjadi kegagalan sistem dan saldo tidak masuk.</li>
            <li>Terjadi kesalahan teknis dari pihak kami.</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white mb-1">2. Refund tidak berlaku apabila:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Pelanggan salah memasukkan ID game.</li>
            <li>Akun game dalam kondisi suspend/banned.</li>
            <li>Gangguan berasal dari server game.</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white mb-1">3. Proses Refund</p>
          <p>Proses refund dilakukan maksimal 1x24 jam setelah verifikasi.</p>
        </div>
        <p className="text-white/50 text-xs border-t border-white/10 pt-3">
          Untuk klaim refund, silakan hubungi WhatsApp resmi kami dengan menyertakan bukti transaksi.
        </p>
      </div>
    ),
  },
  faq: {
    title: "FAQ Top Up Royal Dream",
    body: (
      <div className="space-y-4 text-sm text-white/70 leading-relaxed">
        {faqsData.map((item, i) => (
          <div key={i} className="border-b border-white/10 pb-3 last:border-0 last:pb-0">
            <p className="font-semibold text-white mb-1">Q: {item.q}</p>
            <p>A: {item.a}</p>
          </div>
        ))}
      </div>
    ),
  },
};

const AboutSection = () => {
  const [activeModal, setActiveModal] = useState<ModalKey>(null);

  const open = (key: Exclude<ModalKey, null>) => setActiveModal(key);
  const close = () => setActiveModal(null);

  return (
    <>
      <section id="about" className="js-section bg-transparent flex items-center px-6 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div className="js-fade-up space-y-6">
            <h2 className="text-3xl font-semibold text-white">Tentang Koin Shop</h2>
            <p className="text-white/70 leading-relaxed">
              Koin Shop adalah pusat top up Royal Dream terpercaya di Indonesia yang menyediakan
              layanan top up koin Royal Dream secara cepat, aman, dan transparan. Kami hadir khusus
              untuk para pemain Royal Dream yang membutuhkan layanan top up dengan harga murah dan
              proses instan tanpa ribet.
            </p>
            <p className="text-white/70 leading-relaxed">
              Dengan sistem otomatis dan monitoring real-time, setiap transaksi diproses secara
              langsung dan dikirim ke akun game kamu tanpa delay. Didukung layanan pelanggan 24/7,
              Koin Shop memastikan pengalaman top up Royal Dream yang praktis, efisien, dan
              terpercaya.
            </p>
            {/* Tombol Kebijakan */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => open("privasi")}
                className="group relative overflow-hidden rounded-full border border-[#F6C90E]/50 bg-transparent px-6 py-3 text-sm font-semibold text-[#F6C90E] tracking-wide transition-all duration-300 hover:border-[#F6C90E] hover:text-[#0f172b] hover:shadow-[0_0_20px_rgba(246,201,14,0.35)] active:scale-95"
              >
                <span className="absolute inset-0 -translate-x-full bg-[#F6C90E] transition-transform duration-300 ease-out group-hover:translate-x-0 rounded-full z-0" />
                <span className="relative z-10">Kebijakan Privasi</span>
              </button>
              <button
                onClick={() => open("syarat")}
                className="group relative overflow-hidden rounded-full border border-[#F6C90E]/50 bg-transparent px-6 py-3 text-sm font-semibold text-[#F6C90E] tracking-wide transition-all duration-300 hover:border-[#F6C90E] hover:text-[#0f172b] hover:shadow-[0_0_20px_rgba(246,201,14,0.35)] active:scale-95"
              >
                <span className="absolute inset-0 -translate-x-full bg-[#F6C90E] transition-transform duration-300 ease-out group-hover:translate-x-0 rounded-full z-0" />
                <span className="relative z-10">Syarat & Ketentuan</span>
              </button>
              <button
                onClick={() => open("refund")}
                className="group relative overflow-hidden rounded-full border border-[#F6C90E]/50 bg-transparent px-6 py-3 text-sm font-semibold text-[#F6C90E] tracking-wide transition-all duration-300 hover:border-[#F6C90E] hover:text-[#0f172b] hover:shadow-[0_0_20px_rgba(246,201,14,0.35)] active:scale-95"
              >
                <span className="absolute inset-0 -translate-x-full bg-[#F6C90E] transition-transform duration-300 ease-out group-hover:translate-x-0 rounded-full z-0" />
                <span className="relative z-10">Kebijakan Refund</span>
              </button>
              <button
                onClick={() => open("faq")}
                className="group relative overflow-hidden rounded-full border border-[#F6C90E]/50 bg-transparent px-6 py-3 text-sm font-semibold text-[#F6C90E] tracking-wide transition-all duration-300 hover:border-[#F6C90E] hover:text-[#0f172b] hover:shadow-[0_0_20px_rgba(246,201,14,0.35)] active:scale-95"
              >
                <span className="absolute inset-0 -translate-x-full bg-[#F6C90E] transition-transform duration-300 ease-out group-hover:translate-x-0 rounded-full z-0" />
                <span className="relative z-10">FAQ</span>
              </button>
            </div>
          </div>
            <AnimatedContent
              distance={40}
              direction="vertical"
              reverse={false}
              duration={0.7}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              scale={1}
              threshold={0.1}
              delay={0}
              className="flex items-center justify-center"
            >
              <Image
                src="/logo.png"
                alt="Koin Shop"
                width={160}
                height={160}
                className="rovo-float-logo object-contain"
                loading="lazy"
              />
            </AnimatedContent>
        </div>
      </section>

      {/* Modal */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
          onClick={close}
        >
          <div
            className="relative w-full max-w-lg rounded-xl border border-[#F6C90E]/30 bg-base-color p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-base font-semibold text-[#F6C90E] uppercase tracking-wide">
                {modalContent[activeModal as Exclude<ModalKey, null>].title}
              </h3>
              <button
                onClick={close}
                className="text-white/40 hover:text-white transition text-xl leading-none"
                aria-label="Tutup"
              >
                ✕
              </button>
            </div>
            {/* Body */}
            <div className="max-h-[60vh] overflow-y-auto pr-1">
              {modalContent[activeModal as Exclude<ModalKey, null>].body}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutSection;

