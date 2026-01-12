import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { useCountUp } from '@/hooks/useCountUp';
import { ChevronDown } from 'lucide-react';

// Roster Data - The Team (Creative Agency Style)
const rosterMembers = [
  {
    id: '01',
    role: 'GO-TO-MARKET LEAD',
    title: 'CEO',
    background: 'Ex-KuCoin & Outlier Ventures',
    quote: 'Standardizing Global Excellence.',
    description: 'Defines the brand hierarchy and market entry strategy that aligns with Tier-1 global standards.',
    descriptionKo: '글로벌 탑티어 수준의 브랜드 위계와 시장 진입 전략(GTM)을 총괄 설계하여, 프로젝트의 체급을 높입니다.'
  },
  {
    id: '02',
    role: 'STRATEGY LEAD',
    title: 'Head of Strategy',
    background: 'Ex-Binance Fiat Leads',
    quote: 'Crafting the Macro-Narrative.',
    description: 'Structuring compelling brand stories and adoption funnels that resonate from retail users to institutional partners.',
    descriptionKo: 'Binance 출신의 시각으로, 리테일 유입부터 기관 설득까지 이어지는 거시적인 브랜드 내러티브를 설계합니다.'
  },
  {
    id: '03',
    role: 'OPERATION LEAD',
    title: 'Head of Community',
    background: 'Ex-a16z Head of Operation',
    quote: 'Silicon Valley Standard.',
    description: 'Translating Web3 tech into cultural movements, powered by global operational rigor.',
    descriptionKo: '실리콘밸리(a16z) 수준의 오퍼레이션 시스템을 도입하여 \'문화\'와 \'팬덤\'을 구축합니다.'
  },
  {
    id: '04',
    role: 'GROWTH LEAD',
    title: 'Head of Research',
    background: 'Ex-Journalist Korean Media',
    quote: 'Editorial Intelligence.',
    description: 'Leveraging deep media insights to craft high-impact content strategies.',
    descriptionKo: '저널리스트 출신의 통찰력으로 여론을 주도하는 킬러 콘텐츠 전략을 도출합니다.'
  },
];

// Metrics Data
const metrics = [
  { value: '$1.5B+', label: 'Volume Generated', labelKo: '생성된 거래량' },
  { value: '500K+', label: 'Active Community', labelKo: '활성 커뮤니티' },
  { value: '#1', label: 'Mindshare Ranking', labelKo: '마인드셰어 랭킹' },
];

// Backing Intelligence
const backingLogos = ['Binance', 'KuCoin', 'Coinone', 'Outlier Ventures', '21Shares'];

