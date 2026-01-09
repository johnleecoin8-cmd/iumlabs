import React from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Target, Crown, Building2 } from 'lucide-react';

// Project logos
import mantraLogo from '@/assets/logos/mantra.png';
import storyLogo from '@/assets/logos/story-protocol.png';
import peaqLogo from '@/assets/logos/peaq.png';

// Deal Tombstone data - IB style achievements
const dealTombstones = [
  {
    id: '01',
    logo: mantraLogo,
    project: 'MANTRA',
    title: 'The Liquidity Anchor',
    titleKr: '유동성 앵커',
    objective: 'Secure dominance in RWA sector.',
    execution: 'Strategic positioning for KRW liquidity.',
    outcomes: [
      { icon: Crown, text: '#1 RWA Token in Korea' },
      { icon: Building2, text: 'Major Exchange Listed' },
      { icon: Target, text: 'Top 3 Global Volume Source' },
    ],
    accentColor: 'from-orange-500/20 to-transparent',
    borderGlow: 'group-hover:shadow-[0_0_80px_-20px_rgba(251,146,60,0.4)]',
  },
  {
    id: '02',
    logo: storyLogo,
    project: 'Story Protocol',
    title: 'The Narrative King',
    titleKr: '내러티브의 제왕',
    objective: 'Mass retail adoption of IP concept.',
    execution: 'Localized narrative engineering.',
    outcomes: [
      { icon: Crown, text: 'Dominant Mindshare (vs other L1s)' },
      { icon: Target, text: 'Organic Search Leader (Naver/Google)' },
      { icon: Building2, text: 'Viral Penetration in Top Communities' },
    ],
    accentColor: 'from-purple-500/20 to-transparent',
    borderGlow: 'group-hover:shadow-[0_0_80px_-20px_rgba(168,85,247,0.4)]',
  },
  {
    id: '03',
    logo: peaqLogo,
    project: 'peaq',
    title: 'The Infrastructure',
    titleKr: '인프라 구축',
    objective: 'Real-world device onboarding.',
    execution: 'DePIN education & community building.',
    outcomes: [
      { icon: Crown, text: 'Largest DePIN Community in Asia' },
      { icon: Target, text: 'High Retention User Base' },
      { icon: Building2, text: 'Ecosystem Integration with KR Partners' },
    ],
    accentColor: 'from-cyan-500/20 to-transparent',
    borderGlow: 'group-hover:shadow-[0_0_80px_-20px_rgba(34,211,238,0.4)]',
  },
];

// Deal Tombstone Card Component - IB style
const TombstoneCard = ({
  deal,
  index,
  isVisible,
}: {
  deal: (typeof dealTombstones)[0];
  index: number;
  isVisible: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`
        group relative
        border border-border/30
        bg-gradient-to-b from-background to-background/80
        transition-all duration-700 ease-out
        hover:border-border/60
        ${deal.borderGlow}
      `}
    >
      {/* Subtle top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${deal.accentColor}`} />
      
      {/* Content Container */}
      <div className="p-8 md:p-10">
        {/* Header: Logo + Deal Number */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <img
              src={deal.logo}
              alt={deal.project}
              className="h-10 md:h-12 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-500"
            />
            <div className="h-8 w-px bg-border/50" />
            <span className="text-sm font-medium text-muted-foreground tracking-wide">
              {deal.project}
            </span>
          </div>
          <span className="text-xs font-mono text-muted-foreground/60 tracking-widest">
            DEAL {deal.id}
          </span>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-2 tracking-tight">
            {deal.title}
          </h3>
          <span className="text-sm text-muted-foreground">
            {deal.titleKr}
          </span>
        </div>

        {/* Objective & Execution - Subdued */}
        <div className="space-y-3 mb-10 pb-8 border-b border-border/30">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/60 block mb-1">
              Objective
            </span>
            <p className="text-sm text-muted-foreground">
              {deal.objective}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/60 block mb-1">
              Execution
            </span>
            <p className="text-sm text-muted-foreground">
              {deal.execution}
            </p>
          </div>
        </div>

        {/* Outcomes - The Main Focus */}
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/60 block mb-4">
            Outcome
          </span>
          <div className="space-y-3">
            {deal.outcomes.map((outcome, i) => {
              const Icon = outcome.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.15 + i * 0.1 }}
                  className="flex items-center gap-3 group/item"
                >
                  <Icon className="w-4 h-4 text-primary/70 flex-shrink-0" />
                  <span className="text-base md:text-lg font-medium text-foreground tracking-tight group-hover/item:text-primary transition-colors duration-300">
                    {outcome.text}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Hover Arrow */}
        <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
          <ArrowUpRight className="w-5 h-5 text-primary/60" />
        </div>
      </div>
    </motion.div>
  );
};

export const PerformanceSection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden bg-background"
    >
      {/* Subtle Background - Gallery Lighting Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient spotlights */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/[0.02] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/[0.02] rounded-full blur-[120px]" />
        
        {/* Very subtle grid */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-primary font-mono text-sm">03</span>
            <div className="w-12 h-px bg-primary/50" />
            <span className="text-muted-foreground font-mono text-xs uppercase tracking-[0.2em]">
              Track Record
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            The Footprint
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Defining the Korean Landscape.
            <span className="text-foreground/60 block mt-1 text-base">
              한국 크립토 지형을 정의하다.
            </span>
          </p>
        </motion.div>

        {/* Deal Tombstones Grid - 3 Column */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {dealTombstones.map((deal, index) => (
            <TombstoneCard
              key={deal.id}
              deal={deal}
              index={index}
              isVisible={isInView}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground font-mono tracking-wide">
            These are not vanity metrics.{' '}
            <span className="text-foreground">These are market positions.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PerformanceSection;
