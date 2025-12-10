import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Search, Target, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery",
    description: "We analyze your project, competitors, and target audience in the Korean market.",
    duration: "Week 1",
  },
  {
    number: "02",
    icon: Target,
    title: "Strategy",
    description: "Custom marketing roadmap with KPIs, channels, and budget allocation.",
    duration: "Week 2",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Execution",
    description: "Launch campaigns across Korean platforms, KOLs, and communities.",
    duration: "Week 3-8",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Optimize",
    description: "Data-driven optimization with weekly reports and strategy adjustments.",
    duration: "Ongoing",
  },
];

const ProcessSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 px-4 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-xs font-medium text-primary mb-4 block tracking-widest uppercase">
            How We Work
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 uppercase tracking-tight">
            Our <span className="text-gradient">Process</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A proven 4-step methodology that has helped 200+ projects succeed in Korea.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative group transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-px bg-gradient-to-r from-primary/50 to-transparent" />
              )}

              <div className="bg-card border border-border/30 rounded-xl p-6 hover:border-primary/50 transition-all h-full">
                {/* Number badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-bold text-primary/20">{step.number}</span>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {step.description}
                </p>

                <div className="pt-4 border-t border-border/30">
                  <span className="text-xs text-primary uppercase tracking-wider">{step.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;