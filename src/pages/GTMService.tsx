import { useRef } from 'react';
import { motion, useScroll, useTransform, type Easing } from 'framer-motion';
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

// Stat Item Component
const StatItem = ({ value, suffix = '', label, delay = 0 }: { value: number; suffix?: string; label: string; delay?: number }) => {
  const count = useCountUp({ end: value, isVisible: true, delay, duration: 2000 });
  
  return (
    <motion.div 
      variants={slideUp}
      className="border-t border-white/20 pt-8"
    >
      <div className="flex justify-between items-start">
        <span className="text-white/50 text-sm tracking-wider uppercase">{label}</span>
        <span className="text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-tighter">
          {count}{suffix}
        </span>
      </div>
    </motion.div>
  );
};

// Inline Image Component
const InlineImage = ({ src, alt }: { src: string; alt: string }) => (
  <span className="inline-block align-middle mx-2 md:mx-4">
    <img 
      src={src} 
      alt={alt} 
      className="h-12 md:h-16 lg:h-20 w-auto rounded-lg object-cover inline-block"
    />
  </span>
);

// Network Node Component
const NetworkNode = ({ x, y, label, delay }: { x: string; y: string; label: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className="absolute"
    style={{ left: x, top: y }}
  >
    <div className="relative">
      <div className="w-3 h-3 bg-white rounded-full" />
      <div className="absolute w-3 h-3 bg-white rounded-full animate-ping" />
      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/70 text-sm whitespace-nowrap">
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

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 0.6]);
  const statsY = useTransform(scrollYProgress, [0.2, 0.5], [100, 0]);
  const statsOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

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

      {/* Business Solutions Section - 100vh */}
      <section className="min-h-screen flex items-center justify-center px-6 py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto"
        >
          <motion.p 
            variants={slideUp}
            className="text-white/50 tracking-[0.3em] uppercase text-sm mb-12"
          >
            Business Solutions
          </motion.p>

          <motion.div 
            variants={slideUp}
            className="text-3xl md:text-5xl lg:text-6xl font-light leading-relaxed md:leading-relaxed lg:leading-relaxed"
          >
            <span className="text-white/90">방대한 데이터와 기술,</span>
            <br />
            <span className="text-white/90">생각하지 못한</span>
            <InlineImage src={storyBg} alt="Creative" />
            <span className="text-white/90">크리에이티브로</span>
            <br />
            <span className="text-white/90">새로운</span>
            <InlineImage src={saharaAiBg} alt="Brand" />
            <span className="text-white/90">브랜드 경험을 만듭니다.</span>
          </motion.div>

          <motion.div variants={slideUp} className="mt-16">
            <a 
              href="#approach" 
              className="inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
            >
              <span className="text-sm tracking-wider uppercase">View Our Approach</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Company Information Section - Scroll-linked */}
      <section ref={companyInfoRef} className="relative min-h-[200vh]">
        {/* Sticky Background */}
        <div className="sticky top-0 h-screen overflow-hidden">
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
          
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />

          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Text */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
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
                  className="text-xl text-white/60"
                >
                  숫자와 규모부터 다릅니다.
                </motion.p>
              </motion.div>

              {/* Right Stats */}
              <motion.div 
                style={{ y: statsY, opacity: statsOpacity }}
                className="space-y-6"
              >
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="space-y-6"
                >
                  <StatItem value={30} suffix="+" label="프로젝트 수행" delay={0} />
                  <StatItem value={95} suffix="%" label="성공률" delay={200} />
                  <StatItem value={500} suffix="M+" label="총 노출 수" delay={400} />
                  <StatItem value={50} suffix="+" label="미디어 파트너" delay={600} />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Network Section - 100vh */}
      <section className="min-h-screen flex items-center justify-center px-6 py-32 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          {/* Network Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative aspect-square max-w-lg mx-auto w-full"
          >
            {/* Globe Circle */}
            <div className="absolute inset-0 rounded-full border border-white/10" />
            <div className="absolute inset-[10%] rounded-full border border-white/10" />
            <div className="absolute inset-[20%] rounded-full border border-white/10" />
            <div className="absolute inset-[30%] rounded-full border border-white/10" />
            
            {/* Horizontal Lines */}
            <div className="absolute top-1/4 left-0 right-0 h-px bg-white/10" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10" />
            <div className="absolute top-3/4 left-0 right-0 h-px bg-white/10" />
            
            {/* Vertical Lines */}
            <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white/10" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10" />
            <div className="absolute left-3/4 top-0 bottom-0 w-px bg-white/10" />

            {/* Network Nodes */}
            <NetworkNode x="50%" y="25%" label="Seoul" delay={0.2} />
            <NetworkNode x="70%" y="40%" label="Tokyo" delay={0.4} />
            <NetworkNode x="25%" y="45%" label="Singapore" delay={0.6} />
            <NetworkNode x="15%" y="60%" label="Dubai" delay={0.8} />
            <NetworkNode x="80%" y="65%" label="SF" delay={1.0} />
            <NetworkNode x="60%" y="75%" label="NYC" delay={1.2} />

            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full">
              <motion.line 
                x1="50%" y1="25%" x2="70%" y2="40%" 
                stroke="rgba(255,255,255,0.2)" 
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <motion.line 
                x1="50%" y1="25%" x2="25%" y2="45%" 
                stroke="rgba(255,255,255,0.2)" 
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
              />
              <motion.line 
                x1="25%" y1="45%" x2="15%" y2="60%" 
                stroke="rgba(255,255,255,0.2)" 
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
              />
              <motion.line 
                x1="70%" y1="40%" x2="80%" y2="65%" 
                stroke="rgba(255,255,255,0.2)" 
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1.1 }}
              />
              <motion.line 
                x1="80%" y1="65%" x2="60%" y2="75%" 
                stroke="rgba(255,255,255,0.2)" 
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1.3 }}
              />
            </svg>
          </motion.div>

          {/* Right Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p 
              variants={slideUp}
              className="text-white/50 tracking-[0.3em] uppercase text-sm mb-8"
            >
              Global Network
            </motion.p>
            
            <motion.h2 
              variants={slideUp}
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-8"
            >
              세계 어디서나
              <br />
              <span className="text-white/60">브랜드의 가능성을</span>
              <br />
              <span className="text-white/60">실현합니다.</span>
            </motion.h2>

            <motion.p 
              variants={slideUp}
              className="text-lg text-white/50 mb-12 max-w-md"
            >
              서울을 중심으로 아시아, 중동, 북미까지 글로벌 네트워크를 통해 
              프로젝트의 성공적인 시장 진입을 지원합니다.
            </motion.p>

            <motion.div variants={slideUp}>
              <a 
                href="/projects" 
                className="inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
              >
                <span className="text-sm tracking-wider uppercase">View Our Network</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - 100vh */}
      <section className="min-h-screen flex items-center justify-center px-6 py-32">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-16 items-end"
          >
            {/* Left - Main Text */}
            <div>
              <motion.p 
                variants={slideUp}
                className="text-white/50 tracking-[0.3em] uppercase text-sm mb-12"
              >
                Get Started
              </motion.p>

              <motion.div 
                variants={slideUp}
                className="text-3xl md:text-5xl lg:text-6xl font-light leading-relaxed md:leading-relaxed lg:leading-relaxed"
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

            {/* Right - Contact Info */}
            <motion.div 
              variants={slideUp}
              className="lg:text-right space-y-8"
            >
              <div>
                <p className="text-white/40 text-sm tracking-wider uppercase mb-2">Location</p>
                <p className="text-xl text-white/80">Seoul, South Korea</p>
              </div>
              
              <div>
                <p className="text-white/40 text-sm tracking-wider uppercase mb-2">Contact</p>
                <a 
                  href="mailto:contact@iumlabs.io" 
                  className="text-xl text-white/80 hover:text-white transition-colors"
                >
                  contact@iumlabs.io
                </a>
              </div>

              <div className="pt-8">
                <a 
                  href="/contact" 
                  className="inline-flex items-center gap-4 bg-white text-black px-8 py-4 text-sm tracking-wider uppercase font-medium hover:bg-white/90 transition-colors group"
                >
                  <span>Get On Board</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
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
