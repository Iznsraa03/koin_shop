import SplitText from "../SplitText";

interface HeroSlide {
  title: string;
  description: string;
  accent: string;
}

interface HeroSectionProps {
  slides: HeroSlide[];
  activeSlide: number;
  onSlideChange: (index: number) => void;
}

const HeroSection = ({ slides, activeSlide, onSlideChange }: HeroSectionProps) => {
  return (
    <section
      id="home"
      className="js-section relative flex min-h-screen flex-col items-center justify-center px-6 pt-32 pb-16 text-center"
    >
      <div className="max-w-4xl space-y-6">
        <div className="js-hero-reveal mx-auto grid w-full max-w-3xl gap-4 sm:grid-cols-[1.2fr,0.8fr] sm:items-center">
          <div className="space-y-3 text-left">
            <p className="js-hero-reveal text-xs uppercase tracking-[0.4em] text-[#F6C90E]/80">Highlight</p>
            <h3 className="js-hero-reveal text-xl font-semibold text-white sm:text-2xl">
              {slides[activeSlide].title}
            </h3>
            <p className="text-sm text-white/60">{slides[activeSlide].description}</p>
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`h-1.5 rounded-full transition-all ${
                    index === activeSlide ? "w-8 bg-[#F6C90E]" : "w-4 bg-white/30"
                  }`}
                  aria-label={`Slide ${index + 1}`}
                  onClick={() => onSlideChange(index)}
                />
              ))}
            </div>
          </div>
          <div
            className={`relative h-28 w-full overflow-hidden rounded-2xl border border-[#2563eb]/40 bg-gradient-to-br ${
              slides[activeSlide].accent
            } p-4`}
          >
            <div className="absolute right-4 top-4 h-10 w-10 rounded-full bg-[#F6C90E]/20" />
            <div className="absolute bottom-4 left-4 h-12 w-12 rounded-full border border-[#F6C90E]/30" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(246,201,14,0.18),transparent_60%)]" />
          </div>
        </div>
        <SplitText
          text="Top Up Game Cepat, Aman & Terpercaya"
          className="js-hero-reveal text-4xl font-semibold text-white sm:text-5xl lg:text-6xl"
          splitType="chars"
          ease="power3.out"
          duration={1.25}
        />
        <p className="js-hero-reveal text-base text-white/70 sm:text-lg">
          Koin Shop adalah solusi terbaik untuk top up item game favoritmu. Proses instan, harga bersahabat, dan pembayaran lengkap dalam satu platform.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
