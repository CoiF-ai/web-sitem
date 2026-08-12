"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import FogScene from "./fog-scene";
import { useLoading } from "@/context/loading-context";

export default function FogCanvas() {
  const { setReady } = useLoading();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10"
      style={{ pointerEvents: "none" }}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 1] }}
        onCreated={() => setReady(true)}
      >
        <Suspense fallback={null}>
          <FogScene onReady={() => setReady(true)} />
          {!reducedMotion && (
            <EffectComposer multisampling={0}>
              <Noise opacity={0.025} />
              <Vignette eskil={false} offset={0.25} darkness={0.9} />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
