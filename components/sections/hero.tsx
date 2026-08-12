"use client";

import { motion, type Variants } from "framer-motion";
import { useLocale } from "@/context/locale-context";
import { EXHIBIT_EASE } from "@/lib/motion";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const line: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: EXHIBIT_EASE },
  },
};

export default function Hero() {
  const { dict } = useLocale();
  const titleLines = dict.hero.title.split("\n");

  return (
    <section
      id="hero"
      className="relative flex min-h-[100vh] flex-col items-center justify-center px-6 text-center"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        className="flex flex-col items-center gap-8"
      >
        <motion.span
          variants={line}
          className="font-body text-[11px] uppercase tracking-widest text-mist-dim"
        >
          {dict.hero.kicker}
        </motion.span>

        <h1 className="font-display text-4xl font-light leading-[1.05] text-mist sm:text-6xl md:text-7xl lg:text-8xl">
          {titleLines.map((textLine, i) => (
            <motion.span key={i} variants={line} className="block text-balance">
              {textLine}
            </motion.span>
          ))}
        </h1>

        <motion.p
          variants={line}
          className="max-w-md font-body text-sm font-light leading-relaxed text-mist-dim sm:text-base"
        >
          {dict.hero.subtitle}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-16 flex flex-col items-center gap-3 md:bottom-24"
      >
        <span className="font-body text-[10px] uppercase tracking-widest text-mist-dim">
          {dict.hero.scroll}
        </span>
        <motion.span
          className="h-10 w-px bg-mist-dim/60"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
