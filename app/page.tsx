import fs from "node:fs/promises";
import path from "node:path";
import HomePageClient, { type HeroSlide } from "./HomePageClient";

export const metadata = {
  title: 'Top Up Royal Dream Murah & Terpercaya | Koin Shop',
  description: 'Top up Royal Dream murah & instan di Koin Shop. Proses otomatis 24 jam, harga mulai Rp15.000, pembayaran QRIS & e-wallet. 10.000+ pelanggan puas. Order sekarang!',
  alternates: {
    canonical: 'https://koinshop.id',
  },
  openGraph: {
    title: 'Top Up Royal Dream Murah & Terpercaya | Koin Shop',
    description: 'Top up Royal Dream murah dan instan di koinshop.id. Harga termurah, proses otomatis 24 jam.',
    url: 'https://koinshop.id',
    siteName: 'Koin Shop',
    locale: 'id_ID',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const dynamic = "force-static";
export const revalidate = 86400; // Cache selama 1 hari (revalidate background)

const ACCENTS = [
  "from-[#2563eb]/30 via-[#0f172b] to-[#0b1120]",
  "from-[#1b4fa8]/35 via-[#111c33] to-[#0f172b]",
  "from-[#2563eb]/25 via-[#111c33] to-[#0b1120]",
] as const;

function titleFromFilename(filename: string) {
  const base = filename.replace(/\.[^.]+$/, "");
  const cleaned = base.replace(/[-_]+/g, " ").trim();
  if (!cleaned) return "Slide";
  return cleaned
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

import FeaturesSection from "../components/sections/FeaturesSection";
import TestimoniSection from "../components/sections/TestimoniSection";
import AboutSection from "../components/sections/AboutSection";
import SEOContentSection from "../components/sections/SEOContentSection";
import FAQSection from "../components/sections/FAQSection";
import ContactFooter from "../components/sections/ContactFooter";

export default async function Home() {
  const carouselDir = path.join(process.cwd(), "public", "carousel");
  let files: string[] = [];
  try {
    files = await fs.readdir(carouselDir);
  } catch {
    files = [];
  }

  const images = files
    .filter((name) => /\.(png|jpe?g|webp|gif)$/i.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));

  const slides: HeroSlide[] = images.map((name, index) => {
    let slideTitle = "";
    if (name.includes("image_1")) slideTitle = "Banner top up Royal Dream murah";
    else if (name.includes("image_2")) slideTitle = "Promo koin Royal Dream Koin Shop";
    else if (name.includes("image_3")) slideTitle = "Top up Royal Dream instan 2026";
    else slideTitle = "Harga diamond Royal Dream termurah";

    return {
      title: slideTitle,
      description: "",
      accent: ACCENTS[index % ACCENTS.length],
      image: `/carousel/${name}`,
    };
  });

  return (
    <main className="min-h-screen bg-base-color text-white">
      <HomePageClient slides={slides.length ? slides : []} />
      <FeaturesSection />
      <TestimoniSection />
      <AboutSection />
      <SEOContentSection />
      <FAQSection />
      <ContactFooter />
    </main>
  );
}
