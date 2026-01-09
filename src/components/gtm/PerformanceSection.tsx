import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ComposedChart, Area, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendingUp, Users, Zap, ArrowUpRight } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';

// Project logos
import mantraLogo from '@/assets/logos/mantra.png';
import storyLogo from '@/assets/logos/story-protocol.png';
import peaqLogo from '@/assets/logos/peaq.png';

// Before vs After Korea comparison data
const growthData = [{
  week: 'W1',
  global: 100,
  korea: 100,
  volume: 15
}, {
  week: 'W2',
  global: 103,
  korea: 102,
  volume: 18
}, {
  week: 'W3',
  global: 101,
  korea: 98,
  volume: 12
}, {
  week: 'W4',
  global: 106,
  korea: 105,
  volume: 22
}, {
  week: 'W5',
  global: 108,
  korea: 115,
  volume: 35,
  isEntry: true
}, {
  week: 'W6',
  global: 110,
  korea: 185,
  volume: 85
}, {
  week: 'W7',
  global: 112,
  korea: 280,
  volume: 145
}, {
  week: 'W8',
  global: 115,
  korea: 420,
  volume: 220
}, {
  week: 'W9',
  global: 118,
  korea: 550,
  volume: 280
}];
const metrics = [{
  icon: TrendingUp,
  value: 450,
  suffix: '%',
  label: 'Avg. Growth',
  sublabel: '평균 성장률',
  color: 'text-orange-400',
  glowColor: 'shadow-orange-500/30'
}, {
  icon: Users,
  value: 85,
  suffix: 'K+',
  label: 'Community',
  sublabel: '커뮤니티 성장',
  color: 'text-purple-400',
  glowColor: 'shadow-purple-500/30'
}, {
  icon: Zap,
  value: 12,
  suffix: 'x',
  label: 'Volume Spike',
  sublabel: '거래량 급등',
  color: 'text-cyan-400',
  glowColor: 'shadow-cyan-500/30'
}];
const featuredCases = [{
  number: '01',
  title: 'The Liquidity Unlock',
  project: 'MANTRA (OM)',
  logo: mantraLogo,
  result: {
    value: '+450%',
    label: 'Volume Increase'
  },
  description: 'Unlocked $2M+ daily trading volume through strategic KRW exchange partnerships.',
  color: 'orange',
  glowClass: 'hover:shadow-[0_0_60px_-15px_rgba(251,146,60,0.4)] hover:border-orange-500/50'
}, {
  number: '02',
  title: 'The Mindshare Takeover',
  project: 'Story Protocol',
  logo: storyLogo,
  result: {
    value: '#1',
    label: 'Kaito Ranking'
  },
  description: 'Achieved #1 Kaito mindshare through coordinated KOL campaign and media blitz.',
  color: 'purple',
  glowClass: 'hover:shadow-[0_0_60px_-15px_rgba(168,85,247,0.4)] hover:border-purple-500/50'
}, {
  number: '03',
  title: 'The Community Surge',
  project: 'peaq',
  logo: peaqLogo,
  result: {
    value: '85K+',
    label: 'Members Added'
  },
  description: 'Built a 85,000+ member community from scratch within 3 months.',
  color: 'cyan',
  glowClass: 'hover:shadow-[0_0_60px_-15px_rgba(34,211,238,0.4)] hover:border-cyan-500/50'
}];

// Metric Card Component
const MetricCard = ({
  data,
  index,
  isVisible
}: {
  data: typeof metrics[0];
  index: number;
  isVisible: boolean;
}) => {
  const count = useCountUp({
    end: data.value,
    duration: 2000,
    suffix: data.suffix,
    isVisible
  });
  const Icon = data.icon;
  return <motion.div initial={{
    opacity: 0,
    x: 20
  }} animate={isVisible ? {
    opacity: 1,
    x: 0
  } : {}} transition={{
    duration: 0.5,
    delay: index * 0.1
  }} className={`
        group relative p-4 
        border border-border/50 rounded-lg
        bg-background/60 backdrop-blur-sm
        transition-all duration-300
        hover:border-primary/30
      `}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg bg-primary/10 ${data.color}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <div className={`text-2xl font-bold font-mono ${data.color}`}>
            {count}
          </div>
          <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
            {data.label}
          </div>
        </div>
      </div>
    </motion.div>;
};

