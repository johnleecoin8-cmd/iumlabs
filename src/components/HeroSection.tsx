import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Floating service tags - Lunar Strategy style
const serviceTags = [
  { label: "KOL Network", position: "top-[18%] left-[8%]" },
  { label: "PR & Media", position: "top-[12%] right-[12%]" },
  { label: "Community", position: "top-[45%] left-[3%]" },
  { label: "Go-To-Market", position: "top-[35%] right-[5%]" },
  { label: "VASP", position: "bottom-[35%] left-[12%]" },
  { label: "Events", position: "bottom-[25%] right-[10%]" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background - Simple dark with subtle gradient */}
      <div className="absolute inset-0 bg-background">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% 50%, hsl(var(--primary) / 0.08) 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* Floating Service Tags - Lunar Strategy style */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {serviceTags.map((tag, index) => (
          <div
            key={tag.label}
            className={`absolute ${tag.position} animate-float`}
            style={{ 
              animationDelay: `${index * 0.7}s`,
              animationDuration: `${5 + index * 0.3}s`
            }}
          >
            <div className="px-5 py-2.5 bg-card/60 backdrop-blur-sm border border-border/40 rounded-full text-sm font-medium text-muted-foreground">
              {tag.label}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content - Centered, Minimal */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        {/* Main Headline - Large, Bold */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 tracking-tight leading-[1.1] animate-fade-up">
          <span className="font-bold text-foreground">Your Bridge to</span>
          <br />
          <span className="font-bold text-foreground">Korea's </span>
          <span className="text-primary">Web3 Market</span>
        </h1>

        {/* Subheadline */}
        <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: '0.1s' }}>
          Since 2023, we've helped 50+ projects successfully enter<br className="hidden md:block" />
          and grow in the Korean crypto market.
        </p>

        {/* Single CTA - Lunar Strategy style */}
        <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <Link to="/contact">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-7 text-base rounded-full group"
            >
              Book a Free Consultation
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Stats Row - Below CTA */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-12 md:gap-20 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground">50+</div>
            <div className="text-sm text-muted-foreground mt-1">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground">$2B+</div>
            <div className="text-sm text-muted-foreground mt-1">Value Marketed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground">100+</div>
            <div className="text-sm text-muted-foreground mt-1">KOL Network</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-border/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
