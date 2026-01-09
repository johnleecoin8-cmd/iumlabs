import { motion } from 'framer-motion';
import { TrendingUp, Globe, Lock, Shield, Users, MessageCircle, Zap } from 'lucide-react';
import seoulDdpNight from '@/assets/backgrounds/seoul-ddp-night.jpg';

const marketStats = [
  { value: "#3", label: "Global Trading Volume", icon: TrendingUp },
  { value: "#1", label: "Altcoin Trading Volume", icon: Zap },
  { value: "24/7", label: "Market Activity (KST)", icon: Globe },
];

const barriers = [
  { 
    title: "Language Wall", 
    description: "99% Korean search ecosystem (Naver & Kakao)",
    icon: MessageCircle 
  },
  { 
    title: "Regulatory Maze", 
    description: "Strict VASP compliance required",
    icon: Shield 
  },
  { 
    title: "Community Isolation", 
    description: "24/7 KST engagement culture needed",
    icon: Users 
  },
];

const WhyKoreaSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={seoulDdpNight} 
          alt="Seoul DDP Night" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="relative z-10 px-4 md:px-10 py-16 md:py-24">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1.5 text-xs font-mono tracking-widest text-[hsl(var(--neon-lime))] border border-[hsl(var(--neon-lime)/0.3)] rounded-full mb-4 neon-border">
            WHY KOREA
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            THE <span className="gradient-neon">IGNITION KEY</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto">
            Korea isn't just a market. It's the ignition key for global hype.
          </p>
        </motion.div>

        {/* Market Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {marketStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className="cyberpunk-card p-6 md:p-8 rounded-lg text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-[hsl(var(--neon-lime)/0.1)] border border-[hsl(var(--neon-lime)/0.3)] flex items-center justify-center group-hover:bg-[hsl(var(--neon-lime)/0.2)] transition-colors">
                    <Icon className="w-5 h-5 text-[hsl(var(--neon-lime))]" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 pulse-neon">
                  {stat.value}
                </div>
                <div className="text-sm text-white/50">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Quote */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium text-white/80 italic max-w-3xl mx-auto">
            "Global projects succeed in the West, but they{' '}
            <span className="text-[hsl(var(--neon-lime))] not-italic font-bold">EXPLODE</span>{' '}
            in Korea."
          </blockquote>
          <p className="mt-4 text-sm text-white/40">
            The Kimchi Premium is Real Power.
          </p>
        </motion.div>

        {/* Barriers Section */}
        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-center text-lg md:text-xl font-semibold text-white mb-2">
            High Rewards Come with High Barriers
          </h3>
          <p className="text-center text-sm text-white/50 mb-8 max-w-xl mx-auto">
            We are the bridge that turns these barriers into your moat.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {barriers.map((barrier, index) => {
              const Icon = barrier.icon;
              return (
                <div 
                  key={index}
                  className="p-5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-[hsl(var(--electric-blue)/0.5)] transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-md bg-[hsl(var(--hot-pink)/0.1)] flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[hsl(var(--hot-pink))]" />
                    </div>
                    <h4 className="font-semibold text-white group-hover:text-[hsl(var(--electric-blue))] transition-colors">
                      {barrier.title}
                    </h4>
                  </div>
                  <p className="text-sm text-white/50">
                    {barrier.description}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyKoreaSection;
