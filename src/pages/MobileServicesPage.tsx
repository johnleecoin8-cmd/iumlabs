import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Rocket, 
  Palette, 
  Search, 
  Calendar, 
  Users, 
  FileSearch, 
  Star, 
  MessageCircle, 
  Newspaper,
  ArrowUpRight,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import ContactFormSection from "@/components/ContactFormSection";
import FooterLinksSection from "@/components/FooterLinksSection";
import Footer from "@/components/Footer";
import { brand } from "@/config/content";

const services = [
  {
    title: "GTM Strategy",
    description: "Full-stack market entry",
    icon: Rocket,
    link: "/services",
    video: "/videos/gtm-hero.mp4",
    stats: "50+ Projects"
  },
  {
    title: "Branding",
    description: "Identity & website",
    icon: Palette,
    link: "/services/branding",
    video: "/videos/branding-hero.mp4",
    stats: "15+ Brands"
  },
  {
    title: "SEO & Ads",
    description: "Search & paid traffic",
    icon: Search,
    link: "/services/seo-ads",
    video: "/videos/seo-hero.mp4",
    stats: "1M+ Reach"
  },
  {
    title: "Offline Event",
    description: "Conferences & meetups",
    icon: Calendar,
    link: "/services/offline-event",
    video: "/videos/offline-event-hero.mp4",
    stats: "30+ Events"
  },
  {
    title: "Community",
    description: "Discord & Telegram",
    icon: Users,
    link: "/services/community",
    video: "/videos/community-hero.mp4",
    stats: "500K+ Members"
  },
  {
    title: "Deep Research",
    description: "Market intelligence",
    icon: FileSearch,
    link: "/services/deep-research",
    video: "/videos/deep-research-hero.mp4",
    stats: "100+ Reports"
  },
  {
    title: "KOL Network",
    description: "Influencer marketing",
    icon: Star,
    link: "/services/influencer",
    video: "/videos/influencer-hero.mp4",
    stats: "70+ KOLs"
  },
  {
    title: "YAP Network",
    description: "Creator economy",
    icon: MessageCircle,
    link: "/services/yap",
    video: "/videos/yap-hero.mp4",
    stats: "50+ Yappers"
  },
  {
    title: "PR & Media",
    description: "Press & coverage",
    icon: Newspaper,
    link: "/services/pr",
    video: "/videos/pr-hero.mp4",
    stats: "200+ Articles"
  }
];

const ServiceCard = ({ 
  service, 
  index,
  isFullWidth = false
}: { 
  service: typeof services[0]; 
  index: number;
  isFullWidth?: boolean;
}) => {
  const Icon = service.icon;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const navigate = useNavigate();
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play();
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };
  
  const triggerHaptic = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };
  
  const handleTouchStart = () => {
    setIsPressed(true);
    setIsHovered(true);
    triggerHaptic();
    videoRef.current?.play();
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsPressed(false);
    
    // Smooth transition with delay
    setTimeout(() => {
      navigate(service.link);
    }, 150);
  };
  
  const handleClick = (e: React.MouseEvent) => {
    // Allow normal navigation on desktop
    if (!('ontouchstart' in window)) {
      return;
    }
    e.preventDefault();
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        ease: "easeOut"
      }}
      className="relative"
    >
      <Link
        to={service.link}
        onClick={handleClick}
        className={cn(
          "group relative flex flex-col overflow-hidden",
          isFullWidth ? "aspect-[16/9]" : "aspect-[4/5]",
          "transition-all duration-200",
          "border-r border-b border-white/10",
          isPressed && "scale-[0.97] brightness-110"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Video background */}
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={service.video} type="video/mp4" />
        </video>
        
        {/* Dark overlays - ium labs style */}
        <div className={cn(
          "absolute inset-0 bg-black/50 transition-colors duration-500",
          isHovered && "bg-black/30"
        )} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        {/* Number indicator */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] text-white/40 font-mono tracking-widest">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        
        {/* Content */}
        <div className="relative z-10 mt-auto p-4">
          {/* Icon - minimalist style */}
          <Icon 
            className={cn(
              "w-6 h-6 text-white/70 mb-3 transition-colors duration-300",
              isHovered && "text-white"
            )} 
            strokeWidth={1.5} 
          />
          
          {/* Title & description */}
          <h3 className="font-medium text-white text-sm leading-tight mb-1">
            {service.title}
          </h3>
          <p className="text-[11px] text-white/50 leading-relaxed">
            {service.description}
          </p>
          
          {/* Stats - simple text */}
          <span className="text-[10px] text-white/40 font-mono mt-2 block">
            {service.stats}
          </span>
        </div>
        
        {/* Arrow indicator */}
        <div className={cn(
          "absolute bottom-4 right-4 opacity-0 transition-all duration-300",
          isHovered && "opacity-100"
        )}>
          <ArrowUpRight className="w-4 h-4 text-white/60" strokeWidth={1.5} />
        </div>
      </Link>
    </motion.div>
  );
};

const MobileServicesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Projects Page Style */}
      <main className="p-0.5 bg-background">
        <div className="rounded-xl overflow-hidden">
          <div className="relative min-h-[85vh] flex flex-col justify-between overflow-hidden rounded-2xl">
            {/* Background Layer - Video */}
            <div className="absolute inset-0 overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "brightness(0.35)" }}
              >
                <source src="/videos/services-background.mp4" type="video/mp4" />
              </video>
              
              {/* Dark overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.3)] via-transparent to-[hsl(0,0%,4%,0.95)]" />
            </div>

            {/* Main Content - Centered */}
            <div className="flex-1 flex items-center justify-center relative z-10 px-5">
              <div className="max-w-7xl mx-auto text-center">
                {/* Main Headline */}
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="font-sans text-3xl sm:text-4xl font-medium mb-4 mt-8"
                >
                  <span className="text-white">Korea Market</span>
                  <br />
                  <span className="text-white/60">Solutions</span>
                </motion.h1>

                {/* Subtext */}
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-sm text-white/50 max-w-md mx-auto mb-6 font-light leading-relaxed"
                >
                  <span className="text-white font-medium">9 specialized services</span> for Web3 projects entering the Korean ecosystem
                </motion.p>

                {/* CTA Button */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-col items-center gap-2"
                >
                  <a
                    href={brand.calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-6 py-3 font-medium text-sm rounded-full bg-white text-black hover:bg-white/90 active:scale-[0.98] transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Consultation</span>
                  </a>
                  <p className="text-[10px] text-white/40">
                    Free consultation • 30 min call
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Stats Section */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative z-10 py-4"
            >
              <div className="px-5">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-medium text-white">09</div>
                    <div className="text-[10px] text-white/40">Services</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-medium text-white">50+</div>
                    <div className="text-[10px] text-white/40">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-medium text-white">70+</div>
                    <div className="text-[10px] text-white/40">KOLs</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-6 right-4 z-10 flex items-center gap-2">
              <span className="text-white/30 text-xs font-medium">scroll</span>
              <ChevronDown className="w-3 h-3 text-white/30 animate-bounce" />
            </div>
          </div>
        </div>
      </main>
      
      {/* GTM - Full Width (1 Column) */}
      <div className="border-l border-white/10">
        <ServiceCard 
          service={services[0]} 
          index={0} 
          isFullWidth={true}
        />
      </div>
      
      {/* Remaining Services - 2 Column Grid */}
      <div className="border-l border-white/10">
        <div className="grid grid-cols-2">
          {services.slice(1).map((service, index) => (
            <ServiceCard 
              key={service.link} 
              service={service} 
              index={index + 2} 
            />
          ))}
        </div>
      </div>
      
      {/* Footer - Same as other pages */}
      <ContactFormSection />
      <FooterLinksSection />
      <Footer />
    </div>
  );
};

export default MobileServicesPage;
