import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import seoulSkyline from "@/assets/seoul-skyline.jpg";

// Floating service tags with colors
const serviceTags = [
  { label: "KOL Network", position: "top-[18%] left-[8%]", color: "bg-red-100 text-red-700 border-red-200" },
  { label: "PR & Media", position: "top-[12%] right-[12%]", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { label: "Community", position: "top-[45%] left-[3%]", color: "bg-green-100 text-green-700 border-green-200" },
  { label: "Go-To-Market", position: "top-[35%] right-[5%]", color: "bg-purple-100 text-purple-700 border-purple-200" },
  { label: "VASP", position: "bottom-[35%] left-[12%]", color: "bg-orange-100 text-orange-700 border-orange-200" },
  { label: "Events", position: "bottom-[25%] right-[10%]", color: "bg-teal-100 text-teal-700 border-teal-200" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image - Seoul Skyline */}
      <div className="absolute inset-0">
        <img 
          src={seoulSkyline} 
          alt="Seoul Skyline"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background" />
      </div>

      {/* Floating Service Tags */}
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
            <div className={`px-5 py-2.5 ${tag.color} border rounded-full text-sm font-medium shadow-sm`}>
              {tag.label}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 tracking-tight leading-[1.1] animate-fade-up">
          <span className="font-bold text-foreground">Your Bridge to</span>
          <br />
          <span className="font-bold text-foreground">Korea's </span>
          <span className="text-gradient">Web3 Market</span>
        </h1>

        {/* Subheadline */}
        <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: '0.1s' }}>
          Since 2023, we've helped 50+ projects successfully enter<br className="hidden md:block" />
          and grow in the Korean crypto market.
        </p>

        {/* CTA Button */}
        <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <Link to="/contact">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-7 text-base rounded-full group shadow-lg"
            >
              Book a Free Consultation
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Stats Row */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-12 md:gap-20 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-red-600">50+</div>
            <div className="text-sm text-muted-foreground mt-1">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-600">$2B+</div>
            <div className="text-sm text-muted-foreground mt-1">Value Marketed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-600">100+</div>
            <div className="text-sm text-muted-foreground mt-1">KOL Network</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
