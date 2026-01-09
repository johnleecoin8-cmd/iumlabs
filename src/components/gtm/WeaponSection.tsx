import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Brain, Zap, Activity, Target, TrendingUp, Users, MessageSquare, BarChart3 } from 'lucide-react';

// AI Processing visualization
const AIProcessingVisual = () => {
  const [activeSignal, setActiveSignal] = useState(0);
  
  const signals = [
    { icon: Activity, label: 'Onchain Volume', value: '2.4B KRW', color: 'text-cyan-400' },
    { icon: Users, label: 'Community Sentiment', value: '+87%', color: 'text-green-400' },
    { icon: MessageSquare, label: 'Social Mentions', value: '12.5K', color: 'text-purple-400' },
    { icon: BarChart3, label: 'Exchange Flow', value: '+340%', color: 'text-orange-400' },
    { icon: TrendingUp, label: 'Whale Activity', value: '23 txns', color: 'text-blue-400' },
    { icon: Target, label: 'Entry Vector', value: 'OPTIMAL', color: 'text-emerald-400' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSignal((prev) => (prev + 1) % signals.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [signals.length]);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Terminal frame */}
      <div className="relative border border-cyan-500/30 bg-black/80 backdrop-blur-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-500/20 bg-cyan-500/5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-xs text-cyan-400 tracking-wider">KOREA MARKET DECRYPTION</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-green-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="font-mono text-xs text-green-400">LIVE</span>
          </div>
        </div>

        {/* Main content */}
        <div className="p-6 md:p-8">
          {/* Signal grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {signals.map((signal, i) => {
              const Icon = signal.icon;
              const isActive = i === activeSignal;
              return (
                <motion.div
                  key={i}
                  className={`
                    relative p-4 border transition-all duration-500
                    ${isActive 
                      ? 'border-cyan-400/50 bg-cyan-400/10 shadow-[0_0_20px_rgba(34,211,238,0.2)]' 
                      : 'border-border/30 bg-background/30'
                    }
                  `}
                  animate={isActive ? { scale: [1, 1.02, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-4 h-4 ${isActive ? signal.color : 'text-muted-foreground/50'}`} />
                    <span className="text-xs font-mono text-muted-foreground/70">{signal.label}</span>
                  </div>
                  <div className={`text-xl font-bold font-mono ${isActive ? signal.color : 'text-foreground/70'}`}>
                    {signal.value}
                  </div>
                  
                  {/* Processing indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Output section */}
          <div className="border border-emerald-500/30 bg-emerald-500/5 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-xs text-emerald-400 tracking-wider">OUTPUT: ENTRY VECTOR CALCULATED</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-emerald-400 font-mono">94.7%</div>
                <div className="text-xs text-muted-foreground">Confidence</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-400 font-mono">T+48h</div>
                <div className="text-xs text-muted-foreground">Optimal Entry</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400 font-mono">3.2x</div>
                <div className="text-xs text-muted-foreground">Expected Velocity</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scanline effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent"
          animate={{ y: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </div>
  );
};

const WeaponSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 bg-background overflow-hidden">
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-sm text-cyan-400 tracking-wider">01</span>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/50 to-transparent max-w-[100px]" />
            <span className="font-mono text-xs text-muted-foreground tracking-widest">THE WEAPON</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-foreground">The Intelligence Engine</span>
          </h2>
          <p className="text-xl md:text-2xl text-cyan-400 font-light italic mb-8">
            "The Code Breaker"
          </p>
        </motion.div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
              "We don't guess. We calculate."
            </h3>
            
            <div className="space-y-6 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                Korea is a <span className="text-cyan-400 font-semibold">black box</span> of unique regulations, 
                isolated communities, and distinct trading metas.
              </p>
              
              <p className="text-lg leading-relaxed">
                Our proprietary AI <span className="text-cyan-400 font-semibold">decrypts this black box</span>. 
                We synthesize <span className="text-foreground font-bold">50+ onchain and social signals</span> in 
                real-time to engineer the perfect entry vector.
              </p>

              <p className="text-base text-muted-foreground/70 leading-relaxed">
                한국은 독자적인 규제, 고립된 커뮤니티, 독특한 트레이딩 메타가 있는 블랙박스입니다. 
                우리의 AI가 이 블랙박스를 해독합니다. 50개 이상의 시그널을 분석해 완벽한 진입 벡터를 계산합니다.
              </p>
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-border/50">
              <div>
                <div className="text-3xl font-bold text-cyan-400 font-mono">50+</div>
                <div className="text-sm text-muted-foreground">Data Signals</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-cyan-400 font-mono">24/7</div>
                <div className="text-sm text-muted-foreground">Monitoring</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-cyan-400 font-mono">&lt;1h</div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <AIProcessingVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WeaponSection;
