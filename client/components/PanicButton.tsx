import { motion } from "framer-motion";
import { toast } from "sonner";

export default function PanicButton({ userId }: { userId: string }) {
  async function triggerPanic() {
    const ok = confirm("Confirm panic alert?");
    if (!ok) return;
    const payload = {
      userId,
      location: { lat: 26.8467, lng: 80.9462 },
      timestamp: new Date().toISOString(),
      notes: "user_triggered",
      type: "panic",
    };
    const res = await fetch("/api/alerts/panic", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (res.ok) {
      toast.success("Panic alert sent", { description: json.alertId });
    } else {
      toast.error("Failed to send panic alert");
    }
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={triggerPanic}
      className="relative w-full py-6 rounded-2xl text-white font-bold text-xl bg-gradient-to-r from-rose-600 to-orange-500 shadow-[0_0_40px_rgba(244,63,94,.5)]"
    >
      <span className="absolute inset-0 rounded-2xl blur-md bg-gradient-to-r from-rose-600 to-orange-500 opacity-60" aria-hidden />
      <span className="relative">Panic</span>
    </motion.button>
  );
}
