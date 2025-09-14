import { motion } from "framer-motion";
import { Brain, CalendarRange, Compass, Shield } from "lucide-react";

const cards = [
  {
    title: "AI Travel Guide",
    desc: "Personalized suggestions with safety insights.",
    icon: Brain,
  },
  {
    title: "Smart Itinerary Planning",
    desc: "Build trips that adapt to your pace and alerts.",
    icon: CalendarRange,
  },
  {
    title: "Real‑time Safety",
    desc: "Live alerts, heatmaps, and geofenced assistance.",
    icon: Shield,
  },
  {
    title: "Explore Confidently",
    desc: "Navigate landmarks with local context and tips.",
    icon: Compass,
  },
];

export default function AIPlanning() {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold mb-8"
        >
          Smarter Travel, Safer Journeys
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map(({ title, desc, icon: Icon }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur"
            >
              <Icon className="text-sky-300" />
              <div className="mt-3 font-semibold">{title}</div>
              <p className="text-sm text-foreground/70">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
