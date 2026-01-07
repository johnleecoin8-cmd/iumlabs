import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';
import ServiceSchema from '@/components/ServiceSchema';
import { Link } from 'react-router-dom';
import { CalendarDays, ArrowRight, Mail } from 'lucide-react';

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
import seoulMetroBillboard from '@/assets/campaigns/seoul-metro-billboard-new.jpeg';

// ============================================
// SECTION 1: OPENING HERO - 풀스크린 비디오 (유지)
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
// SECTION 2: STATEMENT SECTION - 심플 임팩트 (신규)
// ============================================
const StatementSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative min-h-screen bg-white py-24 md:py-32 lg:py-0 lg:h-screen flex items-center overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left - Typography */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] text-neutral-400 tracking-[0.4em] uppercase mb-8 block">
              Our Philosophy
            </span>
            
            <h2 className="text-[clamp(2rem,5vw,4rem)] font-black text-black leading-[1.1] tracking-tight">
              데이터로 시장을 읽고,
              <br />
              <span className="text-neutral-300">전략으로 성장을 만듭니다.</span>
            </h2>

            <p className="text-neutral-500 text-base md:text-lg mt-8 max-w-md leading-relaxed">
              감이 아닌 데이터로. 추측이 아닌 분석으로. 한국 시장의 진짜 성공을 설계합니다.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-8 mt-12"
            >
              <div>
                <span className="text-4xl md:text-5xl font-black text-black">500%+</span>
                <p className="text-neutral-400 text-xs mt-1">평균 성장률</p>
              </div>
              <div className="w-px h-12 bg-neutral-200" />
              <div>
                <span className="text-4xl md:text-5xl font-black text-black">30+</span>
                <p className="text-neutral-400 text-xs mt-1">성공 프로젝트</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Asymmetric Image */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotate: 3 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[120%] lg:max-w-[700px]">
              <img
                src={seoulMetroBillboard}
                alt="Seoul Metro Billboard Campaign"
                className="w-full aspect-[4/3] object-cover shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 3: PROJECTS SHOWCASE - 풀스크린 호버 갤러리 (유지)
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
// SECTION 4: SERVICE GRID - 2x2 풀블리드 (신규)
// ============================================
const ServiceGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      title: "Research & Insights",
      subtitle: "시장 분석",
      desc: "데이터 기반 심층 리서치",
      image: discoveryImg,
      link: "/services/deep-research"
    },
    {
      title: "Strategy & GTM",
      subtitle: "전략 설계",
      desc: "맞춤형 진입 전략 수립",
      image: strategyImg,
      link: "/services/gtm"
    },
    {
      title: "Execution & Growth",
      subtitle: "실행 & 성장",
      desc: "통합 마케팅 캠페인",
      image: executionImg,
      link: "/services/community"
    },
    {
      title: "Scale & Expansion",
      subtitle: "확장",
      desc: "글로벌 네트워크 확대",
      image: scaleImg,
      link: "/services/pr"
    }
  ];

  return (
    <section ref={ref} className="relative bg-black">
      <div className="grid md:grid-cols-2">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: i * 0.15 }}
          >
            <Link
              to={service.link}
              className="group relative block aspect-square overflow-hidden"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors duration-500" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full p-8 md:p-12 flex flex-col justify-end">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <span className="text-violet-400 text-xs tracking-wider uppercase">
                    {service.subtitle}
                  </span>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mt-2">
                    {service.title}
                  </h3>
                  <p className="text-white/50 text-sm mt-3 max-w-xs">
                    {service.desc}
                  </p>

                  {/* Arrow */}
                  <div className="mt-6 flex items-center gap-2 text-white/40 group-hover:text-white transition-colors">
                    <span className="text-sm">Explore</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </motion.div>
              </div>

              {/* Hover Border */}
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-colors duration-500 pointer-events-none" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// ============================================
// SECTION 5: IMPACT STATEMENT - 브랜드 타이포 (신규)
// ============================================
const ImpactStatement = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 md:py-48 bg-neutral-950 overflow-hidden">
      {/* Background IUM */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.03, scale: 1 } : {}}
          transition={{ duration: 1 }}
          className="text-[40vw] font-black text-white select-none whitespace-nowrap"
        >
          IUM
        </motion.span>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col items-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-[clamp(3rem,12vw,10rem)] font-black text-white leading-[0.9] tracking-tighter"
          >
            결과로
            <br />
            <span className="text-violet-400">증명합니다</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-white/40"
          >
            <span className="text-lg md:text-xl font-medium">500%+ Growth</span>
            <span className="text-white/20">·</span>
            <span className="text-lg md:text-xl font-medium">30+ Projects</span>
            <span className="text-white/20">·</span>
            <span className="text-lg md:text-xl font-medium">100M+ Impressions</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 6: MARQUEE SECTION - 다중 마키 (신규)
