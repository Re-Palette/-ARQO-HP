"use client";

import Lenis from "lenis";
import { MotionConfig } from "framer-motion";
import { gsap } from "gsap";
import { createContext, useContext, useEffect, useState } from "react";
import { isLiteDevice } from "./useMotionAllowed";

const LenisContext = createContext<Lenis | null>(null);

/** Access the global Lenis instance (null when reduced motion is on). */
export const useLenis = () => useContext(LenisContext);

/**
 * Global smooth scrolling.
 * Lenis is driven by GSAP's ticker so smooth scrolling runs on a single,
 * lag-free frame loop.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  // Low-power devices get a lighter render path (see globals.css: [data-perf="lite"]).
  useEffect(() => {
    if (isLiteDevice()) document.documentElement.dataset.perf = "lite";
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      autoRaf: false,
      lerp: 0.085,
      wheelMultiplier: 0.9,
      anchors: { duration: 1.6 },
    });

    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LenisContext.Provider>
  );
}
