import { useState } from "react";
import { Link } from "react-router-dom";
import { Megaphone, Users, Globe, TrendingUp, Shield, Zap, ArrowRight, ArrowUpRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Services with diverse colors
const services = [
  {
    id: "kol-marketing",
    number: "01",
    icon: Megaphone,
    title: "KOL & Influence Network",
    description: "Direct trust building with Korea's top crypto influencers across Twitter, YouTube, and local platforms.",
    fullDescription: "Partner with Korea's top crypto influencers to amplify your project's reach.",
    features: ["Tier 1-3 KOL Selection", "Campaign Strategy", "Content Coordination", "Performance Analytics"],
    stat: "100+",
    statLabel: "Verified KOLs",
    color: "red",
    iconBg: "bg-red-100 text-red-600",
    cardBorder: "hover:border-red-300",
    numberColor: "text-red-200",
  },
  {
    id: "community-building",
    number: "02",
    icon: Users,
    title: "Community Growth",
    description: "Full setup and management of Korean Telegram, Discord, and KakaoTalk channels.",
    fullDescription: "Build a thriving Korean community from scratch or enhance your existing presence.",
    features: ["Platform Setup", "Korean Moderation", "Engagement Programs", "AMA Sessions"],
    stat: "500K+",
    statLabel: "Members Managed",
    color: "blue",
    iconBg: "bg-blue-100 text-blue-600",
    cardBorder: "hover:border-blue-300",
    numberColor: "text-blue-200",
  },
  {
    id: "pr-media",
    number: "03",
    icon: Globe,
    title: "PR & Media Relations",
    description: "Tier-1 Korean crypto media placements, press releases, and exclusive interview opportunities.",
    fullDescription: "Secure coverage in leading Korean crypto publications and mainstream media.",
    features: ["Press Release Distribution", "Media Interviews", "News Coverage", "Crisis Management"],
    stat: "50+",
    statLabel: "Publications",
    color: "green",
    iconBg: "bg-green-100 text-green-600",
    cardBorder: "hover:border-green-300",
    numberColor: "text-green-200",
  },
  {
    id: "gtm-strategy",
    number: "04",
    icon: TrendingUp,
    title: "Go-To-Market Strategy",
    description: "Data-driven launch planning tailored for the unique Korean market dynamics.",
    fullDescription: "Launch successfully in Korea with data-driven strategies.",
    features: ["Market Research", "Competitor Analysis", "Launch Planning", "Growth Roadmap"],
    stat: "30+",
    statLabel: "Launches",
    color: "purple",
    iconBg: "bg-purple-100 text-purple-600",
    cardBorder: "hover:border-purple-300",
    numberColor: "text-purple-200",
  },
  {
    id: "vasp-compliance",
    number: "05",
    icon: Shield,
    title: "VASP & Compliance",
    description: "Navigate Korean regulations and secure the licenses you need to operate legally.",
    fullDescription: "Get compliant in Korea's regulated crypto market.",
    features: ["VASP Registration", "Compliance Consulting", "Legal Partnership", "Ongoing Support"],
    stat: "100%",
    statLabel: "Success Rate",
    color: "orange",
    iconBg: "bg-orange-100 text-orange-600",
    cardBorder: "hover:border-orange-300",
    numberColor: "text-orange-200",
  },
  {
    id: "events",
    number: "06",
    icon: Zap,
    title: "Events & Conferences",
    description: "From Korea Blockchain Week to exclusive meetups — presence at major Korean events.",
    fullDescription: "Make an impact at major Korean blockchain events or host your own.",
    features: ["Event Planning", "Booth Management", "Speaker Placement", "Networking Events"],
    stat: "20+",
    statLabel: "Events/Year",
    color: "teal",
    iconBg: "bg-teal-100 text-teal-600",
    cardBorder: "hover:border-teal-300",
    numberColor: "text-teal-200",
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
            <span className="text-sm font-medium text-green-600 tracking-wider mb-4 block">OUR SERVICES</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Full-Service Web3<br />
              <span className="text-gradient">Marketing</span>
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

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className={`group p-6 rounded-2xl bg-card border border-border ${service.cardBorder} cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${100 + index * 50}ms` }}
            >
              {/* Number + Arrow */}
              <div className="flex items-center justify-between mb-6">
                <span className={`text-4xl font-bold ${service.numberColor}`}>
                  {service.number}
                </span>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl ${service.iconBg} flex items-center justify-center mb-4`}>
                <service.icon className="w-6 h-6" />
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
        <DialogContent className="max-w-lg rounded-2xl border border-border bg-card">
          {selectedService && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl ${selectedService.iconBg} flex items-center justify-center`}>
                    <selectedService.icon className="w-6 h-6" />
                  </div>
                  <span className={`text-4xl font-bold ${selectedService.numberColor}`}>{selectedService.number}</span>
                </div>
                <DialogTitle className="text-xl font-bold text-foreground">{selectedService.title}</DialogTitle>
                <DialogDescription className="text-muted-foreground leading-relaxed mt-2">
                  {selectedService.fullDescription}
                </DialogDescription>
              </DialogHeader>
              
              {/* Stat */}
              <div className="flex items-baseline gap-2 mt-4 p-4 rounded-xl bg-muted">
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
                  <Button className="w-full rounded-full bg-primary hover:bg-primary/90 shadow-md">
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
