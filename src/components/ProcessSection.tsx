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
    <div className="relative bg-surface py-16 md:py-24 px-6 md:px-12 overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-16 md:mb-20">
        <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-3 block">
          Our Process
        </span>
        <h2 className="text-2xl md:text-3xl font-light text-foreground">
          How We Work
        </h2>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-6xl mx-auto">
        {/* Horizontal Line - Desktop */}
        <div className="hidden lg:block absolute top-[60px] left-[12.5%] right-[12.5%] h-[1px] bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        
        {/* Vertical Line - Mobile */}
        <div className="lg:hidden absolute top-0 bottom-0 left-8 w-[1px] bg-gradient-to-b from-transparent via-foreground/20 to-transparent" />

        {/* Timeline Items */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4">
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            
            return (
              <div
                key={phase.title}
                className="group relative"
              >
                {/* Desktop Layout */}
                <div className="hidden lg:flex flex-col items-center">
                  {/* Node */}
                  <div className="relative z-10 mb-6">
                    {/* Outer Ring - Glow on Hover */}
                    <div className="absolute -inset-2 rounded-full bg-foreground/0 group-hover:bg-foreground/5 transition-all duration-500" />
                    
                    {/* Circle Node */}
                    <div className="relative w-[120px] h-[120px] rounded-full border border-foreground/10 bg-background flex flex-col items-center justify-center group-hover:border-foreground/30 group-hover:shadow-lg group-hover:shadow-foreground/5 transition-all duration-500">
                      {/* Step Number */}
                      <span className="text-3xl font-light text-foreground/30 group-hover:text-foreground/60 transition-colors duration-500">
                        0{index + 1}
                      </span>
                      {/* Icon */}
                      <div className="mt-1">
                        <Icon className="w-5 h-5 text-foreground/40 group-hover:text-foreground transition-colors duration-500" strokeWidth={1.5} />
                      </div>
                    </div>
                    
                    {/* Pulse Effect on Hover */}
                    <div className="absolute inset-0 rounded-full border border-foreground/0 group-hover:border-foreground/10 group-hover:scale-125 transition-all duration-700 opacity-0 group-hover:opacity-100" />
                  </div>
                  
                  {/* Content Card */}
                  <div className="text-center px-2 max-h-[60px] group-hover:max-h-[200px] overflow-hidden transition-all duration-500 ease-out">
                    <h3 className="text-lg font-medium text-foreground mb-2 group-hover:mb-3 transition-all duration-300">
                      {phase.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {phase.description}
                    </p>
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden flex items-start gap-6 pl-2">
                  {/* Node */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full border border-foreground/20 bg-background flex items-center justify-center group-hover:border-foreground/40 transition-all duration-300">
                      <span className="text-lg font-light text-foreground/50 group-hover:text-foreground transition-colors duration-300">
                        0{index + 1}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-foreground/60" strokeWidth={1.5} />
                      <h3 className="text-base font-medium text-foreground">
                        {phase.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </div>
                
                {/* Connector Dots - Desktop */}
                {index < phases.length - 1 && (
                  <div className="hidden lg:block absolute top-[60px] -right-2 z-20">
                    <div className="w-1 h-1 rounded-full bg-foreground/20" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;
