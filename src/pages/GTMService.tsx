import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormSection from "@/components/ContactFormSection";
import FooterLinksSection from "@/components/FooterLinksSection";
import CalendlyButton from "@/components/CalendlyButton";
import { usePageMeta } from "@/hooks/usePageMeta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ServiceSchema from "@/components/ServiceSchema";
import { useCountUp } from "@/hooks/useCountUp";

// Import client logos
import bnbLogo from "@/assets/logos/bnb.png";
import kucoinLogo from "@/assets/logos/kucoin.svg";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import bybitLogo from "@/assets/logos/bybit.png";
import peaqLogo from "@/assets/logos/peaq.svg";
import storyProtocolLogo from "@/assets/logos/story-protocol.png";
import megaethLogo from "@/assets/logos/megaeth.png";
import triaLogo from "@/assets/logos/tria-official.png";
import mantraLogo from "@/assets/logos/mantra.png";
import saharaAiLogo from "@/assets/logos/sahara-ai.png";
import fogoLogo from "@/assets/logos/fogo.png";

// Import featured work images
import storyBg from "@/assets/projects/story-bg.jpg";
import peaqBg from "@/assets/projects/peaq-bg.jpg";
import mantraBg from "@/assets/projects/mantra-bg.jpg";

const breadcrumbItems = [
  { name: "Home", url: "https://iumlabs.io" },
  { name: "Services", url: "https://iumlabs.io/services" },
  { name: "GTM Strategy", url: "https://iumlabs.io/services/gtm" }
];

const clientLogos = [
  { name: "BNB Chain", logo: bnbLogo },
  { name: "KuCoin", logo: kucoinLogo },
  { name: "Polygon", logo: polygonLogo },
  { name: "Ondo", logo: ondoLogo },
  { name: "Bybit", logo: bybitLogo },
  { name: "Peaq", logo: peaqLogo },
  { name: "Story Protocol", logo: storyProtocolLogo },
  { name: "MegaETH", logo: megaethLogo },
  { name: "Tria", logo: triaLogo },
  { name: "Mantra", logo: mantraLogo },
  { name: "Sahara AI", logo: saharaAiLogo },
  { name: "FOGO", logo: fogoLogo },
];

// Stats
const stats = [
  { value: 30, suffix: "+", label: "Projects" },
  { value: 95, suffix: "%", label: "Success Rate" },
  { value: 500, suffix: "M+", label: "Impressions" },
  { value: 50, suffix: "+", label: "Partners" },
];

// Featured Works
const featuredWorks = [
  { name: "Story Protocol", image: storyBg, category: "GTM Strategy" },
  { name: "Peaq Network", image: peaqBg, category: "Market Entry" },
  { name: "Mantra", image: mantraBg, category: "Full Service" },
];

// Stat Component
const StatItem = ({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);
  
  const count = useCountUp({ end: value, isVisible, delay, duration: 2000 });
  
  return (
    <div className="flex flex-col">
      <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-black tracking-tight">
        {count}{suffix}
      </div>
      <div className="text-sm text-black/50 mt-2 uppercase tracking-wider">{label}</div>
    </div>
  );
};

