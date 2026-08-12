"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

type CursorVariant = "default" | "hover" | "text";

interface CursorContextValue {
  variant: CursorVariant;
  setVariant: (variant: CursorVariant) => void;
  bind: (variant?: CursorVariant) => {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
}

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const depthRef = useRef(0);

  const enter = useCallback((v: CursorVariant) => {
    depthRef.current += 1;
    setVariant(v);
  }, []);

  const leave = useCallback(() => {
    depthRef.current = Math.max(0, depthRef.current - 1);
    if (depthRef.current === 0) setVariant("default");
  }, []);

  const bind = useCallback(
    (v: CursorVariant = "hover") => ({
      onMouseEnter: () => enter(v),
      onMouseLeave: () => leave(),
    }),
    [enter, leave]
  );

  const value = useMemo(() => ({ variant, setVariant, bind }), [variant, bind]);

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error("useCursor must be used within CursorProvider");
  return ctx;
}
