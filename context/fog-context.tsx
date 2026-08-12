"use client";

import { createContext, useContext, useMemo, useState } from "react";

interface FogContextValue {
  density: number;
  setDensity: (density: number) => void;
}

const FogContext = createContext<FogContextValue | null>(null);

export function FogProvider({ children }: { children: React.ReactNode }) {
  const [density, setDensity] = useState(1);
  const value = useMemo(() => ({ density, setDensity }), [density]);
  return <FogContext.Provider value={value}>{children}</FogContext.Provider>;
}

export function useFog() {
  const ctx = useContext(FogContext);
  if (!ctx) throw new Error("useFog must be used within FogProvider");
  return ctx;
}

/** Mounts on a page to intensify the fog for the duration it's on screen. */
export function useIntenseFog(level = 2.4) {
  const { setDensity } = useFog();
  return {
    onMount: () => setDensity(level),
    onUnmount: () => setDensity(1),
  };
}
