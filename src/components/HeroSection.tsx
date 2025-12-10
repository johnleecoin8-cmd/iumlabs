import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";

const MetallicRings = lazy(() => import("./MetallicRings"));

const clientLogos = ["SOLANA", "POLKADOT", "COSMOS", "NEAR", "AVALANCHE", "ARBITRUM"];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 40%, hsl(var(--gradient-red) / 0.15) 0%, transparent 50%),
              radial-gradient(ellipse 60% 50% at 30% 60%, hsl(var(--gradient-crimson) / 0.1) 0%, transparent 50%)
            `,
          }}
        />
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(circle, hsl(var(--primary) / 0.2) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Large Centered 3D Bridge - Behind content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-full max-w-[900px] max-h-[900px] opacity-60">
          <Suspense fallback={null}>
            <MetallicRings />
          </Suspense>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tag */}
          <div className="inline-flex items-center px-4 py-2 border border-border/50 rounded-full bg-background/80 backdrop-blur-sm text-sm text-muted-foreground mb-8">
            <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse" />
            WEB3 MARKETING STUDIO
          </div>

          {/* Main Headline - Mixed Typography */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight leading-[1.1]">
            <span className="font-serif italic text-foreground">Pioneering</span>
            <span className="font-sans font-bold text-foreground"> Korean </span>
            <br />
            <span className="font-sans font-bold text-foreground">Crypto Marketing, and </span>
            <br />
            <span className="font-serif italic text-gradient">Growth Strategies</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Trusted partner for <span className="text-foreground font-medium">Web3 projects</span>, guiding them from pre-TGE planning to post-TGE growth with <span className="text-foreground font-medium">strategic advisory, marketing, and investments</span> for lasting success.
          </p>

          {/* Team Avatars - Centered */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-11 h-11 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium"
                  style={{
                    background: `linear-gradient(135deg, hsl(${i * 60}, 70%, 60%), hsl(${i * 60 + 30}, 70%, 50%))`
                  }}
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
              <div className="w-11 h-11 rounded-full border-2 border-background bg-card flex items-center justify-center text-xs font-medium text-muted-foreground">
                +5
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path strokeWidth="2" d="M12 6v6l4 2" />
              </svg>
              We will reach out in 24 hours.
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-base rounded-full group"
              >
                Contact Us
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/services">
              <Button 
                size="lg" 
                className="bg-background/80 backdrop-blur-sm text-foreground border border-border/50 hover:bg-background px-10 py-6 text-base rounded-full"
              >
                Our Services
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Client Logos at bottom */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border/30 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <p className="text-xs text-muted-foreground text-center mb-4 uppercase tracking-widest">
            Trusted by leading Web3 teams:
          </p>
          <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
            {clientLogos.map((logo) => (
              <span 
                key={logo} 
                className="text-sm md:text-base font-medium tracking-wider text-muted-foreground/60 hover:text-muted-foreground transition-colors"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;