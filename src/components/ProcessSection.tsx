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
            className="group relative h-[160px] md:h-[200px] overflow-hidden cursor-pointer bg-surface border-r border-b border-border/10 last:border-r-0"
          >
            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-4 md:p-5">
              {/* Phase Number */}
              <div className="absolute top-3 left-4 md:top-4 md:left-5">
                <span className="text-3xl md:text-4xl font-bold text-foreground/10 group-hover:text-foreground/20 transition-colors duration-500">
                  0{index + 1}
                </span>
              </div>
              
              {/* Icon */}
              <div className="mb-2">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-foreground/10 flex items-center justify-center group-hover:bg-foreground/20 transition-all duration-500">
                  <Icon className="w-4 h-4 md:w-5 md:h-5 text-foreground" strokeWidth={1.5} />
                </div>
              </div>
              
              {/* Title */}
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 group-hover:translate-x-1 transition-transform duration-500">
                {phase.title}
              </h3>
              
              {/* Description */}
              <p className="text-muted-foreground text-xs leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
                {phase.description}
              </p>
              
              {/* Bottom Line Indicator */}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-foreground group-hover:w-full transition-all duration-700" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProcessSection;
