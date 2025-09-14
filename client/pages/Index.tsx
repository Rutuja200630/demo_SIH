import Hero3DGlobe from "@/components/Hero3DGlobe";
import StatsPanel from "@/components/StatsPanel";
import HowItWorks from "@/components/HowItWorks";
import SiteFooter from "@/components/SiteFooter";

export default function Index() {
  return (
    <main>
      <Hero3DGlobe />
      <StatsPanel />
      <HowItWorks />
      <section className="container mx-auto py-12 grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
          <div className="font-semibold mb-2">Real-time Maps</div>
          <p className="text-sm text-foreground/70">OpenStreetMap + geofences to visualize safety at a glance.</p>
        </div>
        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
          <div className="font-semibold mb-2">Instant Alerts</div>
          <p className="text-sm text-foreground/70">Tourist panic alerts stream to dashboards via Socket.IO.</p>
        </div>
        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
          <div className="font-semibold mb-2">Plug‑and‑Play AI & Blockchain</div>
          <p className="text-sm text-foreground/70">Swap services by changing a single env var — no code changes.</p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
