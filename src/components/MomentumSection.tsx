import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Eye, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCountUp } from '@/hooks/useCountUp';

// Import client logos
import bnbLogo from "@/assets/logos/bnb.png";
import kucoinLogo from "@/assets/logos/kucoin.svg";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import bybitLogo from "@/assets/logos/bybit.png";
import peaqLogo from "@/assets/logos/peaq.svg";
import storyProtocolLogo from "@/assets/logos/story-protocol.png";
import megaethLogo from "@/assets/logos/megaeth.png";
import triaLogo from "@/assets/logos/tria-official.png";
import mantraLogo from "@/assets/logos/mantra.png";
import saharaAiLogo from "@/assets/logos/sahara-ai.png";
import fogoLogo from "@/assets/logos/fogo.png";
import synfuturesLogo from "@/assets/logos/synfutures.png";
import zkpassLogo from "@/assets/logos/zkpass.png";
import thirdwebLogo from "@/assets/logos/thirdweb.png";
import bananagoLogo from "@/assets/logos/bananago.png";

const projectLogos = [
  { name: "BNB Chain", logo: bnbLogo, noInvert: false },
  { name: "KuCoin", logo: kucoinLogo, noInvert: false },
  { name: "Polygon", logo: polygonLogo, noInvert: false },
  { name: "Ondo Finance", logo: ondoLogo, noInvert: false },
  { name: "Bybit", logo: bybitLogo, noInvert: false },
  { name: "Peaq", logo: peaqLogo, noInvert: false },
  { name: "Story Protocol", logo: storyProtocolLogo, noInvert: false },
  { name: "MegaETH", logo: megaethLogo, noInvert: false },
  { name: "Tria", logo: triaLogo, noInvert: true },
  { name: "Mantra", logo: mantraLogo, noInvert: true },
  { name: "Sahara AI", logo: saharaAiLogo, noInvert: true },
  { name: "FOGO", logo: fogoLogo, noInvert: true },
  { name: "SynFutures", logo: synfuturesLogo, noInvert: true },
  { name: "zkPass", logo: zkpassLogo, noInvert: true },
  { name: "Thirdweb", logo: thirdwebLogo, noInvert: true },
  { name: "BananaGO", logo: bananagoLogo, noInvert: true },
];

const momentumStats = [
  { value: 18, label: "Projects Launched", suffix: "+", icon: Rocket, color: "neon-lime" },
  { value: 2.5, label: "Impressions Generated", suffix: "M+", icon: Eye, color: "electric-blue" },
  { value: 42, label: "Events Hosted", suffix: "+", icon: Calendar, color: "hot-pink" },
];

const StatCounter = ({ 
  value, 
  label, 
  suffix = "", 
  icon: Icon, 
  color,
  isVisible,
  delay
}: { 
  value: number; 
  label: string; 
  suffix?: string; 
  icon: typeof Rocket;
  color: string;
  isVisible: boolean;
  delay: number;
}) => {
  const count = useCountUp({
    end: value,
    isVisible,
    delay,
    duration: 1500,
    suffix
  });

  const colorClasses = {
    'neon-lime': 'text-[hsl(var(--neon-lime))]',
    'electric-blue': 'text-[hsl(var(--electric-blue))]',
    'hot-pink': 'text-[hsl(var(--hot-pink))]',
  };

  const bgClasses = {
    'neon-lime': 'bg-[hsl(var(--neon-lime)/0.1)] border-[hsl(var(--neon-lime)/0.3)]',
    'electric-blue': 'bg-[hsl(var(--electric-blue)/0.1)] border-[hsl(var(--electric-blue)/0.3)]',
    'hot-pink': 'bg-[hsl(var(--hot-pink)/0.1)] border-[hsl(var(--hot-pink)/0.3)]',
  };

  return (
    <div className="text-center group">
      <div className="flex justify-center mb-3">
        <div className={`w-10 h-10 rounded-full ${bgClasses[color as keyof typeof bgClasses]} border flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${colorClasses[color as keyof typeof colorClasses]}`} />
        </div>
      </div>
      <div className={`text-4xl md:text-5xl lg:text-6xl font-bold ${colorClasses[color as keyof typeof colorClasses]} mb-2 tracking-tight`}>
        {count}
      </div>
      <div className="text-sm text-white/50">
        {label}
      </div>
    </div>
  );
};

const MomentumSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-16 md:py-24">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(var(--neon-lime)/0.02)] to-background" />

      <div className="relative z-10 px-4 md:px-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1.5 text-xs font-mono tracking-widest text-[hsl(var(--electric-blue))] border border-[hsl(var(--electric-blue)/0.3)] rounded-full mb-4 neon-border-blue">
            MOMENTUM
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            ZERO TO ONE HUNDRED.{' '}
            <span className="block sm:inline gradient-neon">REAL QUICK.</span>
          </h2>
          <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto">
            Our 1 year {'>'} Others' 5 years. This list is growing every day. Fast.
          </p>
        </motion.div>

        {/* Stats Counter Row */}
        <motion.div 
          className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {momentumStats.map((stat, index) => (
            <StatCounter
              key={index}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              icon={stat.icon}
              color={stat.color}
              isVisible={isVisible}
              delay={index * 200}
            />
          ))}
        </motion.div>

        {/* Project Logos Grid */}
        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 md:gap-4">
            {projectLogos.map((project, index) => (
              <motion.div
                key={project.name}
                className="aspect-square p-3 md:p-4 rounded-lg bg-white/[0.03] border border-white/10 hover:border-[hsl(var(--neon-lime)/0.5)] hover:bg-white/[0.06] transition-all duration-300 flex items-center justify-center group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                viewport={{ once: true }}
              >
                <img 
                  src={project.logo} 
                  alt={project.name}
                  className={`w-8 h-8 md:w-10 md:h-10 object-contain transition-all duration-300 group-hover:scale-110 ${
                    project.noInvert ? 'opacity-70 group-hover:opacity-100' : 'brightness-0 invert opacity-60 group-hover:opacity-90'
                  }`}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Link 
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white/70 hover:text-[hsl(var(--neon-lime))] transition-colors group"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MomentumSection;
