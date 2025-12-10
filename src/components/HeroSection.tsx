import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import AnimatedText from "./AnimatedText";
import { hero } from "@/config/content";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const serviceTags = [
  { label: "PR", position: "top-32 left-[15%]" },
  { label: "Social Media", position: "top-44 right-[12%]" },
  { label: "KOL Marketing", position: "top-[45%] left-[8%]" },
  { label: "Community", position: "bottom-[35%] right-[8%]" },
  { label: "Go-To-Market", position: "bottom-48 left-[18%]" },
];

const HeroSection = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background with geometric pattern */}
      <div className="absolute inset-0">
        {/* Dark gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 20% 40%, hsl(var(--gradient-red) / 0.15) 0%, transparent 50%),
              radial-gradient(ellipse 60% 50% at 80% 30%, hsl(var(--gradient-crimson) / 0.1) 0%, transparent 50%)
            `,
          }}
        />
        
        {/* Dotted grid pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle, hsl(var(--primary) / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      {/* Floating Service Tags - Lunar Strategy style */}
      <div className="absolute inset-0 hidden lg:block pointer-events-none">
        {serviceTags.map((tag, index) => (
          <div
            key={tag.label}
            className={`absolute ${tag.position} px-4 py-2 border border-border/50 rounded-full bg-background/50 backdrop-blur-sm text-sm text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all cursor-default pointer-events-auto`}
            style={{
              animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
              animationDelay: `${index * 0.2}s`
            }}
          >
            {tag.label}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            <span className="text-foreground">Your </span>
            <span className="text-gradient">Crypto Ecosystem</span>
            <br />
            <span className="text-foreground">Growth Agency</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Since 2021, we've worked with 200+ ecosystems and projects in the Korean crypto space.
          </p>

          {/* CTA Button */}
          <Link to="/contact">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg rounded-full">
              <Play className="w-5 h-5 mr-2" fill="currentColor" />
              Book a Free Consultation
            </Button>
          </Link>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-12 mt-16">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-foreground">$500M+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider mt-1">Raised</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-foreground">200+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider mt-1">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-foreground">5M+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider mt-1">Reached</div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Logos at bottom */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border/30 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap opacity-60">
            {["SOLANA", "POLKADOT", "COSMOS", "NEAR", "AVALANCHE", "ARBITRUM"].map((logo) => (
              <span key={logo} className="text-sm md:text-base font-medium tracking-wider text-muted-foreground">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CSS for floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
