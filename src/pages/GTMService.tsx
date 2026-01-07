import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';
import ServiceSchema from '@/components/ServiceSchema';
import { useCountUp } from '@/hooks/useCountUp';
import { useTilt } from '@/hooks/useTilt';

// Import images
import storyBg from '@/assets/projects/story-bg.jpg';
import saharaAiBg from '@/assets/projects/sahara-ai-bg.jpg';
import peaqBg from '@/assets/projects/peaq-bg.jpg';
import mantraBg from '@/assets/projects/mantra-bg.jpg';
import kucoinBg from '@/assets/projects/kucoin-bg.jpg';

// Process images
import discoveryImg from '@/assets/process/discovery-research.jpg';
import strategyImg from '@/assets/process/strategy-planning.jpg';
import executionImg from '@/assets/process/execution-growth.jpg';
import scaleImg from '@/assets/process/scale-success.jpg';

// Campaign images
import storySummitImg from '@/assets/campaigns/story-origin-summit.jpg';
import saharaImg from '@/assets/campaigns/sahara-ai.jpg';
import mantraPartyImg from '@/assets/campaigns/mantra-party.jpg';
import kucoinCampaignImg from '@/assets/campaigns/kucoin-campaign.jpg';
import peaqSummitImg from '@/assets/campaigns/peaq-summit.jpg';

// Custom easing as tuple for TypeScript
const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Animation variants
const slideUp = {
  hidden: { opacity: 0, y: 80 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: customEase }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

// Mouse following image component
const MouseFollowImage = ({ src, isVisible }: { src: string; isVisible: boolean }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 100);
      mouseY.set(e.clientY - 75);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          style={{ x: springX, y: springY }}
          className="fixed pointer-events-none z-50 w-[200px] h-[150px] rounded-xl overflow-hidden shadow-2xl"
        >
          <img src={src} alt="" className="w-full h-full object-cover" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Giant Stat Component
const GiantStat = ({ value, suffix = '', label, delay = 0 }: { 
  value: number; 
  suffix?: string; 
  label: string; 
  delay?: number 
}) => {
  const count = useCountUp({ end: value, isVisible: true, delay, duration: 2000 });
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: delay / 1000, ease: customEase }}
      className="text-center group"
    >
      <span className="text-[80px] md:text-[120px] lg:text-[180px] font-extralight text-white tracking-tighter tabular-nums leading-none block transition-all duration-300 group-hover:text-white/60">
        {count}{suffix}
      </span>
      <span className="text-white/40 text-sm md:text-base tracking-[0.3em] uppercase mt-4 block">
        {label}
      </span>
    </motion.div>
  );
};

// Case Study Card with Tilt
const CaseStudyCard = ({ 
  src, 
  title, 
  category,
  size = 'normal',
  delay = 0 
}: { 
  src: string; 
  title: string; 
  category: string;
  size?: 'normal' | 'large' | 'tall';
  delay?: number;
}) => {
  const tilt = useTilt({ max: 8, scale: 1.02 });
  const [isHovered, setIsHovered] = useState(false);
  
  const sizeClasses = {
    normal: 'aspect-square',
    large: 'aspect-[16/10]',
    tall: 'aspect-[3/4] row-span-2'
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: customEase }}
      className={`relative overflow-hidden cursor-pointer ${sizeClasses[size]}`}
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={(e) => {
        tilt.onMouseLeave();
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      style={tilt.style}
    >
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
      <img 
        src={src} 
        alt={title}
        className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-110 saturate-50' : 'scale-100'}`}
      />
      <motion.div 
        className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-white/60 text-xs tracking-[0.2em] uppercase mb-2">{category}</p>
        <h3 className="text-white text-xl md:text-2xl font-light">{title}</h3>
      </motion.div>
    </motion.div>
  );
};

// Process Step Component
const ProcessStep = ({ 
  number, 
  title, 
  description, 
  image,
  delay 
}: { 
  number: string; 
  title: string; 
  description: string; 
  image: string;
  delay: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: customEase }}
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-6 md:gap-10">
        <span 
          className={`text-5xl md:text-7xl font-extralight transition-all duration-500 ${
            isHovered ? 'text-white' : 'text-transparent'
          }`}
          style={{ 
            WebkitTextStroke: isHovered ? '0px' : '1px rgba(255,255,255,0.3)',
          }}
        >
          {number}
        </span>
        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-light text-white mb-3 transition-colors group-hover:text-white/80">
            {title}
          </h3>
          <p className="text-white/50 text-base md:text-lg font-light leading-relaxed max-w-md">
            {description}
          </p>
        </div>
      </div>
      <motion.div 
        className="mt-6 overflow-hidden rounded-lg"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: customEase }}
      >
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 md:h-64 object-cover"
        />
      </motion.div>
    </motion.div>
  );
};

