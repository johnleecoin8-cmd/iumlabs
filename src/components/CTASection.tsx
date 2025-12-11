import { ArrowRight, Calendar, Clock, MessageCircle, Linkedin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { images } from "@/config/content";

const benefits = [
  { icon: Clock, text: "30 min Free Call", color: "text-red-600" },
  { icon: Calendar, text: "Flexible Scheduling", color: "text-blue-600" },
  { icon: MessageCircle, text: "Ask Us Anything", color: "text-green-600" },
];

const founders = [
  {
    name: "James",
    role: "Co-Founder",
    image: images.team.james,
    telegram: "https://t.me/cryptobridgekorea",
    linkedin: "https://www.linkedin.com/in/james-l-13a998251/",
    borderColor: "border-red-200",
  },
  {
    name: "David",
    role: "Co-Founder",
    image: images.team.david,
    telegram: "https://t.me/cryptobridgekorea",
    linkedin: "https://www.linkedin.com/company/cryptobridge",
    borderColor: "border-blue-200",
  },
];

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Benefits Row */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-10">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <benefit.icon className={`w-4 h-4 ${benefit.color}`} />
                <span>{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
            Let's Talk <span className="text-gradient">Strategy</span>
          </h2>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            We'll get to the point. You explain what you're building and we'll explain how we'd support it in Korea.
          </p>

          {/* CTA Button */}
          <Link to="/contact">
            <Button 
              size="lg" 
              className="rounded-full bg-primary hover:bg-primary/90 px-10 py-7 text-base group shadow-lg"
            >
              Book a Meeting
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          {/* Founder Cards */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16">
            {founders.map((founder, index) => (
              <div
                key={founder.name}
                className={`flex items-center gap-4 p-4 pr-8 rounded-full bg-card border ${founder.borderColor} shadow-sm transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                {/* Photo */}
                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-muted">
                  <img 
                    src={founder.image} 
                    alt={founder.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="text-left">
                  <h4 className="font-semibold text-foreground">{founder.name}</h4>
                  <p className="text-xs text-muted-foreground">{founder.role}</p>
                </div>

                {/* Social */}
                <div className="flex items-center gap-2 ml-4">
                  <a 
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-blue-600 hover:bg-blue-100 transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a 
                    href={founder.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-blue-500 hover:bg-blue-100 transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
