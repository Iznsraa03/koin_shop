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
    // Build section data: query DOM & CACHE posisi layout saat mount
    // Membaca offsetTop di sini (sekali) mencegah forced reflow setiap scroll event
    type SectionEntry = {
      href: (typeof navItems)[number]["href"];
      element: HTMLElement;
      top: number;    // cached offsetTop
      height: number; // cached offsetHeight
    };

    const buildSections = (): SectionEntry[] =>
      navItems
        .filter((item) => item.href.startsWith("#"))
        .flatMap((item) => {
          const element = document.querySelector<HTMLElement>(item.href);
          if (!element) return [];
          return [{
            href: item.href as (typeof navItems)[number]["href"],
            element,
            top: element.offsetTop,       // baca sekali saat mount
            height: element.offsetHeight, // baca sekali saat mount
          }];
        });

    let sections = buildSections();
    if (!sections.length) return;

    const computeProgress = () => {
      // Hanya window.scrollY yang dibaca setiap frame — TIDAK ada layout read lain
      const viewportMid = window.scrollY + window.innerHeight * 0.35;

      const current = sections.find((section) => {
        const bottom = section.top + section.height;
        return viewportMid >= section.top && viewportMid < bottom;
      });

      if (current) {
        const rawProgress = (viewportMid - current.top) / current.height;
        const progress = Math.min(1, Math.max(0, rawProgress));

        setActiveHref(current.href);
        setProgressByHref((prev) => {
          if (prev[current.href] === progress) return prev; // skip re-render jika sama
          return { ...prev, [current.href]: progress };
        });
      }

      rafScrollRef.current = null;
    };

    // Throttle: hanya 1 frame per scroll event
    const updateScrollProgress = () => {
      if (rafScrollRef.current !== null) return;
      rafScrollRef.current = requestAnimationFrame(computeProgress);
    };

    // Debounce resize: re-cache posisi layout setelah resize berhenti 150ms
    const updateOnResize = () => {
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = setTimeout(() => {
        // Re-read DOM positions setelah resize selesai
        sections = buildSections();
        computeProgress();
      }, 150);
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
