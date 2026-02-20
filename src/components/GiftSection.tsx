interface Props {
  onClose: () => void;
}

const GiftSection = ({ onClose }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl mx-4">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-muted-foreground hover:text-foreground transition-colors text-sm"
          style={{ fontFamily: "var(--font-body)" }}
        >
          ✕ Close
        </button>

        <div
          className="rounded-xl p-6 border animate-letter-glow"
          style={{
            background: "hsl(155 20% 8%)",
            borderColor: "hsl(145 60% 38% / 0.4)",
            fontFamily: "var(--font-body)",
          }}
        >
          {/* Gift box animation */}
          <div className="text-center mb-6">
            <div className="text-6xl animate-heartbeat inline-block">🎁</div>
            <h2
              className="text-3xl mt-3"
              style={{ fontFamily: "var(--font-script)", color: "hsl(var(--primary))" }}
            >
              A Special Light Show Gift
            </h2>
          </div>

          <p className="text-sm mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>
            Your custom light show code is ready to be added! Here's exactly where to paste it:
          </p>

          {/* Step by step instructions */}
          <div className="space-y-4">
            <div
              className="rounded-lg p-4 border-l-4"
              style={{ background: "hsl(145 60% 38% / 0.1)", borderLeftColor: "hsl(145, 60%, 38%)" }}
            >
              <p className="text-sm font-semibold mb-1" style={{ color: "hsl(145, 80%, 65%)" }}>
                📁 Step 1 — Create a new file
              </p>
              <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                Create a file called <code className="px-1 py-0.5 rounded" style={{ background: "hsl(150 30% 5%)", color: "hsl(145, 80%, 65%)" }}>src/components/LightShow.tsx</code>
              </p>
            </div>

            <div
              className="rounded-lg p-4 border-l-4"
              style={{ background: "hsl(340 80% 65% / 0.08)", borderLeftColor: "hsl(340, 80%, 65%)" }}
            >
              <p className="text-sm font-semibold mb-1" style={{ color: "hsl(340, 80%, 75%)" }}>
                📋 Step 2 — Wrap your HTML/CSS/JS
              </p>
              <p className="text-xs mb-2" style={{ color: "hsl(var(--muted-foreground))" }}>
                Paste your light show code inside an iframe using a data URI, or use dangerouslySetInnerHTML:
              </p>
              <div className="gift-code-area text-xs">
{`// src/components/LightShow.tsx
const LightShow = () => {
  const lightShowHTML = \`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        /* PASTE YOUR CSS HERE */
      </style>
    </head>
    <body>
      <!-- PASTE YOUR HTML HERE -->
      <script>
        /* PASTE YOUR JS HERE */
      </script>
    </body>
    </html>
  \`;

  return (
    <iframe
      srcDoc={lightShowHTML}
      style={{
        width: "100%",
        height: "100vh",
        border: "none",
        borderRadius: "12px"
      }}
    />
  );
};

export default LightShow;`}
              </div>
            </div>

            <div
              className="rounded-lg p-4 border-l-4"
              style={{ background: "hsl(45 90% 65% / 0.08)", borderLeftColor: "hsl(45, 90%, 65%)" }}
            >
              <p className="text-sm font-semibold mb-1" style={{ color: "hsl(45, 90%, 75%)" }}>
                🔗 Step 3 — It's already connected!
              </p>
              <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                The "A Small Gift" button is already set up. Once you create <code className="px-1 rounded" style={{ background: "hsl(150 30% 5%)", color: "hsl(45, 80%, 65%)" }}>LightShow.tsx</code>, it will display your light show automatically!
              </p>
            </div>
          </div>

          <p
            className="text-center mt-5 text-lg"
            style={{ fontFamily: "var(--font-script)", color: "hsl(var(--primary))" }}
          >
            Your love made this magical ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default GiftSection;
