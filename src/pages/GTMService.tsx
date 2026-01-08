import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';
import ServiceSchema from '@/components/ServiceSchema';
import { Link } from 'react-router-dom';
import { ArrowRight, Skull, Lock, Zap, Users, Megaphone, TrendingUp, Calendar } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';

// Hero Component
import EnhancedHero from '@/components/gtm/EnhancedHero';

// ============================================
// IMAGE IMPORTS
// ============================================
import seoulMetroBillboard from '@/assets/campaigns/seoul-metro-billboard.jpeg';
import storyOriginSummit from '@/assets/campaigns/story-origin-summit.jpg';
import peaqSummit from '@/assets/campaigns/peaq-summit.jpg';
import polygonConnect from '@/assets/campaigns/polygon-connect.png';
import bnbEvent from '@/assets/campaigns/bnb-event.jpg';
import openledgerEvent from '@/assets/campaigns/openledger-event.jpg';

import peaqLogo from '@/assets/logos/peaq.svg';

// ============================================
// SECTION 2: REALITY CHECK - MADUP STYLE
// ============================================
const RealityCheckSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const textY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden py-20">
      {/* Main Warning Text */}
      <motion.div 
        className="text-center px-4"
        style={{ y: textY }}
      >
        {/* 90% FAIL */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-2 md:gap-4 mb-2"
        >
          <span className="text-[clamp(3rem,15vw,12rem)] font-black text-transparent leading-none tracking-tighter"
            style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>
            90%
          </span>
          <span className="text-[clamp(3rem,15vw,12rem)] font-black text-transparent leading-none tracking-tighter"
            style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>
            F
          </span>
          <motion.div 
            className="relative w-[clamp(2.5rem,10vw,8rem)] h-[clamp(2.5rem,10vw,8rem)] flex items-center justify-center"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl blur-xl opacity-60" />
            <Skull className="relative w-2/3 h-2/3 text-white" strokeWidth={1.5} />
          </motion.div>
          <span className="text-[clamp(3rem,15vw,12rem)] font-black text-transparent leading-none tracking-tighter"
            style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>
            IL
          </span>
        </motion.div>

        {/* WITHIN 6 MONTHS */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="-mt-2 md:-mt-6"
        >
          <span className="text-[clamp(1.5rem,6vw,5rem)] font-bold text-white/20 tracking-tight">
            WITHIN 6 MONTHS
          </span>
        </motion.div>
      </motion.div>

      {/* Three Barriers */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5 }}
        className="grid md:grid-cols-3 gap-8 md:gap-16 mt-20 px-6 max-w-5xl mx-auto"
      >
        {[
          { icon: Lock, title: "LANGUAGE", sub: "99% search in Korean", desc: "Naver & Kakao dominate" },
          { icon: Skull, title: "REGULATORY", sub: "Strictest VASP rules", desc: "Compliance = Survival" },
          { icon: Zap, title: "OPERATIONS", sub: "24/7 engagement", desc: "Dead communities kill" },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 + i * 0.15 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full border border-white/10 flex items-center justify-center">
              <item.icon className="w-7 h-7 text-white/40" strokeWidth={1.5} />
            </div>
            <h3 className="text-white/90 font-black text-lg tracking-wider mb-1">THE {item.title}</h3>
            <p className="text-white/40 text-sm mb-1">{item.sub}</p>
            <p className="text-white/20 text-xs">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

// ============================================
// SECTION 3: SOLUTION - MADUP STYLE
// ============================================
const SolutionSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section ref={ref} className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden py-20">
      {/* WE ARE */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <span className="text-[clamp(2rem,8vw,6rem)] font-black text-transparent leading-none tracking-tighter"
          style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.5)' }}>
          WE ARE
        </span>
      </motion.div>

      {/* 이음 - Giant Korean text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative my-8"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-violet-500/30 to-fuchsia-500/30 blur-3xl" />
        <span className="relative text-[clamp(6rem,25vw,20rem)] font-black bg-gradient-to-r from-primary via-violet-400 to-fuchsia-400 bg-clip-text text-transparent leading-none">
          이음
        </span>
      </motion.div>

      {/* LABS */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center"
      >
        <span className="text-[clamp(2rem,8vw,6rem)] font-black text-transparent leading-none tracking-tighter"
          style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.5)' }}>
          LABS
        </span>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6 }}
        className="text-white/40 text-sm md:text-base tracking-widest mt-8"
      >
        "TO CONNECT" — YOUR FOUNDATIONAL LAYER FOR KOREA
      </motion.p>

      {/* Value Props */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8 }}
        className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16 px-6"
      >
        {["LOCAL DNA", "DATA-FIRST", "FULL-STACK"].map((item, i) => (
          <motion.span
            key={item}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 + i * 0.1 }}
            className="text-white/60 text-xs md:text-sm tracking-[0.3em] font-medium"
          >
            {item}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
};

