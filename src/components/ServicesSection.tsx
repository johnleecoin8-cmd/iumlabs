import { useState } from "react";
import { Link } from "react-router-dom";
import { Megaphone, Users, Globe, TrendingUp, Shield, Zap, ArrowRight, ArrowUpRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Numbered service cards - Lunar Strategy style
const services = [
  {
    id: "kol-marketing",
    number: "01",
    icon: Megaphone,
    title: "KOL & Influence Network",
    description: "Direct trust building with Korea's top crypto influencers across Twitter, YouTube, and local platforms.",
    fullDescription: "Partner with Korea's top crypto influencers to amplify your project's reach. We manage relationships with 100+ verified KOLs across Twitter, YouTube, and Korean platforms.",
    features: ["Tier 1-3 KOL Selection", "Campaign Strategy", "Content Coordination", "Performance Analytics"],
    stat: "100+",
    statLabel: "Verified KOLs",
  },
  {
    id: "community-building",
    number: "02",
    icon: Users,
    title: "Community Growth",
    description: "Full setup and management of Korean Telegram, Discord, and KakaoTalk channels.",
    fullDescription: "Build a thriving Korean community from scratch or enhance your existing presence. We handle everything from setup to 24/7 moderation in Korean.",
    features: ["Platform Setup", "Korean Moderation", "Engagement Programs", "AMA Sessions"],
    stat: "500K+",
    statLabel: "Members Managed",
  },
  {
    id: "pr-media",
    number: "03",
    icon: Globe,
    title: "PR & Media Relations",
    description: "Tier-1 Korean crypto media placements, press releases, and exclusive interview opportunities.",
    fullDescription: "Secure coverage in leading Korean crypto publications and mainstream media. From press releases to exclusive interviews, we handle your Korean media strategy.",
    features: ["Press Release Distribution", "Media Interviews", "News Coverage", "Crisis Management"],
    stat: "50+",
    statLabel: "Publications",
  },
  {
    id: "gtm-strategy",
    number: "04",
    icon: TrendingUp,
    title: "Go-To-Market Strategy",
    description: "Data-driven launch planning tailored for the unique Korean market dynamics.",
    fullDescription: "Launch successfully in Korea with data-driven strategies that account for local market dynamics, competitive landscape, and user behavior patterns.",
    features: ["Market Research", "Competitor Analysis", "Launch Planning", "Growth Roadmap"],
    stat: "30+",
    statLabel: "Launches",
  },
  {
    id: "vasp-compliance",
    number: "05",
    icon: Shield,
    title: "VASP & Compliance",
    description: "Navigate Korean regulations and secure the licenses you need to operate legally.",
    fullDescription: "Get compliant in Korea's regulated crypto market. We guide you through VASP registration, AML/KYC requirements, and ongoing compliance obligations.",
    features: ["VASP Registration", "Compliance Consulting", "Legal Partnership", "Ongoing Support"],
    stat: "100%",
    statLabel: "Success Rate",
  },
  {
    id: "events",
    number: "06",
    icon: Zap,
    title: "Events & Conferences",
    description: "From Korea Blockchain Week to exclusive meetups — presence at major Korean events.",
    fullDescription: "Make an impact at major Korean blockchain events or host your own. We manage everything from booth setup to VIP networking events.",
    features: ["Event Planning", "Booth Management", "Speaker Placement", "Networking Events"],
    stat: "20+",
    statLabel: "Events/Year",
  },
];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <section ref={ref} className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <span className="text-primary font-mono text-sm tracking-wider mb-4 block">OUR SERVICES</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Full-Service Web3<br />
              <span className="text-primary">Marketing</span>
            </h2>
          </div>
          <Link 
            to="/services" 
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <span className="font-medium">All Services</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Services Grid - Numbered Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className={`group p-6 rounded-2xl bg-card/50 border border-border/30 hover:border-primary/40 cursor-pointer transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${100 + index * 50}ms` }}
            >
              {/* Number + Arrow */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
                  {service.number}
                </span>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-lg rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl">
          {selectedService && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <selectedService.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-4xl font-bold text-primary/30">{selectedService.number}</span>
                </div>
                <DialogTitle className="text-xl font-bold text-foreground">{selectedService.title}</DialogTitle>
                <DialogDescription className="text-muted-foreground leading-relaxed mt-2">
                  {selectedService.fullDescription}
                </DialogDescription>
              </DialogHeader>
              
              {/* Stat */}
              <div className="flex items-baseline gap-2 mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <span className="text-3xl font-bold text-primary">{selectedService.stat}</span>
                <span className="text-sm text-muted-foreground">{selectedService.statLabel}</span>
              </div>
              
              {/* Features */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-foreground mb-3">What's Included</h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedService.features.map((feature, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Link to="/contact" className="flex-1">
                  <Button className="w-full rounded-full bg-primary hover:bg-primary/90">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" onClick={() => setSelectedService(null)} className="rounded-full">
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
