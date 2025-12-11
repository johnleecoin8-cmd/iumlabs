import { useState } from "react";
import { Link } from "react-router-dom";
import { Megaphone, Users, Globe, TrendingUp, Shield, Zap, ArrowRight, ArrowUpRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TiltCard from "@/components/TiltCard";

const services = [
  {
    id: "kol-marketing",
    icon: Megaphone,
    title: "KOL Marketing",
    description: "Access Korea's most influential crypto KOLs and build authentic community connections.",
    fullDescription: "Partner with Korea's top crypto influencers to amplify your project's reach. We manage relationships with 100+ verified KOLs across Twitter, YouTube, and Korean platforms.",
    features: ["Tier 1-3 KOL Selection", "Campaign Strategy", "Content Coordination", "Performance Analytics"],
    color: "from-primary/30 to-orange-500/20",
    glowColor: "group-hover:shadow-primary/20",
    stat: "100+",
    statLabel: "Verified KOLs",
    featured: true,
    process: ["Strategy", "KOL Selection", "Campaign", "Analytics"]
  },
  {
    id: "community-building",
    icon: Users,
    title: "Community Building",
    description: "Discord, Telegram, KakaoTalk — we build and manage engaged Korean communities.",
    fullDescription: "Build a thriving Korean community from scratch or enhance your existing presence. We handle everything from setup to 24/7 moderation in Korean.",
    features: ["Platform Setup", "Korean Moderation", "Engagement Programs", "AMA Sessions"],
    color: "from-blue-500/20 to-cyan-500/20",
    glowColor: "group-hover:shadow-blue-500/20",
    stat: "500K+",
    statLabel: "Members Managed"
  },
  {
    id: "pr-media",
    icon: Globe,
    title: "PR & Media",
    description: "Get featured in Korea's top crypto media outlets and mainstream press.",
    fullDescription: "Secure coverage in leading Korean crypto publications and mainstream media. From press releases to exclusive interviews, we handle your Korean media strategy.",
    features: ["Press Release Distribution", "Media Interviews", "News Coverage", "Crisis Management"],
    color: "from-purple-500/20 to-pink-500/20",
    glowColor: "group-hover:shadow-purple-500/20",
    stat: "50+",
    statLabel: "Publications"
  },
  {
    id: "gtm-strategy",
    icon: TrendingUp,
    title: "Go-To-Market Strategy",
    description: "Comprehensive GTM plans tailored for the unique Korean market dynamics.",
    fullDescription: "Launch successfully in Korea with data-driven strategies that account for local market dynamics, competitive landscape, and user behavior patterns.",
    features: ["Market Research", "Competitor Analysis", "Launch Planning", "Growth Roadmap"],
    color: "from-green-500/20 to-emerald-500/20",
    glowColor: "group-hover:shadow-green-500/20",
    stat: "30+",
    statLabel: "Launches"
  },
  {
    id: "vasp-acquisition",
    icon: Shield,
    title: "VASP Acquisition",
    description: "Navigate Korean regulations and secure the licenses you need to operate.",
    fullDescription: "Get compliant in Korea's regulated crypto market. We guide you through VASP registration, AML/KYC requirements, and ongoing compliance obligations.",
    features: ["VASP Registration", "Compliance Consulting", "Legal Partnership", "Ongoing Support"],
    color: "from-yellow-500/20 to-amber-500/20",
    glowColor: "group-hover:shadow-yellow-500/20",
    stat: "100%",
    statLabel: "Success Rate"
  },
  {
    id: "event-management",
    icon: Zap,
    title: "Event Management",
    description: "From Korea Blockchain Week to exclusive meetups — we handle it all.",
    fullDescription: "Make an impact at major Korean blockchain events or host your own. We manage everything from booth setup to VIP networking events.",
    features: ["Event Planning", "Booth Management", "Speaker Placement", "Networking Events"],
    color: "from-pink-500/20 to-rose-500/20",
    glowColor: "group-hover:shadow-pink-500/20",
    stat: "20+",
    statLabel: "Events"
  },
];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  const featuredService = services[0];
  const otherServices = services.slice(1);

  return (
    <section ref={ref} id="services" className="py-24 md:py-32 relative overflow-hidden">
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
        {/* Ambient gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-[128px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <span className="text-primary font-mono text-sm tracking-wider mb-4 block">01. SERVICES</span>
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

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Featured Card - KOL Marketing */}
          <TiltCard
            onClick={() => setSelectedService(featuredService)}
            max={6}
            scale={1.01}
            className={`animated-border-featured group md:col-span-2 lg:col-span-2 lg:row-span-2 relative p-8 md:p-10 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm cursor-pointer overflow-hidden ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Background glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/20 transition-colors duration-500" />
            
            <div className="relative z-10" style={{ transform: 'translateZ(40px)' }}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-medium text-primary">Most Popular</span>
              </div>

              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${featuredService.color} flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`} style={{ transform: 'translateZ(60px)' }}>
                <featuredService.icon className="w-8 h-8 text-foreground" />
              </div>

              {/* Content */}
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                {featuredService.title}
              </h3>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg mb-8">
                {featuredService.fullDescription}
              </p>

              {/* Stats */}
              <div className="flex items-baseline gap-2 mb-8" style={{ transform: 'translateZ(30px)' }}>
                <span className="text-5xl md:text-6xl font-bold text-primary">{featuredService.stat}</span>
                <span className="text-muted-foreground text-sm">{featuredService.statLabel}</span>
              </div>

              {/* Process Flow */}
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                {featuredService.process?.map((step, idx) => (
                  <div key={step} className="flex items-center gap-2 md:gap-3">
                    <span className="px-3 py-1.5 rounded-full bg-card/80 border border-border/50 text-xs md:text-sm text-foreground/80">
                      {step}
                    </span>
                    {idx < (featuredService.process?.length || 0) - 1 && (
                      <ArrowRight className="w-3 h-3 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>

              {/* Arrow indicator */}
              <div className="absolute bottom-8 right-8 md:bottom-10 md:right-10" style={{ transform: 'translateZ(50px)' }}>
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Other Service Cards */}
          {otherServices.map((service, index) => (
            <TiltCard
              key={service.id}
              onClick={() => setSelectedService(service)}
              max={12}
              scale={1.03}
              className={`animated-border-card animated-border-${service.id} group relative p-6 md:p-8 bg-card/50 backdrop-blur-sm cursor-pointer overflow-hidden ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              {/* Hover gradient */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                {/* Icon & Stat Row */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`} style={{ transform: 'translateZ(40px)' }}>
                    <service.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <div className="text-right" style={{ transform: 'translateZ(30px)' }}>
                    <div className="text-2xl font-bold text-foreground">{service.stat}</div>
                    <div className="text-xs text-muted-foreground">{service.statLabel}</div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors" style={{ transform: 'translateZ(20px)' }}>
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Arrow indicator */}
                <div className="mt-6 flex items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" style={{ transform: 'translateZ(25px)' }}>
                  <span className="font-medium">Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
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
