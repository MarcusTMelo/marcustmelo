import React, { useState, useEffect } from "react";

// Este componente cria um gradiente que segue o ponteiro do mouse
const AuroraEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  // Usa as cores da Paleta Oficial: Lavender Ice (#CBA7FF) e Boreal Blue (#A9C0FF)
  const style = {
    background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, 
      #CBA7FF40, #A9C0FF20, transparent 70%)`,
    transition: "background 0.2s ease-out",
  };

  return <div className="absolute inset-0 z-0 pointer-events-none" style={style} />;
};

export default AuroraEffect;
