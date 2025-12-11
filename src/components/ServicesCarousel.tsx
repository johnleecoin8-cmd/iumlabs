import { useRef, useState } from "react";
import { Users, Globe, TrendingUp, Shield, Zap, ArrowRight, ArrowLeft, GripHorizontal } from "lucide-react";
import TiltCard from "@/components/TiltCard";

const services = [
  {
    id: "community-building",
    icon: Users,
    title: "Community Building",
    description: "Discord, Telegram, KakaoTalk — we build and manage engaged Korean communities.",
    fullDescription: "Build a thriving Korean community from scratch or enhance your existing presence. We handle everything from setup to 24/7 moderation in Korean.",
    features: ["Platform Setup", "Korean Moderation", "Engagement Programs", "AMA Sessions"],
    color: "from-blue-500/30 to-cyan-500/20",
    gradientClass: "animated-border-community-building",
    stat: "500K+",
    statLabel: "Members Managed",
  },
  {
    id: "pr-media",
    icon: Globe,
    title: "PR & Media",
    description: "Get featured in Korea's top crypto media outlets and mainstream press.",
    fullDescription: "Secure coverage in leading Korean crypto publications and mainstream media.",
    features: ["Press Release Distribution", "Media Interviews", "News Coverage", "Crisis Management"],
    color: "from-purple-500/30 to-pink-500/20",
    gradientClass: "animated-border-pr-media",
    stat: "50+",
    statLabel: "Publications",
  },
  {
    id: "gtm-strategy",
    icon: TrendingUp,
    title: "Go-To-Market Strategy",
    description: "Comprehensive GTM plans tailored for the unique Korean market dynamics.",
    fullDescription: "Launch successfully in Korea with data-driven strategies.",
    features: ["Market Research", "Competitor Analysis", "Launch Planning", "Growth Roadmap"],
    color: "from-green-500/30 to-emerald-500/20",
    gradientClass: "animated-border-gtm-strategy",
    stat: "30+",
    statLabel: "Launches",
  },
  {
    id: "vasp-acquisition",
    icon: Shield,
    title: "VASP Acquisition",
    description: "Navigate Korean regulations and secure the licenses you need to operate.",
    fullDescription: "Get compliant in Korea's regulated crypto market.",
    features: ["VASP Registration", "Compliance Consulting", "Legal Partnership", "Ongoing Support"],
    color: "from-yellow-500/30 to-amber-500/20",
    gradientClass: "animated-border-vasp-acquisition",
    stat: "100%",
    statLabel: "Success Rate",
  },
  {
    id: "event-management",
    icon: Zap,
    title: "Event Management",
    description: "From Korea Blockchain Week to exclusive meetups — we handle it all.",
    fullDescription: "Make an impact at major Korean blockchain events.",
    features: ["Event Planning", "Booth Management", "Speaker Placement", "Networking Events"],
    color: "from-pink-500/30 to-rose-500/20",
    gradientClass: "animated-border-event-management",
    stat: "20+",
    statLabel: "Events",
  },
];

interface ServicesCarouselProps {
  isVisible: boolean;
  onSelectService: (service: typeof services[0]) => void;
}

const ServicesCarousel = ({ isVisible, onSelectService }: ServicesCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 380;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`mt-16 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      {/* Carousel Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h4 className="text-xl md:text-2xl font-bold text-foreground">More Services</h4>
          <div className="hidden md:flex items-center gap-2 text-muted-foreground text-sm">
            <GripHorizontal className="w-4 h-4" />
            <span>Drag to explore</span>
          </div>
        </div>
        
        {/* Navigation Arrows */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-colors"
          >
            <ArrowRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className={`flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory cursor-grab ${isDragging ? "cursor-grabbing" : ""}`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {services.map((service, index) => (
          <TiltCard
            key={service.id}
            onClick={() => !isDragging && onSelectService(service)}
            max={10}
            scale={1.02}
            className={`animated-border-card ${service.gradientClass} group flex-shrink-0 w-[320px] md:w-[360px] snap-center relative p-6 md:p-8 bg-card/50 backdrop-blur-sm cursor-pointer overflow-hidden`}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            {/* Hover gradient */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
            
            <div className="relative z-10">
              {/* Header Row */}
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <service.icon className="w-7 h-7 text-foreground" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-foreground">{service.stat}</div>
                  <div className="text-xs text-muted-foreground">{service.statLabel}</div>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Features Preview */}
              <div className="flex flex-wrap gap-2 mb-6">
                {service.features.slice(0, 2).map((feature) => (
                  <span
                    key={feature}
                    className="text-xs px-3 py-1 rounded-full bg-card/80 border border-border/30 text-foreground/70"
                  >
                    {feature}
                  </span>
                ))}
                {service.features.length > 2 && (
                  <span className="text-xs px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
                    +{service.features.length - 2} more
                  </span>
                )}
              </div>

              {/* Arrow indicator */}
              <div className="flex items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2">
                <span className="font-medium">View Details</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </TiltCard>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {services.map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 rounded-full bg-border/50 transition-colors"
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesCarousel;
