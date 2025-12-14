import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useCountUp } from '@/hooks/useCountUp';
import seoulHanriver from '@/assets/backgrounds/seoul-hanriver-twilight.jpg';

const floatingTags = [
  { label: 'Trusted Partner', top: '12%', left: '5%', delay: 0 },
  { label: '24/7 Support', top: '18%', right: '8%', delay: 0.5 },
  { label: 'Korea Expert', top: '75%', left: '8%', delay: 1 },
  { label: 'VASP Compliant', top: '70%', right: '5%', delay: 1.5 },
];

const mobileFloatingTags = [
  { label: 'Trusted', top: '8%', left: '5%', delay: 0 },
  { label: 'Korea', top: '8%', right: '5%', delay: 0.3 },
];

const stats = [
  { value: 1000, label: 'Vetted KOLs', suffix: '+' },
  { value: 500, label: 'Raised for Clients', prefix: '$', suffix: 'M+' },
  { value: 50, label: 'Exchange Partners', suffix: '+' },
  { value: 200, label: 'Projects Launched', suffix: '+' },
];

const StatCard = ({ stat, index, isVisible }: { stat: typeof stats[0]; index: number; isVisible: boolean }) => {
  const count = useCountUp({
    end: stat.value,
    duration: 2000,
    isVisible,
    prefix: stat.prefix,
    suffix: stat.suffix,
  });
  
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -15, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, rotateY: 0, scale: 1 } : { opacity: 0, rotateY: -15, scale: 0.9 }}
      transition={{ delay: 0.4 + index * 0.15, duration: 0.6, type: "spring", stiffness: 100 }}
      whileHover={{ 
        scale: 1.05, 
        boxShadow: "0 0 40px rgba(59,130,246,0.3)",
        borderColor: "rgba(59,130,246,0.5)"
      }}
      className="bg-white/5 backdrop-blur-md rounded-2xl p-5 md:p-6 border border-white/10 transition-all duration-300 group cursor-pointer"
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white group-hover:text-primary transition-colors duration-300">
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
    <section className="relative min-h-[60vh] overflow-hidden flex flex-col justify-center py-16 md:py-24">
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

      {/* Floating Tags - Desktop */}
      {floatingTags.map((tag) => (
        <motion.div
          key={tag.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { 
            opacity: 1, 
            scale: 1,
            y: [0, -8, 0],
          } : { opacity: 0, scale: 0.8 }}
          transition={{ 
            opacity: { delay: 0.2 + tag.delay, duration: 0.5 },
            y: { delay: 0.2 + tag.delay, duration: 3 + tag.delay, repeat: Infinity, ease: "easeInOut" }
          }}
          className="hidden sm:block absolute z-10"
          style={{ top: tag.top, left: tag.left, right: tag.right }}
        >
          <span className="px-3 py-1.5 text-xs font-medium text-white bg-primary/20 backdrop-blur-md rounded-full border border-primary/40">
            {tag.label}
          </span>
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text */}
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 text-xs font-medium text-primary mb-4 tracking-widest uppercase"
            >
              <span className="w-6 h-px bg-primary" />
              Why Choose Us
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
            >
              We Bridge Your<br />
              Project to{' '}
              <span className="text-primary">Korea</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-sm md:text-base text-white/60 max-w-md leading-relaxed"
            >
              We're Korean Web3 Go-To-Market Agency dedicated to achieving successful entry and scalable growth for global projects in the dynamic Korean market.
            </motion.p>
          </div>

          {/* Right Column - Stats Grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} isVisible={isVisible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
