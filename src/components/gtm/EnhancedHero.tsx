import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Rocket, Target, Infinity as InfinityIcon } from 'lucide-react';

const EnhancedHero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // 3D Icon component for letter replacement
  const Icon3D = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <motion.span 
      className={`inline-flex items-center justify-center ${className}`}
      whileHover={{ scale: 1.1, rotateY: 15 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {children}
    </motion.span>
  );

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-black">
      {/* Video Background - subtle */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-20"
        >
          <source src="/videos/gtm-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
      </motion.div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }} />
      </div>

      {/* Main Content - Staggered Typography */}
      <motion.div 
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20"
        style={{ opacity, y: textY }}
      >
        {/* Staggered Large Typography - MADUP + theSMC style */}
        <div className="w-full max-w-7xl mx-auto">
          
          {/* Line 1 - "KOREAN" with outline style */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex justify-start md:justify-center md:ml-[-15%] mb-2 md:mb-4"
          >
            <h1 className="text-[clamp(3rem,15vw,12rem)] font-black tracking-tighter leading-none">
              <span 
                className="text-transparent bg-clip-text"
                style={{
                  WebkitTextStroke: '2px rgba(255,255,255,0.8)',
                }}
              >
                K
              </span>
              <Icon3D className="mx-1 md:mx-2">
                <span className="relative inline-flex items-center justify-center w-[clamp(2.5rem,12vw,10rem)] h-[clamp(2.5rem,12vw,10rem)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-full opacity-80 blur-sm" />
                  <div className="absolute inset-1 bg-gradient-to-br from-violet-400 to-fuchsia-500 rounded-full flex items-center justify-center">
                    <Rocket className="w-[clamp(1.2rem,6vw,5rem)] h-[clamp(1.2rem,6vw,5rem)] text-white transform rotate-45" />
                  </div>
                </span>
              </Icon3D>
              <span className="text-white">REAN</span>
            </h1>
          </motion.div>

          {/* Line 2 - "MARKET" with 3D icon */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex justify-end md:justify-center md:mr-[-10%] mb-2 md:mb-4"
          >
            <h1 className="text-[clamp(3rem,15vw,12rem)] font-black tracking-tighter leading-none">
              <span className="text-white">M</span>
              <span 
                className="text-transparent"
                style={{
                  WebkitTextStroke: '2px rgba(255,255,255,0.6)',
                }}
              >
                A
              </span>
              <span className="text-white">RK</span>
              <Icon3D className="mx-1 md:mx-2">
                <span className="relative inline-flex items-center justify-center w-[clamp(2.5rem,12vw,10rem)] h-[clamp(2.5rem,12vw,10rem)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl rotate-12 opacity-80" />
                  <div className="absolute inset-1 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl rotate-12 flex items-center justify-center">
                    <Target className="w-[clamp(1.2rem,6vw,5rem)] h-[clamp(1.2rem,6vw,5rem)] text-white" />
                  </div>
                </span>
              </Icon3D>
              <span className="text-white">T</span>
            </h1>
          </motion.div>

          {/* Line 3 - "ENTRY" with infinity icon */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex justify-start md:justify-center md:ml-[-5%] mb-8 md:mb-12"
          >
            <h1 className="text-[clamp(3rem,15vw,12rem)] font-black tracking-tighter leading-none">
              <span 
                className="text-transparent"
                style={{
                  WebkitTextStroke: '2px rgba(255,255,255,0.5)',
                }}
              >
                E
              </span>
              <span className="text-white">NTR</span>
              <Icon3D className="mx-1 md:mx-2">
                <span className="relative inline-flex items-center justify-center w-[clamp(3rem,14vw,11rem)] h-[clamp(2.5rem,12vw,9rem)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full opacity-80 blur-sm" />
                  <div className="absolute inset-1 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                    <InfinityIcon className="w-[clamp(1.5rem,7vw,6rem)] h-[clamp(1.5rem,7vw,6rem)] text-white" />
                  </div>
                </span>
              </Icon3D>
            </h1>
          </motion.div>

          {/* Subtitle - minimal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-white/50 text-lg md:text-2xl font-light tracking-wide">
              한국 Web3 시장 진출을 위한 올인원 솔루션
            </p>
            <p className="text-white/30 text-sm md:text-base mt-3 tracking-wider">
              30+ Global Projects · $50B Market · Data-Driven GTM
            </p>
          </motion.div>

          {/* CTA - Minimal border style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6"
          >
            <Link 
              to="/contact"
              className="group relative inline-flex items-center gap-3 px-8 py-4 border-2 border-white text-white font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300"
            >
              <span>무료 상담 예약</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 text-white/60 font-medium text-lg hover:text-white transition-colors"
            >
              <span>케이스 스터디</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator - minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a 
            href="#social-proof"
            className="flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent"
            />
          </a>
        </motion.div>
      </motion.div>

      {/* Side decorative elements */}
      <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 text-white/20 text-xs tracking-widest writing-mode-vertical">
        <span className="transform rotate-180" style={{ writingMode: 'vertical-rl' }}>
          KOREA'S #1 WEB3 GTM AGENCY
        </span>
      </div>
      <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 text-white/20 text-xs tracking-widest">
        <span style={{ writingMode: 'vertical-rl' }}>
          © 2024 IUM LABS
        </span>
      </div>
    </section>
  );
};

export default EnhancedHero;
