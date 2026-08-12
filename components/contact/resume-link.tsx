"use client";

import { useCursor } from "@/context/cursor-context";

export default function ResumeLink({ label }: { label: string }) {
  const { bind } = useCursor();
  return (
    <a
      {...bind("hover")}
      href="/resume.pdf"
      download
      className="glass inline-flex w-fit items-center gap-3 rounded-full px-6 py-3 font-body text-[11px] uppercase tracking-widest text-mist transition-colors hover:bg-white/[0.07]"
    >
      {label}
      <span aria-hidden>↓</span>
    </a>
  );
}
