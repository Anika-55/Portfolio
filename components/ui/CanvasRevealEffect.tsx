"use client";

import { cn } from "@/lib/utils";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";

interface CanvasRevealEffectProps {
  animationSpeed?: number;
  opacities?: number[];
  colors?: number[][];
  containerClassName?: string;
  dotSize?: number;
  showGradient?: boolean;
}

export const CanvasRevealEffect: React.FC<CanvasRevealEffectProps> = ({
  animationSpeed = 0.4,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  containerClassName,
  dotSize = 2,
  showGradient = true,
}) => {
  const [loaded, setLoaded] = useState(false);

  // Lazy load after mount
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={cn("h-full relative w-full bg-white", containerClassName)}>
      {loaded && (
        <Canvas className="absolute inset-0 h-full w-full">
          <DotMatrix
            colors={colors}
            opacities={opacities}
            dotSize={dotSize}
            animationSpeed={animationSpeed}
          />
        </Canvas>
      )}
      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-[84%]" />
      )}
    </div>
  );
};

interface DotMatrixProps {
  colors?: number[][];
  opacities?: number[];
  dotSize?: number;
  animationSpeed?: number;
}

const DotMatrix: React.FC<DotMatrixProps> = ({
  colors = [[0, 255, 255]],
  opacities = [0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.14],
  dotSize = 2,
  animationSpeed = 0.4,
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const numDotsX = 50; // fewer dots horizontally
  const numDotsY = 30; // fewer dots vertically
  const totalDots = numDotsX * numDotsY;

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const colorsArray = useMemo(() => {
    return Array.from({ length: totalDots }, (_, i) => {
      const color = colors[i % colors.length];
      return new THREE.Color(color[0] / 255, color[1] / 255, color[2] / 255);
    });
  }, [colors, totalDots]);

  const opacitiesArray = useMemo(() => {
    return Array.from({ length: totalDots }, (_, i) => opacities[i % opacities.length]);
  }, [opacities, totalDots]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    let index = 0;
    for (let i = 0; i < numDotsX; i++) {
      for (let j = 0; j < numDotsY; j++) {
        const x = (i - numDotsX / 2) * dotSize * 2;
        const y = (j - numDotsY / 2) * dotSize * 2;
        dummy.position.set(x, y, 0);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(index, dummy.matrix);
        meshRef.current.setColorAt(index, colorsArray[index].clone().multiplyScalar(opacitiesArray[index] * Math.abs(Math.sin(clock.elapsedTime * animationSpeed + index))));
        index++;
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.instanceColor!.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, totalDots]}>
      <circleGeometry args={[dotSize, 6]} />
      <meshBasicMaterial vertexColors transparent />
    </instancedMesh>
  );
};
