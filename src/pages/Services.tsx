import { ArrowRight, Compass, Users, Search, Mic2, MessageCircle, Newspaper, ChevronDown, Target, Rocket, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormSection from "@/components/ContactFormSection";
import { usePageTitle } from "@/hooks/usePageTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const services = [
  {
    icon: Rocket,
    title: "GTM Strategy",
    description: "Strategic market entry planning and execution for Web3 projects launching in the Korean market.",
    link: "/services/gtm"
  },
  {
    icon: Compass,
    title: "Branding/Website",
    description: "Distinctive brand identity and high-performance websites for Web3 projects. From logo design to custom development.",
    link: "/services/branding"
  },
  {
    icon: Search,
    title: "SEO/Paid Ads",
    description: "Drive qualified traffic through search optimization and targeted advertising across Google, Twitter/X, and crypto-native platforms.",
    link: "/services/seo-ads"
  },
  {
    icon: Target,
    title: "Offline Event",
    description: "End-to-end event planning, venue coordination, and on-ground activation for impactful Web3 experiences.",
    link: "/services/offline-event"
  },
  {
    icon: Users,
    title: "Community Management",
    description: "Complete Discord & Telegram community infrastructure to build sticky, scalable and self-sustaining growth.",
    link: "/services/community"
  },
  {
    icon: Search,
    title: "Deep Research",
    description: "Data-driven market research for the Korean crypto market, distributed through our media and KOL network.",
    link: "/services/deep-research"
  },
  {
    icon: Mic2,
    title: "Influencer/KOL",
    description: "Influencer campaigns powered by top crypto voices aligned with your message and goals.",
    link: "/services/influencer"
  },
  {
    icon: MessageCircle,
    title: "Yap Strategy",
    description: "Targeted campaigns through a 600+ creator network designed to drive awareness and traction across Crypto X.",
    link: "/services/yap"
  },
  {
    icon: Newspaper,
    title: "PR",
    description: "Narrative development and media placements to get your story published and seen in the right places.",
    link: "/services/pr"
  }
];

const phases = [
  {
    title: "Discovery",
    icon: Search,
    description: "Deep-dive into your project, market positioning, and Korean audience fit."
  },
  {
    title: "Strategy",
    icon: Target,
    description: "Build GTM roadmap, channel mix, and localized messaging framework."
  },
  {
    title: "Launch",
    icon: Rocket,
    description: "Execute campaigns across KOLs, community, PR, and social channels."
  },
  {
    title: "Scale",
    icon: TrendingUp,
    description: "Optimize, iterate, and expand based on performance data."
  }
];

const faqs = [
  {
    question: "What is Web3 marketing?",
    answer: "Web3 marketing specializes in blockchain, cryptocurrency, NFT, and DeFi projects. It includes community building, influencer marketing, PR, and social media management tailored specifically for the Web3 ecosystem."
  },
  {
    question: "How long does a marketing campaign take?",
    answer: "Campaign duration varies based on project scope and goals. Typically, initial setup takes 1-2 weeks, with active campaigns running 1-3 months. We recommend 6+ months for sustainable community growth."
  },
  {
    question: "What types of projects do you work with?",
    answer: "We work with NFT collections, DeFi protocols, GameFi/P2E games, Layer 1/Layer 2 blockchains, crypto exchanges, DAOs, and more. We also welcome global projects looking to enter the Korean market."
  },
  {
    question: "How much does marketing cost?",
    answer: "Pricing depends on project scope, goals, and required services. We provide custom quotes after a free consultation to analyze your project and recommend the optimal package."
  },
  {
    question: "How do you measure success?",
    answer: "We track community growth rate, social media engagement, website traffic, conversion rates, PR exposure, and more. We provide transparent weekly/monthly reports sharing quantifiable results."
  },
  {
    question: "Do you offer Korea-specific services?",
    answer: "Yes, we specialize in Korean market entry with localized marketing across KakaoTalk, Naver Blog, Korean crypto media, and local KOL networks. We also provide Korean community management."
  }
];

