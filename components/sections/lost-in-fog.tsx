"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useFog } from "@/context/fog-context";
import { useCursor } from "@/context/cursor-context";
import { defaultLocale, isLocale } from "@/i18n/config";
import { EXHIBIT_EASE } from "@/lib/motion";
import en from "@/dictionaries/en.json";
import tr from "@/dictionaries/tr.json";

const dictionaries = { en, tr };

export default function LostInFog() {
  const pathname = usePathname();
  const { setDensity } = useFog();
  const { bind } = useCursor();

  const firstSegment = pathname?.split("/")[1] ?? "";
  const locale = isLocale(firstSegment) ? firstSegment : defaultLocale;
  const dict = dictionaries[locale];

  useEffect(() => {
    setDensity(2.6);
    return () => setDensity(1);
  }, [setDensity]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EXHIBIT_EASE }}
        className="flex flex-col items-center gap-6"
      >
        <span className="font-body text-[11px] uppercase tracking-widest text-mist-dim">
          {dict.notFound.kicker}
        </span>
        <h1 className="font-display text-5xl font-light text-mist sm:text-6xl md:text-7xl">
          {dict.notFound.title}
        </h1>
        <p className="max-w-sm font-body text-sm leading-relaxed text-mist-dim">
          {dict.notFound.body}
        </p>
        <Link
          {...bind("hover")}
          href={`/${locale}`}
          className="mt-4 font-body text-[11px] uppercase tracking-widest text-mist underline-offset-4"
        >
          {dict.notFound.cta} →
        </Link>
      </motion.div>
    </main>
  );
}
