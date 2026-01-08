import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';
import ServiceSchema from '@/components/ServiceSchema';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Database, Users, ChevronRight, MessageCircle, TrendingUp, Megaphone, Calendar, Search, Check, Zap, Shield, BarChart3, Target, AlertTriangle, Scale, Clock } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';

// Hero Component
import EnhancedHero from '@/components/gtm/EnhancedHero';
import MasonryGallery from '@/components/gtm/MasonryGallery';

// ============================================
// IMAGE IMPORTS
// ============================================
import storyBg from '@/assets/projects/story-bg.jpg';
import saharaAiBg from '@/assets/projects/sahara-ai-bg.jpg';
import peaqBg from '@/assets/projects/peaq-bg.jpg';
import mantraBg from '@/assets/projects/mantra-featured-bg.jpg';
import kucoinBg from '@/assets/projects/kucoin-bg.jpg';

import seoulMetroBillboard from '@/assets/campaigns/seoul-metro-billboard.jpeg';
import storyOriginSummit from '@/assets/campaigns/story-origin-summit.jpg';
import ondoSeminar from '@/assets/campaigns/ondo-seminar.jpg';
import mantraParty from '@/assets/campaigns/mantra-party.jpg';
import peaqSummit from '@/assets/campaigns/peaq-summit.jpg';
import bnbEvent from '@/assets/campaigns/bnb-event.jpg';
import openledgerEvent from '@/assets/campaigns/openledger-event.jpg';
import polygonConnect from '@/assets/campaigns/polygon-connect.png';

import discoveryResearch from '@/assets/process/discovery-research.jpg';
import strategyPlanning from '@/assets/process/strategy-planning.jpg';
import executionGrowth from '@/assets/process/execution-growth.jpg';
import scaleSuccess from '@/assets/process/scale-success.jpg';

import dashboardMockup from '@/assets/dashboard-mockup.png';
import officeImage from '@/assets/office/ium-labs-office.webp';

import bybitLogo from '@/assets/logos/bybit.png';
import mantraLogo from '@/assets/logos/mantra.png';
import peaqLogo from '@/assets/logos/peaq.svg';
import storyLogo from '@/assets/logos/story-protocol.png';
import kucoinLogo from '@/assets/logos/kucoin.svg';
import bnbLogo from '@/assets/logos/bnb.svg';
import saharaLogo from '@/assets/logos/sahara-ai.png';
import megaethLogo from '@/assets/logos/megaeth.png';
import polygonLogo from '@/assets/logos/polygon.svg';

