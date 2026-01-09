import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Building2, Shield, Newspaper, TrendingUp, Target, DollarSign } from 'lucide-react';

// Import logos for monochrome display
import coindeskLogo from '@/assets/logos/coindesk.png';
import blockmediaLogo from '@/assets/logos/blockmedia-new.png';
import coinnessLogo from '@/assets/logos/coinness.png';

// DNA Card Data - Part 1: Our System/Background
const dnaCards = [
  {
    number: '01',
    title: 'Exchange DNA',
    subtitle: 'Trading & Listing Strategy',
    logos: ['Upbit', 'Bithumb', 'Coinone'],
    description: 'Led by alumni from Korea\'s Tier-1 exchanges. We possess an internal understanding of liquidity management, MM operations, and the exact listing criteria used by DAXA members.',
    descriptionKo: '한국 1위권 거래소 출신들이 리드합니다. 유동성 관리, MM 운영, 그리고 DAXA 멤버들이 사용하는 정확한 상장 기준에 대한 내부적 이해를 갖추고 있습니다.',
    icon: Building2,
    accentColor: 'emerald'
  },
  {
    number: '02',
    title: 'Media Intelligence',
    subtitle: 'Narrative & Public Sentiment',
    logoImages: [coindeskLogo, blockmediaLogo, coinnessLogo],
    description: 'Former editors from top crypto media outlets craft your narrative. We know exactly how to structure headlines and stories to pass editorial review and trigger retail attention.',
    descriptionKo: '탑 크립토 미디어 출신 에디터들이 귀사의 내러티브를 만듭니다. 데스크 심사를 통과하고 리테일의 주목을 끌기 위해 헤드라인과 스토리를 어떻게 짜야 하는지 정확히 압니다.',
    icon: Newspaper,
    accentColor: 'purple'
  },
  {
    number: '03',
    title: 'Regulatory Shield',
    subtitle: 'Compliance & Risk Mgmt',
    logos: ['KISA', 'FSC Advisory'],
    description: 'Advisors who helped shape Korea\'s VASP regulations. We provide a pre-emptive shield against regulatory friction, ensuring your project remains "clean" in the eyes of authorities.',
    descriptionKo: '한국 VASP 규제 형성에 기여한 자문위원들입니다. 규제 마찰에 대한 선제적 방패를 제공하여, 당국의 눈에 귀사의 프로젝트가 \'무결점\' 상태로 남도록 보장합니다.',
    icon: Shield,
    accentColor: 'blue'
  }
];

// Squad Members - Part 2: The People Who Execute
const squadMembers = [
  {
    number: '01',
    title: 'Global Strategy Lead',
    subtitle: 'Ex-KuCoin Core Team',
    description: 'Inside knowledge of global CEX listing logic and liquidity operations.',
    descriptionKo: '글로벌 거래소 핵심 팀 출신, 상장 로직과 유동성 운영 총괄.',
    icon: Building2
  },
  {
    number: '02',
    title: 'Venture Network Lead',
    subtitle: 'Ex-Outlier Ventures Inv. Manager',
    description: 'Direct access to Tier-1 global VC networks and narrative shaping.',
    descriptionKo: '유럽 최대 Web3 액셀러레이터 출신, 글로벌 VC 네트워크 및 내러티브 설계.',
    icon: TrendingUp
  },
  {
    number: '03',
    title: 'Korea Market Lead',
    subtitle: 'Founder of CryptoBridge Korea',
    description: 'Executed 30+ Korea GTM campaigns with deep local community roots.',
    descriptionKo: '크립토브릿지 설립자, 30개 이상의 한국 GTM 캠페인 성공적 수행 및 커뮤니티 장악.',
    icon: Target
  },
  {
    number: '04',
    title: 'Finance & Structuring',
    subtitle: 'Senior Equity Consultant at Fundshing',
    description: 'Expertise in financial structuring and token economy optimization.',
    descriptionKo: '금융 컨설턴트 출신, 토큰 이코노미 구조화 및 자산 운용 최적화.',
    icon: DollarSign
  }
];

