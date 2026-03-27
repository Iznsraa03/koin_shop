"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";

export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export interface PillNavProps {
  logo: string;
  logoAlt?: string;
  items: PillNavItem[];
  activeHref?: string;
  progressByHref?: Record<string, number>;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
}

const PillNav: React.FC<PillNavProps> = ({
  logo,
  logoAlt = "Logo",
  items,
  activeHref,
  progressByHref = {},
  className = "",
  ease = "power3.easeOut",
  baseColor = "#fff",
  pillColor = "#060010",
  hoveredPillTextColor = "#060010",
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true,
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const navItemsRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | HTMLElement | null>(null);
  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = (w * w / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - w * w / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector<HTMLElement>(".pill-label");
        const white = pill.querySelector<HTMLElement>(".pill-label-hover");

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: "auto" }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener("resize", onResize);

    if (document.fonts) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: "hidden", opacity: 0, scaleY: 1, y: 0 });
    }

    if (initialLoadAnimation) {
      const logoEl = logoRef.current;
      const navItems = navItemsRef.current;

      if (logoEl) {
        gsap.set(logoEl, { scale: 0 });
        gsap.to(logoEl, {
          scale: 1,
          duration: 0.6,
          ease,
        });
      }

      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: "hidden" });
        gsap.to(navItems, {
          width: "auto",
          duration: 0.6,
          ease,
        });
      }
    }

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: "auto",
    });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: "auto",
    });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.2,
      ease,
      overwrite: "auto",
    });
  };

  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;

    gsap.killTweensOf(menu);

    if (isMobileMenuOpen) {
      gsap.set(menu, { visibility: "visible", pointerEvents: "auto" });
      gsap.fromTo(
        menu,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.22, ease }
      );
    } else {
      gsap.to(menu, {
        opacity: 0,
        y: 10,
        duration: 0.18,
        ease,
        onComplete: () => {
          gsap.set(menu, { visibility: "hidden", pointerEvents: "none" });
        },
      });
    }
  }, [isMobileMenuOpen, ease]);

  useEffect(() => {
    const onDocKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };

    const onDocPointerDown = (event: PointerEvent) => {
      if (!isMobileMenuOpen) return;
      const menu = mobileMenuRef.current;
      const btn = hamburgerRef.current;
      const target = event.target as Node | null;
      if (!menu || !btn || !target) return;
      if (menu.contains(target) || btn.contains(target)) return;
      setIsMobileMenuOpen(false);
    };

    document.addEventListener("keydown", onDocKeyDown);
    document.addEventListener("pointerdown", onDocPointerDown);

    return () => {
      document.removeEventListener("keydown", onDocKeyDown);
      document.removeEventListener("pointerdown", onDocPointerDown);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    onMobileMenuClick?.();
  };

  const isExternalLink = (href: string) =>
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#");

  const isRouterLink = (href?: string) => href && !isExternalLink(href);

  const scrollToAnchor = (event: React.MouseEvent, href: string) => {
    if (!href.startsWith("#")) return;
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const cssVars = {
    ["--base"]: baseColor,
    ["--pill-bg"]: pillColor,
    ["--hover-text"]: hoveredPillTextColor,
    ["--pill-text"]: resolvedPillTextColor,
    ["--nav-h"]: "42px",
    ["--logo"]: "36px",
    ["--pill-pad-x"]: "18px",
    ["--pill-gap"]: "3px",
  } as React.CSSProperties;

  return (
    <div className="fixed left-0 top-[1em] z-[1000] flex w-full justify-center">
      <nav
        className={`box-border flex w-full items-center justify-between px-4 md:w-max md:justify-start md:px-0 [--nav-h:36px] [--logo:30px] [--pill-pad-x:14px] [--pill-gap:2px] md:[--nav-h:42px] md:[--logo:36px] md:[--pill-pad-x:18px] md:[--pill-gap:3px] ${className}`}
        aria-label="Primary"
        style={cssVars}
      >
        {isRouterLink(items?.[0]?.href) ? (
          <Link
            href={items[0].href}
            aria-label="Home"
            onMouseEnter={handleLogoEnter}
            role="menuitem"
            ref={(el) => {
              logoRef.current = el;
            }}
            className="inline-flex items-center justify-center overflow-hidden rounded-full p-2"
            style={{
              width: "var(--nav-h)",
              height: "var(--nav-h)",
              background: "var(--base, #000)",
            }}
          >
            <img
              src={logo}
              alt={logoAlt}
              ref={logoImgRef}
              className="block h-full w-full object-cover"
            />
          </Link>
        ) : (
          <a
            href={items?.[0]?.href || "#"}
            aria-label="Home"
            onMouseEnter={handleLogoEnter}
            ref={(el) => {
              logoRef.current = el;
            }}
            className="inline-flex items-center justify-center overflow-hidden rounded-full p-2"
            style={{
              width: "var(--nav-h)",
              height: "var(--nav-h)",
              background: "var(--base, #000)",
            }}
          >
            <Image
              src={logo}
              alt={logoAlt}
              width={36}
              height={36}
              ref={logoImgRef as React.Ref<HTMLImageElement>}
              className="block h-full w-full object-cover"
              priority
            />
          </a>
        )}

        {/* Desktop pills */}
        <div
          ref={navItemsRef}
          className="relative ml-2 hidden items-center rounded-full md:flex"
          style={{
            height: "var(--nav-h)",
            background: "var(--base, #000)",
          }}
        >
          <ul
            role="menubar"
            className="m-0 flex h-full list-none items-stretch p-[3px]"
            style={{ gap: "var(--pill-gap)" }}
          >
            {items.map((item, i) => {
              const isActive = activeHref === item.href;

              const pillStyle: React.CSSProperties = {
                background: "var(--pill-bg, #fff)",
                color: "var(--pill-text, var(--base, #000))",
                paddingLeft: "var(--pill-pad-x)",
                paddingRight: "var(--pill-pad-x)",
              };

              const PillContent = (
                <>
                  <span
                    className="hover-circle pointer-events-none absolute left-1/2 bottom-0 z-[1] block rounded-full"
                    style={{
                      background: "var(--base, #000)",
                      willChange: "transform",
                    }}
                    aria-hidden="true"
                    ref={(el) => {
                      circleRefs.current[i] = el;
                    }}
                  />
                  <span className="label-stack relative z-[2] inline-block leading-[1]">
                    <span
                      className="pill-label relative z-[2] inline-block leading-[1]"
                      style={{ willChange: "transform" }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                      style={{
                        color: "var(--hover-text, #fff)",
                        willChange: "transform, opacity",
                      }}
                      aria-hidden="true"
                    >
                      {item.label}
                    </span>
                  </span>
                  <span
                    className="pointer-events-none absolute left-2 right-2 -bottom-[3px] z-[4] h-[2px] overflow-hidden rounded-full bg-black/20"
                    aria-hidden="true"
                  >
                    <span
                      className="block h-full rounded-full"
                      style={{
                        background: "var(--base, #000)",
                        width: `${Math.min(Math.max(progressByHref[item.href] ?? (isActive ? 0.12 : 0), 0), 1) * 100}%`,
                      }}
                    />
                  </span>
                </>
              );

              const basePillClasses =
                "relative inline-flex h-full cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap rounded-full px-0 text-[16px] font-semibold uppercase leading-[0] tracking-[0.2px] no-underline box-border";

              return (
                <li key={item.href} role="none" className="flex h-full">
                  {isRouterLink(item.href) ? (
                    <Link
                      role="menuitem"
                      href={item.href}
                      className={basePillClasses}
                      style={pillStyle}
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                    >
                      {PillContent}
                    </Link>
                  ) : (
                    <a
                      role="menuitem"
                      href={item.href}
                      className={basePillClasses}
                      style={pillStyle}
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                      onClick={(event) => scrollToAnchor(event, item.href)}
                    >
                      {PillContent}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mobile hamburger */}
        <div className="relative ml-2 md:hidden">
          <button
            ref={hamburgerRef}
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={toggleMobileMenu}
            className="inline-flex h-[var(--nav-h)] w-[var(--nav-h)] items-center justify-center rounded-full border border-white/10 bg-[#0f172b] text-[#F6C90E] transition-colors hover:bg-[#111c33]"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div
            id="mobile-menu"
            ref={mobileMenuRef}
            className="invisible absolute right-0 z-[1200] mt-3 w-[min(78vw,320px)] origin-top rounded-2xl border border-white/10 bg-[#0f172b] p-2 opacity-0 shadow-[0_20px_60px_rgba(0,0,0,0.6)] pointer-events-none"
            role="menu"
            aria-label="Mobile menu"
          >
            <ul className="flex flex-col gap-2">
              {items.map((item) => {
                const isActive = activeHref === item.href;

                const itemClasses =
                  "flex items-center justify-between rounded-xl border border-white/10 bg-[#111c33]/70 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3px] text-white transition-colors hover:bg-[#111c33]";

                return (
                  <li key={item.href}>
                    {isRouterLink(item.href) ? (
                      <Link
                        href={item.href}
                        role="menuitem"
                        aria-label={item.ariaLabel || item.label}
                        className={itemClasses}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="flex items-center gap-3">
                          <span className="h-2 w-2 rounded-full bg-[#F6C90E]" />
                          {item.label}
                        </span>
                        {isActive ? (
                          <span className="rounded-full bg-[#F6C90E] px-2 py-1 text-[10px] font-black text-[#0f172b]">
                            ACTIVE
                          </span>
                        ) : null}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        role="menuitem"
                        aria-label={item.ariaLabel || item.label}
                        className={itemClasses}
                        onClick={(event) => {
                          scrollToAnchor(event, item.href);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <span className="flex items-center gap-3">
                          <span className="h-2 w-2 rounded-full bg-[#F6C90E]" />
                          {item.label}
                        </span>
                        {isActive ? (
                          <span className="rounded-full bg-[#F6C90E] px-2 py-1 text-[10px] font-black text-[#0f172b]">
                            ACTIVE
                          </span>
                        ) : null}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-2 rounded-xl border border-[#2563eb]/30 bg-[#2563eb]/10 px-4 py-3 text-xs text-white/80">
              <span className="font-semibold text-white">Tip:</span> Tap menu untuk pindah section.
            </div>
          </div>
        </div>

      </nav>

    </div>
  );
};

export default PillNav;
