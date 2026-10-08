"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { EASE } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { useMotionAllowed } from "@/components/motion/useMotionAllowed";
import { Arrow } from "@/components/ui/ArrowLink";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

type PageHeroProps = {
  eyebrow: string;
  title: string[];
  en?: string;
  /** One string, or lines for a larger two-line tagline. */
  lead?: string | string[];
  /** Short intro paragraph (lines) under the lead. */
  body?: string[];
  /** Anchor for the round arrow under the body (shown only with `body`). */
  next?: string;
  image?: string;
  imageAlt?: string;
  /** CSS object-position for the photo, e.g. "70% center". */
  position?: string;
  crumbs: Crumb[];
  /** Shorter band for articles and utility pages. */
  compact?: boolean;
  /** Full-screen hero with a large serif English title (service pages). */
  display?: boolean;
};

/**
 * Lower-page hero: full-bleed photo (or a night gradient) with the same
 * settle-in zoom and scroll parallax language as the home page.
 */
export function PageHero({ eyebrow, title, en, lead, body, next, image, imageAlt = "", position = "center", crumbs, compact, display }: PageHeroProps) {
  const tagline = Array.isArray(lead);
  const ref = useRef<HTMLElement>(null);
  const allowed = useMotionAllowed();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(p, (v) => (allowed ? v * 18 : 0) + "%");
  const copyY = useTransform(p, (v) => (allowed ? v * -90 : 0));
  const copyOpacity = useTransform(p, (v) => (allowed ? Math.max(0, 1 - v / 0.7) : 1));

  return (
    <section
      ref={ref}
      className={`relative isolate flex overflow-hidden bg-night text-white ${
        display ? "min-h-[100svh]" : compact ? "min-h-[56svh] md:min-h-[60svh]" : "min-h-[78svh] md:min-h-[86svh]"
      }`}
    >
      <div aria-hidden={!imageAlt} className="absolute inset-0 -z-10">
        {image ? (
          <motion.div style={{ y: imgY }} className="absolute -inset-y-[6%] inset-x-0 will-change-transform">
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.14, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2.6, ease: EASE }}
            >
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority
                quality={88}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: position }}
              />
            </motion.div>
          </motion.div>
        ) : (
          <>
            <div className="absolute -left-40 top-0 size-[640px] glow scale-[1.8] [--glow:color-mix(in_srgb,var(--color-sky-deep)_45%,transparent)]" />
            <div className="absolute -right-20 bottom-0 size-[620px] glow scale-[1.8] [--glow:color-mix(in_srgb,var(--color-lavender)_35%,transparent)]" />
          </>
        )}
        {display ? (
          <>
            {/* Lighter wash: the photo carries its own depth, the copy only needs a soft left shade */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,28,58,0.45)_0%,rgba(12,28,58,0.2)_38%,rgba(12,28,58,0)_60%)]" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0d1a33]/55 to-transparent max-md:h-2/3 max-md:from-[#0d1a33]/80" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,28,58,0.62)_0%,rgba(12,28,58,0.35)_45%,rgba(12,28,58,0.1)_75%)]" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0d1a33]/80 to-transparent" />
          </>
        )}
      </div>

      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className={`container-x flex w-full flex-col justify-end pb-14 pt-36 will-change-[opacity,transform] ${display ? "md:pb-[12svh]" : "md:pb-20"}`}
      >
        <div className="max-w-[980px] [text-shadow:0_1px_3px_rgba(6,20,46,0.5),0_4px_30px_rgba(6,20,46,0.45)]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
            className={`eyebrow text-white/85 ${display ? "[word-break:keep-all]" : ""}`}
          >
            {eyebrow}
          </motion.p>
          <TextReveal
            as="h1"
            immediate
            delay={0.5}
            lines={title}
            className={
              display
                ? `mt-8 font-playfair font-normal md:mt-12 ${
                    title.length > 1 ? "text-[clamp(2.8rem,5.6vw,5.75rem)] leading-[1.04]" : "text-[clamp(2.8rem,5.2vw,4.75rem)] leading-[1.1]"
                  }`
                : `heading-ja mt-6 font-medium leading-[1.6] [word-break:auto-phrase] md:mt-8 ${
                    compact ? "text-[clamp(1.45rem,2.8vw,2.5rem)]" : "text-[clamp(1.6rem,3.4vw,3.1rem)]"
                  }`
            }
            lineClassName={display ? "tracking-[0.1em]" : "tracking-[0.1em] md:tracking-[0.14em]"}
          />
          {en ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, delay: 1.1 }}
              className="mt-5 font-display text-[clamp(1.1rem,1.8vw,1.6rem)] italic text-white/80"
            >
              {en}
            </motion.p>
          ) : null}
          {lead ? (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: EASE, delay: 1.3 }}
              className={
                tagline
                  ? "mt-6 font-mincho text-[clamp(1.2rem,1.9vw,1.8rem)] font-medium leading-[1.6] tracking-[0.16em] text-white md:mt-8"
                  : display
                    ? "mt-8 max-w-[38em] font-mincho text-[clamp(1rem,1.3vw,1.25rem)] font-medium leading-[2] tracking-[0.12em] text-white md:mt-10"
                    : "mt-8 max-w-[38em] font-mincho text-[0.9375rem] font-medium leading-[2.1] tracking-[0.08em] text-white/90"
              }
            >
              {tagline
                ? lead.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))
                : lead}
            </motion.p>
          ) : null}
          {body ? (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: EASE, delay: 1.45 }}
              className="mt-7 font-mincho text-[0.875rem] font-medium leading-[2.15] tracking-[0.12em] text-white/95 md:mt-9 md:text-[0.9375rem]"
            >
              {body.map((line) => (
                <span key={line} className="md:block">
                  {line}
                </span>
              ))}
            </motion.p>
          ) : null}
          {body && next ? (
            <motion.a
              href={next}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.6 }}
              aria-label="概要へ"
              className="group mt-9 grid size-16 place-items-center rounded-full border border-white/90 transition-colors duration-500 hover:bg-white hover:text-ink md:mt-10 md:size-20"
            >
              <Arrow className="w-6 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5" />
            </motion.a>
          ) : null}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.5 }}
          className={display ? (body ? "mt-12 md:mt-[7svh]" : "mt-14 md:mt-24") : "mt-12 md:mt-16"}
        >
          <Breadcrumbs items={crumbs} />
        </motion.div>
      </motion.div>
    </section>
  );
}
