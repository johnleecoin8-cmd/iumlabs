import { Calendar, ChevronDown } from "lucide-react";
import seoulSkyline from "@/assets/seoul-skyline.jpg";

const serviceTags = [
  { label: "PR", position: "top-[20%] left-[8%]" },
  { label: "Social Media", position: "top-[15%] right-[12%]" },
  { label: "KOL Marketing", position: "top-[45%] left-[5%]" },
  { label: "Community", position: "bottom-[35%] right-[8%]" },
  { label: "Go-To-Market", position: "bottom-[20%] left-[15%]" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background Image - Dark overlay */}
      <div className="absolute inset-0">
        <img 
          src={seoulSkyline} 
          alt="Seoul Skyline" 
          className="w-full h-full object-cover opacity-15 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background" />
      </div>

      {/* Floating Service Tags - White outline style */}
      {serviceTags.map((tag, index) => (
        <div
          key={index}
          className={`absolute ${tag.position} hidden lg:block animate-float z-10`}
          style={{ animationDelay: `${index * 0.5}s` }}
        >
          <span className="lunar-tag">
            {tag.label}
          </span>
        </div>
      ))}

      {/* Main Content */}
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Headline - Massive typography */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold leading-[0.9] tracking-tight mb-8">
            <span className="text-foreground">Your </span>
            <span className="serif-italic text-foreground">Bridge</span>
            <br />
            <span className="text-foreground">to </span>
            <span className="serif-italic text-foreground">Korea</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            We connect global Web3 projects with the Korean crypto market through 
            strategic marketing, community building, and KOL partnerships.
          </p>

          {/* CTA Button - Blue Lunar style */}
          <a
            href="https://calendly.com/cryptobridgekorea"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 lunar-btn text-lg px-8 py-4"
          >
            <Calendar className="w-5 h-5" />
            <span>Book a Meeting</span>
          </a>
        </div>
      </div>

      {/* Bottom Stats Row */}
      <div className="container mx-auto px-6 pb-12 relative z-10">
        <div className="flex flex-wrap justify-center gap-12 md:gap-20 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-foreground">200+</div>
            <div className="text-sm text-muted-foreground mt-1">Projects Launched</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-foreground">$500M+</div>
            <div className="text-sm text-muted-foreground mt-1">Value Marketed</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-foreground">1,000+</div>
            <div className="text-sm text-muted-foreground mt-1">KOL Network</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <ChevronDown className="w-6 h-6 text-muted-foreground animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
