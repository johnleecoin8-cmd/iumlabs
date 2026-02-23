import { motion } from 'framer-motion';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';

const WhyChooseUsSection = () => {
  const { videoRef, isVideoReady, optimizedSrc, videoProps } = useVideoPlayer({
    src: '/videos/gyeongbokgung-about.mp4',
    forceFirstFrame: true,
  });

  return (
    <section className="relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src={optimizedSrc}
          {...videoProps}
          className={`w-full h-full object-cover transition-opacity duration-700 ${isVideoReady ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-black/25" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-[520px] sm:min-h-[580px] md:min-h-[660px] lg:min-h-[740px] flex items-center">
        <motion.div
          className="container mx-auto px-4 sm:px-8 md:px-10 py-16 sm:py-20 md:py-24 max-w-3xl mr-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Top label */}
          <motion.div
            className="flex items-center gap-4 mb-8 sm:mb-10"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-10 h-[1px] bg-primary/40" />
            <span className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-primary/50 font-light">
              Est. Seoul, Korea
            </span>
          </motion.div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 sm:mb-5 tracking-tight leading-[1.05]">
            <span className="block font-serif italic font-normal text-foreground/80 text-[0.85em] mb-1">
              Data-Driven
            </span>
            <span className="block bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent">
              Market Entry.
            </span>
          </h2>

          {/* Sub-tagline */}
          <motion.div
            className="flex items-center gap-3 text-muted-foreground/50 text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-8 sm:mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <span>Research</span>
            <span className="text-primary/20">—</span>
            <span>Strategy</span>
            <span className="text-primary/20">—</span>
            <span>Execution</span>
          </motion.div>

          {/* Description */}
          <p className="text-muted-foreground/60 leading-[1.8] text-sm sm:text-base md:text-lg max-w-xl mb-10 sm:mb-12 tracking-wide">
            In Korean, <span className="text-foreground/70 font-medium italic">'ium' (이음)</span> means 'connection.' But to us, it means <span className="text-primary/70 font-medium">integration</span>. 
            We engineer your entry into the Korean market using proprietary research and 
            quantitative impact analysis. We structure your narrative to flawlessly <span className="text-foreground/70 font-medium italic">'ium'</span> (connect) 
            global protocols with local liquidity.
          </p>

          {/* Bottom accent */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-gradient-to-r from-primary/50 to-transparent" />
            <p className="text-muted-foreground/40 text-[10px] sm:text-xs font-light tracking-[0.15em]">
              Founded by veterans from <span className="text-primary/60">Binance</span> & <span className="text-primary/60">KuCoin</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
