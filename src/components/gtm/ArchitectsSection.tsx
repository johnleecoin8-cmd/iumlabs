import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Building2, Shield, Users, Award, Briefcase, Globe } from 'lucide-react';

const exchangeDNA = [
  {
    icon: Building2,
    title: 'Exchange Veterans',
    description: 'Alumni from Binance, KuCoin, and top Korean financial institutions.',
    badges: ['Binance', 'KuCoin', 'Upbit'],
  },
  {
    icon: Shield,
    title: 'Regulatory Insiders',
    description: 'Former FSC/FSS advisors who shaped Korea\'s VASP framework.',
    badges: ['FSC', 'DAXA', 'VASP'],
  },
  {
    icon: Users,
    title: 'Community Architects',
    description: 'Built and scaled communities for top 50 market cap projects.',
    badges: ['50+ Projects', '1M+ Users'],
  },
];

const trustSignals = [
  { value: '8+', label: 'Years in Korean Crypto', sublabel: '한국 크립토 경력' },
  { value: '50+', label: 'Successful Campaigns', sublabel: '성공한 캠페인' },
  { value: '$1.5B', label: 'Volume Generated', sublabel: '창출한 거래량' },
];

const ArchitectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-black to-background" />
        
        {/* Subtle grid */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
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
            <span className="font-mono text-sm text-cyan-400 tracking-wider">04</span>
            <span className="font-mono text-xs text-muted-foreground tracking-widest">THE ARCHITECTS</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-cyan-400/50" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-foreground">The Insiders</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-cyan-400 font-light italic mb-8">
            "Algorithms execute. We engineer."
          </p>

          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-lg text-muted-foreground">
              Our leadership consists of alumni from <span className="text-foreground font-semibold">Binance, KuCoin, and top Korean financial institutions</span>.
            </p>
            <p className="text-base text-muted-foreground/70">
              We hold the keys to Korea's liquidity grid because we helped build it.
            </p>
            <p className="text-sm text-muted-foreground/50">
              우리 리더십은 바이낸스, 쿠코인 및 한국 최고 금융기관 출신입니다. 우리가 이 시장을 직접 만들었기에, 유동성 그리드의 열쇠를 쥐고 있습니다.
            </p>
          </div>
        </motion.div>

        {/* DNA Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {exchangeDNA.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="group relative p-8 border border-border/30 bg-background/30 backdrop-blur-sm hover:border-cyan-500/30 hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.2)] transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-cyan-500/10 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-cyan-400" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {item.description}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  {item.badges.map((badge) => (
                    <span 
                      key={badge}
                      className="px-3 py-1 bg-background/50 border border-border/50 text-xs font-mono text-muted-foreground"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Trust Signals */}
        <motion.div
          className="grid grid-cols-3 gap-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {trustSignals.map((signal, index) => (
            <div key={signal.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-cyan-400 font-mono mb-2">
                {signal.value}
              </div>
              <div className="text-sm text-foreground font-semibold">{signal.label}</div>
              <div className="text-xs text-muted-foreground/60">{signal.sublabel}</div>
            </div>
          ))}
        </motion.div>

        {/* Quote */}
        <motion.div
          className="mt-20 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
        >
          <blockquote className="relative">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-6xl text-cyan-400/20 font-serif">"</div>
            <p className="text-xl md:text-2xl text-muted-foreground italic leading-relaxed">
              In Korea, relationships aren't built—they're <span className="text-cyan-400">earned</span>. 
              Every listing, every partnership, every community we've built 
              represents years of trust cultivated in this market.
            </p>
            <div className="mt-6 text-sm font-mono text-muted-foreground/50">
              — ium labs Leadership
            </div>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default ArchitectsSection;
