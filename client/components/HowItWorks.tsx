import { UserPlus, ShieldCheck, MapPin } from "lucide-react";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="container mx-auto py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">How It Works</h2>
      <div className="grid md:grid-cols-4 gap-6 relative">
        <div className="hidden md:block absolute top-20 left-0 right-0 mx-10 h-0.5 border-t-2 border-dotted border-foreground/20" aria-hidden />
        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur relative">
          <UserPlus className="text-primary" />
          <div className="font-semibold mt-3">Register & Submit KYC</div>
          <p className="text-sm text-foreground/70">Create your profile and upload your Aadhaar or Passport for verification.</p>
        </div>
        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur relative">
          <ShieldCheck className="text-accent" />
          <div className="font-semibold mt-3">AI-Powered Pre-Verification</div>
          <p className="text-sm text-foreground/70">Our AI system conducts an initial check of your documents for authenticity.</p>
        </div>
        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur relative">
          <ShieldCheck className="text-secondary-foreground" />
          <div className="font-semibold mt-3">Authority Approval</div>
          <p className="text-sm text-foreground/70">Your application is reviewed and approved by authorized government personnel.</p>
        </div>
        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur relative">
          <MapPin className="text-primary" />
          <div className="font-semibold mt-3">Receive Your Digital ID</div>
          <p className="text-sm text-foreground/70">Get your secure, blockchain-based Digital Tourist ID and travel with peace of mind.</p>
        </div>
      </div>
    </section>
  );
}
