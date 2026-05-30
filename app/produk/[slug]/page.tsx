import { notFound } from 'next/navigation'
import Link from 'next/link'
import { products, fetchProducts } from '../../../src/data/products'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const produkList = await fetchProducts()
  return produkList.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const produk = products.find((p) => p.slug === params.slug)
  if (!produk) return {}

  const chipFormatted = produk.chip_amount >= 1000000
    ? `${(produk.chip_amount / 1000000).toFixed(0)} Juta`
    : `${(produk.chip_amount / 1000).toFixed(0)} Ribu`

  return {
    title: `Beli Chip Royal Dream ${chipFormatted} Murah | Koin Shop`,
    description: `Beli chip Royal Dream ${chipFormatted} mulai Rp ${produk.price.toLocaleString('id-ID')}. Harga terbaik, proses otomatis instan 24 jam. Hemat hingga ${Math.round(((produk.gimmick_price - produk.price) / produk.gimmick_price) * 100)}%.`,
    alternates: { canonical: `https://koinshop.id/produk/${produk.slug}` },
    openGraph: {
      title: `Chip Royal Dream ${chipFormatted} | Koin Shop`,
      description: `Harga chip Royal Dream ${chipFormatted} termurah hanya di koinshop.id. Instan & terpercaya.`,
      url: `https://koinshop.id/produk/${produk.slug}`,
      siteName: 'Koin Shop',
      locale: 'id_ID',
      type: 'website',
    },
    robots: { index: true, follow: true },
  }
}

export default function ProductPage({ params }: Props) {
  const produk = products.find((p) => p.slug === params.slug)
  if (!produk) notFound()

  const chipFormatted = produk.chip_amount >= 1000000
    ? `${(produk.chip_amount / 1000000).toFixed(0)} Juta`
    : `${(produk.chip_amount / 1000).toFixed(0)} Ribu`

  const discountPct = Math.round(
    ((produk.gimmick_price - produk.price) / produk.gimmick_price) * 100
  )

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Chip Royal Dream ${chipFormatted}`,
    description: `Chip Royal Dream ${chipFormatted} untuk game Royal Dream. Proses otomatis instan.`,
    brand: { '@type': 'Brand', name: 'Royal Dream' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'IDR',
      price: produk.price,
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
      url: `https://koinshop.id/produk/${produk.slug}`,
    },
  }

  const faqs = [
    {
      q: `Berapa lama proses top up chip Royal Dream ${chipFormatted}?`,
      a: 'Proses top up berjalan otomatis dan selesai dalam 1–5 menit. Tersedia 24 jam, 7 hari seminggu.',
    },
    {
      q: 'Metode pembayaran apa saja yang tersedia?',
      a: 'Transfer Bank (BCA, Mandiri, BNI, BRI), dompet digital (GoPay, OVO, DANA, ShopeePay), dan minimarket (Alfamart, Indomaret).',
    },
    {
      q: 'Apakah transaksi di Koin Shop aman?',
      a: 'Ya, Koin Shop telah melayani 10.000+ pelanggan. Transaksi terenkripsi penuh dan dijamin aman.',
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="min-h-screen bg-[#0b1120] text-white">
        <div className="max-w-4xl mx-auto px-4 py-10">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-400">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><span className="mx-1">/</span></li>
              <li><Link href="/produk" className="hover:text-blue-400 transition-colors">Produk</Link></li>
              <li><span className="mx-1">/</span></li>
              <li className="text-white font-medium">{produk.name}</li>
            </ol>
          </nav>

          {/* Product Header */}
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="rounded-full bg-[#2563eb]/20 border border-[#2563eb]/40 px-2.5 py-0.5 text-xs font-bold text-blue-400 uppercase tracking-widest">
                -{discountPct}% Hemat
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Chip Royal Dream <span className="text-[#F6C90E]">{chipFormatted}</span>
            </h1>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-extrabold text-white">
                Rp {produk.price.toLocaleString('id-ID')}
              </span>
              <span className="text-base text-gray-500 line-through">
                Rp {produk.gimmick_price.toLocaleString('id-ID')}
              </span>
            </div>
            <p className="text-gray-300 text-base leading-relaxed max-w-2xl">
              Dapatkan {produk.chip_amount.toLocaleString('id-ID')} chip Royal Dream dengan harga terjangkau di Koin Shop.
              Proses pembelian dilakukan secara otomatis sehingga chip langsung masuk ke akun kamu
              dalam hitungan menit. Layanan tersedia 24 jam penuh, 7 hari seminggu.
            </p>
          </section>

          {/* Cara Top Up */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-300">
              Cara Beli Chip Royal Dream {chipFormatted}
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-300">
              <li>Kunjungi halaman produk <strong className="text-white">Koin Shop</strong> dan pilih paket chip.</li>
              <li>Masukkan <strong className="text-white">Player ID</strong> akun Royal Dream kamu dengan benar.</li>
              <li>Pilih metode pembayaran yang tersedia.</li>
              <li>Lakukan pembayaran sesuai instruksi yang muncul.</li>
              <li>Chip langsung masuk ke akun kamu dalam 1–5 menit.</li>
            </ol>
          </section>

          {/* FAQ */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-6 text-blue-300">
              Pertanyaan Umum (FAQ)
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-[#111c33] rounded-xl p-5 border border-blue-900/40">
                  <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="text-center mt-8 flex flex-col items-center gap-3">
            <a
              href="https://royalurban.net"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#F6C90E] px-8 py-3 text-sm font-bold uppercase tracking-widest text-[#0a1628] shadow-[0_0_25px_rgba(246,201,14,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(246,201,14,0.45)]"
            >
              Beli Sekarang →
            </a>
            <Link href="/produk" className="text-sm text-gray-500 hover:text-blue-400 transition-colors">
              ← Kembali ke katalog produk
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
