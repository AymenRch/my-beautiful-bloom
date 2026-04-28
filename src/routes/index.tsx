import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Sparkles, Star } from "lucide-react";
import hangout from "@/assets/coffee-hangout.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "For You ✨" },
      { name: "description", content: "A little something just for you." },
    ],
  }),
  component: Index,
});

const messages = [
  "You're absolutely stunning ✨",
  "The coolest girl I know 😎",
  "You light up every room 🌟",
  "Effortlessly beautiful 💫",
  "Prettier than the city skyline 🌆",
  "Lucky to share my couch with you ☕",
];

type Particle = { id: number; left: number; delay: number; size: number; char: string };

function Index() {
  const [revealed, setRevealed] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [msgIndex, setMsgIndex] = useState(0);

  const burst = () => {
    const chars = ["✦", "✧", "★", "✨", "◆", "●", "○"];
    const newOnes: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      delay: Math.random() * 1,
      size: 12 + Math.random() * 24,
      char: chars[Math.floor(Math.random() * chars.length)],
    }));
    setParticles((p) => [...p, ...newOnes]);
    setTimeout(() => {
      setParticles((p) => p.filter((x) => !newOnes.find((n) => n.id === x.id)));
    }, 4500);
  };

  const handleClick = () => {
    if (!revealed) setRevealed(true);
    else setMsgIndex((i) => (i + 1) % messages.length);
    burst();
  };

  useEffect(() => {
    if (revealed) {
      const interval = setInterval(burst, 2800);
      return () => clearInterval(interval);
    }
  }, [revealed]);

  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center px-4">
      {/* Animated grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.75 0.18 200 / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(0.75 0.18 200 / 0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      {/* Glowing orbs */}
      <div className="pointer-events-none absolute top-1/4 -left-20 w-96 h-96 rounded-full opacity-40 blur-3xl" style={{ background: "oklch(0.7 0.22 290)" }} />
      <div className="pointer-events-none absolute bottom-1/4 -right-20 w-96 h-96 rounded-full opacity-40 blur-3xl" style={{ background: "oklch(0.75 0.18 200)" }} />

      {/* Floating particles */}
      <div className="pointer-events-none fixed inset-0 z-50">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute bottom-0 animate-float-up text-primary"
            style={{
              left: `${p.left}%`,
              fontSize: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              textShadow: "0 0 12px currentColor",
            }}
          >
            {p.char}
          </span>
        ))}
      </div>

      <Sparkles className="absolute top-10 left-10 text-primary/70 animate-sparkle w-6 h-6" />
      <Star className="absolute top-20 right-16 text-primary-glow/70 animate-sparkle w-5 h-5" style={{ animationDelay: "0.5s", color: "oklch(0.7 0.22 290)" }} />
      <Sparkles className="absolute bottom-16 left-20 text-primary/70 animate-sparkle w-5 h-5" style={{ animationDelay: "1s" }} />
      <Star className="absolute bottom-24 right-12 text-primary/70 animate-sparkle w-6 h-6" style={{ animationDelay: "0.3s" }} />

      <div className="relative z-10 flex flex-col items-center gap-8 text-center max-w-xl">
        {!revealed ? (
          <>
            <h1 className="text-4xl sm:text-6xl font-bold text-foreground tracking-tight">
              Hey you. <span style={{ color: "oklch(0.75 0.18 200)" }}>✦</span>
            </h1>
            <p className="text-lg text-foreground/70">Press the button. I dare you.</p>
          </>
        ) : (
          <div key={msgIndex} className="animate-pop-in space-y-6">
            <div className="relative inline-block">
              <img
                src={hangout}
                alt="Cozy retro coffee shop hangout scene"
                width={320}
                height={320}
                className="w-72 h-72 sm:w-80 sm:h-80 rounded-3xl object-cover shadow-[var(--shadow-soft)] ring-2 ring-primary/40"
              />
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight px-4">
              {messages[msgIndex]}
            </h2>
          </div>
        )}

        <button
          onClick={handleClick}
          className="group relative px-10 py-5 rounded-full text-lg font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-110 active:scale-95 uppercase tracking-wider"
          style={{ background: "var(--gradient-button)" }}
        >
          <span className="relative z-10 flex items-center gap-3">
            <Sparkles className="w-5 h-5 animate-heartbeat" />
            {revealed ? "Again" : "Press me"}
            <Sparkles className="w-5 h-5 animate-heartbeat" />
          </span>
          <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        {revealed && (
          <p className="text-xs text-foreground/50 italic uppercase tracking-[0.3em] animate-pop-in">
            — just for you —
          </p>
        )}
      </div>
    </main>
  );
}
