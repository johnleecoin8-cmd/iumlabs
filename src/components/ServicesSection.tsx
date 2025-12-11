import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";
import { X, ArrowUpRight, Users, MessageSquare, Newspaper, Share2, Target, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    number: "01",
    title: "KOL Marketing",
    shortDesc: "Korean influencer partnerships",
    fullDesc: "Access our network of 1,000+ Korean crypto influencers across YouTube, Twitter, and Telegram. We handle everything from selection to campaign management.",
    features: ["Influencer matching", "Campaign management", "Performance tracking", "Content creation"],
    icon: Users,
  },
  {
    number: "02",
    title: "Community Building",
    shortDesc: "Korean community growth",
    fullDesc: "Build and manage thriving Korean communities on KakaoTalk, Telegram, and Discord with native-speaking moderators and engagement strategies.",
    features: ["Community setup", "24/7 moderation", "Event management", "Growth strategies"],
    icon: MessageSquare,
  },
  {
    number: "03",
    title: "PR & Media",
    shortDesc: "Korean press coverage",
    fullDesc: "Get featured in top Korean crypto media outlets including Block Media, Coindesk Korea, and mainstream publications.",
    features: ["Press releases", "Media outreach", "Interview coordination", "Crisis management"],
    icon: Newspaper,
  },
  {
    number: "04",
    title: "Social Media",
    shortDesc: "Korean social management",
    fullDesc: "Full-service Korean social media management across Twitter, Naver Blog, and Korean-specific platforms with localized content.",
    features: ["Content creation", "Account management", "Engagement growth", "Analytics reporting"],
    icon: Share2,
  },
  {
    number: "05",
    title: "Go-To-Market",
    shortDesc: "Korea launch strategy",
    fullDesc: "Comprehensive market entry strategy including localization, partnerships, exchange listings, and launch campaigns.",
    features: ["Market research", "Localization", "Partnership development", "Launch execution"],
    icon: Target,
  },
  {
    number: "06",
    title: "Event Marketing",
    shortDesc: "Korean event presence",
    fullDesc: "Maximize your presence at Korean blockchain events including Korea Blockchain Week, Upbit Conference, and community meetups.",
    features: ["Event planning", "Speaker opportunities", "Booth management", "Side event organization"],
    icon: Calendar,
  },
];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <>
      <section ref={ref} className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Our Services <span className="text-muted-foreground">///</span>
              </h2>
              <p className="text-muted-foreground">Comprehensive Web3 marketing solutions for the Korean market</p>
            </div>
            <Link 
              to="/services" 
              className="hidden md:flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
            >
              <span>All Services</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Services Grid - [ 01 ] style */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className={`group cursor-pointer bg-background rounded-2xl p-8 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedService(service)}
                >
                  {/* Number Badge & Icon */}
                  <div className="flex items-start justify-between mb-6">
                    <span className="number-badge text-sm">{service.number}</span>
                    <div className="service-icon">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-muted-foreground mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Learn More Link */}
                  <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                    <span>Learn more</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Modal */}
      {selectedService && (
        <div 
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setSelectedService(null)}
        >
          <div 
            className="bg-card border border-border rounded-2xl max-w-2xl w-full p-8 md:p-12 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <span className="number-badge text-sm">{selectedService.number}</span>
              <div className="service-icon">
                <selectedService.icon className="w-6 h-6" />
              </div>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {selectedService.title}
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {selectedService.fullDesc}
            </p>

            <div className="space-y-3">
              <span className="text-sm text-muted-foreground uppercase tracking-wider">What's included</span>
              <div className="flex flex-wrap gap-2">
                {selectedService.features.map((feature, i) => (
                  <span key={i} className="lunar-tag text-xs">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-border">
              <a
                href="https://calendly.com/cryptobridgekorea"
                target="_blank"
                rel="noopener noreferrer"
                className="lunar-btn inline-flex items-center gap-2"
              >
                <span>Get Started</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServicesSection;
