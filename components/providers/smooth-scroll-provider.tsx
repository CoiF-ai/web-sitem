"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { LenisContext } from "@/context/lenis-context";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<{ current: Lenis | null }>({ current: null });

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current.current = lenis;

    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    const contextRef = lenisRef.current;
    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      contextRef.current = null;
    };
  }, []);

  return <LenisContext.Provider value={lenisRef.current}>{children}</LenisContext.Provider>;
}
