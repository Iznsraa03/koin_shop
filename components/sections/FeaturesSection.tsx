import AnimatedContent from "../AnimatedContent";

const FeaturesSection = () => {
  const features = [
    {
      title: "Top Up Instan",
      description: "Masuk game tanpa tunggu lama. Proses otomatis hanya hitungan detik.",
      icon: "/icon_features/topup_instan.svg",
    },
    {
      title: "Pembayaran Lengkap",
      description: "Dukung e-wallet, transfer bank, pulsa, hingga QRIS di satu tempat.",
      icon: "/icon_features/pembayaran_lengkap.svg",
    },
    {
      title: "Proses Cepat",
      description: "Checkout ringkas, verifikasi cepat, dan pesanan langsung diproses tanpa menunggu lama.",
      icon: "/icon_features/proses_cepat.svg",
    },
  ] as const;

  return (
    <section id="features" className="js-section bg-transparent flex min-h-screen items-start px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="js-fade-up mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[#F6C90E]/80">
            Top Up Game
          </p>
          <h2 className="mt-4 text-4xl font-extrabold uppercase tracking-[0.12em] text-white sm:text-5xl">
            Top Up Kilat, Aman, Pasti
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm uppercase tracking-[0.2em] text-white/60 sm:text-base">
            Beli item favorit tanpa ribet. Proses instan, pembayaran lengkap, dan transaksi lebih cepat.
          </p>
        </div>


        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <AnimatedContent
              key={feature.title}
              distance={100}
              direction="vertical"
              reverse={false}
              duration={0.8}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              scale={1}
              threshold={0.1}
              delay={index * 0.08}
            >
              <div className="rounded-2xl border border-[#F6C90E]/70 bg-[#111c33] p-6 shadow-[0_0_35px_rgba(246,201,14,0.18)]">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#F6C90E]/50 bg-[#162344]">
                  <span
                    aria-hidden="true"
                    className="h-6 w-6 bg-linear-to-br from-[#F6C90E] via-[#FBE36A] to-white drop-shadow-[0_0_18px_rgba(246,201,14,0.28)]"
                    style={{
                      WebkitMaskImage: `url(${feature.icon})`,
                      maskImage: `url(${feature.icon})`,
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                      maskPosition: "center",
                      WebkitMaskSize: "contain",
                      maskSize: "contain",
                    }}
                  />
                </div>
                <h3 className="text-lg font-semibold text-[#F6C90E]">{feature.title}</h3>
                <p className="mt-3 text-sm text-white/70">{feature.description}</p>
              </div>
            </AnimatedContent>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
