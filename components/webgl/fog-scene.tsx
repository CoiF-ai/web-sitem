"use client";

import { useEffect, useRef } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import FogMaterial from "./fog-material";
import { useFog } from "@/context/fog-context";
import { lerp } from "@/lib/utils";

extend({ FogMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    fogMaterial: JSX.IntrinsicElements["shaderMaterial"];
  }
}

interface FogSceneProps {
  onReady?: () => void;
}

export default function FogScene({ onReady }: FogSceneProps) {
  const materialRef = useRef<THREE.ShaderMaterial & {
    uTime: number;
    uMouse: THREE.Vector2;
    uResolution: THREE.Vector2;
    uDensity: number;
  }>(null);
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const { size, viewport } = useThree();
  const { density } = useFog();
  const readyFired = useRef(false);

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      targetMouse.current.set(
        event.clientX / window.innerWidth,
        1 - event.clientY / window.innerHeight
      );
    }
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useFrame((state) => {
    if (!materialRef.current) return;

    if (!readyFired.current) {
      readyFired.current = true;
      onReady?.();
    }

    mouse.current.x = lerp(mouse.current.x, targetMouse.current.x, 0.04);
    mouse.current.y = lerp(mouse.current.y, targetMouse.current.y, 0.04);

    materialRef.current.uTime = state.clock.elapsedTime;
    materialRef.current.uMouse = mouse.current;
    materialRef.current.uDensity = lerp(materialRef.current.uDensity ?? 1, density, 0.05);
    materialRef.current.uResolution.set(size.width, size.height);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      {/* @ts-expect-error -- registered via extend() */}
      <fogMaterial ref={materialRef} uDensity={1} />
    </mesh>
  );
}
