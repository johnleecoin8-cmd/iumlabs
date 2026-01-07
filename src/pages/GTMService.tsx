import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';
import ServiceSchema from '@/components/ServiceSchema';
import { useCountUp } from '@/hooks/useCountUp';

// Import images
import bnbEventImg from '@/assets/campaigns/bnb-event.jpg';
import kucoinCampaignImg from '@/assets/campaigns/kucoin-campaign.jpg';
import polygonConnectImg from '@/assets/campaigns/polygon-connect.png';
import storyOriginImg from '@/assets/campaigns/story-origin-summit.jpg';
import peaqSummitImg from '@/assets/campaigns/peaq-summit.jpg';
import mantraPartyImg from '@/assets/campaigns/mantra-party.jpg';

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

      {/* GTM Strategy Section - Value Proposition */}
      <section className="min-h-screen flex items-center justify-center px-6 py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] to-[#0F0F0F]" />
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto relative z-10"
        >
          <motion.p 
            variants={slideUp}
            className="text-white/50 tracking-[0.3em] uppercase text-sm mb-16"
          >
            GTM Strategy
          </motion.p>

          <motion.div 
            variants={slideUp}
            className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.3] md:leading-[1.4] lg:leading-[1.4]"
          >
            <span className="text-white/90">철저한 시장 분석과</span>
            <br className="hidden md:block" />
            <span className="text-white/90">데이터 기반</span>
            <InlineImage src={bnbEventImg} alt="Data" />
            <span className="text-white/90">인사이트로</span>
            <br className="hidden md:block" />
            <span className="text-white/90">한국 시장</span>
            <InlineImage src={kucoinCampaignImg} alt="Korea" />
            <span className="text-white/90">진입을 설계합니다.</span>
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

      {/* GTM Success Cases - Gallery */}
      <section ref={companyInfoRef} className="relative bg-[#0A0A0A]">
        {/* Gallery Section */}
        <div className="px-6 py-24 md:py-32">
          <div className="max-w-7xl mx-auto">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-white/50 tracking-[0.3em] uppercase text-sm mb-12"
            >
              GTM Success Cases
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <GalleryImage src={bnbEventImg} alt="BNB Chain Korea Launch" delay={0} />
              <GalleryImage src={kucoinCampaignImg} alt="KuCoin Campaign" delay={0.15} />
              <GalleryImage src={polygonConnectImg} alt="Polygon Connect" delay={0.3} />
            </div>
          </div>
        </div>

        {/* GTM Performance Stats */}
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
                  GTM Performance
                </motion.p>
                
                <motion.h2 
                  variants={slideUp}
                  className="text-4xl md:text-5xl lg:text-6xl font-light mb-6"
                >
                  한국 시장 진입의 새로운 기준
                </motion.h2>
                
                <motion.p 
                  variants={slideUp}
                  className="text-xl md:text-2xl text-white/60 font-light"
                >
                  숫자로 증명합니다.
                </motion.p>
              </motion.div>

              {/* Stats - Vertical List */}
              <div className="space-y-0">
                <StatItem value={30} suffix="+" label="성공적 런칭" sublabel="한국 시장 GTM 프로젝트" delay={0} />
                <StatItem value={340} suffix="%+" label="평균 성장률" sublabel="트레이딩 볼륨 / 커뮤니티" delay={200} />
                <StatItem value={500} suffix="K+" label="총 커뮤니티 도달" sublabel="Discord, Telegram, KakaoTalk" delay={400} />
                <StatItem value={5} suffix="M+" label="미디어 노출" sublabel="한국 주요 블록체인 미디어" delay={600} />
                <div className="border-t border-white/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Deliver Section */}
      <section id="approach" className="py-32 px-6 bg-[#0A0A0A] relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.p 
              variants={slideUp}
              className="text-white/50 tracking-[0.3em] uppercase text-sm mb-8"
            >
              What We Deliver
            </motion.p>
            
            <motion.h2 
              variants={slideUp}
              className="text-4xl md:text-5xl font-light mb-20"
            >
              GTM 서비스 범위
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  num: '01',
                  title: 'Market Research',
                  desc: '한국 시장 트렌드, 경쟁사 분석, 타겟 오디언스 인사이트'
                },
                {
                  num: '02',
                  title: 'Localization',
                  desc: '한국어 콘텐츠, 네이밍, 문화적 맥락에 맞는 메시징'
                },
                {
                  num: '03',
                  title: 'Community Setup',
                  desc: 'KakaoTalk, Discord, Telegram 한국 커뮤니티 인프라 구축'
                },
                {
                  num: '04',
                  title: 'KOL Network',
                  desc: '50+ 한국 크립토 인플루언서 파트너십 및 캠페인 실행'
                },
                {
                  num: '05',
                  title: 'PR & Media',
                  desc: '주요 블록체인 미디어 커버리지 - Blockmedia, Coinness, 코인데스크'
                },
                {
                  num: '06',
                  title: 'Exchange Relations',
                  desc: '한국 주요 거래소 관계 구축 및 상장 지원'
                }
              ].map((item, index) => (
                <motion.div
                  key={item.num}
                  variants={slideUp}
                  className="border-t border-white/10 pt-8 group"
                >
                  <span className="text-white/30 text-sm tracking-wider">{item.num}</span>
                  <h3 className="text-xl md:text-2xl font-light text-white mt-4 mb-4 group-hover:text-white/80 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/50 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
                Korea Market Expertise
              </motion.p>
              
              <motion.h2 
                variants={slideUp}
                className="text-4xl md:text-5xl lg:text-6xl font-light mb-10 leading-tight"
              >
                한국 시장을 가장 잘 아는
                <br />
                <span className="text-white/60">파트너와</span>
                <br />
                <span className="text-white/60">함께하세요.</span>
              </motion.h2>

              <motion.p 
                variants={slideUp}
                className="text-lg text-white/50 mb-14 max-w-md font-light leading-relaxed"
              >
                서울을 기반으로 한국 주요 거래소, 미디어, KOL 네트워크와의 
                직접 연결을 통해 가장 효과적인 시장 진입을 지원합니다.
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

      {/* CTA Section - Launch in Korea */}
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
                Launch in Korea
              </motion.p>

              <motion.div 
                variants={slideUp}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.3] md:leading-[1.4]"
              >
                <span className="text-white/90">한국 시장 진입,</span>
                <br />
                <InlineImage src={storyOriginImg} alt="Launch" />
                <span className="text-white/90">처음부터 끝까지</span>
                <br />
                <span className="text-white/90">함께</span>
                <InlineImage src={mantraPartyImg} alt="Together" />
                <span className="text-white/90">설계합니다.</span>
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
                    <span>Start Your GTM</span>
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
