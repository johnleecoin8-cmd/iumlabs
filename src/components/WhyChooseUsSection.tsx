import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useCountUp } from '@/hooks/useCountUp';
import seoulHanriver from '@/assets/backgrounds/seoul-hanriver-twilight.jpg';


const stats = [
  { value: 1000, label: 'Vetted KOLs', suffix: '+' },
  { value: 500, label: 'Raised for Clients', prefix: '$', suffix: 'M+' },
  { value: 50, label: 'Exchange Partners', suffix: '+' },
  { value: 200, label: 'Projects Launched', suffix: '+' },
];

const StatItem = ({ stat, index, isVisible }: { stat: typeof stats[0]; index: number; isVisible: boolean }) => {
  const count = useCountUp({
    end: stat.value,
    duration: 2000,
    isVisible,
    prefix: stat.prefix,
    suffix: stat.suffix,
  });
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
        {count}
      </div>
      <div className="text-white/50 text-sm mt-1">{stat.label}</div>
    </motion.div>
  );
};

const WhyChooseUsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col justify-center">
      {/* Image Background with Ken Burns Effect */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          scale: [1, 1.08, 1],
          x: ["0%", "-1%", "0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <img
          src={seoulHanriver}
          alt="Seoul Han River"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.3) saturate(0.8)' }}
        />
      </motion.div>

      {/* Cobalt Blue Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0047AB]/50 via-[#1a1a2e]/30 to-background/95" />

      {/* Main Content - Centered */}
      <div className="container mx-auto px-4 relative z-10 flex-1 flex flex-col justify-center items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center gap-2 text-xs font-medium text-primary mb-6 tracking-widest uppercase"
        >
          <span className="w-6 h-px bg-primary" />
          Who We Are
          <span className="w-6 h-px bg-primary" />
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
        >
          We Bridge Your Project to{' '}
          <span className="text-primary">Korea</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-base md:text-lg text-white/60 max-w-2xl leading-relaxed"
        >
          Korea's leading Web3 Go-To-Market agency helping global projects achieve market entry and sustainable growth.
        </motion.p>
      </div>

      {/* Bottom Stats Row */}
      <div className="relative z-10 border-t border-white/10">
        <div className="container mx-auto px-4 py-8 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <StatItem key={stat.label} stat={stat} index={index} isVisible={isVisible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
