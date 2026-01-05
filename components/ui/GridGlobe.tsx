"use client";

import React from "react";
import { motion } from "framer-motion";

const GridGlobe = () => {
  // You can keep your sample arcs and colors if you plan to use them for other visuals
  const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
  const sampleArcs = [
    { startLat: -19.885592, startLng: -43.951191, endLat: -22.9068, endLng: -43.1729, color: colors[0] },
    { startLat: 28.6139, startLng: 77.209, endLat: 3.139, endLng: 101.6869, color: colors[1] },
    { startLat: -19.885592, startLng: -43.951191, endLat: -1.303396, endLng: 36.852443, color: colors[2] },
  ];

  return (
    <div className="flex items-center justify-center absolute -left-5 top-36 md:top-40 w-full h-full">
      <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-96 px-4">
        {/* Placeholder content instead of Globe */}
        <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-black dark:text-white rounded-lg">
          Globe removed
        </div>

        <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent dark:to-black to-white z-40" />
      </div>
    </div>
  );
};

export default GridGlobe;
