import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Mail, Phone, MapPin, Github, Twitter } from "lucide-react";

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-16 border-t border-white/10 bg-white/2">
      <div className="container mx-auto mobile-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold tracking-tight text-lg">YatraRakshak</span>
            </div>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Smart Tourist Safety platform providing real-time monitoring and 
              secure digital identity for safe travels across India.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-foreground/60">System Status: Operational</span>
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/tourist/dashboard" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                Tourist Dashboard
              </Link>
              <Link to="/police/dashboard" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                Police Dashboard
              </Link>
              <Link to="/admin" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                Admin Panel
              </Link>
              <Link to="/auth/register" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                Register
              </Link>
            </nav>
          </motion.div>
          
          {/* Legal & Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-foreground">Legal & Support</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/legal/privacy" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/legal/terms" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                Help Center
              </a>
              <a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                Contact Support
              </a>
            </nav>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-foreground">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-foreground/70">
                <Mail className="w-4 h-4" />
                <span>support@yatrarakshak.gov.in</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground/70">
                <Phone className="w-4 h-4" />
                <span>1800-XXX-SAFE</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground/70">
                <MapPin className="w-4 h-4" />
                <span>Ministry of Tourism, India</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          <div className="text-sm text-foreground/60">
            © {currentYear} Smart Tourist Safety Platform. A Government of India Initiative.
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="p-2 rounded-lg bg-foreground/10 hover:bg-foreground/20 transition-colors"
              aria-label="Follow us on Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a 
              href="#" 
              className="p-2 rounded-lg bg-foreground/10 hover:bg-foreground/20 transition-colors"
              aria-label="View our GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-green-600 flex items-center justify-center">
              <Shield className="w-3 h-3 text-white" />
            </div>
            <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">G</span>
            </div>
            <div className="h-6 w-6 rounded-full bg-orange-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">I</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
