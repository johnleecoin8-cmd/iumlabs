import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';
import ServiceSchema from '@/components/ServiceSchema';
import { useCountUp } from '@/hooks/useCountUp';

// Import images
import storyBg from '@/assets/projects/story-bg.jpg';
import saharaAiBg from '@/assets/projects/sahara-ai-bg.jpg';
import peaqBg from '@/assets/projects/peaq-bg.jpg';
import mantraBg from '@/assets/projects/mantra-bg.jpg';
import kucoinBg from '@/assets/projects/kucoin-bg.jpg';

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
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

// Stat Item Component - Innocean style with horizontal divider
const StatItem = ({ value, suffix = '', label, sublabel, delay = 0 }: { 
  value: number; 
  suffix?: string; 
  label: string; 
  sublabel?: string;
  delay?: number 
}) => {
  const count = useCountUp({ end: value, isVisible: true, delay, duration: 2500 });
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay / 1000, ease: customEase }}
      className="border-t border-white/20 py-8 md:py-10"
    >
      <div className="flex justify-between items-baseline">
        <div>
          <span className="text-white/80 text-base md:text-lg tracking-wide">{label}</span>
          {sublabel && (
            <span className="block text-white/40 text-sm mt-1">{sublabel}</span>
          )}
        </div>
        <span className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white tracking-tighter tabular-nums">
          {count}{suffix}
        </span>
      </div>
    </motion.div>
  );
};

// Inline Image Component with hover effect
const InlineImage = ({ src, alt }: { src: string; alt: string }) => (
  <span className="inline-block align-middle mx-3 md:mx-4 lg:mx-6 group/img">
    <img 
      src={src} 
      alt={alt} 
      className="h-16 md:h-20 lg:h-24 w-auto rounded-lg object-cover inline-block transition-all duration-300 group-hover/img:scale-105 group-hover/img:shadow-xl group-hover/img:shadow-white/10"
    />
  </span>
);

// Gallery Image Component
const GalleryImage = ({ src, alt, delay }: { src: string; alt: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: customEase }}
    className="overflow-hidden rounded-lg"
  >
    <img 
      src={src} 
      alt={alt} 
      className="w-full h-48 md:h-64 lg:h-80 object-cover transition-transform duration-700 hover:scale-105"
    />
  </motion.div>
);

