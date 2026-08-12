"use client";

import { createContext, useContext, useMemo, useState } from "react";

interface LoadingContextValue {
  progress: number;
  isReady: boolean;
  setProgress: (progress: number) => void;
  setReady: (ready: boolean) => void;
}

const LoadingContext = createContext<LoadingContextValue | null>(null);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [isReady, setReady] = useState(false);

  const value = useMemo(
    () => ({ progress, isReady, setProgress, setReady }),
    [progress, isReady]
  );

  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
}

export function useLoading() {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error("useLoading must be used within LoadingProvider");
  return ctx;
}
