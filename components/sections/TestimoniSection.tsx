import AnimatedContent from "../AnimatedContent";
import CountUp from "../CountUp";

const TestimoniSection = () => {
  return (
    <section id="testimoni" className="js-section bg-transparent flexoke items-center justify-center px-6 py-24">
      <AnimatedContent
        distance={60}
        direction="vertical"
        reverse={false}
        duration={0.9}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        scale={1}
        threshold={0.2}
        delay={0.1}
      >
        <div className="flex flex-col items-center text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[#F6C90E]/80">
            Testimoni
          </p>
          <h3 className="mt-3 text-2xl font-bold uppercase tracking-[0.12em] text-white sm:text-3xl">
            Dipercaya oleh ribuan pelanggan
          </h3>
          <div className="mt-8 flex flex-col items-center gap-2">
            <span className="flex items-end gap-1 text-7xl font-extrabold leading-none text-[#F6C90E] drop-shadow-[0_0_24px_rgba(246,201,14,0.4)] sm:text-8xl">
              <CountUp
                from={0}
                to={4837}
                separator=","
                direction="up"
                duration={2}
                startWhen={true}
                className="tabular-nums"
              />
              <span className="text-5xl sm:text-6xl">+</span>
            </span>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.35em] text-white/60">
              Transaksi Berhasil
            </p>
          </div>
        </div>
      </AnimatedContent>
    </section>
  );
};

export default TestimoniSection;
