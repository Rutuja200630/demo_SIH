import { motion } from "framer-motion";

const destinations = [
  {
    name: "Taj Mahal, Agra",
    img: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Jaipur, Rajasthan",
    img: "https://images.unsplash.com/photo-1544989164-31dc3c645987?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Goa Beaches",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Kerala Backwaters",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Ladakh",
    img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Varanasi Ghats",
    img: "https://images.unsplash.com/photo-1599662479965-30b3f39d8ac8?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function Destinations() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-foreground/[0.03]">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold mb-8"
        >
          Top Destinations
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((d, i) => (
            <motion.article
              key={d.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <img src={d.img} alt={d.name} className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" />
              <div className="absolute bottom-0 p-4">
                <h3 className="font-semibold drop-shadow">{d.name}</h3>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
