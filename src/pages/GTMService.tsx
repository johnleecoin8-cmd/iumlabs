import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';
import ServiceSchema from '@/components/ServiceSchema';
import { useCountUp } from '@/hooks/useCountUp';
import { Link } from 'react-router-dom';

// ============================================
// IMAGE SLOTS - Easy replacement
// ============================================
import storyBg from '@/assets/projects/story-bg.jpg';
import saharaAiBg from '@/assets/projects/sahara-ai-bg.jpg';
import peaqBg from '@/assets/projects/peaq-bg.jpg';
import mantraBg from '@/assets/projects/mantra-featured-bg.jpg';
import bybitBg from '@/assets/projects/bybit-bg.jpg';
import kucoinBg from '@/assets/projects/kucoin-bg.jpg';
import ondoBg from '@/assets/projects/ondo-bg.jpg';
import polygonBg from '@/assets/projects/polygon-bg.jpg';

// ============================================
// CONSTANTS
// ============================================
const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ============================================
// SECTION 1: INTRO - monks.com style oversized typography
// ============================================
const IntroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <motion.section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity }}
    >
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-950/50 to-black"
        style={{ y: bgY }}
      />
      
      {/* Video background with reduced opacity */}
      <motion.video
        src="/videos/gtm-hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
        style={{ y: bgY }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
      
      {/* Content - monks style oversized */}
      <motion.div 
        className="relative z-10 text-center px-4 w-full"
        style={{ scale, y: titleY }}
      >
        {/* Oversized GTM */}
        <div className="overflow-hidden">
          <motion.h1 
            className="text-[35vw] md:text-[30vw] lg:text-[25vw] leading-[0.8] font-black text-white tracking-tighter"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: customEase }}
          >
            GTM
          </motion.h1>
        </div>
        
        {/* Main Copy */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-white text-xl md:text-3xl lg:text-4xl font-bold mt-6 md:mt-8 max-w-4xl mx-auto"
        >
          Your Strategic Gateway to the Korean Web3 Market.
        </motion.h2>
        
        {/* Sub Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-white/50 text-sm md:text-lg mt-4 tracking-wide"
        >
          Launch in Korea with precision, Scale Globally with confidence.
        </motion.p>
        
        {/* Narrative Hook */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-indigo-400/80 text-sm md:text-base mt-8 italic"
        >
          "한국 시장 진출은 옵션이 아닌 필수입니다. 가장 확실한 파트너와 시작하세요."
        </motion.p>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-16 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-px h-20 bg-gradient-to-b from-indigo-400/60 to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

// ============================================
// SECTION 1.5: INTERACTIVE TEXT - "What can we do for you?"
// ============================================
const InteractiveTextSection = () => {
  const words = ["What", "can", "we", "do", "for", "you", "?"];
  
  return (
    <section className="relative py-24 md:py-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-20">
        <motion.div 
          className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 gap-y-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="text-4xl md:text-6xl lg:text-8xl font-black text-white/20 hover:text-violet-400 transition-colors duration-300 cursor-default"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.1, color: "#a78bfa" }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
        
        {/* Korean subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center text-white/40 text-lg md:text-xl mt-8"
        >
          당신의 한국 성공 스토리, 함께 시작합니다.
        </motion.p>
      </div>
    </section>
  );
};

// ============================================
// SECTION 2: CHALLENGE - Why Korea Market?
// ============================================
const ChallengeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const imageClip = useTransform(scrollYProgress, [0.1, 0.4], [100, 0]);
  const textX = useTransform(scrollYProgress, [0.1, 0.4], [-50, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);
  const imageScale = useTransform(scrollYProgress, [0.1, 0.5], [1.2, 1]);

  const narrativeCards = [
    { 
      type: "opportunity", 
      label: "Opportunity", 
      title: "High Liquidity & Passionate Community",
      description: "세계 5대 시장, 글로벌 거래량의 10%",
      color: "text-emerald-400",
      borderColor: "border-emerald-500/30"
    },
    { 
      type: "barrier", 
      label: "Barrier", 
      title: "Cultural & Regulatory Wall",
      description: "VASP 규제, 언어 장벽, 까다로운 커뮤니티",
      color: "text-rose-400",
      borderColor: "border-rose-500/30"
    },
    { 
      type: "solution", 
      label: "Solution Hint", 
      title: "You need a local expert who speaks the global language.",
      description: "글로벌 언어를 구사하는 로컬 전문가",
      color: "text-indigo-400",
      borderColor: "border-indigo-500/30"
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-32 overflow-hidden"
    >
      {/* Gradient background - Blue to Purple transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900 to-indigo-950/80" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div 
          className="mb-16 md:mb-20"
          style={{ opacity: textOpacity }}
        >
          <span className="text-indigo-400/80 text-xs md:text-sm tracking-[0.3em] uppercase">
            Why Korea?
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mt-4">
            왜 <span className="text-indigo-400">한국 시장</span>인가?
          </h2>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div 
            className="space-y-8 order-2 lg:order-1"
            style={{ x: textX, opacity: textOpacity }}
          >
            <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-lg">
              한국은 세계 5대 시장이자 글로벌 거래량의 10%를 차지하는 <span className="text-white font-semibold">'기회의 땅'</span>입니다. 
              하지만 독특한 규제(VASP), 폐쇄적인 언어 장벽, 까다로운 커뮤니티 성향 때문에 
              수많은 프로젝트가 실패하고 돌아갑니다.
            </p>
            
            <p className="text-indigo-400 text-xl md:text-2xl font-bold">
              당신에겐 '지도'가 필요합니다.
            </p>
            
            {/* Narrative Flow Cards */}
            <div className="space-y-4 pt-4">
              {narrativeCards.map((card, i) => (
                <motion.div
                  key={card.type}
                  className={`p-5 rounded-xl border ${card.borderColor} bg-white/[0.02] backdrop-blur-sm`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  whileHover={{ x: 8, borderColor: "rgba(255,255,255,0.2)" }}
                >
                  <span className={`text-xs tracking-wider uppercase ${card.color}`}>{card.label}</span>
                  <h4 className="text-white font-bold text-lg mt-2">{card.title}</h4>
                  <p className="text-white/40 text-sm mt-1">{card.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Image - Clip reveal effect */}
          <motion.div 
            className="relative h-[50vh] lg:h-[70vh] order-1 lg:order-2 overflow-hidden rounded-2xl"
            style={{ 
              clipPath: useTransform(imageClip, v => `inset(0 ${v}% 0 0)`),
            }}
          >
            <motion.img
              src={mantraBg}
              alt="Korea Market"
              className="w-full h-full object-cover"
              style={{ scale: imageScale }}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-indigo-950/40" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 3: APPROACH - monks.com style numbered list
// ============================================
const ApproachSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const steps = [
    {
      number: "01",
      title: "Discovery",
      subtitle: "시장 해부",
      description: "표면적인 번역이 아닌, 한국 유저의 심층 심리를 분석합니다.",
      image: storyBg,
    },
    {
      number: "02", 
      title: "Strategy",
      subtitle: "전략 설계",
      description: "한국의 규제와 트렌드에 맞춘 '커스텀 GTM'을 설계합니다.",
      image: peaqBg,
    },
    {
      number: "03",
      title: "Execution",
      subtitle: "정밀 타격",
      description: "흩어진 채널이 아닌, 통합된 목소리로 임팩트를 만듭니다.",
      image: mantraBg,
    },
    {
      number: "04",
      title: "Scale",
      subtitle: "시장 장악",
      description: "단순 진입을 넘어, 지속 가능한 생태계를 구축합니다.",
      image: saharaAiBg,
    }
  ];

  return (
    <section className="relative py-16 md:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16"
        >
          <span className="text-violet-400/80 text-xs md:text-sm tracking-[0.3em] uppercase">Solutions</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mt-3 leading-tight">
            우리는 감으로 일하지 않습니다.
          </h2>
          <p className="text-white/50 text-lg md:text-xl mt-4 max-w-2xl">
            철저한 데이터와 검증된 4단계 프레임워크로 움직입니다.
          </p>
        </motion.div>
        
        {/* monks-style numbered list */}
        <div className="space-y-0">
          {steps.map((step, index) => (
            <motion.div 
              key={step.number}
              className="group cursor-pointer border-t border-white/10 last:border-b"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex items-center gap-6 md:gap-12 py-6 md:py-8">
                {/* Large number */}
                <motion.span 
                  className="text-[60px] md:text-[100px] font-black leading-none text-white/10 w-[80px] md:w-[140px] flex-shrink-0 transition-colors duration-500"
                  animate={{ 
                    color: hoveredIndex === index ? "rgba(167, 139, 250, 0.4)" : "rgba(255, 255, 255, 0.1)"
                  }}
                >
                  {step.number}
                </motion.span>
                
                {/* Image - shows on hover */}
                <motion.div 
                  className="hidden md:block relative w-[120px] h-[90px] rounded-lg overflow-hidden flex-shrink-0"
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    scale: hoveredIndex === index ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <span className="text-violet-400/60 text-xs tracking-wider uppercase">
                    {step.subtitle}
                  </span>
                  <h3 className="text-xl md:text-3xl font-bold text-white mt-1 group-hover:text-violet-300 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <motion.p 
                    className="text-white/40 text-sm md:text-base mt-2 max-w-lg"
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0.6,
                    }}
                  >
                    {step.description}
                  </motion.p>
                </div>
                
                {/* Arrow */}
                <motion.div 
                  className="text-white/20 group-hover:text-violet-400 transition-colors duration-300"
                  animate={{
                    x: hoveredIndex === index ? 10 : 0,
                  }}
                >
                  <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 4: RESULTS - Stats with animations
// ============================================
const ResultsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const stats = [
    { value: 30, suffix: "+", label: "프로젝트 완료", image: storyBg },
    { value: 95, suffix: "%", label: "성공률", image: peaqBg },
    { value: 500, suffix: "M+", label: "총 노출수", image: saharaAiBg },
    { value: 50, suffix: "+", label: "미디어 파트너", image: polygonBg },
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Bright gradient background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-indigo-950"
        style={{ y: bgY }}
      />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 text-center"
        >
          <span className="text-orange-400/80 text-xs md:text-sm tracking-[0.3em] uppercase">
            Proven Track Record
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mt-4">
            말뿐인 전략은 의미가 없습니다.
          </h2>
          <p className="text-white/50 text-xl md:text-2xl mt-4">
            <span className="text-orange-400 font-bold">숫자</span>가 증명합니다.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ stat, index }: { stat: { value: number; suffix: string; label: string; image: string }; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp({ end: stat.value, isVisible: true, duration: 2000 });
  
  return (
    <motion.div
      ref={ref}
      className="relative group h-[280px] rounded-2xl overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -5 }}
    >
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${stat.image})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 group-hover:via-black/60 transition-all duration-500" />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="text-5xl md:text-6xl font-black text-white mb-2">
          {count}{stat.suffix}
        </div>
        <div className="text-white/50 text-sm uppercase tracking-wider group-hover:text-white/70 transition-colors">
          {stat.label}
        </div>
      </div>
    </motion.div>
  );
};

// ============================================
// SECTION 4.5: FEATURED PROJECT - MANTRA Hero's Journey
// ============================================
const FeaturedProjectSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.3, 1]);
  const textY = useTransform(scrollYProgress, [0.2, 0.5], [100, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  return (
    <section 
      ref={sectionRef}
      className="relative h-[80vh] md:h-screen overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        style={{ scale: imageScale }}
      >
        <img 
          src={mantraBg} 
          alt="Featured project"
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-indigo-950/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      
      {/* Content */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-8 md:p-16 lg:p-24"
        style={{ y: textY, opacity: textOpacity }}
      >
        <span className="text-orange-400/80 text-xs md:text-sm tracking-[0.3em] uppercase">
          From Zero to Market Leader
        </span>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mt-4">
          MANTRA
        </h2>
        <p className="text-white/60 text-lg md:text-xl max-w-2xl mt-4">
          MANTRA가 한국에서 어떻게 인지도를 0에서 100으로 끌어올렸는지 확인하세요.
        </p>
        <p className="text-indigo-400 text-base md:text-lg mt-2 italic">
          이것은 곧 당신의 이야기가 될 수 있습니다.
        </p>
        
        {/* Achievement badges */}
        <div className="flex flex-wrap gap-4 mt-6">
          <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
            <span className="text-white/80 text-sm">커뮤니티 성장 <span className="text-orange-400 font-bold">500%</span></span>
          </div>
          <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
            <span className="text-white/80 text-sm">미디어 노출 <span className="text-orange-400 font-bold">100+</span></span>
          </div>
        </div>
        
        <Link 
          to="/projects/mantra"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white mt-8 group"
        >
          <span className="font-semibold">케이스 스터디 보기</span>
          <motion.span
            className="inline-block"
            whileHover={{ x: 5 }}
          >
            →
          </motion.span>
        </Link>
      </motion.div>
    </section>
  );
};

// ============================================
// SECTION 5: NETWORK - Global reach visualization
// ============================================
const NetworkSection = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  
  const cities = useMemo(() => [
    { name: "Seoul", x: 75, y: 30, primary: true },
    { name: "Tokyo", x: 85, y: 35 },
    { name: "Singapore", x: 72, y: 58 },
    { name: "Dubai", x: 52, y: 45 },
    { name: "London", x: 42, y: 25 },
    { name: "NYC", x: 22, y: 32 },
    { name: "SF", x: 12, y: 38 },
  ], []);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      });
    };
    
    const container = containerRef.current;
    container?.addEventListener("mousemove", handleMouseMove);
    return () => container?.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  const getDistance = (city: { x: number; y: number }) => {
    return Math.sqrt(Math.pow(city.x - mousePos.x, 2) + Math.pow(city.y - mousePos.y, 2));
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden"
    >
      {/* Background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-slate-900 to-teal-950/50"
        style={{ opacity: bgOpacity }}
      />
      
      <div className="relative z-10 px-4 md:px-12 lg:px-20 mb-12 md:mb-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-8 items-end"
        >
          <div>
            <span className="text-teal-400/80 text-xs md:text-sm tracking-[0.3em] uppercase">Global Network</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mt-4 leading-tight">
              Seoul is just the <span className="text-teal-400">beginning.</span>
            </h2>
          </div>
          <p className="text-white/50 text-lg leading-relaxed max-w-lg">
            우리의 본진은 서울이지만, 시야는 세계를 향해 있습니다. 
            서울에서의 성공을 발판 삼아 도쿄, 싱가포르, 뉴욕으로 연결합니다. 
            <span className="text-teal-400">이음(ium)</span>은 이름 그대로 당신과 세계를 잇습니다.
          </p>
        </motion.div>
      </div>
      
      {/* Interactive network map */}
      <div 
        ref={containerRef}
        className="relative w-full h-[50vh] md:h-[65vh] cursor-crosshair"
      >
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full">
          {cities.map((city, i) => 
            cities.slice(i + 1).map((otherCity, j) => {
              const minDist = Math.min(getDistance(city), getDistance(otherCity));
              const opacity = Math.max(0.05, 0.3 - minDist / 60);
              return (
                <motion.line
                  key={`${i}-${j}`}
                  x1={`${city.x}%`}
                  y1={`${city.y}%`}
                  x2={`${otherCity.x}%`}
                  y2={`${otherCity.y}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity }}
                  transition={{ duration: 1.5, delay: i * 0.05 }}
                  viewport={{ once: true }}
                />
              );
            })
          )}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5eead4" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#818cf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#5eead4" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* City nodes */}
        {cities.map((city, i) => {
          const distance = getDistance(city);
          const isClose = distance < 15;
          const scale = Math.max(1, 1.5 - distance / 40);
          
          return (
            <motion.div
              key={city.name}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${city.x}%`, top: `${city.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div
                animate={{ scale }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative"
              >
                {/* Pulse ring for primary city */}
                {city.primary && (
                  <motion.div
                    className="absolute rounded-full border-2 border-teal-400/50"
                    animate={{ 
                      scale: [1, 2.5, 1],
                      opacity: [0.6, 0, 0.6]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    style={{ width: 28, height: 28, left: -11, top: -11 }}
                  />
                )}
                
                {/* Hover pulse */}
                <motion.div
                  className="absolute rounded-full border border-indigo-400/30"
                  animate={{ 
                    scale: isClose ? [1, 2, 1] : 1,
                    opacity: isClose ? [0.5, 0, 0.5] : 0
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ width: 24, height: 24, left: -9, top: -9 }}
                />
                
                {/* Core dot */}
                <div className={`w-[8px] h-[8px] rounded-full transition-all duration-300 ${
                  city.primary ? 'bg-teal-400 w-3 h-3' : isClose ? 'bg-indigo-400' : 'bg-white/40'
                }`} />
                
                {/* City name */}
                <motion.span 
                  className={`absolute left-6 top-1/2 -translate-y-1/2 text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                    city.primary ? 'text-teal-400 font-bold text-sm' : ''
                  }`}
                  animate={{ 
                    opacity: city.primary || isClose ? 1 : 0.4,
                    x: isClose ? 4 : 0
                  }}
                >
                  {city.name}
                </motion.span>
              </motion.div>
            </motion.div>
          );
        })}
        
        {/* Center watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.h3 
            className="text-[12vw] md:text-[10vw] font-black text-white/[0.02] tracking-tighter"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            GLOBAL
          </motion.h3>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 5.5: CLIENT STORIES - monks.com text list style
// ============================================
const ClientStoriesSection = () => {
  const projects = [
    { name: "Story Protocol", subtitle: "Korea Launch Campaign", year: "2025", slug: "story-protocol" },
    { name: "peaq", subtitle: "Web3 Infrastructure GTM", year: "2024", slug: "peaq" },
    { name: "MANTRA", subtitle: "Full-Stack Market Entry", year: "2024", slug: "mantra" },
    { name: "Sahara AI", subtitle: "AI + Blockchain Campaign", year: "2024", slug: "sahara-ai" },
    { name: "Bybit", subtitle: "Exchange Branding Korea", year: "2024", slug: "bybit" },
    { name: "KuCoin", subtitle: "Community & Events", year: "2024", slug: "kucoin" },
  ];

  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="text-violet-400/80 text-xs md:text-sm tracking-[0.3em] uppercase">Selected Work</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mt-3 max-w-3xl leading-tight">
            업계를 선도하는 Top-tier 프로젝트들이 이미 이음 랩스를 선택했습니다.
          </h2>
          <p className="text-white/40 text-base md:text-lg mt-4 max-w-2xl">
            Story Protocol, peaq, Sahara AI... 혁신적인 기술을 가진 그들이 한국 파트너로 우리를 택한 이유는 분명합니다.
          </p>
          <Link 
            to="/projects" 
            className="inline-block text-violet-400 hover:text-violet-300 transition-colors text-sm tracking-wider uppercase mt-6"
          >
            View all work →
          </Link>
        </motion.div>
        
        {/* Text-based project list */}
        <div className="space-y-0">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
            >
              <Link 
                to={`/projects/${project.slug}`}
                className="group flex items-center justify-between py-5 md:py-6 border-b border-white/10 hover:border-violet-500/30 transition-colors"
              >
                <div className="flex items-center gap-4 md:gap-8">
                  {/* Bullet */}
                  <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-violet-400 transition-colors" />
                  
                  {/* Project name */}
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white group-hover:text-violet-300 transition-colors">
                    {project.name}
                  </h3>
                  
                  {/* Subtitle - desktop only */}
                  <span className="hidden md:inline text-white/30 text-sm italic">
                    — {project.subtitle}
                  </span>
                </div>
                
                {/* Year */}
                <span className="text-white/30 text-sm tracking-wider group-hover:text-violet-400/70 transition-colors">
                  {project.year}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* Mobile view all */}
        <Link 
          to="/projects" 
          className="text-white/50 hover:text-violet-400 transition-colors text-sm tracking-wider uppercase mt-8 block md:hidden"
        >
          View all work →
        </Link>
      </div>
    </section>
  );
};

// ============================================
// AWARDS SECTION - Recognition badges
// ============================================
const AwardsSection = () => {
  const awards = [
    { title: "Korea's #1 Web3 GTM Partner", subtitle: "Market Leader 2024" },
    { title: "30+ Successful Launches", subtitle: "Verified Track Record" },
    { title: "500M+ Total Impressions", subtitle: "Proven Impact" },
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-black to-violet-950/30">
      <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-20">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {awards.map((award, index) => (
            <motion.div
              key={award.title}
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {/* Badge circle */}
              <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-violet-500/30 transition-colors" />
                <div className="absolute inset-2 rounded-full border border-white/5" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-violet-400"
                    animate={{ 
                      boxShadow: ["0 0 10px rgba(167,139,250,0.5)", "0 0 30px rgba(167,139,250,0.8)", "0 0 10px rgba(167,139,250,0.5)"]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </div>
              
              <h4 className="text-white font-bold text-sm md:text-base">{award.title}</h4>
              <p className="text-white/40 text-xs mt-1">{award.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 6: ACTION - monks.com style interactive CTA
// ============================================
const ActionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const glowOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 0.6]);
  
  const ctaWords = ["Ready", "to", "Unlock", "Korea", "?"];

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 md:py-48 px-4 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-slate-900 to-indigo-950" />
      
      {/* Glow orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-violet-600/20 blur-[150px]"
        style={{ opacity: glowOpacity }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[120px]"
        style={{ opacity: glowOpacity }}
      />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: customEase }}
          className="text-center space-y-12"
        >
          {/* Interactive text - monks style */}
          <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 gap-y-2">
            {ctaWords.map((word, i) => (
              <motion.span
                key={i}
                className="text-4xl md:text-6xl lg:text-7xl font-black text-white/30 hover:text-white transition-colors duration-300 cursor-default"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                {word}
              </motion.span>
            ))}
          </div>
          
          {/* Subtitle */}
          <p className="text-white/50 text-lg md:text-xl max-w-xl mx-auto">
            한국 시장 진출은 옵션이 아닌 필수입니다.<br />
            <span className="text-indigo-400">가장 확실한 파트너</span>와 시작하세요.
          </p>
          
          {/* CTA Buttons */}
          <motion.div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-3 px-8 md:px-12 py-4 md:py-5 bg-white text-black font-bold text-base md:text-lg rounded-full hover:bg-violet-400 transition-colors duration-300"
            >
              <span>Unlock Korea Now</span>
              <motion.span
                className="inline-block"
                whileHover={{ x: 5 }}
              >
                →
              </motion.span>
            </Link>
            
            <Link
              to="/projects"
              className="inline-block px-8 md:px-12 py-4 md:py-5 border border-white/20 text-white font-bold text-base md:text-lg rounded-full hover:border-white/50 transition-all duration-300"
            >
              View our work
            </Link>
          </motion.div>
          
          {/* Contact info - minimal style */}
          <div className="pt-16 md:pt-20 flex flex-wrap justify-center gap-8 md:gap-16 text-sm">
            <a href="mailto:contact@iumlabs.io" className="text-white/40 hover:text-white transition-colors">
              contact@iumlabs.io
            </a>
            <span className="text-white/40">Seoul, South Korea</span>
            <a href="https://twitter.com/iumlabs" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
              @iumlabs
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// MARQUEE - Infinite scroll text
// ============================================
const MarqueeText = ({ texts, reverse = false }: { texts: string[]; reverse?: boolean }) => {
  const [isPaused, setIsPaused] = useState(false);
  
  return (
    <div 
      className="overflow-hidden py-8 md:py-12 border-y border-white/10 bg-gradient-to-r from-slate-900 via-indigo-950/50 to-slate-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ 
          x: reverse ? ["0%", "50%"] : ["-50%", "0%"] 
        }}
        transition={{ 
          duration: isPaused ? 0 : 35, 
          repeat: Infinity, 
          ease: "linear",
        }}
      >
        {[...texts, ...texts, ...texts, ...texts].map((text, i) => (
          <span 
            key={i} 
            className={`text-3xl md:text-5xl lg:text-6xl font-black mx-8 md:mx-12 transition-all duration-500 ${
              isPaused ? 'text-white/30' : 'text-white/5'
            }`}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
const GTMService = () => {
  usePageMeta(
    "Korean Web3 GTM Strategy | Ium Labs",
    "새로운 시장을 설계하고 브랜드의 가능성을 바꿉니다. Launch in Korea, Scale Globally.",
    "/services/gtm"
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <ServiceSchema 
        name="GTM Strategy - Korea Market Entry"
        description="한국 시장 진출을 위한 전문 GTM 전략 서비스"
        provider="Ium Labs"
        areaServed="Korea"
        url="https://iumlabs.io/services/gtm"
      />
      
      <Navbar />
      
      {/* 1. INTRO - Oversized GTM */}
      <IntroSection />
      
      {/* 1.5. INTERACTIVE TEXT */}
      <InteractiveTextSection />
      
      {/* 2. CHALLENGE */}
      <ChallengeSection />
      
      {/* Marquee */}
      <MarqueeText texts={["GTM STRATEGY", "KOREA MARKET", "WEB3 MARKETING", "BRAND GROWTH"]} />
      
      {/* 3. APPROACH - monks style numbered list */}
      <ApproachSection />
      
      {/* 4. RESULTS */}
      <ResultsSection />
      
      {/* 4.5 FEATURED PROJECT */}
      <FeaturedProjectSection />
      
      {/* 5. NETWORK */}
      <NetworkSection />
      
      {/* 5.5 CLIENT STORIES - text list style */}
      <ClientStoriesSection />
      
      {/* AWARDS */}
      <AwardsSection />
      
      {/* Marquee */}
      <MarqueeText texts={["COMMUNITY", "PR & MEDIA", "KOL NETWORK", "EVENTS"]} reverse />
      
      {/* 6. ACTION - interactive CTA */}
      <ActionSection />
      
      <Footer />
    </div>
  );
};

export default GTMService;
