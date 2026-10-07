"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { useMotionAllowed } from "./useMotionAllowed";

type ScrubTextProps = {
  lines: string[];
  id?: string;
  className?: string;
  lineClassName?: string;
  /** Opacity of characters that have not been reached yet. */
  dim?: number;
  /** Drive the lighting from an external progress value (e.g. a pinned section) instead of the headline's own pass. */
  progress?: MotionValue<number>;
  /** Portion of `progress` over which the characters light up. */
  range?: [number, number];
};

/**
 * Headline whose characters light up one by one in step with the scroll
 * position — the reading pace follows the reader's scroll.
 *
 * Performance: only one value changes per frame — the `--p` custom property
 * on the heading. Each character derives its own opacity/offset from it in
 * CSS and sits on its own compositor layer, so lighting up never repaints text.
 */
export function ScrubText({
  lines,
  id,
  className,
  lineClassName,
  dim = 0.18,
  progress,
  range: [from, to] = [0, 1],
}: ScrubTextProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const allowed = useMotionAllowed();
  const { scrollYProgress: own } = useScroll({ target: ref, offset: ["start 88%", "end 45%"] });
  const source = progress ?? own;
  const p = useTransform(source, (v) => (allowed ? Math.min(1, Math.max(0, (v - from) / (to - from))) : 1));

  const total = lines.reduce((n, l) => n + Array.from(l).length, 0);
  const width = 6 / total; // each character fades over ~6 characters' worth of scroll
  let index = 0;

  return (
    <motion.h2
      ref={ref}
      id={id}
      className={className}
      aria-label={lines.join("")}
      style={{ "--p": p, "--dim": dim } as unknown as React.CSSProperties}
    >
      {lines.map((line, li) => (
        <span key={li} aria-hidden className={["block", lineClassName].filter(Boolean).join(" ")}>
          {Array.from(line).map((char, ci) => {
            const start = (index++ / total).toFixed(4);
            return (
              <span
                key={ci}
                className="scrub-char"
                style={{ "--s": start, "--w": width.toFixed(4) } as React.CSSProperties}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </motion.h2>
  );
}