// Case Study Card Component
const CaseCard = ({
  caseItem,
  index,
  isVisible
}: {
  caseItem: typeof featuredCases[0];
  index: number;
  isVisible: boolean;
}) => {
  const colorClasses = {
    orange: {
      text: 'text-orange-400',
      highlight: 'bg-orange-500/20 shadow-[0_0_20px_rgba(251,146,60,0.3)]',
      glow: '[text-shadow:0_0_30px_rgba(251,146,60,0.6)]'
    },
    purple: {
      text: 'text-purple-400',
      highlight: 'bg-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.3)]',
      glow: '[text-shadow:0_0_30px_rgba(168,85,247,0.6)]'
    },
    cyan: {
      text: 'text-cyan-400',
      highlight: 'bg-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.3)]',
      glow: '[text-shadow:0_0_30px_rgba(34,211,238,0.6)]'
    }
  };
  const colors = colorClasses[caseItem.color as keyof typeof colorClasses];
  return <motion.div initial={{
    opacity: 0,
    y: 30
  }} animate={isVisible ? {
    opacity: 1,
    y: 0
  } : {}} transition={{
    duration: 0.6,
    delay: 0.3 + index * 0.15
  }} className={`
        group relative p-6 
        border border-border/50 rounded-xl
        bg-background/80 backdrop-blur-sm
        transition-all duration-500
        ${caseItem.glowClass}
      `}>
      {/* Project Logo & Case Number */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img src={caseItem.logo} alt={caseItem.project} className="h-8 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            {caseItem.project}
          </span>
        </div>
        <div className="px-2 py-1 text-[10px] font-mono border border-border/50 rounded text-muted-foreground">
          CASE {caseItem.number}
        </div>
      </div>

      {/* Title */}
      <h4 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
        {caseItem.title}
      </h4>

      {/* Highlighted Result */}
      <div className="mb-4">
        <span className={`
          inline-block px-3 py-1.5 rounded-md
          text-xl font-bold font-mono
          ${colors.text} ${colors.highlight} ${colors.glow}
        `}>
          {caseItem.result.value}
        </span>
        <span className="ml-2 text-sm text-muted-foreground">
          {caseItem.result.label}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {caseItem.description}
      </p>

      {/* Arrow indicator */}
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight className={`w-4 h-4 ${colors.text}`} />
      </div>
    </motion.div>;
};

// Custom Tooltip
const CustomTooltip = ({
  active,
  payload,
  label
}: any) => {
  if (active && payload && payload.length) {
    const isEntry = payload[0]?.payload?.isEntry;
    return <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-xl">
        <div className="text-xs font-mono text-muted-foreground mb-2">{label}</div>
        {isEntry && <div className="text-xs font-bold text-primary mb-2 border-b border-border pb-2">
            🚀 KOREA ENTRY POINT
          </div>}
        {payload.map((entry: any, index: number) => <div key={index} className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full" style={{
          backgroundColor: entry.color
        }} />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-mono font-semibold">{entry.value}</span>
          </div>)}
      </div>;
  }
  return null;
};
export const PerformanceSection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  const [isLive, setIsLive] = useState(true);

  // Blinking live indicator
  useEffect(() => {
    const interval = setInterval(() => setIsLive(prev => !prev), 1000);
    return () => clearInterval(interval);
  }, []);
  return <section ref={ref} className="relative py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dot Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />
        
        {/* Scanline effect */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)'
      }} />

        {/* Connection lines SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <motion.line x1="50%" y1="45%" x2="20%" y2="75%" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4 4" initial={{
          pathLength: 0,
          opacity: 0
        }} animate={isInView ? {
          pathLength: 1,
          opacity: 1
        } : {}} transition={{
          duration: 2,
          delay: 1
        }} />
          <motion.line x1="50%" y1="45%" x2="50%" y2="75%" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4 4" initial={{
          pathLength: 0,
          opacity: 0
        }} animate={isInView ? {
          pathLength: 1,
          opacity: 1
        } : {}} transition={{
          duration: 2,
          delay: 1.2
        }} />
          <motion.line x1="50%" y1="45%" x2="80%" y2="75%" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4 4" initial={{
          pathLength: 0,
          opacity: 0
        }} animate={isInView ? {
          pathLength: 1,
          opacity: 1
        } : {}} transition={{
          duration: 2,
          delay: 1.4
        }} />
          {/* Node points */}
          <motion.circle cx="50%" cy="45%" r="4" fill="hsl(var(--primary))" initial={{
          scale: 0
        }} animate={isInView ? {
          scale: 1
        } : {}} transition={{
          duration: 0.3,
          delay: 0.8
        }} />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.6
      }} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary font-mono text-sm">03</span>
            <div className="w-12 h-px bg-primary/50" />
            <span className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
              Performance
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Korea Effect
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Real-time performance metrics from our Korea market entries. 
            <span className="text-foreground"> Data doesn't lie.</span>
          </p>
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-12 gap-6 mb-8">
          {/* Main Chart - 8 columns */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="lg:col-span-8 relative">
            <div className="border border-border/50 rounded-xl bg-background/80 backdrop-blur-sm p-6">
              {/* Chart Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Before vs After Korea Entry
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">
                    TOKEN PRICE INDEX + VOLUME
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500' : 'bg-green-500/30'} transition-all`} />
                  <span className="text-xs font-mono text-green-500">LIVE</span>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-6 mb-4 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-muted-foreground" style={{
                  borderStyle: 'dashed'
                }} />
                  <span className="text-muted-foreground">Global Avg. (Without Korea)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-2 bg-primary rounded-sm" />
                  <span className="text-foreground">With Korea Strategy</span>
                </div>
              </div>

              {/* Chart */}
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={growthData}>
                    <defs>
                      <linearGradient id="koreaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} vertical={false} />
                    <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{
                    fill: 'hsl(var(--muted-foreground))',
                    fontSize: 11,
                    fontFamily: 'monospace'
                  }} />
                    <YAxis axisLine={false} tickLine={false} tick={{
                    fill: 'hsl(var(--muted-foreground))',
                    fontSize: 11,
                    fontFamily: 'monospace'
                  }} domain={[0, 600]} />
                    <Tooltip content={<CustomTooltip />} />
                    
                    {/* Korea Entry Reference Line */}
                    <ReferenceLine x="W5" stroke="hsl(var(--primary))" strokeDasharray="4 4" strokeWidth={2} label={{
                    value: '🇰🇷 KOREA ENTRY',
                    position: 'top',
                    fill: 'hsl(var(--primary))',
                    fontSize: 10,
                    fontFamily: 'monospace'
                  }} />
                    
                    {/* Volume Bars */}
                    <Bar dataKey="volume" fill="hsl(var(--primary))" opacity={0.2} radius={[2, 2, 0, 0]} name="Volume" />
                    
                    {/* Global Avg Line (flat) */}
                    <Line type="monotone" dataKey="global" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="6 4" dot={false} name="Global Avg" />
                    
                    {/* Korea Strategy Line (spike) */}
                    <Area type="stepAfter" dataKey="korea" stroke="hsl(var(--primary))" strokeWidth={3} fill="url(#koreaGradient)" name="Korea Strategy" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          {/* Metrics Cards - 4 columns */}
          <div className="lg:col-span-4 space-y-4">
            {metrics.map((metric, index) => <MetricCard key={metric.label} data={metric} index={index} isVisible={isInView} />)}
          </div>
        </div>

        {/* Case Study Cards */}
        <div className="grid md:grid-cols-3 gap-6 relative">
          {featuredCases.map((caseItem, index) => {})}
        </div>
      </div>
    </section>;
};
export default PerformanceSection;