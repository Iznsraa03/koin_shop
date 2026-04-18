import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Koin Shop - Top Up Royal Dream Termurah",
    short_name: "Koin Shop",
    description:
      "Layanan top up koin Royal Dream termurah, tercepat, dan terpercaya. Proses instan 24 jam hanya di Koin Shop.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172b",
    theme_color: "#F6C90E",
    orientation: "portrait",
    scope: "/",
    lang: "id",
    categories: ["games", "shopping", "utilities"],
    icons: [
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
