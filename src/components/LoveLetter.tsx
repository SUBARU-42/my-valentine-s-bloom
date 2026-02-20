import { useState, useEffect, useRef } from "react";

const pages = [
  {
    title: "My Dearest Love 💌",
    content: `From the very first moment I saw you, I knew something was different about that day. There was a warmth in the air, a quiet magic I couldn't quite explain. Little did I know, that was the universe whispering your name into my heart.

Every day since then has been brighter, softer, and more beautiful — simply because you're in it. You are my favorite chapter in the story of my life.`,
  },
  {
    title: "What You Mean to Me 🌹",
    content: `You are the reason I smile at random moments. You are the song I didn't know I was waiting to hear. When the world feels loud and overwhelming, the thought of you is my quiet place.

Your laugh is my favorite sound. Your presence is my favorite feeling. I didn't know love could feel this gentle and this bold at the same time — until you.`,
  },
  {
    title: "Our Little Adventures 🌿",
    content: `I treasure every moment with you — the little ones most of all. The silly conversations, the comfortable silences, the way we find joy in the smallest of things together.

With you, ordinary days become memories I'll hold forever. Every inside joke, every shared glance, every "remember when" is a thread in the fabric of something rare and beautiful.`,
  },
  {
    title: "My Promise to You 💚",
    content: `I promise to be your safe place. To be the person who cheers the loudest for you and holds you closest when things go wrong. I promise to love you on your bright days and your cloudy ones alike.

I promise to keep choosing you — not just today, but every day that follows. You deserve to be loved in the way that makes you feel truly seen. And I see you. All of you.`,
  },
  {
    title: "Forever Yours 🌸",
    content: `So here I am, on this Valentine's Day, with a heart full of love and a soul that is yours completely. I don't have grand gestures or poetic words enough to describe what you mean to me.

But I have this: a love that is real, that is patient, that is full and true. A love that looks at you and says — yes, you. Always you.

Happy Valentine's Day, my love. Thank you for being mine. 💕`,
  },
];

interface Props {
  onClose: () => void;
}

const LoveLetter = ({ onClose }: Props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
    const audio = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3");
    audio.loop = true;
    audio.volume = 0.25;
    audio.play().catch(() => {});
    audioRef.current = audio;
    setAudioStarted(true);
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const goToPage = (dir: 1 | -1) => {
    const next = currentPage + dir;
    if (next < 0 || next >= pages.length) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentPage(next);
      setAnimating(false);
    }, 300);
  };

  const heartPositions = [
    { left: "5%", top: "10%" },
    { left: "90%", top: "15%" },
    { left: "15%", top: "50%" },
    { left: "85%", top: "55%" },
    { left: "8%", top: "80%" },
    { left: "88%", top: "85%" },
    { left: "50%", top: "5%" },
    { left: "50%", top: "95%" },
    { left: "30%", top: "20%" },
    { left: "70%", top: "25%" },
    { left: "20%", top: "75%" },
    { left: "75%", top: "70%" },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
      style={{ background: "hsl(150 25% 4% / 0.92)" }}
    >
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {heartPositions.map((pos, i) => (
          <div
            key={i}
            className="absolute animate-twinkle"
            style={{
              left: pos.left,
              top: pos.top,
              animationDelay: `${i * 0.25}s`,
              fontSize: `${Math.random() * 16 + 10}px`,
              opacity: 0.25,
              color: "hsl(340, 80%, 65%)",
            }}
          >
            ♥
          </div>
        ))}
      </div>

      <div className="relative w-full max-w-2xl mx-4">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 transition-colors text-sm"
          style={{ color: "hsl(var(--muted-foreground))", fontFamily: "var(--font-body)" }}
        >
          ✕ Close Letter
        </button>

        <div className="text-center mb-3 text-sm" style={{ color: "hsl(var(--muted-foreground))", fontFamily: "var(--font-body)" }}>
          Page {currentPage + 1} of {pages.length}
        </div>

        <div
          className={`letter-page animate-letter-glow transition-all duration-300 ${animating ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
        >
          <div className="absolute top-4 left-4 opacity-40 text-lg" style={{ color: "hsl(340, 70%, 60%)" }}>❀</div>
          <div className="absolute top-4 right-4 opacity-40 text-lg" style={{ color: "hsl(340, 70%, 60%)" }}>❀</div>
          <div className="absolute bottom-4 left-4 opacity-40 text-lg" style={{ color: "hsl(340, 70%, 60%)" }}>❀</div>
          <div className="absolute bottom-4 right-4 opacity-40 text-lg" style={{ color: "hsl(340, 70%, 60%)" }}>❀</div>

          <h2
            className="text-center text-2xl font-bold mb-6"
            style={{ color: "hsl(340, 70%, 35%)", fontFamily: "var(--font-heading)" }}
          >
            {pages[currentPage].title}
          </h2>
          <p style={{ color: "hsl(150, 20%, 15%)", whiteSpace: "pre-line", fontSize: "1.1rem", fontFamily: "var(--font-script)" }}>
            {pages[currentPage].content}
          </p>

          <div className="flex justify-center gap-2 mt-6">
            {pages.map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background: i === currentPage ? "hsl(340, 80%, 55%)" : "hsl(340, 30%, 70%)",
                  transform: i === currentPage ? "scale(1.4)" : "scale(1)",
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-5">
          <button
            onClick={() => goToPage(-1)}
            disabled={currentPage === 0}
            className="valentine-btn-no disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          {currentPage < pages.length - 1 ? (
            <button onClick={() => goToPage(1)} className="valentine-btn-yes">
              Next →
            </button>
          ) : (
            <button onClick={onClose} className="valentine-btn-yes">
              Close with Love 💕
            </button>
          )}
        </div>

        {audioStarted && (
          <p className="text-center mt-3 text-xs" style={{ color: "hsl(var(--muted-foreground))", fontFamily: "var(--font-body)" }}>
            🎵 Music is playing softly in the background...
          </p>
        )}
      </div>
    </div>
  );
};

export default LoveLetter;
