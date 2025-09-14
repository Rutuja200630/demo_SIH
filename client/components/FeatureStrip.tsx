import { Cpu, ShieldCheck, MapPinned, Siren } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { icon: Cpu, label: "AI Anomaly Detection" },
  { icon: ShieldCheck, label: "Blockchain‑Secured IDs" },
  { icon: MapPinned, label: "Geo‑fencing Alerts" },
  { icon: Siren, label: "SOS Panic Response" },
];

export default function FeatureStrip() {
  return (
    <section className="py-10">
      <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {items.map(({ icon: Icon, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="flex items-center justify-center gap-2 p-4 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur"
          >
            <Icon size={18} className="text-amber-300" />
            <span className="text-sm font-medium">{label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