// ============================================
// SECTION 4: EVIDENCE - MADUP STYLE NUMBERS
// ============================================
const EvidenceSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  const metrics = [
    { value: 340, suffix: "%", label: "VOLUME UPLIFT" },
    { value: 2.5, suffix: "M+", label: "ORGANIC REACH" },
    { value: 84, suffix: "%", label: "RETENTION RATE" },
    { value: 30, suffix: "+", label: "PROJECTS LAUNCHED" },
  ];

  return (
    <section ref={ref} className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden py-20">
      {/* Section Label */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="text-white/20 text-[10px] tracking-[0.5em] mb-16"
      >
        NUMBERS DON'T LIE
      </motion.span>

      {/* Big Numbers Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 px-6 max-w-6xl mx-auto">
        {metrics.map((metric, i) => (
          <MetricItem 
            key={metric.label}
            {...metric}
            isInView={isInView}
            delay={i * 0.15}
          />
        ))}
      </div>

      {/* Testimonial */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8 }}
        className="max-w-2xl mx-auto mt-24 px-6 text-center"
      >
        <img 
          src={peaqLogo} 
          alt="peaq"
          className="h-6 w-auto brightness-0 invert opacity-40 mx-auto mb-6"
        />
        <blockquote className="text-white/60 text-lg md:text-xl leading-relaxed italic">
          "Their deep understanding of the local crypto ecosystem is unmatched."
        </blockquote>
        <p className="text-white/30 text-sm mt-4">— David Park, CEO of peaq Network</p>
      </motion.div>
    </section>
  );
};

const MetricItem = ({ value, label, suffix = "", isInView, delay = 0 }: { 
  value: number; 
  label: string; 
  suffix?: string; 
  isInView: boolean;
  delay?: number;
}) => {
  const count = useCountUp({ end: value, isVisible: isInView, suffix });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay }}
      className="text-center"
    >
      <span className="text-[clamp(2.5rem,8vw,5rem)] font-black bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent leading-none">
        {count}
      </span>
      <p className="text-white/30 text-[10px] md:text-xs tracking-[0.2em] mt-3">{label}</p>
    </motion.div>
  );
};

