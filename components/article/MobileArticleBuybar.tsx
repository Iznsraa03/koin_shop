'use client';

import Link from 'next/link';

interface Props {
  productName: string;
  productUrl: string;
}

export default function MobileArticleBuybar({ productName, productUrl }: Props) {
  return (
    <div className="fixed bottom-0 left-0 w-full p-[14px_18px_24px] bg-[#0d111b]/85 backdrop-blur-[16px] border-t border-white/10 z-[99] lg:hidden">
      <div className="grid grid-cols-2 gap-3 max-w-[500px] mx-auto">
        <Link 
          href="/cek-pesanan"
          className="p-[14px] text-center font-[800] text-[13px] rounded-[14px] bg-white/10 text-white border border-white/10"
        >
          Cek Pesanan
        </Link>
        <Link 
          href={productUrl}
          className="p-[14px] text-center font-[800] text-[13px] rounded-[14px] bg-[#ffdf8a] text-[#0d111b]"
        >
          Top Up
        </Link>
      </div>
    </div>
  );
}
