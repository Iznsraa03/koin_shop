const ContactFooter = () => {
  return (
    <footer id="contact" className="border-t border-[#F6C90E]/40 bg-base-color/90 backdrop-blur px-6 pt-10 pb-6">
      <div className="mx-auto max-w-6xl flex flex-col gap-8">

        {/* 3 Kolom Utama */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

          {/* Kolom 1: Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#F6C90E]/50 bg-[#111c33]">
                <img src="/logo.png" alt="Koin Shop" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Koin Shop</p>
                <p className="text-xs text-white/50">Top Up Game Instan</p>
              </div>
            </div>
            <p className="text-xs text-white/40 leading-relaxed">
              Solusi top up game tercepat dan terpercaya. Proses instan, harga terjangkau, tersedia 24 jam.
            </p>
          </div>

          {/* Kolom 2: Sosial Media */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#F6C90E]">Ikuti Kami</p>
            <div className="flex flex-col gap-2">
              <a
                href="https://instagram.com"
                className="text-sm text-white/60 transition hover:text-[#F6C90E] w-fit"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <a
                href="https://wa.me/"
                className="text-sm text-white/60 transition hover:text-[#F6C90E] w-fit"
                aria-label="WhatsApp"
              >
                WhatsApp
              </a>
              <a
                href="mailto:cs@coinshop.id"
                className="text-sm text-white/60 transition hover:text-[#F6C90E] w-fit"
                aria-label="Email"
              >
                Email
              </a>
            </div>
          </div>

          {/* Kolom 3: Disclaimer */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#F6C90E]">Disclaimer</p>
            <p className="text-xs leading-relaxed text-white/40">
              Website ini menyediakan layanan pembelian koin dan item digital untuk kebutuhan game hiburan.
              Kami tidak terafiliasi dengan pengembang resmi dan tidak menyediakan layanan perjudian atau
              aktivitas ilegal dalam bentuk apa pun.
            </p>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-5">
          <p className="text-xs text-white/30">© 2026 Koin Shop. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default ContactFooter;
