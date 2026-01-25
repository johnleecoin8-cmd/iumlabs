import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

// Neon colors representing market chaos
const NEON_COLORS = ['#FF1493', '#00CED1', '#FFFF00', '#00FF41', '#FF00FF', '#00BFFF'];

// Bridge logo SVG path for the gate halves
const BridgeGateHalf = ({ side }: { side: 'left' | 'right' }) => {
  const isLeft = side === 'left';
  
  return (
    <svg
      viewBox={isLeft ? "0 0 50 100" : "50 0 50 100"}
      className="h-full w-full"
      style={{ filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.5))' }}
    >
      <defs>
        <linearGradient id={`gateGradient-${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00FFFF" />
          <stop offset="50%" stopColor="#FF00FF" />
          <stop offset="100%" stopColor="#00FFFF" />
        </linearGradient>
        <filter id={`glow-${side}`}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Gate frame - half of the bridge arch */}
      {isLeft ? (
        <path
          d="M 50 15 
             Q 25 15 15 35
             L 15 85
             L 20 85
             L 20 40
             Q 25 25 50 20
             L 50 15 Z"
          fill="none"
          stroke={`url(#gateGradient-${side})`}
          strokeWidth="2"
          filter={`url(#glow-${side})`}
        />
      ) : (
        <path
          d="M 50 15 
             Q 75 15 85 35
             L 85 85
             L 80 85
             L 80 40
             Q 75 25 50 20
             L 50 15 Z"
          fill="none"
          stroke={`url(#gateGradient-${side})`}
          strokeWidth="2"
          filter={`url(#glow-${side})`}
        />
      )}
      
      {/* Decorative horizontal lines */}
      {isLeft ? (
        <>
          <line x1="20" y1="50" x2="45" y2="50" stroke="#00FFFF" strokeWidth="0.5" opacity="0.5" />
          <line x1="20" y1="60" x2="45" y2="60" stroke="#FF00FF" strokeWidth="0.5" opacity="0.5" />
          <line x1="20" y1="70" x2="45" y2="70" stroke="#00FFFF" strokeWidth="0.5" opacity="0.5" />
        </>
      ) : (
        <>
          <line x1="55" y1="50" x2="80" y2="50" stroke="#00FFFF" strokeWidth="0.5" opacity="0.5" />
          <line x1="55" y1="60" x2="80" y2="60" stroke="#FF00FF" strokeWidth="0.5" opacity="0.5" />
          <line x1="55" y1="70" x2="80" y2="70" stroke="#00FFFF" strokeWidth="0.5" opacity="0.5" />
        </>
      )}
    </svg>
  );
};

// Chaos particle being absorbed into the gate
const ChaosParticle = ({ index, isInView }: { index: number; isInView: boolean }) => {
  const angle = (index / 12) * Math.PI * 2;
  const radius = 200 + Math.random() * 100;
  const startX = Math.cos(angle) * radius;
  const startY = Math.sin(angle) * radius;
  
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{
        backgroundColor: NEON_COLORS[index % NEON_COLORS.length],
        left: '50%',
        top: '50%',
        boxShadow: `0 0 10px ${NEON_COLORS[index % NEON_COLORS.length]}`,
      }}
      initial={{ 
        x: startX, 
        y: startY, 
        opacity: 0,
        scale: 1 
      }}
      animate={isInView ? {
        x: [startX, 0],
        y: [startY, 0],
        opacity: [0, 0.8, 0],
        scale: [1, 0.5, 0],
      } : {}}
      transition={{
        duration: 3 + Math.random() * 2,
        delay: 2.5 + index * 0.2,
        repeat: Infinity,
        repeatDelay: Math.random() * 2,
        ease: "easeIn"
      }}
    />
  );
};

