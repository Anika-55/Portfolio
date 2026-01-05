"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Color, PerspectiveCamera, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import countries from "@/data/globe.json";

export type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

interface WorldProps {
  globeConfig?: GlobeConfig;
  data: Position[];
}

const safeColor = (hex?: string) => hex || "#ffffff";

function GlobeWrapper({ globeConfig, data }: WorldProps) {
  const globeRef = useRef<ThreeGlobe>();
  const [globeData, setGlobeData] = useState<any[]>([]);

  const defaultProps: GlobeConfig = {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#1d072e",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    autoRotate: true,
    autoRotateSpeed: 1,
    ...globeConfig,
  };

  useEffect(() => {
    if (!globeRef.current) return;

    // Build globe material
    const mat = globeRef.current.globeMaterial() as any;
    mat.color = new Color(safeColor(defaultProps.globeColor));
    mat.emissive = new Color(safeColor(defaultProps.emissive));
    mat.emissiveIntensity = defaultProps.emissiveIntensity!;
    mat.shininess = defaultProps.shininess!;

    // Build points
    const points: any[] = [];
    data.forEach((arc) => {
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: (t: number) => safeColor(arc.color),
        lat: arc.startLat,
        lng: arc.startLng,
      });
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: (t: number) => safeColor(arc.color),
        lat: arc.endLat,
        lng: arc.endLng,
      });
    });
    setGlobeData(points);

    // Set polygons & atmosphere
    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .hexPolygonColor(() => safeColor(defaultProps.polygonColor))
      .showAtmosphere(defaultProps.showAtmosphere!)
      .atmosphereColor(safeColor(defaultProps.atmosphereColor))
      .atmosphereAltitude(defaultProps.atmosphereAltitude!);

    // Set arcs
    globeRef.current
      .arcsData(data)
      .arcColor((d) => safeColor(d.color))
      .arcAltitude((d) => d.arcAlt || 0.1)
      .arcStroke(() => 0.3)
      .arcDashLength(defaultProps.arcLength!)
      .arcDashGap(15)
      .arcDashAnimateTime(defaultProps.arcTime!);
  }, [data]);

  useEffect(() => {
    if (!globeRef.current) return;
    if (!globeData.length) return;

    globeRef.current
      .pointsData(globeData)
      .pointColor((d) => safeColor(d.color(0)))
      .pointsMerge(true)
      .pointRadius(defaultProps.pointSize);

    // Rings animation
    let interval = setInterval(() => {
      if (!globeRef.current) return;
      const randomIndices: number[] = [];
      while (randomIndices.length < Math.floor((globeData.length * 4) / 5)) {
        const r = Math.floor(Math.random() * globeData.length);
        if (!randomIndices.includes(r)) randomIndices.push(r);
      }
      globeRef.current.ringsData(randomIndices.map((i) => globeData[i]));
    }, 2000);

    return () => clearInterval(interval);
  }, [globeData]);

  return <primitive object={globeRef.current ?? new ThreeGlobe()} ref={globeRef} />;
}

const aspect = 1.2;
const cameraZ = 300;

export function World({ globeConfig, data }: WorldProps) {
  return (
    <Canvas camera={new PerspectiveCamera(50, aspect, 180, 1800)}>
      <ambientLight color={safeColor(globeConfig?.ambientLight)} intensity={0.6} />
      <directionalLight color={safeColor(globeConfig?.directionalLeftLight)} position={new Vector3(-400, 100, 400)} />
      <directionalLight color={safeColor(globeConfig?.directionalTopLight)} position={new Vector3(-200, 500, 200)} />
      <pointLight color={safeColor(globeConfig?.pointLight)} position={new Vector3(-200, 500, 200)} intensity={0.8} />

      <GlobeWrapper globeConfig={globeConfig} data={data} />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={cameraZ}
        maxDistance={cameraZ}
        autoRotate={globeConfig?.autoRotate ?? true}
        autoRotateSpeed={globeConfig?.autoRotateSpeed ?? 1}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  );
}
