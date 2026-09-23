"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { EASE } from "@/components/motion/Reveal";
import { useLenis } from "@/components/motion/SmoothScroll";
import { Logo } from "@/components/ui/Logo";
import { nav, site, socials } from "@/lib/content";

export function Header() {
  const { scrollY } = useScroll();
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 600 && y > prev && !open);
  });

  // Correct initial state when the page is restored mid-scroll.
  useEffect(() => setScrolled(window.scrollY > 40), []);

  // Track which section is in view for the active nav indicator.
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Lock scrolling while the menu is open.
  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lenis]);

  // Lenis is stopped while the menu is open, so menu links scroll explicitly.
  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
    requestAnimationFrame(() => {
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;
      if (lenis) {
        lenis.start();
        lenis.scrollTo(target, { duration: 1.6 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  };

  // White type while floating over the hero photo, ink once the glass bar appears.
  const light = !scrolled && !open;

  const primary = nav.filter((n) => n.label !== "Contact");

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: hidden ? "-110%" : 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: hidden ? 0 : 0.2 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-[background-color,backdrop-filter,border-color] duration-700 ${
            scrolled && !open
              ? "border-b border-white/60 bg-white/55 backdrop-blur-xl backdrop-saturate-150"
              : "border-b border-transparent"
          }`}
        >
          <div
            className={`container-x flex h-[72px] items-center justify-between md:h-[88px] ${
              light ? "[text-shadow:0_1px_10px_rgba(8,24,52,0.4)]" : ""
            }`}
          >
            <Link href="#top" aria-label={`${site.name} ホーム`} className={`relative z-10 transition-colors duration-700 ${light ? "text-white" : "text-ink"}`}>
              <Logo className="h-[22px] w-auto md:h-[26px]" stroke={1.3} />
            </Link>

            <nav aria-label="メインナビゲーション" className="hidden lg:block">
              <ul className="flex items-center gap-10">
                {primary.map((item) => {
                  const isActive = active === item.href.slice(1);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`relative py-2 text-[0.6875rem] uppercase tracking-[0.24em] transition-colors duration-500 ${
                          light
                            ? isActive
                              ? "text-white"
                              : "text-white/85 hover:text-white"
                            : isActive
                              ? "text-ink"
                              : "text-ink/55 hover:text-ink"
                        }`}
                      >
                        {item.label}
                        {isActive ? (
                          <motion.span
                            layoutId="nav-indicator"
                            className={`absolute inset-x-0 -bottom-0.5 h-px ${light ? "bg-white" : "bg-ink"}`}
                            transition={{ duration: 0.8, ease: EASE }}
                          />
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="relative z-10 flex items-center gap-5">
              <Link
                href="#contact"
                className={`hidden rounded-full border px-5 py-2.5 text-[0.6875rem] tracking-[0.18em] backdrop-blur-md transition-colors duration-500 md:inline-block ${
                  light
                    ? "border-white/60 bg-white/10 text-white hover:bg-white hover:text-ink"
                    : "border-ink/20 bg-white/40 text-ink hover:bg-ink hover:text-white"
                }`}
              >
                お問い合わせ
              </Link>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="site-menu"
                aria-label={open ? "メニューを閉じる" : "メニューを開く"}
                className="group relative grid size-11 place-items-center"
              >
                <span
                  className={`absolute h-px w-6 transition-[transform,background-color] ${light ? "bg-white" : "bg-ink"} duration-700 ease-[var(--ease-out-expo)] ${
                    open ? "rotate-45" : "-translate-y-[4px]"
                  }`}
                />
                <span
                  className={`absolute h-px transition-all ${light ? "bg-white" : "bg-ink"} duration-700 ease-[var(--ease-out-expo)] ${
                    open ? "w-6 -rotate-45" : "w-4 translate-x-1 translate-y-[4px] group-hover:w-6 group-hover:translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="サイトメニュー"
            data-lenis-prevent
            className="fixed inset-0 z-40 overflow-y-auto bg-mist/95 backdrop-blur-2xl"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 1, ease: EASE }}
          >
            <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[640px] rounded-full bg-lavender/50 blur-[120px]" />
            <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-40 size-[560px] rounded-full bg-sky/40 blur-[120px]" />
            <div className="container-x relative flex min-h-full flex-col justify-between pb-10 pt-32">
              <ul className="space-y-2 md:space-y-3">
                {nav.map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ duration: 1, ease: EASE, delay: 0.25 + i * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={(e) => goTo(e, item.href)}
                        className="group flex items-baseline gap-5 font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05] text-ink"
                      >
                        <span className="font-sans text-[0.6875rem] tracking-[0.2em] text-ink/40">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="transition-[font-style,letter-spacing] duration-500 group-hover:italic">
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-16 flex flex-col gap-6 border-t border-ink/10 pt-8 text-sm text-ink/60 md:flex-row md:items-end md:justify-between"
              >
                <p className="heading-ja text-base text-ink">{site.mission}</p>
                <ul className="flex gap-6 text-[0.6875rem] uppercase tracking-[0.2em]">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noreferrer" className="link-underline">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