// Count Up Hook
const useCountUp = (end: number, duration: number = 2000, shouldStart: boolean = true) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!shouldStart) return;
    
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      countRef.current = Math.floor(easeOut * end);
      setCount(countRef.current);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, shouldStart]);

  return count;
};

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const Icon = service.icon;
  const isRightColumn = index % 2 === 1;
  const isLastRow = index >= 4;
  
  return (
    <div className="group">
      <Link 
        to={service.link}
        className={`block h-full p-6 md:p-8 transition-all duration-300 hover:bg-white/[0.03] hover:-translate-y-1 relative overflow-hidden min-h-[44px]
          ${!isRightColumn ? 'border-r border-white/10' : ''}
          ${!isLastRow ? 'border-b border-white/10' : ''}
        `}
      >
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-emerald-500/50 via-emerald-500/20 to-transparent" />
        </div>
        
        <div className="flex flex-col h-full min-h-[180px] md:min-h-[200px] relative">
          <div className="mb-5 relative group-hover:scale-110 transition-transform duration-300">
            <Icon 
              className="w-8 h-8 md:w-10 md:h-10 text-white/60 stroke-[1.5] transition-colors duration-300 group-hover:text-emerald-400" 
            />
            <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 -z-10 scale-150 bg-emerald-500/30" />
          </div>
          
          <h3 className="text-lg md:text-xl font-semibold text-white mb-3 leading-tight group-hover:text-white transition-colors">
            {service.title}
          </h3>
          
          <p className="text-white/50 text-sm leading-relaxed mb-4 flex-grow group-hover:text-white/70 transition-colors">
            {service.description}
          </p>
          
          <div className="flex items-center gap-2 text-white/40 group-hover:text-emerald-400 transition-colors duration-300">
            <span className="text-xs font-medium">Learn more</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </Link>
    </div>
  );
};