// ============================================
// SECTION 5: STRATEGY - MADUP STYLE PROCESS
// ============================================
const StrategySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  const steps = [
    { num: "01", title: "DISCOVERY", week: "W1-2", items: ["Market Research", "Competitor Analysis", "Regulation Check"] },
    { num: "02", title: "STRATEGY", week: "W3-4", items: ["GTM Roadmap", "Channel Strategy", "KPI Setting"] },
    { num: "03", title: "LAUNCH", week: "W5-8", items: ["PR Campaign", "KOL Activation", "Event Launch"] },
    { num: "04", title: "SCALE", week: "ONGOING", items: ["Optimization", "Volume Tracking", "Retention"] },
  ];

  return (
    <section ref={ref} className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden py-20">
      {/* Giant Title */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 px-4"
      >
        <div className="flex items-center justify-center gap-2 md:gap-4">
          <span className="text-[clamp(2rem,10vw,8rem)] font-black text-transparent leading-none tracking-tighter"
            style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>
            8 WEEKS
          </span>
        </div>
        <span className="text-[clamp(1.5rem,6vw,4rem)] font-bold text-white/20 tracking-tight block mt-2">
          TO LAUNCH
        </span>
      </motion.div>

      {/* Process Steps */}
      <div className="grid md:grid-cols-4 gap-px max-w-6xl mx-auto w-full px-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="bg-white/[0.02] border border-white/5 p-6 md:p-8 text-center hover:bg-white/[0.04] transition-colors"
          >
            <span className="text-white/10 text-5xl md:text-6xl font-black">{step.num}</span>
            <h3 className="text-white font-black text-lg tracking-wider mt-4">{step.title}</h3>
            <span className="text-white/30 text-xs tracking-widest block mt-1">{step.week}</span>
            <div className="mt-6 space-y-2">
              {step.items.map((item, j) => (
                <p key={j} className="text-white/40 text-xs">{item}</p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// ============================================
// SECTION 6: PORTFOLIO - MADUP STYLE GRID
// ============================================
const PortfolioSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const services = [
    { icon: Users, title: "COMMUNITY", sub: "24/7 Moderation" },
    { icon: Megaphone, title: "PR & MEDIA", sub: "Tier-1 Coverage" },
    { icon: TrendingUp, title: "KOL NETWORK", sub: "Performance-based" },
    { icon: Calendar, title: "OFFLINE EVENTS", sub: "Summits & Dinners" },
  ];

  const gallery = [
    { src: seoulMetroBillboard, label: "OUTDOOR" },
    { src: storyOriginSummit, label: "EVENTS" },
    { src: peaqSummit, label: "EVENTS" },
    { src: polygonConnect, label: "EVENTS" },
    { src: bnbEvent, label: "EVENTS" },
    { src: openledgerEvent, label: "VIP" },
  ];

  return (
    <section ref={ref} className="relative bg-black py-24 overflow-hidden">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="text-center mb-16 px-4"
      >
        <span className="text-white/20 text-[10px] tracking-[0.5em] block mb-4">CAPABILITIES</span>
        <h2 className="text-[clamp(2rem,6vw,4rem)] font-black text-transparent leading-none tracking-tighter"
          style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.6)' }}>
          REAL IMPACT
        </h2>
      </motion.div>

      {/* Services */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px max-w-5xl mx-auto px-6 mb-16">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="bg-white/[0.02] border border-white/5 p-6 text-center hover:bg-white/[0.04] transition-colors group"
          >
            <service.icon className="w-8 h-8 text-white/30 mx-auto mb-4 group-hover:text-white/60 transition-colors" strokeWidth={1} />
            <h4 className="text-white/80 font-bold text-sm tracking-wider">{service.title}</h4>
            <p className="text-white/30 text-xs mt-1">{service.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-1 max-w-6xl mx-auto px-6">
        {gallery.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="relative aspect-[4/3] overflow-hidden group"
          >
            <img
              src={item.src}
              alt=""
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs tracking-[0.3em] font-medium">{item.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// ============================================
// SECTION 7: FOOTER CTA - MADUP STYLE
// ============================================
const FooterCTASection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section ref={ref} className="relative min-h-[80vh] bg-black flex flex-col items-center justify-center overflow-hidden py-20">
      {/* Giant CTA Text */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center px-4"
      >
        <div className="space-y-0">
          <span className="block text-[clamp(2rem,8vw,6rem)] font-black text-transparent leading-none tracking-tighter"
            style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.7)' }}>
            READY TO
          </span>
          <span className="block text-[clamp(2rem,8vw,6rem)] font-black text-transparent leading-none tracking-tighter"
            style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.7)' }}>
            CROSS THE
          </span>
          <span className="block text-[clamp(2rem,8vw,6rem)] font-black bg-gradient-to-r from-primary via-violet-400 to-fuchsia-400 bg-clip-text text-transparent leading-none tracking-tighter">
            BRIDGE?
          </span>
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4 }}
        className="mt-16"
      >
        <Link
          to="/contact"
          className="group inline-flex items-center gap-4 px-12 py-5 bg-white text-black font-bold text-sm tracking-wide hover:bg-white/90 transition-all"
        >
          <span>SCHEDULE YOUR STRATEGY SESSION</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </Link>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
        className="text-white/20 text-xs tracking-widest mt-8"
      >
        NO COMMITMENT. JUST CLARITY.
      </motion.p>
    </section>
  );
};

// ============================================
// MAIN
// ============================================
const GTMService = () => {
  usePageMeta(
    "Crack Korea's $50B Crypto Market | Korea GTM | Ium Labs",
    "We bridge global Web3 projects to Korea's dynamic ecosystem with data-driven strategies. Trusted by 30+ projects. Binance & KuCoin alumni team."
  );

  return (
    <>
      <ServiceSchema
        name="Korea GTM Strategy"
        description="Data-driven go-to-market strategy for Web3 projects entering the Korean market. Powered by deep research and local expertise."
        url="/services/gtm"
        provider="Ium Labs"
        areaServed="South Korea"
      />
      <Navbar />
      <main className="bg-black">
        {/* Section 1: Hero */}
        <EnhancedHero />
        
        {/* Section 2: Reality Check */}
        <RealityCheckSection />
        
        {/* Section 3: Solution */}
        <SolutionSection />
        
        {/* Section 4: Evidence */}
        <EvidenceSection />
        
        {/* Section 5: Strategy */}
        <StrategySection />
        
        {/* Section 6: Portfolio */}
        <PortfolioSection />
        
        {/* Section 7: Footer CTA */}
        <FooterCTASection />
      </main>
      <Footer />
    </>
  );
};

export default GTMService;