// Marquee Text Component
const MarqueeText = ({ children, direction = 'left' }: { children: string; direction?: 'left' | 'right' }) => (
  <div className="overflow-hidden py-8 md:py-12">
    <motion.div
      animate={{ x: direction === 'left' ? [0, -1920] : [-1920, 0] }}
      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      className="flex gap-16 whitespace-nowrap"
    >
      {[...Array(4)].map((_, i) => (
        <span 
          key={i} 
          className="text-6xl md:text-8xl lg:text-9xl font-extralight text-white/10 tracking-tight"
        >
          {children}
        </span>
      ))}
    </motion.div>
  </div>
);

// Inline Image for manifesto
const ManifestoImage = ({ src, alt }: { src: string; alt: string }) => (
  <span className="inline-block align-middle mx-2 md:mx-4">
    <motion.img 
      src={src} 
      alt={alt} 
      className="h-12 md:h-16 lg:h-20 w-auto rounded-lg object-cover inline-block"
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
    />
  </span>
);

const GTMService = () => {
  usePageMeta(
    "Korean Web3 GTM Strategy | ium Labs",
    "새로운 시장을 설계하고 브랜드의 가능성을 바꿉니다. Launch in Korea, Scale Globally.",
    "/services/gtm"
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const [showMouseImage, setShowMouseImage] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  return (
    <div ref={containerRef} className="bg-[#0A0A0A] text-white min-h-screen overflow-x-hidden">
      <ServiceSchema 
        name="GTM Strategy - Korea Market Entry"
        description="한국 시장 진출을 위한 전문 GTM 전략 서비스"
        provider="ium LABS"
        areaServed="Korea"
        url="https://iumlabs.io/services/gtm"
      />
      <Navbar />
      
      <MouseFollowImage src={storyBg} isVisible={showMouseImage} />

      {/* Hero Section - Kept with slight enhancements */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Video Background with Grain */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="/videos/gtm-hero.mp4" type="video/mp4" />
        </video>
        
        {/* Noise overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/50 to-[#0A0A0A]" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        >
          <motion.p 
            variants={slideUp}
            className="text-white/50 tracking-[0.3em] uppercase text-sm mb-8"
          >
            Go-To-Market Strategy
          </motion.p>
          
          <motion.h1 
            variants={slideUp}
            className="text-5xl md:text-7xl lg:text-9xl font-light tracking-tight mb-8"
          >
            <span className="block">한국 시장</span>
            <span className="block text-white/60">진출 전략</span>
          </motion.h1>

          <motion.p 
            variants={slideUp}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto"
          >
            글로벌 Web3 프로젝트의 성공적인 한국 시장 진입을 지원합니다
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-white/40"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ArrowDown size={20} />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Featured Work Section - BASIC/DEPT Style */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto w-full"
        >
          <motion.p 
            variants={slideUp}
            className="text-white/50 tracking-[0.3em] uppercase text-sm mb-12"
          >
            Featured Work
          </motion.p>

          <motion.div 
            variants={slideUp}
            className="relative aspect-[16/9] w-full overflow-hidden rounded-lg group cursor-pointer"
          >
            <img 
              src={storySummitImg} 
              alt="Featured Project"
              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />
            
            {/* Center Play/CTA */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button 
                className="px-8 py-4 border border-white/40 text-white text-sm tracking-[0.2em] uppercase backdrop-blur-sm bg-white/5 hover:bg-white hover:text-black transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Reel
              </motion.button>
            </div>
            
            {/* Bottom Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex justify-between items-end">
              <h3 className="text-white text-2xl md:text-4xl font-light">Story Protocol</h3>
              <span className="text-white/60 text-sm tracking-wider">ium LABS 2025</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Marquee Section */}
      <section className="border-y border-white/10 bg-[#050505]">
        <MarqueeText direction="left">
          GTM STRATEGY • KOREA MARKET • WEB3 MARKETING • BRAND EXPERIENCE •
        </MarqueeText>
        <div className="border-t border-white/5" />
        <MarqueeText direction="right">
          이음랩스 • 한국시장진출 • 마케팅전략 • 브랜드경험 • 글로벌확장 •
        </MarqueeText>
      </section>

      {/* Manifesto Section - Bold Typography */}
      <section className="min-h-screen flex items-center justify-center px-6 py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          <motion.div 
            variants={slideUp}
            className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.4] md:leading-[1.5]"
          >
            <motion.span 
              className="block text-white/90 mb-4"
              whileHover={{ color: 'rgba(255,255,255,0.5)' }}
              transition={{ duration: 0.3 }}
            >
              우리는
            </motion.span>
            <span className="text-white/90">브랜드를</span>
            <ManifestoImage src={storyBg} alt="Brand" />
            <span className="text-white/90">만듭니다.</span>
            <br className="hidden md:block" />
            <span className="text-white/90">시장을</span>
            <ManifestoImage src={saharaAiBg} alt="Market" />
            <span className="text-white/90">바꿉니다.</span>
            <br className="hidden md:block" />
            <span className="text-white/90">경험을</span>
            <ManifestoImage src={peaqBg} alt="Experience" />
            <span className="text-white/90">디자인합니다.</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Case Studies Grid - Asymmetric Layout */}
      <section className="px-6 py-24 md:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto"
        >
          <motion.p 
            variants={slideUp}
            className="text-white/50 tracking-[0.3em] uppercase text-sm mb-12"
          >
            Case Studies
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="col-span-1 row-span-2">
              <CaseStudyCard 
                src={storySummitImg} 
                title="Story Protocol" 
                category="GTM Strategy"
                size="tall"
                delay={0}
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <CaseStudyCard 
                src={saharaImg} 
                title="Sahara AI" 
                category="Community Building"
                size="large"
                delay={0.1}
              />
            </div>
            <div className="col-span-1">
              <CaseStudyCard 
                src={kucoinCampaignImg} 
                title="KuCoin" 
                category="Exchange Partnership"
                size="normal"
                delay={0.2}
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <CaseStudyCard 
                src={mantraPartyImg} 
                title="MANTRA" 
                category="Event Marketing"
                size="large"
                delay={0.3}
              />
            </div>
            <div className="col-span-1">
              <CaseStudyCard 
                src={peaqSummitImg} 
                title="peaq" 
                category="Media Relations"
                size="normal"
                delay={0.4}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Giant Stats Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-32 relative">
        {/* Subtle grid background */}
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }}
        />
        
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/50 tracking-[0.3em] uppercase text-sm mb-16 text-center"
          >
            By The Numbers
          </motion.p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <GiantStat value={30} suffix="+" label="Projects" delay={0} />
            <GiantStat value={95} suffix="%" label="Success" delay={200} />
            <GiantStat value={500} suffix="M" label="Impressions" delay={400} />
            <GiantStat value={50} suffix="+" label="Partners" delay={600} />
          </div>
        </div>
      </section>

      {/* Approach Section - Process Visualization */}
      <section id="approach" className="px-6 py-24 md:py-32 bg-[#050505]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.p 
              variants={slideUp}
              className="text-white/50 tracking-[0.3em] uppercase text-sm mb-12"
            >
              Our Approach
            </motion.p>

            <div className="space-y-16 md:space-y-20">
              <ProcessStep 
                number="01"
                title="Discovery & Research"
                description="데이터 기반의 시장 분석과 트렌드 파악으로 시작합니다"
                image={discoveryImg}
                delay={0}
              />
              <div className="border-t border-white/10" />
              <ProcessStep 
                number="02"
                title="Strategy & Planning"
                description="목표 시장에 맞춘 최적의 전략을 수립합니다"
                image={strategyImg}
                delay={0.1}
              />
              <div className="border-t border-white/10" />
              <ProcessStep 
                number="03"
                title="Execution & Growth"
                description="캠페인 실행과 커뮤니티 빌딩을 진행합니다"
                image={executionImg}
                delay={0.2}
              />
              <div className="border-t border-white/10" />
              <ProcessStep 
                number="04"
                title="Scale & Success"
                description="지속적인 성장과 성과 최적화를 달성합니다"
                image={scaleImg}
                delay={0.3}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Network Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-32 relative overflow-hidden">
        {/* Animated dot pattern background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Globe Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: customEase }}
              className="relative aspect-square max-w-lg mx-auto w-full"
            >
              {/* Rotating rings */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 rounded-full border border-white/10" />
                <div className="absolute inset-[15%] rounded-full border border-white/15" />
                <div className="absolute inset-[30%] rounded-full border border-white/10" />
              </motion.div>
              
              {/* Static elements */}
              <div className="absolute inset-[45%] rounded-full border border-white/5" />
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 -translate-y-1/2" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
              
              {/* City nodes */}
              {[
                { x: '50%', y: '20%', label: 'Seoul', delay: 0.2 },
                { x: '75%', y: '35%', label: 'Tokyo', delay: 0.4 },
                { x: '25%', y: '45%', label: 'Singapore', delay: 0.6 },
                { x: '15%', y: '65%', label: 'Dubai', delay: 0.8 },
                { x: '80%', y: '70%', label: 'SF', delay: 1.0 },
              ].map((node, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: node.delay }}
                  className="absolute"
                  style={{ left: node.x, top: node.y }}
                >
                  <div className="relative">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <div className="absolute w-2 h-2 bg-white rounded-full animate-ping opacity-50" />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-xs whitespace-nowrap">
                      {node.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
            >
              <motion.p 
                variants={slideUp}
                className="text-white/50 tracking-[0.3em] uppercase text-sm mb-10"
              >
                Global Network
              </motion.p>
              
              <motion.h2 
                variants={slideUp}
                className="text-4xl md:text-5xl lg:text-6xl font-light mb-10 leading-tight"
              >
                세계 어디서나
                <br />
                <span className="text-white/60">브랜드의 가능성을</span>
                <br />
                <span className="text-white/60">실현합니다.</span>
              </motion.h2>

              <motion.p 
                variants={slideUp}
                className="text-lg text-white/50 mb-14 max-w-md font-light leading-relaxed"
              >
                서울을 중심으로 아시아, 중동, 북미까지 글로벌 네트워크를 통해 
                프로젝트의 성공적인 시장 진입을 지원합니다.
              </motion.p>

              <motion.div variants={slideUp}>
                <a 
                  href="/projects" 
                  className="inline-flex items-center gap-4 text-white/60 hover:text-white transition-colors group"
                >
                  <span className="text-sm tracking-wider uppercase relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-white after:origin-bottom-right after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-bottom-left">
                    View Our Projects
                  </span>
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section - Creative with Mouse Following */}
      <section 
        className="min-h-screen flex items-center px-6 py-32 relative"
        onMouseEnter={() => setShowMouseImage(true)}
        onMouseLeave={() => setShowMouseImage(false)}
      >
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="grid lg:grid-cols-5 gap-16 lg:gap-20"
          >
            {/* Left - Main Text */}
            <div className="lg:col-span-3">
              <motion.p 
                variants={slideUp}
                className="text-white/50 tracking-[0.3em] uppercase text-sm mb-16"
              >
                Ready to Launch?
              </motion.p>

              <motion.h2 
                variants={slideUp}
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-[1.2] mb-12"
              >
                <span className="block text-white/90 hover:text-white transition-colors cursor-default">
                  함께
                </span>
                <span className="block text-white/90 hover:text-white transition-colors cursor-default">
                  시작하세요.
                </span>
              </motion.h2>
              
              <motion.p 
                variants={slideUp}
                className="text-xl md:text-2xl text-white/50 font-light max-w-xl"
              >
                브랜드의 한국 시장 진출,<br />
                이음랩스와 함께하세요.
              </motion.p>
            </div>

            {/* Right - Contact Info */}
            <motion.div 
              variants={slideUp}
              className="lg:col-span-2 flex flex-col justify-end"
            >
              <div className="space-y-8 lg:text-right">
                <div>
                  <p className="text-white/40 text-sm tracking-wider uppercase mb-3">Location</p>
                  <p className="text-xl md:text-2xl text-white/80 font-light">Seoul, South Korea</p>
                </div>
                
                <div>
                  <p className="text-white/40 text-sm tracking-wider uppercase mb-3">Contact</p>
                  <a 
                    href="mailto:contact@iumlabs.io" 
                    className="text-xl md:text-2xl text-white/80 hover:text-white transition-colors font-light"
                  >
                    contact@iumlabs.io
                  </a>
                </div>

                <div className="pt-8">
                  <motion.a 
                    href="/contact" 
                    className="inline-flex items-center gap-4 bg-white text-black px-10 py-6 text-sm tracking-wider uppercase font-medium hover:bg-transparent hover:text-white border-2 border-white transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Get On Board</span>
                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GTMService;
