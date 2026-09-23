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
  const scrollYProgress = useTransform(source, (v) => Math.min(1, Math.max(0, (v - from) / (to - from))));

  const total = lines.reduce((n, l) => n + l.length, 0);
  let index = 0;

  return (
    <h2 ref={ref} id={id} className={className} aria-label={lines.join("")}>
      {lines.map((line, li) => (
        <span key={li} aria-hidden className={["block", lineClassName].filter(Boolean).join(" ")}>
          {Array.from(line).map((char, ci) => {
            const start = index / total;
            index += 1;
            return (
              <Char
                key={ci}
                char={char}
                progress={scrollYProgress}
                range={[start, Math.min(1, start + 6 / total)]}
                dim={allowed ? dim : 1}
              />
            );
          })}
        </span>
      ))}
    </h2>
  );
}

function Char({
  char,
  progress,
  range,
  dim,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
  dim: number;
}) {
  const t = useTransform(progress, (v) => Math.min(1, Math.max(0, (v - range[0]) / (range[1] - range[0]))));
  const opacity = useTransform(t, (v) => dim + (1 - dim) * v);
  const y = useTransform(t, (v) => (dim < 1 ? `${(1 - v) * 0.12}em` : "0em"));
  return (
    <motion.span style={{ opacity, y }} className="inline-block whitespace-pre">
      {char}
    </motion.span>
  );
}
