import { notFound } from 'next/navigation'
import Link from 'next/link'
import { products, fetchSemuaProduk } from '../../../src/data/products'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

// SSG: pre-generate all product pages at build time
export async function generateStaticParams() {
  const produkList = await fetchSemuaProduk()
  return produkList.map((p) => ({ slug: p.slug }))
}

// Dynamic metadata per product page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const produk = products.find((p) => p.slug === params.slug)
  if (!produk) return {}

  return {
    title: `Top Up ${produk.name} Murah & Instan | Koin Shop`,
    description: `Top up ${produk.name} murah, cepat dan terpercaya di Koin Shop. ${produk.description} Mulai dari Rp ${produk.price.toLocaleString('id-ID')}. Proses otomatis 24 jam tanpa ribet.`,
    alternates: {
      canonical: `https://koinshop.id/produk/${produk.slug}`,
    },
    openGraph: {
      title: `Top Up ${produk.name} Murah | Koin Shop`,
      description: `Top up ${produk.name} instan di koinshop.id. Proses cepat, harga terjangkau.`,
      url: `https://koinshop.id/produk/${produk.slug}`,
      siteName: 'Koin Shop',
      locale: 'id_ID',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default function ProductPage({ params }: Props) {
  const produk = products.find((p) => p.slug === params.slug)
  if (!produk) notFound()

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Top Up ${produk.name}`,
    description: produk.description,
    brand: { '@type': 'Brand', name: 'Koin Shop' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'IDR',
      price: produk.price,
      availability: 'https://schema.org/InStock',
      url: `https://koinshop.id/produk/${produk.slug}`,
    },
  }

  const FAQ_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Berapa lama proses top up ${produk.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Proses top up ${produk.name} di Koin Shop berjalan otomatis dan biasanya selesai dalam 1-5 menit. Tersedia 24 jam sehari, 7 hari seminggu.`,
        },
      },
      {
        '@type': 'Question',
        name: `Metode pembayaran apa saja yang tersedia untuk top up ${produk.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Kami menerima berbagai metode pembayaran: Transfer Bank (BCA, Mandiri, BNI, BRI), dompet digital (GoPay, OVO, DANA, ShopeePay), dan gerai minimarket (Alfamart, Indomaret).',
        },
      },
      {
        '@type': 'Question',
        name: `Apakah top up ${produk.name} di Koin Shop aman?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Ya, Koin Shop adalah platform top up game resmi dan terpercaya. Telah melayani ribuan pelanggan dengan rating kepuasan tinggi. Transaksi dijamin aman dan terenkripsi.`,
        },
      },
    ],
  }

  const faqs = [
    {
      q: `Berapa lama proses top up ${produk.name}?`,
      a: `Proses top up ${produk.name} di Koin Shop berjalan otomatis dan biasanya selesai dalam 1-5 menit. Tersedia 24 jam sehari, 7 hari seminggu.`,
    },
    {
      q: `Metode pembayaran apa saja yang tersedia untuk top up ${produk.name}?`,
      a: 'Kami menerima berbagai metode pembayaran: Transfer Bank (BCA, Mandiri, BNI, BRI), dompet digital (GoPay, OVO, DANA, ShopeePay), dan gerai minimarket (Alfamart, Indomaret).',
    },
    {
      q: `Apakah top up ${produk.name} di Koin Shop aman?`,
      a: `Ya, Koin Shop adalah platform top up game resmi dan terpercaya. Telah melayani ribuan pelanggan dengan rating kepuasan tinggi. Transaksi dijamin aman dan terenkripsi.`,
    },
  ]

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

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

          {/* Hero / Product Header */}
          <section className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Top Up <span className="text-blue-400">{produk.name}</span> Murah & Instan
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Dapatkan {produk.name} dengan harga terjangkau mulai dari{' '}
              <strong className="text-white">Rp {produk.price.toLocaleString('id-ID')}</strong> di Koin Shop.
              {' '}{produk.description} Proses pembelian dilakukan secara otomatis sehingga{' '}
              item langsung masuk ke akun kamu dalam hitungan menit tanpa harus menunggu lama
              atau menghubungi admin. Koin Shop hadir untuk memastikan pengalaman top up game
              kamu lebih mudah, lebih cepat, dan lebih hemat. Semua transaksi diproses secara
              aman dengan enkripsi data penuh. Tersedia pilihan paket lengkap dari nominal
              kecil hingga besar untuk menyesuaikan kebutuhan gaming kamu setiap saat.
              Layanan tersedia selama 24 jam penuh, 7 hari seminggu, termasuk hari libur
              nasional. Tidak perlu khawatir kehabisan stok karena Koin Shop selalu menjaga
              ketersediaan item untuk kenyamanan pelanggan setia kami.
            </p>
          </section>

          {/* Cara Top Up */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-300">
              Cara Top Up {produk.name} di Koin Shop
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-300">
              <li>Kunjungi halaman produk <strong className="text-white">{produk.name}</strong> di koinshop.id.</li>
              <li>Masukkan <strong className="text-white">ID Game</strong> atau nomor akun kamu dengan benar.</li>
              <li>Pilih nominal atau paket yang sesuai dengan kebutuhan kamu.</li>
              <li>Pilih metode pembayaran yang tersedia (Bank Transfer, GoPay, OVO, dll).</li>
              <li>Lakukan pembayaran sesuai instruksi yang muncul di layar.</li>
              <li>Konfirmasi pembayaran dan tunggu proses otomatis berjalan.</li>
              <li>Item akan langsung masuk ke akun game kamu dalam 1–5 menit.</li>
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
          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-500 transition-colors text-white font-semibold px-8 py-3 rounded-xl"
            >
              Beli Sekarang →
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
