import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown, Lock, Unlock } from 'lucide-react';

const WalledGardenHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const gateOpen = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Digital Firewall Background */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Vertical barrier lines */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"
            style={{ left: `${(i + 1) * 5}%` }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
        
        {/* Horizontal scan lines */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)'
          }}
        />
      </div>

      {/* Central Gate */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Gate Frame */}
        <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px]">
          {/* Left door */}
          <motion.div
            className="absolute left-0 top-0 w-1/2 h-full border-l-2 border-t-2 border-b-2 border-blue-500/50 bg-gradient-to-r from-black to-transparent"
            style={{
              x: useTransform(gateOpen, [0, 1], [0, -50])
            }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-20 bg-blue-500/50" />
          </motion.div>
          
          {/* Right door */}
          <motion.div
            className="absolute right-0 top-0 w-1/2 h-full border-r-2 border-t-2 border-b-2 border-blue-500/50 bg-gradient-to-l from-black to-transparent"
            style={{
              x: useTransform(gateOpen, [0, 1], [0, 50])
            }}
          >
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-20 bg-blue-500/50" />
          </motion.div>
          
          {/* Light streaming through the gap */}
          <motion.div
            className="absolute left-1/2 top-0 -translate-x-1/2 w-4 h-full"
            style={{
              opacity: useTransform(gateOpen, [0, 0.5, 1], [0.3, 0.6, 1]),
              scaleX: useTransform(gateOpen, [0, 1], [1, 3])
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-400/0 via-blue-400/80 to-blue-400/0 blur-md" />
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/0 via-cyan-400/60 to-cyan-400/0 blur-xl" />
          </motion.div>
          
          {/* Data streams flowing through */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
              style={{
                height: '20px',
                top: `${10 + i * 10}%`
              }}
              animate={{
                y: ['0%', '800%'],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'linear'
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        style={{ opacity, y: textY }}
      >
        {/* Lock/Unlock icon */}
        <motion.div
          className="flex justify-center mb-8"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="relative">
            <Lock className="w-12 h-12 text-blue-400/50" />
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Unlock className="w-12 h-12 text-cyan-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span className="text-white">THE WORLD'S MOST LUCRATIVE</span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            WALLED GARDEN.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Korea isn't open to everyone. It's open to{' '}
          <span className="text-cyan-400 font-semibold">the Intelligence</span>.
          <br />
          While global markets sleep, Korea trades.
        </motion.p>

        <motion.p
          className="text-base md:text-lg text-muted-foreground/70 max-w-2xl mx-auto mb-10 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          Unlock the world's most concentrated liquidity with the only data-driven key.
        </motion.p>

        {/* Korean translation */}
        <motion.p
          className="text-sm text-muted-foreground/50 max-w-xl mx-auto mb-12 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          유일한 데이터 기반의 키(Key)로 세계에서 가장 밀집된 유동성을 잠금 해제하세요.
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href="#contact"
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold tracking-wide rounded-none border border-cyan-400/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.3)] transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Unlock className="w-5 h-5" />
          UNLOCK ACCESS
        </motion.a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ opacity }}
      >
        <span className="text-xs font-mono text-muted-foreground/50 tracking-widest">SCROLL DOWN</span>
        <ChevronDown className="w-5 h-5 text-cyan-400/50" />
      </motion.div>

      {/* Side text */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:block">
        <div className="transform -rotate-90 origin-center whitespace-nowrap">
          <span className="text-xs font-mono text-muted-foreground/30 tracking-[0.3em]">
            KOREA · GATEWAY · LIQUIDITY
          </span>
        </div>
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block">
        <div className="transform rotate-90 origin-center whitespace-nowrap">
          <span className="text-xs font-mono text-muted-foreground/30 tracking-[0.3em]">
            DATA-DRIVEN · ACCESS
          </span>
        </div>
      </div>
    </section>
  );
};

export default WalledGardenHero;
