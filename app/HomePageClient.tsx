"use client";

import { useEffect, useMemo, useState } from "react";
import PillNav from "../components/PillNav";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "../components/sections/HeroSection";
import FeaturesSection from "../components/sections/FeaturesSection";
import TestimoniSection from "../components/sections/TestimoniSection";
import AboutSection from "../components/sections/AboutSection";
import ContactFooter from "../components/sections/ContactFooter";

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
    "#features": 0,
    "#about": 0,
    "#contact": 0,
  });

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    const sections = navItems
      .map((item) => ({
        href: item.href,
        element: document.querySelector<HTMLElement>(item.href),
      }))
      .filter(
        (entry): entry is { href: (typeof navItems)[number]["href"]; element: HTMLElement } =>
          Boolean(entry.element)
      );

    if (!sections.length) return;

    const updateScrollProgress = () => {
      const viewportMid = window.scrollY + window.innerHeight * 0.35;

      const current = sections
        .map((section) => {
          const rect = section.element.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const bottom = top + rect.height;
          const within = viewportMid >= top && viewportMid < bottom;

          const rawProgress = (viewportMid - top) / rect.height;
          const progress = Math.min(1, Math.max(0, rawProgress));

          return {
            href: section.href,
            within,
            progress,
          };
        })
        .find((entry) => entry.within);

      if (current) setActiveHref(current.href);

      setProgressByHref((prev) => {
        const next: Record<string, number> = { ...prev };
        for (const section of sections) {
          const currentSection = current?.href === section.href;
          const stored = currentSection ? current?.progress ?? 0 : prev[section.href] ?? 0;
          next[section.href] = currentSection ? stored : prev[section.href] ?? 0;
        }
        return next;
      });
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTargets = gsap.utils.toArray<HTMLElement>(".js-hero-reveal");
      if (heroTargets.length) {
        gsap.fromTo(
          heroTargets,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.15,
          }
        );
      }

      document.querySelectorAll<HTMLElement>(".js-section").forEach((section) => {
        const fadeTargets = Array.from(section.querySelectorAll<HTMLElement>(".js-fade-up"));
        if (fadeTargets.length) {
          gsap.fromTo(
            fadeTargets,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.12,
              scrollTrigger: {
                trigger: section,
                start: "top 70%",
                once: true,
              },
            }
          );
        }

        const scaleTargets = Array.from(section.querySelectorAll<HTMLElement>(".js-scale-in"));
        if (scaleTargets.length) {
          gsap.fromTo(
            scaleTargets,
            { opacity: 0, scale: 0.92 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.85,
              ease: "power2.out",
              stagger: 0.12,
              scrollTrigger: {
                trigger: section,
                start: "top 70%",
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
    <div className="min-h-screen bg-base-color text-white">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#1b4fa8]/30 blur-[140px]" />
          <div className="absolute -right-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[#2563eb]/20 blur-[160px]" />
        </div>

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

      <FeaturesSection />
      <TestimoniSection />
      <AboutSection />
      <ContactFooter />
    </div>
  );
}
