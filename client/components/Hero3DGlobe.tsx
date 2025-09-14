import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Plane, Globe2, Landmark, BaggageClaim } from "lucide-react";

function latLngToVec3(lat: number, lng: number, r = 1) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -r * Math.sin(phi) * Math.cos(theta);
  const z = r * Math.sin(phi) * Math.sin(theta);
  const y = r * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function Globe() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.05;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial color="#0f172a" metalness={0.2} roughness={0.6} />
    </mesh>
  );
}

function Hotspots() {
  const points = useMemo(() => {
    const coords = [
      { lat: 28.6139, lng: 77.209 },
      { lat: 19.076, lng: 72.8777 },
      { lat: 26.8467, lng: 80.9462 },
      { lat: 13.0827, lng: 80.2707 },
    ];
    return coords.map((c) => latLngToVec3(c.lat, c.lng, 1.01));
  }, []);

  return (
    <group>
      {points.map((p, i) => (
        <group key={i} position={p.toArray() as any}>
          <mesh>
            <sphereGeometry args={[0.02, 16, 16]} />
            <meshBasicMaterial color="#22d3ee" />
          </mesh>
          <mesh scale={1.8}>
            <sphereGeometry args={[0.02, 16, 16]} />
            <meshBasicMaterial color="#22d3ee" transparent opacity={0.35} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function Hero3DGlobe() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, prefersReducedMotion ? 0 : -60]);

  return (
    <section className="relative overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -z-20">
        <video
          className="w-full h-full object-cover opacity-25"
          autoPlay
          muted
          loop
          playsInline
          src="https://videos.pexels.com/video-files/2103099/2103099-uhd_2560_1440_25fps.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-background" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.25),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(245,158,11,0.25),transparent_40%)]" />
      <div className="container mx-auto grid lg:grid-cols-2 gap-10 items-center py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-amber-300 to-rose-300 drop-shadow">Discover the World, Your Way</span>
            <div className="mt-3 text-foreground/80 text-xl md:text-2xl">{t("tagline")}</div>
          </h1>
          <p className="text-foreground/70 max-w-xl">Frictionless planning, immersive maps, and instant safety — tailored to your journey.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/tourist/dashboard" className="px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-amber-400 text-white font-semibold shadow-[0_0_30px_rgba(14,165,233,.5)]">Explore Now</Link>
            <Link to="/auth/register" className="px-5 py-3 rounded-xl border border-white/20 backdrop-blur bg-white/10 hover:bg-white/20 transition">Plan My Trip</Link>
          </div>
          <div className="flex items-center gap-4 text-foreground/80 pt-2">
            <span className="inline-flex items-center gap-2"><Plane size={18} /> Real‑time travel safety</span>
            <span className="inline-flex items-center gap-2"><Globe2 size={18} /> Live maps</span>
            <span className="inline-flex items-center gap-2 hidden sm:inline"><Landmark size={18} /> Top spots</span>
            <span className="inline-flex items-center gap-2 hidden lg:inline"><BaggageClaim size={18} /> Smart itineraries</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="h-[320px] sm:h-[380px] md:h-[520px] rounded-2xl border border-white/10 backdrop-blur bg-white/5 shadow-inner"
        >
          <Canvas camera={{ position: [0, 0, 2.2], fov: 45 }} dpr={[1, 1.5]}>
            <ambientLight intensity={0.9} />
            <directionalLight position={[2, 2, 2]} intensity={1.2} />
            <Globe />
            <Hotspots />
            <OrbitControls enablePan={false} enableZoom={false} />
          </Canvas>
        </motion.div>
      </div>
    </section>
  );
}
