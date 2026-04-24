import fs from "node:fs/promises";
import path from "node:path";
import HomePageClient, { type HeroSlide } from "./HomePageClient";

export const metadata = {
  title: 'Koin Shop | Top Up Game Murah & Terpercaya Indonesia',
  description: 'Top up game murah, cepat, dan terpercaya di Indonesia. Tersedia Royal Dream, Mobile Legends, dan game lainnya. Proses instan 24 jam.',
  alternates: {
    canonical: 'https://koinshop.id',
  },
  openGraph: {
    title: 'Koin Shop | Top Up Game Murah & Terpercaya',
    description: 'Top up game murah dan instan di koinshop.id',
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

  const slides: HeroSlide[] = images.map((name, index) => ({
    title: titleFromFilename(name),
    description: "",
    accent: ACCENTS[index % ACCENTS.length],
    image: `/carousel/${name}`,
  }));

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
