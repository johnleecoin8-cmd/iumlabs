import { useState } from "react";
import { Link } from "react-router-dom";
import { Megaphone, Users, Globe, TrendingUp, Shield, Zap, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: "kol-marketing",
    icon: Megaphone,
    title: "KOL Marketing",
    description: "Access Korea's most influential crypto KOLs and build authentic community connections.",
    fullDescription: "Partner with Korea's top crypto influencers to amplify your project's reach. We manage relationships with 100+ verified KOLs across Twitter, YouTube, and Korean platforms.",
    features: ["Tier 1-3 KOL Selection", "Campaign Strategy", "Content Coordination", "Performance Analytics"],
    color: "from-red-500/20 to-orange-500/20"
  },
  {
    id: "community-building",
    icon: Users,
    title: "Community Building",
    description: "Discord, Telegram, KakaoTalk — we build and manage engaged Korean communities.",
    fullDescription: "Build a thriving Korean community from scratch or enhance your existing presence. We handle everything from setup to 24/7 moderation in Korean.",
    features: ["Platform Setup", "Korean Moderation", "Engagement Programs", "AMA Sessions"],
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    id: "pr-media",
    icon: Globe,
    title: "PR & Media",
    description: "Get featured in Korea's top crypto media outlets and mainstream press.",
    fullDescription: "Secure coverage in leading Korean crypto publications and mainstream media. From press releases to exclusive interviews, we handle your Korean media strategy.",
    features: ["Press Release Distribution", "Media Interviews", "News Coverage", "Crisis Management"],
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: "gtm-strategy",
    icon: TrendingUp,
    title: "Go-To-Market Strategy",
    description: "Comprehensive GTM plans tailored for the unique Korean market dynamics.",
    fullDescription: "Launch successfully in Korea with data-driven strategies that account for local market dynamics, competitive landscape, and user behavior patterns.",
    features: ["Market Research", "Competitor Analysis", "Launch Planning", "Growth Roadmap"],
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    id: "vasp-acquisition",
    icon: Shield,
    title: "VASP Acquisition",
    description: "Navigate Korean regulations and secure the licenses you need to operate.",
    fullDescription: "Get compliant in Korea's regulated crypto market. We guide you through VASP registration, AML/KYC requirements, and ongoing compliance obligations.",
    features: ["VASP Registration", "Compliance Consulting", "Legal Partnership", "Ongoing Support"],
    color: "from-yellow-500/20 to-amber-500/20"
  },
  {
    id: "event-management",
    icon: Zap,
    title: "Event Management",
    description: "From Korea Blockchain Week to exclusive meetups — we handle it all.",
    fullDescription: "Make an impact at major Korean blockchain events or host your own. We manage everything from booth setup to VIP networking events.",
    features: ["Event Planning", "Booth Management", "Speaker Placement", "Networking Events"],
    color: "from-pink-500/20 to-rose-500/20"
  },
];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <section ref={ref} id="services" className="py-24 md:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-primary font-mono text-sm tracking-wider mb-4 block">01. SERVICES</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl tracking-tight mb-6">
            <span className="font-serif italic text-muted-foreground">Full-Service</span>{" "}
            <span className="font-sans font-bold text-foreground">Web3 Marketing</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Everything you need to successfully enter and grow in Korea's vibrant crypto market.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className={`group p-8 rounded-2xl border border-border/30 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-7 h-7 text-foreground" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Arrow indicator */}
              <div className="mt-6 flex items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="font-medium">Learn more</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-2xl rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl">
          {selectedService && (
            <>
              <DialogHeader>
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${selectedService.color} flex items-center justify-center mb-4`}>
                  <selectedService.icon className="w-8 h-8 text-foreground" />
                </div>
                <DialogTitle className="text-2xl font-bold text-foreground">{selectedService.title}</DialogTitle>
                <DialogDescription className="text-muted-foreground text-base leading-relaxed mt-2">
                  {selectedService.fullDescription}
                </DialogDescription>
              </DialogHeader>
              
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
