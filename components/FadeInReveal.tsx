"use client";

import { motion } from "framer-motion";

interface FadeInRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function FadeInReveal({ children, delay = 0, className }: FadeInRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
