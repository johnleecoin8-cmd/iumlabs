import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { Users, Megaphone, Building2, Mic2, Newspaper, Calendar, ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";

// Import service images
import kolNetworkImg from "@/assets/services/kol-network.jpg";
import communityGrowthImg from "@/assets/services/community-growth.jpg";
import vaspComplianceImg from "@/assets/services/vasp-compliance.jpg";
import prMediaImg from "@/assets/services/pr-media.jpg";
import eventsImg from "@/assets/services/events.jpg";
import gtmStrategyImg from "@/assets/services/gtm-strategy.jpg";

const services = [{
  icon: Users,
  title: "KOL Marketing",
  description: "Access 1000+ vetted Korean crypto influencers across YouTube, Twitter, and Telegram",
  fullDescription: "Partner with Korea's top crypto influencers to amplify your project's reach. We manage relationships with 1,000+ verified KOLs across Twitter, YouTube, and Korean platforms like Naver.",
  features: ["Access to 1,000+ vetted Korean crypto KOLs", "YouTube, Twitter, Telegram, Naver coverage", "Performance tracking & analytics", "Campaign strategy & execution"],
  image: kolNetworkImg,
  color: "#FF6B35"
}, {
  icon: Megaphone,
  title: "Community Operation",
  description: "24/7 Korean community management with native speakers",
  fullDescription: "Build a thriving Korean community from scratch or enhance your existing presence. We handle everything from platform setup to 24/7 Korean moderation across Telegram, Discord, and KakaoTalk.",
  features: ["24/7 Korean native moderation", "Telegram, Discord, KakaoTalk management", "Community engagement programs", "Sentiment analysis & reporting"],
  image: communityGrowthImg,
  color: "#00D9FF"
}, {
  icon: Building2,
  title: "Exchange Support",
  description: "VASP compliance and CEX/DEX listing support",
  fullDescription: "Get compliant in Korea's regulated crypto market. We guide you through VASP registration, AML/KYC requirements, and ongoing compliance obligations.",
  features: ["VASP registration guidance", "CEX & DEX listing support", "AML/KYC compliance setup", "Regulatory consulting"],
  image: vaspComplianceImg,
  color: "#A855F7"
}, {
  icon: Newspaper,
  title: "Media & PR",
  description: "Coverage in top Korean crypto media outlets",
  fullDescription: "Secure coverage in leading Korean crypto publications and mainstream media. From press releases to exclusive interviews, we handle your complete Korean media strategy.",
  features: ["50+ Korean media partnerships", "Press release distribution", "Exclusive interview placements", "Crisis management"],
  image: prMediaImg,
  color: "#10B981"
}, {
  icon: Mic2,
  title: "AMA Hosting",
  description: "Live AMAs with Korean communities",
  fullDescription: "Engage directly with Korean crypto communities through professionally hosted AMAs. We handle everything from scheduling to live translation and community engagement.",
  features: ["Professional AMA hosting", "Live Korean translation", "Community Q&A management", "Post-AMA content creation"],
  image: gtmStrategyImg,
  color: "#F59E0B"
}, {
  icon: Calendar,
  title: "Offline Events",
  description: "Side events, meetups, and conference presence in Seoul",
  fullDescription: "Make an impact at major Korean blockchain events or host your own. We manage everything from booth setup to VIP networking events and speaker placements.",
  features: ["Conference booth management", "Side event organization", "VIP networking events", "Speaker placement"],
  image: eventsImg,
  color: "#EC4899"
}];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div ref={ref} className="relative px-4 py-16 md:py-24 bg-[#0A0A0B] overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] opacity-20" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className={`mb-12 md:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-white/30 text-sm font-mono">[ 01 ]</span>
            <span className="w-12 h-px bg-white/20" />
            <span className="text-white/50 text-sm uppercase tracking-widest">What We Do</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl">
            End-to-end Web3 marketing solutions tailored for the Korean market
          </p>
        </div>

        {/* Services Grid - Bento Style with Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setSelectedService(service)}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl ${
                index === 0 || index === 5 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
              style={{ minHeight: index === 0 || index === 5 ? '320px' : '280px' }}
            >
              {/* Image Background */}
              <div className="absolute inset-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div 
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${service.color}40 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.95) 100%)`
                  }}
                />
                {/* Extra dark overlay on hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Glow Effect on Hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 80px ${service.color}30`
                }}
              />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8">
                {/* Top - Number Badge */}
                <div className="flex items-center justify-between">
                  <span 
                    className="text-sm font-mono px-3 py-1 rounded-full border transition-all duration-300"
                    style={{ 
                      borderColor: hoveredIndex === index ? service.color : 'rgba(255,255,255,0.2)',
                      color: hoveredIndex === index ? service.color : 'rgba(255,255,255,0.5)'
                    }}
                  >
                    [ 0{index + 1} ]
                  </span>
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{ 
                      backgroundColor: hoveredIndex === index ? `${service.color}30` : 'rgba(255,255,255,0.1)'
                    }}
                  >
                    <service.icon 
                      className="w-6 h-6 transition-all duration-300" 
                      style={{ color: hoveredIndex === index ? service.color : 'white' }}
                    />
                  </div>
                </div>

                {/* Bottom - Title & Description */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:translate-x-2 transition-transform duration-300">
                    {service.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                    {service.description}
                  </p>
                  
                  {/* Hover Arrow */}
                  <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span className="text-sm font-medium" style={{ color: service.color }}>Learn more</span>
                    <ArrowUpRight className="w-4 h-4" style={{ color: service.color }} />
                  </div>
                </div>
              </div>

              {/* Border Glow */}
              <div 
                className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ borderColor: `${service.color}50` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Explore All Link */}
        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link 
            to="/services" 
            className="group inline-flex items-center gap-3 text-white/70 hover:text-primary transition-colors text-lg"
          >
            <span>Explore all services</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Service Detail Modal */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="bg-[hsl(0,0%,6%)] border-white/[0.08] text-white max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-4 mb-4">
              {selectedService && (
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${selectedService.color}20` }}
                >
                  <selectedService.icon className="w-7 h-7" style={{ color: selectedService.color }} />
                </div>
              )}
              <DialogTitle className="text-2xl font-bold">{selectedService?.title}</DialogTitle>
            </div>
          </DialogHeader>
          
          <p className="text-white/60 leading-relaxed mb-6">
            {selectedService?.fullDescription}
          </p>

          <div className="space-y-3">
            <h4 className="text-sm font-medium uppercase tracking-wider" style={{ color: selectedService?.color }}>
              What's Included
            </h4>
            <ul className="space-y-2">
              {selectedService?.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-white/50">
                  <span style={{ color: selectedService?.color }} className="mt-1">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-6 border-t border-white/[0.08]">
            <Link 
              to="/contact" 
              className="w-full inline-flex items-center justify-center gap-2 text-white px-6 py-3 rounded-xl transition-colors"
              style={{ backgroundColor: selectedService?.color }}
              onClick={() => setSelectedService(null)}
            >
              Get Started
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesSection;
