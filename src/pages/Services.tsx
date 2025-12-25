import { motion } from "framer-motion";
import { ArrowRight, Compass, Users, AtSign, Mic2, MessageCircle, Newspaper, ChevronDown, Search, Target, Rocket, TrendingUp } from "lucide-react";
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
    icon: Compass,
    title: "Go-To-Market Strategy",
    description: "Positioning, messaging, and audience clarity to launch with direction and narrative focus.",
    link: "/services/gtm"
  },
  {
    icon: Users,
    title: "Community Management",
    description: "Complete Discord community infrastructure to build sticky, scalable and self-sustaining growth.",
    link: "/services/community"
  },
  {
    icon: AtSign,
    title: "Social Media Marketing",
    description: "Content strategy and execution on X to grow visibility and engage with your ecosystem in real time.",
    link: "/services/social-media"
  },
  {
    icon: Mic2,
    title: "Influencer Strategy",
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <Link 
        to={service.link}
        className={`group block h-full p-8 md:p-12 transition-all duration-300 hover:bg-white/[0.03] relative overflow-hidden
          ${!isRightColumn ? 'border-r border-white/10' : ''}
          ${!isLastRow ? 'border-b border-white/10' : ''}
        `}
      >
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-emerald-500/50 via-emerald-500/20 to-transparent" />
        </div>
        
        <div className="flex flex-col h-full min-h-[240px] relative">
          <motion.div 
            className="mb-8 relative"
            whileHover={{ scale: 1.15, rotate: 8 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
          >
            <Icon 
              className="w-10 h-10 md:w-12 md:h-12 text-white/60 stroke-[1.5] transition-colors duration-300 group-hover:text-emerald-400" 
            />
            <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 -z-10 scale-150 bg-emerald-500/30" />
          </motion.div>
          
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight group-hover:text-white transition-colors">
            {service.title}
          </h3>
          
          <p className="text-white/50 text-sm md:text-base leading-relaxed mb-6 flex-grow group-hover:text-white/70 transition-colors">
            {service.description}
          </p>
          
          <motion.div 
            className="flex items-center gap-2 text-white/40 group-hover:text-emerald-400 transition-colors duration-300"
            whileHover={{ x: 4 }}
          >
            <span className="text-sm font-medium">Learn more</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
          </motion.div>
        </div>
      </Link>
    </motion.div>
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
          <motion.span 
            className="inline-block px-4 py-1.5 text-xs text-emerald-400 border border-emerald-400/30 rounded-full mb-8 tracking-widest"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            SERVICES
          </motion.span>
          
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[0.95] tracking-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Gr<span className="serif-italic text-emerald-400">o</span>wth
            <br />
            <span className="text-white/60">Solutions</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Strategic solutions to launch and grow your Web3 project in the Korean market.
          </motion.p>
          
          {/* Stats */}
          <motion.div 
            className="flex flex-wrap justify-center gap-8 md:gap-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">{projectsCount}+</div>
              <div className="text-sm text-white/50 mt-1">Projects Launched</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">{kolCount}+</div>
              <div className="text-sm text-white/50 mt-1">KOL Network</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">{mediaCount}+</div>
              <div className="text-sm text-white/50 mt-1">Media Partners</div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-white/40 tracking-wider">SCROLL</span>
            <ChevronDown className="w-5 h-5 text-white/40" />
          </motion.div>
        </motion.div>
      </section>
      
      {/* Services Section - 01 */}
      <section className="relative z-10 bg-[#0F0F0F] border-t border-white/10">
        <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
          <div className="flex items-baseline gap-6 md:gap-10">
            <span className="text-[10px] md:text-xs text-emerald-400 font-mono tracking-widest">01</span>
            <h2 className="text-lg md:text-xl font-medium text-white">Services</h2>
          </div>
          <span className="text-xs text-emerald-400 tracking-wider hidden sm:block px-3 py-1 border border-emerald-400/40 rounded-full">
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
            <div className="lg:sticky lg:top-24 p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Why Ium Labs
                </h2>
                
                <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8">
                  We're the Korean Web3 marketing agency that builds the bridge between your project and the Korean market. Founded by former executives from Binance and KuCoin.
                </p>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link 
                    to="/contact"
                    className="group inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 text-sm font-medium tracking-wide hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:gap-3 hover:shadow-lg hover:shadow-emerald-500/30 rounded-lg"
                  >
                    CONNECT WITH US
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                
                {/* Decorative element */}
                <div className="mt-12 md:mt-16 flex justify-center">
                  <motion.div 
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                
                {/* Additional Stats */}
                <div className="mt-12 grid grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="text-2xl md:text-3xl font-bold text-white">$500M+</div>
                    <div className="text-sm text-white/50">TGE Support</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="text-2xl md:text-3xl font-bold text-white">600+</div>
                    <div className="text-sm text-white/50">Creator Network</div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Process Section - 02 */}
      <section className="relative z-10 bg-[#121212] border-t border-white/10">
        <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
          <div className="flex items-baseline gap-6 md:gap-10">
            <span className="text-[10px] md:text-xs text-emerald-400 font-mono tracking-widest">02</span>
            <h2 className="text-lg md:text-xl font-medium text-white">Process</h2>
          </div>
          <span className="text-xs text-emerald-400 tracking-wider hidden sm:block px-3 py-1 border border-emerald-400/40 rounded-full">
            How We Work
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            const isLast = index === phases.length - 1;
            
            return (
              <motion.div
                key={phase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group p-8 md:p-10 lg:p-12 transition-all duration-300 hover:bg-white/[0.02] ${
                  !isLast ? "lg:border-r border-white/10" : ""
                } ${index < 2 ? "border-b lg:border-b-0 border-white/10" : ""} ${
                  index === 2 ? "border-b lg:border-b-0 border-white/10" : ""
                }`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-mono text-emerald-400/60">0{index + 1}</span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                
                <Icon className="w-10 h-10 mb-6 text-white/40 group-hover:text-emerald-400 transition-colors duration-300" strokeWidth={1.5} />
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  {phase.title}
                </h3>
                
                <p className="text-white/50 text-sm leading-relaxed">
                  {phase.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>
      
      {/* FAQ Section - 03 */}
      <section className="relative z-10 bg-[#0F0F0F] border-t border-white/10">
        <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
          <div className="flex items-baseline gap-6 md:gap-10">
            <span className="text-[10px] md:text-xs text-emerald-400 font-mono tracking-widest">03</span>
            <h2 className="text-lg md:text-xl font-medium text-white">FAQ</h2>
          </div>
          <span className="text-xs text-emerald-400 tracking-wider hidden sm:block px-3 py-1 border border-emerald-400/40 rounded-full">
            Common Questions
          </span>
        </div>
        
        <div className="max-w-4xl mx-auto p-6 md:p-12">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <AccordionItem 
                  value={`item-${index}`}
                  className="bg-white/[0.02] border border-white/10 rounded-xl px-6 data-[state=open]:border-emerald-500/30 transition-colors"
                >
                  <AccordionTrigger className="text-left text-base font-medium text-white hover:text-emerald-400 transition-colors py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/60 pb-5 text-sm leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>
      
      {/* Contact Section - 04 */}
      <div className="border-t border-white/10 bg-[#121212]">
        <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
          <div className="flex items-baseline gap-6 md:gap-10">
            <span className="text-[10px] md:text-xs text-emerald-400 font-mono tracking-widest">04</span>
            <h2 className="text-lg md:text-xl font-medium text-white">Contact</h2>
          </div>
          <span className="text-xs text-emerald-400 tracking-wider hidden sm:block px-3 py-1 border border-emerald-400/40 rounded-full">
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
