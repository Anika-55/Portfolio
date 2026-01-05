"use client";

import { useEffect, useRef } from "react";

export default function EnergyCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let ripples: { x: number; y: number; r: number; life: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = (e: MouseEvent) => {
      ripples.push({ x: e.clientX, y: e.clientY, r: 0, life: 1 });
      if (ripples.length > 25) ripples.shift();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ripples.forEach(r => {
        r.r += 1.8;
        r.life -= 0.03;

        const grad = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, r.r);
        grad.addColorStop(0, `rgba(0,255,200,${r.life * 0.4})`);
        grad.addColorStop(0.5, `rgba(0,200,255,${r.life * 0.15})`);
        grad.addColorStop(1, `rgba(0,0,0,0)`);

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      ripples = ripples.filter(r => r.life > 0);
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", spawn);
    animate();

    return () => {
      window.removeEventListener("mousemove", spawn);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
    />
  );
}
