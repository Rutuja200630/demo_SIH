import { motion } from "framer-motion";

const stats = [
  { label: "Active Tourists", value: 12847 },
  { label: "Recent Alerts (24h)", value: 42 },
  { label: "Verified Officers", value: 2391 },
  { label: "Safe Regions", value: 27 },
];

export default function StatsPanel() {
  return (
    <section className="container mx-auto py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-5 rounded-2xl border border-white/10 bg-card/60 backdrop-blur">
            <div className="text-sm text-foreground/70">{s.label}</div>
            <div className="text-2xl font-bold mt-1" aria-live="polite">{s.value.toLocaleString()}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
