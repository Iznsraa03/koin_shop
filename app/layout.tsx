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
  title: {
    default: "Koin Shop | Top Up Royal Dream Termurah & Terpercaya",
    template: "%s | Koin Shop",
  },
  description: "Layanan top up game Royal Dream termurah, tercepat, dan terpercaya. Beli koin Royal Dream aman dan instan hanya di Koin Shop.",
  keywords: [
    "top up royal dream",
    "top up royal dream termurah",
    "top up koin royal dream",
    "beli chip royal dream",
    "chip royal dream murah",
    "koin royal dream murah",
    "jual koin royal dream termurah",
    "top up royal dream dana",
    "top up royal dream pulsa",
    "top up game murah",
    "koin shop royal dream",
    "royal dream termurah",
    "agen royal dream"
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
    title: "Koin Shop | Top Up Royal Dream Termurah",
    description: "Layanan top up game Royal Dream termurah, tercepat, dan terpercaya. Beli koin Royal Dream aman dan instan hanya di Koin Shop.",
    url: "https://koinshop.com",
    siteName: "Koin Shop",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Koin Shop | Top Up Royal Dream Termurah",
    description: "Layanan top up game Royal Dream termurah, tercepat, dan terpercaya. Beli koin Royal Dream aman dan instan hanya di Koin Shop.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Koin Shop",
    "alternateName": ["Top Up Royal Dream Termurah", "Koin Royal Dream Murah", "Koin Shop Royal Dream"],
    "url": "https://koinshop.com/",
    "description": "Layanan top up game Royal Dream termurah, tercepat, dan terpercaya."
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
