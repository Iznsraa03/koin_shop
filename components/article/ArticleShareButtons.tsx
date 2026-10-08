'use client';

import { useState } from 'react';

interface Props {
  url: string;
  title: string;
}

export default function ArticleShareButtons({ url, title }: Props) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareToWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`, '_blank');
  };

  const shareToX = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, '_blank');
  };

  const shareToTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`, '_blank');
  };

  const shareToPinterest = () => {
    window.open(`https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`, '_blank');
  };
  
  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank');
  };

  const copyLink = () => {
    try {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const btnClass = "group flex items-center justify-center gap-2 px-5 py-3.5 bg-[#090B12] hover:bg-[#F6C90E]/5 border border-white/10 hover:border-[#F6C90E]/50 rounded-2xl text-white/70 hover:text-[#F6C90E] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(246,201,14,0.15)] cursor-pointer";
  const iconClass = "text-[16px] font-black leading-none";
  const labelClass = "text-[13px] font-bold tracking-wide";

  return (
    <div className="flex flex-col gap-6 py-10 border-t border-white/5 mt-10">
      <div>
        <h3 className="text-2xl font-black text-white mb-2 font-['Space_Grotesk'] tracking-tight">Bagikan ke Teman</h3>
        <p className="text-sm text-white/50">Kirim panduan top up ini ke komunitas atau mabar Anda.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button onClick={shareToWhatsApp} className={btnClass}>
          <span className={iconClass}>WA</span>
          <span className={labelClass}>WhatsApp</span>
        </button>

        <button onClick={shareToX} className={btnClass}>
          <span className={iconClass}>𝕏</span>
          <span className={labelClass}>Twitter / X</span>
        </button>

        <button onClick={shareToTelegram} className={btnClass}>
          <span className={iconClass}>TG</span>
          <span className={labelClass}>Telegram</span>
        </button>
      </div>
    </div>
  );
}
