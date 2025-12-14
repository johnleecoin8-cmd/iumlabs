import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useCountUp } from '@/hooks/useCountUp';

const floatingTags = [
  { label: 'Trusted Partner', top: '15%', left: '8%' },
  { label: '24/7 Support', top: '25%', right: '12%' },
  { label: 'Korea Expert', top: '45%', left: '5%' },
  { label: 'VASP Compliant', top: '35%', right: '6%' },
  { label: 'Exchange Network', top: '55%', right: '10%' },
];

const mobileFloatingTags = [
  { label: 'Trusted', top: '12%', left: '5%' },
  { label: 'Korea', top: '20%', right: '5%' },
  { label: 'VASP', top: '35%', left: '8%' },
];

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
      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1">
        {count}
      </div>
      <div className="text-white/50 text-sm md:text-base">{stat.label}</div>
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
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        onLoadedMetadata={(e) => {
          e.currentTarget.currentTime = 0;
        }}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.35)' }}
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.3)] via-transparent to-[hsl(0,0%,4%,0.95)]" />

      {/* Floating Tags - Desktop */}
      {floatingTags.map((tag, index) => (
        <motion.div
          key={tag.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
          className="hidden sm:block absolute z-10"
          style={{
            top: tag.top,
            left: tag.left,
            right: tag.right,
          }}
        >
          <span className="px-4 py-2 text-xs font-medium text-white/80 bg-[hsl(0,0%,0%,0.6)] backdrop-blur-sm rounded-sm border border-white/10">
            {tag.label}
          </span>
        </motion.div>
      ))}

      {/* Floating Tags - Mobile */}
      {mobileFloatingTags.map((tag, index) => (
        <motion.div
          key={`mobile-${tag.label}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
          className="sm:hidden absolute z-10"
          style={{
            top: tag.top,
            left: tag.left,
            right: tag.right,
          }}
        >
          <span className="px-3 py-1.5 text-[10px] font-medium text-white/80 bg-[hsl(0,0%,0%,0.6)] backdrop-blur-sm rounded-sm border border-white/10">
            {tag.label}
          </span>
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center py-20">
        {/* Section Label */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center gap-2 text-xs font-medium text-primary mb-6 tracking-widest uppercase"
        >
          <span className="w-8 h-px bg-primary" />
          Why Choose Us
        </motion.span>

        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-6 leading-tight"
        >
          The Numbers <span className="text-primary">Speak</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-base md:text-lg text-white/50 max-w-2xl text-center mb-16 md:mb-24"
        >
          As a Web3 Marketing Agency with a focus on customer satisfaction, 
          CryptoBridge delivers unmatched results in the Korean market.
        </motion.p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full max-w-4xl">
          {stats.map((stat, index) => (
            <StatItem key={stat.label} stat={stat} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
