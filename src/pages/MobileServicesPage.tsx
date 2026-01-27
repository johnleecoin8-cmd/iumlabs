import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Rocket, 
  Palette, 
  Search, 
  Calendar, 
  Users, 
  FileSearch, 
  Star, 
  Newspaper,
  ArrowUpRight,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect, useCallback } from "react";
import { useCountUp } from "@/hooks/useCountUp";
import ContactFormSection from "@/components/ContactFormSection";
import FooterLinksSection from "@/components/FooterLinksSection";
import Footer from "@/components/Footer";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";
import Navbar from "@/components/Navbar";
import { brand } from "@/config/content";

// Import service poster images from home page
import gtmImage from "@/assets/services/gtm-ecosystem.png";
import brandingImage from "@/assets/services/branding-website.png";
import seoAdsImage from "@/assets/services/seo-ads.jpg";
import eventsImage from "@/assets/services/events.jpg";
import communityImage from "@/assets/services/community-management.png";
import kolImage from "@/assets/services/kol-network.jpg";
import prImage from "@/assets/services/pr-media.jpg";

const services = [
  {
    title: "GTM Strategy",
    description: "Full-stack market entry",
    icon: Rocket,
    link: "/services",
    video: "/videos/gtm-hero.mp4",
    poster: gtmImage,
    stats: "50+ Projects"
  },
  {
    title: "Branding",
    description: "Identity & website",
    icon: Palette,
    link: "/services/branding",
    video: "/videos/branding-hero.mp4",
    poster: brandingImage,
    stats: "15+ Brands"
  },
  {
    title: "SEO & Ads",
    description: "Search & paid traffic",
    icon: Search,
    link: "/services/seo-ads",
    video: "/videos/seo-hero.mp4",
    poster: seoAdsImage,
    stats: "1M+ Reach"
  },
  {
    title: "Offline Event",
    description: "Conferences & meetups",
    icon: Calendar,
    link: "/services/offline-event",
    video: "/videos/offline-event-hero.mp4",
    poster: eventsImage,
    stats: "30+ Events"
  },
  {
    title: "Community",
    description: "Discord & Telegram",
    icon: Users,
    link: "/services/community",
    video: "/videos/community-hero.mp4",
    poster: communityImage,
    stats: "500K+ Members"
  },
  {
    title: "Deep Research",
    description: "Market intelligence",
    icon: FileSearch,
    link: "/services/deep-research",
    video: "/videos/deep-research-hero.mp4",
    poster: gtmImage,
    stats: "100+ Reports"
  },
  {
    title: "KOL Network",
    description: "Influencer marketing",
    icon: Star,
    link: "/services/influencer",
    video: "/videos/influencer-hero.mp4",
    poster: kolImage,
    stats: "70+ KOLs"
  },
  {
    title: "PR & Media",
    description: "Press & coverage",
    icon: Newspaper,
    link: "/services/pr",
    video: "/videos/pr-hero.mp4",
    poster: prImage,
    stats: "200+ Articles"
  }
];

// Stats data
const statsData = [
  { value: 8, label: "Services", suffix: "" },
  { value: 18, label: "Projects", prefix: "+", suffix: "" },
  { value: 170, label: "KOLs", suffix: "+" },
];

