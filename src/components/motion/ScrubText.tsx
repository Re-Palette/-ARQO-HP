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
};

/**
 * Headline whose characters light up one by one in step with the scroll
 * position — the reading pace follows the reader's scroll.
 */
export function ScrubText({ lines, id, className, lineClassName, dim = 0.18 }: ScrubTextProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const allowed = useMotionAllowed();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 88%", "end 45%"] });

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
  const opacity = useTransform(progress, range, [dim, 1]);
  const y = useTransform(progress, range, dim < 1 ? ["0.12em", "0em"] : ["0em", "0em"]);
  return (
    <motion.span style={{ opacity, y }} className="inline-block whitespace-pre">
      {char}
    </motion.span>
  );
}
