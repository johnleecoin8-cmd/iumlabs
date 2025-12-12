import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import CalendlyButton from './CalendlyButton';

// Process images
import kickoffImg from '@/assets/process/kickoff-discussion.jpg';
import discoveryImg from '@/assets/process/discovery-research.jpg';
import strategyImg from '@/assets/process/strategy-planning.jpg';
import executionImg from '@/assets/process/execution-growth.jpg';
import growthImg from '@/assets/process/growth-optimization.jpg';
import reportingImg from '@/assets/process/reporting.jpg';

interface ProcessStep {
  number: string;
  subtitle: string;
  title: string;
  description: string;
  image: string;
  details: string[];
  highlights: string[];
}

const steps: ProcessStep[] = [
  {
    number: '01',
    subtitle: 'Kickoff',
    title: 'Initial Discussion',
    description: 'Deep understanding of your project and clear goal definition. We analyze your vision, target audience, and unique value proposition to create the foundation for success.',
    image: kickoffImg,
    details: [
      'Project deep-dive & goal alignment',
      'Target audience analysis',
      'Budget & timeline planning',
      'Success metrics definition'
    ],
    highlights: ['Project Understanding', 'Goal Definition', 'Timeline Setup']
  },
  {
    number: '02',
    subtitle: 'Market Intelligence',
    title: 'Discovery & Research',
    description: 'Comprehensive competitor and market analysis to find optimal positioning in the Korean Web3 ecosystem.',
    image: discoveryImg,
    details: [
      'Korean market landscape analysis',
      'Competitor positioning mapping',
      'Community sentiment research',
      'Opportunity identification'
    ],
    highlights: ['Competitor Analysis', 'Position Mapping', 'Market Research']
  },
  {
    number: '03',
    subtitle: 'Campaign Design',
    title: 'Strategy & Planning',
    description: 'Custom marketing roadmap and campaign design tailored for Korean market success.',
    image: strategyImg,
    details: [
      'Campaign architecture (AMA, KOL, PR, Content)',
      'Ecosystem launch planning',
      'KPI definition & tracking setup',
      'Resource & budget allocation'
    ],
    highlights: ['Campaign Design', 'KPI Definition', 'Resource Planning']
  },
  {
    number: '04',
    subtitle: 'Full-Scale Launch',
    title: 'Execution',
    description: 'The most critical phase where we deploy all channels and execute the comprehensive marketing strategy.',
    image: executionImg,
    details: [
      'KOL campaign activation',
      'PR & media distribution',
      'Community building & engagement',
      'Event hosting & management'
    ],
    highlights: ['KOL Campaign', 'PR Distribution', 'Community Launch']
  },
  {
    number: '05',
    subtitle: 'Real-time Tuning',
    title: 'Growth Optimization',
    description: 'Data-driven campaign optimization based on real-time performance metrics and market feedback.',
    image: growthImg,
    details: [
      'Performance monitoring dashboard',
      'A/B testing & iteration',
      'KPI adjustment & refinement',
      'ROI optimization strategies'
    ],
    highlights: ['KPI Adjustment', 'ROI Optimization', 'Performance Tuning']
  },
  {
    number: '06',
    subtitle: 'Performance Review',
    title: 'Reporting',
    description: 'Comprehensive performance analysis and strategic recommendations for continued growth.',
    image: reportingImg,
    details: [
      'Detailed KPI report generation',
      'Campaign performance analysis',
      'ROI calculation & insights',
      'Next phase recommendations'
    ],
    highlights: ['KPI Report', 'Campaign Analysis', 'Growth Roadmap']
  }
];

const ProcessSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} className="py-24 px-6 bg-background border-t border-border overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header - LAUNCH */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-[0.15em] text-foreground uppercase mb-6">
            LAUNCH
          </h2>
          <div className={`w-full max-w-xl mx-auto h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mb-6 transition-all duration-1000 delay-300 ${isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`} />
          <p className={`text-muted-foreground text-sm md:text-base tracking-wider uppercase transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            6 steps from idea to Korean market domination
          </p>
        </div>

        {/* Accordion List */}
        <div className={`border-t border-dashed border-border transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {steps.map((step, index) => (
            <div key={index} className="border-b border-dashed border-border">
              {/* Accordion Header */}
              <button
                onClick={() => toggleAccordion(index)}
                className={`w-full flex items-center justify-between py-6 md:py-8 px-2 md:px-4 group transition-colors duration-300 ${
                  openIndex === index ? 'bg-primary/5' : 'hover:bg-muted/30'
                }`}
              >
                <div className="flex items-center gap-4 md:gap-8 lg:gap-12">
                  {/* Number */}
                  <span className={`text-2xl md:text-3xl lg:text-4xl font-light transition-colors duration-300 ${
                    openIndex === index ? 'text-primary' : 'text-muted-foreground/50'
                  }`}>
                    {step.number}
                  </span>
                  
                  {/* Subtitle */}
                  <span className="hidden sm:block text-xs md:text-sm text-muted-foreground uppercase tracking-wider min-w-[120px] md:min-w-[160px] text-left">
                    {step.subtitle}
                  </span>
                  
                  {/* Title */}
                  <span className={`text-base md:text-lg lg:text-xl font-medium transition-colors duration-300 text-left ${
                    openIndex === index ? 'text-primary' : 'text-foreground'
                  }`}>
                    {step.title}
                  </span>
                </div>

                {/* Chevron */}
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-300 ${
                    openIndex === index ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                  }`} />
                </motion.div>
              </button>

              {/* Accordion Content */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-2 md:px-4 pb-8 md:pb-12">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10 bg-muted/20 rounded-xl p-6 md:p-8">
                        {/* Image - 2 columns */}
                        <div className="md:col-span-2">
                          <div className="aspect-[4/3] rounded-lg overflow-hidden">
                            <img 
                              src={step.image} 
                              alt={step.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Content - 3 columns */}
                        <div className="md:col-span-3 flex flex-col justify-center">
                          {/* Description */}
                          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                            {step.description}
                          </p>

                          {/* Details List */}
                          <ul className="space-y-2 mb-6">
                            {step.details.map((detail, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                {detail}
                              </li>
                            ))}
                          </ul>

                          {/* Highlights Tags */}
                          <div className="flex flex-wrap gap-2">
                            {step.highlights.map((highlight, i) => (
                              <span 
                                key={i}
                                className="px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className={`mt-16 text-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <CalendlyButton className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105">
            Start your journey
          </CalendlyButton>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