// Parse metric value for count-up
const parseMetricValue = (value: string): { numericValue: number; prefix: string; suffix: string } => {
  const match = value.match(/^([#$]?)(\d+\.?\d*)(.*)$/);
  if (match) {
    return {
      prefix: match[1] || '',
      numericValue: parseFloat(match[2]),
      suffix: match[3] || ''
    };
  }
  return { prefix: '', numericValue: 0, suffix: value };
};

// Animated Metric Component
const AnimatedMetric = ({ metric, index, isVisible }: { 
  metric: typeof metrics[0]; 
  index: number;
  isVisible: boolean;
}) => {
  const parsed = parseMetricValue(metric.value);
  const count = useCountUp({
    end: parsed.numericValue,
    duration: 2000,
    delay: index * 200,
    isVisible,
    decimals: parsed.numericValue % 1 !== 0 ? 1 : 0
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-black p-4 md:p-8 text-center group hover:bg-white/[0.02] transition-colors"
    >
      <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2 font-mono tracking-tight">
        {parsed.prefix}{count}{parsed.suffix}
      </div>
      <div className="text-[10px] md:text-sm text-white/60 uppercase tracking-wider mb-0.5 md:mb-1">
        {metric.label}
      </div>
      <div className="text-[9px] md:text-[10px] text-white/30">
        {metric.labelKo}
      </div>
    </motion.div>
  );
};

// Metrics Row Component
const MetricsRow = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-3 gap-px bg-white/10 rounded-lg overflow-hidden mb-8 md:mb-12"
    >
      {metrics.map((metric, index) => (
        <AnimatedMetric key={metric.label} metric={metric} index={index} isVisible={isVisible} />
      ))}
    </motion.div>
  );
};

// Mobile Accordion Item Component
const MobileRosterAccordionItem = ({ data, index, isOpen, onToggle }: { 
  data: typeof rosterMembers[0]; 
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border-b border-white/10 last:border-b-0"
    >
      <button
        onClick={onToggle}
        className={`w-full py-4 px-4 flex items-center justify-between text-left transition-colors min-h-[56px] ${
          isOpen ? 'bg-white/[0.04]' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="font-mono text-xs text-white/30 flex-shrink-0">{data.id}</span>
          <div className="min-w-0">
            <span className="font-mono text-[10px] uppercase tracking-widest text-primary/80 block">
              {data.role}
            </span>
            <h4 className="text-sm font-semibold text-white truncate">
              {data.title}
            </h4>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 ml-2"
        >
          <ChevronDown className="w-5 h-5 text-white/40" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 space-y-3 bg-white/[0.02]">
              <div>
                <span className="text-[10px] text-white/30 uppercase tracking-wider">Background</span>
                <p className="text-sm text-white/60 font-medium mt-0.5">{data.background}</p>
                <p className="text-xs text-primary/70 italic mt-1">"{data.quote}"</p>
              </div>
              <div>
                <span className="text-[10px] text-white/30 uppercase tracking-wider">Description</span>
                <p className="text-sm text-white/50 leading-relaxed mt-0.5">{data.description}</p>
                <p className="text-xs text-white/30 mt-1">{data.descriptionKo}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Desktop Roster Row Component - Terminal Style
const DesktopRosterRow = ({ data, index }: { data: typeof rosterMembers[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative group cursor-default
        border-b border-white/10 last:border-b-0
        transition-all duration-300
        ${isHovered ? 'bg-white/[0.04]' : 'bg-transparent'}
      `}
    >
      {/* Left Accent Bar */}
      <div 
        className={`
          absolute left-0 top-0 bottom-0 w-1
          transition-all duration-300
          ${isHovered ? 'bg-primary opacity-100' : 'bg-primary/50 opacity-0'}
        `}
      />

      <div className="grid grid-cols-12 gap-4 py-6 px-6 items-center">
        {/* Number */}
        <div className="col-span-1">
          <span className="font-mono text-sm text-white/20 group-hover:text-white/40 transition-colors">
            {data.id}
          </span>
        </div>

        {/* Category + Role */}
        <div className="col-span-3">
          <span className="font-mono text-xs uppercase tracking-widest text-primary/80 group-hover:text-primary transition-colors">
            {data.role}
          </span>
          <h4 className="text-lg font-semibold text-white group-hover:text-white transition-colors mt-1">
            {data.title}
          </h4>
        </div>

        {/* Background */}
        <div className="col-span-3">
          <span className="text-sm text-white/50 group-hover:text-white/70 transition-colors font-medium">
            {data.background}
          </span>
          <p className="text-xs text-primary/70 italic mt-1">"{data.quote}"</p>
        </div>

        {/* Description */}
        <div className="col-span-5">
          <p className="text-sm text-white/40 group-hover:text-white/60 transition-colors leading-relaxed">
            {data.description}
          </p>
          <p className="text-xs text-white/25 group-hover:text-white/40 transition-colors mt-1">
            {data.descriptionKo}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Backing Section Component
const BackingSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/5"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1">
            Backing Intelligence
          </div>
          <p className="text-[10px] md:text-xs text-white/20">Team's collective background</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          {backingLogos.map((logo, index) => (
            <motion.span
              key={logo}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
              className="px-2 md:px-3 py-1 md:py-1.5 text-[9px] md:text-[10px] font-mono uppercase tracking-wider text-white/30 border border-white/10 rounded hover:text-white/50 hover:border-white/20 transition-all cursor-default"
            >
              {logo}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const AuthoritySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(0);

  const handleAccordionToggle = (index: number) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-32 bg-black overflow-hidden"
    >
      {/* Terminal Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle scanlines */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
          }}
        />
        
        {/* Very subtle grid - hidden on mobile for performance */}
        <div 
          className="absolute inset-0 opacity-[0.02] hidden md:block"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-16"
        >
          {/* Section number */}
          <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
            <span className="text-xs md:text-sm font-mono text-white/40 tracking-wider">04</span>
            <div className="h-px w-12 md:w-16 bg-white/20" />
            <span className="text-xs md:text-sm font-medium text-white/40 uppercase tracking-wider">Authority</span>
          </div>

          {/* Title Group */}
          <div className="max-w-4xl">
            <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 leading-tight">
              The Creative Engine
            </h2>
            <p className="text-base md:text-2xl text-white/70 mb-2 md:mb-3 font-light">
              <span className="text-primary font-medium">"Engineered for Growth."</span>
            </p>
            <p className="text-sm md:text-lg text-white/50 mb-1 md:mb-2">
              We combined global exchange logic with local execution power.
            </p>
            <p className="text-xs md:text-sm text-white/30">
              글로벌 거래소의 로직과 로컬의 실행력을 결합했습니다.
            </p>
          </div>
        </motion.div>

        {/* Section 1: The Metrics */}
        <MetricsRow isVisible={isInView} />

        {/* Section 2: The Roster */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-4 md:mb-6"
        >
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">The Roster</span>
              <div className="h-px w-8 bg-white/10" />
            </div>
            
            {/* Column Headers - Desktop Only */}
            <div className="hidden md:grid grid-cols-12 gap-4 text-[10px] font-mono text-white/20 uppercase tracking-wider flex-1 ml-8">
              <div className="col-span-1">#</div>
              <div className="col-span-3">Role</div>
              <div className="col-span-3">Background</div>
              <div className="col-span-5">Description</div>
            </div>
          </div>
        </motion.div>

        {/* Roster List - Mobile: Accordion, Desktop: Table */}
        <div className="border border-white/10 rounded-lg overflow-hidden bg-black/50 backdrop-blur-sm">
          {/* Mobile Accordion */}
          <div className="md:hidden">
            {rosterMembers.map((member, index) => (
              <MobileRosterAccordionItem 
                key={member.id} 
                data={member} 
                index={index}
                isOpen={openAccordionIndex === index}
                onToggle={() => handleAccordionToggle(index)}
              />
            ))}
          </div>
          
          {/* Desktop Table */}
          <div className="hidden md:block">
            {rosterMembers.map((member, index) => (
              <DesktopRosterRow key={member.id} data={member} index={index} />
            ))}
          </div>
        </div>

        {/* Section 3: Backing Intelligence */}
        <BackingSection />
      </div>
    </section>
  );
};

export default AuthoritySection;