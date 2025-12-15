import { useState, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Users, TrendingUp, Target, Newspaper, Calendar, Shield, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
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
    subtitle: "Build & Engage",
    description: "Build and engage vibrant Korean crypto communities across Telegram, KakaoTalk, and Discord with native Korean moderators.",
    features: ["24/7 Korean moderation", "Telegram & Discord", "Sentiment analysis"],
    image: communityImg,
    color: "#3B82F6",
    link: "/services/community"
  },
  {
    icon: TrendingUp,
    title: "KOL & Influencer",
    subtitle: "Amplify Reach",
    description: "Connect with Korea's top crypto influencers and thought leaders for authentic promotion and brand awareness.",
    features: ["1000+ verified KOLs", "YouTube & Twitter", "Performance tracking"],
    image: kolImg,
    color: "#8B5CF6",
    link: "/services/influencer"
  },
  {
    icon: Target,
    title: "GTM Strategy",
    subtitle: "Market Entry",
    description: "Comprehensive go-to-market strategies tailored for the Korean blockchain ecosystem and regulatory landscape.",
    features: ["Market analysis", "Launch planning", "KPI definition"],
    image: gtmImg,
    color: "#EC4899",
    link: "/services/gtm-strategy"
  },
  {
    icon: Newspaper,
    title: "PR & Media",
    subtitle: "Secure Coverage",
    description: "Secure coverage in Korea's leading crypto publications and mainstream media outlets for maximum visibility.",
    features: ["50+ media partners", "Press releases", "Interview placements"],
    image: prImg,
    color: "#F59E0B",
    link: "/services/pr"
  },
  {
    icon: Calendar,
    title: "Events & AMAs",
    subtitle: "Direct Engagement",
    description: "Host impactful side events, AMAs, and meetups at major Korean blockchain conferences and venues.",
    features: ["Conference presence", "VIP networking", "AMA hosting"],
    image: eventsImg,
    color: "#10B981",
    link: "/services/yap"
  },
  {
    icon: Shield,
    title: "VASP Compliance",
    subtitle: "Navigate Regulations",
    description: "Navigate Korean regulatory requirements with expert VASP registration and compliance support.",
    features: ["VASP registration", "AML/KYC setup", "Legal consulting"],
    image: vaspImg,
    color: "#06B6D4",
    link: "/services/social-media"
  }
];

const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const constraintsRef = useRef(null);

  const goToSlide = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const goNext = () => {
    if (activeIndex < services.length - 1) {
      setDirection(1);
      setActiveIndex(activeIndex + 1);
    }
  };

  const goPrev = () => {
    if (activeIndex > 0) {
      setDirection(-1);
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold && activeIndex < services.length - 1) {
      goNext();
    } else if (info.offset.x > threshold && activeIndex > 0) {
      goPrev();
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  const activeService = services[activeIndex];
  const ActiveIcon = activeService.icon;

  return (
    <section className="relative h-screen bg-[#0A0A0B] overflow-hidden">
      {/* Fullscreen Slider */}
      <div ref={constraintsRef} className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${activeService.image})` }}
            />
            
            {/* Gradient Overlays */}
            <div 
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${activeService.color}30 0%, transparent 50%, ${activeService.color}20 100%)`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
              <div className="max-w-3xl">
                {/* Section Label */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-4 mb-6"
                >
                  <span className="text-white/40 font-mono text-sm tracking-widest">
                    [ 0{activeIndex + 1} / 0{services.length} ]
                  </span>
                  <span className="w-12 h-px bg-white/30" />
                  <span 
                    className="text-sm uppercase tracking-widest font-medium"
                    style={{ color: activeService.color }}
                  >
                    {activeService.subtitle}
                  </span>
                </motion.div>

                {/* Icon */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 }}
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8"
                  style={{ 
                    background: `${activeService.color}20`,
                    border: `2px solid ${activeService.color}40`
                  }}
                >
                  <ActiveIcon className="w-10 h-10" style={{ color: activeService.color }} />
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
                >
                  {activeService.title}
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl md:text-2xl text-white/70 mb-8 leading-relaxed"
                >
                  {activeService.description}
                </motion.p>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap gap-3 mb-10"
                >
                  {activeService.features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-full text-sm font-medium text-white/80 border"
                      style={{ 
                        borderColor: `${activeService.color}50`,
                        background: `${activeService.color}10`
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    to={activeService.link}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all group hover:gap-5"
                    style={{ 
                      background: activeService.color,
                      boxShadow: `0 0 40px ${activeService.color}40`
                    }}
                  >
                    Explore Service
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goPrev}
        disabled={activeIndex === 0}
        className={`absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all hover:bg-white/20 hover:scale-110 ${
          activeIndex === 0 ? "opacity-30 cursor-not-allowed" : ""
        }`}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goNext}
        disabled={activeIndex === services.length - 1}
        className={`absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all hover:bg-white/20 hover:scale-110 ${
          activeIndex === services.length - 1 ? "opacity-30 cursor-not-allowed" : ""
        }`}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom Thumbnail Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-3 p-2 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isActive = index === activeIndex;
            
            return (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
                  isActive ? "w-32 h-20" : "w-16 h-16 hover:w-20"
                }`}
              >
                {/* Thumbnail Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 hover:scale-110"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
                
                {/* Overlay */}
                <div 
                  className={`absolute inset-0 transition-all duration-300 ${
                    isActive ? "opacity-60" : "opacity-80 hover:opacity-60"
                  }`}
                  style={{ background: isActive ? service.color : "#000" }}
                />
                
                {/* Icon & Number */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {isActive ? (
                    <div className="text-center">
                      <Icon className="w-6 h-6 text-white mx-auto mb-1" />
                      <span className="text-white text-xs font-medium truncate px-2 block">
                        {service.title}
                      </span>
                    </div>
                  ) : (
                    <span className="text-white/80 font-mono text-sm font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  )}
                </div>

                {/* Active Border */}
                {isActive && (
                  <div 
                    className="absolute inset-0 rounded-xl border-2"
                    style={{ borderColor: service.color }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Swipe Hint */}
      <motion.div 
        className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 text-white/40 text-sm flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Swipe to explore</span>
        <ChevronRight className="w-4 h-4" />
      </motion.div>
    </section>
  );
};

export default ServicesSection;