const Services = () => {
  usePageTitle("Services");
  const [heroInView, setHeroInView] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeroInView(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  const projectsCount = useCountUp(18, 2000, heroInView);
  const kolCount = useCountUp(120, 2000, heroInView);
  const mediaCount = useCountUp(50, 2000, heroInView);
  
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-[70vh] flex flex-col justify-center items-center overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.3)" }}
          >
            <source src="/videos/services-background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/15 via-transparent to-[#0A0A0A]" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-teal-500/5" />
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-20 text-center">
          <span className="inline-block px-3 py-1 text-[10px] text-emerald-400 border border-emerald-400/30 rounded-full mb-6 tracking-widest uppercase">
            Services
          </span>
          
          <h1 className="text-display-hero font-light text-white leading-[1.05] tracking-tight mb-4">
            Gr<span className="serif-italic text-emerald-400">o</span>wth
            <br />
            <span className="text-white/60">Solutions</span>
          </h1>
          
          <p className="text-body-lg text-white/60 max-w-xl mx-auto mb-8">
            Strategic solutions to launch and grow your Web3 project in the Korean market.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">{projectsCount}+</div>
              <div className="text-caption text-white/50 mt-1">Projects Launched</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">{kolCount}+</div>
              <div className="text-caption text-white/50 mt-1">KOL Network</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">{mediaCount}+</div>
              <div className="text-caption text-white/50 mt-1">Media Partners</div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-1.5 animate-bounce">
            <span className="text-[10px] text-white/40 tracking-wider uppercase">Scroll</span>
            <ChevronDown className="w-4 h-4 text-white/40" />
          </div>
        </div>
      </section>
      
      {/* Services Section - 01 */}
      <section className="relative z-10 bg-[#0F0F0F] border-t border-white/10">
        <div className="flex items-baseline justify-between p-4 md:px-8 md:py-5 border-b border-white/10">
          <div className="flex items-baseline gap-4 md:gap-8">
            <span className="text-label text-emerald-400 font-mono tracking-widest">01</span>
            <h2 className="text-base md:text-lg font-medium text-white">Services</h2>
          </div>
          <span className="text-label text-emerald-400 tracking-wider hidden sm:block px-2.5 py-1 border border-emerald-400/40 rounded-full uppercase">
            What We Offer
          </span>
        </div>

        {/* Main 2-Column Layout */}
        <div className="flex flex-col lg:flex-row">
          {/* Left: Service Grid (2/3) */}
          <div className="w-full lg:w-2/3 border-r-0 lg:border-r border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {services.map((service, index) => (
                <ServiceCard key={service.title} service={service} index={index} />
              ))}
            </div>
          </div>
          
          {/* Right: Sticky CTA Panel (1/3) */}
          <div className="w-full lg:w-1/3">
            <div className="lg:sticky lg:top-24 p-6 md:p-8">
              <div>
                <h2 className="text-display-sm font-bold text-white mb-3">
                  Why Ium Labs
                </h2>
                
                <p className="text-white/50 text-body leading-relaxed mb-6">
                  We're the Korean Web3 marketing agency that builds the bridge between your project and the Korean market.
                </p>
                
                <div>
                  <Link 
                    to="/contact"
                    className="group inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-2.5 text-sm font-medium tracking-wide hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:gap-3 hover:shadow-lg hover:shadow-emerald-500/30 rounded-lg hover:scale-[1.02] active:scale-[0.98] min-h-[44px]"
                  >
                    CONNECT WITH US
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                
                {/* Decorative element */}
                <div className="mt-8 md:mt-12 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 animate-spin" style={{ animationDuration: '20s' }} />
                </div>
                
                {/* Additional Stats */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-white">$500M+</div>
                    <div className="text-caption text-white/50">TGE Support</div>
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-white">600+</div>
                    <div className="text-caption text-white/50">Creator Network</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Process Section - 02 */}
      <section className="relative z-10 bg-[#121212] border-t border-white/10">
        <div className="flex items-baseline justify-between p-4 md:px-8 md:py-5 border-b border-white/10">
          <div className="flex items-baseline gap-4 md:gap-8">
            <span className="text-label text-emerald-400 font-mono tracking-widest">02</span>
            <h2 className="text-base md:text-lg font-medium text-white">Process</h2>
          </div>
          <span className="text-label text-emerald-400 tracking-wider hidden sm:block px-2.5 py-1 border border-emerald-400/40 rounded-full uppercase">
            How We Work
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            const isLast = index === phases.length - 1;
            
            return (
              <div
                key={phase.title}
                className={`group p-6 md:p-8 transition-all duration-300 hover:bg-white/[0.02] min-h-[44px] ${
                  !isLast ? "lg:border-r border-white/10" : ""
                } ${index < 2 ? "border-b lg:border-b-0 border-white/10" : ""} ${
                  index === 2 ? "border-b lg:border-b-0 border-white/10" : ""
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-label font-mono text-emerald-400/60">0{index + 1}</span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                
                <Icon className="w-8 h-8 mb-4 text-white/40 group-hover:text-emerald-400 transition-colors duration-300" strokeWidth={1.5} />
                
                <h3 className="text-base font-semibold text-white mb-2">
                  {phase.title}
                </h3>
                
                <p className="text-white/50 text-body-sm leading-relaxed">
                  {phase.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
      
      {/* FAQ Section - 03 */}
      <section className="relative z-10 bg-[#0F0F0F] border-t border-white/10">
        <div className="flex items-baseline justify-between p-4 md:px-8 md:py-5 border-b border-white/10">
          <div className="flex items-baseline gap-4 md:gap-8">
            <span className="text-label text-emerald-400 font-mono tracking-widest">03</span>
            <h2 className="text-base md:text-lg font-medium text-white">FAQ</h2>
          </div>
          <span className="text-label text-emerald-400 tracking-wider hidden sm:block px-2.5 py-1 border border-emerald-400/40 rounded-full uppercase">
            Common Questions
          </span>
        </div>
        
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <div key={index}>
                <AccordionItem 
                  value={`item-${index}`}
                  className="bg-white/[0.02] border border-white/10 rounded-lg px-4 data-[state=open]:border-emerald-500/30 transition-colors"
                >
                  <AccordionTrigger className="text-left text-body-lg font-medium text-white hover:text-emerald-400 transition-colors py-4 min-h-[44px]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/60 pb-4 text-body-sm leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </div>
      </section>
      
      {/* Contact Section - 04 */}
      <div className="border-t border-white/10 bg-[#121212]">
        <div className="flex items-baseline justify-between p-4 md:px-8 md:py-5 border-b border-white/10">
          <div className="flex items-baseline gap-4 md:gap-8">
            <span className="text-label text-emerald-400 font-mono tracking-widest">04</span>
            <h2 className="text-base md:text-lg font-medium text-white">Contact</h2>
          </div>
          <span className="text-label text-emerald-400 tracking-wider hidden sm:block px-2.5 py-1 border border-emerald-400/40 rounded-full uppercase">
            Get In Touch
          </span>
        </div>
        <ContactFormSection />
      </div>
      
      <Footer />
    </div>
  );
};

export default Services;
