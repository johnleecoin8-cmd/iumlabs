import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Building2, Shield, Newspaper, CheckCircle, Users, Quote, Lock, Handshake } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';

// Exchange DNA data
const exchangeDNA = [
  {
    title: 'Exchange Veterans',
    titleKo: '거래소 베테랑',
    description: '10+ years combined experience at Tier-1 KRW exchanges',
    descriptionKo: '국내 1등급 거래소 출신, 합산 10년 이상 경력',
    badges: ['Upbit', 'Bithumb', 'Coinone'],
    icon: Building2,
    accentColor: 'emerald'
  },
  {
    title: 'Media & Research',
    titleKo: '미디어 & 리서치',
    description: "Former editors at Korea's top crypto media outlets",
    descriptionKo: '국내 주요 암호화폐 미디어 출신 에디터',
    badges: ['BlockMedia', 'CoinDesk KR', 'Coinness'],
    icon: Newspaper,
    accentColor: 'purple'
  },
  {
    title: 'Compliance Experts',
    titleKo: '규제 전문가',
    description: "VASP advisors who shaped Korea's crypto regulations",
    descriptionKo: '한국 VASP 규제 형성에 참여한 어드바이저',
    badges: ['KISA', 'FSC Advisory'],
    icon: Shield,
    accentColor: 'blue'
  }
];

// Insider advantages data
const insiderAdvantages = [
  {
    title: 'Exchange Listing Playbook',
    titleKo: '거래소 상장 플레이북',
    description: 'We know the exact criteria and timelines for KRW exchange listings.',
    icon: CheckCircle
  },
  {
    title: 'Regulatory Radar',
    titleKo: '규제 레이더',
    description: 'Direct lines to FSC, FSS for pre-emptive compliance.',
    icon: Shield
  },
  {
    title: 'Media Gatekeepers',
    titleKo: '미디어 게이트키퍼',
    description: 'Personal networks with editors at every major outlet.',
    icon: Newspaper
  },
  {
    title: 'KOL Inner Circle',
    titleKo: 'KOL 이너서클',
    description: '120+ verified influencers, exclusive to our network.',
    icon: Users
  }
];

// Trust signals data
const trustSignals = [
  { value: 10, suffix: '+', label: 'Years in Korea Crypto', labelKo: '한국 크립토 경력' },
  { value: 0, suffix: '', label: 'Incidents or Leaks', labelKo: '사고 및 정보유출' },
  { value: 100, suffix: '%', label: 'Client NDA Protected', labelKo: 'NDA 보호율' },
  { value: 5, suffix: '', label: 'Official Exchange Partners', labelKo: '공식 거래소 파트너' }
];

// DNA Card Component
const DNACard = ({ data, index }: { data: typeof exchangeDNA[0]; index: number }) => {
  const Icon = data.icon;
  const accentColors: Record<string, string> = {
    emerald: 'group-hover:border-emerald-500/50 group-hover:shadow-emerald-500/10',
    purple: 'group-hover:border-purple-500/50 group-hover:shadow-purple-500/10',
    blue: 'group-hover:border-blue-500/50 group-hover:shadow-blue-500/10'
  };
  const iconColors: Record<string, string> = {
    emerald: 'text-emerald-400 group-hover:text-emerald-300',
    purple: 'text-purple-400 group-hover:text-purple-300',
    blue: 'text-blue-400 group-hover:text-blue-300'
  };
  const bgColors: Record<string, string> = {
    emerald: 'bg-emerald-500/10 group-hover:bg-emerald-500/20',
    purple: 'bg-purple-500/10 group-hover:bg-purple-500/20',
    blue: 'bg-blue-500/10 group-hover:bg-blue-500/20'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative p-6 md:p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl ${accentColors[data.accentColor]}`}
    >
      {/* Icon */}
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${bgColors[data.accentColor]}`}>
        <Icon className={`w-7 h-7 transition-colors duration-300 ${iconColors[data.accentColor]}`} />
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">
        {data.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">{data.titleKo}</p>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed mb-6">
        {data.description}
      </p>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {data.badges.map((badge, i) => (
          <span
            key={i}
            className="px-3 py-1 text-xs font-medium rounded-full bg-muted/50 text-muted-foreground border border-border"
          >
            {badge}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

// Advantage Item Component
const AdvantageItem = ({ data, index }: { data: typeof insiderAdvantages[0]; index: number }) => {
  const Icon = data.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group flex items-start gap-4 p-4 rounded-xl hover:bg-muted/30 transition-colors duration-300"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {data.title}
        </h4>
        <p className="text-xs text-muted-foreground mb-1">{data.titleKo}</p>
        <p className="text-sm text-muted-foreground">{data.description}</p>
      </div>
    </motion.div>
  );
};

// Trust Signal Card Component
const TrustSignalCard = ({ data, index, isInView }: { data: typeof trustSignals[0]; index: number; isInView: boolean }) => {
  const count = useCountUp({
    end: data.value,
    duration: 2000 + index * 200,
    suffix: data.suffix,
    isVisible: isInView
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="text-center p-6 rounded-xl border border-border bg-card/30 hover:border-primary/30 transition-all duration-300"
    >
      <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
        {count}
      </div>
      <div className="text-sm font-medium text-muted-foreground">{data.label}</div>
      <div className="text-xs text-muted-foreground/70 mt-1">{data.labelKo}</div>
    </motion.div>
  );
};

export const AuthoritySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(trustRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-background overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          {/* Section number */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-mono text-primary tracking-wider">04</span>
            <div className="h-px w-12 bg-primary/50" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Authority</span>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            The Architects
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            We don't just know the market. <span className="text-foreground font-medium">We built parts of it.</span>
          </p>
          <p className="text-base text-muted-foreground/80 mt-2">
            우리는 시장을 아는 게 아닙니다. 시장을 만든 사람들입니다.
          </p>
        </motion.div>

        {/* Part A: Exchange DNA */}
        <div className="mb-20 md:mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <Lock className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Exchange DNA</h3>
            <span className="text-sm text-muted-foreground">— 출신 성분</span>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {exchangeDNA.map((item, index) => (
              <DNACard key={item.title} data={item} index={index} />
            ))}
          </div>
        </div>

        {/* Part B: Insider Advantage */}
        <div className="mb-20 md:mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <Handshake className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">The Insider Advantage</h3>
            <span className="text-sm text-muted-foreground">— 우리만이 가진 것</span>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 p-6 rounded-2xl border border-border bg-card/30">
            {insiderAdvantages.map((item, index) => (
              <AdvantageItem key={item.title} data={item} index={index} />
            ))}
          </div>
        </div>

        {/* Part C: Trust Signals */}
        <div className="mb-20 md:mb-24" ref={trustRef}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Trust Signals</h3>
            <span className="text-sm text-muted-foreground">— 신뢰 지표</span>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustSignals.map((item, index) => (
              <TrustSignalCard key={item.label} data={item} index={index} isInView={isInView} />
            ))}
          </div>
        </div>

        {/* Part D: Featured Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-8 md:p-12 rounded-2xl border border-border bg-gradient-to-br from-card/80 to-card/40"
        >
          {/* Quote icon */}
          <Quote className="absolute top-6 left-6 w-12 h-12 text-primary/20" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <p className="text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed mb-6 italic">
              "Ium Labs isn't just another agency. They understand the nuances of Korean regulations and exchange dynamics that only insiders know."
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-px h-6 bg-primary/50" />
              <span className="text-sm text-muted-foreground">
                Senior BD Lead, Tier-1 Exchange
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AuthoritySection;
