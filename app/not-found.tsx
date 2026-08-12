"use client";

import { FogProvider } from "@/context/fog-context";
import { CursorProvider } from "@/context/cursor-context";
import { LoadingProvider } from "@/context/loading-context";
import dynamic from "next/dynamic";
import CustomCursor from "@/components/cursor/custom-cursor";
import LostInFog from "@/components/sections/lost-in-fog";

const FogCanvas = dynamic(() => import("@/components/webgl/fog-canvas"), {
  ssr: false,
});

export default function RootNotFound() {
  return (
    <LoadingProvider>
      <FogProvider>
        <CursorProvider>
          <FogCanvas />
          <CustomCursor />
          <LostInFog />
        </CursorProvider>
      </FogProvider>
    </LoadingProvider>
  );
}
