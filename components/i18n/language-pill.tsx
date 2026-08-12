"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Magnetic from "@/components/common/magnetic";
import { useCursor } from "@/context/cursor-context";
import { locales, type Locale } from "@/i18n/config";
import { useLocale } from "@/context/locale-context";
import { cn } from "@/lib/utils";

export default function LanguagePill() {
  const { locale, dict } = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { bind } = useCursor();

  function switchTo(target: Locale) {
    if (target === locale) return;
    const segments = pathname.split("/");
    segments[1] = target;
    const nextPath = segments.join("/") || `/${target}`;
    document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000`;
    router.push(nextPath);
  }

  return (
    <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center md:bottom-10">
      <Magnetic strength={0.35}>
        <div
          {...bind("hover")}
          className="glass flex items-center gap-1 rounded-full px-1.5 py-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
          role="group"
          aria-label="Language switch"
        >
          {locales.map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => switchTo(code)}
              className={cn(
                "relative rounded-full px-4 py-2 font-body text-[11px] uppercase tracking-widest transition-colors duration-300",
                locale === code ? "text-void" : "text-mist-dim hover:text-mist"
              )}
            >
              {locale === code && (
                <motion.span
                  layoutId="lang-pill-active"
                  className="absolute inset-0 rounded-full bg-mist"
                  transition={{ type: "spring", damping: 22, stiffness: 260 }}
                />
              )}
              <span className="relative z-10">{dict.language[code]}</span>
            </button>
          ))}
        </div>
      </Magnetic>
    </div>
  );
}
