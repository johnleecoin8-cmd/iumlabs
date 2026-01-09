import { motion } from 'framer-motion';
import { Zap, Target, Rocket } from 'lucide-react';
import aboutImageDefault from '@/assets/campaigns/about-image-default.jpeg';
import aboutImageHover from '@/assets/campaigns/about-image-hover.jpeg';

const vibeKeywords = [
  { 
    label: "Fresh Perspective", 
    desc: "No old playbooks",
    icon: Zap 
  },
  { 
    label: "Trend Native", 
    desc: "Meme & narrative fluent",
    icon: Target 
  },
  { 
    label: "Agile Move", 
    desc: "Fast & sharp execution",
    icon: Rocket 
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="bg-background">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] lg:grid-cols-[2.5fr_3.5fr] md:max-h-[550px] lg:max-h-[700px] overflow-hidden">
        {/* Left: Featured Image with Hover Effect */}
        <div className="md:border-r border-border overflow-hidden h-[320px] sm:h-[400px] md:h-full relative group active:scale-[0.995] transition-transform">
          <img 
            src={aboutImageDefault} 
            alt="ium Labs Team - Default" 
            className="block w-full h-full object-cover object-center transition-opacity duration-500 group-hover:opacity-0"
          />
          <img 
            src={aboutImageHover} 
            alt="ium Labs Team - Hover" 
            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </div>

        {/* Right: Content - Updated messaging */}
        <div className="flex flex-col justify-center">
          <motion.div 
            className="p-6 sm:p-8 md:p-10 lg:p-14 flex flex-col justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-[hsl(var(--electric-blue)/0.3)] bg-[hsl(var(--electric-blue)/0.05)] w-fit">
              <span className="text-[10px] font-mono tracking-wider text-[hsl(var(--electric-blue))]">
                WHY US
              </span>
            </div>

            {/* Headline - Updated */}
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-5 tracking-tight leading-tight">
              Old tactics don't work{' '}
              <span className="gradient-neon">in a new cycle.</span>
            </h2>
            
            {/* Description - Updated */}
            <p className="text-foreground/50 leading-relaxed text-sm sm:text-base md:text-base lg:text-lg mb-6">
              Web3 trends change weekly. Yesterday's playbook is already outdated. 
              ium Labs speaks the 2025 market language—current community vibes, 
              narratives that resonate <span className="text-foreground/70 font-medium">right now</span>.
            </p>

            {/* Vibe Keywords - NEW */}
            <div className="flex flex-wrap gap-2 mb-6">
              {vibeKeywords.map((keyword, index) => {
                const Icon = keyword.icon;
                return (
                  <div 
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 hover:border-[hsl(var(--neon-lime)/0.4)] transition-all duration-300 group"
                  >
                    <Icon className="w-3.5 h-3.5 text-[hsl(var(--neon-lime))] group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="text-xs font-medium text-white/80 block">{keyword.label}</span>
                      <span className="text-[10px] text-white/40">{keyword.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Founders Note - Updated styling */}
            <p className="text-[hsl(var(--hot-pink))] text-xs sm:text-sm font-medium">
              Young, hungry, and hyper-sensitive to the market pulse.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
