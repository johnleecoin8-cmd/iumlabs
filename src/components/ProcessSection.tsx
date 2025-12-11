import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  {
    number: "01",
    title: "Foundation",
    description: "We analyze your project, competitors, and target audience in the Korean market to build a solid foundation for your launch.",
  },
  {
    number: "02",
    title: "Strategy & Prep",
    description: "Custom marketing roadmap with KPIs, channels, budget allocation, and KOL selection tailored to your project goals.",
  },
  {
    number: "03",
    title: "Launch & Execution",
    description: "Full-scale campaign deployment across Korean platforms, communities, and influencer networks with real-time optimization.",
  },
];

const ProcessSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div 
          className={`grid lg:grid-cols-2 gap-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Left Column - Title & CTA */}
          <div>
            {/* Giant Typography */}
            <div className="flex items-baseline gap-8 mb-12">
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-none">
                What
              </h2>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-foreground/30 rounded-full"></span>
                <span className="w-2 h-2 bg-foreground/30 rounded-full"></span>
                <span className="w-2 h-2 bg-foreground/30 rounded-full"></span>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-md">
              A proven methodology that has helped 200+ projects successfully 
              enter and thrive in the Korean crypto market.
            </p>

            {/* Bracket Link CTA */}
            <a
              href="https://calendly.com/cryptobridgekorea"
              target="_blank"
              rel="noopener noreferrer"
              className="bracket-link text-lg hover:opacity-80 transition-opacity"
            >
              book a meeting
            </a>
          </div>

          {/* Right Column - Steps */}
          <div>
            {/* Includes Title */}
            <div className="flex items-center justify-between mb-12">
              <h3 className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-none">
                Includes
              </h3>
            </div>

            {/* Steps List */}
            <div className="space-y-0">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                >
                  {/* Step Header */}
                  <div className="flex items-center justify-between py-6">
                    <h4 className="text-xl md:text-2xl font-medium text-foreground">
                      {step.title}
                    </h4>
                    <span className="number-badge text-sm">
                      {step.number}
                    </span>
                  </div>

                  {/* Dotted Line */}
                  <div className="dotted-line mb-4" />

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed pb-6">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
