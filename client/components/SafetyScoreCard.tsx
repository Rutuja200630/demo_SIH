import { motion } from "framer-motion";

export default function SafetyScoreCard({ score = 72 }: { score?: number }) {
  const circumference = 2 * Math.PI * 56;
  const progress = Math.max(0, Math.min(100, score));
  const dash = (progress / 100) * circumference;

  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
      <h3 className="font-semibold text-sm text-foreground/70 mb-3">Safety Score</h3>
      <div className="relative w-40 h-40 mx-auto">
        <svg width="160" height="160" viewBox="0 0 160 160" className="drop-shadow">
          <circle cx="80" cy="80" r="56" stroke="rgba(255,255,255,0.15)" strokeWidth="16" fill="none" />
          <motion.circle
            cx="80"
            cy="80"
            r="56"
            stroke="url(#grad)"
            strokeWidth="16"
            fill="none"
            strokeDasharray={`${circumference}`}
            strokeDashoffset={circumference - dash}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - dash }}
            transition={{ duration: 1, ease: "easeOut" }}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-extrabold">{score}</div>
            <div className="text-xs text-foreground/60">/ 100</div>
          </div>
        </div>
      </div>
    </div>
  );
}
