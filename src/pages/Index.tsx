import { useState, useEffect } from "react";
import valentineBg from "@/assets/valentine-bg.jpg";
import PetalCanvas from "@/components/PetalCanvas";
import BloomingFlower from "@/components/BloomingFlower";
import LoveLetter from "@/components/LoveLetter";
import MemoriesHeart from "@/components/MemoriesHeart";
import GiftSection from "@/components/GiftSection";

type AppState = "intro" | "question" | "no" | "yes" | "features";
type Feature = "letter" | "memories" | "gift" | null;

const FLOWERS = [
  { x: "3%", y: "60%", delay: 400, size: 50, color: "hsl(340, 80%, 65%)" },
  { x: "8%", y: "40%", delay: 700, size: 40, color: "hsl(355, 85%, 55%)" },
  { x: "90%", y: "55%", delay: 600, size: 55, color: "hsl(340, 70%, 70%)" },
  { x: "85%", y: "35%", delay: 900, size: 42, color: "hsl(350, 80%, 60%)" },
  { x: "45%", y: "72%", delay: 1100, size: 36, color: "hsl(145, 60%, 45%)" },
  { x: "15%", y: "75%", delay: 1300, size: 44, color: "hsl(340, 75%, 65%)" },
  { x: "75%", y: "70%", delay: 1500, size: 38, color: "hsl(145, 55%, 40%)" },
];

const SPARKLES = Array.from({ length: 15 }, (_, i) => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: `${Math.random() * 3}s`,
  dur: `${1.5 + Math.random() * 2.5}s`,
  size: `${Math.random() * 14 + 8}px`,
}));