// Network Node Component
const NetworkNode = ({ x, y, label, delay }: { x: string; y: string; label: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="absolute"
    style={{ left: x, top: y }}
  >
    <div className="relative">
      <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full" />
      <div className="absolute w-2 h-2 md:w-3 md:h-3 bg-white rounded-full animate-ping opacity-75" />
      <span className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-white/70 text-xs md:text-sm whitespace-nowrap font-light">
        {label}
      </span>
    </div>
  </motion.div>
);

const GTMService = () => {
  usePageMeta(
    "Korean Web3 GTM Strategy | ium Labs",
    "새로운 시장을 설계하고 브랜드의 가능성을 바꿉니다. Launch in Korea, Scale Globally.",
    "/services/gtm"
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const companyInfoRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: companyInfoRef,
    offset: ["start start", "end end"]
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3], [0.2, 0.4]);

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

      {/* Hero Section - 100vh */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="/videos/gtm-hero.mp4" type="video/mp4" />
        </video>
        
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
      </section>

      {/* Business Solutions Section - Innocean Style */}
      <section className="min-h-screen flex items-center justify-center px-6 py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto"
        >
          <motion.p 
            variants={slideUp}
            className="text-white/50 tracking-[0.3em] uppercase text-sm mb-16"
          >
            Business Solutions
          </motion.p>

          <motion.div 
            variants={slideUp}
            className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.3] md:leading-[1.4] lg:leading-[1.4]"
          >
            <span className="text-white/90">방대한 데이터와 기술,</span>
            <br className="hidden md:block" />
            <span className="text-white/90">생각하지 못한</span>
            <InlineImage src={storyBg} alt="Creative" />
            <span className="text-white/90">크리에이티브로</span>
            <br className="hidden md:block" />
            <span className="text-white/90">새로운</span>
            <InlineImage src={saharaAiBg} alt="Brand" />
            <span className="text-white/90">브랜드 경험을 만듭니다.</span>
          </motion.div>

          <motion.div variants={slideUp} className="mt-20">
            <a 
              href="#approach" 
              className="inline-flex items-center gap-4 text-white/60 hover:text-white transition-colors group relative"
            >
              <span className="text-sm tracking-wider uppercase relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-white after:origin-bottom-right after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-bottom-left">
                View Our Approach
              </span>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Company Information Section - Innocean Style with Gallery + Stats */}
      <section ref={companyInfoRef} className="relative bg-[#0A0A0A]">
        {/* Gallery Section */}
        <div className="px-6 py-24 md:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <GalleryImage src={storyBg} alt="Project 1" delay={0} />
              <GalleryImage src={saharaAiBg} alt="Project 2" delay={0.15} />
              <GalleryImage src={kucoinBg} alt="Project 3" delay={0.3} />
            </div>
          </div>
        </div>

        {/* Stats Section with Video Background */}
        <div className="relative min-h-screen">
          {/* Video Background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              style={{ opacity: backgroundOpacity }}
              className="absolute inset-0"
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/videos/services-background.mp4" type="video/mp4" />
              </video>
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/90 to-[#0A0A0A]" />
          </div>

          {/* Content */}
          <div className="relative z-10 px-6 py-24 md:py-32">
            <div className="max-w-4xl mx-auto">
              {/* Title */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="mb-16 md:mb-24"
              >
                <motion.p 
                  variants={slideUp}
                  className="text-white/50 tracking-[0.3em] uppercase text-sm mb-8"
                >
                  Company Information
                </motion.p>
                
                <motion.h2 
                  variants={slideUp}
                  className="text-4xl md:text-5xl lg:text-6xl font-light mb-6"
                >
                  브랜드를 성장시키는 힘
                </motion.h2>
                
                <motion.p 
                  variants={slideUp}
                  className="text-xl md:text-2xl text-white/60 font-light"
                >
                  숫자와 규모부터 다릅니다.
                </motion.p>
              </motion.div>

              {/* Stats - Vertical List */}
              <div className="space-y-0">
                <StatItem value={30} suffix="+" label="프로젝트 수행" sublabel="2025년 기준" delay={0} />
                <StatItem value={95} suffix="%" label="성공률" sublabel="2025년 기준" delay={200} />
                <StatItem value={500} suffix="M+" label="총 노출 수" sublabel="2025년 기준" delay={400} />
                <StatItem value={50} suffix="+" label="미디어 파트너" sublabel="2025년 기준" delay={600} />
                <div className="border-t border-white/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Network Section - Full Screen Dark Background */}
      <section className="min-h-screen flex items-center justify-center px-6 py-32 bg-[#050505] relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Network Visualization - Centered Globe */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: customEase }}
              className="relative aspect-square max-w-md mx-auto w-full order-2 lg:order-1"
            >
              {/* Animated rotating rings */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 rounded-full border border-white/10" />
                <div className="absolute inset-[15%] rounded-full border border-white/10" />
                <div className="absolute inset-[30%] rounded-full border border-white/10" />
              </motion.div>
              
              {/* Static rings */}
              <div className="absolute inset-[5%] rounded-full border border-white/5" />
              <div className="absolute inset-[45%] rounded-full border border-white/5" />
              
              {/* Meridian lines */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 -translate-y-1/2" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
              
              {/* Network Nodes */}
              <NetworkNode x="48%" y="18%" label="Seoul" delay={0.2} />
              <NetworkNode x="72%" y="35%" label="Tokyo" delay={0.4} />
              <NetworkNode x="22%" y="42%" label="Singapore" delay={0.6} />
              <NetworkNode x="12%" y="62%" label="Dubai" delay={0.8} />
              <NetworkNode x="82%" y="68%" label="San Francisco" delay={1.0} />
              <NetworkNode x="65%" y="78%" label="New York" delay={1.2} />

              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
                <motion.line 
                  x1="48%" y1="18%" x2="72%" y2="35%" 
                  stroke="rgba(255,255,255,0.15)" 
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                <motion.line 
                  x1="48%" y1="18%" x2="22%" y2="42%" 
                  stroke="rgba(255,255,255,0.15)" 
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.7 }}
                />
                <motion.line 
                  x1="22%" y1="42%" x2="12%" y2="62%" 
                  stroke="rgba(255,255,255,0.15)" 
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.9 }}
                />
                <motion.line 
                  x1="72%" y1="35%" x2="82%" y2="68%" 
                  stroke="rgba(255,255,255,0.15)" 
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 1.1 }}
                />
                <motion.line 
                  x1="82%" y1="68%" x2="65%" y2="78%" 
                  stroke="rgba(255,255,255,0.15)" 
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 1.3 }}
                />
                <motion.line 
                  x1="48%" y1="18%" x2="65%" y2="78%" 
                  stroke="rgba(255,255,255,0.08)" 
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 1.5 }}
                />
              </svg>
            </motion.div>

            {/* Right Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
              className="order-1 lg:order-2"
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
                    View Our Network
                  </span>
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section - Innocean Style */}
      <section className="min-h-screen flex items-center px-6 py-32 relative">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="grid lg:grid-cols-5 gap-16 lg:gap-20"
          >
            {/* Left - Main Text (3 cols) */}
            <div className="lg:col-span-3">
              <motion.p 
                variants={slideUp}
                className="text-white/50 tracking-[0.3em] uppercase text-sm mb-16"
              >
                Get Started
              </motion.p>

              <motion.div 
                variants={slideUp}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.3] md:leading-[1.4]"
              >
                <span className="text-white/90">함께하세요.</span>
                <br />
                <span className="text-white/90">브랜드 경험이</span>
                <InlineImage src={peaqBg} alt="Experience" />
                <span className="text-white/90">달라지면</span>
                <br />
                <span className="text-white/90">모든 것이</span>
                <InlineImage src={mantraBg} alt="Everything" />
                <span className="text-white/90">달라집니다.</span>
              </motion.div>
            </div>

            {/* Right - Contact Info (2 cols) */}
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
                  <a 
                    href="/contact" 
                    className="inline-flex items-center gap-4 bg-white text-black px-8 py-5 text-sm tracking-wider uppercase font-medium hover:bg-black hover:text-white border border-white transition-all duration-300 group"
                  >
                    <span>Get On Board</span>
                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                  </a>
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
