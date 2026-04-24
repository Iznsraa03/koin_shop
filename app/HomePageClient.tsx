"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PillNav from "../components/PillNav";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "../components/sections/HeroSection";
import dynamic from "next/dynamic";

const NotificationToast = dynamic(() => import("../components/NotificationToast"), { ssr: false });

export interface HeroSlide {
  title: string;
  description: string;
  accent: string;
  image: string;
}

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

// Daftarkan GSAP plugin sekali di module level — aman karena GSAP idempotent
gsap.registerPlugin(ScrollTrigger);

interface HomePageClientProps {
  slides: HeroSlide[];
}

export default function HomePageClient({ slides }: HomePageClientProps) {
  const heroSlides = useMemo(() => slides, [slides]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeHref, setActiveHref] = useState("#home");
  const [progressByHref, setProgressByHref] = useState<Record<string, number>>({
    "#home": 0,
    "/produk": 0,
    "#features": 0,
    "#about": 0,
    "#contact": 0,
  });

  // Ref untuk throttle RAF agar scroll listener tidak berlebihan
  const rafScrollRef = useRef<number | null>(null);
  // Ref untuk debounce resize
  const resizeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-rotate hero slides
  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Scroll progress tracker — throttled via requestAnimationFrame
  useEffect(() => {
    const sections = navItems
      .filter((item) => item.href.startsWith("#"))
      .map((item) => ({
        href: item.href,
        element: document.querySelector<HTMLElement>(item.href),
      }))
      .filter(
        (entry): entry is { href: (typeof navItems)[number]["href"]; element: HTMLElement } =>
          Boolean(entry.element)
      );

    if (!sections.length) return;

    const computeProgress = () => {
      const viewportMid = window.scrollY + window.innerHeight * 0.35;

      const current = sections
        .map((section) => {
          const top = section.element.offsetTop;
          const bottom = top + section.element.offsetHeight;
          const within = viewportMid >= top && viewportMid < bottom;
          const rawProgress = (viewportMid - top) / section.element.offsetHeight;
          const progress = Math.min(1, Math.max(0, rawProgress));
          return { href: section.href, within, progress };
        })
        .find((entry) => entry.within);

      if (current) setActiveHref(current.href);

      setProgressByHref((prev) => {
        const next: Record<string, number> = { ...prev };
        for (const section of sections) {
          if (current?.href === section.href) {
            next[section.href] = current.progress;
          }
        }
        return next;
      });

      rafScrollRef.current = null;
    };

    // Throttle: hanya 1 frame per scroll event
    const updateScrollProgress = () => {
      if (rafScrollRef.current !== null) return;
      rafScrollRef.current = requestAnimationFrame(computeProgress);
    };

    // Debounce resize: hanya eksekusi setelah resize berhenti 150ms
    const updateOnResize = () => {
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = setTimeout(computeProgress, 150);
    };

    computeProgress(); // initial call
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateOnResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateOnResize);
      if (rafScrollRef.current) cancelAnimationFrame(rafScrollRef.current);
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
    };
  }, []);

  // GSAP scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTargets = gsap.utils.toArray<HTMLElement>(".js-hero-reveal");
      if (heroTargets.length) {
        gsap.fromTo(
          heroTargets,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
            force3D: true,
          }
        );
      }

      document.querySelectorAll<HTMLElement>(".js-section").forEach((section) => {
        const fadeTargets = Array.from(section.querySelectorAll<HTMLElement>(".js-fade-up"));
        if (fadeTargets.length) {
          gsap.fromTo(
            fadeTargets,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.1,
              force3D: true,
              scrollTrigger: {
                trigger: section,
                start: "top 72%",
                once: true,
              },
            }
          );
        }

        const scaleTargets = Array.from(section.querySelectorAll<HTMLElement>(".js-scale-in"));
        if (scaleTargets.length) {
          gsap.fromTo(
            scaleTargets,
            { opacity: 0, scale: 0.94 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.7,
              ease: "power2.out",
              stagger: 0.1,
              force3D: true,
              scrollTrigger: {
                trigger: section,
                start: "top 72%",
                once: true,
              },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Notification Toast: fixed pojok kiri bawah, tidak ikut scroll */}
      <NotificationToast />
      <div className="relative overflow-hidden">
        <PillNav
          logo="/logo.png"
          logoAlt="Koin Shop Logo"
          items={navItems as unknown as { label: string; href: string }[]}
          activeHref={activeHref}
          progressByHref={progressByHref}
          className=""
          ease="power2.easeOut"
          baseColor="#0f172b"
          pillColor="#F6C90E"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#0f172b"
          initialLoadAnimation={false}
        />

        <HeroSection slides={heroSlides} activeSlide={activeSlide} onSlideChange={setActiveSlide} />
      </div>
    </>
  );
}
