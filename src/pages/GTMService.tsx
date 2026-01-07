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
// SECTION 1: INTRO - Hero with scroll-based title separation
// ============================================
const IntroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const titleTopY = useTransform(scrollYProgress, [0, 0.5], [0, -120]);
  const titleBottomY = useTransform(scrollYProgress, [0, 0.5], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <motion.section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity, scale }}
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
        className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
        style={{ y: bgY }}
      />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <span className="text-indigo-300/60 text-xs md:text-sm tracking-[0.4em] uppercase font-medium">
            Go-To-Market Strategy
          </span>
        </motion.div>
        
        {/* Title with scroll separation effect */}
        <div className="space-y-0 md:space-y-2">
          <div className="overflow-hidden">
            <motion.h1 
              className="text-[14vw] md:text-[11vw] leading-[0.85] font-extralight text-white/50"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              style={{ y: titleTopY }}
              transition={{ duration: 1.2, ease: customEase, delay: 0.1 }}
            >
              한국 시장
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1 
              className="text-[14vw] md:text-[11vw] leading-[0.85] font-black text-white"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              style={{ y: titleBottomY }}
              transition={{ duration: 1.2, ease: customEase, delay: 0.2 }}
            >
              진출 전략
            </motion.h1>
          </div>
        </div>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-white/40 text-base md:text-xl mt-8 max-w-lg mx-auto"
        >
          Launch in Korea, Scale Globally
        </motion.p>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-16 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-px h-20 bg-gradient-to-b from-indigo-400/60 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
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

  const challenges = [
    { label: "독특한 규제 환경", value: "VASP 등록 필수" },
    { label: "강력한 커뮤니티", value: "세계 Top 5 시장" },
    { label: "언어 장벽", value: "로컬라이제이션 필수" },
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-32 overflow-hidden"
    >
      {/* Gradient background - Blue to Purple transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900 to-indigo-950/80" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[70vh]">
          {/* Text Content - Slides in from left */}
          <motion.div 
            className="space-y-8 order-2 lg:order-1"
            style={{ x: textX, opacity: textOpacity }}
          >
            <span className="text-indigo-400/80 text-xs md:text-sm tracking-[0.3em] uppercase">
              The Challenge
            </span>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
              왜 <span className="text-indigo-400">한국 시장</span>인가?
            </h2>
            
            <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-lg">
              한국은 글로벌 암호화폐 거래량의 10%를 차지하는 핵심 시장입니다. 
              하지만 문화적 특수성과 규제 환경은 진입 장벽이 높습니다.
            </p>
            
            {/* Challenge stats */}
            <div className="space-y-4 pt-6">
              {challenges.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex items-center justify-between py-4 border-b border-white/10"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <span className="text-white/40 text-sm uppercase tracking-wider">{item.label}</span>
                  <span className="text-white font-bold">{item.value}</span>
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
// SECTION 3: APPROACH - Process Steps
// ============================================
const ApproachSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  
  const steps = [
    {
      number: "01",
      title: "Discovery",
      subtitle: "시장 분석",
      description: "심층 시장 리서치, 경쟁사 분석, 타겟 오디언스 정의",
      color: "from-slate-900 to-indigo-900",
      accent: "text-indigo-400",
      borderColor: "border-indigo-500/30",
    },
    {
      number: "02", 
      title: "Strategy",
      subtitle: "전략 수립",
      description: "맞춤형 GTM 프레임워크, KPI 설정, 로드맵 개발",
      color: "from-indigo-900 to-violet-900",
      accent: "text-violet-400",
      borderColor: "border-violet-500/30",
    },
    {
      number: "03",
      title: "Execution",
      subtitle: "실행 단계",
      description: "PR, 커뮤니티, KOL, 이벤트 채널 통합 캠페인 실행",
      color: "from-violet-900 to-orange-900/80",
      accent: "text-orange-400",
      borderColor: "border-orange-500/30",
    },
    {
      number: "04",
      title: "Scale",
      subtitle: "확장 및 성장",
      description: "퍼포먼스 최적화, 시장 확장, 지속 가능한 성장 가속화",
      color: "from-orange-900/80 to-teal-900",
      accent: "text-teal-400",
      borderColor: "border-teal-500/30",
    }
  ];

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-indigo-950/80 to-slate-900">
      <div className="px-4 md:px-12 lg:px-20 mb-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-8 items-end"
        >
          <div>
            <span className="text-violet-400/80 text-xs md:text-sm tracking-[0.3em] uppercase">Our Approach</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mt-4 leading-tight">
              체계적인 <span className="text-violet-400">4단계</span>
            </h2>
          </div>
          <p className="text-white/50 text-lg leading-relaxed max-w-lg">
            검증된 프로세스를 통해 한국 시장 진출을 성공으로 이끕니다.
          </p>
        </motion.div>
      </div>
      
      {/* Horizontal scroll container */}
      <div ref={containerRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-6 md:gap-8 pl-[5vw] md:pl-[10vw]">
            {steps.map((step, index) => (
              <motion.div 
                key={step.number}
                className={`relative w-[85vw] md:w-[45vw] lg:w-[35vw] h-[65vh] flex-shrink-0 rounded-3xl bg-gradient-to-br ${step.color} border ${step.borderColor} overflow-hidden group`}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <div className="h-full flex flex-col justify-between p-8 md:p-12">
                  <div>
                    <span 
                      className={`text-[18vw] md:text-[8vw] font-black leading-none ${step.accent} opacity-20`}
                    >
                      {step.number}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <span className={`text-sm tracking-wider uppercase ${step.accent}`}>
                      {step.subtitle}
                    </span>
                    <h3 className="text-4xl md:text-5xl font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="text-white/50 text-base md:text-lg max-w-md leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {/* Hover glow effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-white/5 to-transparent`} />
              </motion.div>
            ))}
          </motion.div>
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
            검증된 <span className="text-orange-400">성과</span>
          </h2>
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
// SECTION 4.5: FEATURED PROJECT
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
        <span className="text-indigo-400/80 text-xs md:text-sm tracking-[0.3em] uppercase">
          Featured Project
        </span>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mt-4">
          MANTRA
        </h2>
        <p className="text-white/50 text-lg md:text-xl max-w-xl mt-4">
          Korea GTM Campaign 2024 — Full-stack market entry strategy
        </p>
        <Link 
          to="/projects/mantra"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white mt-6 group"
        >
          <span>자세히 보기</span>
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
              서울에서 <span className="text-teal-400">세계로</span>
            </h2>
          </div>
          <p className="text-white/50 text-lg leading-relaxed max-w-lg">
            서울을 중심으로 글로벌 주요 도시에 파트너 네트워크를 보유하고 있습니다.
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
// SECTION 5.5: PROJECT SHOWCASE
// ============================================
const ProjectShowcaseSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const projects = [
    { name: "Story Protocol", year: "2025", image: storyBg, slug: "story-protocol" },
    { name: "peaq", year: "2024", image: peaqBg, slug: "peaq" },
    { name: "Sahara AI", year: "2024", image: saharaAiBg, slug: "sahara-ai" },
    { name: "Bybit", year: "2024", image: bybitBg, slug: "bybit" },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-teal-950/50 via-slate-900 to-violet-950/50">
      <div className="px-4 md:px-12 lg:px-20 mb-12 md:mb-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-violet-400/80 text-xs md:text-sm tracking-[0.3em] uppercase">Selected Work</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mt-4">
            프로젝트 <span className="text-violet-400">갤러리</span>
          </h2>
        </motion.div>
      </div>
      
      <div className="flex flex-col md:flex-row h-auto md:h-[55vh] lg:h-[65vh]">
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            to={`/projects/${project.slug}`}
            className="relative h-[35vh] md:h-full overflow-hidden cursor-pointer border-b md:border-b-0 md:border-r border-white/5 last:border-0"
            style={{
              flex: hoveredIndex === index ? 2.5 : hoveredIndex !== null ? 0.6 : 1,
              transition: "flex 0.7s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Background image */}
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${project.image})` }}
              animate={{ 
                scale: hoveredIndex === index ? 1.1 : 1 
              }}
              transition={{ duration: 0.7, ease: customEase }}
            />
            
            {/* Gradient overlay */}
            <div className={`absolute inset-0 transition-all duration-700 ${
              hoveredIndex === index 
                ? 'bg-gradient-to-t from-black/80 via-black/30 to-violet-950/20' 
                : 'bg-gradient-to-t from-black/80 via-black/60 to-black/40'
            }`} />
            
            {/* Content */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-6 md:p-8"
              animate={{ 
                opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.3,
                y: hoveredIndex === index ? 0 : 10
              }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-violet-400/70 text-xs md:text-sm tracking-wider">{project.year}</span>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mt-1">
                {project.name}
              </h3>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
};

// ============================================
// SECTION 6: ACTION - CTA with glow effects
// ============================================
const ActionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const glowOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 0.6]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 md:py-48 px-4 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-violet-950 via-slate-900 to-indigo-950"
        style={{ rotate: bgRotate }}
      />
      
      {/* Glow orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-violet-600/20 blur-[150px]"
        style={{ opacity: glowOpacity }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[120px]"
        style={{ opacity: glowOpacity }}
      />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: customEase }}
          className="text-center space-y-8"
        >
          <span className="text-violet-400/80 text-xs md:text-sm tracking-[0.3em] uppercase">
            Let's Start
          </span>
          
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95]">
            Ready to<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-teal-400">
              LAUNCH?
            </span>
          </h2>
          
          <p className="text-white/50 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            한국 시장 진출을 준비하고 계신가요?<br />
            지금 바로 상담을 예약하세요.
          </p>
          
          <motion.div className="pt-8 md:pt-12 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="relative inline-block px-10 md:px-14 py-4 md:py-5 rounded-full overflow-hidden group"
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-indigo-500 to-teal-500 opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-[2px] bg-slate-900 rounded-full group-hover:bg-transparent transition-colors duration-300" />
              <span className="relative z-10 font-bold text-base md:text-lg text-white">
                GET ON BOARD
              </span>
            </Link>
            
            <Link
              to="/projects"
              className="inline-block px-10 md:px-14 py-4 md:py-5 border border-white/20 text-white font-bold text-base md:text-lg rounded-full hover:border-violet-400/50 hover:bg-violet-500/10 transition-all duration-300"
            >
              VIEW PROJECTS
            </Link>
          </motion.div>
          
          {/* Contact info */}
          <div className="pt-16 md:pt-24 grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Email</p>
              <p className="text-white/80">contact@iumlabs.io</p>
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Location</p>
              <p className="text-white/80">Seoul, South Korea</p>
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Social</p>
              <p className="text-white/80">@iumlabs</p>
            </div>
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
              isPaused ? 'text-white' : 'text-white/10'
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
      
      {/* 1. INTRO */}
      <IntroSection />
      
      {/* 2. CHALLENGE */}
      <ChallengeSection />
      
      {/* Marquee */}
      <MarqueeText texts={["GTM STRATEGY", "KOREA MARKET", "WEB3 MARKETING", "BRAND GROWTH"]} />
      
      {/* 3. APPROACH */}
      <ApproachSection />
      
      {/* 4. RESULTS */}
      <ResultsSection />
      
      {/* 4.5 FEATURED PROJECT */}
      <FeaturedProjectSection />
      
      {/* 5. NETWORK */}
      <NetworkSection />
      
      {/* 5.5 PROJECT SHOWCASE */}
      <ProjectShowcaseSection />
      
      {/* Marquee */}
      <MarqueeText texts={["COMMUNITY", "PR & MEDIA", "KOL NETWORK", "EVENTS"]} reverse />
      
      {/* 6. ACTION */}
      <ActionSection />
      
      <Footer />
    </div>
  );
};

export default GTMService;
