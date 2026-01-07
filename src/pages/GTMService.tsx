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
import openledgerEvent from '@/assets/campaigns/openledger-event.jpg';

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
// SECTION 2: THE QUESTION - 강렬한 질문 (신규)
// ============================================
const TheQuestion = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  
  const words = ["Why", "do", "90%", "of", "Web3", "projects", "fail", "in", "Korea?"];

  return (
    <section ref={ref} className="relative min-h-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-5xl mx-auto text-center">
        <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 gap-y-2">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                delay: i * 0.12,
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className={`text-[clamp(2rem,8vw,6rem)] font-black leading-[1.1] tracking-tight ${
                word === "90%" || word === "Korea?" 
                  ? "text-violet-400" 
                  : "text-white"
              }`}
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-flex flex-col items-center gap-2"
          >
            <span className="text-white/30 text-xs tracking-widest uppercase">Discover why</span>
            <svg className="w-5 h-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 3: THE REALITY - 문제점 슬라이드 (신규)
// ============================================
const TheReality = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const slides = [
    {
      num: "01",
      title: "Language Barrier",
      stat: "99%",
      statLabel: "of Koreans search in Korean",
      desc: "English content simply doesn't reach the Korean audience. Your message gets lost before it even lands.",
      image: seoulMetroBillboard
    },
    {
      num: "02", 
      title: "Regulatory Maze",
      stat: "VASP",
      statLabel: "compliance is mandatory",
      desc: "Korea has one of the strictest crypto regulations. One wrong move can shut you out entirely.",
      image: strategyImg
    },
    {
      num: "03",
      title: "Cultural Gap",
      stat: "24/7",
      statLabel: "community engagement expected",
      desc: "Korean communities have unique expectations. What works globally often fails locally.",
      image: openledgerEvent
    }
  ];

  return (
    <div ref={containerRef} className="bg-black">
      {slides.map((slide, i) => (
        <RealitySlide key={i} slide={slide} index={i} />
      ))}
    </div>
  );
};

const RealitySlide = ({ slide, index }: { slide: any; index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative h-screen flex items-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-[120%] object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 w-full"
        style={{ opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Number & Title */}
          <div>
            <span className="text-violet-400/50 text-[clamp(4rem,12vw,10rem)] font-black leading-none">
              {slide.num}
            </span>
            <h3 className="text-[clamp(2rem,5vw,4rem)] font-black text-white leading-[1.1] -mt-4 md:-mt-8">
              {slide.title}
            </h3>
            <p className="text-white/50 text-base md:text-lg mt-6 max-w-md leading-relaxed">
              {slide.desc}
            </p>
          </div>

          {/* Right - Stat */}
          <div className="text-right">
            <span className="text-[clamp(3rem,10vw,8rem)] font-black text-white leading-none">
              {slide.stat}
            </span>
            <p className="text-white/40 text-sm md:text-base mt-2">
              {slide.statLabel}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Slide Progress */}
      <div className="absolute bottom-12 left-6 md:left-12 lg:left-16 flex items-center gap-4">
        <span className="text-white/30 text-xs tracking-wider">{slide.num}</span>
        <div className="w-16 h-px bg-white/20">
          <motion.div 
            className="h-full bg-violet-400"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1.5 }}
          />
        </div>
        <span className="text-white/30 text-xs tracking-wider">03</span>
      </div>
    </section>
  );
};

