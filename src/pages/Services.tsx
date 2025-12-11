import { useState, useEffect } from "react";
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
import networkAbstract from "@/assets/network-abstract.jpg";

const services = [
  {
    id: "kol-marketing",
    number: "01",
    icon: Megaphone,
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
    stat: "200+",
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

const floatingTags = [
  { label: "KOL Network", top: "18%", left: "4%", mobileTop: "12%", mobileLeft: "3%" },
  { label: "Community", top: "28%", right: "8%", mobileTop: "15%", mobileRight: "3%" },
  { label: "PR & Media", top: "50%", left: "3%", mobileTop: "75%", mobileLeft: "3%" },
  { label: "Exchange", bottom: "35%", right: "5%", mobileBottom: "18%", mobileRight: "3%" },
  { label: "VASP", bottom: "20%", left: "8%", mobileBottom: "10%", mobileLeft: "3%" },
];

const Services = () => {
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [modalAnimating, setModalAnimating] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openModal = (service: typeof services[0]) => {
    setSelectedService(service);
    setTimeout(() => setModalAnimating(true), 10);
  };

  const closeModal = () => {
    setModalAnimating(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero - Full Screen with Ken Burns Background */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background with Ken Burns */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat animate-kenburns"
            style={{ 
              backgroundImage: `url(${networkAbstract})`,
              filter: "brightness(0.35) saturate(1.2)",
            }}
          />
          
          {/* Aurora light overlay */}
          <div className="absolute inset-0 animate-aurora">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-cyan-500/15" />
            <div className="absolute inset-0 bg-gradient-to-bl from-purple-600/10 via-transparent to-blue-500/10" />
          </div>
          
          {/* Light sweep effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-light-sweep" />
          </div>
          
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.4)] via-transparent to-[hsl(0,0%,4%,0.95)]" />
        </div>
        
        {/* Floating Tags with Parallax */}
        <div>
          {floatingTags.map((tag, index) => (
            <span
              key={tag.label}
              className="lunar-tag-dark absolute animate-float hidden sm:block"
              style={{
                top: tag.top,
                left: tag.left,
                right: tag.right,
                bottom: tag.bottom,
                animationDelay: `${index * 0.5}s`,
                transform: `translateY(${scrollY * 0.08}px)`,
              }}
            >
              {tag.label}
            </span>
          ))}
          {/* Mobile floating tags */}
          {floatingTags.slice(0, 3).map((tag, index) => (
            <span
              key={`mobile-${tag.label}`}
              className="lunar-tag-dark absolute animate-float sm:hidden"
              style={{
                top: tag.mobileTop,
                left: tag.mobileLeft,
                right: tag.mobileRight,
                bottom: tag.mobileBottom,
                animationDelay: `${index * 0.5}s`,
              }}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* Content with Stagger Animation */}
        <div className="container mx-auto max-w-7xl px-4 relative z-10 pt-32 pb-24">
          <div className="mb-16">
            <span className="text-sm text-white/50 mb-4 block opacity-0 animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>[ Our Services ]</span>
            <h1 className="text-[12vw] md:text-[150px] lg:text-[180px] font-light text-white leading-[0.85] tracking-tight opacity-0 animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              Ser<span className="serif-italic text-primary">v</span>ices
            </h1>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 border-t border-white/10 opacity-0 animate-fade-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <p className="text-lg text-white/60 max-w-xl">
              Everything you need to successfully enter and grow in Korea's vibrant crypto market.
            </p>
            <CalendlyButton className="lunar-btn">
              <Calendar className="w-4 h-4" />
              <span>Book a Consultation</span>
            </CalendlyButton>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-white/30">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-pulse" />
          <span className="text-xs uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* Services Grid - Light Theme */}
      <section ref={gridRef} className="section-light py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  onClick={() => openModal(service)}
                  className={`group bg-white border border-[hsl(var(--light-fg),0.1)] rounded-2xl p-8 cursor-pointer hover:border-primary/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ${
                    gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Number Badge + Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-[hsl(var(--light-fg),0.4)]">[ {service.number} ]</span>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-medium text-[hsl(var(--light-fg))] mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[hsl(var(--light-fg),0.6)] text-sm mb-6">
                    {service.description}
                  </p>

                  {/* Stat */}
                  <div className="flex items-baseline gap-2 mb-6 pt-6 border-t border-[hsl(var(--light-fg),0.1)]">
                    <span className="text-3xl font-bold text-primary">{service.stat}</span>
                    <span className="text-sm text-[hsl(var(--light-fg),0.5)]">{service.statLabel}</span>
                  </div>

                  {/* Learn More */}
                  <button className="inline-flex items-center gap-2 text-sm text-[hsl(var(--light-fg),0.5)] group-hover:text-primary transition-colors">
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
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
            modalAnimating ? 'bg-black/50 backdrop-blur-sm' : 'bg-black/0'
          }`}
          onClick={closeModal}
        >
          <div 
            className={`bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl transition-all duration-300 ${
              modalAnimating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'
            }`}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <selectedService.icon className="w-6 h-6" />
              </div>
              <button 
                onClick={closeModal}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <h3 className="text-2xl font-medium text-gray-900 mb-2">{selectedService.title}</h3>
            
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold text-primary">{selectedService.stat}</span>
              <span className="text-gray-500">{selectedService.statLabel}</span>
            </div>

            <p className="text-gray-600 mb-6">{selectedService.fullDescription}</p>

            <div className="mb-8">
              <h4 className="text-sm font-medium text-gray-900 mb-3">What's included:</h4>
              <ul className="space-y-2">
                {selectedService.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
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