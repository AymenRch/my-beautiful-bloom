import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Heart, Sparkles } from "lucide-react";
import bears from "@/assets/cute-bears.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "For You 💕" },
      { name: "description", content: "A little something to remind you how beautiful you are." },
    ],
  }),
  component: Index,
});

const messages = [
  "You're absolutely stunning ✨",
  "The most beautiful girl in the world 🌹",
  "My heart skips a beat for you 💓",
  "You light up my whole world 🌟",
  "Prettier than every sunset 🌅",
  "I'm the luckiest to have you 💖",
];

type Heartlet = { id: number; left: number; delay: number; size: number; emoji: string };

function Index() {
  const [revealed, setRevealed] = useState(false);
  const [hearts, setHearts] = useState<Heartlet[]>([]);
  const [msgIndex, setMsgIndex] = useState(0);

  const burst = () => {
    const emojis = ["💖", "💕", "🌸", "✨", "💗", "🌹", "💞"];
    const newHearts: Heartlet[] = Array.from({ length: 25 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      delay: Math.random() * 0.8,
      size: 20 + Math.random() * 30,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setHearts((h) => [...h, ...newHearts]);
    setTimeout(() => {
      setHearts((h) => h.filter((x) => !newHearts.find((n) => n.id === x.id)));
    }, 4500);
  };

  const handleClick = () => {
    if (!revealed) {
      setRevealed(true);
    } else {
      setMsgIndex((i) => (i + 1) % messages.length);
    }
    burst();
  };

  useEffect(() => {
    if (revealed) {
      const interval = setInterval(burst, 2500);
      return () => clearInterval(interval);
    }
  }, [revealed]);

  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center px-4">
      {/* Floating hearts overlay */}
      <div className="pointer-events-none fixed inset-0 z-50">
        {hearts.map((h) => (
          <span
            key={h.id}
            className="absolute bottom-0 animate-float-up"
            style={{
              left: `${h.left}%`,
              fontSize: `${h.size}px`,
              animationDelay: `${h.delay}s`,
            }}
          >
            {h.emoji}
          </span>
        ))}
      </div>

      {/* Decorative sparkles */}
      <Sparkles className="absolute top-10 left-10 text-primary-foreground/60 animate-sparkle" style={{ animationDelay: "0s" }} />
      <Sparkles className="absolute top-20 right-16 text-primary-foreground/60 animate-sparkle w-8 h-8" style={{ animationDelay: "0.5s" }} />
      <Sparkles className="absolute bottom-16 left-20 text-primary-foreground/60 animate-sparkle w-6 h-6" style={{ animationDelay: "1s" }} />
      <Sparkles className="absolute bottom-24 right-12 text-primary-foreground/60 animate-sparkle" style={{ animationDelay: "0.3s" }} />

      <div className="relative z-10 flex flex-col items-center gap-8 text-center max-w-xl">
        {!revealed ? (
          <>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground drop-shadow-sm">
              A little surprise for you... 💝
            </h1>
            <p className="text-lg text-foreground/70">Press the button, my love</p>
          </>
        ) : (
          <div key={msgIndex} className="animate-pop-in space-y-6">
            <div className="relative inline-block">
              <img
                src={bears}
                alt="Two cute bears hugging with hearts"
                width={320}
                height={320}
                className="w-72 h-72 sm:w-80 sm:h-80 rounded-3xl object-cover shadow-[var(--shadow-soft)] ring-4 ring-primary-foreground/50"
              />
              <Heart className="absolute -top-4 -right-4 w-12 h-12 text-primary fill-primary animate-heartbeat drop-shadow-lg" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground drop-shadow-sm px-4">
              {messages[msgIndex]}
            </h2>
          </div>
        )}

        <button
          onClick={handleClick}
          className="group relative px-10 py-5 rounded-full text-xl font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-110 active:scale-95"
          style={{ background: "var(--gradient-button)" }}
        >
          <span className="relative z-10 flex items-center gap-3">
            <Heart className="w-6 h-6 fill-current animate-heartbeat" />
            {revealed ? "Again! 💕" : "Click me 💖"}
            <Heart className="w-6 h-6 fill-current animate-heartbeat" />
          </span>
          <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        {revealed && (
          <p className="text-sm text-foreground/60 italic animate-pop-in">
            — made with all my love 💌
          </p>
        )}
      </div>
    </main>
  );
}