// Stats Section Component with count-up animation
const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  const count1 = useCountUp({ end: statsData[0].value, isVisible, delay: 0, duration: 1500 });
  const count2 = useCountUp({ end: statsData[1].value, isVisible, delay: 100, duration: 1500 });
  const count3 = useCountUp({ end: statsData[2].value, isVisible, delay: 200, duration: 1500 });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="relative z-10 py-3 md:py-4"
    >
      <div className="px-4 md:px-5">
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold text-white">{count1}</div>
            <div className="text-[9px] md:text-[10px] text-white/40">Services</div>
          </div>
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold text-white">+{count2}</div>
            <div className="text-[9px] md:text-[10px] text-white/40">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold text-white">{count3}+</div>
            <div className="text-[9px] md:text-[10px] text-white/40">KOLs</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

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
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const navigate = useNavigate();
  
  // Lazy load video when card is in viewport - no delay
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setShouldLoadVideo(true);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '800px' // Start loading much earlier for snappier video transitions
      }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Proactively kick off network fetch as soon as we decide to mount the <video>
  useEffect(() => {
    if (!shouldLoadVideo) return;
    const v = videoRef.current;
    if (!v) return;
    try {
      v.load();
    } catch {
      // no-op
    }
  }, [shouldLoadVideo]);
  
  // Instant hover handler - no delay
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // autoplay restrictions / buffering - ignore
      });
    }
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setIsPressed(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);
  
  const triggerHaptic = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };
  
  // Touch handling - require intentional tap, not swipe
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
    setIsPressed(true);
    triggerHaptic();

    // Ensure video element is mounted + fetching immediately
    setShouldLoadVideo(true);
    
    // Play video on touch
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // buffering / policy - ignore
      });
    }
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPressed(false);
    
    // Check if it was a tap (not a swipe)
    if (touchStartPos.current) {
      const touch = e.changedTouches[0];
      const deltaX = Math.abs(touch.clientX - touchStartPos.current.x);
      const deltaY = Math.abs(touch.clientY - touchStartPos.current.y);
      
      // Only navigate if movement is less than 10px (tap, not swipe)
      if (deltaX < 10 && deltaY < 10) {
        e.preventDefault();
        navigate(service.link);
      }
    }
    
    touchStartPos.current = null;
    
    // Reset video
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };
  
  const handleTouchCancel = () => {
    setIsPressed(false);
    touchStartPos.current = null;
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };
  
  const handleClick = (e: React.MouseEvent) => {
    // For desktop, navigate on click
    if (!('ontouchstart' in window)) {
      navigate(service.link);
    }
    e.preventDefault();
  };
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        ease: "easeOut"
      }}
      className="relative"
    >
      <div
        onClick={handleClick}
        className={cn(
          "group relative flex flex-col overflow-hidden cursor-pointer",
          isFullWidth ? "aspect-[16/10] md:aspect-[16/9]" : "aspect-[3/4] md:aspect-[4/5]",
          "transition-all duration-200",
          "border-r border-b border-white/10",
          isPressed && "scale-[0.97] brightness-110"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
      >
        {/* Poster image - always visible as fallback */}
        <img 
          src={service.poster} 
          alt={service.title}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-200",
            isVideoLoaded ? "opacity-0" : "opacity-100"
          )}
        />
        
        {/* Video background - lazy loaded */}
        {shouldLoadVideo && !hasVideoError && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            webkit-playsinline="true"
            x5-playsinline="true"
            x5-video-player-type="h5"
            preload="auto"
            poster={service.poster}
            disablePictureInPicture
            controls={false}
            aria-hidden="true"
            tabIndex={-1}
            onCanPlay={() => {
              setIsVideoLoaded(true);
              if (videoRef.current) {
                videoRef.current.play().catch(() => {});
              }
            }}
            onError={() => setHasVideoError(true)}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-200",
              isVideoLoaded ? "opacity-100" : "opacity-0"
            )}
          >
            <source src={service.video} type="video/mp4" />
          </video>
        )}
        
        {/* Dark overlays - ium labs style */}
        <div className={cn(
          "absolute inset-0 bg-black/50 transition-colors duration-200",
          isHovered && "bg-black/30"
        )} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        {/* Number indicator */}
        <div className="absolute top-2 left-2 md:top-3 md:left-3">
          <span className="text-[9px] md:text-[10px] text-white/40 font-mono tracking-widest">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        
        {/* Content */}
        <div className="relative z-10 mt-auto p-3 md:p-4">
          {/* Icon - minimalist style */}
          <Icon 
            className={cn(
              "w-5 h-5 md:w-6 md:h-6 text-white/70 mb-2 md:mb-3 transition-colors duration-300",
              isHovered && "text-white"
            )} 
            strokeWidth={1.5} 
          />
          
          {/* Title & description */}
          <h3 className="font-medium text-white text-xs md:text-sm leading-tight mb-0.5 md:mb-1">
            {service.title}
          </h3>
          <p className="text-[10px] md:text-[11px] text-white/50 leading-relaxed line-clamp-2">
            {service.description}
          </p>
          
          {/* Stats - with hover highlight effect */}
          <span className={cn(
            "text-[9px] md:text-[10px] font-mono mt-1.5 md:mt-2 block transition-all duration-300",
            isHovered 
              ? "text-white text-[10px] md:text-xs font-semibold" 
              : "text-white/40"
          )}>
            {service.stats}
          </span>
        </div>
        
        {/* Arrow indicator */}
        <div className={cn(
          "absolute bottom-3 right-3 md:bottom-4 md:right-4 opacity-0 transition-all duration-300",
          isHovered && "opacity-100"
        )}>
          <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/60" strokeWidth={1.5} />
        </div>
      </div>
    </motion.div>
  );
};

