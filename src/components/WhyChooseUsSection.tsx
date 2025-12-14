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
    <section className="relative min-h-screen overflow-hidden flex flex-col justify-center">
      {/* Image Background with Ken Burns Effect */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          scale: [1, 1.1, 1],
          x: ["0%", "-2%", "0%"],
          y: ["0%", "-1%", "0%"],
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
          style={{ filter: 'brightness(0.35) saturate(0.8)' }}
        />
      </motion.div>

      {/* Cobalt Blue Gradient Overlay with Light Sweep */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0047AB]/60 via-[#1a1a2e]/40 to-[hsl(0,0%,4%,0.95)]" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
      />

      {/* Floating Tags with Infinite Float Animation */}
      {floatingTags.map((tag) => (
        <motion.div
          key={tag.label}
          initial={{ opacity: 0, scale: 0.8, y: 0 }}
          animate={isVisible ? { 
            opacity: 1, 
            scale: 1,
            y: [0, -10, 0],
          } : { opacity: 0, scale: 0.8 }}
          transition={{ 
            opacity: { delay: 0.2 + tag.delay, duration: 0.5 },
            scale: { delay: 0.2 + tag.delay, duration: 0.5 },
            y: { delay: 0.2 + tag.delay, duration: 3 + tag.delay, repeat: Infinity, ease: "easeInOut" }
          }}
          className="hidden sm:block absolute z-10"
          style={{
            top: tag.top,
            left: tag.left,
            right: tag.right,
          }}
        >
          <span className="px-4 py-2 text-xs font-medium text-white bg-primary/20 backdrop-blur-md rounded-full border border-primary/40 shadow-lg shadow-primary/20 hover:bg-primary/30 hover:scale-110 transition-all duration-300">
            {tag.label}
          </span>
        </motion.div>
      ))}

      {/* Floating Tags - Mobile */}
      {mobileFloatingTags.map((tag) => (
        <motion.div
          key={`mobile-${tag.label}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { 
            opacity: 1, 
            scale: 1,
            y: [0, -6, 0],
          } : { opacity: 0, scale: 0.8 }}
          transition={{ 
            opacity: { delay: 0.2 + tag.delay, duration: 0.5 },
            y: { delay: 0.2 + tag.delay, duration: 2.5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="sm:hidden absolute z-10"
          style={{
            top: tag.top,
            left: tag.left,
            right: tag.right,
          }}
        >
          <span className="px-3 py-1.5 text-[10px] font-medium text-white bg-primary/20 backdrop-blur-md rounded-full border border-primary/40">
            {tag.label}
          </span>
        </motion.div>
      ))}

      {/* Main Content - 2 Column Layout (Different from Hero's centered layout) */}
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text */}
          <div>
            {/* Section Label */}
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 text-xs font-medium text-primary mb-6 tracking-widest uppercase"
            >
              <span className="w-8 h-px bg-primary" />
              Why Choose Us
            </motion.span>

            {/* Main Headline with Blur-to-Clear Effect */}
            <motion.h2
              initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
              animate={isVisible ? { opacity: 1, filter: "blur(0px)", y: 0 } : { opacity: 0, filter: "blur(12px)", y: 20 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              The Numbers{' '}
              <span className="relative">
                <span className="text-primary">Speak</span>
                <motion.span 
                  className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={isVisible ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                />
              </span>
            </motion.h2>

            {/* Subtext with Blur-to-Clear Effect */}
            <motion.p
              initial={{ opacity: 0, filter: "blur(8px)", y: 15 }}
              animate={isVisible ? { opacity: 1, filter: "blur(0px)", y: 0 } : { opacity: 0, filter: "blur(8px)", y: 15 }}
              transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
              className="text-base md:text-lg text-white/60 max-w-lg leading-relaxed"
            >
              As a Web3 Marketing Agency with a focus on customer satisfaction, 
              CryptoBridge delivers unmatched results in the Korean market. 
              Our track record speaks for itself.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-8"
            >
              <a
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 text-primary rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-all duration-300"
              >
                View Our Work
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Right Column - Stats Grid */}
          <div className="grid grid-cols-2 gap-4 md:gap-5">
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
