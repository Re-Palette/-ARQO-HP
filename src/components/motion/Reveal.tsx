"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  duration?: number;
  amount?: number;
};

/** Soft fade + rise when the element enters the viewport (once). */
export function Reveal({ children, delay = 0, y = 28, duration = 1.2, amount = 0.3, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
