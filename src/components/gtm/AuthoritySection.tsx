import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useCountUp } from '@/hooks/useCountUp';
// Roster Data - The Team
const rosterMembers = [
  {
    number: '01',
    category: 'GLOBAL STRATEGY',
    role: 'Global Strategy Lead',
    origin: 'Ex-KuCoin Core Team',
    intel: 'Inside knowledge of global CEX listing logic & MM operations.',
    intelKo: '글로벌 거래소 핵심 팀, 상장 로직 및 MM 운영 총괄'
  },
  {
    number: '02',
    category: 'VENTURE NETWORK',
    role: 'Venture Network Lead',
    origin: 'Ex-Outlier Ventures Inv. Manager',
    intel: 'Direct access to Tier-1 VCs & Narrative structuring.',
    intelKo: '유럽 최대 Web3 액셀러레이터, 글로벌 VC 네트워크 연결'
  },
  {
    number: '03',
    category: 'KOREA EXECUTION',
    role: 'Korea Market Lead',
    origin: 'Founder of CryptoBridge',
    intel: 'Executed 30+ GTM campaigns. Deepest local community roots.',
    intelKo: '크립토브릿지 설립자, 30+ 프로젝트 성공 수행 및 커뮤니티 장악'
  },
  {
    number: '04',
    category: 'FINANCE & STRUCTURING',
    role: 'Token Economy Architect',
    origin: 'Senior Consultant at Fundshing',
    intel: 'Financial structuring & Asset optimization expert.',
    intelKo: '금융 컨설턴트 출신, 토큰 이코노미 및 자산 운용 최적화'
  }
];

// Metrics Data
const metrics = [
  { value: '$1.5B+', label: 'Volume Generated', labelKo: '거래량 창출' },
  { value: '500K+', label: 'Active Community', labelKo: '활성 커뮤니티' },
  { value: '#1', label: 'Mindshare Ranking', labelKo: '마인드쉐어 랭킹' }
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
      className="bg-black p-6 md:p-8 text-center group hover:bg-white/[0.02] transition-colors"
    >
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 font-mono tracking-tight">
        {parsed.prefix}{count}{parsed.suffix}
      </div>
      <div className="text-xs md:text-sm text-white/60 uppercase tracking-wider mb-1">
        {metric.label}
      </div>
      <div className="text-[10px] text-white/30">
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
      className="grid grid-cols-3 gap-px bg-white/10 rounded-lg overflow-hidden mb-12"
    >
      {metrics.map((metric, index) => (
        <AnimatedMetric key={metric.label} metric={metric} index={index} isVisible={isVisible} />
      ))}
    </motion.div>
  );
};

// Roster Row Component - Terminal Style
const RosterRow = ({ data, index }: { data: typeof rosterMembers[0]; index: number }) => {
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

      <div className="grid grid-cols-12 gap-4 py-6 px-4 md:px-6 items-start md:items-center">
        {/* Number */}
        <div className="col-span-1 hidden md:block">
          <span className="font-mono text-sm text-white/20 group-hover:text-white/40 transition-colors">
            {data.number}
          </span>
        </div>

        {/* Category + Role */}
        <div className="col-span-12 md:col-span-3">
          <div className="flex items-center gap-2 mb-1 md:mb-0">
            <span className="md:hidden font-mono text-xs text-white/30">{data.number}</span>
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-primary/80 group-hover:text-primary transition-colors">
              {data.category}
            </span>
          </div>
          <h4 className="text-base md:text-lg font-semibold text-white group-hover:text-white transition-colors mt-1">
            {data.role}
          </h4>
        </div>

        {/* Origin */}
        <div className="col-span-12 md:col-span-3 mt-2 md:mt-0">
          <div className="text-[10px] text-white/30 uppercase tracking-wider mb-1 md:hidden">Origin</div>
          <span className="text-sm text-white/50 group-hover:text-white/70 transition-colors font-medium">
            {data.origin}
          </span>
        </div>

        {/* Intel */}
        <div className="col-span-12 md:col-span-5 mt-3 md:mt-0">
          <div className="text-[10px] text-white/30 uppercase tracking-wider mb-1 md:hidden">Intel</div>
          <p className="text-sm text-white/40 group-hover:text-white/60 transition-colors leading-relaxed">
            {data.intel}
          </p>
          <p className="text-xs text-white/25 group-hover:text-white/40 transition-colors mt-1">
            {data.intelKo}
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
      className="mt-12 pt-8 border-t border-white/5"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1">
            Backing Intelligence
          </div>
          <p className="text-xs text-white/20">Team's collective background</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          {backingLogos.map((logo, index) => (
            <motion.span
              key={logo}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
              className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-white/30 border border-white/10 rounded hover:text-white/50 hover:border-white/20 transition-all cursor-default"
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

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-black overflow-hidden"
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
        
        {/* Very subtle grid */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          {/* Section number */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-sm font-mono text-white/40 tracking-wider">04</span>
            <div className="h-px w-16 bg-white/20" />
            <span className="text-sm font-medium text-white/40 uppercase tracking-wider">Authority</span>
          </div>

          {/* Title Group */}
          <div className="max-w-4xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Human Capital
            </h2>
            <p className="text-xl md:text-2xl text-white/70 mb-3 font-light">
              <span className="text-primary font-medium">"Engineered for Growth."</span>
            </p>
            <p className="text-base md:text-lg text-white/50 mb-2">
              We combined global exchange logic with local execution power.
            </p>
            <p className="text-sm text-white/30">
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
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">The Roster</span>
              <div className="h-px w-8 bg-white/10" />
            </div>
            
            {/* Column Headers - Desktop Only */}
            <div className="hidden md:grid grid-cols-12 gap-4 text-[10px] font-mono text-white/20 uppercase tracking-wider flex-1 ml-8">
              <div className="col-span-1">#</div>
              <div className="col-span-3">Role</div>
              <div className="col-span-3">Origin</div>
              <div className="col-span-5">Intel</div>
            </div>
          </div>
        </motion.div>

        {/* Roster List */}
        <div className="border border-white/10 rounded-lg overflow-hidden bg-black/50 backdrop-blur-sm">
          {rosterMembers.map((member, index) => (
            <RosterRow key={member.number} data={member} index={index} />
          ))}
        </div>

        {/* Section 3: Backing Intelligence */}
        <BackingSection />
      </div>
    </section>
  );
};

export default AuthoritySection;
