import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { ArrowUpRight, Calendar } from "lucide-react";
import CalendlyButton from "@/components/CalendlyButton";
import constellationSpace from "@/assets/constellation-space.jpg";

const projects = [
  {
    id: 1,
    name: "DeFi Protocol",
    category: "DeFi",
    gradient: "case-gradient-polkadot",
    logo: "https://cryptologos.cc/logos/polkadot-new-dot-logo.svg",
    result: "+340% Korean Trading Volume",
    description: "Full Korean market entry including KOL campaigns, community setup, and comprehensive PR coverage.",
    services: ["KOL Marketing", "Community Building", "PR & Media"],
  },
  {
    id: 2,
    name: "Layer 1 Network",
    category: "Infrastructure",
    gradient: "case-gradient-cardano",
    logo: "https://cryptologos.cc/logos/cardano-ada-logo.svg",
    logoStyle: "brightness-0",
    result: "50K+ Korean Holders",
    description: "Successful market launch with Korean artist collaborations and celebrity KOL partnerships.",
    services: ["KOL Marketing", "Community Growth", "Events"],
  },
  {
    id: 3,
    name: "Web3 Platform",
    category: "Infrastructure",
    gradient: "case-gradient-icp",
    logo: "https://cryptologos.cc/logos/internet-computer-icp-logo.svg",
    result: "$2M Korean TVL in 30 Days",
    description: "Community growth from 0 to 50K Korean users with targeted influencer marketing and AMA sessions.",
    services: ["Community Growth", "KOL Marketing", "Event Management"],
  },
  {
    id: 4,
    name: "Move Ecosystem",
    category: "Layer 1",
    gradient: "case-gradient-aptos",
    logo: "https://cryptologos.cc/logos/aptos-apt-logo.svg",
    logoStyle: "brightness-0",
    result: "100K+ Korean Users",
    description: "Gaming influencer campaigns and partnership with top Korean gaming guilds.",
    services: ["KOL Marketing", "Community Growth", "GTM Strategy"],
  },
  {
    id: 5,
    name: "Smart Contract Platform",
    category: "Layer 1",
    gradient: "case-gradient-near",
    logo: "https://cryptologos.cc/logos/near-protocol-near-logo.svg",
    result: "5K+ Korean Developers",
    description: "Event management at Korea Blockchain Week and ongoing community operations.",
    services: ["Events", "Community Building", "PR & Media"],
  },
  {
    id: 6,
    name: "Payment Network",
    category: "Infrastructure",
    gradient: "case-gradient-xrp",
    logo: "https://cryptologos.cc/logos/xrp-xrp-logo.svg",
    result: "#1 Korean Remittance",
    description: "TVL growth campaign with targeted yield farming promotions and strategic exchange listings.",
    services: ["GTM Strategy", "Exchange Listing", "PR & Media"],
  },
];

const stats = [
  { value: "$500M+", label: "Total Value Marketed" },
  { value: "200+", label: "Projects Launched" },
  { value: "500K+", label: "Community Members" },
];

const floatingTags = [
  { label: "DeFi", top: "15%", left: "5%", mobileTop: "12%", mobileLeft: "3%" },
  { label: "Layer 1", top: "30%", right: "7%", mobileTop: "15%", mobileRight: "3%" },
  { label: "GameFi", top: "50%", left: "4%", mobileTop: "75%", mobileLeft: "3%" },
  { label: "NFT", bottom: "32%", right: "5%", mobileBottom: "18%", mobileRight: "3%" },
  { label: "Infrastructure", bottom: "16%", left: "8%", mobileBottom: "10%", mobileLeft: "3%" },
];

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero - Full Screen with Parallax Background */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-100"
          style={{ 
            backgroundImage: `url(${constellationSpace})`,
            filter: "brightness(0.4) saturate(1.1)",
            transform: `translateY(${scrollY * 0.3}px) scale(1.1)`
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,4%,0.3)] via-transparent to-[hsl(0,0%,4%,0.95)]" />
        
        {/* Floating Tags - Responsive */}
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

        {/* Content */}
        <div className="container mx-auto max-w-7xl px-4 relative z-10 pt-32 pb-24">
          <div className="mb-16">
            <span className="text-sm text-white/50 mb-4 block">[ Our Work ]</span>
            <h1 className="text-[12vw] md:text-[150px] lg:text-[180px] font-light text-white leading-[0.85] tracking-tight">
              Ca<span className="serif-italic text-primary">s</span>es
            </h1>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 border-t border-white/10">
            <p className="text-lg text-white/60 max-w-xl">
              Explore our portfolio of successful Web3 projects launched in the Korean market.
            </p>
            <CalendlyButton className="lunar-btn">
              <Calendar className="w-4 h-4" />
              <span>Start Your Project</span>
            </CalendlyButton>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/10">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-white/30">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-pulse" />
          <span className="text-xs uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={ref} className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`group cursor-pointer transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Card with gradient */}
                <div className={`case-card ${project.gradient} aspect-[4/5] rounded-3xl p-6 flex flex-col justify-between mb-4 relative overflow-hidden`}>
                  {/* Arrow Icon */}
                  <div className="flex items-start justify-end">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Center - Logo */}
                  <div className="flex items-center justify-center flex-1">
                    <img 
                      src={project.logo} 
                      alt={project.name}
                      className={`w-24 h-24 object-contain ${project.logoStyle || 'brightness-0 invert'} opacity-90 transition-transform duration-300 group-hover:scale-110`}
                    />
                  </div>

                  {/* Bottom - Result (on hover) */}
                  <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-lg font-medium text-white">{project.result}</p>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-xs text-white/80 uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content Below Card */}
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">{project.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((service) => (
                      <span key={service} className="text-xs px-2 py-1 bg-muted/50 border border-border/50 rounded-full text-muted-foreground">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Projects;