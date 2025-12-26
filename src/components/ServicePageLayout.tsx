import { useEffect, useState, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, ChevronDown, LucideIcon, ArrowLeft, Check, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormSection from "@/components/ContactFormSection";
import CalendlyButton from "@/components/CalendlyButton";
import SectionHeader from "@/components/SectionHeader";
import { useCountUp } from "@/hooks/useCountUp";
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
  { slug: "gtm-strategy", title: "GTM Strategy", color: "#10B981" },
  { slug: "community", title: "Community", color: "#5865F2" },
  { slug: "social-media", title: "Social Media", color: "#EC4899" },
  { slug: "influencer", title: "Influencer", color: "#F59E0B" },
  { slug: "yap", title: "Yap Strategy", color: "#22D3EE" },
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
  
  // Process Section
  processSteps: ProcessStep[];
  
  // Deliverables Section (optional)
  deliverables?: Deliverable[];
  
  // FAQ Section (optional)
  faqItems?: FAQItem[];
  
  // Additional sections (optional)
  children?: ReactNode;
  
  // Current service slug for filtering "More Services"
  currentSlug: string;
}

// Stat Item Component with Count-Up Animation
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
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
        {prefix}{count}{suffix}
      </div>
      <div className="text-xs sm:text-sm text-white/50 font-light">
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
  processSteps,
  deliverables,
  faqItems,
  children,
  currentSlug,
}: ServicePageLayoutProps) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const otherServices = allServices.filter(s => s.slug !== currentSlug);

  // Calculate section numbers dynamically
  // Order: Children (custom sections) -> Deliverables -> Process -> More Services -> FAQ -> Contact
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
  const processSectionNum = getNextSectionNumber();
  const moreServicesSectionNum = getNextSectionNumber();
  const faqSectionNum = faqItems ? getNextSectionNumber() : null; // FAQ always after More Services
  const contactSectionNum = getNextSectionNumber();

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      {/* Hero Section */}
      <main className="p-0.5 sm:p-1 md:p-2 bg-[#0A0A0A]" id="hero">
        <div className="relative min-h-[calc(100vh-2rem)] flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl">
          {/* Background Layer - Video */}
          <div className="absolute inset-0 overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.35)" }}
              onLoadedMetadata={(e) => {
                e.currentTarget.currentTime = 0;
              }}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
            
            {/* Dark overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.3)] via-transparent to-[hsl(0,0%,4%,0.95)]" />
            
            {/* Accent color overlay */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{ background: `radial-gradient(ellipse at 50% 0%, ${accentColor} 0%, transparent 60%)` }}
            />
          </div>

          {/* Back Button */}
          <motion.button
            onClick={() => navigate(-1)}
            className="absolute top-24 left-6 md:left-10 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
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
          <div className="flex-1 flex items-center justify-center relative z-10 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto text-center">
              {/* Service Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
                style={{ borderColor: `${accentColor}50`, backgroundColor: `${accentColor}10` }}
              >
                <ServiceIcon className="w-4 h-4" style={{ color: accentColor }} />
                <span className="text-sm" style={{ color: accentColor }}>{serviceName}</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1 
                className="font-sans text-[10vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] font-bold leading-[1.1] tracking-[-0.02em] mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-white">{serviceTitle}</span>
                <br />
                <span style={{ color: accentColor }}>{serviceSubtitle}</span>
              </motion.h1>

              {/* Description */}
              <motion.p 
                className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-8 font-light tracking-wide leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {serviceDescription}
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <CalendlyButton 
                  className="group relative inline-flex items-center gap-3 px-8 py-4 font-medium text-sm rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
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
            <div className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 flex items-center gap-2 text-white/40 text-[10px] sm:text-xs z-20">
              <span className="number-badge">01</span>
            </div>

            <div className="flex items-center logo-marquee-slow ml-14 sm:ml-16">
              {[...clientLogos, ...clientLogos].map((client, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-1.5 sm:gap-2 mx-1.5 sm:mx-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-zinc-900/80 rounded-full border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    className={`h-4 w-4 sm:h-5 sm:w-5 object-contain flex-shrink-0 ${client.noInvert ? 'opacity-90' : 'brightness-0 invert opacity-80'}`}
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
            <span className="text-white/40 text-xs sm:text-sm font-medium">scroll</span>
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-white/40 animate-bounce" />
          </motion.div>
        </div>
      </main>

      {/* Additional Content Sections */}
      {children}

      {/* Deliverables Section */}
      {deliverables && deliverables.length > 0 && (
        <section className="scroll-reveal bg-[#0F0F0F]">
          <div className="border-t border-white/10">
            <SectionHeader number={deliverablesSectionNum!} title="What You Get" badge="Deliverables" />
            
            <div className="py-16 md:py-20">
              <div className="container mx-auto px-6 lg:px-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {deliverables.map((deliverable, index) => (
                    <motion.div
                      key={deliverable.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 transition-all"
                    >
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: accentColor }}
                        />
                        {deliverable.title}
                      </h3>
                      <ul className="space-y-3">
                        {deliverable.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-white/60 text-sm">
                            <Check 
                              className="w-4 h-4 mt-0.5 flex-shrink-0" 
                              style={{ color: accentColor }} 
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      <section className="scroll-reveal bg-[#0F0F0F]" id="process">
        <div className="border-t border-white/10">
          <SectionHeader number={processSectionNum} title="Process" badge="How We Work" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === processSteps.length - 1;
              const isOdd = index % 2 === 1;
              
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className={`group p-8 md:p-10 transition-all duration-300 hover:bg-white/5 ${
                    !isLast ? "lg:border-r border-white/10" : ""
                  } ${isOdd ? "md:border-l lg:border-l-0 border-white/10" : ""} ${
                    index < 2 ? "border-b lg:border-b-0 border-white/10" : ""
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span 
                      className="text-xs font-mono tracking-widest"
                      style={{ color: accentColor }}
                    >
                      {step.number}
                    </span>
                    <Icon 
                      className="w-6 h-6 text-white/40 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300" 
                      strokeWidth={1.5} 
                    />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-white/50 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* More Services Section */}
      <section className="scroll-reveal bg-[#121212]">
        <div className="border-t border-white/10">
          <SectionHeader number={moreServicesSectionNum} title="More Services" badge="Explore" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {otherServices.map((service, index) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group p-8 md:p-10 transition-all duration-300 hover:bg-white/5 border-b sm:border-b-0 sm:border-r border-white/10 last:border-r-0"
              >
                <div 
                  className="w-3 h-3 rounded-full mb-4 group-hover:scale-125 transition-transform"
                  style={{ backgroundColor: service.color }}
                />
                <h3 className="text-white font-medium mb-2 group-hover:text-white/90">
                  {service.title}
                </h3>
                <ArrowRight 
                  className="w-4 h-4 text-white/30 group-hover:text-white/70 group-hover:translate-x-1 transition-all" 
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Always last before Contact */}
      {faqItems && faqItems.length > 0 && (
        <section className="scroll-reveal bg-[#0F0F0F]">
          <div className="border-t border-white/10">
            <SectionHeader number={faqSectionNum!} title="FAQ" badge="Common Questions" />
            
            <div className="py-16 md:py-20">
              <div className="container mx-auto px-6 lg:px-16 max-w-4xl">
                <Accordion type="single" collapsible className="space-y-4">
                  {faqItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <AccordionItem 
                        value={`item-${index}`}
                        className="border border-white/10 rounded-xl bg-white/5 px-6 overflow-hidden"
                      >
                        <AccordionTrigger className="text-left text-white hover:no-underline py-5">
                          <span className="flex items-center gap-3">
                            <ChevronRight 
                              className="w-4 h-4 flex-shrink-0 transition-transform" 
                              style={{ color: accentColor }}
                            />
                            {item.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-white/60 pb-5 pl-7">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="scroll-reveal bg-[#0F0F0F]" id="contact">
        <ContactFormSection sectionNumber={contactSectionNum} />
      </section>

      {/* Footer */}
      <div className="border-t border-white/10">
        <Footer />
      </div>
    </div>
  );
};

export default ServicePageLayout;