import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { ArrowRight, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const teamMembers = [
  {
    name: "James Lee",
    role: "Co-Founder & CEO",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    description: "10+ years in blockchain & fintech. Former Binance Korea.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "David Kim",
    role: "Co-Founder & CMO",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    description: "Led marketing for 50+ Web3 projects. Ex-Samsung.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Emily Park",
    role: "Head of Community",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
    description: "Built communities of 1M+ members. Discord expert.",
    linkedin: "#",
    twitter: "#",
  },
];

const TeamPreviewSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 px-4 bg-card/30">
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-xs font-medium text-primary mb-4 block tracking-widest uppercase">
            Our Team
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 uppercase tracking-tight">
            Meet The <span className="text-gradient">Experts</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Industry veterans with deep expertise in blockchain, marketing, and the Korean market.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`group text-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative mb-6 inline-block">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 to-gradient-crimson/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="relative w-32 h-32 rounded-full object-cover border-4 border-border/50 group-hover:border-primary/50 transition-colors mx-auto"
                />
              </div>

              <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
              <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
              <p className="text-muted-foreground text-sm mb-4">{member.description}</p>

              <div className="flex justify-center gap-3">
                <a href={member.linkedin} className="text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={member.twitter} className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link to="/about">
            <Button variant="outline" className="group">
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