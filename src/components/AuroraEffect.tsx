import React, { useState, useEffect, useRef } from "react";

interface Position {
  x: number;
  y: number;
}

const AuroraEffect = () => {
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState<Position>({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  // Smooth interpolation for fluid movement
  useEffect(() => {
    const animate = () => {
      setSmoothPosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.08,
        y: prev.y + (mousePosition.y - prev.y) * 0.08,
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Primary aurora layer - follows mouse */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(
              ellipse 800px 400px at ${smoothPosition.x}px ${smoothPosition.y}px,
              hsl(var(--primary) / 0.4),
              hsl(var(--primary) / 0.2) 30%,
              transparent 70%
            )
          `,
        }}
      />

      {/* Secondary aurora layer - offset position */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(
              ellipse 600px 300px at ${smoothPosition.x + 100}px ${smoothPosition.y - 50}px,
              hsl(210 80% 70% / 0.4),
              hsl(210 80% 70% / 0.15) 40%,
              transparent 70%
            )
          `,
        }}
      />

      {/* Tertiary aurora layer - creates depth */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(
              ellipse 500px 250px at ${smoothPosition.x - 80}px ${smoothPosition.y + 80}px,
              hsl(280 70% 70% / 0.35),
              hsl(280 70% 70% / 0.1) 35%,
              transparent 65%
            )
          `,
        }}
      />

      {/* Ambient glow - subtle background effect */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(
              circle 1000px at ${smoothPosition.x}px ${smoothPosition.y}px,
              hsl(var(--primary) / 0.15),
              transparent 60%
            )
          `,
        }}
      />
    </div>
  );
};

export default AuroraEffect;
