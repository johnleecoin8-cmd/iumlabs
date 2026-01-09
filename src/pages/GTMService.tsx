import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';
import ServiceSchema from '@/components/ServiceSchema';
import { Link } from 'react-router-dom';
import { ArrowRight, Skull, Lock, Zap, ExternalLink } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';

// Hero Component
import EnhancedHero from '@/components/gtm/EnhancedHero';

// ============================================
// IMAGE IMPORTS
// ============================================
import seoulMetroBillboard from '@/assets/campaigns/seoul-metro-billboard.jpeg';
import storyOriginSummit from '@/assets/campaigns/story-origin-summit.jpg';
import storyWorkshop from '@/assets/campaigns/story-workshop.jpg';
import peaqSummit from '@/assets/campaigns/peaq-summit.jpg';
import polygonConnect from '@/assets/campaigns/polygon-connect.png';
import bnbEvent from '@/assets/campaigns/bnb-event.jpg';
import openledgerEvent from '@/assets/campaigns/openledger-event.jpg';
import openledgerInterview from '@/assets/campaigns/openledger-interview.jpg';
import mantraParty from '@/assets/campaigns/mantra-party.jpg';
import mantraEvent from '@/assets/campaigns/mantra.jpg';
import bybitEvent from '@/assets/campaigns/bybit-event.jpg';
import saharaAiCampaign from '@/assets/campaigns/sahara-ai.jpg';
import kucoinCampaign from '@/assets/campaigns/kucoin-campaign.jpg';
import kucoinNew from '@/assets/campaigns/kucoin-new.jpg';

import peaqLogo from '@/assets/logos/peaq.svg';
import polygonLogo from '@/assets/logos/polygon.svg';

// Project backgrounds
import storyBg from '@/assets/projects/story-bg.jpg';
import mantraBg from '@/assets/projects/mantra-bg.jpg';
import peaqBg from '@/assets/projects/peaq-bg.jpg';
import bnbBg from '@/assets/projects/bnb-bg.jpg';
import saharaBg from '@/assets/projects/sahara-ai-bg.jpg';
import kucoinBg from '@/assets/projects/kucoin-bg.jpg';
import bybitBg from '@/assets/projects/bybit-bg.jpg';
import openledgerBg from '@/assets/campaigns/openledger-hero-official.png';

// Logos
import storyLogo from '@/assets/logos/story-protocol.png';
import mantraLogo from '@/assets/logos/mantra.png';
import bybitLogo from '@/assets/logos/bybit.png';
import bnbLogo from '@/assets/logos/bnb.svg';
import saharaLogo from '@/assets/logos/sahara-ai.png';
import kucoinLogo from '@/assets/logos/kucoin.svg';

// ============================================
// SECTION 2: WHY KOREA - MARKET OPPORTUNITY (FOMO)
// ============================================
const WhyKoreaSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const textY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const marketStats = [
    { value: "#3", label: "GLOBAL VOLUME", sublabel: "Worldwide Trading" },
    { value: "#1", label: "ALTCOIN VOLUME", sublabel: "Global Alt Market" },
    { value: "5-15%", label: "KIMCHI PREMIUM", sublabel: "Price Premium" },
  ];

  return (
    <section ref={ref} className="relative min-h-[90vh] bg-black flex flex-col items-center justify-center overflow-hidden py-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center px-4 mb-12"
      >
        <span className="text-primary/60 text-[10px] md:text-xs tracking-[0.5em] font-medium block mb-4">
          THE CHALLENGE
        </span>
        <h2 className="text-[clamp(2rem,8vw,6rem)] font-black text-transparent leading-[0.9] tracking-tighter"
          style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.8)' }}>
          WHY
        </h2>
        <h2 className="text-[clamp(2rem,8vw,6rem)] font-black bg-gradient-to-r from-primary via-orange-400 to-rose-500 bg-clip-text text-transparent leading-[0.9] tracking-tighter">
          KOREA?
        </h2>
      </motion.div>

      {/* Main Message */}
      <motion.div 
        className="text-center px-6 max-w-4xl mx-auto mb-16"
        style={{ y: textY }}
      >
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-white/70 text-lg md:text-2xl leading-relaxed font-light"
        >
          Global projects succeed in the West,{' '}
          <span className="text-white font-semibold">but they explode in Korea.</span>
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-white/50 text-base md:text-lg mt-4"
        >
          The passion here is unmatched. Can you afford to miss it?
        </motion.p>
      </motion.div>

      {/* Market Stats - Big Numbers */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4 }}
        className="grid md:grid-cols-3 gap-8 md:gap-16 px-6 max-w-5xl mx-auto mb-16"
      >
        {marketStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
            className="text-center group"
          >
            <span className="text-[clamp(3rem,10vw,6rem)] font-black bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent leading-none block">
              {stat.value}
            </span>
            <span className="text-primary font-bold text-sm md:text-base tracking-wider block mt-2">
              {stat.label}
            </span>
            <span className="text-white/30 text-xs tracking-widest block mt-1">
              {stat.sublabel}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Kimchi Premium Insight */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8 }}
        className="relative max-w-3xl mx-auto px-6"
      >
        <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-l-2 border-primary/50 pl-6 py-4">
          <p className="text-white/60 text-sm md:text-base italic">
            "The <span className="text-primary font-semibold">Kimchi Premium</span> isn't just a price gap—it's proof of 
            <span className="text-white font-medium"> overwhelming buying power</span>. 
            When Korea buys, the world watches."
          </p>
        </div>
      </motion.div>
    </section>
  );
};

