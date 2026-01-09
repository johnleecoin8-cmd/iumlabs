import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

// Seoul Images
import seoulGangnamNight from '@/assets/backgrounds/seoul-gangnam-night.jpg';
import seoulDdpNight from '@/assets/backgrounds/seoul-ddp-night.jpg';
import seoulTechFuture from '@/assets/backgrounds/seoul-tech-future.jpg';
import seoulHanriver from '@/assets/backgrounds/seoul-hanriver-twilight.jpg';

const seoulImages = [
  seoulGangnamNight,
  seoulDdpNight,
  seoulTechFuture,
  seoulHanriver,
];

const EnhancedHero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % seoulImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen bg-black overflow-hidden">
      {/* Background Image Slideshow */}
      <motion.div 
        className="absolute inset-0"
        style={{ scale: imageScale }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={seoulImages[currentImageIndex]}
            alt="Seoul"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        
        {/* Refined overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      </motion.div>
      
      {/* Main Content */}
      <motion.div 
        className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12 lg:px-20"
        style={{ opacity, y: textY }}
      >
        <div className="max-w-6xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-12 h-px bg-primary" />
            <span className="text-primary text-xs font-medium tracking-[0.2em] uppercase">
              Go-To-Market Strategy
            </span>
          </motion.div>

          {/* Main Headline */}
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-[clamp(2.5rem,8vw,6rem)] font-bold text-white leading-[1.05] tracking-tight"
            >
              Unlock Korea,
            </motion.h1>
            
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[1.05] tracking-tight"
            >
              <span className="text-white">The </span>
              <span className="bg-gradient-to-r from-primary via-orange-400 to-amber-500 bg-clip-text text-transparent">
                Engine of Crypto
              </span>
            </motion.h1>
          </div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-white/50 text-base md:text-lg mt-8 max-w-xl font-light leading-relaxed"
          >
            Strategic market entry for Web3 projects.
            <span className="text-white/80"> We turn Korean attention into global momentum.</span>
          </motion.p>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-wrap gap-8 md:gap-12 mt-10"
          >
            {[
              { value: '$1.5B+', label: 'Volume Generated' },
              { value: '500K+', label: 'Active Community' },
              { value: '#1', label: 'Mindshare Ranking' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-2xl md:text-3xl font-bold text-white">{stat.value}</span>
                <span className="text-white/40 text-xs tracking-wide mt-1">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 right-6 md:right-12 lg:right-20 flex items-center gap-3"
      >
        <span className="text-white/30 text-[10px] tracking-[0.15em] uppercase hidden md:block">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center"
        >
          <ArrowDown className="w-4 h-4 text-white/40" />
        </motion.div>
      </motion.div>

      {/* Image Progress Indicators */}
      <div className="absolute bottom-8 left-6 md:left-12 lg:left-20 flex gap-2">
        {seoulImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImageIndex(i)}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === currentImageIndex ? 'w-8 bg-primary' : 'w-2 bg-white/20'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default EnhancedHero;
