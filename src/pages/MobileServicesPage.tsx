import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
  ArrowRight,
  Play
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";

const services = [
  {
    title: "GTM Strategy",
    description: "Full-stack market entry",
    icon: Rocket,
    link: "/services",
    video: "/videos/gtm-hero.mp4",
    accentColor: "139, 92, 246", // violet
    gradient: "from-violet-500/90 to-purple-600/90",
    stats: "50+ Projects"
  },
  {
    title: "Branding",
    description: "Identity & website",
    icon: Palette,
    link: "/services/branding",
    video: "/videos/branding-hero.mp4",
    accentColor: "139, 92, 246", // purple
    gradient: "from-purple-500/90 to-pink-600/90",
    stats: "15+ Brands"
  },
  {
    title: "SEO & Ads",
    description: "Search & paid traffic",
    icon: Search,
    link: "/services/seo-ads",
    video: "/videos/seo-hero.mp4",
    accentColor: "245, 158, 11", // amber
    gradient: "from-amber-500/90 to-orange-600/90",
    stats: "1M+ Reach"
  },
  {
    title: "Offline Event",
    description: "Conferences & meetups",
    icon: Calendar,
    link: "/services/offline-event",
    video: "/videos/offline-event-hero.mp4",
    accentColor: "16, 185, 129", // emerald
    gradient: "from-emerald-500/90 to-teal-600/90",
    stats: "30+ Events"
  },
  {
    title: "Community",
    description: "Discord & Telegram",
    icon: Users,
    link: "/services/community",
    video: "/videos/community-hero.mp4",
    accentColor: "59, 130, 246", // blue
    gradient: "from-blue-500/90 to-indigo-600/90",
    stats: "500K+ Members"
  },
  {
    title: "Deep Research",
    description: "Market intelligence",
    icon: FileSearch,
    link: "/services/deep-research",
    video: "/videos/deep-research-hero.mp4",
    accentColor: "6, 182, 212", // cyan
    gradient: "from-cyan-500/90 to-sky-600/90",
    stats: "100+ Reports"
  },
  {
    title: "KOL Network",
    description: "Influencer marketing",
    icon: Star,
    link: "/services/influencer",
    video: "/videos/influencer-hero.mp4",
    accentColor: "245, 158, 11", // amber
    gradient: "from-yellow-500/90 to-amber-600/90",
    stats: "70+ KOLs"
  },
  {
    title: "YAP Network",
    description: "Creator economy",
    icon: MessageCircle,
    link: "/services/yap",
    video: "/videos/yap-hero.mp4",
    accentColor: "217, 70, 239", // fuchsia
    gradient: "from-fuchsia-500/90 to-purple-600/90",
    stats: "50+ Yappers"
  },
  {
    title: "PR & Media",
    description: "Press & coverage",
    icon: Newspaper,
    link: "/services/pr",
    video: "/videos/pr-hero.mp4",
    accentColor: "100, 116, 139", // slate
    gradient: "from-slate-500/90 to-zinc-600/90",
    stats: "200+ Articles"
  }
];

const ServiceCard = ({ 
  service, 
  index 
}: { 
  service: typeof services[0]; 
  index: number;
}) => {
  const Icon = service.icon;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play();
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        ease: "easeOut"
      }}
    >
      <Link
        to={service.link}
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-2xl",
          "aspect-[4/5] active:scale-[0.97] transition-transform duration-200"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseEnter}
        onTouchEnd={handleMouseLeave}
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
        
        {/* Gradient overlays */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t",
          service.gradient
        )} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Accent glow on hover */}
        <div 
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            "bg-gradient-to-t from-transparent via-transparent to-transparent"
          )}
          style={{
            boxShadow: isHovered ? `inset 0 0 60px rgba(${service.accentColor}, 0.3)` : 'none'
          }}
        />
        
        {/* Play indicator */}
        <div className={cn(
          "absolute top-3 right-3 w-7 h-7 rounded-full",
          "bg-white/20 backdrop-blur-sm border border-white/30",
          "flex items-center justify-center",
          "opacity-60 group-hover:opacity-100 transition-opacity"
        )}>
          <Play className="w-3 h-3 text-white fill-white ml-0.5" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 mt-auto p-4">
          {/* Icon badge */}
          <div 
            className={cn(
              "w-9 h-9 rounded-xl flex items-center justify-center mb-3",
              "backdrop-blur-md border border-white/20"
            )}
            style={{ 
              backgroundColor: `rgba(${service.accentColor}, 0.3)`,
            }}
          >
            <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          
          {/* Title & description */}
          <h3 className="font-bold text-white text-base leading-tight mb-0.5">
            {service.title}
          </h3>
          <p className="text-xs text-white/70 leading-relaxed mb-2">
            {service.description}
          </p>
          
          {/* Stats pill */}
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
            <span className="text-[10px] font-medium text-white/90">{service.stats}</span>
          </div>
        </div>
        
        {/* Bottom arrow */}
        <div className="absolute bottom-4 right-4">
          <ArrowRight className={cn(
            "w-4 h-4 text-white/50",
            "group-hover:text-white group-hover:translate-x-0.5",
            "transition-all duration-200"
          )} />
        </div>
      </Link>
    </motion.div>
  );
};

const MobileServicesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/services-background.mp4" type="video/mp4" />
        </video>
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-violet-500/10" />
        
        {/* Hero content */}
        <div className="relative z-10 px-5 pt-12 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-xs font-medium text-primary mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              9 Services
            </span>
            
            <h1 className="text-3xl font-bold text-foreground leading-tight mb-2">
              Korea Market
              <br />
              <span className="bg-gradient-to-r from-primary via-violet-400 to-purple-400 bg-clip-text text-transparent">
                Solutions
              </span>
            </h1>
            
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px]">
              Full-stack Web3 marketing services tailored for the Korean ecosystem
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Services Grid */}
      <div className="px-4 pb-4 -mt-2">
        <div className="grid grid-cols-2 gap-3">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.link} 
              service={service} 
              index={index} 
            />
          ))}
        </div>
        
        {/* Bottom spacing for mobile nav */}
        <div className="h-8" />
      </div>
    </div>
  );
};

export default MobileServicesPage;
