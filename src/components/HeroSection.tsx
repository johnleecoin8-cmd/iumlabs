import { Calendar, ChevronDown } from "lucide-react";

const serviceTags = [
  { label: "PR", position: "top-[18%] left-[8%]" },
  { label: "Social Media", position: "top-[12%] right-[15%]" },
  { label: "KOL Marketing", position: "top-[40%] left-[3%]" },
  { label: "Community", position: "bottom-[30%] right-[6%]" },
  { label: "Go-To-Market", position: "bottom-[15%] left-[12%]" },
  { label: "Events", position: "top-[55%] right-[10%]" },
];

const HeroSection = () => {
  return (
    <section className="section-dark relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background - Moon/Space Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,20%,6%)] via-[hsl(220,20%,8%)] to-[hsl(220,20%,6%)]" />
        {/* Moon glow effect */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-radial from-blue-500/10 via-purple-500/5 to-transparent blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-radial from-cyan-500/5 via-transparent to-transparent blur-2xl" />
        {/* Stars effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-[10%] left-[20%] w-1 h-1 bg-white rounded-full" />
          <div className="absolute top-[15%] right-[30%] w-0.5 h-0.5 bg-white/80 rounded-full" />
          <div className="absolute top-[25%] left-[40%] w-1 h-1 bg-white rounded-full" />
          <div className="absolute top-[35%] right-[20%] w-0.5 h-0.5 bg-white/60 rounded-full" />
          <div className="absolute top-[45%] left-[15%] w-1 h-1 bg-white/70 rounded-full" />
          <div className="absolute bottom-[30%] right-[40%] w-0.5 h-0.5 bg-white rounded-full" />
          <div className="absolute bottom-[20%] left-[30%] w-1 h-1 bg-white/80 rounded-full" />
          <div className="absolute bottom-[40%] right-[15%] w-0.5 h-0.5 bg-white/50 rounded-full" />
        </div>
      </div>

      {/* Floating Service Tags - White outline style */}
      {serviceTags.map((tag, index) => (
        <div
          key={index}
          className={`absolute ${tag.position} hidden lg:block animate-float z-10`}
          style={{ animationDelay: `${index * 0.5}s` }}
        >
          <span className="lunar-tag-dark">
            {tag.label}
          </span>
        </div>
      ))}

      {/* Main Content */}
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Headline - Massive typography */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold leading-[0.9] tracking-tight mb-8">
            <span className="text-[hsl(var(--dark-fg))]">Your </span>
            <span className="serif-italic text-[hsl(var(--dark-fg))]">Bridge</span>
            <br />
            <span className="text-[hsl(var(--dark-fg))]">to </span>
            <span className="serif-italic text-[hsl(var(--dark-fg))]">Korea</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-[hsl(var(--dark-fg)/0.6)] max-w-2xl mx-auto mb-12">
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
            <div className="text-3xl md:text-4xl font-bold text-[hsl(var(--dark-fg))]">200+</div>
            <div className="text-sm text-[hsl(var(--dark-fg)/0.5)] mt-1">Projects Launched</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-[hsl(var(--dark-fg))]">$500M+</div>
            <div className="text-sm text-[hsl(var(--dark-fg)/0.5)] mt-1">Value Marketed</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-[hsl(var(--dark-fg))]">1,000+</div>
            <div className="text-sm text-[hsl(var(--dark-fg)/0.5)] mt-1">KOL Network</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <ChevronDown className="w-6 h-6 text-[hsl(var(--dark-fg)/0.4)] animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
