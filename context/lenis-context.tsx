"use client";

import { createContext, useContext } from "react";
import type Lenis from "@studio-freight/lenis";

export const LenisContext = createContext<{ current: Lenis | null }>({ current: null });

export function useLenis() {
  return useContext(LenisContext);
}