// ============================================
// SECTION 2: THE REALITY CHECK (The Problem)
// ============================================
const RealityCheckSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const barriers = [
    {
      icon: MessageCircle,
      title: "The Language Barrier",
      stat: "99%",
      description: "Global content doesn't work here. Koreans rely on Naver, Kakao, and local communities. If you aren't searching in Korean, you don't exist.",
      image: storyOriginSummit
    },
    {
      icon: Scale,
      title: "The Regulatory Wall",
      stat: "VASP",
      description: "Korea has the world's strictest VASP rules. Compliance isn't optional; it's survival.",
      image: ondoSeminar
    },
    {
      icon: Clock,
      title: "The Operations Gap",
      stat: "24/7",
      description: '"Dead" communities kill projects. Korean users demand 24/7 real-time engagement and instant feedback.',
      image: mantraParty
    }
  ];

  const situations = [
    "We launched, but saw zero growth.",
    "We need a partner who actually knows the local culture.",
    "Our community is stagnant."
  ];

  return (
    <section ref={ref} id="problem" className="relative py-24 md:py-32 bg-black">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-6"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>The Reality Check</span>
          </motion.span>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
            Korea is a Goldmine,
            <br />
            <span className="text-white/40">But It's a Fortress.</span>
          </h2>
          
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto">
            Many try, but <span className="text-red-400 font-semibold">90% fail within 6 months</span>. The barriers are real.
          </p>
        </motion.div>

        {/* Barrier Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {barriers.map((barrier, i) => (
            <motion.div
              key={barrier.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 hover:border-red-500/30 transition-all duration-500"
            >
              <img
                src={barrier.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
              <div className="absolute inset-0 bg-red-950/0 group-hover:bg-red-950/20 transition-colors duration-500" />
              
              <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <barrier.icon className="w-6 h-6 text-red-400" />
                </div>
                
                <div>
                  <span className="text-[clamp(3rem,10vw,5rem)] font-black text-red-400 leading-none block mb-2">
                    {barrier.stat}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-3">{barrier.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    {barrier.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Your Situation Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="p-8 bg-white/[0.02] border border-white/10 rounded-2xl">
            <h4 className="text-white/40 text-sm tracking-wider uppercase mb-6 text-center">Is this your situation?</h4>
            <div className="space-y-4">
              {situations.map((situation, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-start gap-3 text-white/70"
                >
                  <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-red-400" />
                  </div>
                  <span className="text-base">"{situation}"</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 3: THE SOLUTION (Meet ium Labs)
// ============================================
const SolutionSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    {
      icon: Globe,
      title: "Local DNA, Global Standard",
      highlight: "Binance & KuCoin Alumni",
      description: "Led by Binance & KuCoin alumni. We built the ecosystem from the inside out."
    },
    {
      icon: BarChart3,
      title: "Data-First Approach",
      highlight: "Proprietary Analytics",
      description: "We hate guessing. We use proprietary analytics to track sentiment, competitors, and community health in real-time."
    },
    {
      icon: Shield,
      title: "Full-Stack Execution",
      highlight: "Total Accountability",
      description: 'From deep research to massive scale. One team, total accountability. No "agency ping-pong."'
    }
  ];

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-neutral-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/10 via-transparent to-transparent" />
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase mb-4 block">The Solution</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6">
            Meet <span className="bg-gradient-to-r from-primary via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">ium Labs</span>.
          </h2>
        </motion.div>

        {/* ium Meaning */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-center mb-20 py-12 border-y border-white/10"
        >
          <span className="text-[clamp(4rem,15vw,10rem)] font-black bg-gradient-to-r from-primary via-violet-400 to-fuchsia-400 bg-clip-text text-transparent leading-none">
            이음
          </span>
          <p className="text-white/40 text-lg mt-4 tracking-wider">"To Connect"</p>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mt-6 leading-relaxed">
            We don't just market; we function as your <span className="text-white font-semibold">foundational layer for success</span> in Korea.
          </p>
        </motion.div>

        {/* Value Props Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-primary/30 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 p-8">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-violet-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                
                <span className="text-xs text-primary font-semibold tracking-wider uppercase mb-2 block">
                  {item.highlight}
                </span>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 4: THE EVIDENCE (Numbers Don't Lie)
// ============================================
const EvidenceSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const metrics = [
    { value: 340, suffix: "%", label: "Avg. Trading Volume Increase" },
    { value: 2.5, suffix: "M+", label: "Organic Reach Generated" },
    { value: 84, suffix: "%", label: "Client Retention Rate" },
    { value: 30, suffix: "+", label: "Projects Successfully Launched" },
  ];

  const clientLogos = [
    { name: "Story Protocol", logo: storyLogo },
    { name: "MANTRA", logo: mantraLogo },
    { name: "peaq", logo: peaqLogo },
    { name: "Sahara AI", logo: saharaLogo },
    { name: "Bybit", logo: bybitLogo },
    { name: "KuCoin", logo: kucoinLogo },
    { name: "BNB Chain", logo: bnbLogo },
    { name: "MegaETH", logo: megaethLogo },
    { name: "Polygon", logo: polygonLogo },
  ];

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-black border-y border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase mb-4 block">The Evidence</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white">
            Numbers Don't Lie.
          </h2>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-20"
        >
          {metrics.map((metric, i) => (
            <StatItem 
              key={metric.label}
              value={metric.value} 
              suffix={metric.suffix} 
              label={metric.label} 
              isInView={isInView}
              delay={i * 0.1}
            />
          ))}
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <div className="p-8 md:p-10 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl">
            <img 
              src={peaqLogo} 
              alt="peaq Network"
              className="h-8 w-auto brightness-0 invert opacity-60 mb-6"
            />
            <blockquote className="text-lg md:text-xl text-white/90 leading-relaxed mb-6 italic">
              "Working with ium Labs gave us a significant first-mover advantage. Their deep understanding of the local crypto ecosystem is unmatched."
            </blockquote>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-white font-semibold">David Park</p>
                <p className="text-white/50 text-sm">CEO, peaq Network</p>
              </div>
              <div className="ml-auto flex items-center gap-2 text-green-400">
                <TrendingUp className="w-4 h-4" />
                <span className="font-semibold text-sm">First Mover in Korea</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Logo Marquee */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />
          
          <motion.div 
            className="flex gap-12 items-center"
            animate={{ x: [0, -1200] }}
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {[...clientLogos, ...clientLogos].map((client, i) => (
              <img
                key={`${client.name}-${i}`}
                src={client.logo}
                alt={client.name}
                className="h-8 w-auto object-contain opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 flex-shrink-0"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StatItem = ({ value, label, suffix = "", isInView, delay = 0 }: { 
  value: number; 
  label: string; 
  suffix?: string; 
  isInView: boolean;
  delay?: number;
}) => {
  const count = useCountUp({ end: value, isVisible: isInView, suffix });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay }}
      className="text-center"
    >
      <span className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-primary to-fuchsia-400 bg-clip-text text-transparent">
        {count}
      </span>
      <p className="text-white/40 text-xs md:text-sm mt-2 tracking-wide">{label}</p>
    </motion.div>
  );
};

// ============================================
// SECTION 5: THE STRATEGY (How We Execute)
// ============================================
const StrategySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      number: "01",
      week: "Week 1-2",
      title: "Discovery",
      image: discoveryResearch,
      deliverables: ["Market Research", "Competitor Analysis", "Regulation Check"],
      color: "from-blue-500 to-cyan-500",
      icon: Search
    },
    {
      number: "02",
      week: "Week 3-4",
      title: "Strategy",
      image: strategyPlanning,
      deliverables: ["GTM Roadmap", "Channel Strategy", "KPI Setting"],
      color: "from-violet-500 to-purple-500",
      icon: Target
    },
    {
      number: "03",
      week: "Week 5-8",
      title: "Launch",
      image: executionGrowth,
      deliverables: ["PR Campaign", "KOL Activation", '"Deposit" Event Launch'],
      color: "from-fuchsia-500 to-pink-500",
      icon: Zap
    },
    {
      number: "04",
      week: "Ongoing",
      title: "Scale",
      image: scaleSuccess,
      deliverables: ["Optimization", "Volume Tracking", "Retention Strategies"],
      color: "from-green-500 to-emerald-500",
      icon: TrendingUp
    }
  ];

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-neutral-950">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase mb-4 block">The Process</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            How We Execute.
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            A battle-tested 4-step framework.
          </p>
        </motion.div>

        {/* Process Timeline */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-primary/30 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
                
                {/* Step Number */}
                <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                
                {/* Week Badge */}
                <div className="absolute top-4 right-4">
                  <span className="text-xs font-mono text-white/60 bg-black/50 px-2 py-1 rounded">
                    {step.week}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-3xl font-black bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                    {step.number}
                  </span>
                  <h3 className="text-xl font-bold text-white">{step.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {step.deliverables.map((item, j) => (
                    <span
                      key={j}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/70"
                    >
                      <ChevronRight className="w-3 h-3 text-primary" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 6: PORTFOLIO & SERVICES
// ============================================
const PortfolioSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    { icon: Users, title: "Community", description: "24/7 Moderation" },
    { icon: Megaphone, title: "PR & Media", description: "Tier-1 Coverage" },
    { icon: TrendingUp, title: "KOL & Influencer", description: "Performance-based" },
    { icon: Calendar, title: "Offline Events", description: "Summits & Private Dinners" },
  ];

  const galleryImages = [
    { src: seoulMetroBillboard, title: "Seoul Metro Billboards", category: "Outdoor" },
    { src: storyOriginSummit, title: "Story Origin Summit", category: "Events" },
    { src: peaqSummit, title: "peaq Launch", category: "Events" },
    { src: polygonConnect, title: "Polygon Connect", category: "Events" },
    { src: bnbEvent, title: "BNB Chain Event", category: "Events" },
    { src: openledgerEvent, title: "VIP Dinner", category: "Events" },
  ];

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-black">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase mb-4 block">Capabilities</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            Real Impact. Real Visibility.
          </h2>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="group p-6 bg-white/[0.02] border border-white/10 rounded-xl hover:border-primary/30 transition-all duration-300 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-white font-semibold mb-1">{service.title}</h4>
              <p className="text-white/40 text-sm">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Campaign Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <motion.div
                key={img.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="relative aspect-[4/3] overflow-hidden rounded-xl group"
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                  <span className="text-xs text-primary font-medium uppercase tracking-wider mb-1">{img.category}</span>
                  <span className="text-white text-sm font-medium text-center px-4">{img.title}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 7: FOOTER CTA
// ============================================
const FooterCTASection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 md:py-40 bg-gradient-to-b from-neutral-950 to-black overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Don't Leave Your Korea Strategy to Chance.
          </h2>
          
          <p className="text-white/50 text-lg md:text-xl mb-10">
            Let's build your bridge to the Korean market.
          </p>
          
          <Link
            to="/contact"
            className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary hover:bg-primary/90 text-white transition-all duration-300 text-lg font-bold rounded-lg hover:shadow-[0_0_40px_rgba(139,92,246,0.4)]"
          >
            <span>Schedule Your 30-Min Strategy Session</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
          
          <p className="text-white/30 text-sm mt-6">
            No commitment. Just clarity.
          </p>
        </motion.div>
      </div>
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
      <main>
        {/* Section 1: Hero (The Hook) */}
        <EnhancedHero />
        
        {/* Section 2: The Reality Check (Problem) */}
        <RealityCheckSection />
        
        {/* Section 3: The Solution (Meet ium Labs) */}
        <SolutionSection />
        
        {/* Section 4: The Evidence (Numbers Don't Lie) */}
        <EvidenceSection />
        
        {/* Section 5: The Strategy (How We Execute) */}
        <StrategySection />
        
        {/* Section 6: Portfolio & Services */}
        <PortfolioSection />
        
        {/* Gallery with Filters */}
        <MasonryGallery />
        
        {/* Section 7: Footer CTA */}
        <FooterCTASection />
      </main>
      <Footer />
    </>
  );
};

export default GTMService;
