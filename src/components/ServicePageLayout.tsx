import { useEffect, useState, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, ChevronDown, LucideIcon, ArrowLeft, Check, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormSection from "@/components/ContactFormSection";
import CTABannerSection from "@/components/CTABannerSection";
import FooterLinksSection from "@/components/FooterLinksSection";
import CalendlyButton from "@/components/CalendlyButton";
import SectionHeader from "@/components/SectionHeader";
import { useCountUp } from "@/hooks/useCountUp";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Import client logos for marquee
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
import synfuturesLogo from "@/assets/logos/synfutures.png";

const clientLogos = [
  { name: "BNB", logo: bnbLogo, noInvert: false },
  { name: "KuCoin", logo: kucoinLogo, noInvert: false },
  { name: "Polygon", logo: polygonLogo, noInvert: false },
  { name: "Ondo Finance", logo: ondoLogo, noInvert: false },
  { name: "Bybit", logo: bybitLogo, noInvert: false },
  { name: "Peaq", logo: peaqLogo, noInvert: false },
  { name: "Story Protocol", logo: storyProtocolLogo, noInvert: false },
  { name: "MegaETH", logo: megaethLogo, noInvert: false },
  { name: "Tria", logo: triaLogo, noInvert: true },
  { name: "Mantra", logo: mantraLogo, noInvert: true },
  { name: "Sahara AI", logo: saharaAiLogo, noInvert: true },
  { name: "FOGO", logo: fogoLogo, noInvert: true },
  { name: "SynFutures", logo: synfuturesLogo, noInvert: true },
];

// All services for "More Services" section
const allServices = [
  { slug: "gtm", title: "GTM Strategy", color: "#10B981" },
  { slug: "branding", title: "Branding & Website", color: "#8B5CF6" },
  { slug: "seo-ads", title: "SEO & Paid Ads", color: "#F59E0B" },
  { slug: "offline-event", title: "Offline Event", color: "#10B981" },
  { slug: "community", title: "Community Management", color: "#5865F2" },
  { slug: "deep-research", title: "Deep Research", color: "#06B6D4" },
  { slug: "influencer", title: "Influencer/KOL", color: "#F59E0B" },
  { slug: "pr", title: "PR & Media", color: "#8B5CF6" },
];

export interface ServiceStat {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export interface ServiceTag {
  label: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Deliverable {
  title: string;
  items: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

interface ServicePageLayoutProps {
  // Hero Section
  serviceName: string;
  serviceTitle: string;
  serviceSubtitle: string;
  serviceDescription: string;
  serviceIcon: LucideIcon;
  serviceTags: ServiceTag[];
  stats: ServiceStat[];
  accentColor: string;
  videoSrc?: string;
  posterSrc?: string;
  
  // Process Section (optional - can be replaced by custom children)
  processSteps?: ProcessStep[];
  
  // Deliverables Section (optional)
  deliverables?: Deliverable[];
  
  // FAQ Section (optional)
  faqItems?: FAQItem[];
  
  // Additional sections (optional)
  children?: ReactNode;
  
  // Current service slug for filtering "More Services"
  currentSlug: string;
}

// Stat Item Component with Count-Up Animation - Standardized
const StatItem = ({ 
  value, 
  label, 
  prefix = "", 
  suffix = "",
  isVisible,
  delay 
}: { 
  value: number; 
  label: string; 
  prefix?: string; 
  suffix?: string;
  isVisible: boolean;
  delay: number;
}) => {
  const count = useCountUp({
    end: value,
    isVisible,
    delay,
    duration: 2000,
  });
  
  return (
    <motion.div 
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (delay + 600) / 1000, duration: 0.5 }}
    >
      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
        {prefix}{count}{suffix}
      </div>
      <div className="text-[10px] sm:text-xs text-white/50 font-light leading-tight">
        {label}
      </div>
    </motion.div>
  );
};

const ServicePageLayout = ({
  serviceName,
  serviceTitle,
  serviceSubtitle,
  serviceDescription,
  serviceIcon: ServiceIcon,
  serviceTags,
  stats,
  accentColor,
  videoSrc = "/videos/services-background.mp4",
  posterSrc,
  processSteps,
  deliverables,
  faqItems,
  children,
  currentSlug,
}: ServicePageLayoutProps) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  // Generate poster path from video path if not provided
  const defaultPosterSrc = posterSrc || (videoSrc ? videoSrc.replace('/videos/', '/images/posters/').replace('.mp4', '.jpg') : '/images/hero-poster.jpg');

  const {
    videoRef,
    isVideoReady: videoLoaded,
    hasVideoError,
    shouldDisableVideo,
    videoProps,
    posterProps,
    ShimmerOverlay,
  } = useVideoPlayer({
    src: videoSrc,
    poster: defaultPosterSrc,
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);


  const otherServices = allServices.filter(s => s.slug !== currentSlug);

  // Calculate section numbers dynamically
  // Order: Children (custom sections) -> Deliverables -> Process (if exists) -> More Services -> FAQ -> Contact
  let sectionNumber = 1;
  const getNextSectionNumber = () => {
    const num = sectionNumber.toString().padStart(2, '0');
    sectionNumber++;
    return num;
  };

  // Reset section number for each render
  sectionNumber = 1;
  const childrenSectionNum = children ? getNextSectionNumber() : null;
  const deliverablesSectionNum = deliverables ? getNextSectionNumber() : null;
  const processSectionNum = processSteps && processSteps.length > 0 ? getNextSectionNumber() : null;
  const faqSectionNum = faqItems ? getNextSectionNumber() : null;
  const moreServicesSectionNum = getNextSectionNumber();
  const contactSectionNum = getNextSectionNumber();

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      {/* Hero Section */}
      <main className="p-1 sm:p-1 md:p-2 bg-[#0A0A0A]" id="hero">
        <div className="relative min-h-[100svh] sm:min-h-[calc(100vh-2rem)] flex flex-col justify-between overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl">
          {/* Background Layer - Video with Fallback */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Fallback Image - 즉시 표시 */}
            <img
              {...posterProps}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ 
                ...posterProps.style,
                filter: "brightness(0.35)"
              }}
              fetchPriority="high"
              decoding="async"
            />

            {/* Shimmer loading overlay */}
            <ShimmerOverlay />
            
            {/* Video - 로딩 후 fade-in */}
            {!shouldDisableVideo && !hasVideoError && (
              <video
                ref={videoRef}
                {...videoProps}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ 
                  ...videoProps.style,
                  filter: "brightness(0.35)",
                  WebkitAppearance: 'none',
                }}
              >
                <source src={`${videoSrc}#t=0.001`} type="video/mp4" />
              </video>
            )}
            
            {/* Dark overlay gradient - 강도 조절 */}
            <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.5)] via-[hsl(0,0%,4%,0.2)] to-[hsl(0,0%,4%,0.95)]" />
            
            {/* Accent color overlay */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{ background: `radial-gradient(ellipse at 50% 0%, ${accentColor} 0%, transparent 60%)` }}
            />
          </div>

          {/* Back Button */}
          <motion.button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-3 sm:top-8 sm:left-6 md:left-10 z-20 flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 backdrop-blur-sm active:scale-[0.97] min-h-[40px] sm:min-h-[44px]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <ArrowLeft className="w-4 h-4 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium">Back</span>
          </motion.button>

          {/* Floating Service Tags - Desktop */}
          {serviceTags.slice(0, 6).map((tag, index) => {
            const positions = [
              "top-[15%] left-[5%]",
              "top-[35%] left-[4%]",
              "top-[55%] left-[6%]",
              "top-[18%] right-[6%]",
              "top-[42%] right-[5%]",
              "top-[66%] right-[7%]",
            ];
            return (
              <motion.div
                key={index}
                className={`absolute ${positions[index]} hidden lg:block z-10`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
              >
                <span className="font-sans px-4 py-2 text-xs whitespace-nowrap rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/70 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300">
                  {tag.label}
                </span>
              </motion.div>
            );
          })}

          {/* Main Content - Centered */}
          <div className="flex-1 flex items-center justify-center relative z-10 px-4 sm:px-6 pt-16 sm:pt-8 pb-4">
            <div className="max-w-7xl mx-auto text-center">
              {/* Service Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border mb-3 sm:mb-6"
                style={{ borderColor: `${accentColor}50`, backgroundColor: `${accentColor}10` }}
              >
                <ServiceIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: accentColor }} />
                <span className="text-[11px] sm:text-sm" style={{ color: accentColor }}>{serviceName}</span>
              </motion.div>

              {/* Main Headline - Standardized */}
              <motion.h1 
                className="font-sans text-display-hero mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-white">{serviceTitle}</span>
                <br />
                <span style={{ color: accentColor }}>{serviceSubtitle}</span>
              </motion.h1>

              {/* Description - Standardized */}
              <motion.p 
                className="text-body-base sm:text-body-lg text-white/60 max-w-3xl mx-auto mb-6 sm:mb-8 font-light tracking-wide leading-relaxed px-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {serviceDescription}
              </motion.p>

              {/* CTA Button - Standardized */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <CalendlyButton 
                  className="group relative inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 font-medium text-sm rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 border border-white/30 active:scale-[0.97] min-h-[48px]"
                  style={{ backgroundColor: accentColor, color: '#fff' }}
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <Calendar className="w-4 h-4" />
                  <span>Book a Meeting</span>
                </CalendlyButton>
              </motion.div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="relative z-10 py-4 sm:py-6">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, index) => (
                  <StatItem 
                    key={index}
                    value={stat.value}
                    label={stat.label}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    isVisible={isVisible}
                    delay={index * 100}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Client Logo Marquee */}
          <div className="relative z-10 border-t border-white/10 py-3 sm:py-4 overflow-hidden">
            <div className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 flex items-center gap-2 text-white/40 text-[10px] sm:text-xs z-20">
              <span className="number-badge">01</span>
            </div>

            <div className="flex items-center logo-marquee-slow ml-12 sm:ml-16">
              {[...clientLogos, ...clientLogos].map((client, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-1.5 sm:gap-2 mx-1.5 sm:mx-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-zinc-900/80 rounded-full border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    loading="lazy"
                    decoding="async"
                    className={`h-3.5 w-3.5 sm:h-5 sm:w-5 object-contain flex-shrink-0 ${client.noInvert ? 'opacity-90' : 'brightness-0 invert opacity-80'}`}
                  />
                  <span className="text-white/70 text-[10px] sm:text-xs font-medium whitespace-nowrap">
                    {client.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-20 sm:bottom-24 right-4 sm:right-8 z-10 flex items-center gap-2 sm:gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="text-white/40 text-[11px] sm:text-sm font-medium">scroll</span>
            <ChevronDown className="w-4 h-4 sm:w-4 sm:h-4 text-white/40 animate-bounce" />
          </motion.div>
        </div>
      </main>

      {/* Additional Content Sections */}
      {children}

      {/* Deliverables Section - Minimal Agency Style */}
      {deliverables && deliverables.length > 0 && (
        <section className="bg-[#0A0A0A]">
          <div className="border-t border-white/[0.06]">
            <SectionHeader number={deliverablesSectionNum!} title="What You Get" badge="Deliverables" />
            
            <div className="py-8 sm:py-12 md:py-16">
              <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {deliverables.map((deliverable) => (
                    <div
                      key={deliverable.title}
                      className="p-5 sm:p-6 rounded-2xl border border-white/[0.06] bg-[#0D0D0D] hover:border-white/[0.12] transition-all duration-300"
                    >
                      <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2.5">
                        <div 
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: accentColor }}
                        />
                        {deliverable.title}
                      </h3>
                      <ul className="space-y-2.5">
                        {deliverable.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-white/50 text-xs leading-relaxed">
                            <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-violet-400/60" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Process Section - Conditional */}
      {processSteps && processSteps.length > 0 && (
        <section className="bg-[#0F0F0F]" id="process">
          <div className="border-t border-white/10">
            <SectionHeader number={processSectionNum!} title="Process" badge="How We Work" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-white/10">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === processSteps.length - 1;
                
                return (
                  <div
                    key={step.number}
                    className="group relative p-4 sm:p-5 md:p-6 transition-all duration-300 hover:bg-white/5 active:scale-[0.98] sm:border-r sm:border-white/10 sm:last:border-r-0"
                  >
                    {/* Arrow indicator between steps - Desktop */}
                    {!isLast && (
                      <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                        <ArrowRight 
                          className="w-6 h-6 drop-shadow-lg" 
                          style={{ color: accentColor }}
                          strokeWidth={2.5}
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
                      <span 
                        className="text-[11px] sm:text-xs font-mono tracking-widest"
                        style={{ color: accentColor }}
                      >
                        {step.number}
                      </span>
                      <Icon 
                        className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white/40 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300" 
                        strokeWidth={1.5} 
                      />
                    </div>
                    
                    <h3 className="text-[15px] sm:text-base font-semibold text-white mb-2 sm:mb-2">
                      {step.title}
                    </h3>
                    
                    <p className="text-white/50 text-[13px] sm:text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section - Minimal Agency Style */}
      {faqItems && faqItems.length > 0 && (
        <section className="bg-[#0A0A0A]">
          <div className="border-t border-white/[0.06]">
            <SectionHeader number={faqSectionNum!} title="FAQ" badge="Common Questions" />
            
            <div className="py-8 sm:py-12 md:py-16">
              <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-4xl">
                <Accordion type="single" collapsible className="space-y-2">
                  {faqItems.map((item, index) => (
                    <AccordionItem 
                      key={index}
                      value={`item-${index}`}
                      className="border border-white/[0.06] rounded-2xl bg-[#0D0D0D] px-5 overflow-hidden data-[state=open]:border-white/[0.12] transition-all duration-300"
                    >
                      <AccordionTrigger className="text-left text-white hover:no-underline py-4 text-sm">
                        <span className="flex items-center gap-3">
                          <ChevronRight className="w-4 h-4 flex-shrink-0 text-violet-400/60" />
                          <span>{item.question}</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-white/50 text-sm pb-5 pl-7 leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* More Services Section */}
      <section className="bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <SectionHeader number={moreServicesSectionNum} title="More Services" badge="Explore" />
          <div 
            className="grid grid-cols-2 lg:grid-cols-4"
          >
            {otherServices.map((service, index) => (
              <div
                key={service.slug}
                className="border-b border-r border-white/10 [&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0 [&:nth-last-child(-n+2)]:border-b-0 lg:[&:nth-last-child(-n+4)]:border-b-0"
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="group relative block p-4 sm:p-5 md:p-6 lg:p-8 h-full transition-all duration-500 overflow-hidden active:scale-[0.97] min-h-[100px] sm:min-h-[120px]"
                >
                  {/* Hover background gradient */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ 
                      background: `linear-gradient(135deg, ${service.color}15 0%, transparent 60%)` 
                    }}
                  />
                  
                  {/* Glow effect on hover */}
                  <div 
                    className="absolute -top-20 -left-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                    style={{ backgroundColor: service.color }}
                  />
                  
                  <div className="relative z-10">
                    {/* Color indicator with pulse effect */}
                    <div className="relative mb-3 sm:mb-5">
                      <div 
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full group-hover:scale-110 transition-all duration-300"
                        style={{ backgroundColor: service.color }}
                      />
                      <div 
                        className="absolute inset-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full opacity-0 group-hover:opacity-50 group-hover:animate-ping"
                        style={{ backgroundColor: service.color }}
                      />
                    </div>
                    
                    {/* Service title */}
                    <h3 className="text-white font-medium text-[13px] sm:text-lg mb-2 sm:mb-3 group-hover:translate-x-1 transition-transform duration-300 line-clamp-2 leading-snug">
                      {service.title}
                    </h3>
                    
                    {/* Arrow with enhanced animation */}
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="text-[10px] sm:text-xs text-white/40 group-hover:text-white/60 transition-colors duration-300 uppercase tracking-wider">
                        Explore
                      </span>
                      <ArrowRight 
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/30 group-hover:text-white/80 group-hover:translate-x-2 transition-all duration-300" 
                      />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-[#121212]" id="contact">
        <ContactFormSection sectionNumber={contactSectionNum} />
      </section>

      {/* CTA Banner */}
      <CTABannerSection />

      {/* Footer Links */}
      <FooterLinksSection />

      {/* Footer */}
      <div className="border-t border-white/10">
        <Footer />
      </div>
    </div>
  );
};

export default ServicePageLayout;