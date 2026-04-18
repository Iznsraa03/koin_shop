import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  poweredByHeader: false,
  compress: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
