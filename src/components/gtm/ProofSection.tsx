import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ComposedChart, Area, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Tooltip } from 'recharts';
import { TrendingUp, Zap, Trophy, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import logos
import mantraLogo from '@/assets/logos/mantra.png';
import storyLogo from '@/assets/logos/story-protocol.png';
import peaqLogo from '@/assets/logos/peaq.png';

// J-Curve data - flat before entry, vertical spike after
const jCurveData = [
  { week: 'W1', value: 100, phase: 'before' },
  { week: 'W2', value: 105, phase: 'before' },
  { week: 'W3', value: 98, phase: 'before' },
  { week: 'W4', value: 102, phase: 'before' },
  { week: 'W5', value: 100, phase: 'entry' },  // Entry point
  { week: 'W6', value: 180, phase: 'after' },
  { week: 'W7', value: 320, phase: 'after' },
  { week: 'W8', value: 480, phase: 'after' },
  { week: 'W9', value: 550, phase: 'after' },
  { week: 'W10', value: 520, phase: 'after' },
];

const keyMetrics = [
  {
    value: '$1.5B+',
    label: 'Volume Facilitated',
    sublabel: '촉진된 거래량',
    icon: TrendingUp,
    color: 'text-emerald-400',
  },
  {
    value: '5.0x',
    label: 'Velocity Multiplier',
    sublabel: '속도 승수',
    icon: Zap,
    color: 'text-cyan-400',
  },
  {
    value: '#1',
    label: 'Sector Dominance',
    sublabel: '섹터 지배력',
    icon: Trophy,
    color: 'text-amber-400',
  },
];

const featuredProjects = [
  { name: 'Story Protocol', logo: storyLogo, slug: 'story' },
  { name: 'MANTRA', logo: mantraLogo, slug: 'mantra' },
  { name: 'peaq', logo: peaqLogo, slug: 'peaq' },
];

const ProofSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 bg-background overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Dot grid */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Scanlines */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-sm text-cyan-400 tracking-wider">03</span>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/50 to-transparent max-w-[100px]" />
            <span className="font-mono text-xs text-muted-foreground tracking-widest">THE ALPHA GENERATED</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-foreground">The Alpha Portfolio</span>
          </h2>
          <p className="text-xl md:text-2xl text-cyan-400 font-light italic">
            "Join the Ranks of Market Leaders."
          </p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* J-Curve Chart - 8 columns */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative border border-cyan-500/20 bg-black/50 backdrop-blur-sm p-6">
              {/* Chart header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="font-mono text-sm text-muted-foreground">REAL GROWTH CHART</div>
                  <div className="px-2 py-0.5 bg-cyan-500/20 border border-cyan-500/30 text-xs font-mono text-cyan-400">
                    J-CURVE
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-emerald-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className="font-mono text-xs text-emerald-400">LIVE DATA</span>
                </div>
              </div>

              {/* Chart */}
              <div className="h-[300px] md:h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={jCurveData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <defs>
                      <linearGradient id="jCurveGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    
                    <XAxis 
                      dataKey="week" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontFamily: 'monospace' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontFamily: 'monospace' }}
                      label={{ 
                        value: 'Volume / Mindshare', 
                        angle: -90, 
                        position: 'insideLeft',
                        style: { fill: 'hsl(var(--muted-foreground))', fontSize: 11 }
                      }}
                    />
                    
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: 0,
                        fontFamily: 'monospace'
                      }}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    
                    {/* Entry point reference line */}
                    <ReferenceLine 
                      x="W5" 
                      stroke="hsl(var(--primary))"
                      strokeDasharray="4 4"
                      strokeWidth={2}
                      label={{ 
                        value: 'KOREA ENTRY', 
                        position: 'top',
                        fill: 'hsl(var(--primary))',
                        fontSize: 11,
                        fontFamily: 'monospace'
                      }}
                    />
                    
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      fill="url(#jCurveGradient)"
                      dot={(props: any) => {
                        const { cx, cy, payload } = props;
                        if (payload.phase === 'entry') {
                          return (
                            <circle 
                              cx={cx} 
                              cy={cy} 
                              r={8} 
                              fill="hsl(var(--primary))"
                              stroke="hsl(var(--background))"
                              strokeWidth={3}
                            />
                          );
                        }
                        return null;
                      }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              {/* Chart legend */}
              <div className="flex items-center justify-center gap-8 mt-4 pt-4 border-t border-border/30">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-0.5 bg-muted-foreground/50" />
                  <span className="text-xs text-muted-foreground font-mono">Before Korea (Flat)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-0.5 bg-primary" />
                  <span className="text-xs text-primary font-mono">After Korea (Vertical Spike)</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Key Metrics - 4 columns */}
          <motion.div
            className="lg:col-span-4 space-y-4"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {keyMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  className="relative p-6 border border-border/30 bg-background/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-[0_0_30px_-10px_rgba(34,211,238,0.3)] transition-all duration-500"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className={`text-3xl md:text-4xl font-bold ${metric.color} font-mono mb-1`}>
                        {metric.value}
                      </div>
                      <div className="text-sm text-foreground font-semibold">{metric.label}</div>
                      <div className="text-xs text-muted-foreground/60">{metric.sublabel}</div>
                    </div>
                    <Icon className={`w-8 h-8 ${metric.color} opacity-50`} />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Featured Projects */}
        <motion.div
          className="mt-12 pt-12 border-t border-border/30"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground font-mono">Sector Dominance:</span>
              <div className="flex items-center gap-4">
                {featuredProjects.map((project) => (
                  <Link
                    key={project.name}
                    to={`/projects/${project.slug}`}
                    className="group flex items-center gap-2 px-3 py-1.5 border border-border/30 bg-background/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                  >
                    <img src={project.logo} alt={project.name} className="h-5 w-auto" />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {project.name}
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
            
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary/50 text-primary font-mono text-sm hover:bg-primary/10 transition-all duration-300"
            >
              VIEW ALL CASE STUDIES
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProofSection;
