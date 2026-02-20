import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  spin: number;
  spinSpeed: number;
  opacity: number;
  color: string;
  type: "rose" | "cherry" | "heart";
}

const COLORS = [
  "hsl(340, 80%, 70%)",
  "hsl(355, 85%, 65%)",
  "hsl(340, 60%, 80%)",
  "hsl(0, 70%, 75%)",
  "hsl(350, 90%, 78%)",
  "hsl(330, 70%, 72%)",
  "hsl(145, 60%, 55%)",
  "hsl(160, 50%, 60%)",
];

function drawRosePetal(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, spin: number, color: string, opacity: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(spin);
  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(size, -size * 0.5, size * 1.5, size * 0.5, 0, size);
  ctx.bezierCurveTo(-size * 1.5, size * 0.5, -size, -size * 0.5, 0, 0);
  ctx.fill();
  ctx.restore();
}

function drawCherryPetal(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, spin: number, color: string, opacity: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(spin);
  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(0, 0, size * 0.6, size, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, spin: number, color: string, opacity: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(spin);
  ctx.globalAlpha = opacity * 0.7;
  ctx.fillStyle = color;
  ctx.beginPath();
  const s = size * 0.5;
  ctx.moveTo(0, s * 0.4);
  ctx.bezierCurveTo(-s * 2, -s, -s * 2, s, 0, s * 2);
  ctx.bezierCurveTo(s * 2, s, s * 2, -s, 0, s * 0.4);
  ctx.fill();
  ctx.restore();
}

const PetalCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petals = useRef<Petal[]>([]);
  const animRef = useRef<number>(0);

  const spawnPetal = (canvas: HTMLCanvasElement): Petal => {
    const types: ("rose" | "cherry" | "heart")[] = ["rose", "rose", "cherry", "cherry", "heart"];
    return {
      x: Math.random() * canvas.width,
      y: -20,
      size: Math.random() * 10 + 6,
      speed: Math.random() * 1.5 + 0.8,
      drift: (Math.random() - 0.5) * 1.2,
      spin: Math.random() * Math.PI * 2,
      spinSpeed: (Math.random() - 0.5) * 0.05,
      opacity: Math.random() * 0.5 + 0.4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      type: types[Math.floor(Math.random() * types.length)],
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 30; i++) {
      const p = spawnPetal(canvas);
      p.y = Math.random() * canvas.height;
      petals.current.push(p);
    }

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      if (frame % 8 === 0 && petals.current.length < 60) {
        petals.current.push(spawnPetal(canvas));
      }

      petals.current = petals.current.filter((p) => p.y < canvas.height + 50);

      for (const p of petals.current) {
        p.y += p.speed;
        p.x += p.drift + Math.sin(p.y * 0.01) * 0.5;
        p.spin += p.spinSpeed;

        if (p.type === "rose") drawRosePetal(ctx, p.x, p.y, p.size, p.spin, p.color, p.opacity);
        else if (p.type === "cherry") drawCherryPetal(ctx, p.x, p.y, p.size, p.spin, p.color, p.opacity);
        else drawHeart(ctx, p.x, p.y, p.size * 0.7, p.spin, p.color, p.opacity);
      }

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} id="petal-canvas" />;
};

export default PetalCanvas;