// ============================================
const MarqueeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const row1 = ["MANTRA", "Story Protocol", "peaq", "Sahara AI", "OpenLedger", "KuCoin", "BNB Chain", "Polygon"];
  const row2 = ["SEOUL", "TOKYO", "SINGAPORE", "DUBAI", "NEW YORK", "LONDON", "BERLIN", "HONG KONG"];

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="space-y-4"
      >
        {/* Row 1 - Projects (Left to Right) */}
        <div className="overflow-hidden border-y border-neutral-100 py-6">
          <motion.div
            animate={{ x: [0, -1920] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            className="flex whitespace-nowrap"
          >
            {[...Array(4)].map((_, setIdx) => (
              <div key={setIdx} className="flex">
                {row1.map((item, i) => (
                  <span 
                    key={`${setIdx}-${i}`} 
                    className="text-4xl md:text-6xl lg:text-7xl font-black text-neutral-200 hover:text-violet-500 transition-colors duration-300 mx-6 md:mx-10 cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 - Locations (Right to Left) */}
        <div className="overflow-hidden py-6">
          <motion.div
            animate={{ x: [-1920, 0] }}
            transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
            className="flex whitespace-nowrap"
          >
            {[...Array(4)].map((_, setIdx) => (
              <div key={setIdx} className="flex">
                {row2.map((item, i) => (
                  <span 
                    key={`${setIdx}-${i}`} 
                    className="text-3xl md:text-5xl lg:text-6xl font-black text-neutral-100 mx-4 md:mx-8"
                  >
                    {item}
                    {i < row2.length - 1 && <span className="mx-4 text-neutral-200">—</span>}
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 3 - Fast scroll with highlight */}
        <div className="overflow-hidden border-y border-neutral-100 py-4">
          <motion.div
            animate={{ x: [0, -1920] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex whitespace-nowrap"
          >
            {[...Array(8)].map((_, i) => (
              <span 
                key={i} 
                className="text-lg md:text-2xl font-bold text-neutral-300 mx-8 tracking-wider"
              >
                DATA-DRIVEN GROWTH IN KOREA
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

// ============================================
// SECTION 7: CONTACT CTA - 풀스크린 (신규)
// ============================================
const ContactCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section 
      ref={ref} 
      className={`relative min-h-screen flex items-center transition-colors duration-700 ${
        isHovered ? 'bg-violet-600' : 'bg-neutral-950'
      }`}
    >
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="text-[25vw] font-black text-white/[0.02] select-none whitespace-nowrap">
          CONTACT
        </span>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Typography */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[clamp(2.5rem,7vw,5rem)] font-black text-white leading-[1.05] tracking-tight">
              Ready to
              <br />
              grow in Korea?
            </h2>
            <p className="text-white/50 text-base md:text-lg mt-8 max-w-md">
              가장 확실한 파트너와 시작하세요.
              <br />
              데이터로 증명하고, 결과로 보여드립니다.
            </p>
          </motion.div>

          {/* Right - Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            {/* Main CTA Button */}
            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-between w-full p-6 md:p-8 bg-white text-black hover:bg-black hover:text-white transition-all duration-500 overflow-hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="text-xl md:text-2xl font-bold">Start Your Journey</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>

            {/* Secondary Links */}
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="mailto:gm@iumlabs.io"
                className="group flex items-center gap-4 p-5 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all"
              >
                <Mail className="w-5 h-5 text-violet-400" />
                <div>
                  <span className="text-white/40 text-xs block">Email</span>
                  <span className="text-white text-sm font-medium">gm@iumlabs.io</span>
                </div>
              </a>

              <a
                href="https://calendly.com/iumlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all"
              >
                <CalendarDays className="w-5 h-5 text-violet-400" />
                <div>
                  <span className="text-white/40 text-xs block">Schedule</span>
                  <span className="text-white text-sm font-medium">Book a Call</span>
                </div>
              </a>
            </div>
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
      <StatementSection />
      <ProjectsShowcase />
      <ServiceGrid />
      <ImpactStatement />
      <MarqueeSection />
      <ContactCTA />
      <Footer />
    </div>
  );
};

export default GTMService;
