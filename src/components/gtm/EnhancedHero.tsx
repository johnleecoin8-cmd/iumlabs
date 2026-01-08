import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';

// Client logos for Featured In section
import coinnessLogo from '@/assets/logos/coinness.png';
import blockmediaLogo from '@/assets/logos/blockmedia-new.png';
import bloomingbitLogo from '@/assets/logos/bloomingbit.png';

const EnhancedHero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-black">
      {/* Video Background - subtle */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="/videos/gtm-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      </motion.div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }} />
      </div>

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />

      {/* Main Content */}
      <motion.div 
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20"
        style={{ opacity, y: textY }}
      >
        <div className="w-full max-w-5xl mx-auto text-center">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/30 mb-8"
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Trusted by 30+ Projects</span>
            <span className="text-white/40 text-sm">|</span>
            <span className="text-white/60 text-sm">Binance & KuCoin Alumni Team</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-[clamp(2.5rem,8vw,5.5rem)] font-black text-white leading-[1.1] tracking-tight mb-6"
          >
            Crack Korea's{' '}
            <span className="bg-gradient-to-r from-primary via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              $50B
            </span>{' '}
            Crypto Market.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10"
          >
            We bridge global Web3 projects to Korea's dynamic ecosystem with{' '}
            <span className="text-white font-medium">data-driven strategies</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16"
          >
            <Link 
              to="/contact"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold text-base overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]"
            >
              <span>Book a Free Strategy Call</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 text-white/70 hover:text-white font-medium text-base transition-colors"
            >
              <span>View Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Featured In */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="pt-8 border-t border-white/10"
          >
            <p className="text-white/30 text-xs tracking-widest uppercase mb-6">Featured In</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {[coinnessLogo, blockmediaLogo, bloomingbitLogo].map((logo, i) => (
                <motion.img
                  key={i}
                  src={logo}
                  alt="Media"
                  className="h-5 md:h-6 w-auto object-contain opacity-40 hover:opacity-80 transition-opacity grayscale hover:grayscale-0"
                  whileHover={{ scale: 1.05 }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a 
            href="#problem"
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
      <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 text-white/10 text-xs tracking-widest">
        <span className="transform rotate-180" style={{ writingMode: 'vertical-rl' }}>
          KOREA'S #1 WEB3 GTM AGENCY
        </span>
      </div>
      <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 text-white/10 text-xs tracking-widest">
        <span style={{ writingMode: 'vertical-rl' }}>
          © 2024 IUM LABS
        </span>
      </div>
    </section>
  );
};

export default EnhancedHero;
