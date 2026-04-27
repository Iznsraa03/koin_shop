import Image from "next/image";
import { useEffect } from "react";
import SplitText from "../SplitText";

interface HeroSlide {
  title: string;
  description: string;
  accent: string;
  image: string;
}

interface HeroSectionProps {
  slides: HeroSlide[];
  activeSlide: number;
  onSlideChange: (index: number) => void;
}

const HeroSection = ({ slides, activeSlide, onSlideChange }: HeroSectionProps) => {
  if (!slides.length) return null;

  // Preload next slide image to reduce delay on transition
  useEffect(() => {
    const nextIndex = (activeSlide + 1) % slides.length;
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'image';
    // Prefetch mobile version on small screens, desktop version otherwise
    link.href = window.innerWidth < 768
      ? slides[nextIndex].image.replace('.webp', '_mobile.webp')
      : slides[nextIndex].image;
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, [activeSlide, slides]);

  return (
    <section
      id="home"
      className="js-section relative flex min-h-screen items-center justify-center px-6 pt-32 pb-16"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div className="space-y-6 text-center lg:text-left">
          <SplitText
            tag="h1"
            text="Top Up Royal Dream Murah & Terpercaya di Indonesia"
            className="js-hero-reveal text-4xl font-semibold text-white sm:text-5xl lg:text-6xl"
            splitType="chars"
            ease="power3.out"
            duration={1.25}
          />
          <p className="js-hero-reveal text-base text-white/70 sm:text-lg">
            Nikmati layanan top up koin Royal Dream dengan proses instan, harga terbaik, dan pembayaran lengkap hanya di Koin Shop.
          </p>
          <div className="js-hero-reveal flex flex-wrap justify-center gap-4 pt-4 lg:justify-start">
            <a
              href="https://royalurban.net"
              className="inline-flex items-center justify-center rounded-full border border-[#F6C90E] bg-[#F6C90E] px-7 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-base-color shadow-[0_0_30px_rgba(246,201,14,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(37,99,235,0.35)]"
              aria-label="Order Sekarang"
              target="_blank"
              rel="noreferrer"
            >
              Order Disini!
            </a>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-4 lg:items-end">
          <div
            className={`relative w-full aspect-[3/2] overflow-hidden rounded-2xl border border-[#2563eb]/40 bg-linear-to-br ${slides[activeSlide].accent
              } p-2`}
          >
            {slides.map((slide, index) => {
              const isActive = index === activeSlide;
              const isFirst = index === 0;
              // Tentukan src yang tepat: mobile versi untuk <768px, desktop untuk yang lain
              // Karena ini server component (SSR), kita pakai src desktop secara default
              // dan biarkan browser memilih via sizes + srcset yang dihasilkan Next.js
              const mobileSrc = slide.image.replace('.webp', '_mobile.webp');
              // Compute final src sebelum JSX untuk menghindari duplicate prop
              const resolvedSrc = typeof window !== 'undefined' && window.innerWidth < 768
                ? mobileSrc
                : slide.image;
              return (
                <Image
                  key={slide.image}
                  src={resolvedSrc}
                  alt={slide.title}
                  fill
                  // sizes akurat: 100vw di mobile (<768px), 520px di desktop
                  sizes="(max-width: 768px) 100vw, 520px"
                  // Prioritaskan hanya slot pertama (LCP element)
                  priority={isFirst}
                  fetchPriority={isFirst ? 'high' : 'low'}
                  // Slide non-aktif dimuat lazy kecuali slide pertama
                  loading={isFirst ? 'eager' : 'lazy'}
                  decoding={isFirst ? 'sync' : 'async'}
                  className={`object-cover transition-opacity duration-500 ${
                    isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                />
              );
            })}
            <div className="absolute inset-0 bg-linear-to-t from-[#111827]/70 via-transparent to-transparent" />
          </div>
          <div className="flex justify-center gap-2 lg:justify-end">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`h-1.5 rounded-full transition-all ${index === activeSlide ? "w-8 bg-[#F6C90E]" : "w-4 bg-white/30"
                  }`}
                aria-label={`Slide ${index + 1}`}
                onClick={() => onSlideChange(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
