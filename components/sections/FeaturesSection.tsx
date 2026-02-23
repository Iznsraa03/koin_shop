import AnimatedContent from "../AnimatedContent";

const FeaturesSection = () => {
  const features = [
    {
      title: "Top Up Instan",
      description: "Masuk game tanpa tunggu lama. Proses otomatis hanya hitungan detik.",
    },
    {
      title: "Pembayaran Lengkap",
      description: "Dukung e-wallet, transfer bank, pulsa, hingga QRIS di satu tempat.",
    },
    {
      title: "Promo Harian",
      description: "Diskon dan bonus diamond untuk pelanggan setia setiap minggu.",
    },
  ];

  return (
    <section id="features" className="js-section bg-[#303841] flex min-h-screen items-center px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="js-fade-up mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[#F6C90E]/80">
            Top Up Game
          </p>
          <h2 className="mt-4 text-4xl font-extrabold uppercase tracking-[0.12em] text-white sm:text-5xl">
            Top Up Kilat, Aman, Pasti
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm uppercase tracking-[0.2em] text-white/60 sm:text-base">
            Beli item favorit tanpa ribet. Proses instan, pembayaran lengkap, dan dukungan 24/7.
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
              <div className="rounded-2xl border border-[#F6C90E]/70 bg-[#1f2731] p-6 shadow-[0_0_35px_rgba(246,201,14,0.18)]">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#F6C90E]/50 bg-[#2b3541]">
                  <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#F6C90E]">
                    TopUp
                  </span>
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
