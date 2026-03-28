"use client";

import { useEffect, useRef, useState } from "react";
import { ShoppingCart, X } from "lucide-react";
import notifications, { NotificationItem } from "@/src/data/notifications";

export default function NotificationToast() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<NotificationItem | null>(null);
  const [dismissed, setDismissed] = useState(false);
  /** Progress 0–100 untuk progress bar hijau */
  const [progress, setProgress] = useState(100);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let lastIdx = -1;
    let displayTimer: ReturnType<typeof setTimeout>;
    let delayTimer: ReturnType<typeof setTimeout>;

    function getRandomIdx(): number {
      const total = notifications.length;
      if (total <= 1) return 0;
      let next: number;
      do {
        next = Math.floor(Math.random() * total);
      } while (next === lastIdx); // hindari tampil item yang sama 2x berturut-turut
      return next;
    }

    function startProgressBar(durationMs: number) {
      setProgress(100);
      const tick = 50;
      const decrement = (tick / durationMs) * 100;

      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          const next = prev - decrement;
          return next <= 0 ? 0 : next;
        });
      }, tick);
    }

    function stopProgressBar() {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    }

    function show() {
      const idx = getRandomIdx();
      lastIdx = idx;
      const item = notifications[idx];
      setCurrent(item);
      setVisible(true);
      setDismissed(false);
      startProgressBar(item.displayMs);

      displayTimer = setTimeout(() => {
        stopProgressBar();
        setVisible(false);
        delayTimer = setTimeout(() => {
          show();
        }, item.delayMs);
      }, item.displayMs);
    }

    const startTimer = setTimeout(show, 1500);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(displayTimer);
      clearTimeout(delayTimer);
      stopProgressBar();
    };
  }, []);

  function handleDismiss() {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    setDismissed(true);
    setVisible(false);
  }

  if (!current || !visible || dismissed) return null;

  return (
    <div
      aria-live="polite"
      className="
        fixed bottom-5 right-4 z-[9999] w-[280px]
        animate-slide-in-right
        rounded-xl border border-[#F6C90E]/40
        bg-[#0d1a35]/90 backdrop-blur-md
        shadow-[0_8px_30px_rgba(246,201,14,0.15)]
        overflow-hidden
      "
    >
      {/* Content area */}
      <div className="px-4 py-3">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          aria-label="Tutup notifikasi"
          className="absolute right-2 top-2 text-white/40 hover:text-white/80 transition-colors"
        >
          <X size={14} />
        </button>

        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="flex-shrink-0 rounded-full bg-blue-600/20 p-2">
            <ShoppingCart size={18} className="text-blue-400" />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-white/40 mb-0.5">ID Game</p>
            <p className="text-[13px] font-semibold text-white font-mono tracking-wider">
              {/* Tampilkan 4 digit pertama, samarkan 4 digit terakhir */}
              {current.gameId.slice(0, 4)}<span className="text-white/30">****</span>
            </p>
            <p className="text-[12px] text-white/60 leading-snug">
              baru saja membeli{" "}
              <span className="text-yellow-400 font-medium">{current.product}</span>
            </p>
            <p className="mt-0.5 text-[11px] text-white/40">
              <span className="text-green-400">✓ Berhasil</span>
            </p>
          </div>
        </div>
      </div>

      {/* Progress bar hijau di bagian bawah */}
      <div className="h-[3px] w-full bg-white/10">
        <div
          className="h-full bg-green-400 transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
