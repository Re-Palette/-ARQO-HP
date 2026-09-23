"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useMotionAllowed } from "./useMotionAllowed";

type ScrollMarqueeProps = {
  words: string[];
  className?: string;
};

/**
 * Two rows of oversized outlined type that slide in opposite directions,
 * driven directly by the scroll position (not by time).
 */
export function ScrollMarquee({ words, className }: ScrollMarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const allowed = useMotionAllowed();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const xA = useTransform(scrollYProgress, [0, 1], allowed ? ["0%", "-38%"] : ["-10%", "-10%"]);
  const xB = useTransform(scrollYProgress, [0, 1], allowed ? ["-38%", "0%"] : ["-20%", "-20%"]);

  const row = [...words, ...words, ...words];

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none select-none overflow-hidden ${className ?? ""}`}>
      {[xA, xB].map((x, r) => (
        <motion.div key={r} style={{ x }} className="flex w-max items-center gap-[0.35em] whitespace-nowrap will-change-transform">
          {row.map((w, i) => (
            <span key={i} className="flex items-center gap-[0.35em]">
              <span className={r === 0 ? "italic" : ""}>{w}</span>
              <span className="inline-block size-[0.08em] rounded-full bg-current opacity-60" />
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
