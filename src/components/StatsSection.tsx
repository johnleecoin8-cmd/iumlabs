import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { AreaChart, Area, ResponsiveContainer, BarChart, Bar } from "recharts";
import { stats as statsContent } from "@/config/content";

const chartDataSets = [
  [{ value: 30 }, { value: 45 }, { value: 60 }, { value: 80 }, { value: 95 }, { value: 120 }, { value: 150 }, { value: 180 }, { value: 200 }],
  [{ value: 50 }, { value: 100 }, { value: 180 }, { value: 250 }, { value: 320 }, { value: 400 }, { value: 450 }, { value: 480 }, { value: 500 }],
  [{ value: 5 }, { value: 12 }, { value: 18 }, { value: 25 }, { value: 32 }, { value: 38 }, { value: 42 }, { value: 47 }, { value: 50 }],
  [{ value: 0.5 }, { value: 1 }, { value: 1.5 }, { value: 2.2 }, { value: 2.8 }, { value: 3.5 }, { value: 4 }, { value: 4.5 }, { value: 5 }],
];

const chartTypes = ["area", "bar", "area", "bar"];
const colors = ["primary", "accent", "gradient-cyan", "gradient-pink"];

const MiniChart = ({ data, type, color, isVisible }: { 
  data: { value: number }[]; 
  type: string; 
  color: string;
  isVisible: boolean;
}) => {
  return (
    <div className={`h-12 w-full mt-4 opacity-0 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : ''}`}>
      <ResponsiveContainer width="100%" height="100%">
        {type === "area" ? (
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={`hsl(var(--${color}))`} stopOpacity={0.6} />
                <stop offset="100%" stopColor={`hsl(var(--${color}))`} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={`hsl(var(--${color}))`}
              strokeWidth={2}
              fill={`url(#gradient-${color})`}
              animationDuration={2000}
              animationBegin={500}
            />
          </AreaChart>
        ) : (
          <BarChart data={data}>
            <defs>
              <linearGradient id={`bar-gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={`hsl(var(--${color}))`} stopOpacity={0.8} />
                <stop offset="100%" stopColor={`hsl(var(--${color}))`} stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <Bar
              dataKey="value"
              fill={`url(#bar-gradient-${color})`}
              radius={[2, 2, 0, 0]}
              animationDuration={2000}
              animationBegin={500}
            />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

const StatCard = ({ stat, index, isVisible, chartData, chartType, color }: { 
  stat: typeof statsContent.items[0]; 
  index: number; 
  isVisible: boolean;
  chartData: { value: number }[];
  chartType: string;
  color: string;
}) => {
  const displayValue = useCountUp({
    end: stat.value,
    duration: 2000,
    delay: index * 150,
    prefix: stat.prefix || '',
    suffix: stat.suffix || '',
    isVisible,
  });

  return (
    <div 
      className={`text-center p-10 md:p-14 rounded-3xl border border-border/30 bg-card/30 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 scroll-animate group ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="text-5xl md:text-7xl font-bold mb-3 text-foreground">
        {displayValue}
      </div>
      <div className="text-base md:text-lg text-muted-foreground mb-2">
        {stat.label}
      </div>
      <MiniChart 
        data={chartData} 
        type={chartType} 
        color={color}
        isVisible={isVisible}
      />
    </div>
  );
};

const StatsSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
        {/* Dot pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, hsl(var(--muted-foreground) / 0.3) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      {/* Bottom border gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Number */}
        <div className={`mb-6 scroll-animate ${isVisible ? 'is-visible' : ''}`}>
          <span className="text-primary font-mono text-sm tracking-wider">01.</span>
        </div>
        
        {/* Section Header */}
        <div className={`text-center mb-16 scroll-animate ${isVisible ? 'is-visible' : ''}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-6">
            <span className="text-sm font-medium text-primary">Our Track Record</span>
          </div>
          <h2 className="text-4xl md:text-6xl tracking-tight">
            <span className="font-serif italic text-muted-foreground">Proven</span>{" "}
            <span className="font-sans font-bold text-foreground">Results</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {statsContent.items.map((stat, index) => (
            <StatCard 
              key={stat.label} 
              stat={stat} 
              index={index} 
              isVisible={isVisible}
              chartData={chartDataSets[index]}
              chartType={chartTypes[index]}
              color={colors[index]}
            />
          ))}
        </div>

        {/* Partners - Marquee */}
        <div className="text-center">
          <p className={`text-muted-foreground text-sm mb-10 scroll-animate ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '400ms' }}>
            {statsContent.partnersLabel}
          </p>
          
          {/* Marquee Container */}
          <div className="marquee">
            <div className="marquee-content">
              {[...statsContent.partners, ...statsContent.partners].map((partner, index) => (
                <div
                  key={`${partner}-${index}`}
                  className="text-2xl font-semibold text-muted-foreground/30 hover:text-foreground transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  {partner}
                </div>
              ))}
            </div>
            <div className="marquee-content" aria-hidden="true">
              {[...statsContent.partners, ...statsContent.partners].map((partner, index) => (
                <div
                  key={`${partner}-dup-${index}`}
                  className="text-2xl font-semibold text-muted-foreground/30 hover:text-foreground transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;