"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { EASE } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { useMotionAllowed } from "@/components/motion/useMotionAllowed";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

type PageHeroProps = {
  eyebrow: string;
  title: string[];
  en?: string;
  lead?: string;
  image?: string;
  imageAlt?: string;
  /** CSS object-position for the photo, e.g. "70% center". */
  position?: string;
  crumbs: Crumb[];
  /** Shorter band for articles and utility pages. */
  compact?: boolean;
};

/**
 * Lower-page hero: full-bleed photo (or a night gradient) with the same
 * settle-in zoom and scroll parallax language as the home page.
 */
export function PageHero({ eyebrow, title, en, lead, image, imageAlt = "", position = "center", crumbs, compact }: PageHeroProps) {
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
        compact ? "min-h-[56svh] md:min-h-[60svh]" : "min-h-[78svh] md:min-h-[86svh]"
      }`}
    >
      <div aria-hidden={!imageAlt} className="absolute inset-0 -z-10">
        {image ? (
          <motion.div style={{ y: imgY }} className="absolute -inset-y-[6%] inset-x-0">
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
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,28,58,0.62)_0%,rgba(12,28,58,0.35)_45%,rgba(12,28,58,0.1)_75%)]" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0d1a33]/80 to-transparent" />
      </div>

      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="container-x flex w-full flex-col justify-end pb-14 pt-36 md:pb-20"
      >
        <div className="max-w-[980px] [text-shadow:0_1px_3px_rgba(6,20,46,0.5),0_4px_30px_rgba(6,20,46,0.45)]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
            className="eyebrow text-white/85"
          >
            {eyebrow}
          </motion.p>
          <TextReveal
            as="h1"
            immediate
            delay={0.5}
            lines={title}
            className={`heading-ja mt-6 font-medium leading-[1.6] [word-break:auto-phrase] md:mt-8 ${
              compact ? "text-[clamp(1.45rem,2.8vw,2.5rem)]" : "text-[clamp(1.6rem,3.4vw,3.1rem)]"
            }`}
            lineClassName="tracking-[0.1em] md:tracking-[0.14em]"
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
              className="mt-8 max-w-[38em] font-mincho text-[0.9375rem] font-medium leading-[2.1] tracking-[0.08em] text-white/90"
            >
              {lead}
            </motion.p>
          ) : null}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.5 }}
          className="mt-12 md:mt-16"
        >
          <Breadcrumbs items={crumbs} />
        </motion.div>
      </motion.div>
    </section>
  );
}
