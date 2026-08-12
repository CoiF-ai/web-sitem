"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useLoading } from "@/context/loading-context";
import { EXHIBIT_EASE } from "@/lib/motion";

interface PreloaderProps {
  label: string;
}

export default function Preloader({ label }: PreloaderProps) {
  const { isReady } = useLoading();
  const [displayValue, setDisplayValue] = useState(0);
  const [visible, setVisible] = useState(true);
  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, { damping: 24, stiffness: 90 });

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (v) => {
      setDisplayValue(Math.round(v));
    });
    return unsubscribe;
  }, [smoothProgress]);

  useEffect(() => {
    let frame: ReturnType<typeof setTimeout>;
    let current = 0;

    const tick = () => {
      const ceiling = isReady ? 100 : 88;
      const step = isReady ? 3 + Math.random() * 4 : Math.random() * 1.6;
      current = Math.min(ceiling, current + step);
      progress.set(current);

      if (current >= 100) {
        frame = setTimeout(() => setVisible(false), 420);
        return;
      }
      frame = setTimeout(tick, 60 + Math.random() * 90);
    };

    tick();
    return () => clearTimeout(frame);
  }, [isReady, progress]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.7, ease: EXHIBIT_EASE }}
        >
          <div className="flex flex-col items-center gap-6">
            <span className="font-body text-[11px] uppercase tracking-widest text-mist-dim">
              {label}
            </span>
            <span className="font-display text-6xl md:text-7xl font-extralight tabular-nums text-mist">
              {displayValue}
              <span className="text-2xl align-top text-mist-dim">%</span>
            </span>
            <motion.div
              className="h-px w-40 overflow-hidden bg-white/10"
              aria-hidden
            >
              <motion.div
                className="h-full bg-mist"
                style={{ width: `${displayValue}%` }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
