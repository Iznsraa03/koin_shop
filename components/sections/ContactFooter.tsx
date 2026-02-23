const ContactFooter = () => {
  return (
    <footer id="contact" className="border-t border-[#F6C90E]/40 bg-[#303841] px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <div className="flex items-center gap-3 text-white">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#F6C90E]/50 bg-[#2b3541]">
            <img src="/logo.png" alt="Koin Shop" className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em]">Koin Shop</p>
            <p className="text-xs text-white/50">Top Up Game Instan</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-white/70">
          <a href="https://instagram.com" className="transition hover:text-[#F6C90E]" aria-label="Instagram">
            Instagram
          </a>
          <a href="https://wa.me/" className="transition hover:text-[#F6C90E]" aria-label="WhatsApp">
            WhatsApp
          </a>
          <a href="mailto:cs@coinshop.id" className="transition hover:text-[#F6C90E]" aria-label="Email">
            Email
          </a>
        </div>
        <p className="text-xs text-white/50">© 2026 Koin Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default ContactFooter;
