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
      {/* Primary aurora layer - warm amber glow */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: `
            radial-gradient(
              ellipse 800px 400px at ${smoothPosition.x}px ${smoothPosition.y}px,
              hsl(35 90% 55% / 0.35),
              hsl(35 90% 55% / 0.15) 30%,
              transparent 70%
            )
          `,
        }}
      />

      {/* Secondary aurora layer - golden highlight */}
      <div
        className="absolute inset-0 opacity-35"
        style={{
          background: `
            radial-gradient(
              ellipse 600px 300px at ${smoothPosition.x + 100}px ${smoothPosition.y - 50}px,
              hsl(45 85% 60% / 0.3),
              hsl(45 85% 60% / 0.1) 40%,
              transparent 70%
            )
          `,
        }}
      />

      {/* Tertiary aurora layer - subtle purple accent */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background: `
            radial-gradient(
              ellipse 500px 250px at ${smoothPosition.x - 80}px ${smoothPosition.y + 80}px,
              hsl(var(--primary) / 0.3),
              hsl(var(--primary) / 0.1) 35%,
              transparent 65%
            )
          `,
        }}
      />

      {/* Ambient glow - warm background effect */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          background: `
            radial-gradient(
              circle 1000px at ${smoothPosition.x}px ${smoothPosition.y}px,
              hsl(30 80% 50% / 0.2),
              transparent 60%
            )
          `,
        }}
      />
    </div>
  );
};

export default AuroraEffect;
