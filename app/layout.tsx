import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
    "Agen chip Royal Dream terpercaya",
    "Isi koin Royal Dream",
    "Harga chip Royal Dream terbaru",
    "Top up Royal Dream via Pulsa",
    "Jual chip Royal Dream murah",
    "Top up Royal Dream 24 jam",
    "Beli koin Royal Dream",
    "Chip Royal Dream termurah",
    "Koinshop id",
    "Top up Royal Dream Dana",
    "Top up Royal Dream QRIS",
    "Chip Royal Dream aman",
    "Royal Dream top up koinshop",
    "Situs top up Royal Dream terpercaya",
    "Beli koin emas Royal Dream",
    "koinshop.id",
    "top up game online Indonesia",
    "jual koin game murah",
    "top up Royal Dream GoPay",
    "top up Royal Dream OVO",
    "cara top up Royal Dream",
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
        url: "https://koinshop.id/og-image.png",
        width: 1200,
        height: 630,
        alt: "Koin Shop - Layanan Top Up Royal Dream Termurah & Terpercaya di Indonesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Koin Shop | TopUp Tercepat Termurah Indonesia",
    description: "Layanan top up game Royal Dream termurah, tercepat, dan terpercaya. Beli koin Royal Dream aman dan instan hanya di Koin Shop.",
    images: ["https://koinshop.id/og-image.png"],
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
        "alternateName": ["Top Up Royal Dream Termurah", "Koin Royal Dream Murah", "Koin Shop Royal Dream", "Top Up Game Koinshop", "koinshop.id"],
        "description": "Layanan top up game Royal Dream termurah, tercepat, dan terpercaya di Indonesia.",
        "publisher": {
          "@id": "https://koinshop.id/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://koinshop.id/?s={search_term_string}"
          },
          "query-input": "required name=search_term_string"
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
          "width": 512,
          "height": 512
        },
        "image": "https://koinshop.id/og-image.png",
        "description": "Platform Top Up Game dan Koin Royal Dream Terpercaya di Indonesia. Proses instan 24 jam, harga termurah, pembayaran lengkap.",
        "foundingDate": "2024",
        "areaServed": "ID",
        "knowsLanguage": "id",
        "sameAs": [
          "https://instagram.com/koinshop.id",
          "https://wa.me/",
          "https://www.tiktok.com/@koinshop.id"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "availableLanguage": "Indonesian",
          "contactOption": "TollFree",
          "areaServed": "ID"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "312",
          "bestRating": "5",
          "worstRating": "1"
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
      },
      {
        "@type": "Service",
        "@id": "https://koinshop.id/#service",
        "name": "Top Up Royal Dream",
        "provider": { "@id": "https://koinshop.id/#organization" },
        "serviceType": "Digital Game Currency Top Up",
        "description": "Layanan top up koin emas Royal Dream dengan proses otomatis instan, harga termurah, dan berbagai metode pembayaran.",
        "areaServed": "ID",
        "availableChannel": {
          "@type": "ServiceChannel",
          "serviceUrl": "https://royalurban.net"
        }
      }
    ]
  };

  return (
    <html lang="id">
      <head>
        {/* JSON-LD Structured Data — inline, tidak blocking */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main>{children}</main>

        {/* Google Analytics — lazyOnload agar tidak blokir LCP/FID */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DE2572SFG1"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DE2572SFG1', { send_page_view: true });
          `}
        </Script>

        {/* Ahrefs Web Analytics — lazyOnload, tidak mempengaruhi LCP */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="82otEd0feS5ieZPfoKvd1A"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
