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
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0,0%,4%,0.9)] via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-[480px] sm:min-h-[540px] md:min-h-[600px] lg:min-h-[680px] flex items-center">
        <motion.div
          className="container mx-auto px-4 sm:px-8 md:px-10 py-12 sm:py-16 md:py-20 max-w-3xl mr-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Small label */}
          <motion.span
            className="inline-block text-[10px] sm:text-xs tracking-[0.35em] uppercase text-primary/60 font-mono mb-4 sm:mb-6 border border-primary/20 px-3 py-1 rounded-full backdrop-blur-sm"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            ◆ Seoul, Korea
          </motion.span>

          {/* Headline */}
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 tracking-tight leading-[1.05]">
            <span className="block">Data-Driven</span>
            <span className="block bg-gradient-to-r from-white via-primary/90 to-primary bg-clip-text text-transparent">
              Market Entry.
            </span>
          </h2>

          {/* Sub-tagline */}
          <motion.p
            className="text-white/30 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase mb-6 sm:mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Research · Strategy · Execution
          </motion.p>

          {/* Description */}
          <p className="text-white/55 leading-relaxed text-sm sm:text-base md:text-lg max-w-xl mb-8 sm:mb-10 tracking-wide">
            In Korean, <span className="text-white/80 font-semibold italic">'ium' (이음)</span> means 'connection.' But to us, it means <span className="text-primary/80 font-semibold">integration</span>. 
            We engineer your entry into the Korean market using proprietary research and 
            quantitative impact analysis. We structure your narrative to flawlessly <span className="text-white/80 font-semibold italic">'ium'</span> (connect) 
            global protocols with local liquidity.
          </p>

          {/* Bottom accent */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-[2px] bg-gradient-to-r from-primary/70 to-transparent" />
            <p className="text-white/50 text-[10px] sm:text-xs font-medium tracking-wider uppercase">
              Founded by veterans from <span className="text-primary/80">Binance</span> & <span className="text-primary/80">KuCoin</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