// ============================================
// SECTION 3: THE BARRIERS - High Rewards Come with High Barriers
// ============================================
const BarriersSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  const barriers = [
    { 
      icon: Lock, 
      title: "LANGUAGE", 
      stat: "99%",
      statLabel: "Search in Korean",
      desc: "Naver & Kakao dominate. Google is irrelevant here."
    },
    { 
      icon: Skull, 
      title: "REGULATORY", 
      stat: "VASP",
      statLabel: "Strictest Rules",
      desc: "Travel rule compliance is not optional—it's survival."
    },
    { 
      icon: Zap, 
      title: "OPERATIONS", 
      stat: "24/7",
      statLabel: "Always-On",
      desc: "Dead communities kill projects. Korea never sleeps."
    },
  ];

  return (
    <section ref={ref} className="relative min-h-[70vh] bg-black flex flex-col items-center justify-center overflow-hidden py-20">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center px-4 mb-12"
      >
        <span className="text-red-500/60 text-[10px] md:text-xs tracking-[0.5em] font-medium block mb-4">
          THE REALITY
        </span>
        <h2 className="text-[clamp(1.5rem,6vw,4rem)] font-black text-white leading-tight tracking-tighter">
          HIGH REWARDS COME WITH
        </h2>
        <h2 className="text-[clamp(1.5rem,6vw,4rem)] font-black text-transparent leading-tight tracking-tighter"
          style={{ WebkitTextStroke: '1.5px rgba(239,68,68,0.8)' }}>
          HIGH BARRIERS
        </h2>
      </motion.div>

      {/* Barriers Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-3 gap-6 md:gap-8 px-6 max-w-5xl mx-auto"
      >
        {barriers.map((barrier, i) => (
          <motion.div
            key={barrier.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 + i * 0.15 }}
            className="relative bg-white/[0.02] border border-white/10 p-8 text-center group hover:border-red-500/30 transition-colors"
          >
            {/* Icon */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-white/10 flex items-center justify-center group-hover:border-red-500/30 transition-colors">
              <barrier.icon className="w-7 h-7 text-white/40 group-hover:text-red-400/60 transition-colors" strokeWidth={1.5} />
            </div>
            
            {/* Stat */}
            <span className="text-3xl md:text-4xl font-black text-white block mb-1">
              {barrier.stat}
            </span>
            <span className="text-white/40 text-xs tracking-widest block mb-4">
              {barrier.statLabel}
            </span>
            
            {/* Title & Desc */}
            <h3 className="text-white/90 font-black text-lg tracking-wider mb-3">
              THE {barrier.title}
            </h3>
            <p className="text-white/40 text-sm leading-relaxed">
              {barrier.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

// ============================================
// SECTION 4: SOLUTION - WE TAME THE BEAST
// ============================================
const SolutionSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const circleY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const circleScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const services = "VASP COMPLIANCE · COMMUNITY BUILDING · KOL NETWORK · PR COVERAGE · EVENT MARKETING · LOCAL PARTNERSHIPS · ";

  return (
    <section ref={ref} className="relative bg-white flex flex-col items-center justify-center overflow-hidden">
      {/* Main Content */}
      <div className="min-h-[80vh] flex flex-col items-center justify-center py-20">
        {/* Section Label */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-primary/60 text-[10px] md:text-xs tracking-[0.5em] font-medium block mb-8"
        >
          OUR SOLUTION
        </motion.span>

        {/* Main Message */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center px-4 max-w-5xl mx-auto"
        >
          <h2 className="text-[clamp(2rem,8vw,6rem)] font-black text-black leading-[0.9] tracking-tighter">
            WE TURN
          </h2>
          <h2 className="text-[clamp(2rem,8vw,6rem)] font-black bg-gradient-to-r from-primary via-orange-500 to-rose-500 bg-clip-text text-transparent leading-[0.9] tracking-tighter">
            BARRIERS
          </h2>
          <h2 className="text-[clamp(2rem,8vw,6rem)] font-black text-black leading-[0.9] tracking-tighter">
            INTO YOUR
          </h2>
          <h2 className="text-[clamp(2rem,8vw,6rem)] font-black text-transparent leading-[0.9] tracking-tighter"
            style={{ WebkitTextStroke: '2px rgba(0,0,0,0.8)' }}>
            MOAT
          </h2>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="text-black/50 text-base md:text-lg tracking-wide mt-8 max-w-2xl text-center px-6"
        >
          이음(Ium)은 "잇다"에서 유래—글로벌 Web3와 한국을 연결하는 <span className="text-black font-semibold">전문 브릿지</span>입니다.
        </motion.p>

        {/* Image Circles */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-4 md:gap-8 mt-12"
        >
          <motion.div 
            style={{ y: circleY, scale: circleScale }}
            className="relative w-24 h-24 md:w-40 md:h-40 rounded-full overflow-hidden"
          >
            <img 
              src={storyOriginSummit}
              alt="Korea Event"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent" />
          </motion.div>
          
          <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 30]), scale: circleScale }}
            className="relative w-28 h-28 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-primary"
          >
            <img 
              src={peaqSummit}
              alt="Korea Summit"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-transparent" />
          </motion.div>
          
          <motion.div 
            style={{ y: circleY, scale: circleScale }}
            className="relative w-24 h-24 md:w-40 md:h-40 rounded-full overflow-hidden"
          >
            <img 
              src={bnbEvent}
              alt="BNB Event"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-transparent" />
          </motion.div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-12 md:gap-20 mt-16 px-6"
        >
          {[
            { value: "2025", suffix: "", sub: "Born in Speed Era" },
            { value: "30", suffix: "+", sub: "Projects Launched" },
            { value: "$50M", suffix: "+", sub: "Volume Generated" },
          ].map((stat, i) => (
            <motion.div
              key={stat.sub}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="text-center"
            >
              <span className="text-4xl md:text-6xl font-black text-black">
                {stat.value}
                <span className="text-primary">{stat.suffix}</span>
              </span>
              <p className="text-black/40 text-[10px] md:text-xs tracking-[0.2em] mt-2 uppercase">
                ({stat.sub})
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Integrated Service Marquee at bottom */}
      <div className="w-full bg-black py-6 md:py-8 overflow-hidden border-y border-white/5">
        <div className="flex whitespace-nowrap animate-scroll-left-fast mb-1">
          {[...Array(4)].map((_, i) => (
            <span 
              key={`row1-${i}`}
              className="text-[clamp(1.2rem,3vw,2.5rem)] font-black text-transparent tracking-tight mx-2"
              style={{ WebkitTextStroke: '1px rgba(255,107,0,0.5)' }}
            >
              {services}
            </span>
          ))}
        </div>
        <div className="flex whitespace-nowrap animate-scroll-right-fast">
          {[...Array(4)].map((_, i) => (
            <span 
              key={`row2-${i}`}
              className="text-[clamp(1.2rem,3vw,2.5rem)] font-black text-transparent tracking-tight mx-2"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.25)' }}
            >
              {services}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 4: PROOF - INTEGRATED EVIDENCE SECTION
// ============================================
const ProofSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const galleryImages = [
    storyOriginSummit, peaqSummit, bnbEvent, mantraParty,
    kucoinCampaign, openledgerEvent, seoulMetroBillboard, bybitEvent,
  ];

  const galleryImagesReversed = [...galleryImages].reverse();

  const achievements = [
    { year: "2024", logo: storyLogo, title: "Story Protocol", desc: "Korea Launch GTM", result: "+340% Volume" },
    { year: "2024", logo: mantraLogo, title: "MANTRA", desc: "Community Growth Campaign", result: "+500% Growth" },
    { year: "2024", logo: peaqLogo, title: "peaq Network", desc: "Korea Market Expansion", result: "#1 DePIN Korea" },
    { year: "2024", logo: bnbLogo, title: "BNB Chain", desc: "Korea Ecosystem", result: "2.5M+ Reach" },
    { year: "2024", logo: bybitLogo, title: "Bybit", desc: "Korea Market Penetration", result: "#2 CEX Korea" },
    { year: "2024", logo: saharaLogo, title: "Sahara AI", desc: "Community Launch", result: "200K+ Members" },
    { year: "2024", logo: kucoinLogo, title: "KuCoin", desc: "Korea GTM Strategy", result: "Top 5 Volume" },
    { year: "2024", logo: polygonLogo, title: "Polygon", desc: "Korea Developer Ecosystem", result: "50+ Builders" },
  ];

  const metrics = [
    { value: 340, suffix: "%", label: "VOLUME UPLIFT" },
    { value: 2.5, suffix: "M+", label: "ORGANIC REACH" },
    { value: 84, suffix: "%", label: "RETENTION RATE" },
    { value: 30, suffix: "+", label: "PROJECTS LAUNCHED" },
  ];

  return (
    <section ref={ref} className="relative bg-black overflow-hidden">
      {/* 1. Rolling Gallery with Overlay */}
      <div className="relative py-8">
        <div className="flex animate-scroll-left mb-2">
          {[...galleryImages, ...galleryImages].map((img, i) => (
            <div 
              key={`row1-${i}`}
              className="flex-shrink-0 w-[280px] md:w-[380px] h-[180px] md:h-[260px] mx-1 overflow-hidden"
            >
              <img 
                src={img} 
                alt="" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          ))}
        </div>
        
        <div className="flex animate-scroll-right">
          {[...galleryImagesReversed, ...galleryImagesReversed].map((img, i) => (
            <div 
              key={`row2-${i}`}
              className="flex-shrink-0 w-[280px] md:w-[380px] h-[180px] md:h-[260px] mx-1 overflow-hidden"
            >
              <img 
                src={img} 
                alt="" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          ))}
        </div>

        {/* Center Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black/80 backdrop-blur-sm px-6 md:px-8 py-3 md:py-4">
            <span className="text-white/60 text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em]">
              WE KEEP DIVING TOWARDS POSSIBILITIES
            </span>
          </div>
        </div>
      </div>

      {/* 2. Big Numbers */}
      <div className="py-16">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-white/20 text-[10px] tracking-[0.5em] mb-8 block text-center"
        >
          NUMBERS DON'T LIE
        </motion.span>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 px-6 max-w-5xl mx-auto">
          {metrics.map((metric, i) => (
            <MetricItem 
              key={metric.label}
              {...metric}
              isInView={isInView}
              delay={i * 0.15}
            />
          ))}
        </div>
      </div>

      {/* 3. Achievement List */}
      <div className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8 px-4"
        >
          <span className="text-white/20 text-[10px] tracking-[0.5em] block mb-4">TRACK RECORD</span>
          <h2 className="text-[clamp(2rem,6vw,4rem)] font-black text-white leading-none tracking-tighter">
            ACHIEVEMENTS
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto px-4 md:px-6">
          {achievements.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="group border-t border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center py-5 md:py-6 px-2 md:px-4">
                <span className="text-white/20 text-xs md:text-sm font-mono w-12 md:w-16 flex-shrink-0 hidden md:block">
                  {item.year}
                </span>
                
                <div className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0 flex items-center justify-center mr-3 md:mr-6">
                  <img 
                    src={item.logo} 
                    alt={item.title}
                    className="max-w-full max-h-full object-contain brightness-0 invert opacity-40 group-hover:opacity-80 transition-opacity"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <span className="text-white/90 font-bold text-sm md:text-base tracking-wide block truncate">
                    {item.title}
                  </span>
                  <span className="text-white/40 text-xs md:text-sm hidden md:block">
                    {item.desc}
                  </span>
                </div>
                
                <span className="text-emerald-400/80 font-bold text-sm md:text-base tracking-wide ml-4 flex-shrink-0 group-hover:text-emerald-400 transition-colors">
                  {item.result}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. Testimonial */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8 }}
        className="max-w-2xl mx-auto py-16 px-6 text-center"
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
// SECTION 5: STRATEGY - PROCESS
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
    <section ref={ref} className="relative py-16 bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Giant Title */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 px-4"
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
// SECTION 6: SELECTED WORK - PORTFOLIO
// ============================================
const SelectedWorkSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const projects = [
    { 
      name: "Story Protocol", 
      logo: storyLogo, 
      bg: storyBg, 
      video: "/videos/projects/story-hero.mp4",
      gallery: [storyOriginSummit, storyWorkshop],
      result: "+340%",
      resultSub: "Trading Volume",
      category: "IP Protocol",
      slug: "story-protocol" 
    },
    { 
      name: "MANTRA", 
      logo: mantraLogo, 
      bg: mantraBg, 
      video: "/videos/projects/mantra-hero.mp4",
      gallery: [mantraParty, mantraEvent],
      result: "+500%",
      resultSub: "Community Growth",
      category: "RWA L1",
      slug: "mantra" 
    },
    { 
      name: "Bybit", 
      logo: bybitLogo, 
      bg: bybitBg, 
      video: "/videos/projects/bybit-hero.mp4",
      gallery: [bybitEvent],
      result: "#2",
      resultSub: "Korea Exchange",
      category: "CEX",
      slug: "bybit" 
    },
    { 
      name: "peaq", 
      logo: peaqLogo, 
      bg: peaqBg, 
      video: "/videos/projects/peaq-hero.mp4",
      gallery: [peaqSummit],
      result: "#1",
      resultSub: "DePIN in Korea",
      category: "DePIN L1",
      slug: "peaq" 
    },
    { 
      name: "BNB Chain", 
      logo: bnbLogo, 
      bg: bnbBg, 
      video: "/videos/projects/bnb-hero.mp4",
      gallery: [bnbEvent],
      result: "2.5M+",
      resultSub: "Organic Reach",
      category: "L1 Ecosystem",
      slug: "bnb-chain" 
    },
    { 
      name: "Sahara AI", 
      logo: saharaLogo, 
      bg: saharaBg, 
      video: "/videos/projects/sahara-hero.mp4",
      gallery: [saharaAiCampaign],
      result: "200K+",
      resultSub: "Community Members",
      category: "AI Infrastructure",
      slug: "sahara-ai" 
    },
    { 
      name: "KuCoin", 
      logo: kucoinLogo, 
      bg: kucoinBg, 
      video: "/videos/projects/kucoin-hero.mp4",
      gallery: [kucoinCampaign, kucoinNew],
      result: "Top 5",
      resultSub: "Korea Volume",
      category: "CEX",
      slug: "kucoin" 
    },
    { 
      name: "OpenLedger", 
      logo: null, 
      bg: openledgerBg, 
      video: null,
      gallery: [openledgerEvent, openledgerInterview],
      result: "50K+",
      resultSub: "Community Growth",
      category: "AI Data",
      slug: "openledger" 
    },
  ];

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setActiveVideo(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setActiveVideo(null);
  };

  return (
    <section ref={ref} className="relative bg-black py-16 overflow-hidden">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="text-center mb-10 px-4"
      >
        <span className="text-white/20 text-[10px] tracking-[0.5em] block mb-4">PORTFOLIO</span>
        <h2 className="text-[clamp(2rem,6vw,4rem)] font-black text-transparent leading-none tracking-tighter"
          style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.6)' }}>
          SELECTED W<span className="text-primary">⬡</span>RK
        </h2>
      </motion.div>

      {/* Desktop: Expandable Panels */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
        className="hidden md:flex h-[70vh] w-full px-4"
      >
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            className="relative overflow-hidden cursor-pointer group"
            animate={{
              flex: hoveredIndex === null ? 1 : hoveredIndex === i ? 5 : 0.5,
            }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={project.bg}
              alt={project.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
            />

            {project.video && (
              <video
                src={project.video}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  activeVideo === i ? 'opacity-100' : 'opacity-0'
                }`}
                autoPlay
                muted
                loop
                playsInline
              />
            )}

            <div className={`absolute inset-0 transition-all duration-500 ${
              hoveredIndex === i 
                ? 'bg-gradient-to-t from-black via-black/40 to-transparent' 
                : 'bg-black/70'
            }`} />

            <AnimatePresence>
              {hoveredIndex !== i && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="text-white/80 font-bold text-sm tracking-[0.3em] whitespace-nowrap rotate-90 origin-center">
                    {project.name.toUpperCase()}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {hoveredIndex === i && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="absolute inset-0 flex"
                >
                  <div className="flex-1 flex flex-col justify-end p-8">
                    <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase mb-3">
                      {project.category}
                    </span>

                    <div className="mb-4">
                      {project.logo ? (
                        <img
                          src={project.logo}
                          alt={project.name}
                          className="h-10 w-auto object-contain brightness-0 invert"
                        />
                      ) : (
                        <span className="text-white font-black text-2xl tracking-tight">
                          {project.name}
                        </span>
                      )}
                    </div>

                    <div className="mb-6">
                      <span className="text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                        {project.result}
                      </span>
                      <span className="block text-white/50 text-xs tracking-wider mt-1">
                        {project.resultSub}
                      </span>
                    </div>

                    <Link
                      to={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 text-white/80 hover:text-white text-xs tracking-widest transition-colors group/link"
                    >
                      <span>VIEW PROJECT</span>
                      <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>

                  {project.gallery && project.gallery.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25, duration: 0.3 }}
                      className="hidden lg:flex flex-col gap-2 p-4 w-48"
                    >
                      {project.gallery.slice(0, 2).map((img, idx) => (
                        <div 
                          key={idx}
                          className="relative aspect-[4/3] overflow-hidden rounded-sm group/img"
                        >
                          <img 
                            src={img} 
                            alt={`${project.name} gallery ${idx + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/0 transition-colors" />
                        </div>
                      ))}
                      {project.gallery.length > 2 && (
                        <span className="text-white/30 text-[10px] tracking-wider text-center">
                          +{project.gallery.length - 2} MORE
                        </span>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute inset-0 border-r border-white/5 pointer-events-none" />
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile: Grid Layout */}
      <div className="md:hidden grid grid-cols-2 gap-1 px-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 + i * 0.05 }}
          >
            <Link
              to={`/projects/${project.slug}`}
              className="relative aspect-[4/5] overflow-hidden group block"
            >
              <img
                src={project.bg}
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <span className="text-white/40 text-[8px] tracking-[0.2em] uppercase mb-1">
                  {project.category}
                </span>
                {project.logo ? (
                  <img
                    src={project.logo}
                    alt={project.name}
                    className="h-5 w-auto object-contain brightness-0 invert mb-2"
                  />
                ) : (
                  <span className="text-white font-bold text-sm mb-2">
                    {project.name}
                  </span>
                )}
                <span className="text-lg font-black text-emerald-400">
                  {project.result}
                </span>
                <span className="text-white/40 text-[10px]">
                  {project.resultSub}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* View All Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6 }}
        className="text-center mt-12"
      >
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm tracking-widest transition-colors"
        >
          <span>VIEW ALL PROJECTS</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  );
};

// ============================================
// SECTION 7: FOOTER CTA
// ============================================
const FooterCTASection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section ref={ref} className="relative min-h-[50vh] bg-black flex flex-col items-center justify-center overflow-hidden py-16">
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

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4 }}
        className="mt-10"
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
// MAIN - 7 STEP STORY ARC
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
        {/* 1. HOOK - Korea, The Engine of Crypto */}
        <EnhancedHero />
        
        {/* 2. WHY KOREA - FOMO trigger */}
        <WhyKoreaSection />
        
        {/* 3. THE BARRIERS - High Barriers */}
        <BarriersSection />
        
        {/* 4. OUR SOLUTION - We Tame the Beast */}
        <SolutionSection />

        {/* 5. PROOF (gallery + numbers + achievements + testimonial) */}
        <ProofSection />
        
        {/* 6. PROCESS */}
        <StrategySection />

        {/* 7. PORTFOLIO */}
        <SelectedWorkSection />
        
        {/* 8. CTA */}
        <FooterCTASection />
      </main>
      <Footer />
    </>
  );
};

export default GTMService;
