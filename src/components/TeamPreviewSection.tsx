import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { ArrowRight, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const teamMembers = [
  {
    name: "James",
    role: "Co-Founder",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    description: "Ex-Lead of Korea from Kucoin, Ex-VC from Outlierventures",
    linkedin: "https://www.linkedin.com/in/james-l-13a998251/",
  },
  {
    name: "David",
    role: "Co-Founder",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    description: "Ex-Head of Business Development from Binance, Ex-Analyst from 21 shares",
    linkedin: "#",
  },
];

const TeamPreviewSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-32 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-card/30" />
        {/* Dot pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, hsl(var(--muted-foreground) / 0.3) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Number */}
        <div className={`text-center mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="text-primary font-mono text-sm tracking-wider">05.</span>
        </div>

        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-6">
            <span className="text-sm font-medium text-primary">Our Team</span>
          </div>
          <h2 className="text-4xl md:text-6xl tracking-tight mb-6">
            <span className="font-serif italic text-muted-foreground">Meet</span>{" "}
            <span className="font-sans font-bold text-foreground">The Experts</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Industry veterans with deep expertise in blockchain, marketing, and the Korean market.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-3xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`group text-center p-8 rounded-3xl border border-border/30 bg-card/30 backdrop-blur-sm hover:border-primary/30 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative mb-6 inline-block">
                <div className="absolute -inset-3 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="relative w-28 h-28 rounded-full object-cover border-4 border-border/30 group-hover:border-primary/30 transition-colors mx-auto"
                />
              </div>

              <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
              <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
              <p className="text-muted-foreground text-sm mb-4">{member.description}</p>

              <div className="flex justify-center gap-3">
                <a 
                  href={member.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link to="/about">
            <Button className="rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 px-8 group">
              Meet Full Team
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TeamPreviewSection;