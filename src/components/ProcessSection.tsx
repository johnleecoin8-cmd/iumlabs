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
    <section className="bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {phases.map((phase, index) => {
          const Icon = phase.icon;
          
          return (
            <div
              key={phase.title}
              className="group relative h-[320px] md:h-[400px] overflow-hidden cursor-pointer bg-surface"
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/70 group-hover:via-background/80 group-hover:to-background/60 transition-all duration-500" />
              
              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                {/* Phase Number */}
                <div className="absolute top-6 left-6 md:top-8 md:left-8">
                  <span className="text-5xl md:text-6xl font-bold text-foreground/10 group-hover:text-foreground/20 transition-colors duration-500">
                    0{index + 1}
                  </span>
                </div>
                
                {/* Icon */}
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-full bg-foreground/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-foreground/20 group-hover:shadow-[0_0_30px_hsl(var(--foreground)/0.2)] transition-all duration-500">
                    <Icon className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3 group-hover:translate-x-2 transition-transform duration-500">
                  {phase.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                  {phase.description}
                </p>
                
                {/* Bottom Line Indicator */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-foreground group-hover:w-full transition-all duration-700" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProcessSection;
