import { Palette, Eye, Layout, Code, Check, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ServicePageLayout, { ServiceStat, ServiceTag, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ServiceSchema from "@/components/ServiceSchema";

// Branding service images
import brandingWebsite from "@/assets/services/branding-website.png";

// Portfolio - Bananago
import bananagoLanding from "@/assets/portfolio/bananago-landing.png";
import bananagoVideo from "@/assets/portfolio/bananago-video.png";

// Campaign gallery images for marquee
import openledgerEvent from "@/assets/campaigns/openledger-event.jpg";
import megaethLaunch from "@/assets/campaigns/megaeth-launch.jpg";
import triaLaunch from "@/assets/campaigns/tria-launch.jpg";
import fogoFest from "@/assets/campaigns/fogo-fest.avif";
import polygonConnect from "@/assets/campaigns/polygon-connect.png";
import storyWorkshop from "@/assets/campaigns/story-workshop.jpg";
import brandingPalace from "@/assets/services/branding-palace.png";
import websiteCreative from "@/assets/services/website-creative.png";

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

// Gallery images for marquee
const galleryImages = [
  { src: bananagoLanding, alt: "Bananago Landing Page", project: "Bananago" },
  { src: bananagoVideo, alt: "Bananago Video Campaign", project: "Bananago" },
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

// Minimal Process Grid Component (Reference style)
const MinimalProcessGrid = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useMobileOptimization();

  useEffect(() => {
    if (!isVisible || isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % journeyPhases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isVisible, isPaused]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {journeyPhases.map((phase, index) => {
            const Icon = phase.icon;
            const isActive = activeIndex === index;
            
            return (
              <div
                key={index}
                className={`
                  relative p-5 sm:p-6 rounded-2xl border transition-all duration-500 cursor-pointer
                  ${isActive 
                    ? 'border-violet-500/30 bg-violet-500/[0.05]' 
                    : 'border-white/[0.06] bg-[#0D0D0D] hover:border-white/[0.12]'
                  }
                `}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.5s ease-out ${index * 100}ms, transform 0.5s ease-out ${index * 100}ms, border-color 0.3s, background-color 0.3s`
                }}
                onMouseEnter={() => { setIsPaused(true); setActiveIndex(index); }}
                onMouseLeave={() => setIsPaused(false)}
                onClick={() => setActiveIndex(index)}
              >
                {/* Week Number */}
                <span className={`
                  text-[10px] font-mono tracking-widest uppercase mb-4 block
                  ${isActive ? 'text-violet-400' : 'text-white/30'}
                `}>
                  {phase.week}
                </span>
                
                {/* Icon */}
                <div className={`
                  w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300
                  ${isActive 
                    ? 'bg-violet-500/20 border border-violet-500/30' 
                    : 'bg-white/[0.03] border border-white/[0.06]'
                  }
                `}>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-violet-400' : 'text-white/40'}`} />
                </div>
                
                {/* Title */}
                <h4 className="text-sm sm:text-base font-medium text-white mb-1">
                  {phase.title}
                </h4>
                <p className="text-[10px] text-white/40 uppercase tracking-wider mb-4">
                  {phase.subtitle}
                </p>
                
                {/* Activities - Show on active/hover */}
                <div className={`
                  space-y-1.5 transition-all duration-500 overflow-hidden
                  ${isActive || isMobile ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}
                `}>
                  {phase.activities.slice(0, 3).map((activity, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px] text-white/50">
                      <Check className="w-3 h-3 mt-0.5 flex-shrink-0 text-violet-400/50" />
                      <span className="line-clamp-1">{activity}</span>
                    </div>
                  ))}
                </div>
                
                {/* Bottom accent line */}
                <div className={`
                  absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full
                  bg-gradient-to-r from-transparent via-violet-400 to-transparent
                  transition-all duration-500
                  ${isActive ? 'w-1/2 opacity-100' : 'w-0 opacity-0'}
                `} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Gallery Marquee Component - Minimal style
const GalleryMarquee = () => {
  const duplicated = [...galleryImages, ...galleryImages, ...galleryImages];
  
  return (
    <div className="overflow-hidden py-8 sm:py-12">
      <motion.div
        className="flex gap-4"
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{
          duration: 50,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {duplicated.map((img, index) => (
          <div 
            key={index}
            className="flex-shrink-0 relative group rounded-xl overflow-hidden w-[260px] sm:w-[320px] md:w-[400px] aspect-[4/3]"
          >
            <img 
              src={img.src} 
              alt={img.alt}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[10px] text-violet-400/80 font-mono uppercase tracking-wider">
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
      {/* Section 01: 4-Week Program - Minimal Cards */}
      <section className="bg-[#0A0A0A]">
        <div className="border-t border-white/[0.06]">
          <AnimatedSection>
            <div className="bg-[#0D0D0D] flex items-center justify-between p-4 md:px-10 md:py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-4 md:gap-6">
                <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest w-6">01</span>
                <h2 className="text-lg md:text-xl font-medium text-white">4-Week Program</h2>
              </div>
              <span className="text-xs text-white/40 tracking-wider hidden sm:block px-3 py-1 border border-white/[0.08] rounded-full">Design Journey</span>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={100}>
            <MinimalProcessGrid />
          </AnimatedSection>
        </div>
      </section>

      {/* Section 02: Campaign Gallery - Minimal Marquee */}
      <section className="bg-[#0A0A0A]">
        <div className="border-t border-white/[0.06]">
          <AnimatedSection>
            <div className="bg-[#0D0D0D] flex items-center justify-between p-4 md:px-10 md:py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-4 md:gap-6">
                <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest w-6">02</span>
                <h2 className="text-lg md:text-xl font-medium text-white">Gallery</h2>
              </div>
              <span className="text-xs text-white/40 tracking-wider hidden sm:block px-3 py-1 border border-white/[0.08] rounded-full">Our Work</span>
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
