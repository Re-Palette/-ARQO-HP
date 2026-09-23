"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { EASE } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Logo } from "@/components/ui/Logo";
import { domains } from "@/lib/content";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Scroll-synced depth: background drifts slower than the foreground.
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const archY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      aria-label="ARQO — 人と可能性の間に架け橋をつくる。"
      className="relative isolate h-[100svh] min-h-[680px] overflow-hidden bg-sky"
    >
      {/* Background sky — slow settle-in zoom, then scroll parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-20">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.18, opacity: 0 }}
          animate={{ scale: 1.04, opacity: 1 }}
          transition={{ duration: 3.2, ease: EASE }}
        >
          <Image
            src="/images/hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
      </motion.div>

      {/* Light, glass and legibility layers */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white/70 to-transparent" />
        {/* Glass panes with a passing light reflection */}
        <div className="absolute -right-[10%] -top-[20%] h-[80%] w-[55%] rotate-[18deg] overflow-hidden rounded-[48px] border border-white/40 bg-white/[0.07] backdrop-blur-[2px]">
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent [animation:sheen_9s_var(--ease-soft)_2s_infinite]" />
        </div>
        <div className="absolute -left-[15%] top-[55%] h-[70%] w-[45%] -rotate-[14deg] rounded-[48px] border border-white/30 bg-white/[0.05]" />
        <div className="absolute right-[18%] top-[8%] size-[30vw] rounded-full bg-white/30 blur-[90px]" />
        <div className="absolute left-[30%] top-[40%] size-[28vw] rounded-full bg-lavender/20 blur-[100px] [animation:drift_18s_ease-in-out_infinite]" />
      </div>

      {/* Right: arch visual — the "bridge" motif */}
      <motion.div
        style={{ y: archY }}
        className="absolute bottom-0 right-[4vw] top-[16%] hidden w-[min(38vw,560px)] md:block"
      >
        <motion.div
          className="relative h-full w-full overflow-hidden rounded-t-full border border-white/60 shadow-[0_40px_120px_-40px_rgba(60,70,120,0.45)]"
          initial={{ clipPath: "inset(100% 0 0 0 round 999px 999px 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0 round 999px 999px 0 0)" }}
          transition={{ duration: 2, ease: EASE, delay: 0.5 }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.25 }}
            animate={{ scale: 1 }}
            transition={{ duration: 3, ease: EASE, delay: 0.5 }}
          >
            <Image
              src="/images/hero-portrait.jpg"
              alt="やわらかな光に包まれたARQOのブランドビジュアル"
              fill
              priority
              sizes="(min-width: 768px) 38vw, 100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-white/10" />
          <div className="absolute inset-y-0 left-[12%] w-[18%] bg-gradient-to-r from-transparent via-white/35 to-transparent blur-md" />
        </motion.div>

        <motion.p
          aria-hidden
          className="pointer-events-none absolute -left-[22%] top-[30%] -rotate-[10deg] font-display text-[clamp(3rem,6vw,6.5rem)] italic leading-[0.9] text-white drop-shadow-[0_6px_30px_rgba(80,100,160,0.35)]"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 0.95, x: 0 }}
          transition={{ duration: 2, ease: EASE, delay: 1.4 }}
        >
          More
          <br />
          <span className="pl-[0.8em]">Possibilities.</span>
        </motion.p>
      </motion.div>

      {/* Left: copy */}
      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="container-x relative flex h-full flex-col justify-center pt-20"
      >
        <div className="max-w-[560px]">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.8, ease: EASE, delay: 0.3 }}
            className="text-ink"
          >
            <h1 className="sr-only">ARQO</h1>
            <Logo className="h-auto w-[clamp(220px,30vw,420px)]" stroke={1.6} draw />
          </motion.div>

          <TextReveal
            as="p"
            immediate
            delay={0.9}
            lines={["人と可能性の間に", "架け橋をつくる。"]}
            className="heading-ja mt-10 text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.75] tracking-[0.22em] text-ink"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: EASE, delay: 1.5 }}
            className="mt-8 text-[0.8125rem] leading-[2.2] tracking-[0.08em] text-ink-2 md:whitespace-nowrap md:text-sm"
          >
            私たちは、美容・教育・コミュニティ・テクノロジーを通じて、<br className="hidden md:block" />
            {"一人ひとりが新しい一歩を踏み出せる機会を創造します。"}
          </motion.p>

          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 2 }}
            className="group mt-14 inline-flex items-center gap-5 text-[0.6875rem] uppercase tracking-[0.3em] text-ink/70"
            aria-label="Aboutセクションへスクロール"
          >
            <span className="relative grid size-14 place-items-center rounded-full border border-ink/25 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-110">
              <span className="absolute h-px w-3.5 bg-ink/70" />
              <span className="absolute h-3.5 w-px bg-ink/70" />
            </span>
            Scroll
            <span className="relative block h-px w-16 overflow-hidden bg-ink/15">
              <span className="absolute inset-0 origin-left bg-ink/60 [animation:scroll-line_2.8s_var(--ease-soft)_infinite]" />
            </span>
          </motion.a>
        </div>
      </motion.div>

      {/* Bottom rail */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2.2 }}
        className="container-x absolute inset-x-0 bottom-6 flex items-end justify-between text-[0.625rem] uppercase tracking-[0.3em] text-ink/55 md:bottom-8"
      >
        <ul className="hidden items-center gap-4 sm:flex">
          {domains.map((d, i) => (
            <li key={d} className="flex items-center gap-4">
              {i > 0 ? <span className="h-px w-5 bg-ink/25" /> : null}
              {d}
            </li>
          ))}
        </ul>
        <p>A Social Venture for What&rsquo;s Next</p>
      </motion.div>
    </section>
  );
}
