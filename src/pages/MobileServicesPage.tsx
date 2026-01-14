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
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import ContactFormSection from "@/components/ContactFormSection";
import FooterLinksSection from "@/components/FooterLinksSection";
import Footer from "@/components/Footer";

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
      {/* Hero Section - minimal ium labs style */}
      <div className="border-b border-white/10 bg-background">
        <div className="px-5 pt-16 pb-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Minimal badge */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-white/20" />
              <span className="text-[10px] font-mono text-white/40 tracking-[0.2em]">
                SERVICES
              </span>
            </div>
            
            {/* Title - large typography */}
            <h1 className="text-3xl font-light text-white leading-[1.1] tracking-tight mb-6">
              Korea Market
              <br />
              <span className="text-white/40">Solutions</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xs text-white/30 leading-relaxed max-w-[240px] font-light">
              Full-stack Web3 marketing for the Korean ecosystem
            </p>
            
            {/* Stats row */}
            <div className="flex items-center gap-6 mt-8 pt-6 border-t border-white/5">
              <div>
                <span className="text-lg font-light text-white">09</span>
                <span className="text-[10px] text-white/30 ml-1">services</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div>
                <span className="text-lg font-light text-white">50+</span>
                <span className="text-[10px] text-white/30 ml-1">projects</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
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
