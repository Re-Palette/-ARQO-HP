"use client";

import Lenis from "lenis";
import { cancelFrame, frame, MotionConfig } from "framer-motion";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { isLiteDevice } from "./useMotionAllowed";

const LenisContext = createContext<Lenis | null>(null);

/** Access the global Lenis instance (null when reduced motion is on). */
export const useLenis = () => useContext(LenisContext);

/**
 * Global smooth scrolling.
 * Lenis runs inside Framer Motion's own frame loop (update step), so the
 * smoothed scroll position and every scroll-linked transform are computed in
 * the same frame — no second requestAnimationFrame loop to drift against.
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
      // Slightly quicker catch-up: smooth, but the page follows the wheel without feeling heavy.
      lerp: 0.1,
      anchors: { duration: 1.6 },
    });

    const tick = ({ timestamp }: { timestamp: number }) => instance.raf(timestamp);
    frame.update(tick, true);
    setLenis(instance);

    return () => {
      cancelFrame(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  // New page: start at the top (unless the URL targets an anchor) and re-measure.
  const pathname = usePathname();
  useEffect(() => {
    if (!lenis) return;
    if (!window.location.hash) lenis.scrollTo(0, { immediate: true, force: true });
    lenis.resize();
  }, [pathname, lenis]);

  return (
    <LenisContext.Provider value={lenis}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LenisContext.Provider>
  );
}