// Light particle emerging from the gate
const LightParticle = ({ delay, x, isInView }: { delay: number; x: number; isInView: boolean }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full bg-[#FF5722]"
    style={{ left: `${50 + x}%`, bottom: '35%' }}
    initial={{ opacity: 0, y: 0, scale: 0 }}
    animate={isInView ? {
      opacity: [0, 1, 0],
      y: [-20, -100],
      scale: [0, 1, 0.5],
    } : {}}
    transition={{
      duration: 2,
      delay: delay + 2,
      repeat: Infinity,
      repeatDelay: 1,
      ease: "easeOut"
    }}
  />
);

const WhyChooseUsSection = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const particleCount = isMobile ? 8 : 12;

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden py-24"
      style={{ backgroundColor: '#121212' }}
    >
      {/* Background subtle grid */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Chaos particles being absorbed */}
      {Array.from({ length: particleCount }).map((_, i) => (
        <ChaosParticle key={i} index={i} isInView={isInView} />
      ))}

      {/* Main Gate Container */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Gate Visual */}
        <div 
          className="relative w-56 h-72 sm:w-64 sm:h-80 md:w-80 md:h-96 lg:w-96 lg:h-[28rem]"
          style={{ perspective: '1000px' }}
        >
          {/* Inner Light (visible when gate opens) */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2, duration: 1 }}
          >
            {/* Central light glow */}
            <motion.div
              className="absolute w-24 h-48 sm:w-32 sm:h-64 md:w-40 md:h-80"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(255, 87, 34, 0.8) 0%, rgba(255, 87, 34, 0.4) 30%, rgba(255, 138, 80, 0.2) 50%, transparent 70%)',
              }}
              initial={{ opacity: 0, scaleY: 0.5 }}
              animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
              transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" }}
            />
            
            {/* Light beam shooting upward */}
            <motion.div
              className="absolute w-4 h-32 sm:h-40 md:h-52 -top-16 sm:-top-20 md:-top-28"
              style={{
                background: 'linear-gradient(to top, rgba(255, 87, 34, 0.9) 0%, rgba(255, 138, 80, 0.5) 50%, transparent 100%)',
                filter: 'blur(8px)',
              }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
              transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
            />
            
            {/* Pulsing core */}
            <motion.div
              className="absolute w-6 h-6 sm:w-8 sm:h-8 rounded-full"
              style={{
                background: 'radial-gradient(circle, #FFFFFF 0%, #FF5722 50%, transparent 70%)',
                boxShadow: '0 0 60px #FF5722, 0 0 100px rgba(255, 87, 34, 0.5)',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { 
                opacity: [0, 1, 0.8, 1],
                scale: [0, 1.2, 1, 1.1],
              } : {}}
              transition={{ 
                delay: 1.6,
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>

          {/* Left Gate Door */}
          <motion.div
            className="absolute left-0 top-0 w-1/2 h-full origin-left"
            style={{ transformStyle: 'preserve-3d' }}
            initial={{ rotateY: 0 }}
            animate={isInView ? { rotateY: -50 } : {}}
            transition={{ delay: 0.5, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <BridgeGateHalf side="left" />
            
            {/* Door surface with semi-transparent fill */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(255, 0, 255, 0.1) 100%)',
                clipPath: 'polygon(100% 15%, 40% 20%, 30% 35%, 30% 85%, 40% 85%, 40% 40%, 50% 25%, 100% 20%)',
              }}
              initial={{ opacity: 1 }}
              animate={isInView ? { opacity: 0.3 } : {}}
              transition={{ delay: 0.8, duration: 1 }}
            />
          </motion.div>

          {/* Right Gate Door */}
          <motion.div
            className="absolute right-0 top-0 w-1/2 h-full origin-right"
            style={{ transformStyle: 'preserve-3d' }}
            initial={{ rotateY: 0 }}
            animate={isInView ? { rotateY: 50 } : {}}
            transition={{ delay: 0.5, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <BridgeGateHalf side="right" />
            
            {/* Door surface with semi-transparent fill */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(225deg, rgba(255, 0, 255, 0.1) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 255, 255, 0.1) 100%)',
                clipPath: 'polygon(0% 15%, 60% 20%, 70% 35%, 70% 85%, 60% 85%, 60% 40%, 50% 25%, 0% 20%)',
              }}
              initial={{ opacity: 1 }}
              animate={isInView ? { opacity: 0.3 } : {}}
              transition={{ delay: 0.8, duration: 1 }}
            />
          </motion.div>

          {/* Gate Frame - Top Arch (connecting piece) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            style={{ filter: 'drop-shadow(0 0 15px rgba(255, 87, 34, 0.5))' }}
          >
            <defs>
              <linearGradient id="archGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00FFFF" />
                <stop offset="50%" stopColor="#FF5722" />
                <stop offset="100%" stopColor="#FF00FF" />
              </linearGradient>
            </defs>
            {/* Top arch connecting piece */}
            <motion.path
              d="M 15 35 Q 50 5 85 35"
              fill="none"
              stroke="url(#archGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
            />
          </svg>

          {/* Light particles emerging from gate */}
          {!isMobile && Array.from({ length: 6 }).map((_, i) => (
            <LightParticle key={i} delay={i * 0.3} x={(i - 3) * 4} isInView={isInView} />
          ))}
        </div>

        {/* Text Content */}
        <motion.div
          className="mt-10 sm:mt-12 md:mt-16 text-center max-w-2xl px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6"
            style={{ 
              color: '#FFFFFF',
              textShadow: '0 0 30px rgba(255, 87, 34, 0.5)'
            }}
          >
            OPEN THE GATE
            <br />
            <span style={{ color: '#FF5722' }}>TO ALPHA.</span>
          </h2>
          
          <motion.p
            className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8"
            style={{ color: '#888888' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 2.3, duration: 0.8 }}
          >
            ium Labs connects global Web3 projects with the Korean market through 
            data-driven research and strategic GTM marketing.
          </motion.p>
          
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
            style={{ 
              borderColor: '#FF5722',
              backgroundColor: 'rgba(255, 87, 34, 0.1)'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 2.5, duration: 0.5 }}
          >
            <span className="text-sm md:text-base" style={{ color: '#FF5722' }}>
              Founded by veterans from Binance & KuCoin
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Ambient glow at bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(255, 87, 34, 0.1) 0%, transparent 100%)'
        }}
      />
    </section>
  );
};

export default WhyChooseUsSection;
