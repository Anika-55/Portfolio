"use client";

import { cn } from "@/lib/utils";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
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
  return (
    <div className={cn("h-full relative w-full bg-white", containerClassName)}>
      <Canvas className="absolute inset-0 h-full w-full">
        <DotMatrix
          colors={colors}
          opacities={opacities}
          dotSize={dotSize}
          animationSpeed={animationSpeed}
        />
      </Canvas>
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
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  // Prepare uniforms
  const uniforms = useMemo(() => {
    const colorsArray =
      colors.length === 1
        ? Array(6).fill(colors[0])
        : colors.length === 2
        ? [colors[0], colors[0], colors[0], colors[1], colors[1], colors[1]]
        : [colors[0], colors[0], colors[1], colors[1], colors[2], colors[2]];

    return {
      u_colors: {
        value: colorsArray.map((c) => new THREE.Vector3(c[0] / 255, c[1] / 255, c[2] / 255)),
      },
      u_opacities: { value: opacities },
      u_time: { value: 0 },
      u_dot_size: { value: dotSize },
      u_total_size: { value: dotSize * 2 },
      u_resolution: { value: new THREE.Vector2(size.width, size.height) },
    };
  }, [colors, opacities, dotSize, size.width, size.height]);

  // Animate u_time
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    (meshRef.current.material as THREE.ShaderMaterial).uniforms.u_time.value =
      clock.getElapsedTime() * animationSpeed;
  });

  // Shader material
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        precision mediump float;
        varying vec2 vFragCoord;
        void main() {
          vFragCoord = position.xy;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision mediump float;
        varying vec2 vFragCoord;
        uniform vec3 u_colors[6];
        uniform float u_opacities[10];
        uniform float u_time;
        uniform float u_dot_size;
        uniform float u_total_size;
        uniform vec2 u_resolution;

        float random(vec2 xy) {
          return fract(tan(dot(xy ,vec2(12.9898,78.233))) * 43758.5453);
        }

        void main() {
          vec2 st2 = floor((vFragCoord + u_resolution / 2.0) / u_total_size);
          float show_offset = random(st2);
          float rand = random(st2 + show_offset + floor(u_time * 5.0));
          float opacity = u_opacities[int(mod(rand * 10.0, 10.0))];
          vec3 color = u_colors[int(mod(show_offset * 6.0, 6.0))];
          gl_FragColor = vec4(color, opacity);
        }
      `,
    });
  }, [uniforms]);

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};
