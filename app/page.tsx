"use client";

import { useEffect, useState } from "react";
import PillNav from "../components/PillNav";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "../components/sections/HeroSection";
import FeaturesSection from "../components/sections/FeaturesSection";
import AboutSection from "../components/sections/AboutSection";
import ContactFooter from "../components/sections/ContactFooter";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const heroSlides = [
  {
    title: "Enterprise Velocity",
    description: "Akselerasi delivery dengan pipeline modern dan automation presisi.",
    accent: "from-[#2563eb]/30 via-[#303841] to-[#111827]",
  },
  {
    title: "Data-Driven Strategy",
    description: "Insight real-time untuk keputusan yang lebih tajam dan terukur.",
    accent: "from-[#1b4fa8]/35 via-[#2b3541] to-[#0f172a]",
  },
  {
    title: "Immersive Experience",
    description: "Desain interaktif yang memperkuat brand dan loyalitas pelanggan.",
    accent: "from-[#2563eb]/25 via-[#1f2731] to-[#0b1120]",
  },
];

gsap.registerPlugin(ScrollTrigger);


export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeHref, setActiveHref] = useState("#home");
  const [progressByHref, setProgressByHref] = useState<Record<string, number>>({
    "#home": 0,
    "#features": 0,
    "#about": 0,
    "#contact": 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => ({
        href: item.href,
        element: document.querySelector<HTMLElement>(item.href),
      }))
      .filter((entry): entry is { href: string; element: HTMLElement } => Boolean(entry.element));

    if (!sections.length) return;

    const updateScrollProgress = () => {
      const viewportMid = window.scrollY + window.innerHeight * 0.35;
      let nextActiveHref = sections[0].href;

      const nextProgress: Record<string, number> = {};

      sections.forEach(({ href, element }) => {
        const sectionTop = element.offsetTop;
        const sectionHeight = element.offsetHeight || 1;
        const progress = (viewportMid - sectionTop) / sectionHeight;

        nextProgress[href] = Math.min(Math.max(progress, 0), 1);

        if (viewportMid >= sectionTop) {
          nextActiveHref = href;
        }
      });

      setProgressByHref((prev) => {
        const hasChange = sections.some(({ href }) => prev[href] !== nextProgress[href]);
        return hasChange ? nextProgress : prev;
      });

      setActiveHref((prev) => (prev === nextActiveHref ? prev : nextActiveHref));
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
      gsap.fromTo(
        ".js-hero-reveal",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
        }
      );

      gsap.utils.toArray<HTMLElement>(".js-section").forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll(".js-fade-up"),
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

        gsap.fromTo(
          section.querySelectorAll(".js-scale-in"),
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
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#303841] text-white">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#1b4fa8]/30 blur-[140px]" />
          <div className="absolute -right-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[#2563eb]/20 blur-[160px]" />
        </div>

        <PillNav
          logo="/logo.png"
          logoAlt="Koin Shop Logo"
          items={navItems}
          activeHref={activeHref}
          progressByHref={progressByHref}
          className=""
          ease="power2.easeOut"
          baseColor="#303841"
          pillColor="#F6C90E"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#303841"
          scrollDurationMs={1200}
          scrollDelayMs={160}
          initialLoadAnimation={false}
        />

        <HeroSection
          slides={heroSlides}
          activeSlide={activeSlide}
          onSlideChange={setActiveSlide}
        />
      </div>

      <FeaturesSection />

      <AboutSection />

      <ContactFooter />
    </div>
  );
}
