import Link from "next/link";
import { Product } from "@/src/data/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const formatChip = (amount: number) => {
    if (amount >= 1000000) return `${(amount / 1000000).toFixed(0)} Juta`;
    if (amount >= 1000) return `${(amount / 1000).toFixed(0)} Ribu`;
    return amount.toString();
  };

  const formatRupiah = (amount: number) =>
    `Rp ${amount.toLocaleString("id-ID")}`;

  const discountPct = Math.round(
    ((product.gimmick_price - product.price) / product.gimmick_price) * 100
  );

  return (
    <Link
      href={`/produk/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#2563eb]/20 bg-[#0f1c35] transition-all duration-300 hover:-translate-y-1 hover:border-[#2563eb]/60 hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]"
      aria-label={`Beli ${product.name} Royal Dream`}
    >
      {/* Badge */}
      {product.badge && (
        <span className="absolute top-3 left-3 z-10 rounded-full bg-[#2563eb] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
          {product.badge}
        </span>
      )}

      {/* Discount Badge */}
      <span className="absolute top-3 right-3 z-10 rounded-full bg-[#F6C90E]/15 border border-[#F6C90E]/40 px-2 py-0.5 text-[10px] font-bold text-[#F6C90E]">
        -{discountPct}%
      </span>

      {/* Image placeholder with chip icon */}
      <div className="relative flex h-36 items-center justify-center bg-gradient-to-br from-[#0f1c35] via-[#1a2d50] to-[#0f1c35] overflow-hidden">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.15)_0%,transparent_70%)]" />
        {/* Chip coin icon */}
        <div className="relative flex flex-col items-center gap-1.5 select-none">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#F6C90E]/60 bg-gradient-to-br from-[#F6C90E]/20 to-[#2563eb]/20 shadow-[0_0_20px_rgba(246,201,14,0.2)]">
            <span className="text-3xl leading-none">🪙</span>
          </div>
          <span className="text-lg font-black text-white tracking-tight">
            {formatChip(product.chip_amount)}
          </span>
          <span className="text-[10px] font-medium text-blue-400/70 uppercase tracking-widest">
            Royal Dream Chip
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h2 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-1">
          {product.name}
        </h2>

        {/* Price */}
        <div className="mt-auto flex flex-col gap-0.5">
          <span className="text-xs text-gray-500 line-through">
            {formatRupiah(product.gimmick_price)}
          </span>
          <span className="text-base font-extrabold text-[#F6C90E]">
            {formatRupiah(product.price)}
          </span>
        </div>

        {/* CTA */}
        <button className="mt-2 w-full rounded-xl border border-[#2563eb]/40 bg-[#2563eb]/10 py-2 text-xs font-semibold uppercase tracking-widest text-blue-300 transition-all group-hover:bg-[#2563eb] group-hover:text-white group-hover:border-[#2563eb]">
          Beli Sekarang
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