// ============================================
// SECTION 4: PROJECTS SHOWCASE - 풀스크린 호버 갤러리 (유지)
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
// SECTION 5: THE ANSWER - 해결책 선언 (신규)
// ============================================
const TheAnswer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  const stats = [
    { value: "30+", label: "Projects" },
    { value: "500%+", label: "Avg. Growth" },
    { value: "100M+", label: "Impressions" }
  ];

  const locations = ["SEOUL", "TOKYO", "SINGAPORE", "DUBAI", "NEW YORK"];

  return (
    <section ref={ref} className="relative min-h-screen bg-white flex items-center py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 w-full">
        <div className="flex flex-col items-center text-center">
          {/* Main Statement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[clamp(3rem,12vw,10rem)] font-black text-black leading-[0.9] tracking-tighter">
              We bridge
              <br />
              <span className="text-violet-500">the gap.</span>
            </h2>
          </motion.div>

          {/* Location Marquee */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="mt-12 overflow-hidden w-full max-w-2xl"
          >
            <motion.div
              animate={{ x: [0, -400] }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className="flex whitespace-nowrap"
            >
              {[...Array(4)].map((_, setIdx) => (
                <div key={setIdx} className="flex items-center">
                  {locations.map((loc, i) => (
                    <span key={`${setIdx}-${i}`} className="text-neutral-300 text-sm md:text-base font-medium mx-3">
                      {loc}
                      <span className="mx-3 text-violet-400">→</span>
                    </span>
                  ))}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <span className="text-4xl md:text-6xl font-black text-black">{stat.value}</span>
                <p className="text-neutral-400 text-sm mt-2">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 6: THE METHOD - 수평 스크롤 (신규)
// ============================================
const TheMethod = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const methods = [
    {
      num: "01",
      title: "Research",
      subtitle: "We dive deep into data",
      desc: "Market analysis, competitor mapping, audience insights—we leave no stone unturned.",
      image: discoveryImg,
      link: "/services/deep-research"
    },
    {
      num: "02",
      title: "Strategy",
      subtitle: "We craft your roadmap",
      desc: "Custom GTM strategy aligned with Korean market dynamics and your business goals.",
      image: strategyImg,
      link: "/services/gtm"
    },
    {
      num: "03",
      title: "Execute",
      subtitle: "We launch with precision",
      desc: "Integrated campaigns across PR, community, KOLs, and events—executed flawlessly.",
      image: executionImg,
      link: "/services/community"
    },
    {
      num: "04",
      title: "Scale",
      subtitle: "We amplify your growth",
      desc: "Continuous optimization and expansion to maximize your market presence.",
      image: scaleImg,
      link: "/services/pr"
    }
  ];

  return (
    <section ref={ref} className="relative bg-black py-24 md:py-32">
      {/* Header */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase">Our Method</span>
          <h3 className="text-3xl md:text-5xl font-black text-white mt-4">How we deliver results</h3>
        </motion.div>
      </div>

      {/* Horizontal Scroll Cards */}
      <div 
        ref={containerRef}
        className="overflow-x-auto scrollbar-hide"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        <div className="flex gap-6 px-6 md:px-12 lg:px-16 pb-8" style={{ width: 'max-content' }}>
          {methods.map((method, i) => (
            <motion.div
              key={method.num}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              style={{ scrollSnapAlign: 'start' }}
            >
              <Link
                to={method.link}
                className="group relative block w-[300px] md:w-[400px] lg:w-[450px] aspect-[3/4] overflow-hidden"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={method.image}
                    alt={method.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                  {/* Number */}
                  <span className="text-[8rem] md:text-[10rem] font-black text-white/5 leading-none -ml-2 -mt-4 group-hover:text-violet-500/10 transition-colors duration-500">
                    {method.num}
                  </span>

                  {/* Text */}
                  <div>
                    <h4 className="text-3xl md:text-4xl font-black text-white group-hover:text-violet-400 transition-colors">
                      {method.title}
                    </h4>
                    <p className="text-white/60 text-sm mt-2">{method.subtitle}</p>
                    <p className="text-white/40 text-sm mt-4 leading-relaxed">
                      {method.desc}
                    </p>

                    {/* Arrow */}
                    <div className="mt-6 flex items-center gap-2 text-white/30 group-hover:text-violet-400 transition-colors">
                      <span className="text-sm">Learn more</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Border */}
                <div className="absolute inset-0 border border-white/0 group-hover:border-violet-500/30 transition-colors pointer-events-none" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 mt-8"
      >
        <div className="flex items-center gap-3 text-white/30">
          <span className="text-xs tracking-wider">Drag to explore</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </motion.div>
    </section>
  );
};

// ============================================
// SECTION 7: THE TRUST - 로고 + 미디어 (신규)
// ============================================
const TheTrust = () => {
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
          className="grid grid-cols-3 md:grid-cols-6 gap-8 md:gap-12 items-center justify-items-center mb-20"
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
                className="h-8 md:h-10 w-auto object-contain opacity-40 group-hover:opacity-100 transition-all duration-300 grayscale group-hover:grayscale-0 group-hover:-translate-y-1"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-16" />

        {/* Media Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <span className="text-white/30 text-sm">Featured in</span>
          
          {/* Media Marquee */}
          <div className="mt-8 overflow-hidden">
            <motion.div
              animate={{ x: [0, -600] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="flex items-center gap-16 whitespace-nowrap"
            >
              {[...Array(4)].map((_, setIdx) => (
                <div key={setIdx} className="flex items-center gap-16">
                  {mediaLogos.map((media, i) => (
                    <img
                      key={`${setIdx}-${i}`}
                      src={media.logo}
                      alt={media.name}
                      className="h-6 md:h-8 w-auto object-contain opacity-30 hover:opacity-60 transition-opacity grayscale"
                    />
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 8: THE CTA - 풀스크린 CTA (신규)
// ============================================
const TheCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  const ctaWords = ["Ready", "to", "conquer", "Korea?"];

  return (
    <section 
      ref={ref} 
      className={`relative min-h-screen flex items-center transition-colors duration-700 overflow-hidden ${
        isHovered ? 'bg-violet-600' : 'bg-black'
      }`}
    >
      {/* Background Video */}
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

      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.span 
          className="text-[20vw] font-black text-white/[0.02] select-none whitespace-nowrap"
          animate={{ opacity: isHovered ? 0.05 : 0.02 }}
        >
          KOREA
        </motion.span>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Typography */}
          <div>
            <div className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2">
              {ctaWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className={`text-[clamp(2.5rem,7vw,5rem)] font-black leading-[1.05] tracking-tight ${
                    word === "Korea?" ? "text-violet-400" : "text-white"
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="text-white/50 text-base md:text-lg mt-8 max-w-md"
            >
              가장 확실한 파트너와 시작하세요.
              <br />
              데이터로 증명하고, 결과로 보여드립니다.
            </motion.p>
          </div>

          {/* Right - Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-8"
          >
            {/* Main CTA Button */}
            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-between w-full p-6 md:p-8 bg-white text-black hover:bg-violet-500 hover:text-white transition-all duration-500 overflow-hidden"
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
      <TheQuestion />
      <TheReality />
      <ProjectsShowcase />
      <TheAnswer />
      <TheMethod />
      <TheTrust />
      <TheCTA />
      <Footer />
    </div>
  );
};

export default GTMService;
