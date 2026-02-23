import AnimatedContent from "../AnimatedContent";

const AboutSection = () => {
  return (
    <section id="about" className="js-section bg-[#303841] flex items-center px-6 py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <div className="js-fade-up space-y-6">
          <h2 className="text-3xl font-semibold text-white">Tentang Koin Shop</h2>
          <p className="text-white/70">
            Koin Shop hadir untuk membuat top up game jadi cepat, aman, dan transparan. Kami
            mengutamakan proses instan, harga kompetitif, dan metode pembayaran lengkap agar kamu
            bisa fokus push rank tanpa hambatan.
          </p>
          <p className="text-white/70">
            Dengan sistem otomatis dan dukungan pelanggan 24/7, setiap transaksi diproses real-time
            dan dikonfirmasi langsung di akun game kamu.
          </p>
        </div>
        <AnimatedContent
          distance={100}
          direction="vertical"
          reverse={false}
          duration={0.8}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={1}
          threshold={0.1}
          delay={0}
          className="flex items-center justify-center"
        >
          <img
            src="/logo.png"
            alt="Koin Shop"
            className="h-40 w-40 object-contain drop-shadow-[0_0_35px_rgba(246,201,14,0.25)]"
          />
        </AnimatedContent>
      </div>
    </section>
  );
};

export default AboutSection;
