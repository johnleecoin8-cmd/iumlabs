import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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
}

const steps: ProcessStep[] = [
  {
    number: '01',
    subtitle: 'Kickoff',
    title: 'Initial Discussion',
    description: 'Deep understanding of your project and clear goal definition.',
    image: kickoffImg,
    details: ['Project Understanding', 'Goal Definition', 'Market Analysis']
  },
  {
    number: '02',
    subtitle: 'Research',
    title: 'Discovery & Research',
    description: 'Comprehensive competitor and market analysis for optimal positioning.',
    image: discoveryImg,
    details: ['Competitor Analysis', 'Position Mapping', 'KOL Research']
  },
  {
    number: '03',
    subtitle: 'Strategy',
    title: 'Campaign Design',
    description: 'Custom marketing roadmap tailored for Korean market success.',
    image: strategyImg,
    details: ['Campaign Design', 'KPI Definition', 'Resource Planning']
  },
  {
    number: '04',
    subtitle: 'Launch',
    title: 'Execution',
    description: 'Full-scale deployment across all marketing channels.',
    image: executionImg,
    details: ['KOL Campaign', 'PR Distribution', 'Community Growth']
  },
  {
    number: '05',
    subtitle: 'Optimize',
    title: 'Growth Tuning',
    description: 'Data-driven optimization based on real-time metrics.',
    image: growthImg,
    details: ['KPI Adjustment', 'ROI Optimization', 'Narrative Riding']
  },
  {
    number: '06',
    subtitle: 'Report',
    title: 'Performance Review',
    description: 'Comprehensive analysis and next phase recommendations.',
    image: reportingImg,
    details: ['KPI Report', 'Campaign Analysis', 'Next Sprint']
  }
];

const ProcessCard = ({ step, index }: { step: ProcessStep; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const numberX = useTransform(scrollYProgress, [0, 0.5, 1], [-100, 0, 100]);

  return (
    <div 
      ref={cardRef}
      className="min-h-[70vh] flex items-center justify-center px-6 py-12"
    >
      <motion.div 
        style={{ opacity, scale }}
        className="relative w-full max-w-5xl"
      >
        {/* Large Background Number */}
        <motion.div 
          style={{ x: numberX }}
          className="absolute -left-8 md:-left-16 lg:-left-24 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        >
          <span className="text-[180px] md:text-[280px] lg:text-[360px] font-black text-primary/[0.07] leading-none">
            {step.number}
          </span>
        </motion.div>

        {/* Card Content */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-8 md:p-12 overflow-hidden">
          {/* Left - Image */}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[400px] rounded-2xl overflow-hidden">
            <img 
              src={step.image} 
              alt={step.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            
            {/* Number Badge */}
            <div className="absolute top-4 left-4 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-bold">
              Step {step.number}
            </div>
          </div>

          {/* Right - Content */}
          <div className="flex flex-col justify-center">
            {/* Subtitle */}
            <span className="text-primary text-sm font-medium uppercase tracking-widest mb-2">
              {step.subtitle}
            </span>

            {/* Title */}
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {step.title}
            </h3>

            {/* Divider */}
            <div className="w-16 h-1 bg-primary rounded-full mb-6" />

            {/* Description */}
            <p className="text-muted-foreground text-lg mb-8">
              {step.description}
            </p>

            {/* Details */}
            <ul className="space-y-3">
              {step.details.map((detail, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground">
                  <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-base md:text-lg">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
        </div>
      </motion.div>
    </div>
  );
};

const ProcessSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={ref} className="bg-background border-t border-border overflow-hidden">
      {/* Section Header */}
      <div className={`py-24 px-6 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h2 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-[0.15em] text-foreground uppercase mb-6">
          LAUNCH
        </h2>
        <div className={`w-full max-w-xl mx-auto h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mb-6 transition-all duration-1000 delay-300 ${isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`} />
        <p className={`text-muted-foreground text-sm md:text-base tracking-wider uppercase transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          6 steps from idea to Korean market domination
        </p>
      </div>

      {/* Scroll Cards */}
      <div className="relative">
        {steps.map((step, index) => (
          <ProcessCard key={index} step={step} index={index} />
        ))}
      </div>

      {/* CTA */}
      <div className="py-24 px-6 text-center">
        <CalendlyButton className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground rounded-full text-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 group">
          Start your journey
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </CalendlyButton>
      </div>
    </section>
  );
};

export default ProcessSection;
