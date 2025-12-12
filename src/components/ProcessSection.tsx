import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, Search, Map, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Import process images
import discoveryImg from "@/assets/process/discovery-research.jpg";
import strategyImg from "@/assets/process/strategy-planning.jpg";
import executionImg from "@/assets/process/execution-growth.jpg";

const steps = [
  {
    number: "01",
    title: "Discovery & Research",
    description: "We analyze your project, competitors, and target audience in the Korean market to build a solid foundation for your launch.",
    image: discoveryImg,
    icon: Search,
    highlights: ["Market Analysis", "Competitor Review", "Audience Mapping"],
  },
  {
    number: "02",
    title: "Strategy & Planning",
    description: "Custom marketing roadmap with KPIs, channels, budget allocation, and KOL selection tailored to your project goals.",
    image: strategyImg,
    icon: Map,
    highlights: ["Roadmap Creation", "KOL Selection", "Budget Planning"],
  },
  {
    number: "03",
    title: "Execution & Growth",
    description: "Full-scale campaign deployment across Korean platforms, communities, and influencer networks with real-time optimization.",
    image: executionImg,
    icon: Rocket,
    highlights: ["Campaign Launch", "Community Building", "Performance Tracking"],
  },
];

const ProcessSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [activeStep, setActiveStep] = useState(0);

  // Auto-progress through steps
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section ref={ref} className="py-24 px-6 bg-background border-t border-border overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className={`mb-8 transition-normal ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary text-sm font-medium tracking-wider">HOW WE WORK</span>
            <div className="h-px w-12 bg-primary/50" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Our Process <span className="text-muted-foreground">///</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A proven methodology that has helped 200+ projects successfully 
            enter and thrive in the Korean crypto market.
          </p>
        </div>

        {/* Progress Bar */}
        <div className={`mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center justify-between mb-3">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  activeStep === index 
                    ? 'bg-primary text-white' 
                    : activeStep > index 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <span className="text-sm font-bold">{step.number}</span>
                <span className="hidden md:inline text-sm font-medium">{step.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-cyan-500 to-primary rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
            {/* Animated glow */}
            <motion.div 
              className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"
              animate={{ 
                left: ['0%', `${((activeStep + 1) / steps.length) * 100 - 5}%`] 
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((_, index) => (
              <span 
                key={index} 
                className={`text-xs transition-colors duration-300 ${
                  activeStep >= index ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Step {index + 1}
              </span>
            ))}
          </div>
        </div>

        {/* Steps - Enhanced Layout with Images */}
        <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="group relative"
              >
                {/* Connector Arrow (not on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-[140px] -right-3 z-20 items-center justify-center w-6 h-6 rounded-full bg-background border border-border">
                    <ArrowRight className="w-3 h-3 text-primary" />
                  </div>
                )}

                {/* Card */}
                <div className={`relative bg-card border rounded-2xl overflow-hidden transition-all duration-500 ${
                  activeStep === index 
                    ? 'border-primary shadow-[0_0_40px_rgba(59,130,246,0.3)] scale-[1.02]' 
                    : 'border-border hover:border-primary/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)]'
                }`}>
                  {/* Image Section */}
                  <div className="relative h-[180px] overflow-hidden">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        activeStep === index ? 'scale-125' : 'group-hover:scale-130'
                      }`}
                      style={{ transform: activeStep === index ? 'scale(1.25)' : undefined }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                    
                    {/* Number Badge Overlay */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1.5 rounded-lg bg-primary/90 text-white text-sm font-bold backdrop-blur-sm">
                        {step.number}
                      </span>
                    </div>

                    {/* Icon Overlay */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                      {step.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2">
                      {step.highlights.map((highlight, idx) => (
                        <span 
                          key={idx}
                          className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <a
            href="https://calendly.com/cryptobridgekorea"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-semibold hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300 group"
          >
            Start your journey
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;