import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Rocket, Target } from 'lucide-react';

const EnhancedHero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black overflow-hidden">
      {/* Pure black background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Main Content - MADUP style giant typography */}
      <motion.div 
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4"
        style={{ opacity, y: textY }}
      >
        <div className="w-full max-w-7xl mx-auto text-center">
          
          {/* Giant Typography Block */}
          <div className="mb-12">
            {/* Line 1: CR[🚀]CK */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex items-center justify-center gap-2 md:gap-4"
            >
              <span className="text-[clamp(4rem,18vw,14rem)] font-black text-transparent leading-none tracking-tighter"
                style={{ 
                  WebkitTextStroke: '2px rgba(255,255,255,0.9)',
                }}>
                CR
              </span>
              <motion.div 
                className="relative w-[clamp(3rem,12vw,10rem)] h-[clamp(3rem,12vw,10rem)] flex items-center justify-center"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl blur-xl opacity-60" />
                <Rocket className="relative w-2/3 h-2/3 text-white" strokeWidth={1.5} />
              </motion.div>
              <span className="text-[clamp(4rem,18vw,14rem)] font-black text-transparent leading-none tracking-tighter"
                style={{ 
                  WebkitTextStroke: '2px rgba(255,255,255,0.9)',
                }}>
                CK
              </span>
            </motion.div>
            
            {/* Line 2: K[🎯]REA */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex items-center justify-center gap-2 md:gap-4 -mt-4 md:-mt-8"
            >
              <span className="text-[clamp(4rem,18vw,14rem)] font-black text-transparent leading-none tracking-tighter"
                style={{ 
                  WebkitTextStroke: '2px rgba(255,255,255,0.9)',
                }}>
                K
              </span>
              <motion.div 
                className="relative w-[clamp(3rem,12vw,10rem)] h-[clamp(3rem,12vw,10rem)] flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-violet-600 rounded-2xl blur-xl opacity-60" />
                <Target className="relative w-2/3 h-2/3 text-white" strokeWidth={1.5} />
              </motion.div>
              <span className="text-[clamp(4rem,18vw,14rem)] font-black text-transparent leading-none tracking-tighter"
                style={{ 
                  WebkitTextStroke: '2px rgba(255,255,255,0.9)',
                }}>
                REA
              </span>
            </motion.div>
            
            {/* Line 3: $50B - Filled text with gradient */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="-mt-4 md:-mt-8"
            >
              <span className="text-[clamp(4rem,18vw,14rem)] font-black bg-gradient-to-r from-primary via-violet-400 to-fuchsia-400 bg-clip-text text-transparent leading-none tracking-tighter">
                $50B
              </span>
            </motion.div>
          </div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-white/50 text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
          >
            We bridge global Web3 projects to Korea's dynamic ecosystem
            <br className="hidden md:block" />
            <span className="text-white/80">with data-driven strategies.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <Link 
              to="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-none font-bold text-sm tracking-wide hover:bg-white/90 transition-all"
            >
              <span>BOOK A STRATEGY CALL</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 text-white/60 hover:text-white font-medium text-sm tracking-wide transition-colors border border-white/20 hover:border-white/40"
            >
              <span>VIEW CASE STUDIES</span>
            </Link>
          </motion.div>
        </div>

        {/* Bottom Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="flex items-center gap-6 text-white/30 text-xs tracking-widest">
            <span>30+ PROJECTS</span>
            <span className="w-px h-4 bg-white/20" />
            <span>BINANCE & KUCOIN ALUMNI</span>
          </div>
        </motion.div>

        {/* Side text - MADUP style */}
        <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2">
          <span className="text-white/10 text-[10px] tracking-[0.3em] uppercase" style={{ writingMode: 'vertical-rl' }}>
            KOREA'S #1 WEB3 GTM AGENCY
          </span>
        </div>
        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2">
          <span className="text-white/10 text-[10px] tracking-[0.3em]" style={{ writingMode: 'vertical-rl' }}>
            © 2024 IUM LABS
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default EnhancedHero;
