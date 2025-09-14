import { useEffect, useMemo, useState } from "react";
import Hero3DGlobe from "./Hero3DGlobe";
import MapHero from "./MapHero";

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    return !!gl && !!gl.getExtension;
  } catch {
    return false;
  }
}

export default function SafeHero() {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setSupported(hasWebGL());
  }, []);

  const Fallback = useMemo(() => (
    <section className="relative overflow-hidden">
      <div className="container mx-auto grid lg:grid-cols-2 gap-10 items-center py-16 md:py-24">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">Travel with Confidence. Your Safety, Secured by India.</h1>
          <p className="text-foreground/70 max-w-xl">YatraRakshak provides a secure Digital Tourist ID, backed by AI and Blockchain, for a safer and smarter travel experience across India.</p>
        </div>
        <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-2xl border border-white/10">
          <MapHero />
        </div>
      </div>
    </section>
  ), []);

  if (supported === null) return Fallback;
  return supported ? <Hero3DGlobe /> : Fallback;
}