const MobileServicesPage = () => {
  const {
    videoRef: heroVideoRef,
    isVideoReady: heroVideoLoaded,
    hasVideoError: heroVideoError,
    shouldDisableVideo: heroShouldDisable,
    videoProps: heroVideoProps,
    posterProps: heroPosterProps,
    ShimmerOverlay: HeroShimmerOverlay,
  } = useVideoPlayer({
    src: '/videos/services-hero.mp4',
    poster: '/images/posters/services-hero.jpg',
  });
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Hero Section - Projects Page Style */}
      <main className="pt-16 md:pt-0 p-0.5 bg-background">
        <div className="rounded-xl overflow-hidden">
          <div className="relative min-h-[60vh] md:min-h-[67vh] flex flex-col justify-between overflow-hidden rounded-2xl">
            {/* Background Layer - Video */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Poster fallback */}
              <img
                {...heroPosterProps}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ 
                  ...heroPosterProps.style,
                  filter: "brightness(0.35)",
                }}
              />

              {/* Shimmer loading overlay */}
              <HeroShimmerOverlay />

              {!heroShouldDisable && !heroVideoError && (
                <video
                  ref={heroVideoRef}
                  {...heroVideoProps}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ 
                    ...heroVideoProps.style,
                    filter: "brightness(0.35)",
                  }}
                >
                  <source src="/videos/services-hero.mp4" type="video/mp4" />
                </video>
              )}
              
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
                  className="font-sans text-2xl sm:text-3xl md:text-4xl font-medium mb-3 md:mb-4 mt-4 md:mt-8"
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
                  className="text-xs sm:text-sm text-white/50 max-w-xs sm:max-w-md mx-auto mb-4 md:mb-6 font-light leading-relaxed px-4"
                >
                  <span className="text-white font-medium">9 specialized services</span> for Web3 projects entering the Korean ecosystem
                </motion.p>

                {/* CTA Button */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-col items-center gap-1.5 md:gap-2"
                >
                  <a
                    href={brand.calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 font-medium text-xs md:text-sm rounded-full bg-white text-black hover:bg-white/90 active:scale-[0.98] transition-all"
                  >
                    <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span>Book Consultation</span>
                  </a>
                  <p className="text-[9px] md:text-[10px] text-white/40">
                    Free consultation • 30 min call
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Stats Section */}
            <StatsSection />

            {/* Scroll Indicator */}
            <div className="absolute bottom-6 right-4 z-10 flex items-center gap-2">
              <span className="text-white/30 text-xs font-medium">scroll</span>
              <ChevronDown className="w-3 h-3 text-white/30 animate-bounce" />
            </div>
          </div>
        </div>
      </main>
      
      {/* Section Divider - All Services */}
      <section className="bg-[#0A0A0A] border-t border-white/10">
        <div className="flex items-baseline justify-between p-3 sm:p-4 md:px-8 md:py-5 border-b border-white/5">
          <div className="flex items-baseline gap-3 sm:gap-4 md:gap-6">
            <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">01</span>
            <h2 className="text-sm sm:text-base md:text-lg font-medium text-white">All Services</h2>
          </div>
          <span className="text-[9px] sm:text-[10px] text-white/40 tracking-wider px-2 py-0.5 border border-white/10 rounded-full">
            {services.length} Services
          </span>
        </div>
        
        {/* All Services - Full Width Grid */}
        <div className="border-l border-white/10">
          <div className="grid grid-cols-1">
            {services.map((service, index) => (
              <ServiceCard 
                key={service.link} 
                service={service} 
                index={index} 
                isFullWidth={true}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer - Same as other pages */}
      <ContactFormSection />
      <FooterLinksSection />
      <Footer />
    </div>
  );
};

export default MobileServicesPage;
