import { useState } from "react";
import { 
  Megaphone, 
  Users, 
  Globe, 
  TrendingUp, 
  Shield, 
  Zap, 
  ArrowRight,
  X,
  Calendar
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import CalendlyButton from "@/components/CalendlyButton";

const services = [
  {
    id: "kol-marketing",
    number: "01",
    icon: Megaphone,
    color: "cyan",
    title: "KOL & Influence Network",
    description: "Direct trust building with Korea's top crypto influencers across Twitter, YouTube, and local platforms.",
    fullDescription: "Partner with Korea's top crypto influencers to amplify your project's reach. We manage relationships with 1,000+ verified KOLs across Twitter, YouTube, and Korean platforms like Naver.",
    features: ["Tier 1-3 KOL Selection", "Campaign Strategy & Management", "Content Coordination", "Performance Analytics & ROI Tracking"],
    stat: "1,000+",
    statLabel: "Verified KOLs",
  },
  {
    id: "community-building",
    number: "02",
    icon: Users,
    color: "purple",
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
    color: "green",
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
    color: "cyan",
    title: "Go-To-Market Strategy",
    description: "Data-driven launch planning tailored for the unique Korean market dynamics.",
    fullDescription: "Launch successfully in Korea with data-driven strategies that account for local market dynamics, competitive landscape, and user behavior patterns.",
    features: ["Market Research & Analysis", "Competitor Landscape Study", "Launch Planning & Execution", "Growth Roadmap Development"],
    stat: "200+",
    statLabel: "Successful Launches",
  },
  {
    id: "vasp-compliance",
    number: "05",
    icon: Shield,
    color: "pink",
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
    color: "blue",
    title: "Events & Conferences",
    description: "From Korea Blockchain Week to exclusive meetups — presence at major Korean events.",
    fullDescription: "Make an impact at major Korean blockchain events or host your own. We manage everything from booth setup to VIP networking events and speaker placements.",
    features: ["Event Planning & Logistics", "Booth Design & Management", "Speaker Placement", "VIP Networking Events"],
    stat: "20+",
    statLabel: "Events Per Year",
  },
];

const serviceTags = [
  { label: "All Services", color: "cyan" },
  { label: "Marketing", color: "purple" },
  { label: "Community", color: "green" },
  { label: "Events", color: "pink" },
  { label: "Institutional", color: "blue" },
];

const Services = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero - Dark Section */}
      <section className="section-dark pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <span className="number-badge text-[hsl(var(--dark-fg))] opacity-60 mb-4 inline-block">Our Services</span>
              <h1 className="text-5xl md:text-7xl font-light text-[hsl(var(--dark-fg))] leading-tight mb-6">
                Full-Service <span className="serif-italic">Web3</span>
                <br />
                Marketing
              </h1>
              <p className="text-lg text-[hsl(var(--dark-fg))] opacity-60 mb-8 max-w-lg">
                Everything you need to successfully enter and grow in Korea's vibrant crypto market.
              </p>
              <CalendlyButton className="lunar-btn">
                <Calendar className="w-4 h-4" />
                <span>Book a Consultation</span>
              </CalendlyButton>
            </div>

            {/* Right - Service Tags */}
            <div>
              <h2 className="text-2xl font-light text-[hsl(var(--dark-fg))] mb-6">Categories</h2>
              <div className="flex flex-wrap gap-3">
                {serviceTags.map((tag) => (
                  <span key={tag.label} className={`service-tag service-tag-${tag.color}`}>
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - Light */}
      <section ref={ref} className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`group bg-card border border-border/50 rounded-2xl p-6 cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Number Badge + Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="number-badge">{service.number}</span>
                    <div className={`service-icon service-icon-${service.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4">
                    {service.description}
                  </p>

                  {/* Stat */}
                  <div className="flex items-baseline gap-2 mb-4 pt-4 border-t border-border/50">
                    <span className="text-2xl font-bold text-primary">{service.stat}</span>
                    <span className="text-sm text-muted-foreground">{service.statLabel}</span>
                  </div>

                  {/* Learn More */}
                  <button className="inline-flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />

      {/* Service Modal */}
      {selectedService && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm"
          onClick={() => setSelectedService(null)}
        >
          <div 
            className="bg-card border border-border rounded-2xl p-8 max-w-lg w-full shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`service-icon service-icon-${selectedService.color}`}>
                <selectedService.icon className="w-6 h-6" />
              </div>
              <button 
                onClick={() => setSelectedService(null)}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-2xl font-medium text-foreground mb-2">{selectedService.title}</h3>
            
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold text-primary">{selectedService.stat}</span>
              <span className="text-muted-foreground">{selectedService.statLabel}</span>
            </div>

            <p className="text-muted-foreground mb-6">{selectedService.fullDescription}</p>

            <div className="mb-8">
              <h4 className="text-sm font-medium text-foreground mb-3">What's included:</h4>
              <ul className="space-y-2">
                {selectedService.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <CalendlyButton className="lunar-btn w-full">
              Get Started
            </CalendlyButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
