"use client";

import dynamic from "next/dynamic";
import { CursorProvider } from "@/context/cursor-context";
import { FogProvider } from "@/context/fog-context";
import { LoadingProvider } from "@/context/loading-context";
import SmoothScrollProvider from "./smooth-scroll-provider";
import Preloader from "@/components/preloader/preloader";

const FogCanvas = dynamic(() => import("@/components/webgl/fog-canvas"), {
  ssr: false,
});

export default function AppProviders({
  children,
  preloaderLabel = "Compiling the fog",
}: {
  children: React.ReactNode;
  preloaderLabel?: string;
}) {
  return (
    <LoadingProvider>
      <FogProvider>
        <CursorProvider>
          <FogCanvas />
          <div aria-hidden className="grain-overlay" />
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
          <Preloader label={preloaderLabel} />
        </CursorProvider>
      </FogProvider>
    </LoadingProvider>
  );
}
