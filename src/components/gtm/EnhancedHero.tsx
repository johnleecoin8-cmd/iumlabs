import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Zap } from 'lucide-react';

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
      {/* Fullscreen Video Background - Seoul Cyberpunk */}
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
        {/* Dark overlay with gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        {/* Subtle orange glow from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
      </motion.div>
      
      {/* Main Content */}
      <motion.div 
        className="relative z-10 h-full flex flex-col items-center justify-center px-4"
        style={{ opacity, y: textY }}
      >
        <div className="w-full max-w-7xl mx-auto text-center">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-8"
          >
            <Zap className="w-3 h-3 text-primary" fill="currentColor" />
            <span className="text-primary text-xs font-medium tracking-widest uppercase">
              The World's Most Active Liquidity
            </span>
          </motion.div>

          {/* Giant Typography Block */}
          <div className="space-y-0">
            {/* Line 1 - UNLOCK */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="block text-[clamp(2.5rem,12vw,10rem)] font-black text-transparent leading-[0.85] tracking-tighter"
                style={{ WebkitTextStroke: '2px rgba(255,255,255,0.9)' }}>
                UNLOCK
              </span>
            </motion.div>
            
            {/* Line 2 - KOREA with gradient */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="block text-[clamp(2.5rem,12vw,10rem)] font-black bg-gradient-to-r from-primary via-orange-400 to-rose-500 bg-clip-text text-transparent leading-[0.85] tracking-tighter">
                KOREA
              </span>
            </motion.div>

            {/* Line 3 - THE ENGINE */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="block text-[clamp(1.5rem,6vw,5rem)] font-black text-white/30 leading-[1] tracking-tight mt-2">
                THE ENGINE OF CRYPTO
              </span>
            </motion.div>
          </div>

          {/* Tagline - Dynamic messaging */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-white/60 text-base md:text-xl tracking-wide mt-8 md:mt-12 max-w-2xl mx-auto font-light"
          >
            Korea isn't just a market.{' '}
            <span className="text-white font-medium">It's the ignition key for global hype.</span>
          </motion.p>
        </div>
      </motion.div>

      {/* SCROLL DOWN Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-[10px] md:text-xs tracking-[0.3em] font-medium">
          EXPLORE THE OPPORTUNITY
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/40" strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      {/* Side text - Seoul Cyberpunk */}
      <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2">
        <span className="text-white/20 text-[10px] tracking-[0.3em] uppercase" style={{ writingMode: 'vertical-rl' }}>
          SEOUL · GANGNAM · HONGDAE
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
