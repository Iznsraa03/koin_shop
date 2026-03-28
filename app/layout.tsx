import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#303841",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://koinshop.id"),
  title: {
    default: "Koin Shop | Top Up Royal Dream Termurah & Terpercaya",
    template: "%s | Koin Shop",
  },
  description: "Layanan top up game Royal Dream termurah, tercepat, dan terpercaya. Beli koin Royal Dream aman dan instan hanya di Koin Shop.",
  keywords: [
    "Top up Royal Dream",
    "Beli chip Royal Dream",
    "Royal Dream chip murah",
    "Koinshop Royal Dream",
    "Top up Royal Dream murah",
    "Cara beli chip Royal Dream",
    "Agen chip Royal Dream terpercaya",
    "Isi koin Royal Dream",
    "Royal Dream top up koinshop",
    "Harga chip Royal Dream terbaru",
    "Top up Royal Dream via Pulsa",
    "Top up Royal Dream Dana",
    "Top up Royal Dream Gopay",
    "Top up Royal Dream QRIS",
    "Jual chip Royal Dream murah",
    "Chip Royal Dream via LinkAja",
    "Top up Royal Dream 24 jam",
    "Tempat isi chip Royal Dream",
    "Royal Dream chip ungu murah",
    "Top up Royal Dream resmi",
    "Chip Royal Dream 1B murah",
    "Top up Royal Dream 200M",
    "Harga chip Royal Dream 500M",
    "Beli koin Royal Dream 2B",
    "Chip Royal Dream 5B termurah",
    "Top up koin emas Royal Dream",
    "Paket chip Royal Dream",
    "Promo koin Royal Dream hari ini",
    "Diskon top up Royal Dream",
    "Koin Royal Dream harga grosir",
    "Top up koin Royal Dream lewat ShopeePay",
    "Beli koin Royal Dream pakai OVO",
    "Cara top up koin Royal Dream di Koinshop",
    "Royal Dream chip koin emas",
    "Top up Royal Dream tercepat",
    "Chip Royal Dream termurah 2026",
    "Top up Royal Dream tanpa aplikasi",
    "Jasa isi koin Royal Dream",
    "Koin Royal Dream legal",
    "Top up Royal Dream id aman",
    "Situs top up Royal Dream terbaik",
    "Rekomendasi tempat beli chip Royal Dream",
    "Cara top up Royal Dream di Koinshop.id",
    "Koinshop id penipu atau tidak",
    "Testimoni koinshop top up Royal Dream",
    "Top up Royal Dream paling murah dimana",
    "Cara dapat chip Royal Dream murah",
    "Top up Royal Dream langsung masuk",
    "Chip Royal Dream aman anti banned",
    "Cara beli koin Royal Dream pakai pulsa Telkomsel",
    "Top up Royal Dream pulsa XL",
    "Top up Royal Dream pulsa Indosat",
    "Isi koin Royal Dream lewat Alfamart",
    "Isi koin Royal Dream lewat Indomaret",
    "Link top up Royal Dream resmi",
    "Website top up Royal Dream terpercaya",
    "Jual koin Royal Dream eceran",
    "Harga chip Royal Dream koinshop hari ini",
    "Top up Royal Dream login ID",
    "Chip Royal Dream murah meriah",
    "Update harga chip Royal Dream",
    "Event top up Royal Dream terbaru",
    "Royal Dream chip koin gratis",
    "Cara redeem code Royal Dream",
    "Kode promo Koinshop Royal Dream",
    "Top up Royal Dream bonus chip",
    "Cashback top up Royal Dream",
    "Cara beli chip Royal Dream via bank transfer",
    "Top up Royal Dream virtual account",
    "Jual koin Royal Dream via QRIS",
    "Topup Royal Dream",
    "Top up Royal Drem",
    "Beli chip Royal Dreams",
    "Roial Dream top up",
    "Koin shop Royal Dream",
    "Chip Royal Dream 1 Milyar",
    "Harga chip RD murah",
    "Top up RD via Koinshop",
    "Chip Royal Dream koin emas murah",
    "Tempat beli koin RD terpercaya",
    "Royal Dream top up game",
    "Top up game Royal Dream koinshop",
    "Chip Royal Dream harga kawan",
    "Agen resmi Royal Dream chip",
    "Distributor chip Royal Dream",
    "Top up koin Royal Dream paling cepat",
    "Cara isi saldo Royal Dream",
    "Top up Royal Dream pakai saldo dana",
    "Jual koin emas Royal Dream murah",
    "Daftar harga koin Royal Dream 2026",
    "Top up Royal Dream Jakarta",
    "Top up Royal Dream Surabaya",
    "Top up Royal Dream Medan",
    "Komunitas Royal Dream Indonesia top up",
    "Grosir chip Royal Dream murah",
    "Royal Dream top up promo gila",
    "Chip Royal Dream murah amanah",
    "Cara top up Royal Dream mudah dan murah",
    "Situs jual chip Royal Dream terlaris",
    "Koinshop top up game no 1"
  ],
  authors: [{ name: "Koin Shop" }],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png' }
    ]
  },
  creator: "Koin Shop",
  publisher: "Koin Shop",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Koin Shop | TopUp Tercepat Termurah Indonesia",
    description: "Layanan top up game Royal Dream termurah, tercepat, dan terpercaya. Beli koin Royal Dream aman dan instan hanya di Koin Shop.",
    url: "https://koinshop.id",
    siteName: "Koin Shop",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://koinshop.id/logo.png",
        width: 1200,
        height: 630,
        alt: "Koin Shop - Top Up Royal Dream",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Koin Shop | TopUp Tercepat Termurah Indonesia",
    description: "Layanan top up game Royal Dream termurah, tercepat, dan terpercaya. Beli koin Royal Dream aman dan instan hanya di Koin Shop.",
    images: ["https://koinshop.id/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://koinshop.id/#website",
        "url": "https://koinshop.id/",
        "name": "Koin Shop",
        "alternateName": ["Top Up Royal Dream Termurah", "Koin Royal Dream Murah", "Koin Shop Royal Dream", "Top Up Game Koinshop"],
        "description": "Layanan top up game Royal Dream termurah, tercepat, dan terpercaya.",
        "publisher": {
          "@id": "https://koinshop.id/#organization"
        },
        "inLanguage": "id-ID"
      },
      {
        "@type": "Organization",
        "@id": "https://koinshop.id/#organization",
        "name": "Koin Shop",
        "url": "https://koinshop.id/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://koinshop.id/logo.png",
          "width": 1200,
          "height": 630
        },
        "description": "Platform Top Up Game dan Koin Royal Dream Terpercaya di Indonesia.",
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "availableLanguage": "Indonesian"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Beranda Koin Shop",
            "item": "https://koinshop.id/"
          }
        ]
      }
    ]
  };

  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
