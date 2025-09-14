import { motion } from "framer-motion";
import { BadgeCheck, ShieldCheck, ScanLine, MapPinned } from "lucide-react";

const steps = [
  { title: "Entry", desc: "Arrival at destination with onboarding.", icon: MapPinned },
  { title: "ID Verification", desc: "Digital ID issuance and verification.", icon: BadgeCheck },
  { title: "Safe Travel", desc: "Real‑time safety guidance and alerts.", icon: ShieldCheck },
  { title: "Emergency Response", desc: "Instant SOS and coordinated help.", icon: ScanLine },
];

export default function StoryTimeline() {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8">Journey of a Tourist</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map(({ title, desc, icon: Icon }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur"
            >
              <Icon className="text-primary" />
              <div className="mt-3 font-semibold">{title}</div>
              <p className="text-sm text-foreground/70">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
