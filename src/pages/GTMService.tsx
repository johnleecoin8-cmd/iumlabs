import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';
import ServiceSchema from '@/components/ServiceSchema';
import { Link } from 'react-router-dom';
import { CalendarDays, ArrowRight, Mail, Globe, Database, Users } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';

// ============================================
// IMAGE IMPORTS
// ============================================
import storyBg from '@/assets/projects/story-bg.jpg';
import saharaAiBg from '@/assets/projects/sahara-ai-bg.jpg';
import peaqBg from '@/assets/projects/peaq-bg.jpg';
import mantraBg from '@/assets/projects/mantra-featured-bg.jpg';
import openledgerHero from '@/assets/campaigns/openledger-hero-official.png';
import kucoinBg from '@/assets/projects/kucoin-bg.jpg';

// Logo imports for TheTrust
import bybitLogo from '@/assets/logos/bybit.png';
import mantraLogo from '@/assets/logos/mantra.png';
import peaqLogo from '@/assets/logos/peaq.svg';
import storyLogo from '@/assets/logos/story-protocol.png';
import kucoinLogo from '@/assets/logos/kucoin.svg';
import bnbLogo from '@/assets/logos/bnb.svg';
import coindeskLogo from '@/assets/logos/coindesk.png';
import cointelegraphLogo from '@/assets/logos/cointelegraph.png';
import blockmediaLogo from '@/assets/logos/blockmedia-new.png';

// ============================================
// SECTION 1: HERO - 더 구체적인 Hook
// ============================================
const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <section ref={sectionRef} className="relative h-[100vh] overflow-hidden bg-black">
      {/* Video Background */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-50"
        >
          <source src="/videos/gtm-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black" />
      </motion.div>

      {/* Center Content */}
      <motion.div 
        className="relative z-10 h-full flex flex-col items-center justify-center px-6"
        style={{ opacity, y: textY }}
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-[10px] tracking-[0.4em] text-white/50 uppercase mb-6"
        >
          Korea GTM Strategy
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center max-w-5xl"
        >
          <span className="block text-[clamp(1.8rem,5vw,4rem)] font-medium text-white/60 leading-tight mb-2">
            We've helped
          </span>
          <span className="block text-[clamp(2.5rem,8vw,6rem)] font-black text-white leading-[0.95] tracking-tight">
            30+ global Web3 projects
          </span>
          <span className="block text-[clamp(1.5rem,4vw,3rem)] font-medium text-white/60 leading-tight mt-4">
            crack Korea's <span className="text-violet-400 font-bold">$50B</span> crypto market.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-white text-lg md:text-xl font-medium mt-10"
        >
          Your turn.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-12"
        >
          <a 
            href="#problem"
            className="group inline-flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors"
          >
            <span>See how we do it</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight className="w-4 h-4 rotate-90" />
            </motion.div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

// ============================================
// SECTION 2: PROBLEM NARRATIVE - 스크롤 기반 텍스트
// ============================================
const ProblemNarrative = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const problems = [
    {
      statement: "Every global project thinks they can just translate.",
      reality: "99% of Koreans search in Korean only.",
      emphasis: "99%"
    },
    {
      statement: "Every team underestimates the regulations.",
      reality: "Korea's VASP compliance shuts doors overnight.",
      emphasis: "VASP"
    },
    {
      statement: "Every community manager misses the culture.",
      reality: "Korean users expect 24/7 real engagement.",
      emphasis: "24/7"
    }
  ];

  return (
    <div ref={containerRef} id="problem" className="bg-black">
      {/* Problem Slides */}
      {problems.map((problem, i) => (
        <ProblemSlide key={i} problem={problem} index={i} total={problems.length} />
      ))}
      
      {/* Result Statistic */}
      <ResultStat />
    </div>
  );
};

