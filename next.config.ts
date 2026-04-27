import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  poweredByHeader: false,
  compress: true,
  images: {
    unoptimized: true,
  },
  // Cache headers — efektif saat serve via Next.js server (bukan static export)
  // Untuk statik + Nginx, lihat konfigurasi nginx.conf terpisah
  async headers() {
    return [
      {
        // Aset statis Next.js dengan content hash — aman di-cache 1 tahun (immutable)
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Gambar carousel — cache 24 jam (bisa berubah, tapi tidak tiap jam)
        source: "/carousel/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, must-revalidate",
          },
        ],
      },
      {
        // Font dan logo — cache 1 tahun
        source: "/:path(.*\\.(?:woff2?|ttf|eot|otf))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Favicon dan icons — cache 7 hari
        source: "/:path(favicon\\.ico|apple-touch-icon.*\\.png|logo\\.png)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

