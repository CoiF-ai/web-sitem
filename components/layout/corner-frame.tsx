"use client";

import { useCursor } from "@/context/cursor-context";
import { useLenis } from "@/context/lenis-context";
import { useLocale } from "@/context/locale-context";

const sections = [
  { id: "work", key: "work" as const },
  { id: "about", key: "about" as const },
  { id: "contact", key: "contact" as const },
];

export default function CornerFrame() {
  const { dict } = useLocale();
  const { bind } = useCursor();
  const lenisRef = useLenis();

  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -40, duration: 1.3 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      <button
        {...bind("hover")}
        type="button"
        onClick={() => scrollToId("hero")}
        className="fixed left-6 top-6 z-40 font-display text-sm tracking-widest text-mist md:left-10 md:top-8"
        aria-label="Back to top"
      >
        {dict.nav.mark}
      </button>

      <nav
        aria-label="Section navigation"
        className="fixed right-6 top-6 z-40 hidden gap-8 font-body text-[11px] uppercase tracking-widest text-mist-dim md:right-10 md:top-8 md:flex"
      >
        {sections.map((section) => (
          <button
            key={section.id}
            {...bind("hover")}
            type="button"
            onClick={() => scrollToId(section.id)}
            className="transition-colors duration-300 hover:text-mist"
          >
            {dict.nav[section.key]}
          </button>
        ))}
      </nav>
    </>
  );
}
