import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MessageSquare, Shield, Waves, ArrowRight } from 'lucide-react';

const pillars = [
  {
    icon: MessageSquare,
    title: 'Narrative Localization',
    subtitle: '내러티브 현지화',
    description: 'Tuning the story for maximal FOMO.',
    details: 'We don\'t translate—we transform. Your narrative is reconstructed from the ground up to resonate with Korean trading psychology.',
    color: 'purple',
    glowClass: 'hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.4)]',
    borderClass: 'hover:border-purple-500/50',
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-400',
  },
  {
    icon: Shield,
    title: 'Regulatory Navigation',
    subtitle: '규제 네비게이션',
    description: 'Flawless VASP & DAXA compliance.',
    details: 'Our team includes former regulators and compliance officers. We turn regulatory hurdles into competitive advantages.',
    color: 'cyan',
    glowClass: 'hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.4)]',
    borderClass: 'hover:border-cyan-500/50',
    iconBg: 'bg-cyan-500/10',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Waves,
    title: 'Liquidity Mapping',
    subtitle: '유동성 매핑',
    description: 'Connecting to the deepest KRW pools.',
    details: 'Direct relationships with Korea\'s top 5 exchanges. We know where the volume lives and how to unlock it.',
    color: 'blue',
    glowClass: 'hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.4)]',
    borderClass: 'hover:border-blue-500/50',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
  },
];

const MethodSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-black to-background" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-cyan-400/50" />
            <span className="font-mono text-sm text-cyan-400 tracking-wider">02</span>
            <span className="font-mono text-xs text-muted-foreground tracking-widest">ENGINEERED EXECUTION</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-cyan-400/50" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">The Strategic Bridge</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-cyan-400 font-light italic mb-8">
            "Turning Barriers into Moats"
          </p>

          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-lg text-muted-foreground">
              <span className="text-foreground font-semibold">Data Without Strategy is Noise.</span>
              {' '}We translate intelligence into dominance.
            </p>
            <p className="text-base text-muted-foreground/70">
              Ium Labs acts as your purpose-built bridge, turning cultural friction into your competitive moat.
            </p>
            <p className="text-sm text-muted-foreground/50">
              데이터도 전략 없이는 소음입니다. 우리는 인텔리전스를 지배력으로 전환합니다.
            </p>
          </div>
        </motion.div>

        {/* Three Pillars */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                className={`
                  group relative p-8 border border-border/30 bg-background/50 backdrop-blur-sm
                  transition-all duration-500 ${pillar.glowClass} ${pillar.borderClass}
                `}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
              >
                {/* Icon */}
                <div className={`w-14 h-14 ${pillar.iconBg} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className={`w-7 h-7 ${pillar.iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {pillar.title}
                </h3>
                <p className="text-sm text-muted-foreground/60 mb-4 font-light">
                  {pillar.subtitle}
                </p>

                {/* Description */}
                <p className={`text-lg font-semibold ${pillar.iconColor} mb-4`}>
                  {pillar.description}
                </p>

                {/* Details */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pillar.details}
                </p>

                {/* Bottom accent line */}
                <motion.div
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-${pillar.color}-500 to-transparent`}
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                />

                {/* Hover arrow */}
                <motion.div
                  className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <ArrowRight className={`w-5 h-5 ${pillar.iconColor}`} />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Connection lines between pillars (desktop only) */}
        <div className="hidden md:block relative h-8 mt-8">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <motion.path
              d="M 16.66% 0 L 16.66% 50% L 50% 50% L 83.33% 50% L 83.33% 0"
              stroke="url(#pillarGradient)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.5, delay: 1 }}
            />
            <defs>
              <linearGradient id="pillarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(168,85,247,0.5)" />
                <stop offset="50%" stopColor="rgba(34,211,238,0.5)" />
                <stop offset="100%" stopColor="rgba(59,130,246,0.5)" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center node */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.3, delay: 1.5 }}
          />
        </div>
      </div>
    </section>
  );
};

export default MethodSection;
