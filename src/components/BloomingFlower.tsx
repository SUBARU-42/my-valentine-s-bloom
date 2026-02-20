import { useEffect, useState } from "react";

interface Props {
  delay?: number;
  x: string;
  y: string;
  size?: number;
  color?: string;
}

const BloomingFlower = ({ delay = 0, x, y, size = 60, color = "hsl(340, 80%, 65%)" }: Props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const petalCount = 6;
  const petals = Array.from({ length: petalCount });
  const stemColor = "hsl(145, 50%, 28%)";

  return (
    <div
      className="absolute pointer-events-none"
      style={{ left: x, top: y, width: size, height: size * 2 }}
    >
      {/* Stem */}
      {visible && (
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 animate-sway"
          style={{
            width: 3,
            height: size * 1.2,
            background: stemColor,
            borderRadius: 4,
            transformOrigin: "bottom center",
          }}
        />
      )}
      {/* Petals */}
      {visible && petals.map((_, i) => (
        <div
          key={i}
          className="absolute animate-bloom"
          style={{
            left: "50%",
            top: 0,
            width: size * 0.45,
            height: size * 0.6,
            background: color,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            transformOrigin: "50% 100%",
            transform: `translateX(-50%) rotate(${i * (360 / petalCount)}deg)`,
            opacity: 0.85,
            animationDelay: `${delay * 0.001 + i * 0.08}s`,
            boxShadow: `0 0 8px ${color}88`,
          }}
        />
      ))}
      {/* Center */}
      {visible && (
        <div
          className="absolute animate-bloom"
          style={{
            left: "50%",
            top: size * 0.22,
            width: size * 0.32,
            height: size * 0.32,
            background: "hsl(45, 90%, 65%)",
            borderRadius: "50%",
            transform: "translateX(-50%)",
            boxShadow: "0 0 10px hsl(45, 90%, 65%)",
            animationDelay: `${delay * 0.001 + 0.5}s`,
          }}
        />
      )}
    </div>
  );
};

export default BloomingFlower;
