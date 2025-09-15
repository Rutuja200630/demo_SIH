import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Users, AlertTriangle, Shield, MapPin, Clock, TrendingUp } from "lucide-react";

interface StatData {
  label: string;
  value: number;
  icon: any;
  trend?: number;
  suffix?: string;
  color: string;
  description?: string;
}

function AnimatedCounter({ 
  end, 
  duration = 2000, 
  suffix = "",
  inView = false 
}: { 
  end: number; 
  duration?: number; 
  suffix?: string;
  inView?: boolean;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!inView || hasAnimated) return;
    
    setHasAnimated(true);
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, inView, hasAnimated]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

function TrendIndicator({ trend }: { trend?: number }) {
  if (!trend) return null;
  
  const isPositive = trend > 0;
  return (
    <div className={`flex items-center gap-1 text-xs ${
      isPositive ? 'text-green-400' : 'text-red-400'
    }`}>
      <TrendingUp className={`w-3 h-3 ${!isPositive ? 'rotate-180' : ''}`} />
      <span>{Math.abs(trend)}%</span>
    </div>
  );
}

const stats: StatData[] = [
  { 
    label: "Active Tourists", 
    value: 12847, 
    icon: Users, 
    trend: 12.5,
    color: "from-blue-500 to-blue-600",
    description: "Currently traveling"
  },
  { 
    label: "Alerts Resolved", 
    value: 1429, 
    icon: AlertTriangle, 
    trend: 8.2,
    color: "from-orange-500 to-red-500",
    description: "In last 24 hours"
  },
  { 
    label: "Verified Officers", 
    value: 2391, 
    icon: Shield, 
    trend: 3.1,
    color: "from-green-500 to-emerald-600",
    description: "Ready to respond"
  },
  { 
    label: "Safe Regions", 
    value: 127, 
    icon: MapPin, 
    trend: 5.8,
    color: "from-purple-500 to-indigo-600",
    description: "Monitored zones"
  },
  { 
    label: "Avg Response", 
    value: 2, 
    icon: Clock, 
    suffix: "min",
    trend: -15.3,
    color: "from-teal-500 to-cyan-600",
    description: "Emergency response time"
  },
  { 
    label: "Safety Score", 
    value: 94, 
    icon: TrendingUp, 
    suffix: "%",
    trend: 2.1,
    color: "from-yellow-500 to-amber-600",
    description: "Overall safety rating"
  },
];

export default function StatsPanel() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [inView]);

  return (
    <section ref={sectionRef} className="container mx-auto py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Real-Time Safety Dashboard
        </h2>
        <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
          Live statistics and insights from our comprehensive tourist safety monitoring system
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: i * 0.1, 
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="group relative overflow-hidden"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
              
              {/* Card content */}
              <div className="relative p-6 rounded-2xl border border-white/10 bg-card/60 backdrop-blur hover:bg-card/80 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <TrendIndicator trend={stat.trend} />
                </div>
                
                <div className="space-y-2">
                  <div className="text-3xl font-bold tracking-tight">
                    <AnimatedCounter 
                      end={stat.value} 
                      suffix={stat.suffix} 
                      inView={inView}
                      duration={2000 + i * 200}
                    />
                  </div>
                  
                  <div className="text-sm font-medium text-foreground/90">
                    {stat.label}
                  </div>
                  
                  {stat.description && (
                    <div className="text-xs text-foreground/60">
                      {stat.description}
                    </div>
                  )}
                </div>
                
                {/* Hover glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Live update indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.6 }}
        className="flex items-center justify-center mt-8 gap-2 text-sm text-foreground/60"
      >
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span>Live data • Updates every 30 seconds</span>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      </motion.div>
    </section>
  );
}
