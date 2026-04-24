import Link from 'next/link'
import { products } from '../../src/data/products'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Semua Produk Top Up Game | Koin Shop',
  description: 'Daftar lengkap produk top up game murah di Koin Shop. Mobile Legends, Free Fire, PUBG Mobile dan banyak lagi. Proses instan 24 jam.',
  alternates: {
    canonical: 'https://koinshop.id/produk',
  },
  robots: { index: true, follow: true },
}

export default function ProdukPage() {
  return (
    <main className="min-h-screen bg-[#0b1120] text-white">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-400">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
            <li><span className="mx-1">/</span></li>
            <li className="text-white font-medium">Produk</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold mb-8">
          Semua <span className="text-blue-400">Produk Top Up</span> Game
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((produk) => (
            <Link
              key={produk.slug}
              href={`/produk/${produk.slug}`}
              className="bg-[#111c33] border border-blue-900/40 rounded-xl p-5 hover:border-blue-500 transition-colors group"
            >
              <h2 className="text-lg font-semibold mb-1 group-hover:text-blue-400 transition-colors">
                {produk.name}
              </h2>
              <p className="text-gray-400 text-sm mb-3">{produk.description}</p>
              <p className="text-blue-300 font-bold">
                Mulai Rp {produk.price.toLocaleString('id-ID')}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