const Index = () => {
  const [appState, setAppState] = useState<AppState>("intro");
  const [activeFeature, setActiveFeature] = useState<Feature>(null);
  const [showContent, setShowContent] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [noBtnStyle, setNoBtnStyle] = useState<React.CSSProperties>({});
  const [yesSize, setYesSize] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => {
      setShowContent(true);
      setTimeout(() => setAppState("question"), 1200);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  const handleNo = () => {
    const newCount = noCount + 1;
    setNoCount(newCount);
    if (newCount >= 4) {
      setAppState("no");
    } else {
      // Move the no button randomly
      setNoBtnStyle({
        position: "relative",
        left: `${(Math.random() - 0.5) * 200}px`,
        top: `${(Math.random() - 0.5) * 80}px`,
      });
      setYesSize(prev => prev + 0.15);
    }
  };

  const handleYes = () => {
    setAppState("yes");
    setTimeout(() => setAppState("features"), 3500);
  };

  const noMessages = [
    "Wait, are you sure? 🥺",
    "Please reconsider... 💔",
    "Last chance! I'll be so sad... 😢",
  ];

  return (
    <div
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{ background: "hsl(150, 25%, 4%)" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${valentineBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.35,
        }}
      />

      {/* Dark overlay gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(to bottom, hsl(150 25% 3% / 0.6), hsl(150 25% 3% / 0.4), hsl(150 25% 3% / 0.8))",
        }}
      />

      {/* Petal animation */}
      <PetalCanvas />

      {/* Sparkle stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {SPARKLES.map((s, i) => (
          <div
            key={i}
            className="sparkle-star"
            style={{
              left: s.left,
              top: s.top,
              "--delay": s.delay,
              "--dur": s.dur,
              "--size": s.size,
            } as React.CSSProperties}
          >
            ✦
          </div>
        ))}
      </div>

      {/* Blooming flowers */}
      {showContent && FLOWERS.map((f, i) => (
        <BloomingFlower key={i} {...f} />
      ))}

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4 text-center">

        {/* === INTRO === */}
        {appState === "intro" && (
          <div className="animate-fade-in-scale flex flex-col items-center gap-4">
            <div className="text-7xl animate-heartbeat">🌹</div>
            <p style={{ fontFamily: "var(--font-script)", color: "hsl(var(--primary))", fontSize: "1.5rem" }}>
              Something special is loading...
            </p>
          </div>
        )}

        {/* === VALENTINE QUESTION === */}
        {appState === "question" && (
          <div className="animate-fade-in-up flex flex-col items-center gap-8">
            <div className="animate-heartbeat text-7xl">💝</div>
            <h1
              className="text-5xl md:text-6xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--foreground))" }}
            >
              Will You Be
              <br />
              <span style={{ color: "hsl(var(--primary))", textShadow: "var(--glow-rose)" }}>
                My Valentine?
              </span>
            </h1>
            <p
              style={{ fontFamily: "var(--font-script)", color: "hsl(var(--muted-foreground))", fontSize: "1.2rem" }}
            >
              My heart is waiting for your answer... 🌸
            </p>

            {noCount > 0 && noCount < 4 && (
              <p
                className="text-sm animate-fade-in-up"
                style={{ color: "hsl(340, 60%, 65%)", fontFamily: "var(--font-script)", fontSize: "1rem" }}
              >
                {noMessages[Math.min(noCount - 1, noMessages.length - 1)]}
              </p>
            )}

            <div className="flex gap-6 items-center flex-wrap justify-center">
              <button
                className="valentine-btn-yes"
                style={{ transform: `scale(${yesSize})`, transformOrigin: "center" }}
                onClick={handleYes}
              >
                Yes! 💕
              </button>
              <button
                className="valentine-btn-no"
                style={noBtnStyle}
                onClick={handleNo}
              >
                No 😔
              </button>
            </div>
          </div>
        )}

        {/* === SAD MESSAGE === */}
        {appState === "no" && (
          <div className="animate-fade-in-up flex flex-col items-center gap-6 max-w-md">
            <div className="text-6xl">💔</div>
            <h2
              className="text-4xl font-bold"
              style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--muted-foreground))" }}
            >
              Oh no...
            </h2>
            <p
              style={{ fontFamily: "var(--font-script)", color: "hsl(var(--muted-foreground))", fontSize: "1.3rem", lineHeight: 1.8 }}
            >
              Sorry for wasting your time...
              <br />
              I hope you find all the love you deserve. 🕊️
            </p>
            <button
              className="valentine-btn-no mt-4"
              onClick={() => { setNoCount(0); setNoBtnStyle({}); setYesSize(1); setAppState("question"); }}
            >
              ← Go back
            </button>
          </div>
        )}

        {/* === YES CELEBRATION === */}
        {appState === "yes" && (
          <div className="animate-fade-in-scale flex flex-col items-center gap-6 max-w-lg">
            <div className="flex gap-3 text-5xl">
              {"💕🌹💕🌸💕".split("").map((c, i) => (
                <span
                  key={i}
                  className="animate-heart-pop"
                  style={{ animationDelay: `${i * 0.12}s`, display: "inline-block" }}
                >
                  {c}
                </span>
              ))}
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--primary))", textShadow: "var(--glow-rose)" }}
            >
              Yay!! 🎉
            </h2>
            <p
              style={{ fontFamily: "var(--font-script)", color: "hsl(var(--foreground))", fontSize: "1.4rem", lineHeight: 1.9 }}
            >
              I am so so happy! 🥹
              <br />
              Thank you so much, my love!
              <br />
              You just made my heart complete. 💚
            </p>
          </div>
        )}

        {/* === FEATURE BUTTONS === */}
        {appState === "features" && (
          <div className="animate-fade-in-up flex flex-col items-center gap-8 w-full max-w-md">
            <div className="animate-heartbeat text-5xl">💕</div>
            <h2
              className="text-3xl font-bold"
              style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--foreground))" }}
            >
              I prepared something
              <br />
              <span style={{ color: "hsl(var(--primary))" }}>just for you...</span>
            </h2>
            <p style={{ fontFamily: "var(--font-script)", color: "hsl(var(--muted-foreground))", fontSize: "1rem" }}>
              Pick anything your heart desires ✨
            </p>

            <div className="grid grid-cols-1 gap-4 w-full">
              <button className="feature-btn flex items-center gap-4" onClick={() => setActiveFeature("letter")}>
                <span className="text-3xl">💌</span>
                <div className="text-left">
                  <div style={{ fontFamily: "var(--font-script)", fontSize: "1.25rem" }}>A Small Letter</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>
                    5 pages of love, with music 🎵
                  </div>
                </div>
              </button>

              <button className="feature-btn flex items-center gap-4" onClick={() => setActiveFeature("memories")}>
                <span className="text-3xl">📸</span>
                <div className="text-left">
                  <div style={{ fontFamily: "var(--font-script)", fontSize: "1.25rem" }}>Memories</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>
                    Our photos forming a heart 💚
                  </div>
                </div>
              </button>

              <button className="feature-btn flex items-center gap-4" onClick={() => setActiveFeature("gift")}>
                <span className="text-3xl">🎁</span>
                <div className="text-left">
                  <div style={{ fontFamily: "var(--font-script)", fontSize: "1.25rem" }}>A Small Gift</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>
                    A special light show for you ✨
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* === FEATURE OVERLAYS === */}
      {activeFeature === "letter" && (
        <LoveLetter onClose={() => setActiveFeature(null)} />
      )}
      {activeFeature === "memories" && (
        <MemoriesHeart onClose={() => setActiveFeature(null)} />
      )}
      {activeFeature === "gift" && (
        <GiftSection onClose={() => setActiveFeature(null)} />
      )}
    </div>
  );
};

export default Index;
