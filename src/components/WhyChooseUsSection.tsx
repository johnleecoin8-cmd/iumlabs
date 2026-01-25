import { motion, useAnimationFrame } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

// Particle type for chaos effect
interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  speed: number;
  angle: number;
}

// Neon colors representing market chaos
const NEON_COLORS = ['#FF1493', '#00CED1', '#FFFF00', '#00FF41', '#FF00FF', '#00BFFF'];

const WhyChooseUsSection = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleCount = isMobile ? 12 : 28;

  // Initialize particles
  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 300 + Math.random() * 200;
      newParticles.push({
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        color: NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)],
        size: 2 + Math.random() * 4,
        speed: 0.3 + Math.random() * 0.5,
        angle: angle,
      });
    }
    setParticles(newParticles);
  }, [particleCount]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#121212' }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-[#1a1a1a] via-[#121212] to-[#0a0a0a]" />
      
      {/* Chaos Particles - absorbed into monolith */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {particles.map((particle, index) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            }}
            initial={{ 
              x: particle.x, 
              y: particle.y, 
              opacity: 0.8,
              scale: 1
            }}
            animate={{ 
              x: 0, 
              y: 0, 
              opacity: 0,
              scale: 0.1
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: index * 0.15,
              ease: "easeIn"
            }}
          />
        ))}
      </div>

      {/* Central Monolith */}
      <div className="relative z-10 flex flex-col items-center">
        {/* The Monolith */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Monolith body */}
          <div 
            className="w-16 sm:w-20 md:w-24 h-48 sm:h-64 md:h-80 bg-black relative"
            style={{
              boxShadow: `
                0 0 60px rgba(255, 87, 34, 0.15),
                0 0 120px rgba(255, 87, 34, 0.08),
                inset 0 0 30px rgba(30, 30, 30, 0.5)
              `,
            }}
          >
            {/* Edge glow lines */}
            <div className="absolute inset-0 border border-[#2a2a2a]" />
            <div className="absolute -inset-[1px] border border-[#1a1a1a] opacity-50" />
          </div>

          {/* Insight Beam - shooting upward */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 -top-32 sm:-top-40 md:-top-48 w-1 sm:w-1.5"
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ height: '8rem', opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{
              background: 'linear-gradient(to top, #FF5722, #FF8A50, transparent)',
              boxShadow: '0 0 20px #FF5722, 0 0 40px #FF5722, 0 0 60px rgba(255, 87, 34, 0.5)',
            }}
          />

          {/* Beam pulse effect */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 -top-32 sm:-top-40 md:-top-48 w-6 sm:w-8"
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ height: '8rem', opacity: 0.3 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-full h-full"
              style={{
                background: 'linear-gradient(to top, rgba(255, 87, 34, 0.4), transparent)',
              }}
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Beam spark particles */}
          {!isMobile && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-[#FF8A50]"
                  style={{
                    left: '50%',
                    top: '-2rem',
                    boxShadow: '0 0 6px #FF5722',
                  }}
                  animate={{
                    y: [-20, -80 - i * 15],
                    x: [0, (i - 2) * 8],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeOut"
                  }}
                />
              ))}
            </>
          )}
        </motion.div>

        {/* Text Content */}
        <motion.div
          className="mt-12 sm:mt-16 text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            <span className="text-white">CHAOS IN.</span>
            <br />
            <span style={{ color: '#FF5722' }}>ALPHA OUT.</span>
          </h2>

          {/* Subheadline */}
          <p className="text-[#888888] text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-6 leading-relaxed">
            ium Labs connects global Web3 projects to Korea's dynamic ecosystem 
            through data-driven research and actionable insights.
          </p>

          {/* Founder Tag */}
          <p 
            className="text-sm sm:text-base font-medium tracking-wide"
            style={{ color: '#FF5722' }}
          >
            Founded by veterans from Binance & KuCoin
          </p>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default WhyChooseUsSection;
