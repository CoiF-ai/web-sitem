"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "@/context/cursor-context";

export default function CustomCursor() {
  const { variant } = useCursor();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    setEnabled(isFinePointer);
    if (!isFinePointer) return;

    document.documentElement.classList.add("custom-cursor-active");

    function handleMove(e: PointerEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    }
    function handleLeave() {
      setVisible(false);
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerleave", handleLeave);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  const isHover = variant === "hover";

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] mix-blend-difference"
      style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="rounded-full border border-mist bg-transparent"
        animate={{
          width: isHover ? 64 : 20,
          height: isHover ? 64 : 20,
          x: isHover ? -32 : -10,
          y: isHover ? -32 : -10,
          backgroundColor: isHover ? "rgba(216,217,220,0.12)" : "rgba(216,217,220,0)",
        }}
        transition={{ type: "spring", damping: 22, stiffness: 260 }}
      />
    </motion.div>
  );
}
