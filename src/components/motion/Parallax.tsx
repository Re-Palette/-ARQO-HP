"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  /** Vertical travel in percent of the element height across the viewport pass. */
  speed?: number;
  /** Optional scale range [from, to] synced to scroll. */
  scale?: [number, number];
};

/**
 * Scroll-synced parallax via GSAP ScrollTrigger (scrub).
 * Wrap an oversized media element inside an overflow-hidden frame.
 */
export function Parallax({ children, className, speed = 12, scale }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [scaleFrom, scaleTo] = scale ?? [1, 1];

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -speed / 2, scale: scaleFrom },
        {
          yPercent: speed / 2,
          scale: scaleTo,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });
    return () => ctx.revert();
  }, [speed, scaleFrom, scaleTo]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
