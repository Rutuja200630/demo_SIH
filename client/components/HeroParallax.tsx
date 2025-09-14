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

import MapHero from "./MapHero";

function HeritageCollage() {
  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-2xl border border-white/10">
      <MapHero />
    </div>
  );
}

export default function HeroParallax() {
  return (
    <section className="relative overflow-hidden">
      <CursorTrail />
      <div className="container mx-auto grid lg:grid-cols-2 gap-10 items-center py-16 md:py-24">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Orchid AI: Trusted Safety Monitoring for Indian Tourists
          </h1>
          <p className="text-foreground/70 max-w-xl">
            Real-time protection, verified by AI and blockchain. Trusted by travelers and authorities.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/auth/register" className="px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold">
              Get Digital Tourist ID
            </Link>
            <Link to="/tourist/dashboard" className="px-5 py-3 rounded-xl border border-foreground/10">
              Tourist Dashboard (Demo)
            </Link>
            <Link to="/tourist/dashboard" className="px-5 py-3 rounded-xl border border-foreground/10">
              Report Incident
            </Link>
            <a href="#learn-more" className="px-5 py-3 rounded-xl border border-foreground/10">
              Learn More
            </a>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <HeritageCollage />
        </motion.div>
      </div>
    </section>
  );
}
