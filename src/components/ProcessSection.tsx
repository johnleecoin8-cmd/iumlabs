import { Search, Target, Rocket, TrendingUp } from "lucide-react";

const phases = [
  {
    title: "Discovery",
    icon: Search,
    description: "Deep-dive into your project, market positioning, and Korean audience fit.",
  },
  {
    title: "Strategy",
    icon: Target,
    description: "Build GTM roadmap, channel mix, and localized messaging framework.",
  },
  {
    title: "Launch",
    icon: Rocket,
    description: "Execute campaigns across KOLs, community, PR, and social channels.",
  },
  {
    title: "Scale",
    icon: TrendingUp,
    description: "Optimize, iterate, and expand based on performance data.",
  }
];

const ProcessSection = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4">
      {phases.map((phase, index) => {
        const Icon = phase.icon;
        
        return (
          <div
            key={phase.title}
            className="group relative h-[280px] md:h-[320px] overflow-hidden cursor-pointer border-r border-b border-border/10 last:border-r-0"
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-surface via-surface to-muted/20 group-hover:from-muted/30 group-hover:via-surface group-hover:to-muted/40 transition-all duration-700" />
            
            {/* Glow Effect on Hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-t from-foreground/5 via-transparent to-transparent" />
            
            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-5 md:p-6 group-hover:-translate-y-1 transition-transform duration-500">
              {/* Phase Number - Large Background */}
              <div className="absolute top-4 left-5 md:top-5 md:left-6">
                <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground/[0.04] group-hover:text-foreground/[0.08] transition-colors duration-700">
                  0{index + 1}
                </span>
              </div>
              
              {/* Step Indicator */}
              <div className="absolute top-4 right-5 md:top-5 md:right-6">
                <span className="text-[10px] md:text-xs font-medium text-muted-foreground/50 tracking-wider uppercase">
                  Step {index + 1}
                </span>
              </div>
              
              {/* Icon */}
              <div className="mb-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-foreground/[0.06] backdrop-blur-sm flex items-center justify-center group-hover:bg-foreground/10 group-hover:shadow-lg group-hover:shadow-foreground/5 transition-all duration-500">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-foreground/70 group-hover:text-foreground group-hover:scale-110 transition-all duration-500" strokeWidth={1.5} />
                </div>
              </div>
              
              {/* Title */}
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 group-hover:translate-x-1 transition-transform duration-500">
                {phase.title}
              </h3>
              
              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                {phase.description}
              </p>
              
              {/* Bottom Line Indicator */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-foreground/80 to-foreground/40 group-hover:w-full transition-all duration-700 ease-out" />
              
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 right-0 w-[1px] h-8 bg-gradient-to-b from-foreground/20 to-transparent" />
                <div className="absolute top-0 right-0 w-8 h-[1px] bg-gradient-to-l from-foreground/20 to-transparent" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProcessSection;
