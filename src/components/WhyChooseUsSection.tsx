import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Users, Clock, Globe, TrendingUp, Shield, Award } from "lucide-react";
import realisticMoon from '@/assets/backgrounds/realistic-moon.png';

const differentiators = [
  {
    icon: Users,
    stat: "1,000+",
    label: "Vetted KOLs",
    description: "Korea's largest verified influencer network",
    color: "#1DB954",
  },
  {
    icon: Clock,
    stat: "24/7",
    label: "Korean Support",
    description: "Native Korean team available around the clock",
    color: "#00D4FF",
  },
  {
    icon: TrendingUp,
    stat: "$500M+",
    label: "Raised for Clients",
    description: "Total capital raised through TGE campaigns",
    color: "#F3BA2F",
  },
  {
    icon: Globe,
    stat: "50+",
    label: "Exchange Partners",
    description: "Direct relationships with major CEX & DEX",
    color: "#8247E5",
  },
  {
    icon: Shield,
    stat: "100%",
    label: "VASP Compliant",
    description: "Full regulatory compliance for Korean market",
    color: "#00CED1",
  },
  {
    icon: Award,
    stat: "200+",
    label: "Projects Launched",
    description: "Successful Web3 projects in Korea",
    color: "#FF6B9D",
  },
];

const WhyChooseUsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#1a0a2e] via-[#0f0618] to-[#1a0a2e] px-4 py-[20px]">
      {/* Purple ambient orbs */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#E040FB]/15 blur-[120px] pointer-events-none" />

      {/* Moon at right center */}
      <div className="absolute top-1/2 -right-[10%] md:-right-[5%] lg:right-[0%] -translate-y-1/2 pointer-events-none opacity-40">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
          className="relative"
        >
          <img
            src={realisticMoon}
            alt=""
            className="w-[400px] h-[400px] md:w-[550px] md:h-[550px] lg:w-[700px] lg:h-[700px] object-cover rounded-full"
            style={{ filter: "saturate(0.2) brightness(0.6)" }}
          />
        </motion.div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header - Unified Style */}
        <div className={`mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 text-xs font-medium text-primary mb-4 tracking-widest uppercase">
            <span className="w-8 h-px bg-primary" />
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            The Numbers <span className="bg-gradient-to-r from-[#1DB954] via-[#00D4FF] to-[#E040FB] bg-clip-text text-transparent">Speak</span>
          </h2>
          <p className="text-lg text-white/50 max-w-xl">
            As a Web3 Marketing Agency with a focus on customer satisfaction, 
            CryptoBridge delivers unmatched results in the Korean market.
          </p>
        </div>

        {/* Differentiators Grid - Colorful Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {differentiators.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              style={{
                boxShadow: `0 4px 30px ${item.color}15`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 10px 50px ${item.color}40`;
                e.currentTarget.style.borderColor = `${item.color}50`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 4px 30px ${item.color}15`;
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              }}
            >
              {/* Hover Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(135deg, ${item.color}15 0%, transparent 60%)` }}
              />
              
              {/* Icon */}
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300"
                style={{ backgroundColor: `${item.color}20` }}
              >
                <item.icon className="w-6 h-6" style={{ color: item.color }} />
              </div>
              
              {/* Stat */}
              <div 
                className="text-3xl md:text-4xl font-bold mb-1 transition-colors"
                style={{ color: item.color }}
              >
                {item.stat}
              </div>
              
              {/* Label */}
              <div className="text-white/70 font-medium text-sm mb-2">
                {item.label}
              </div>
              
              {/* Description */}
              <p className="text-white/40 text-xs leading-relaxed group-hover:text-white/60 transition-colors">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
