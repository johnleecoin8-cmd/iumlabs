import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, TrendingUp, Target, Newspaper, Calendar, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Service images
import communityImg from "@/assets/services/community-growth.jpg";
import kolImg from "@/assets/services/kol-network.jpg";
import gtmImg from "@/assets/services/gtm-strategy.jpg";
import prImg from "@/assets/services/pr-media.jpg";
import eventsImg from "@/assets/services/events.jpg";
import vaspImg from "@/assets/services/vasp-compliance.jpg";

const services = [
  {
    icon: Users,
    title: "Community Growth",
    description: "Build and engage vibrant Korean crypto communities across Telegram, KakaoTalk, and Discord.",
    image: communityImg,
    color: "#3B82F6",
    link: "/services/community"
  },
  {
    icon: TrendingUp,
    title: "KOL & Influencer",
    description: "Connect with Korea's top crypto influencers and thought leaders for authentic promotion.",
    image: kolImg,
    color: "#8B5CF6",
    link: "/services/influencer"
  },
  {
    icon: Target,
    title: "GTM Strategy",
    description: "Comprehensive go-to-market strategies tailored for the Korean blockchain ecosystem.",
    image: gtmImg,
    color: "#EC4899",
    link: "/services/gtm-strategy"
  },
  {
    icon: Newspaper,
    title: "PR & Media",
    description: "Secure coverage in Korea's leading crypto publications and mainstream media outlets.",
    image: prImg,
    color: "#F59E0B",
    link: "/services/pr"
  },
  {
    icon: Calendar,
    title: "Events & AMAs",
    description: "Host impactful side events, AMAs, and meetups at major Korean blockchain conferences.",
    image: eventsImg,
    color: "#10B981",
    link: "/services/yap"
  },
  {
    icon: Shield,
    title: "VASP Compliance",
    description: "Navigate Korean regulatory requirements with expert VASP registration support.",
    image: vaspImg,
    color: "#06B6D4",
    link: "/services/social-media"
  }
];

const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const goNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % services.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff = ((diff + services.length) % services.length);
    
    // Calculate position relative to active card
    let position = normalizedDiff;
    if (normalizedDiff > services.length / 2) {
      position = normalizedDiff - services.length;
    }

    const isActive = position === 0;
    const isAdjacent = Math.abs(position) === 1;
    const isSecondary = Math.abs(position) === 2;

    if (isActive) {
      return {
        x: 0,
        rotateY: 0,
        scale: 1,
        z: 100,
        opacity: 1,
        blur: 0,
      };
    } else if (isAdjacent) {
      return {
        x: position * 320,
        rotateY: position * -25,
        scale: 0.75,
        z: 50,
        opacity: 0.7,
        blur: 2,
      };
    } else if (isSecondary) {
      return {
        x: position * 280,
        rotateY: position * -35,
        scale: 0.55,
        z: 25,
        opacity: 0.4,
        blur: 4,
      };
    } else {
      return {
        x: position * 200,
        rotateY: position * -40,
        scale: 0.4,
        z: 0,
        opacity: 0,
        blur: 8,
      };
    }
  };

  const activeService = services[activeIndex];
  const ActiveIcon = activeService.icon;

  return (
    <section className="min-h-screen bg-[#0A0A0B] py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-white/40 font-mono text-sm tracking-widest mb-4 block">
            [ 01 ] ── What We Do
          </span>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Our Services
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Comprehensive Web3 marketing solutions for the Korean market
          </p>
        </motion.div>

        {/* 3D Carousel Container */}
        <div 
          className="relative h-[500px] md:h-[600px] flex items-center justify-center"
          style={{ perspective: "1200px" }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={goPrev}
            className="absolute left-4 md:left-12 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-4 md:right-12 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards */}
          <div className="relative w-full max-w-[400px] md:max-w-[500px] h-[400px] md:h-[500px]" style={{ transformStyle: "preserve-3d" }}>
            {services.map((service, index) => {
              const style = getCardStyle(index);
              const Icon = service.icon;
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={service.title}
                  className="absolute inset-0 cursor-pointer"
                  animate={{
                    x: style.x,
                    rotateY: style.rotateY,
                    scale: style.scale,
                    zIndex: style.z,
                    opacity: style.opacity,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  onClick={() => !isActive && goToSlide(index)}
                  style={{
                    transformStyle: "preserve-3d",
                    filter: `blur(${style.blur}px)`,
                  }}
                >
                  <div
                    className="w-full h-full rounded-3xl overflow-hidden relative group"
                    style={{
                      boxShadow: isActive 
                        ? `0 0 60px ${service.color}40, 0 25px 50px -12px rgba(0,0,0,0.8)` 
                        : "0 25px 50px -12px rgba(0,0,0,0.5)",
                    }}
                  >
                    {/* Background Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${service.image})` }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(180deg, ${service.color}20 0%, ${service.color}60 50%, ${service.color}90 100%)`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      {/* Number Badge */}
                      <div 
                        className="absolute top-6 left-6 w-12 h-12 rounded-xl flex items-center justify-center text-lg font-mono font-bold"
                        style={{ 
                          background: `${service.color}30`,
                          color: service.color,
                          border: `1px solid ${service.color}50`
                        }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </div>

                      {/* Icon */}
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                        style={{ 
                          background: `${service.color}30`,
                          backdropFilter: "blur(10px)"
                        }}
                      >
                        <Icon className="w-7 h-7" style={{ color: service.color }} />
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                        {service.title}
                      </h3>
                      
                      <p className="text-white/70 text-sm md:text-base mb-4 line-clamp-2">
                        {service.description}
                      </p>

                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Link
                            to={service.link}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium transition-all hover:gap-4"
                            style={{ 
                              background: service.color,
                              boxShadow: `0 0 20px ${service.color}50`
                            }}
                          >
                            Learn More
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative group"
            >
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? "scale-125" 
                    : "bg-white/30 hover:bg-white/50"
                }`}
                style={{
                  background: index === activeIndex ? service.color : undefined,
                  boxShadow: index === activeIndex ? `0 0 15px ${service.color}` : undefined,
                }}
              />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/50 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {service.title}
              </span>
            </button>
          ))}
        </div>

        {/* Active Service Info */}
        <motion.div 
          key={activeIndex}
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div 
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-4"
            style={{ 
              background: `${activeService.color}20`,
              border: `1px solid ${activeService.color}40`
            }}
          >
            <ActiveIcon className="w-5 h-5" style={{ color: activeService.color }} />
            <span className="text-white font-medium">{activeService.title}</span>
            <span className="text-white/40">|</span>
            <span className="text-white/60 text-sm">{activeIndex + 1} of {services.length}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
