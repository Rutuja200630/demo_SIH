import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

function CursorTrail() {
  const prefersReduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 20 });
  const sy = useSpring(y, { stiffness: 120, damping: 20 });
  const bgX = useTransform(sx, (v) => `${v}px`);
  const bgY = useTransform(sy, (v) => `${v}px`);

  function onMove(e: React.MouseEvent) {
    if (prefersReduced) return;
    x.set(e.clientX);
    y.set(e.clientY);
  }

  return (
    <div onMouseMove={onMove} className="absolute inset-0 pointer-events-none">
      {!prefersReduced && (
        <motion.div
          aria-hidden
          style={{ left: bgX, top: bgY }}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_60%)]"
        />
      )}
    </div>
  );
}

function HeritageCollage() {
  // Minimal vector silhouettes (Taj, Qutub, Gateway, Konark) layered with slight parallax
  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
      <svg viewBox="0 0 1200 400" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="monu" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(28 90% 55%)" />
            <stop offset="100%" stopColor="hsl(205 80% 50%)" />
          </linearGradient>
        </defs>
        {/* Sand base */}
        <rect x="0" y="300" width="1200" height="100" fill="hsl(40 60% 80%)" />
        {/* Taj Mahal */}
        <g fill="url(#monu)" opacity="0.9">
          <rect x="240" y="180" width="220" height="100" rx="8" />
          <circle cx="350" cy="160" r="36" />
          <rect x="220" y="170" width="8" height="130" />
          <rect x="492" y="170" width="8" height="130" />
        </g>
        {/* Qutub Minar */}
        <g fill="hsl(28 80% 50%)">
          <rect x="720" y="120" width="26" height="180" />
          <rect x="712" y="100" width="42" height="18" />
          <rect x="708" y="80" width="50" height="16" />
        </g>
        {/* Gateway of India */}
        <g fill="hsl(205 70% 42%)" opacity="0.95">
          <rect x="520" y="210" width="140" height="70" rx="8" />
          <rect x="540" y="180" width="100" height="40" />
          <circle cx="540" cy="240" r="12" fill="hsl(40 60% 85%)" />
          <circle cx="640" cy="240" r="12" fill="hsl(40 60% 85%)" />
        </g>
        {/* Konark Wheel (simplified) */}
        <g>
          <circle cx="950" cy="250" r="38" fill="hsl(150 45% 35%)" opacity="0.9" />
          <circle cx="950" cy="250" r="14" fill="hsl(40 60% 85%)" />
          <g stroke="hsl(40 60% 85%)" strokeWidth="4" strokeLinecap="round">
            <line x1="950" y1="212" x2="950" y2="288" />
            <line x1="912" y1="250" x2="988" y2="250" />
            <line x1="925" y1="225" x2="975" y2="275" />
            <line x1="975" y1="225" x2="925" y2="275" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function HeroParallax() {
  return (
    <section className="relative overflow-hidden">
      <CursorTrail />
      <div className="container mx-auto grid lg:grid-cols-2 gap-10 items-center py-16 md:py-24">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Smart Tourist Safety Monitoring & Response System
          </h1>
          <p className="text-foreground/70 max-w-xl">
            AI + Blockchain powered safety for travelers, with government trust.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/auth/register" className="px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold">
              Get Digital Tourist ID
            </Link>
            <Link to="/tourist/dashboard" className="px-5 py-3 rounded-xl border border-foreground/10">
              Tourist Dashboard (Demo)
            </Link>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <HeritageCollage />
        </motion.div>
      </div>
    </section>
  );
}
