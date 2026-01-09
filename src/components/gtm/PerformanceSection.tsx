import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  ArrowRight, 
  BarChart3, 
  Users, 
  Search,
  Wallet,
  Target,
  Zap
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis } from 'recharts';

// Logos
import bnbLogo from '@/assets/logos/bnb.png';
import kucoinLogo from '@/assets/logos/kucoin.png';
import polygonLogo from '@/assets/logos/polygon.svg';
import mantraLogo from '@/assets/logos/mantra.png';
import storyLogo from '@/assets/logos/story-protocol.png';
import peaqLogo from '@/assets/logos/peaq.png';
import bybitLogo from '@/assets/logos/bybit.png';
import ondoLogo from '@/assets/logos/ondo.svg';
import saharaLogo from '@/assets/logos/sahara-ai.png';
import megaethLogo from '@/assets/logos/megaeth.png';

// CountUp Hook
const useCountUp = (end: number, duration: number = 2000, startTrigger: boolean = true) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!startTrigger) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startTrigger]);
  
  return count;
};

// Growth Data for Chart
const growthData = [
  { month: 'M1', value: 10 },
  { month: 'M2', value: 25 },
  { month: 'M3', value: 45 },
  { month: 'M4', value: 70 },
  { month: 'M5', value: 110 },
  { month: 'M6', value: 165 },
  { month: 'M7', value: 240 },
  { month: 'M8', value: 350 },
  { month: 'M9', value: 500 },
];

// Featured Cases Data
const featuredCases = [
  {
    number: '01',
    title: 'The Liquidity Unlock',
    project: 'MANTRA (OM)',
    challenge: 'High tech potential, low Asian liquidity.',
    strategy: 'Targeted KRW liquidity mapping & retail onboarding.',
    results: [
      { label: 'Real-Volume Growth', value: '+450%', sublabel: 'Post-Entry' },
      { label: 'Market Depth', value: '#1', sublabel: 'in RWA Sector' },
      { label: 'Liquidity', value: 'Anchored', sublabel: 'in major KRW pairs' }
    ],
    gradient: 'from-orange-500/10 via-transparent to-transparent',
    accentColor: 'text-orange-500',
    borderColor: 'hover:border-orange-500/50'
  },
  {
    number: '02',
    title: 'The Demand Spike',
    project: 'Story Protocol',
    challenge: 'Complex tech narrative needed mass adoption.',
    strategy: 'Narrative localization to trigger retail FOMO.',
    results: [
      { label: 'Search Volume', value: '+3,200%', sublabel: 'Naver/Google KR' },
      { label: 'Mindshare', value: '#1', sublabel: 'Dominant (IP Sector)' },
      { label: 'Impact', value: 'Highest', sublabel: 'Organic search among L1s' }
    ],
    gradient: 'from-purple-500/10 via-transparent to-transparent',
    accentColor: 'text-purple-500',
    borderColor: 'hover:border-purple-500/50'
  },
  {
    number: '03',
    title: 'The User Base',
    project: 'peaq network',
    challenge: 'Need real devices and wallets, not just token holders.',
    strategy: 'DePIN-focused community building & education.',
    results: [
      { label: 'Wallet Acquisition', value: '85,000+', sublabel: 'Active Wallets' },
      { label: 'Community', value: 'Largest', sublabel: 'DePIN in Korea' },
      { label: 'Stickiness', value: '65%', sublabel: 'Retention after 3mo' }
    ],
    gradient: 'from-blue-500/10 via-transparent to-transparent',
    accentColor: 'text-blue-500',
    borderColor: 'hover:border-blue-500/50'
  }
];

// Ecosystem Logos
const ecosystemLogos = [
  { name: 'BNB Chain', logo: bnbLogo },
  { name: 'KuCoin', logo: kucoinLogo },
  { name: 'Polygon', logo: polygonLogo },
  { name: 'MANTRA', logo: mantraLogo },
  { name: 'Story Protocol', logo: storyLogo },
  { name: 'peaq', logo: peaqLogo },
  { name: 'Bybit', logo: bybitLogo },
  { name: 'Ondo', logo: ondoLogo },
  { name: 'Sahara AI', logo: saharaLogo },
  { name: 'MegaETH', logo: megaethLogo },
];

const PerformanceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [chartAnimated, setChartAnimated] = useState(false);
  const [hoveredCase, setHoveredCase] = useState<number | null>(null);
  
  // Metrics with countup
  const volumeCount = useCountUp(1.5, 2500, isInView);
  const multipleCount = useCountUp(5.2, 2000, isInView);
  const retentionCount = useCountUp(92, 2000, isInView);
  
  useEffect(() => {
    if (isInView) {
      setTimeout(() => setChartAnimated(true), 500);
    }
  }, [isInView]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 lg:px-20 bg-background overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        
        {/* Subtle glow */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full opacity-10 blur-[150px]" 
          style={{ background: 'hsl(var(--primary))' }} 
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ========== HEADER ========== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-mono text-primary tracking-widest">03</span>
            <div className="w-12 h-px bg-primary/50" />
            <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase">Performance</span>
          </div>
          
          <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.1] text-foreground mb-4">
            Quantifiable Impact
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            <span className="text-foreground">"We don't just create buzz.</span> We engineer volume."
          </p>
        </motion.div>

        {/* ========== PART A: Growth Curve + Metrics ========== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-24"
        >
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 items-center">
            {/* Chart */}
            <div className="relative h-[300px] md:h-[350px] border border-border/50 bg-background/50 backdrop-blur-sm p-6 rounded-sm overflow-hidden">
              {/* Chart Title */}
              <div className="absolute top-4 left-6 flex items-center gap-2 z-10">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-xs font-mono text-muted-foreground tracking-wide">THE GROWTH CURVE</span>
              </div>
              
              {/* Animated Line */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={chartAnimated ? { opacity: 1 } : {}}
                transition={{ duration: 1 }}
                className="h-full pt-8"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                    />
                    <YAxis hide />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      fill="url(#growthGradient)"
                      dot={false}
                      isAnimationActive={chartAnimated}
                      animationDuration={2000}
                      animationEasing="ease-out"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>
              
              {/* Growth indicator */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.5 }}
                className="absolute bottom-6 right-6 flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full"
              >
                <TrendingUp className="w-3 h-3 text-primary" />
                <span className="text-xs font-mono text-primary">+450% avg.</span>
              </motion.div>
            </div>
            
            {/* Metric Summary */}
            <div className="space-y-4">
              {/* Volume */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="p-6 border border-border bg-background hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Total Volume Facilitated</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl md:text-5xl font-light text-foreground">${volumeCount}</span>
                  <span className="text-2xl md:text-3xl font-light text-foreground">.{(volumeCount * 10 % 10)}B</span>
                  <span className="text-xl text-primary ml-1">+</span>
                </div>
              </motion.div>
              
              {/* Multiple */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="p-6 border border-border bg-background hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Avg. Volume Multiple</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-light text-foreground">{multipleCount > 0 ? Math.floor(multipleCount) : 0}.{multipleCount > 0 ? Math.floor((multipleCount % 1) * 10) : 0}x</span>
                  <span className="text-sm text-muted-foreground">(Global vs Korea)</span>
                </div>
              </motion.div>
              
              {/* Retention */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="p-6 border border-border bg-background hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Client Retention Rate</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl md:text-5xl font-light text-foreground">{retentionCount}</span>
                  <span className="text-2xl text-primary">%</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ========== PART B: Featured Wins ========== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-10">
            <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase">Featured Wins</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {featuredCases.map((caseItem, i) => (
              <motion.div
                key={caseItem.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.15 }}
                onMouseEnter={() => setHoveredCase(i)}
                onMouseLeave={() => setHoveredCase(null)}
                className={`group relative p-6 border border-border bg-background transition-all duration-500 cursor-pointer overflow-hidden ${caseItem.borderColor} ${hoveredCase === i ? 'border-primary/50 scale-[1.02]' : ''}`}
              >
                {/* Gradient overlay on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${caseItem.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                
                <div className="relative z-10">
                  {/* Case Number */}
                  <div className={`inline-block px-3 py-1 text-xs font-mono mb-4 border ${hoveredCase === i ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground'} transition-all duration-300`}>
                    CASE {caseItem.number}
                  </div>
                  
                  {/* Title & Project */}
                  <h3 className="text-xl font-medium text-foreground mb-1">
                    {caseItem.title}
                  </h3>
                  <p className={`text-sm font-medium mb-4 ${caseItem.accentColor}`}>
                    {caseItem.project}
                  </p>
                  
                  {/* Challenge & Strategy */}
                  <div className="space-y-3 mb-6 text-sm">
                    <div>
                      <span className="text-muted-foreground">Challenge: </span>
                      <span className="text-foreground/80">{caseItem.challenge}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Strategy: </span>
                      <span className="text-foreground/80">{caseItem.strategy}</span>
                    </div>
                  </div>
                  
                  {/* Divider */}
                  <div className={`h-px w-full mb-4 transition-colors duration-300 ${hoveredCase === i ? 'bg-primary/30' : 'bg-border'}`} />
                  
                  {/* Results */}
                  <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wide">The Result</p>
                  <div className="space-y-2">
                    {caseItem.results.map((result, ri) => (
                      <div key={ri} className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{result.label}</span>
                        <div className="text-right">
                          <span className={`text-sm font-medium ${hoveredCase === i ? caseItem.accentColor : 'text-foreground'} transition-colors duration-300`}>
                            {result.value}
                          </span>
                          <span className="text-xs text-muted-foreground ml-1.5">{result.sublabel}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ========== PART C: Ecosystem Logos ========== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-24"
        >
          <div className="text-center mb-10">
            <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-2">The Ecosystem</p>
            <h3 className="text-xl text-foreground">Trusted by Industry Leaders</h3>
          </div>
          
          <div className="grid grid-cols-5 md:grid-cols-10 gap-6 md:gap-8 items-center justify-items-center">
            {ecosystemLogos.map((logo, i) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.05 }}
                className="group relative"
              >
                <img 
                  src={logo.logo} 
                  alt={logo.name}
                  className="h-8 md:h-10 w-auto object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
                {/* Tooltip */}
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {logo.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ========== PART D: CTA ========== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative p-12 md:p-16 border border-border bg-gradient-to-br from-primary/5 via-background to-background overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute top-0 left-0 w-1/2 h-full opacity-10 blur-[100px]" 
            style={{ background: 'hsl(var(--primary))' }} 
          />
          
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-tight text-foreground mb-4">
              Ready to calculate your
              <br />
              <span className="text-primary">Korea Strategy?</span>
            </h3>
            
            <p className="text-muted-foreground text-lg mb-8">
              Don't guess. Launch with data.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/research" 
                className="group inline-flex items-center gap-3 px-6 py-3 border border-border text-foreground font-medium text-sm tracking-wide hover:border-primary hover:bg-primary/5 transition-all duration-300"
              >
                <Search className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                Get the Market Report
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                to="/contact" 
                className="group inline-flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground font-medium text-sm tracking-wide hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
              >
                <Users className="w-4 h-4" />
                Schedule Strategy Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default PerformanceSection;
