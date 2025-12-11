import { useState } from "react";
import { Link } from "react-router-dom";
import { Megaphone, Users, Globe, TrendingUp, Shield, Zap, ArrowRight, ArrowUpRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ServiceShowcase from "@/components/ServiceShowcase";
import ServicesCarousel from "@/components/ServicesCarousel";

// Full service data for modal
const allServices = [
  {
    id: "kol-marketing",
    icon: Megaphone,
    title: "KOL Marketing",
    description: "Access Korea's most influential crypto KOLs and build authentic community connections.",
    fullDescription: "Partner with Korea's top crypto influencers to amplify your project's reach. We manage relationships with 100+ verified KOLs across Twitter, YouTube, and Korean platforms.",
    features: ["Tier 1-3 KOL Selection", "Campaign Strategy", "Content Coordination", "Performance Analytics"],
    color: "from-primary/30 to-orange-500/20",
    stat: "100+",
    statLabel: "Verified KOLs",
  },
  {
    id: "community-building",
    icon: Users,
    title: "Community Building",
    description: "Discord, Telegram, KakaoTalk — we build and manage engaged Korean communities.",
    fullDescription: "Build a thriving Korean community from scratch or enhance your existing presence. We handle everything from setup to 24/7 moderation in Korean.",
    features: ["Platform Setup", "Korean Moderation", "Engagement Programs", "AMA Sessions"],
    color: "from-blue-500/30 to-cyan-500/20",
    stat: "500K+",
    statLabel: "Members Managed",
  },
  {
    id: "pr-media",
    icon: Globe,
    title: "PR & Media",
    description: "Get featured in Korea's top crypto media outlets and mainstream press.",
    fullDescription: "Secure coverage in leading Korean crypto publications and mainstream media. From press releases to exclusive interviews, we handle your Korean media strategy.",
    features: ["Press Release Distribution", "Media Interviews", "News Coverage", "Crisis Management"],
    color: "from-purple-500/30 to-pink-500/20",
    stat: "50+",
    statLabel: "Publications",
  },
  {
    id: "gtm-strategy",
    icon: TrendingUp,
    title: "Go-To-Market Strategy",
    description: "Comprehensive GTM plans tailored for the unique Korean market dynamics.",
    fullDescription: "Launch successfully in Korea with data-driven strategies that account for local market dynamics, competitive landscape, and user behavior patterns.",
    features: ["Market Research", "Competitor Analysis", "Launch Planning", "Growth Roadmap"],
    color: "from-green-500/30 to-emerald-500/20",
    stat: "30+",
    statLabel: "Launches",
  },
  {
    id: "vasp-acquisition",
    icon: Shield,
    title: "VASP Acquisition",
    description: "Navigate Korean regulations and secure the licenses you need to operate.",
    fullDescription: "Get compliant in Korea's regulated crypto market. We guide you through VASP registration, AML/KYC requirements, and ongoing compliance obligations.",
    features: ["VASP Registration", "Compliance Consulting", "Legal Partnership", "Ongoing Support"],
    color: "from-yellow-500/30 to-amber-500/20",
    stat: "100%",
    statLabel: "Success Rate",
  },
  {
    id: "event-management",
    icon: Zap,
    title: "Event Management",
    description: "From Korea Blockchain Week to exclusive meetups — we handle it all.",
    fullDescription: "Make an impact at major Korean blockchain events or host your own. We manage everything from booth setup to VIP networking events.",
    features: ["Event Planning", "Booth Management", "Speaker Placement", "Networking Events"],
    color: "from-pink-500/30 to-rose-500/20",
    stat: "20+",
    statLabel: "Events",
  },
];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [selectedService, setSelectedService] = useState<typeof allServices[0] | null>(null);

  const handleSelectService = (service: any) => {
    // Find the full service data
    const fullService = allServices.find(s => s.id === service.id);
    if (fullService) {
      setSelectedService(fullService);
    }
  };

  return (
    <section ref={ref} id="services" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/10 to-background" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px'
          }}
        />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] animate-[float_20s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-[float_15s_ease-in-out_infinite_reverse]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <span className="text-primary font-mono text-sm tracking-wider mb-4 block">02. SERVICES</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl tracking-tight">
              <span className="font-serif italic text-muted-foreground">Full-Service</span>{" "}
              <span className="font-sans font-bold text-foreground">Web3 Marketing</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mt-4 text-lg">
              Everything you need to successfully enter and grow in Korea's vibrant crypto market.
            </p>
          </div>
          <Link 
            to="/services" 
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            <span className="font-medium">View All Services</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Featured Service Showcase */}
        <ServiceShowcase 
          isVisible={isVisible} 
          onLearnMore={() => setSelectedService(allServices[0])} 
        />

        {/* Other Services Carousel */}
        <ServicesCarousel 
          isVisible={isVisible} 
          onSelectService={handleSelectService}
        />
      </div>

      {/* Curved Section Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1440 60" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path 
            d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" 
            fill="hsl(var(--background))"
            fillOpacity="0.5"
          />
        </svg>
      </div>

      {/* Service Detail Modal */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-2xl rounded-3xl border border-border/50 bg-card/95 backdrop-blur-xl">
          {selectedService && (
            <>
              <DialogHeader>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedService.color} flex items-center justify-center mb-4`}>
                  <selectedService.icon className="w-8 h-8 text-foreground" />
                </div>
                <DialogTitle className="text-2xl font-bold text-foreground">{selectedService.title}</DialogTitle>
                <DialogDescription className="text-muted-foreground text-base leading-relaxed mt-2">
                  {selectedService.fullDescription}
                </DialogDescription>
              </DialogHeader>
              
              {/* Modal Stats */}
              <div className="flex items-baseline gap-3 mt-4 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                <span className="text-4xl font-bold text-primary">{selectedService.stat}</span>
                <span className="text-muted-foreground">{selectedService.statLabel}</span>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-foreground mb-4">What's Included</h4>
                <div className="grid grid-cols-2 gap-3">
                  {selectedService.features.map((feature, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-xl bg-card/50 border border-border/30"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <Link to="/contact" className="flex-1">
                  <Button className="w-full rounded-full bg-primary hover:bg-primary/90 group">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button variant="outline" onClick={() => setSelectedService(null)} className="rounded-full border-border/50 hover:bg-card">
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ServicesSection;