const ProblemSlide = ({ problem, index, total }: { problem: any; index: number; total: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-40% 0px -40% 0px" });

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.2, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl md:text-2xl lg:text-3xl text-white/60 leading-relaxed mb-8"
        >
          {problem.statement}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0.3, scale: 0.95 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-[clamp(4rem,15vw,12rem)] font-black text-violet-400 leading-none">
            {problem.emphasis}
          </span>
          <p className="text-white/40 text-sm md:text-base mt-4 max-w-md mx-auto">
            {problem.reality}
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mt-16">
          {Array.from({ length: total }).map((_, i) => (
            <div 
              key={i} 
              className={`w-8 h-0.5 transition-colors duration-300 ${
                i === index ? 'bg-violet-400' : 'bg-white/20'
              }`} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ResultStat = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30%" });

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6 bg-black">
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-white/40 text-sm md:text-base tracking-widest uppercase mb-6"
        >
          Result?
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="text-[clamp(5rem,20vw,15rem)] font-black text-white leading-none">
            90%
          </span>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-white/50 text-lg md:text-xl mt-6"
        >
          of Web3 projects <span className="text-red-400">fail</span> in Korea within 6 months.
        </motion.p>
      </div>
    </section>
  );
};

// ============================================
// SECTION 3: TRANSITION - "But not ours"
// ============================================
const Transition = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30%" });

  return (
    <section ref={ref} className="h-screen flex items-center justify-center bg-black px-6">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-[clamp(2rem,8vw,6rem)] font-black text-white text-center leading-tight"
      >
        But not the ones
        <br />
        <span className="text-violet-400">we work with.</span>
      </motion.h2>
    </section>
  );
};

// ============================================
// SECTION 4: RESULTS - 증명 섹션
// ============================================
const StatItem = ({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useCountUp({ end: value, isVisible: isInView, suffix });

  return (
    <div ref={ref} className="text-center">
      <span className="text-5xl md:text-7xl font-black text-white">
        {count}{suffix}
      </span>
      <p className="text-white/40 text-sm mt-2">{label}</p>
    </div>
  );
};

const Results = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = [
    { name: "Story Protocol", category: "IP Platform", result: "Korea #1 Community", media: storyBg, slug: "story-protocol" },
    { name: "MANTRA", category: "L1 Infrastructure", result: "500% Volume Growth", media: mantraBg, slug: "mantra" },
    { name: "peaq", category: "DePIN Entry", result: "First Mover Advantage", media: peaqBg, slug: "peaq" },
    { name: "Sahara AI", category: "AI × Blockchain", result: "Community Built", media: saharaAiBg, slug: "sahara-ai" },
    { name: "OpenLedger", category: "Data Infrastructure", result: "Market Entry", media: openledgerHero, slug: "openledger" },
    { name: "KuCoin", category: "Exchange Campaign", result: "Top Engagement", media: kucoinBg, slug: "kucoin" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [projects.length]);

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-black overflow-hidden">
      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <img
            src={projects[activeIndex].media}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase">Track Record</span>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mt-4">
            The proof is in the numbers.
          </h3>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-8 mb-20 max-w-3xl mx-auto"
        >
          <StatItem value={340} suffix="%" label="Avg. Volume Increase" />
          <StatItem value={2.5} suffix="M" label="Organic Reach" />
          <StatItem value={30} suffix="+" label="Projects Launched" />
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <Link
                to={`/projects/${project.slug}`}
                className={`group relative block aspect-[4/5] overflow-hidden transition-all duration-500 ${
                  activeIndex === i ? 'ring-2 ring-violet-500' : ''
                }`}
                onMouseEnter={() => setActiveIndex(i)}
              >
                <img
                  src={project.media}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
                
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                  <h4 className="text-white font-bold text-sm md:text-base">{project.name}</h4>
                  <p className="text-violet-400 text-xs mt-1">{project.result}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link 
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            <span>View All Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 5: WHY US - 차별화
// ============================================
const WhyUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const differentiators = [
    {
      icon: Globe,
      title: "Local DNA, Global Network",
      description: "Founded by former Binance & KuCoin executives. We don't just understand Korea—we built its crypto ecosystem.",
      highlight: "Binance & KuCoin Alumni"
    },
    {
      icon: Database,
      title: "Data-First Approach",
      description: "Proprietary analytics dashboard tracking real-time market sentiment, competitor moves, and community health.",
      highlight: "Proprietary Analytics"
    },
    {
      icon: Users,
      title: "End-to-End Execution",
      description: "From research to launch to scale. One team. Complete accountability. No finger-pointing between agencies.",
      highlight: "Full-Stack Team"
    }
  ];

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <span className="text-[10px] text-black/40 tracking-[0.4em] uppercase">Why Ium Labs</span>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-black mt-4">
            What makes us different.
          </h3>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {differentiators.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="group relative p-8 md:p-10 bg-neutral-50 hover:bg-black transition-colors duration-500"
            >
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center bg-violet-100 group-hover:bg-violet-600 transition-colors mb-6">
                <item.icon className="w-6 h-6 text-violet-600 group-hover:text-white transition-colors" />
              </div>

              {/* Content */}
              <h4 className="text-xl md:text-2xl font-bold text-black group-hover:text-white transition-colors mb-4">
                {item.title}
              </h4>
              <p className="text-neutral-600 group-hover:text-white/70 transition-colors text-sm leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Highlight */}
              <span className="inline-block text-xs font-medium text-violet-600 group-hover:text-violet-400 transition-colors px-3 py-1 bg-violet-100 group-hover:bg-violet-900/50">
                {item.highlight}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 6: PROCESS - 타임라인
// ============================================
const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      week: "Week 1-2",
      title: "Discovery",
      tasks: ["Market research", "Competitor analysis", "Audience mapping", "Regulatory review"]
    },
    {
      week: "Week 3-4",
      title: "Strategy",
      tasks: ["GTM roadmap", "Channel selection", "Budget allocation", "KPI definition"]
    },
    {
      week: "Week 5-8",
      title: "Launch",
      tasks: ["PR campaigns", "Community building", "KOL activation", "Event execution"]
    },
    {
      week: "Ongoing",
      title: "Scale",
      tasks: ["Performance tracking", "Optimization", "Expansion planning", "Reporting"]
    }
  ];

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-black">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase">Our Process</span>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mt-4">
            How we get you there.
          </h3>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Line */}
          <div className="absolute top-8 left-0 right-0 h-px bg-white/10 hidden md:block" />

          {/* Steps */}
          <div className="grid md:grid-cols-4 gap-8 md:gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.week}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15 }}
                className="relative"
              >
                {/* Dot */}
                <div className="hidden md:block absolute top-6 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 bg-violet-500 rounded-full" />
                </div>

                {/* Card */}
                <div className="md:pt-16 p-6 border border-white/10 hover:border-violet-500/50 transition-colors">
                  <span className="text-violet-400 text-xs font-medium tracking-wider uppercase">
                    {step.week}
                  </span>
                  <h4 className="text-2xl font-bold text-white mt-2 mb-4">
                    {step.title}
                  </h4>
                  <ul className="space-y-2">
                    {step.tasks.map((task, j) => (
                      <li key={j} className="text-white/50 text-sm flex items-center gap-2">
                        <span className="w-1 h-1 bg-white/30 rounded-full" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 7: TRUST - 로고 + 테스티모니얼
// ============================================
const Trust = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const clientLogos = [
    { name: "Bybit", logo: bybitLogo },
    { name: "MANTRA", logo: mantraLogo },
    { name: "peaq", logo: peaqLogo },
    { name: "Story Protocol", logo: storyLogo },
    { name: "KuCoin", logo: kucoinLogo },
    { name: "BNB Chain", logo: bnbLogo },
  ];

  const mediaLogos = [
    { name: "CoinDesk", logo: coindeskLogo },
    { name: "CoinTelegraph", logo: cointelegraphLogo },
    { name: "BlockMedia", logo: blockmediaLogo },
  ];

  const testimonial = {
    quote: "ium Labs understood the Korean market better than any agency we worked with. Their data-driven approach and local expertise made all the difference.",
    author: "Global Marketing Lead",
    company: "Top 10 L1 Project"
  };

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-neutral-950 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase">Trusted By</span>
          <h3 className="text-3xl md:text-5xl font-black text-white mt-4">Global leaders choose us</h3>
        </motion.div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 md:grid-cols-6 gap-8 md:gap-12 items-center justify-items-center mb-16"
        >
          {clientLogos.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="group"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="h-8 md:h-10 w-auto object-contain opacity-40 group-hover:opacity-100 transition-all duration-300 grayscale group-hover:grayscale-0"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="max-w-3xl mx-auto text-center py-12 border-t border-b border-white/10 mb-16"
        >
          <p className="text-xl md:text-2xl text-white/80 italic leading-relaxed mb-6">
            "{testimonial.quote}"
          </p>
          <div>
            <span className="text-white font-medium">{testimonial.author}</span>
            <span className="text-white/40 mx-2">·</span>
            <span className="text-violet-400">{testimonial.company}</span>
          </div>
        </motion.div>

        {/* Media Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <span className="text-white/30 text-sm">Featured in</span>
          
          <div className="mt-8 flex items-center justify-center gap-12 md:gap-16">
            {mediaLogos.map((media) => (
              <img
                key={media.name}
                src={media.logo}
                alt={media.name}
                className="h-6 md:h-8 w-auto object-contain opacity-30 hover:opacity-60 transition-opacity grayscale"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 8: CTA - 풀스크린 CTA
// ============================================
const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section 
      ref={ref} 
      className={`relative min-h-screen flex items-center transition-colors duration-700 overflow-hidden ${
        isHovered ? 'bg-violet-600' : 'bg-black'
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            isHovered ? 'opacity-20' : 'opacity-30'
          }`}
        >
          <source src="/videos/gtm-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 w-full">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main CTA Text */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-[clamp(2.5rem,8vw,5rem)] font-black text-white leading-tight"
          >
            Ready to crack <span className="text-violet-400">Korea?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-white/60 text-lg md:text-xl mt-6 mb-12"
          >
            가장 확실한 파트너와 시작하세요.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black hover:bg-violet-500 hover:text-white transition-all duration-500 text-lg font-bold"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span>Book a Strategy Call</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>

          {/* Contact Options */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-wrap justify-center gap-8"
          >
            <a
              href="mailto:gm@iumlabs.io"
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm">gm@iumlabs.io</span>
            </a>
            <a
              href="https://calendly.com/iumlabs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
            >
              <CalendarDays className="w-4 h-4" />
              <span className="text-sm">Calendly</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// MAIN
// ============================================
const GTMService = () => {
  usePageMeta(
    "Data-Driven Korea GTM Strategy | Ium Labs",
    "We've helped 30+ global Web3 projects crack Korea's $50B crypto market. Data-driven GTM strategy powered by former Binance & KuCoin executives."
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
        <Hero />
        <ProblemNarrative />
        <Transition />
        <Results />
        <WhyUs />
        <Process />
        <Trust />
        <CTA />
      </main>
      <Footer />
    </>
  );
};

export default GTMService;
