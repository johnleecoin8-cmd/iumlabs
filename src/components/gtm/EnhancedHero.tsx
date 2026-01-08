import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const EnhancedHero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={sectionRef} className="relative h-screen bg-black overflow-hidden">
      {/* Fullscreen Video Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ scale: videoScale }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>
      
      {/* Main Content - Space Monster Style Giant Typography */}
      <motion.div 
        className="relative z-10 h-full flex flex-col items-center justify-center px-4"
        style={{ opacity, y: textY }}
      >
        <div className="w-full max-w-7xl mx-auto text-center">
          
          {/* Giant Typography Block - SPACE MONSTER STYLE */}
          <div className="space-y-0">
            {/* Line 1 */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="block text-[clamp(3rem,15vw,12rem)] font-black text-transparent leading-[0.85] tracking-tighter"
                style={{ WebkitTextStroke: '2px rgba(255,255,255,0.9)' }}>
                BEYOND
              </span>
            </motion.div>
            
            {/* Line 2 - Filled gradient */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="block text-[clamp(3rem,15vw,12rem)] font-black bg-gradient-to-r from-primary via-violet-400 to-fuchsia-400 bg-clip-text text-transparent leading-[0.85] tracking-tighter">
                CREATIVE
              </span>
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-white/50 text-sm md:text-lg tracking-widest mt-8 md:mt-12"
          >
            DATA-DRIVEN WEB3 GTM FOR KOREA
          </motion.p>
        </div>
      </motion.div>

      {/* SCROLL DOWN Indicator - Space Monster Style */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-[10px] md:text-xs tracking-[0.3em] font-medium">
          SCROLL DOWN
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/40" strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      {/* Side text - Space Monster style */}
      <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2">
        <span className="text-white/20 text-[10px] tracking-[0.3em] uppercase" style={{ writingMode: 'vertical-rl' }}>
          KOREA'S #1 WEB3 GTM AGENCY
        </span>
      </div>
      <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2">
        <span className="text-white/20 text-[10px] tracking-[0.3em]" style={{ writingMode: 'vertical-rl' }}>
          © 2025 IUM LABS
        </span>
      </div>
    </section>
  );
};

export default EnhancedHero;
