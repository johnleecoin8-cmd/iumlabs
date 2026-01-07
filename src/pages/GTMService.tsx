import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';
import ServiceSchema from '@/components/ServiceSchema';
import { Link } from 'react-router-dom';

// ============================================
// IMAGE IMPORTS
// ============================================
import storyBg from '@/assets/projects/story-bg.jpg';
import saharaAiBg from '@/assets/projects/sahara-ai-bg.jpg';
import peaqBg from '@/assets/projects/peaq-bg.jpg';
import mantraBg from '@/assets/projects/mantra-featured-bg.jpg';
import openledgerHero from '@/assets/campaigns/openledger-hero-official.png';
import kucoinBg from '@/assets/projects/kucoin-bg.jpg';
import discoveryImg from '@/assets/process/discovery-research.jpg';
import strategyImg from '@/assets/process/strategy-planning.jpg';
import executionImg from '@/assets/process/execution-growth.jpg';
import scaleImg from '@/assets/process/scale-success.jpg';

// ============================================
// SECTION 1: OPENING HERO - 풀스크린 비디오
// ============================================
const OpeningHero = () => {
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
          className="w-full h-full object-cover opacity-60"
        >
          <source src="/videos/gtm-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      </motion.div>

      {/* Center Content */}
      <motion.div 
        className="relative z-10 h-full flex flex-col items-center justify-center px-6"
        style={{ opacity, y: textY }}
      >
        {/* Large IUM Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <span className="text-[30vw] font-black text-white/10 select-none tracking-tighter">
            IUM
          </span>
        </motion.div>

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
          className="text-center"
        >
          <span className="block text-[clamp(2.5rem,8vw,7rem)] font-black text-white leading-[0.95] tracking-tight">
            Data-Driven
          </span>
          <span className="block text-[clamp(2.5rem,8vw,7rem)] font-black text-white/40 leading-[0.95] tracking-tight">
            Growth
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-white/60 text-sm mt-8 tracking-wide"
        >
          Powered by Deep Research.
        </motion.p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] text-white/40 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
};

// ============================================
// SECTION 2: NARRATIVE INTRO - 스크롤 스토리텔링
// ============================================
const NarrativeIntro = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const narratives = [
    { text: "한국은", highlight: false },
    { text: "가장 열정적인", highlight: true },
    { text: "Web3 시장입니다.", highlight: false },
    { text: "하지만", highlight: false },
    { text: "아무나 성공할 수 없습니다.", highlight: true },
    { text: "규제, 언어, 문화의 벽.", highlight: false },
    { text: "그래서 당신에겐", highlight: false },
    { text: "전문가가 필요합니다.", highlight: true },
  ];

  return (
    <section ref={containerRef} className="relative bg-neutral-950" style={{ height: `${narratives.length * 50}vh` }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center">
          {narratives.map((item, i) => {
            const start = i / narratives.length;
            const end = (i + 1) / narratives.length;
            
            return (
              <NarrativeText
                key={i}
                text={item.text}
                highlight={item.highlight}
                progress={scrollYProgress}
                start={start}
                end={end}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

const NarrativeText = ({ 
  text, 
  highlight, 
  progress, 
  start, 
  end 
}: { 
  text: string; 
  highlight: boolean; 
  progress: any; 
  start: number; 
  end: number;
}) => {
  const opacity = useTransform(
    progress,
    [start, start + 0.02, end - 0.02, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    [start, start + 0.02, end - 0.02, end],
    [60, 0, 0, -60]
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ opacity, y }}
    >
      <span className={`text-[clamp(1.5rem,5vw,4rem)] font-bold leading-tight ${
        highlight ? 'text-violet-400' : 'text-white/80'
      }`}>
        {text}
      </span>
    </motion.div>
  );
};

// ============================================
// SECTION 3: PROJECTS SHOWCASE - 풀스크린 호버 갤러리
// ============================================
const ProjectsShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    { name: "MANTRA", category: "L1 Infrastructure", result: "500% Growth", media: mantraBg, video: "/videos/projects/mantra-hero.mp4", slug: "mantra" },
    { name: "Story Protocol", category: "IP Platform", result: "Korea #1", media: storyBg, video: "/videos/projects/story-hero.mp4", slug: "story-protocol" },
    { name: "peaq", category: "DePIN Entry", result: "First Branding", media: peaqBg, video: "/videos/projects/peaq-hero.mp4", slug: "peaq" },
    { name: "Sahara AI", category: "AI × Blockchain", result: "Community Built", media: saharaAiBg, video: "/videos/projects/sahara-hero.mp4", slug: "sahara-ai" },
    { name: "OpenLedger", category: "Data Infrastructure", result: "Market Entry", media: openledgerHero, slug: "openledger" },
    { name: "KuCoin", category: "Exchange Campaign", result: "Top Engagement", media: kucoinBg, video: "/videos/projects/kucoin-hero.mp4", slug: "kucoin" },
  ];

  // Auto-rotate when not hovering
  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovering, projects.length]);

  return (
    <section ref={ref} className="relative h-screen bg-black overflow-hidden">
      {/* Background Media */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {projects[activeIndex].video ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={projects[activeIndex].video} type="video/mp4" />
            </video>
          ) : (
            <img
              src={projects[activeIndex].media}
              alt={projects[activeIndex].name}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </AnimatePresence>

      {/* Content Grid */}
      <div className="relative z-10 h-full flex">
        {/* Left - Project List */}
        <div 
          className="w-full lg:w-1/2 h-full flex flex-col justify-center px-8 md:px-16 lg:px-20"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-[10px] text-white/40 tracking-[0.4em] uppercase mb-8"
          >
            Selected Work
          </motion.span>

          <div className="space-y-0">
            {projects.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/projects/${project.slug}`}
                  className="group block py-4 border-b border-white/10"
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-4">
                      <span className={`text-2xl md:text-4xl lg:text-5xl font-black transition-colors duration-300 ${
                        activeIndex === i ? 'text-white' : 'text-white/30'
                      }`}>
                        {project.name}
                      </span>
                      <span className={`hidden md:block text-xs transition-colors duration-300 ${
                        activeIndex === i ? 'text-violet-400' : 'text-white/20'
                      }`}>
                        {project.category}
                      </span>
                    </div>
                    <motion.svg 
                      className={`w-5 h-5 transition-all duration-300 ${
                        activeIndex === i ? 'text-white opacity-100 translate-x-0' : 'text-white/20 opacity-0 -translate-x-4'
                      }`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-10"
          >
            <Link 
              to="/projects"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
            >
              <span>View All Projects</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Right - Active Project Info (Desktop) */}
        <div className="hidden lg:flex w-1/2 h-full items-end justify-end p-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-right"
            >
              <span className="text-violet-400 text-sm">{projects[activeIndex].result}</span>
              <p className="text-white/60 text-xs mt-2 max-w-xs ml-auto">
                {projects[activeIndex].category} campaign delivering measurable results in the Korean market.
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-12 left-8 md:left-16 lg:left-20 flex gap-2">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-8 h-0.5 transition-all duration-300 ${
              activeIndex === i ? 'bg-white' : 'bg-white/20'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

// ============================================
// SECTION 4: APPROACH TIMELINE - 스티키 이미지
// ============================================
const ApproachTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      title: "Discovery",
      subtitle: "진단",
      desc: "시장 데이터를 수집하고, 경쟁 환경을 분석하며, 타겟 오디언스를 정밀하게 정의합니다. 한국 특유의 크립토 문화와 규제 환경을 깊이 이해합니다.",
      image: discoveryImg,
      link: "/services/deep-research"
    },
    {
      num: "02",
      title: "Strategy",
      subtitle: "설계",
      desc: "데이터 기반의 GTM 로드맵을 수립합니다. 채널 전략, 메시지 프레이밍, KPI 설정까지 모든 것을 계획합니다.",
      image: strategyImg,
      link: "/services/gtm"
    },
    {
      num: "03",
      title: "Execution",
      subtitle: "타격",
      desc: "PR, 인플루언서, 커뮤니티, 이벤트 등 모든 채널을 통해 통합된 메시지로 시장에 임팩트를 만듭니다.",
      image: executionImg,
      link: "/services/community"
    },
    {
      num: "04",
      title: "Scale",
      subtitle: "확장",
      desc: "성과를 분석하고 최적화하며, 지속 가능한 성장 생태계를 구축합니다. 한국을 넘어 글로벌로 확장합니다.",
      image: scaleImg,
      link: "/services/pr"
    }
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const step = Math.min(Math.floor(latest * steps.length), steps.length - 1);
      setActiveStep(step);
    });
    return () => unsubscribe();
  }, [scrollYProgress, steps.length]);

  return (
    <section ref={containerRef} className="relative bg-white" style={{ height: `${steps.length * 100}vh` }}>
      <div className="sticky top-0 h-screen flex overflow-hidden">
        {/* Left - Sticky Image */}
        <div className="hidden lg:block w-1/2 h-full relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <img
                src={steps[activeStep].image}
                alt={steps[activeStep].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
            </motion.div>
          </AnimatePresence>
          
          {/* Step Number Overlay */}
          <div className="absolute bottom-12 left-12">
            <motion.span
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[8rem] font-black text-white/20 leading-none"
            >
              {steps[activeStep].num}
            </motion.span>
          </div>
        </div>

        {/* Right - Content */}
        <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-8 md:px-16 lg:px-20">
          <span className="text-[10px] text-neutral-400 tracking-[0.4em] uppercase mb-8">
            Our Approach
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-5xl md:text-6xl font-black text-neutral-200">
                  {steps[activeStep].num}
                </span>
                <div>
                  <h3 className="text-3xl md:text-4xl font-black text-black">
                    {steps[activeStep].title}
                  </h3>
                  <span className="text-violet-600 text-sm">{steps[activeStep].subtitle}</span>
                </div>
              </div>

              <p className="text-neutral-600 text-base md:text-lg leading-relaxed max-w-md mt-6">
                {steps[activeStep].desc}
              </p>

              <Link
                to={steps[activeStep].link}
                className="inline-flex items-center gap-2 mt-8 text-sm text-neutral-400 hover:text-violet-600 transition-colors"
              >
                <span>Learn More</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Progress Dots */}
          <div className="absolute bottom-12 right-8 md:right-16 lg:right-20 flex flex-col gap-3">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeStep === i ? 'bg-violet-600 scale-125' : 'bg-neutral-200'
                }`}
              />
            ))}
          </div>

          {/* Mobile Image */}
          <div className="lg:hidden mt-8">
            <img
              src={steps[activeStep].image}
              alt={steps[activeStep].title}
              className="w-full aspect-video object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 5: METRICS IMPACT - 대형 숫자
