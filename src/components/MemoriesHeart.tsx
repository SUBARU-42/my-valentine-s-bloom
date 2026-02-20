import { useState, useEffect } from "react";

interface Props {
  onClose: () => void;
}

// Heart shape positions (normalized -1 to 1)
const HEART_POSITIONS = [
  // Top left curve
  { x: -0.25, y: -0.50 }, { x: -0.50, y: -0.60 }, { x: -0.65, y: -0.50 },
  { x: -0.70, y: -0.30 }, { x: -0.60, y: -0.10 },
  // Top right curve
  { x: 0.25, y: -0.50 }, { x: 0.50, y: -0.60 }, { x: 0.65, y: -0.50 },
  { x: 0.70, y: -0.30 }, { x: 0.60, y: -0.10 },
  // Bottom V
  { x: -0.40, y: 0.15 }, { x: -0.20, y: 0.38 }, { x: 0.0, y: 0.58 },
  { x: 0.20, y: 0.38 }, { x: 0.40, y: 0.15 },
  // Fill middle
  { x: -0.30, y: -0.20 }, { x: 0.30, y: -0.20 },
  { x: -0.10, y: -0.10 }, { x: 0.10, y: -0.10 },
];

// Photo placeholders with romantic captions
const PHOTOS = [
  { emoji: "📸", caption: "Our first date", bg: "hsl(340, 40%, 20%)" },
  { emoji: "🌹", caption: "A special moment", bg: "hsl(145, 35%, 12%)" },
  { emoji: "💫", caption: "Laughing together", bg: "hsl(340, 30%, 18%)" },
  { emoji: "🌙", caption: "Late nights", bg: "hsl(220, 40%, 12%)" },
  { emoji: "☕", caption: "Morning coffee", bg: "hsl(30, 40%, 12%)" },
  { emoji: "🌿", caption: "Our walks", bg: "hsl(145, 35%, 12%)" },
  { emoji: "💌", caption: "Sweet messages", bg: "hsl(340, 35%, 18%)" },
  { emoji: "🎵", caption: "Our song", bg: "hsl(270, 30%, 12%)" },
  { emoji: "✨", caption: "You & me", bg: "hsl(45, 40%, 12%)" },
  { emoji: "🌸", caption: "Springtime", bg: "hsl(340, 40%, 20%)" },
  { emoji: "🤗", caption: "Warm hugs", bg: "hsl(15, 35%, 14%)" },
  { emoji: "💚", caption: "Always together", bg: "hsl(145, 40%, 12%)" },
  { emoji: "🌟", caption: "Our adventures", bg: "hsl(45, 35%, 12%)" },
  { emoji: "🎀", caption: "My everything", bg: "hsl(340, 35%, 16%)" },
  { emoji: "💝", caption: "Forever yours", bg: "hsl(340, 40%, 20%)" },
  { emoji: "🦋", caption: "Butterflies", bg: "hsl(220, 35%, 12%)" },
  { emoji: "🌊", caption: "Endless", bg: "hsl(200, 40%, 12%)" },
  { emoji: "🕯️", caption: "Candlelight", bg: "hsl(30, 35%, 12%)" },
  { emoji: "💕", caption: "Us", bg: "hsl(340, 40%, 18%)" },
];

const MemoriesHeart = ({ onClose }: Props) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const photoCount = Math.min(PHOTOS.length, HEART_POSITIONS.length);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVisibleCount(count);
      if (count >= photoCount) clearInterval(interval);
    }, 300);
    return () => clearInterval(interval);
  }, [photoCount]);

  const heartWidth = 340;
  const heartHeight = 340;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="sparkle-star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              "--dur": `${1.5 + Math.random() * 2}s`,
              "--delay": `${Math.random() * 2}s`,
              "--size": `${Math.random() * 12 + 8}px`,
            } as React.CSSProperties}
          >
            ✦
          </div>
        ))}
      </div>

      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors text-sm"
        style={{ fontFamily: "var(--font-body)" }}
      >
        ✕ Close
      </button>

      <h2
        className="text-3xl mb-2 text-center"
        style={{ fontFamily: "var(--font-script)", color: "hsl(var(--primary))" }}
      >
        Our Beautiful Memories
      </h2>
      <p className="text-sm mb-8 text-center" style={{ color: "hsl(var(--muted-foreground))", fontFamily: "var(--font-body)" }}>
        Each photo, a piece of my heart 💕
      </p>

      <div
        className="relative"
        style={{ width: heartWidth, height: heartHeight }}
      >
        {HEART_POSITIONS.slice(0, photoCount).map((pos, i) => {
          const photo = PHOTOS[i % PHOTOS.length];
          const px = heartWidth / 2 + pos.x * (heartWidth * 0.48) - 28;
          const py = heartHeight / 2 + pos.y * (heartHeight * 0.48) - 28;
          const isVisible = i < visibleCount;

          return (
            <div
              key={i}
              className="absolute photo-frame flex flex-col items-center justify-center group"
              style={{
                left: px,
                top: py,
                width: 56,
                height: 56,
                background: photo.bg,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "scale(1)" : "scale(0)",
                transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                transitionDelay: isVisible ? "0s" : "0s",
                cursor: "pointer",
              }}
              title={photo.caption}
            >
              <span style={{ fontSize: "1.5rem" }}>{photo.emoji}</span>
              <div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: "hsl(var(--primary))", fontFamily: "var(--font-script)" }}
              >
                {photo.caption}
              </div>
            </div>
          );
        })}
      </div>

      <p
        className="mt-12 text-center text-lg"
        style={{ fontFamily: "var(--font-script)", color: "hsl(var(--primary))" }}
      >
        {visibleCount >= photoCount ? "Every memory with you is my favorite ♥" : "Creating our heart of memories..."}
      </p>

      <p className="text-xs mt-3 text-center" style={{ color: "hsl(var(--muted-foreground))", fontFamily: "var(--font-body)", maxWidth: 300 }}>
        💡 Tip: You can replace the emoji placeholders with real photos in the code!
      </p>
    </div>
  );
};

export default MemoriesHeart;
