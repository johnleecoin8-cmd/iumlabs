import { Palette, Globe, Layout, Sparkles, Eye, Layers, Brush, Monitor, Code, Figma, FileText, Zap, ArrowRight, ArrowUpRight, Check, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ServiceSchema from "@/components/ServiceSchema";

// Portfolio images
import bananagoPreview from "@/assets/portfolio/bananago-preview.png";
import thirdwebPreview from "@/assets/portfolio/thirdweb-preview.png";
import coinmercePreview from "@/assets/portfolio/coinmerce-preview.png";

// Branding service images
import brandingPalace from "@/assets/services/branding-palace.png";
import brandingWebsite from "@/assets/services/branding-website.png";
import websiteCreative from "@/assets/services/website-creative.png";

// Campaign gallery images for marquee
import openledgerEvent from "@/assets/campaigns/openledger-event.jpg";
import megaethLaunch from "@/assets/campaigns/megaeth-launch.jpg";
import triaLaunch from "@/assets/campaigns/tria-launch.jpg";
import fogoFest from "@/assets/campaigns/fogo-fest.avif";
import polygonConnect from "@/assets/campaigns/polygon-connect.png";
import storyWorkshop from "@/assets/campaigns/story-workshop.jpg";

const ACCENT_COLOR = "#8B5CF6";

const breadcrumbItems = [
  { name: "Home", url: "https://iumlabs.io" },
  { name: "Services", url: "https://iumlabs.io/services" },
  { name: "Branding & Website", url: "https://iumlabs.io/services/branding" }
];

// 4-Week Program Journey
const journeyPhases = [
  {
    week: "Week 1",
    title: "Deep Dive",
    subtitle: "Discovery",
    icon: Eye,
    activities: [
      "Research your niche & market",
      "Understand your tech stack",
      "Capture your unique vibes",
      "Define project goals"
    ],
    deliverables: ["Brand Discovery Report", "Moodboard"],
    quote: '"Understanding before creating."'
  },
  {
    week: "Week 2",
    title: "Look & Feel",
    subtitle: "Design",
    icon: Palette,
    activities: [
      "Craft your logo & icons",
      "Define color palette & gradients",
      "Select custom typography",
      "Build your unique brand DNA"
    ],
    deliverables: ["Logo Concepts", "Style Guide Draft"],
    quote: '"Every pixel tells your story."'
  },
  {
    week: "Week 3",
    title: "The Build",
    subtitle: "Development",
    icon: Layout,
    activities: [
      "Design responsive layouts",
      "Create interactive prototypes",
      "Build conversion-focused pages",
      "Add smooth animations"
    ],
    deliverables: ["Figma Prototype", "Design System"],
    quote: '"Where vision becomes reality."'
  },
  {
    week: "Week 4",
    title: "Blast Off",
    subtitle: "Launch",
    icon: Code,
    activities: [
      "Final polish & refinements",
      "Tech checks & optimization",
      "Launch preparation",
      "Official go-live!"
    ],
    deliverables: ["Live Website", "Brand Assets Package"],
    quote: '"From concept to live in 4 weeks."'
  }
];

const serviceTags: ServiceTag[] = [
  { label: "Brand Identity" },
  { label: "Logo Design" },
  { label: "Web Development" },
  { label: "UI/UX Design" },
  { label: "Design System" },
  { label: "Motion Graphics" },
];

const stats: ServiceStat[] = [
  { value: 14, label: "Brands Delivered", suffix: "" },
  { value: 21, label: "Websites Launched", suffix: "" },
  { value: 3.5, label: "Avg. Project Duration", suffix: " Weeks" },
  { value: 98, label: "Client Satisfaction", suffix: "%" },
];

const deliverables: Deliverable[] = [
  {
    title: "Brand Identity",
    items: [
      "The Basics: Logo kit (Primary, Secondary, Icons)",
      "The Vibe: Color palettes, gradients, and custom fonts",
      "The Rules: A simple Brand Guideline PDF so your team stays on track",
    ],
  },
  {
    title: "Website & Tech",
    items: [
      "Design: Fully responsive and interactive layouts",
      "Development: Clean code, fast loading, and SEO-ready",
      "Web3 Ready: Easy wallet connections and smooth animations",
    ],
  },
  {
    title: "Ongoing Support",
    items: [
      "Launch Assist: We're with you through go-live and beyond",
      "Quick Fixes: Fast turnaround on minor updates",
      "Growth Ready: Easy to scale as your project evolves",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "What's in the branding package?",
    answer: "Everything you need to look professional: logos, colors, fonts, and a guidebook on how to use them. We can also scale up to full visual systems if you're going big.",
  },
  {
    question: "Do you build websites from scratch?",
    answer: "Always. No generic templates here. We build custom sites that are optimized for speed and specifically designed for your project's goals.",
  },
  {
    question: "How long does the whole process take?",
    answer: "Our standard program runs 4 weeks from kickoff to launch. Need it faster? We can discuss rush options depending on your timeline.",
  },
];

// Portfolio showcase items (Featured Cases)
const featuredProjects = [
  { 
    title: "Bananago", 
    category: "Affiliate Platform",
    slug: "bananago",
    url: "https://bananago.kr",
    image: bananagoPreview,
    metric: { value: "40K+", label: "Monthly Users" },
    services: ["Brand Identity", "Web Design", "Development"],
    color: "yellow"
  },
  { 
    title: "Thirdweb", 
    category: "Developer Platform",
    slug: "thirdweb",
    url: "https://thirdweb.com",
    image: thirdwebPreview,
    metric: { value: "200K+", label: "Active Devs" },
    services: ["KR Localization", "Design System"],
    color: "purple"
  },
  { 
    title: "Coinmerce", 
    category: "Crypto Exchange",
    slug: "coinmerce",
    url: "https://coinmerce.io",
    image: coinmercePreview,
    metric: { value: "150K", label: "Accounts" },
    services: ["Branding", "UX Redesign"],
    color: "cyan"
  },
];

// Gallery images for marquee
const galleryImages = [
  { src: brandingPalace, alt: "Korean Palace Brand Concept", project: "Cultural Identity" },
  { src: brandingWebsite, alt: "Website Design Mockup", project: "Web Design" },
  { src: websiteCreative, alt: "Creative Website Layout", project: "UI/UX" },
  { src: openledgerEvent, alt: "OpenLedger Brand Launch", project: "OpenLedger" },
  { src: megaethLaunch, alt: "MegaETH Brand Materials", project: "MegaETH" },
  { src: triaLaunch, alt: "Tria Brand Identity", project: "Tria" },
  { src: fogoFest, alt: "FOGO Festival Branding", project: "FOGO" },
  { src: polygonConnect, alt: "Polygon Connect Event", project: "Polygon" },
  { src: storyWorkshop, alt: "Story Protocol Workshop", project: "Story" },
];

// Process Billboard Overlay Component (Homepage pattern)
const ProcessBillboardOverlay = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isMobile, shouldDisableHeavyAnimations } = useMobileOptimization();

  useEffect(() => {
    if (!isVisible || isPaused || isMobile || shouldDisableHeavyAnimations) return;
    const interval = setInterval(() => {
      setHoveredIndex(prev => prev === null ? 0 : (prev + 1) % journeyPhases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isVisible, isPaused, isMobile, shouldDisableHeavyAnimations]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2, rootMargin: '50px' });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="px-3 sm:px-4 md:px-8 lg:px-10 pt-3 sm:pt-4 md:pt-6 pb-3 sm:pb-4 md:pb-6">
      <div className="relative w-full h-[420px] sm:h-[400px] md:h-[420px] lg:h-[450px] rounded-lg md:rounded-xl overflow-hidden group">
        {/* Background Image */}
        <img 
          src={brandingWebsite} 
          alt="Branding & Website Design" 
          loading="lazy" 
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center" 
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        
        {/* 4-Sector Grid Overlay */}
        <div className="absolute inset-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {journeyPhases.map((phase, index) => {
            const Icon = phase.icon;
            const isHovered = hoveredIndex === index;
            const hasHover = hoveredIndex !== null;
            const stepColors = ['text-white/50', 'text-white/60', 'text-white/70', 'text-white/90'];

            return (
              <div
                key={index}
                className={`
                  relative flex flex-col items-center justify-center 
                  gap-0.5 sm:gap-1 p-2 sm:p-3 md:p-6
                  ${index === 0 || index === 2 ? 'border-r border-white/10' : ''}
                  ${index === 0 || index === 1 ? 'border-b border-white/10' : ''}
                  lg:border-r lg:border-b-0 lg:last:border-r-0
                  cursor-pointer active:scale-[0.97] transition-transform will-change-transform
                  ${isHovered && !isMobile ? 'bg-violet-500/20' : hasHover && !isMobile ? 'bg-black/20' : 'bg-transparent'}
                `}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.5s ease-out ${index * 100}ms, transform 0.5s ease-out ${index * 100}ms, background-color 0.5s ease-out`
                }}
                onMouseEnter={() => { if (!isMobile) { setIsPaused(true); setHoveredIndex(index); } }}
                onMouseLeave={() => { if (!isMobile) setIsPaused(false); }}
                onClick={() => { if (!isMobile) setHoveredIndex(index); }}
              >
                {/* Step Number */}
                <span className={`
                  absolute top-1.5 left-1.5 sm:top-3 sm:left-3 md:top-4 md:left-4
                  text-[10px] sm:text-xs md:text-sm font-mono tracking-widest
                  ${isMobile ? 'text-white/60' : isHovered ? 'text-violet-400' : stepColors[index]}
                `}>
                  0{index + 1}
                </span>

                {/* Arrow indicators */}
                {index === 0 && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 lg:hidden">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-black/60 flex items-center justify-center border border-white/20">
                      <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/70" />
                    </div>
                  </div>
                )}
                {index === 2 && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 lg:hidden">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-black/60 flex items-center justify-center border border-white/20">
                      <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/70" />
                    </div>
                  </div>
                )}
                
                {/* Icon */}
                <div className={`
                  w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex-shrink-0
                  flex items-center justify-center mb-0.5 sm:mb-1 md:mb-2 lg:mb-3
                  border bg-white/5 border-white/20
                  ${isHovered && !isMobile ? 'bg-violet-500/30 border-violet-400/50 scale-110 transition-all duration-500' : ''}
                `}>
                  <Icon className={`
                    w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white/60
                    ${isHovered && !isMobile ? 'text-violet-300' : ''}
                  `} />
                </div>
                
                {/* Content */}
                <div className="text-center px-1">
                  <h4 className="text-[9px] sm:text-xs md:text-sm lg:text-lg font-medium text-white/90">
                    {phase.title}
                  </h4>
                  <p className="text-[7px] sm:text-[9px] md:text-xs lg:text-sm text-white/40 uppercase tracking-wide mt-0.5 line-clamp-1">
                    {phase.subtitle}
                  </p>
                  
                  {/* Sub Points - Desktop hover only */}
                  {!isMobile && (
                    <div className={`
                      space-y-0.5 mt-1 transition-all duration-500
                      ${isHovered ? 'opacity-100 max-h-[80px]' : 'opacity-0 max-h-0 overflow-hidden'}
                    `}>
                      {phase.activities.slice(0, 2).map((point, i) => (
                        <div key={i} className="flex items-center justify-center gap-1 text-[9px] sm:text-[10px] md:text-xs text-white/60">
                          <span className="line-clamp-1">{point}</span>
                        </div>
                      ))}
                      <p className="text-[8px] sm:text-[9px] md:text-[10px] text-violet-400/80 italic mt-1">{phase.quote}</p>
                    </div>
                  )}
                </div>
                
                {/* Bottom Accent Line */}
                {!isMobile && (
                  <div className={`
                    absolute bottom-0 left-1/2 -translate-x-1/2
                    h-[2px] bg-gradient-to-r from-transparent via-violet-400 to-transparent
                    transition-all duration-500
                    ${isHovered ? 'w-3/4 opacity-100' : 'w-0 opacity-0'}
                  `} />
                )}
              </div>
            );
          })}
        </div>
        
        {/* Corner Label */}
        <div className="absolute top-3 right-3 md:top-4 md:right-4 flex items-center gap-2">
          <span className="text-[10px] md:text-xs text-white/50 font-mono tracking-wider">4-WEEK PROGRAM</span>
        </div>
      </div>
    </div>
  );
};

// Featured Case Card (Homepage ProjectCard pattern)
const FeaturedCaseCard = ({ project }: { project: typeof featuredProjects[0] }) => {
  const colorClasses = {
    yellow: {
      text: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      glow: 'hover:shadow-[0_0_60px_-15px_rgba(234,179,8,0.5)]',
      progress: 'bg-yellow-500'
    },
    purple: {
      text: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      glow: 'hover:shadow-[0_0_60px_-15px_rgba(168,85,247,0.5)]',
      progress: 'bg-purple-500'
    },
    cyan: {
      text: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
      glow: 'hover:shadow-[0_0_60px_-15px_rgba(34,211,238,0.5)]',
      progress: 'bg-cyan-500'
    },
  };

  const colors = colorClasses[project.color as keyof typeof colorClasses];

  return (
    <a 
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div className={`
        group relative p-4 md:p-6 h-full min-h-[280px] md:min-h-[320px]
        border ${colors.border} rounded-xl
        bg-background/80 backdrop-blur-sm
        transition-all duration-500
        ${colors.glow}
        hover:border-opacity-60
        overflow-hidden
      `}>
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
          <img 
            src={project.image} 
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10 h-full flex flex-col">
          {/* Category Badge */}
          <div className="flex items-center justify-between mb-4">
            <span className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded ${colors.bg} ${colors.text}`}>
              {project.category}
            </span>
            <ArrowUpRight className={`w-4 h-4 ${colors.text} opacity-0 group-hover:opacity-100 transition-opacity`} />
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform">
            {project.title}
          </h3>

          {/* Services */}
          <div className="flex flex-wrap gap-1.5 mb-auto">
            {project.services.map((service, idx) => (
              <span key={idx} className="text-[10px] text-white/50 px-2 py-0.5 bg-white/5 rounded-full border border-white/10">
                {service}
              </span>
            ))}
          </div>

          {/* Metric */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className={`text-2xl md:text-3xl font-bold font-mono ${colors.text}`}>
              {project.metric.value}
            </div>
            <div className="text-xs text-white/50 font-mono uppercase tracking-wider">
              {project.metric.label}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

// Gallery Marquee Component
const GalleryMarquee = () => {
  const duplicated = [...galleryImages, ...galleryImages, ...galleryImages];
  
  return (
    <div className="overflow-hidden py-6">
      <motion.div
        className="flex gap-4"
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{
          duration: 40,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {duplicated.map((img, index) => (
          <div 
            key={index}
            className="flex-shrink-0 relative group rounded-xl overflow-hidden w-[280px] md:w-[400px] aspect-[4/3]"
          >
            <img 
              src={img.src} 
              alt={img.alt}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <span className="text-[10px] text-violet-400 font-mono uppercase tracking-wider">
                {img.project}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const BrandingService = () => {
  usePageMeta({
    title: "Web3 Branding & Crypto Design Agency Korea | ium Labs",
    description: "Localized Web3 branding that resonates with Korean investors. Crypto-native design, UI/UX, and visual identity services for blockchain projects.",
    path: "/services/branding",
    image: "/og-image.png",
    keywords: ["Web3 Branding Korea", "Crypto Design Agency", "Blockchain Visual Identity", "Korea Web3 Design"]
  });

  return (
    <ServicePageLayout
      serviceName="Branding & Website"
      serviceTitle="Brand"
      serviceSubtitle="& Website"
      serviceDescription="We build standout identities and ultra-fast websites for Web3 teams. From your first logo to a fully custom site, we handle the heavy lifting so you can focus on scaling."
      serviceIcon={Palette}
      serviceTags={serviceTags}
      stats={stats}
      accentColor={ACCENT_COLOR}
      videoSrc="/videos/branding-hero.mp4"
      posterSrc="/images/posters/branding-hero.jpg"
      deliverables={deliverables}
      faqItems={faqItems}
      currentSlug="branding"
    >
      {/* Section 01: 4-Week Program (Homepage Process pattern) */}
      <section className="bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <AnimatedSection>
            <div className="bg-[#1A1A1A] flex items-center justify-between p-4 md:px-10 md:py-4 border-b border-white/10">
              <div className="flex items-center gap-4 md:gap-6">
                <span className="text-[10px] md:text-xs text-white/40 font-mono tracking-widest w-6">01</span>
                <h2 className="text-lg md:text-xl font-medium text-white">4-Week Program</h2>
              </div>
              <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Design Journey</span>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={100}>
            <ProcessBillboardOverlay />
          </AnimatedSection>
        </div>
      </section>

      {/* Section 02: Featured Cases (Homepage PerformanceSection pattern) */}
      <section className="bg-[#121212]">
        <div className="border-t border-white/10">
          <AnimatedSection>
            <div className="bg-[#1A1A1A] flex items-center justify-between p-4 md:px-10 md:py-4 border-b border-white/10">
              <div className="flex items-center gap-4 md:gap-6">
                <span className="text-[10px] md:text-xs text-violet-400/60 font-mono tracking-widest w-6">02</span>
                <h2 className="text-lg md:text-xl font-medium text-white">Featured Work</h2>
              </div>
              <span className="text-xs text-violet-400/60 tracking-wider hidden sm:block px-3 py-1 border border-violet-400/30 rounded-full">Case Studies</span>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={100}>
            <div className="py-6 md:py-10">
              <div className="container mx-auto px-4 sm:px-6 lg:px-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {featuredProjects.map((project) => (
                    <FeaturedCaseCard key={project.title} project={project} />
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 03: Campaign Gallery (Homepage FilmstripGallery pattern) */}
      <section className="bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <AnimatedSection>
            <div className="bg-[#1A1A1A] flex items-center justify-between p-4 md:px-10 md:py-4 border-b border-white/10">
              <div className="flex items-center gap-4 md:gap-6">
                <span className="text-[10px] md:text-xs text-white/40 font-mono tracking-widest w-6">03</span>
                <h2 className="text-lg md:text-xl font-medium text-white">Gallery</h2>
              </div>
              <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Our Work</span>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={100}>
            <GalleryMarquee />
          </AnimatedSection>
        </div>
      </section>

      <BreadcrumbSchema items={breadcrumbItems} />
      <ServiceSchema 
        name="Web3 Branding & Website Design"
        description="Distinctive Web3 brand identity and high-performance websites for projects launching in Korea. Korean-localized design and development."
        url="/services/branding"
        serviceType={["Brand Identity", "Web Design", "Web Development", "UI/UX Design"]}
      />
    </ServicePageLayout>
  );
};

export default BrandingService;
