import { UserPlus, ShieldCheck, MapPin } from "lucide-react";

export default function HowItWorks() {
  return (
    <section id="learn-more" className="container mx-auto py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">How it Works</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
          <UserPlus className="text-primary" />
          <div className="font-semibold mt-3">Register</div>
          <p className="text-sm text-foreground/70">Create your profile and request a Digital Tourist ID.</p>
        </div>
        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
          <ShieldCheck className="text-accent" />
          <div className="font-semibold mt-3">Get Verified</div>
          <p className="text-sm text-foreground/70">AI + Blockchain verification ensures authenticity and trust.</p>
        </div>
        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
          <MapPin className="text-secondary-foreground" />
          <div className="font-semibold mt-3">Travel Safely</div>
          <p className="text-sm text-foreground/70">Use live maps, alerts and support to stay safe and informed.</p>
        </div>
      </div>
    </section>
  );
}
