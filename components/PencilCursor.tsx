"use client";

import { useEffect, useRef } from "react";

export default function PencilCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let points: { x: number; y: number; life: number; v: number }[] = [];
    let last = { x: 0, y: 0, t: Date.now() };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const addPoint = (e: MouseEvent) => {
      const now = Date.now();
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const dt = now - last.t || 1;
      const velocity = dist / dt;

      points.push({
        x: e.clientX,
        y: e.clientY,
        life: 1,
        v: Math.min(velocity * 2, 2)
      });

      last = { x: e.clientX, y: e.clientY, t: now };
      if (points.length > 18) points.shift();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      points.forEach(p => (p.life -= 0.045));
      points = points.filter(p => p.life > 0);

      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];

        const width = 0.8 + p2.v * 1.6;

        const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        grad.addColorStop(0, `rgba(0,255,170,${p1.life})`);
        grad.addColorStop(1, `rgba(0,180,255,${p2.life})`);

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = width;
        ctx.shadowBlur = 25;
        ctx.shadowColor = "#00ffcc";
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", addPoint);
    animate();

    return () => {
      window.removeEventListener("mousemove", addPoint);
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
