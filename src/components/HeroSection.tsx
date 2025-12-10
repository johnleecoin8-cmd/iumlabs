import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import AnimatedText from "./AnimatedText";
import { hero } from "@/config/content";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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
        
        {/* Dotted grid pattern like Crowdcreate */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle, hsl(var(--primary) / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}
        />

        {/* Diagonal lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
          <defs>
            <pattern id="diagonalLines" patternUnits="userSpaceOnUse" width="40" height="40">
              <path d="M-10,10 l20,-20 M0,40 l40,-40 M30,50 l20,-20" stroke="hsl(var(--primary))" strokeWidth="0.5" fill="none"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonalLines)" />
        </svg>

        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 right-10 w-40 h-40 border border-primary/20 rounded-full animate-pulse-glow" />
        <div className="absolute bottom-1/3 left-20 w-20 h-20 border border-primary/30 rotate-45" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Main Headline - Bold uppercase like Crowdcreate */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight uppercase">
              <span className="text-foreground">Industry Leading</span>
              <br />
              <span className="text-gradient">Web3 Marketing</span>
              <br />
              <span className="text-foreground">Agency</span>
            </h1>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mb-8">
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-bold text-gradient">$500M+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Raised</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-bold text-foreground">5M+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Reached</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-bold text-foreground">200+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Projects</div>
              </div>
            </div>

            {/* Description */}
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              Since 2021, we've been transforming Web3 projects with our proven marketing strategies. 
              We're the experts with the track record that can help you leverage the Korean market.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
              <Link to="/projects">
                <Button variant="outline" size="lg" className="border-foreground/30 hover:bg-foreground/10 uppercase tracking-wider">
                  Our Work
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 uppercase tracking-wider">
                  Free Consultation
                </Button>
              </Link>
            </div>

            {/* Media Badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1,2,3,4,5].map((i) => (
                    <span key={i} className="text-primary text-lg">★</span>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">Rated 5 out of 5</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-8">
              <div className="text-center">
                <div className="text-xl font-bold text-foreground tracking-wide">Forbes</div>
                <div className="text-xs text-muted-foreground">Best Growth Agency</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-foreground tracking-wide">CoinDesk</div>
                <div className="text-xs text-muted-foreground">Top Marketing Agency</div>
              </div>
            </div>
          </div>

          {/* Right Content - Video Thumbnail */}
          <div className="relative hidden lg:block">
            <div 
              className="relative cursor-pointer group"
              onClick={() => setVideoOpen(true)}
            >
              {/* Red glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-gradient-crimson/20 rounded-2xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />
              
              {/* Video thumbnail container */}
              <div className="relative bg-card border border-border/50 rounded-2xl overflow-hidden">
                {/* Placeholder image - replace with actual video thumbnail */}
                <div className="aspect-video bg-gradient-to-br from-card to-muted relative">
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop" 
                    alt="Team meeting"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-primary/50">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                    <div className="w-3 h-3 rounded-full bg-foreground/50" />
                    <div className="w-3 h-3 rounded-full bg-foreground/30" />
                  </div>
                </div>

                {/* Bottom bar */}
                <div className="p-4 bg-card/80 border-t border-border/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Watch Our Story</span>
                    <span className="text-xs text-muted-foreground">2:45</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black border-none">
          <div className="aspect-video">
            {/* Replace with actual YouTube embed */}
            <div className="w-full h-full flex items-center justify-center bg-card rounded-lg">
              <div className="text-center p-8">
                <Play className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Add a YouTube video URL to play here
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Example: https://www.youtube.com/embed/VIDEO_ID
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* "As Featured On" section below hero */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border/30 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-2 text-xs text-primary uppercase tracking-widest">
            <span className="w-8 h-px bg-primary/50" />
            As Featured On
            <span className="w-8 h-px bg-primary/50" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
