import { useState } from "react";
import { Link } from "react-router-dom";
import { Megaphone, Users, Globe, TrendingUp, Shield, Zap, ArrowUpRight, Check } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import CalendlyButton from "@/components/CalendlyButton";

const services = [
  {
    id: "kol-marketing",
    number: "01",
    icon: Megaphone,
    title: "KOL & Influence Network",
    description: "Direct trust building with Korea's top crypto influencers across Twitter, YouTube, and local platforms.",
    fullDescription: "Partner with Korea's top crypto influencers to amplify your project's reach. We manage relationships with 100+ verified KOLs across Twitter, YouTube, and Korean platforms like Naver.",
    features: ["Tier 1-3 KOL Selection", "Campaign Strategy & Management", "Content Coordination", "Performance Analytics & ROI Tracking"],
    stat: "100+",
    statLabel: "Verified KOLs",
  },
  {
    id: "community-building",
    number: "02",
    icon: Users,
    title: "Community Growth",
    description: "Full setup and management of Korean Telegram, Discord, and KakaoTalk channels.",
    fullDescription: "Build a thriving Korean community from scratch or enhance your existing presence. We handle everything from platform setup to 24/7 Korean moderation.",
    features: ["Platform Setup & Branding", "24/7 Korean Moderation", "Engagement Programs & Events", "AMA Sessions & Live Support"],
    stat: "500K+",
    statLabel: "Members Managed",
  },
  {
    id: "pr-media",
    number: "03",
    icon: Globe,
    title: "PR & Media Relations",
    description: "Tier-1 Korean crypto media placements, press releases, and exclusive interview opportunities.",
    fullDescription: "Secure coverage in leading Korean crypto publications and mainstream media. From press releases to exclusive interviews, we handle your complete Korean media strategy.",
    features: ["Press Release Distribution", "Media Interviews & Features", "News Coverage & Articles", "Crisis Management"],
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
    features: ["Market Research & Analysis", "Competitor Landscape Study", "Launch Planning & Execution", "Growth Roadmap Development"],
    stat: "30+",
    statLabel: "Successful Launches",
  },
  {
    id: "vasp-compliance",
    number: "05",
    icon: Shield,
    title: "VASP & Compliance",
    description: "Navigate Korean regulations and secure the licenses you need to operate legally.",
    fullDescription: "Get compliant in Korea's regulated crypto market. We guide you through VASP registration, AML/KYC requirements, and ongoing compliance obligations.",
    features: ["VASP Registration Support", "Compliance Consulting", "Legal Partnership Network", "Ongoing Regulatory Support"],
    stat: "100%",
    statLabel: "Success Rate",
  },
  {
    id: "events",
    number: "06",
    icon: Zap,
    title: "Events & Conferences",
    description: "From Korea Blockchain Week to exclusive meetups — presence at major Korean events.",
    fullDescription: "Make an impact at major Korean blockchain events or host your own. We manage everything from booth setup to VIP networking events and speaker placements.",
    features: ["Event Planning & Logistics", "Booth Design & Management", "Speaker Placement", "VIP Networking Events"],
    stat: "20+",
    statLabel: "Events Per Year",
  },
];

const Services = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left - What */}
            <div>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-foreground mb-8">
                Services
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Everything you need to successfully enter and grow in Korea's vibrant crypto market. Full-service Web3 marketing from strategy to execution.
              </p>
              <CalendlyButton 
                variant="outline" 
                className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                [ book a meeting ]
              </CalendlyButton>
            </div>

            {/* Right - Includes */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Includes
              </h2>
              <div className="space-y-4">
                {services.slice(0, 4).map((service, index) => (
                  <div 
                    key={service.id}
                    className="flex items-baseline justify-between py-4 border-b border-dashed border-border/50"
                  >
                    <span className="text-muted-foreground">{service.title}</span>
                    <span className="text-sm font-mono text-primary">[ {service.number} ]</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={ref} className="py-16 px-4 border-t border-border/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={`group p-6 rounded-2xl bg-card/50 border border-border/50 cursor-pointer transition-all duration-300 hover:border-primary/50 hover:bg-card ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${100 + index * 50}ms` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-mono text-muted-foreground/30">
                    {service.number}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <div className="w-12 h-12 rounded-xl border border-border/50 flex items-center justify-center mb-4 group-hover:border-primary/50 transition-colors">
                  <service.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />

      {/* Service Detail Modal */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-lg rounded-2xl border border-border bg-card">
          {selectedService && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl border border-border flex items-center justify-center">
                    <selectedService.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-4xl font-mono text-muted-foreground/30">{selectedService.number}</span>
                </div>
                <DialogTitle className="text-2xl font-bold text-foreground">{selectedService.title}</DialogTitle>
                <DialogDescription className="text-muted-foreground leading-relaxed mt-2 text-base">
                  {selectedService.fullDescription}
                </DialogDescription>
              </DialogHeader>
              
              <div className="flex items-baseline gap-2 mt-4 p-4 rounded-xl bg-muted/30 border border-border/50">
                <span className="text-3xl font-bold text-primary">{selectedService.stat}</span>
                <span className="text-muted-foreground">{selectedService.statLabel}</span>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold text-foreground mb-4">What's Included</h4>
                <div className="space-y-3">
                  {selectedService.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border border-primary/50 flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <Link to="/contact" className="flex-1">
                  <Button className="w-full rounded-full bg-primary hover:bg-primary/90">
                    Get Started
                  </Button>
                </Link>
                <Button variant="outline" onClick={() => setSelectedService(null)} className="rounded-full border-border">
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Services;