// ============================================
const MetricsImpact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const curveProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const metrics = [
    { value: "500", suffix: "%+", label: "Average Growth" },
    { value: "30", suffix: "+", label: "Project Launches" },
    { value: "100", suffix: "M+", label: "Impressions" },
  ];

  return (
    <section ref={ref} className="relative py-32 md:py-48 bg-neutral-950 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-[10px] text-white/30 tracking-[0.4em] uppercase"
        >
          Track Record
        </motion.span>

        {/* Large Metrics */}
        <div className="mt-12 flex flex-wrap items-end gap-x-16 md:gap-x-24 lg:gap-x-32 gap-y-12">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <div className="flex items-baseline">
                <CountUpNumber value={parseInt(m.value)} isInView={isInView} />
                <span className="text-4xl md:text-6xl lg:text-7xl font-black text-violet-400">
                  {m.suffix}
                </span>
              </div>
              <p className="text-white/40 text-xs mt-2 tracking-wide">{m.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Growth Curve */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-24 pt-16 border-t border-white/10"
        >
          <div className="flex items-end gap-8 md:gap-16">
            <div className="w-1/4 min-w-[120px]">
              <p className="text-sm font-medium text-white">우리가 개입한 후</p>
              <p className="text-xs text-white/40 mt-1">성장 곡선이 바뀝니다</p>
            </div>
            <div className="flex-1 h-32 md:h-48">
              <svg viewBox="0 0 400 120" className="w-full h-full" preserveAspectRatio="none">
                {/* Grid Lines */}
                <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4,4" />
                
                {/* IUM Marker */}
                <line x1="120" y1="0" x2="120" y2="110" stroke="rgba(139,92,246,0.4)" strokeWidth="1" strokeDasharray="6,4" />
                <text x="120" y="118" fill="rgba(139,92,246,0.8)" fontSize="10" textAnchor="middle" fontWeight="bold">IUM</text>
                
                {/* Growth Curve */}
                <motion.path
                  d="M0,95 Q40,90 80,85 Q100,80 120,70 Q160,45 220,25 Q300,10 400,5"
                  fill="none"
                  stroke="url(#curveGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{ pathLength: curveProgress }}
                />
                
                {/* Gradient Definition */}
                <defs>
                  <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                    <stop offset="30%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#C4B5FD" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Count Up Animation Component
const CountUpNumber = ({ value, isInView }: { value: number; isInView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span className="text-6xl md:text-8xl lg:text-9xl font-black text-white tabular-nums">
      {count}
    </span>
  );
};

// ============================================
// SECTION 6: GLOBAL NETWORK - 연결 + 마키
// ============================================
const GlobalNetwork = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const locations = [
    { city: "Seoul", status: "HQ", highlight: true },
    { city: "Tokyo", status: "Partner" },
    { city: "Singapore", status: "Partner" },
    { city: "Dubai", status: "Expanding" },
    { city: "New York", status: "Expanding" },
  ];

  return (
    <section ref={ref} className="relative py-32 md:py-48 bg-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] text-neutral-400 tracking-[0.4em] uppercase">
              Network
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mt-4 leading-[1.1]">
              Seoul is just
              <br />
              <span className="text-neutral-300">the beginning.</span>
            </h2>
            <p className="text-neutral-500 text-base mt-8 max-w-md">
              전 세계 주요 크립토 허브와 연결합니다. 로컬 인사이트와 글로벌 네트워크의 시너지.
            </p>
          </motion.div>

          {/* Right - Location List */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            {locations.map((loc, i) => (
              <motion.div
                key={loc.city}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="group flex items-center justify-between py-5 border-b border-neutral-200 hover:bg-neutral-50 transition-colors -mx-4 px-4 cursor-default"
              >
                <span className={`text-xl md:text-2xl font-bold ${
                  loc.highlight ? 'text-violet-600' : 'text-neutral-700'
                }`}>
                  {loc.city}
                </span>
                <span className="text-neutral-400 text-xs tracking-wide">{loc.status}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Marquee */}
      <div className="mt-24 overflow-hidden border-y border-neutral-200">
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="flex whitespace-nowrap py-6"
        >
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-6xl md:text-8xl font-black text-neutral-100 mx-8">
              SEOUL — TOKYO — SINGAPORE — DUBAI — NEW YORK —
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 7: CTA
// ============================================
const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 md:py-48 bg-neutral-950 overflow-hidden">
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[20vw] font-black text-white/[0.02] select-none whitespace-nowrap">
          LET'S TALK
        </span>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1]">
            Ready to
            <br />
            <span className="relative inline-block group cursor-pointer">
              <span className="text-violet-400 group-hover:text-violet-300 transition-colors">
                Unlock Korea?
              </span>
              <motion.span
                className="absolute bottom-2 left-0 right-0 h-1 bg-violet-400 origin-left"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-white/50 text-base mt-8 max-w-md mx-auto"
          >
            가장 확실한 파트너와 시작하세요. 데이터로 증명하고, 결과로 보여드립니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-4 px-10 py-5 bg-white text-black font-medium hover:bg-violet-400 hover:text-white transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">Start Your Journey</span>
              <svg className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
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
    "Data-Driven Korea GTM Strategy | Ium Labs",
    "Data-Driven Growth in Korea. Powered by Deep Research. Strategic market entry with measurable results.",
    "/services/gtm"
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <ServiceSchema 
        name="GTM Strategy - Korea Market Entry"
        description="Data-Driven Growth in Korea. Powered by Deep Research."
        provider="Ium Labs"
        areaServed="Korea"
        url="https://iumlabs.io/services/gtm"
      />
      <Navbar />
      <OpeningHero />
      <NarrativeIntro />
      <ProjectsShowcase />
      <ApproachTimeline />
      <MetricsImpact />
      <GlobalNetwork />
      <CTASection />
      <Footer />
    </div>
  );
};

export default GTMService;
