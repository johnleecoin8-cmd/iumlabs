import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { lazy, Suspense, useState } from "react";

const MetallicRings = lazy(() => import("./MetallicRings"));

// Service tags that float around the hero
const serviceTags = [
  { label: "KOL Marketing", position: "top-[15%] left-[5%]" },
  { label: "PR & Media", position: "top-[25%] right-[8%]" },
  { label: "Community", position: "top-[55%] left-[3%]" },
  { label: "Go-To-Market", position: "bottom-[30%] right-[5%]" },
  { label: "VASP Acquisition", position: "bottom-[15%] left-[10%]" },
];

const stats = [
  { value: "50+", label: "Projects Launched" },
  { value: "$2B+", label: "Total Value Marketed" },
  { value: "100+", label: "KOL Network" },
];

const HeroSection = () => {
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Gradient overlays */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 100% 80% at 50% 20%, hsl(var(--gradient-red) / 0.08) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 80% 70%, hsl(var(--gradient-crimson) / 0.06) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 20% 80%, hsl(var(--gradient-orange) / 0.04) 0%, transparent 50%)
            `,
          }}
        />
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--foreground) / 0.5) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--foreground) / 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Floating Service Tags */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {serviceTags.map((tag, index) => (
          <div
            key={tag.label}
            className={`absolute ${tag.position} animate-float`}
            style={{ 
              animationDelay: `${index * 0.5}s`,
              animationDuration: `${4 + index * 0.5}s`
            }}
          >
            <div className="px-4 py-2 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all cursor-default">
              {tag.label}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content - Centered */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm mb-8 animate-fade-up">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-primary font-medium">Korea's Leading Web3 Agency</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 tracking-tight leading-[1.05] animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <span className="font-sans font-bold text-foreground">Your </span>
          <span className="font-serif italic text-gradient">Bridge</span>
          <span className="font-sans font-bold text-foreground"> to</span>
          <br className="hidden md:block" />
          <span className="font-sans font-bold text-foreground">Korea's Web3 Market</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
          Strategic marketing, KOL partnerships, and market entry solutions for global Web3 projects seeking success in the Korean market.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <Link to="/contact">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base rounded-full group"
            >
              Book a Consultation
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <button 
            onClick={() => setVideoPlaying(true)}
            className="flex items-center gap-3 px-6 py-3 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <div className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
              <Play className="w-4 h-4 ml-0.5" />
            </div>
            <span className="text-sm font-medium">Watch Showreel</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3D Element - Positioned behind */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <Suspense fallback={null}>
          <MetallicRings />
        </Suspense>
      </div>

      {/* Video Modal */}
      {videoPlaying && (
        <div 
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setVideoPlaying(false)}
        >
          <div className="relative w-full max-w-4xl aspect-video bg-card rounded-2xl overflow-hidden border border-border">
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <p>Video Showreel Coming Soon</p>
            </div>
            <button 
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center text-foreground hover:bg-background transition-colors"
              onClick={() => setVideoPlaying(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
