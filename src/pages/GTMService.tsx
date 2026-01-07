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
import mantraPartyImg from '@/assets/campaigns/mantra-party.jpg';
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
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

// Stat Item Component - Horizontal style
const StatItem = ({ value, suffix = '', label, delay = 0 }: { 
  value: number; 
  suffix?: string; 
  label: string; 
  delay?: number 
}) => {
  const count = useCountUp({ end: value, isVisible: true, delay, duration: 2500 });
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay / 1000, ease: customEase }}
      className="text-left"
    >
      <span className="text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-tighter tabular-nums block mb-4">
        {count}{suffix}
      </span>
      <span className="text-white/50 text-sm md:text-base tracking-[0.15em] uppercase">{label}</span>
    </motion.div>
  );
};

// Gallery Card Component with overlay text
const GalleryCard = ({ src, title, delay }: { src: string; title?: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: customEase }}
    className="relative overflow-hidden rounded-lg aspect-[4/5] group"
  >
    <img 
      src={src} 
      alt={title || 'Project'} 
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    {title && (
      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
        <span className="text-white text-lg md:text-xl font-light text-center px-4">{title}</span>
      </div>
    )}
  </motion.div>
);

// Service List Item Component
const ServiceListItem = ({ title, delay }: { title: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay, ease: customEase }}
    className="border-b border-white/10 py-6 md:py-8 group cursor-pointer hover:border-white/30 transition-colors"
  >
    <span className="text-xl md:text-2xl lg:text-3xl font-light text-white group-hover:text-white/80 transition-colors">
      {title}
    </span>
  </motion.div>
);

const GTMService = () => {
  usePageMeta(
    "Korean Web3 GTM Strategy | ium Labs",
    "새로운 시장을 설계하고 브랜드의 가능성을 바꿉니다. Launch in Korea, Scale Globally.",
    "/services/gtm"
  );

  const containerRef = useRef<HTMLDivElement>(null);

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

      {/* Business Solutions Section - Two Column Layout */}
      <section className="min-h-screen flex items-center px-6 py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] to-[#0F0F0F]" />
        
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Image with overlay text */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: customEase }}
              className="relative aspect-[4/3] overflow-hidden rounded-lg"
            >
              <img 
                src={peaqSummitImg} 
                alt="GTM Strategy" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-white text-2xl md:text-3xl lg:text-4xl font-light">
                    The Machine
                    <br />
                    Economy Computer
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right - Text Content */}
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
                Business Solutions
              </motion.p>

              <motion.div 
                variants={slideUp}
                className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.3] mb-8"
              >
                <span className="text-white">방대한 데이터와 기술,</span>
                <br />
                <span className="text-white/60 italic">크리에이티브</span>
                <span className="text-white">로</span>
                <br />
                <span className="text-white">새로운 경험을 만듭니</span>
                <br />
                <span className="text-white">다.</span>
              </motion.div>

              <motion.p 
                variants={slideUp}
                className="text-lg text-white/50 mb-10 max-w-md font-light leading-relaxed"
              >
                Deep market research, strategic planning, and 
                flawless execution. We design new possibilities 
                for your brand in the Korean market.
              </motion.p>

              <motion.div variants={slideUp}>
                <a 
                  href="#services" 
                  className="inline-flex items-center gap-4 text-white/70 hover:text-white transition-colors group"
                >
                  <span className="text-sm tracking-wider relative after:content-[''] after:absolute after:w-full after:h-px after:bottom-0 after:left-0 after:bg-white/50">
                    View Our Approach
                  </span>
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery + Stats Section */}
      <section className="relative bg-[#0A0A0A] px-6 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          {/* Gallery - 3 Cards Left Aligned */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-24 md:mb-32">
            <GalleryCard 
              src={bnbEventImg} 
              title="AI-native
Infrastructure for" 
              delay={0} 
            />
            <GalleryCard 
              src={kucoinCampaignImg} 
              title="The Machine
Economy Computer" 
              delay={0.15} 
            />
            <GalleryCard 
              src={mantraPartyImg} 
              title="" 
              delay={0.3} 
            />
          </div>

          {/* Stats Headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: customEase }}
            className="mb-16 md:mb-20"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight">
              브랜드를 성장시키는 힘
              <br />
              <span className="text-white/60 italic">숫자와 규모</span>
              <span className="text-white">부터 다릅니다.</span>
            </h2>
          </motion.div>

          {/* Stats - Horizontal Layout */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <StatItem value={30} suffix="+" label="Projects" delay={0} />
            <StatItem value={95} suffix="%" label="Success Rate" delay={200} />
            <StatItem value={500} suffix="M" label="Impressions" delay={400} />
            <StatItem value={50} suffix="+" label="Partners" delay={600} />
          </div>
        </div>
      </section>

      {/* Services Section - Two Column Layout */}
      <section id="services" className="min-h-screen flex items-center px-6 py-32 bg-[#050505] relative">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left - Title */}
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
                Services
              </motion.p>

              <motion.h2 
                variants={slideUp}
                className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-12"
              >
                End-to-end
                <br />
                <span className="italic text-white/80">GTM Strategy</span>
                <br />
                for Korea
              </motion.h2>

              <motion.div variants={slideUp}>
                <a 
                  href="/services" 
                  className="inline-flex items-center gap-4 text-white/70 hover:text-white transition-colors group"
                >
                  <span className="text-sm tracking-wider relative after:content-[''] after:absolute after:w-full after:h-px after:bottom-0 after:left-0 after:bg-white/50">
                    View All Services
                  </span>
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                </a>
              </motion.div>
            </motion.div>

            {/* Right - Service List */}
            <div className="pt-4">
              <ServiceListItem title="Community Management" delay={0} />
              <ServiceListItem title="PR & Media Coverage" delay={0.1} />
              <ServiceListItem title="KOL / Influencer Marketing" delay={0.2} />
              <ServiceListItem title="Offline Events & Meetups" delay={0.3} />
              <ServiceListItem title="SEO & Performance Ads" delay={0.4} />
              <ServiceListItem title="Branding & Design" delay={0.5} />
              <ServiceListItem title="Deep Research & Analysis" delay={0.6} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="min-h-[80vh] flex items-center px-6 py-32 relative bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            {/* Main CTA Text */}
            <motion.div 
              variants={slideUp}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-[1.2] mb-16 md:mb-24"
            >
              <span className="text-white">함께하세요.</span>
              <br />
              <span className="text-white/60 italic">브랜드 경험</span>
              <span className="text-white">이 달라지면</span>
              <br />
              <span className="text-white">모든 것이 달라집니다.</span>
            </motion.div>

            {/* Bottom Row - Contact Info + Button */}
            <motion.div 
              variants={slideUp}
              className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
            >
              {/* Left - Contact Info */}
              <div className="space-y-2">
                <p className="text-white/60 text-lg md:text-xl font-light">Seoul, South Korea</p>
                <a 
                  href="mailto:contact@iumlabs.io" 
                  className="text-white/60 text-lg md:text-xl font-light hover:text-white transition-colors"
                >
                  contact@iumlabs.io
                </a>
              </div>

              {/* Right - CTA Button */}
              <a 
                href="/contact" 
                className="inline-flex items-center gap-4 bg-white text-black px-8 py-5 rounded-full text-sm tracking-wider font-medium hover:bg-white/90 transition-all duration-300 group"
              >
                <span>Get On Board</span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GTMService;
