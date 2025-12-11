import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery & Research",
    description: "We analyze your project, competitors, and target audience in the Korean market to build a solid foundation for your launch.",
  },
  {
    number: "02",
    title: "Strategy & Planning",
    description: "Custom marketing roadmap with KPIs, channels, budget allocation, and KOL selection tailored to your project goals.",
  },
  {
    number: "03",
    title: "Execution & Growth",
    description: "Full-scale campaign deployment across Korean platforms, communities, and influencer networks with real-time optimization.",
  },
];

const ProcessSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 px-6 bg-background border-t border-border">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className={`mb-16 transition-normal ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Process <span className="text-muted-foreground">///</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A proven methodology that has helped 200+ projects successfully 
            enter and thrive in the Korean crypto market.
          </p>
        </div>

        {/* Steps - Horizontal Layout */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ 
                transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                transitionDelay: `${(index + 1) * 100}ms` 
              }}
            >
              {/* Connector Arrow (not on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 -right-4 z-10">
                  <ArrowRight className="w-8 h-8 text-muted-foreground/30" />
                </div>
              )}

              {/* Card */}
              <div className="bg-card border border-border rounded-2xl p-8 h-full hover:border-primary/30 hover-lift">
                {/* Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-5xl font-bold text-primary/20">{step.number}</span>
                  <span className="number-badge text-sm">{step.number}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-200">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`mt-12 text-center transition-normal ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.4s' }}>
          <a
            href="https://calendly.com/cryptobridgekorea"
            target="_blank"
            rel="noopener noreferrer"
            className="bracket-link link-hover text-lg"
          >
            Start your journey
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
