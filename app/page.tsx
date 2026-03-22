import fs from "node:fs/promises";
import path from "node:path";
import HomePageClient, { type HeroSlide } from "./HomePageClient";

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

  return <HomePageClient slides={slides.length ? slides : []} />;
}
