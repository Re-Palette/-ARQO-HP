"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { useMotionAllowed } from "@/components/motion/useMotionAllowed";
import { Arrow } from "@/components/ui/ArrowLink";
import { Logo } from "@/components/ui/Logo";
import { nav, site, socials } from "@/lib/content";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const allowed = useMotionAllowed();
  // The wordmark rises and settles exactly as the page reaches its end.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const logoY = useTransform(scrollYProgress, [0.35, 1], allowed ? ["28%", "0%"] : ["0%", "0%"]);
  // Function form keeps this on the JS path; the accelerated opacity path ignored this offset range.
  const logoOpacity = useTransform(scrollYProgress, (v) =>
    allowed ? 0.2 + 0.8 * Math.min(1, Math.max(0, (v - 0.35) / 0.55)) : 1,
  );
  const ctaX = useTransform(scrollYProgress, [0, 0.6], allowed ? [-120, 0] : [0, 0]);
  // Letters start spread apart and close ranks as the page reaches its end.
  const spread = useTransform(scrollYProgress, (v) => (allowed ? 1 - Math.min(1, Math.max(0, (v - 0.3) / 0.7)) : 0));
  const gA = useTransform(spread, (s) => s * -90);
  const gR = useTransform(spread, (s) => s * -35);
  const gQ = useTransform(spread, (s) => s * 35);
  const gO = useTransform(spread, (s) => s * 90);

  return (
    <footer ref={ref} id="contact" className="relative isolate overflow-hidden bg-night text-white">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image src="/images/footer.jpg" alt="" fill sizes="100vw" className="object-cover object-bottom opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night/70 to-night/20" />
      </div>

      {/* Contact CTA */}
      <div className="container-x pb-20 pt-32 md:pb-28 md:pt-44">
        <Reveal>
          <p className="eyebrow text-white/60">Contact</p>
        </Reveal>
        <div className="mt-10 flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <motion.div style={{ x: ctaX }}>
            <TextReveal
              as="h2"
              lines={["Let’s build", "what’s next."]}
              className="font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] tracking-[-0.01em]"
            />
            <Reveal delay={0.3}>
              <p className="heading-ja mt-8 text-sm text-white/75">
                事業提携・取材・採用・協賛のご相談は、お気軽にお問い合わせください。
              </p>
            </Reveal>
          </motion.div>
          <Reveal delay={0.4}>
            <a
              href={`mailto:${site.contactEmail}`}
              className="group inline-flex items-center gap-6 rounded-full border border-white/30 bg-white/10 py-3 pl-8 pr-3 text-sm tracking-[0.14em] backdrop-blur-xl transition-colors duration-700 hover:bg-white hover:text-ink"
            >
              お問い合わせ
              <span className="grid size-12 place-items-center rounded-full bg-white text-ink transition-colors duration-700 group-hover:bg-ink group-hover:text-white">
                <Arrow className="w-5 transition-transform duration-700 group-hover:translate-x-0.5" />
              </span>
            </a>
          </Reveal>
        </div>
      </div>

      <div className="container-x">
        <div className="grid gap-12 border-t border-white/15 py-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-[0.6875rem] uppercase tracking-[0.28em] text-white/50">{site.legalName}</p>
            <p className="heading-ja mt-5 text-sm leading-[2] text-white/85">
              人と可能性の間に、
              <br />
              新しい未来をつくる。
            </p>
          </div>
          <nav aria-label="フッターナビゲーション" className="md:col-span-4">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-[0.6875rem] uppercase tracking-[0.24em] text-white/70">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="link-underline transition-colors hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="flex gap-6 text-[0.6875rem] uppercase tracking-[0.24em] text-white/70 md:col-span-3 md:justify-end">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="link-underline hover:text-white">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="container-x pb-8">
        <motion.div style={{ y: logoY, opacity: logoOpacity }}>
          <Logo
            className="h-auto w-full overflow-visible text-white/90"
            stroke={1.4}
            draw
            title={`${site.name} wordmark`}
            glyphX={[gA, gR, gQ, gO]}
          />
        </motion.div>
        <div className="mt-8 flex flex-col justify-between gap-3 text-[0.625rem] uppercase tracking-[0.24em] text-white/45 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {site.legalName} All rights reserved.</p>
          <p>{site.missionEn}</p>
        </div>
      </div>
    </footer>
  );
}
