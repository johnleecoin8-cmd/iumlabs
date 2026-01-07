import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';
import ServiceSchema from '@/components/ServiceSchema';
import { useCountUp } from '@/hooks/useCountUp';
import { Link } from 'react-router-dom';

// Import images
import storyBg from '@/assets/projects/story-bg.jpg';
import saharaAiBg from '@/assets/projects/sahara-ai-bg.jpg';
import peaqBg from '@/assets/projects/peaq-bg.jpg';
import mantraBg from '@/assets/projects/mantra-bg.jpg';

// Custom easing
const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ============================================
// CREATIVE CURSOR - Context-aware cursor
// ============================================
const CreativeCursor = ({ cursorText }: { cursorText: string }) => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <AnimatePresence mode="wait">
        {cursorText ? (
          <motion.div
            key="text"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap"
          >
            {cursorText}
          </motion.div>
        ) : (
          <motion.div
            key="dot"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="w-4 h-4 bg-white rounded-full"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ============================================
// SPLIT TEXT - Character-by-character animation
// ============================================
const SplitText = ({ 
  children, 
  className = "", 
  delay = 0,
}: { 
  children: string; 
  className?: string;
  delay?: number;
}) => {
  const characters = children.split("");
  
  return (
    <span className={className}>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: delay + (i * 0.02),
            ease: customEase
          }}
          viewport={{ once: true }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

// ============================================
// MASKED NUMBER - Video/image visible through text
// ============================================
const MaskedNumber = ({ 
  value, 
  suffix = "", 
  label,
  imageSrc 
}: { 
  value: number; 
  suffix?: string; 
  label: string;
  imageSrc: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp({ end: value, isVisible: true, duration: 2000 });
  
  return (
    <motion.div 
      ref={ref} 
      className="relative py-8 md:py-12 border-b border-white/10 group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: customEase }}
    >
      <div className="flex items-center justify-between">
        <div 
          className="text-[18vw] md:text-[12vw] font-black leading-none tracking-tighter"
          style={{
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            WebkitTextFillColor: "transparent",
          }}
        >
          {count}{suffix}
        </div>
        
        <div className="text-right">
          <span className="text-white/30 text-sm md:text-base font-light tracking-widest uppercase block group-hover:text-white/60 transition-colors duration-500">
            {label}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================
// HORIZONTAL SCROLL SECTION - Scroll-triggered horizontal movement
// ============================================
const HorizontalScrollSection = () => {
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
      description: "Deep market research, competitor analysis, and opportunity mapping in the Korean Web3 ecosystem.",
    },
    {
      number: "02", 
      title: "Strategy",
      description: "Custom GTM framework development with clear milestones, KPIs, and execution roadmap.",
    },
    {
      number: "03",
      title: "Execution",
      description: "Full-stack campaign deployment across PR, community, KOL, and event channels.",
    },
    {
      number: "04",
      title: "Scale",
      description: "Performance optimization, market expansion, and sustainable growth acceleration.",
    }
  ];
  
  return (
    <section ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4 md:gap-8 pl-[5vw] md:pl-[10vw]">
          {steps.map((step, index) => (
            <motion.div 
              key={step.number}
              className="relative w-[85vw] md:w-[40vw] h-[70vh] flex-shrink-0 bg-white/5 border border-white/10 overflow-hidden group"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-full flex flex-col justify-between p-6 md:p-10">
                <div>
                  <span 
                    className="text-[20vw] md:text-[10vw] font-black leading-none text-transparent transition-all duration-300 group-hover:opacity-80"
                    style={{ 
                      WebkitTextStroke: "1px rgba(255,255,255,0.15)",
                    }}
                  >
                    {step.number}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-3xl md:text-5xl font-bold text-white group-hover:text-white/80 transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-white/40 text-base md:text-lg max-w-md leading-relaxed group-hover:text-white/60 transition-colors">
                    {step.description}
                  </p>
                </div>
              </div>
              
              {/* Hover gradient */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// INTERACTIVE NETWORK - Mouse-reactive node network
// ============================================
const InteractiveNetwork = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);
  
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
    <div 
      ref={containerRef}
      className="relative w-full h-[50vh] md:h-[70vh] bg-black overflow-hidden cursor-crosshair"
    >
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full">
        {cities.map((city, i) => 
          cities.slice(i + 1).map((otherCity, j) => {
            const minDist = Math.min(getDistance(city), getDistance(otherCity));
            const opacity = Math.max(0.03, 0.25 - minDist / 80);
            return (
              <motion.line
                key={`${i}-${j}`}
                x1={`${city.x}%`}
                y1={`${city.y}%`}
                x2={`${otherCity.x}%`}
                y2={`${otherCity.y}%`}
                stroke="white"
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity }}
                transition={{ duration: 1.5, delay: i * 0.05 }}
                viewport={{ once: true }}
              />
            );
          })
        )}
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
                  className="absolute rounded-full border border-white/30"
                  animate={{ 
                    scale: [1, 2.5, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  style={{ width: 24, height: 24, left: -9, top: -9 }}
                />
              )}
              
              {/* Hover pulse */}
              <motion.div
                className="absolute rounded-full border border-white/20"
                animate={{ 
                  scale: isClose ? [1, 2, 1] : 1,
                  opacity: isClose ? [0.4, 0, 0.4] : 0
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ width: 20, height: 20, left: -7, top: -7 }}
              />
              
              {/* Core dot */}
              <div className={`w-[6px] h-[6px] rounded-full transition-all duration-300 ${
                city.primary ? 'bg-white w-2 h-2' : isClose ? 'bg-white' : 'bg-white/40'
              }`} />
              
              {/* City name */}
              <motion.span 
                className={`absolute left-5 top-1/2 -translate-y-1/2 text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                  city.primary ? 'text-white font-bold' : ''
                }`}
                animate={{ 
                  opacity: city.primary || isClose ? 1 : 0.3,
                  x: isClose ? 3 : 0
                }}
              >
                {city.name}
              </motion.span>
            </motion.div>
          </motion.div>
        );
      })}
      
      {/* Center text - Huge watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.h3 
          className="text-[15vw] md:text-[12vw] font-black text-white/[0.03] tracking-tighter"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          GLOBAL
        </motion.h3>
      </div>
    </div>
  );
};

// ============================================
// MULTI IMAGE FOLLOW - Multiple images following cursor
// ============================================
const MultiImageFollow = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  const images = [
    { src: storyBg, offsetX: -80, offsetY: -60, delay: 0, rotate: -8 },
    { src: mantraBg, offsetX: 0, offsetY: 20, delay: 0.05, rotate: 5 },
    { src: peaqBg, offsetX: 80, offsetY: -30, delay: 0.1, rotate: -3 },
  ];
  
  return (
    <>
      {images.map((img, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-10 hidden lg:block"
          animate={{ 
            x: mousePos.x + img.offsetX - 80, 
            y: mousePos.y + img.offsetY - 55,
            rotate: img.rotate
          }}
          transition={{ 
            type: "spring", 
            stiffness: 120, 
            damping: 15,
            delay: img.delay
          }}
        >
          <div 
            className="w-[160px] h-[110px] bg-cover bg-center rounded-lg opacity-50 shadow-2xl"
            style={{ backgroundImage: `url(${img.src})` }}
          />
        </motion.div>
      ))}
    </>
  );
};

// ============================================
// MARQUEE TEXT - Infinite scroll with hover pause
// ============================================
const MarqueeText = ({ texts, reverse = false }: { texts: string[]; reverse?: boolean }) => {
  const [isPaused, setIsPaused] = useState(false);
  
  return (
    <div 
      className="overflow-hidden py-6 md:py-10 border-y border-white/10 bg-black/50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ 
          x: reverse ? ["0%", "50%"] : ["-50%", "0%"] 
        }}
        transition={{ 
          duration: isPaused ? 0 : 40, 
          repeat: Infinity, 
          ease: "linear",
        }}
      >
        {[...texts, ...texts, ...texts, ...texts].map((text, i) => (
          <span 
            key={i} 
            className={`text-3xl md:text-5xl lg:text-6xl font-black mx-6 md:mx-10 transition-colors duration-500 ${
              isPaused ? 'text-white' : 'text-white/15'
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
// PROJECT SHOWCASE - Hover expansion gallery
// ============================================
const ProjectShowcase = ({ setCursorText }: { setCursorText: (text: string) => void }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const projects = [
    { name: "Story Protocol", year: "2025", image: storyBg, slug: "story-protocol" },
    { name: "MANTRA", year: "2024", image: mantraBg, slug: "mantra" },
    { name: "peaq", year: "2024", image: peaqBg, slug: "peaq" },
    { name: "Sahara AI", year: "2024", image: saharaAiBg, slug: "sahara-ai" },
  ];
  
  return (
    <div className="flex flex-col md:flex-row h-auto md:h-[60vh] lg:h-[70vh]">
      {projects.map((project, index) => (
        <Link
          key={project.slug}
          to={`/projects/${project.slug}`}
          className="relative h-[40vh] md:h-full overflow-hidden cursor-none border-b md:border-b-0 md:border-r border-white/10 last:border-0"
          style={{
            flex: hoveredIndex === index ? 2.5 : hoveredIndex !== null ? 0.5 : 1,
            transition: "flex 0.7s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
          onMouseEnter={() => {
            setHoveredIndex(index);
            setCursorText("VIEW");
          }}
          onMouseLeave={() => {
            setHoveredIndex(null);
            setCursorText("");
          }}
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
          
          {/* Overlay */}
          <div className={`absolute inset-0 bg-black transition-opacity duration-700 ${
            hoveredIndex === index ? 'opacity-30' : 'opacity-70'
          }`} />
          
          {/* Content */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 p-5 md:p-8"
            animate={{ 
              opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.3,
              y: hoveredIndex === index ? 0 : 10
            }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-white/40 text-xs md:text-sm tracking-wider">{project.year}</span>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mt-1">
              {project.name}
            </h3>
          </motion.div>
        </Link>
      ))}
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

  const [cursorText, setCursorText] = useState("");
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <ServiceSchema 
        name="GTM Strategy - Korea Market Entry"
        description="한국 시장 진출을 위한 전문 GTM 전략 서비스"
        provider="Ium Labs"
        areaServed="Korea"
        url="https://iumlabs.io/services/gtm"
      />
      
      <CreativeCursor cursorText={cursorText} />
      <Navbar />
      
      {/* ========== HERO SECTION ========== */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      >
        {/* Background video */}
        <video
          src="/videos/gtm-hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        
        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
        
        {/* Content */}
        <div className="relative z-10 text-center px-4">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-8"
          >
            <span className="text-white/40 text-xs md:text-sm tracking-[0.4em] uppercase">
              Go-To-Market Strategy
            </span>
          </motion.div>
          
          {/* Main title - EXTREME weight contrast */}
          <div className="space-y-0 md:space-y-2">
            <div className="overflow-hidden">
              <motion.h1 
                className="text-[14vw] md:text-[11vw] leading-[0.85] font-extralight text-white/40"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
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
                transition={{ duration: 1.2, ease: customEase, delay: 0.2 }}
              >
                진출 전략
              </motion.h1>
            </div>
          </div>
          
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
              <div className="w-px h-20 bg-gradient-to-b from-white/60 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* ========== MANIFESTO SECTION ========== */}
      <section className="relative py-32 md:py-48 px-4 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6 md:space-y-10">
            {/* Line 1 */}
            <div className="flex flex-wrap items-baseline gap-x-3 md:gap-x-5">
              <span className="text-[9vw] md:text-[6.5vw] font-thin text-white/20">We</span>
              <motion.span 
                className="text-[9vw] md:text-[6.5vw] font-black text-white cursor-pointer px-2"
                whileHover={{ 
                  backgroundColor: "#fff", 
                  color: "#000",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                }}
                transition={{ duration: 0.3 }}
              >
                MAKE
              </motion.span>
              <span className="text-[9vw] md:text-[6.5vw] font-thin text-white/20">brands</span>
            </div>
            
            {/* Line 2 */}
            <div className="flex flex-wrap items-baseline gap-x-3 md:gap-x-5 md:pl-[8vw]">
              <span className="text-[9vw] md:text-[6.5vw] font-thin text-white/20">We</span>
              <motion.span 
                className="text-[9vw] md:text-[6.5vw] font-black text-white cursor-pointer px-2"
                whileHover={{ 
                  backgroundColor: "#fff", 
                  color: "#000",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                }}
                transition={{ duration: 0.3 }}
              >
                CHANGE
              </motion.span>
              <span className="text-[9vw] md:text-[6.5vw] font-thin text-white/20">markets</span>
            </div>
            
            {/* Line 3 */}
            <div className="flex flex-wrap items-baseline gap-x-3 md:gap-x-5 md:pl-[16vw]">
              <span className="text-[9vw] md:text-[6.5vw] font-thin text-white/20">We</span>
              <motion.span 
                className="text-[9vw] md:text-[6.5vw] font-black text-white cursor-pointer px-2"
                whileHover={{ 
                  backgroundColor: "#fff", 
                  color: "#000",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                }}
                transition={{ duration: 0.3 }}
              >
                DESIGN
              </motion.span>
              <span className="text-[9vw] md:text-[6.5vw] font-thin text-white/20">success</span>
            </div>
          </div>
          
          {/* Overlapping image */}
          <motion.div 
            className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 w-[25vw] h-[35vh] hidden lg:block"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 0.5, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: customEase }}
          >
            <img 
              src={storyBg} 
              alt="Project showcase" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>
      
      {/* ========== MARQUEE ========== */}
      <MarqueeText 
        texts={["GTM STRATEGY", "KOREA MARKET", "WEB3 MARKETING", "BRAND EXPERIENCE"]} 
      />
      
      {/* ========== FULLSCREEN IMAGE SECTION ========== */}
      <section className="relative h-[70vh] md:h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.3 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.8, ease: customEase }}
          viewport={{ once: true }}
        >
          <img 
            src={mantraBg} 
            alt="Featured project"
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-20">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: customEase }}
            viewport={{ once: true }}
          >
            <span className="text-white/40 text-xs md:text-sm tracking-[0.3em] uppercase">Featured Project</span>
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-white mt-3">
              MANTRA
            </h2>
            <p className="text-white/50 text-base md:text-xl max-w-xl mt-4 font-light">
              Korea GTM Campaign 2024 — Full-stack market entry strategy
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* ========== STATS SECTION ========== */}
      <section className="py-20 md:py-32 px-4 md:px-12 lg:px-20 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-20"
          >
            <span className="text-white/30 text-xs md:text-sm tracking-[0.3em] uppercase">By the numbers</span>
          </motion.div>
          
          <div>
            <MaskedNumber 
              value={30} 
              suffix="+" 
              label="Projects Delivered" 
              imageSrc={storyBg}
            />
            <MaskedNumber 
              value={95} 
              suffix="%" 
              label="Success Rate" 
              imageSrc={peaqBg}
            />
            <MaskedNumber 
              value={500} 
              suffix="M+" 
              label="Impressions Generated" 
              imageSrc={saharaAiBg}
            />
          </div>
        </div>
      </section>
      
      {/* ========== PROJECT SHOWCASE ========== */}
      <section className="py-16 md:py-24">
        <div className="px-4 md:px-12 lg:px-20 mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white/30 text-xs md:text-sm tracking-[0.3em] uppercase">Selected Work</span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mt-4 leading-tight">
              Featured<br />Projects
            </h2>
          </motion.div>
        </div>
        
        <ProjectShowcase setCursorText={setCursorText} />
      </section>
      
      {/* ========== HORIZONTAL SCROLL PROCESS ========== */}
      <section className="py-16 md:py-24 px-4 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="text-white/30 text-xs md:text-sm tracking-[0.3em] uppercase">Our Process</span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mt-4 leading-tight">
            How We<br />Work
          </h2>
        </motion.div>
      </section>
      
      <HorizontalScrollSection />
      
      {/* ========== INTERACTIVE NETWORK ========== */}
      <section className="py-16 md:py-24">
        <div className="px-4 md:px-12 lg:px-20 mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white/30 text-xs md:text-sm tracking-[0.3em] uppercase">Our Reach</span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mt-4 leading-tight">
              Global<br />Network
            </h2>
          </motion.div>
        </div>
        
        <InteractiveNetwork />
      </section>
      
      {/* ========== REVERSE MARQUEE ========== */}
      <MarqueeText 
        texts={["COMMUNITY", "PR & MEDIA", "KOL NETWORK", "EVENTS", "BRANDING"]} 
        reverse 
      />
      
      {/* ========== CTA SECTION ========== */}
      <section className="relative py-32 md:py-48 px-4 md:px-12 lg:px-20 overflow-hidden">
        <MultiImageFollow />
        
        <div className="relative z-20 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: customEase }}
            className="space-y-8"
          >
            <span className="text-white/30 text-xs md:text-sm tracking-[0.3em] uppercase">
              Let's Talk
            </span>
            
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-black text-white leading-[0.9]">
              Ready to<br />
              <span className="text-white/20">LAUNCH?</span>
            </h2>
            
            <motion.div className="pt-8 md:pt-12">
              <Link
                to="/contact"
                className="inline-block px-10 md:px-14 py-4 md:py-6 bg-white text-black font-bold text-base md:text-lg rounded-full relative overflow-hidden group"
                onMouseEnter={() => setCursorText("")}
              >
                <motion.span 
                  className="relative z-10 group-hover:text-white transition-colors duration-500"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  GET ON BOARD
                </motion.span>
                <motion.div 
                  className="absolute inset-0 bg-black origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: customEase }}
                />
              </Link>
            </motion.div>
            
            <div className="pt-12 md:pt-20 space-y-3 text-white/30">
              <p className="text-base md:text-lg">contact@iumlabs.io</p>
              <p className="text-sm md:text-base">Seoul, South Korea</p>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default GTMService;