const GTMService = () => {
  usePageMeta(
    "Korean Web3 GTM Strategy | ium Labs",
    "새로운 시장을 설계하고 브랜드의 가능성을 바꿉니다. Launch in Korea, Scale Globally.",
    "/services/gtm"
  );

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section - Innocean Style */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-white">
        {/* Featured Image - Top Right */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute top-24 right-8 md:right-16 lg:right-24 w-[280px] md:w-[360px] lg:w-[440px] aspect-[4/3] rounded-lg overflow-hidden shadow-2xl z-10"
        >
          <img 
            src={storyBg} 
            alt="Featured Work" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <span className="text-xs uppercase tracking-wider opacity-70">Featured</span>
            <h4 className="text-lg font-medium">Story Protocol Korea</h4>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 container mx-auto px-6 lg:px-12 pb-16 pt-48"
        >
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-black/60 max-w-md mb-8 leading-relaxed"
          >
            새로운 시장을 설계하고<br />
            브랜드의 가능성을 바꿉니다.
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-black leading-[1.1] mb-12 max-w-4xl"
          >
            Launch in Korea.<br />
            <span className="font-serif italic">Scale</span> Globally.
          </motion.h1>

          {/* CTA Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <CalendlyButton className="group inline-flex items-center gap-3 text-black hover:text-black/70 transition-colors">
              <span className="text-lg font-medium border-b-2 border-black group-hover:border-black/70 pb-1">
                Book a Strategy Call
              </span>
              <ArrowUpRight className="w-5 h-5" />
            </CalendlyButton>
          </motion.div>
        </motion.div>

        {/* Giant Typography - Bottom */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative z-0 overflow-hidden"
        >
          <div className="text-[15vw] md:text-[12vw] font-bold text-black/5 leading-none tracking-tighter select-none whitespace-nowrap">
            ium LABS
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-6 lg:left-12 flex items-center gap-2 text-black/40"
        >
          <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-1">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-current rounded-full"
            />
          </div>
          <span className="text-xs uppercase tracking-wider">Scroll</span>
        </motion.div>
      </section>

      {/* Business Solutions Section */}
      <section className="py-24 md:py-32 bg-white border-t border-black/10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden"
            >
              <img 
                src={peaqBg} 
                alt="Business Solutions" 
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs uppercase tracking-[0.2em] text-black/40 mb-6 block">
                Business Solutions
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-black leading-tight mb-6">
                방대한 데이터와 기술,<br />
                <span className="font-serif italic">크리에이티브</span>로<br />
                새로운 경험을 만듭니다
              </h2>
              <p className="text-lg text-black/60 mb-8 max-w-md leading-relaxed">
                Deep market research, strategic planning, and flawless execution. 
                We design new possibilities for your brand in the Korean market.
              </p>
              <Link 
                to="/services"
                className="group inline-flex items-center gap-2 text-black font-medium border-b border-black pb-1 hover:border-black/50 transition-colors"
              >
                View Our Approach
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Numbers Section */}
      <section className="py-24 md:py-32 bg-[#FAFAFA]">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Featured Works Row */}
          <div className="flex gap-4 mb-16 overflow-x-auto pb-4 -mx-6 px-6 lg:mx-0 lg:px-0">
            {featuredWorks.map((work, index) => (
              <motion.div
                key={work.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-32 md:w-40 aspect-[3/4] rounded-lg overflow-hidden relative group cursor-pointer"
              >
                <img 
                  src={work.image} 
                  alt={work.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
              </motion.div>
            ))}
          </div>

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-light text-black mb-4">
              브랜드를 성장시키는 힘<br />
              <span className="font-serif italic">숫자와 규모</span>부터 다릅니다.
            </h2>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <StatItem {...stat} delay={index * 100} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Network Section - Client Logos */}
      <section className="py-24 md:py-32 bg-white border-t border-black/10">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-black/40 mb-6 block">
              Global Network
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-black">
              세계 어디서나<br />
              <span className="font-serif italic">브랜드의 가능성</span>을 실현합니다
            </h2>
          </motion.div>

          {/* Logo Grid */}
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12 items-center justify-items-center">
            {clientLogos.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group cursor-pointer"
              >
                <img 
                  src={client.logo} 
                  alt={client.name}
                  className="h-8 md:h-10 w-auto object-contain opacity-40 group-hover:opacity-100 transition-opacity duration-300 grayscale group-hover:grayscale-0"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 md:py-32 bg-black text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Left - Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs uppercase tracking-[0.2em] text-white/40 mb-6 block">
                Services
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-8">
                End-to-end<br />
                <span className="font-serif italic">GTM Strategy</span><br />
                for Korea
              </h2>
              <Link 
                to="/services"
                className="group inline-flex items-center gap-2 text-white font-medium border-b border-white pb-1 hover:border-white/50 transition-colors"
              >
                View All Services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Right - Service List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-0"
            >
              {[
                { name: "Community Management", link: "/services/community" },
                { name: "PR & Media Coverage", link: "/services/pr" },
                { name: "KOL / Influencer Marketing", link: "/services/influencer" },
                { name: "Offline Events & Meetups", link: "/services/offline-event" },
                { name: "SEO & Performance Ads", link: "/services/seo-ads" },
                { name: "Branding & Design", link: "/services/branding" },
                { name: "Deep Research & Analysis", link: "/services/deep-research" },
              ].map((service, index) => (
                <Link
                  key={service.name}
                  to={service.link}
                  className="group flex items-center justify-between py-5 border-b border-white/10 hover:border-white/30 transition-colors"
                >
                  <span className="text-lg md:text-xl font-light group-hover:translate-x-2 transition-transform">
                    {service.name}
                  </span>
                  <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section - Innocean Style */}
      <section className="py-24 md:py-32 bg-white border-t border-black/10">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black leading-tight mb-8">
              함께하세요.<br />
              <span className="font-serif italic">브랜드 경험</span>이 달라지면<br />
              모든 것이 달라집니다.
            </h2>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-12">
              <div className="text-black/60">
                <p className="mb-1">Seoul, South Korea</p>
                <p>contact@iumlabs.io</p>
              </div>
              
              <CalendlyButton className="group inline-flex items-center gap-3 px-8 py-4 bg-black hover:bg-black/80 text-white font-medium rounded-full transition-all duration-300">
                <span>Get On Board</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </CalendlyButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactFormSection />
      <FooterLinksSection />
      <Footer />

      <BreadcrumbSchema items={breadcrumbItems} />
      <ServiceSchema 
        name="Korean Web3 GTM Strategy"
        description="새로운 시장을 설계하고 브랜드의 가능성을 바꿉니다. End-to-end GTM strategy for Web3 projects entering the Korean market."
        url="/services/gtm"
        serviceType={["GTM Strategy", "Web3 Marketing", "Korea Market Entry"]}
      />
    </div>
  );
};

export default GTMService;
