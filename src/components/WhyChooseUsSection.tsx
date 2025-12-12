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
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: Clock,
    stat: "24/7",
    label: "Korean Support",
    description: "Native Korean team available around the clock",
    color: "from-cyan-500 to-blue-500"
  },
  {
    icon: TrendingUp,
    stat: "$500M+",
    label: "Raised for Clients",
    description: "Total capital raised through TGE campaigns",
    color: "from-emerald-500 to-green-500"
  },
  {
    icon: Globe,
    stat: "50+",
    label: "Exchange Partners",
    description: "Direct relationships with major CEX & DEX",
    color: "from-purple-500 to-violet-500"
  },
  {
    icon: Shield,
    stat: "100%",
    label: "VASP Compliant",
    description: "Full regulatory compliance for Korean market",
    color: "from-orange-500 to-amber-500"
  },
  {
    icon: Award,
    stat: "200+",
    label: "Projects Launched",
    description: "Successful Web3 projects in Korea",
    color: "from-blue-500 to-indigo-500"
  }
];

const WhyChooseUsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-[#0033FF] py-24 px-4">
      {/* Moon at right center - Using realistic moon with glow effect */}
      <div className="absolute top-1/2 -right-[10%] md:-right-[5%] lg:right-[0%] -translate-y-1/2 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
          className="relative"
        >
          {/* Outer glow */}
          <div className="absolute inset-0 bg-gradient-radial from-white/30 via-white/10 to-transparent rounded-full blur-3xl scale-110" />
          
          {/* Moon image with blue tint and glow */}
          <img 
            src={realisticMoon}
            alt=""
            className="w-[400px] h-[400px] md:w-[550px] md:h-[550px] lg:w-[700px] lg:h-[700px] object-cover rounded-full"
            style={{
              filter: "saturate(0.3) brightness(1.2) contrast(1.1)",
              boxShadow: "0 0 100px 30px rgba(255,255,255,0.15), 0 0 200px 60px rgba(100,150,255,0.1)",
            }}
          />
          
          {/* Inner highlight overlay */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 50%)",
            }}
          />
        </motion.div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className={`mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 text-xs font-medium text-white/60 mb-4 tracking-widest uppercase">
            <span className="w-8 h-px bg-white/40" />
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            The Numbers <span className="text-cyan-300">Speak</span>
          </h2>
          <p className="text-lg text-white/70 max-w-xl">
            As a Web3 Marketing Agency with a focus on customer satisfaction, 
            CryptoBridge delivers unmatched results in the Korean market.
          </p>
        </div>

        {/* Differentiators Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {differentiators.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              
              {/* Stat */}
              <div className="text-3xl md:text-4xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                {item.stat}
              </div>
              
              {/* Label */}
              <div className="text-white/80 font-medium text-sm mb-2">
                {item.label}
              </div>
              
              {/* Description */}
              <p className="text-white/50 text-xs leading-relaxed group-hover:text-white/70 transition-colors">
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