// DNA Card Component
const DNACard = ({ data, index }: { data: typeof dnaCards[0]; index: number }) => {
  const Icon = data.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative p-8 rounded-xl border border-white/10 bg-black/50 backdrop-blur-sm hover:border-white/20 transition-all duration-500"
    >
      {/* Number */}
      <div className="absolute top-6 right-6 text-[80px] font-bold text-white/[0.03] leading-none select-none">
        {data.number}
      </div>

      {/* Logos Section - Monochrome */}
      <div className="flex items-center gap-3 mb-6 h-8">
        {data.logoImages ? (
          data.logoImages.map((logo, i) => (
            <img
              key={i}
              src={logo}
              alt=""
              className="h-5 w-auto object-contain opacity-40 grayscale brightness-200 group-hover:opacity-60 transition-opacity"
            />
          ))
        ) : (
          data.logos?.map((logo, i) => (
            <span
              key={i}
              className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-white/40 border border-white/20 rounded group-hover:text-white/60 group-hover:border-white/30 transition-all"
            >
              {logo}
            </span>
          ))
        )}
      </div>

      {/* Icon */}
      <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
        <Icon className="w-6 h-6 text-white/60 group-hover:text-white/80 transition-colors" />
      </div>

      {/* Title */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white mb-1">
          {data.title}
        </h3>
        <p className="text-xs text-white/40 uppercase tracking-wider">
          {data.subtitle}
        </p>
      </div>

      {/* Description */}
      <p className="text-sm text-white/60 leading-relaxed mb-4">
        {data.description}
      </p>
      <p className="text-xs text-white/30 leading-relaxed">
        {data.descriptionKo}
      </p>
    </motion.div>
  );
};

// Squad Card Component
const SquadCard = ({ data, index }: { data: typeof squadMembers[0]; index: number }) => {
  const Icon = data.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      className="group relative p-6 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300"
    >
      {/* Number Badge */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
        <span className="text-xs font-mono text-white/40">{data.number}</span>
      </div>

      {/* Icon */}
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:from-white/15 group-hover:to-white/10 transition-all">
        <Icon className="w-5 h-5 text-white/70" />
      </div>

      {/* Title */}
      <h4 className="text-lg font-semibold text-white mb-1">
        {data.title}
      </h4>
      
      {/* Subtitle - Background */}
      <p className="text-sm text-primary/80 font-medium mb-4">
        {data.subtitle}
      </p>

      {/* Description */}
      <p className="text-sm text-white/60 leading-relaxed mb-2">
        {data.description}
      </p>
      <p className="text-xs text-white/40 leading-relaxed">
        {data.descriptionKo}
      </p>
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
      {/* Subtle Background Effects - Minimal */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Very subtle grid */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }}
        />
        
        {/* Subtle gradient orb */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-white/[0.01] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          {/* Section number */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-sm font-mono text-white/40 tracking-wider">04</span>
            <div className="h-px w-12 bg-white/20" />
            <span className="text-sm font-medium text-white/40 uppercase tracking-wider">The Architects</span>
          </div>

          {/* Title Group */}
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Built by Exchange Insiders
            </h2>
            <p className="text-xl md:text-2xl text-white/60 mb-3">
              "We don't just know the market. <span className="text-white">We built parts of it.</span>"
            </p>
            <p className="text-base text-white/30">
              우리는 시장을 아는 게 아닙니다. 시장의 일부를 직접 만들었습니다.
            </p>
          </div>
        </motion.div>

        {/* Part 1: The DNA - 3 Column Layout */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="text-xs font-mono text-white/30 uppercase tracking-widest">Part 1</span>
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-white/40">The DNA — 출신 성분</span>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {dnaCards.map((item, index) => (
              <DNACard key={item.title} data={item} index={index} />
            ))}
          </div>
        </div>

        {/* Part 2: The Squad - Key Team Members */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-mono text-white/30 uppercase tracking-widest">Part 2</span>
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-white/40">The Squad — 핵심 인력</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              "Global Experience, Local Execution."
            </h3>
            <p className="text-base text-white/50 max-w-2xl">
              글로벌 스탠다드와 한국의 실행력을 결합한 팀이 직접 움직입니다.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {squadMembers.map((item, index) => (
              <SquadCard key={item.title} data={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthoritySection;
