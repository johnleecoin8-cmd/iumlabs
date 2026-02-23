import { motion } from 'framer-motion';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';

const WhyChooseUsSection = () => {
  const { videoRef, isVideoReady, optimizedSrc, videoProps } = useVideoPlayer({
    src: '/videos/gyeongbokgung-about.mp4',
    forceFirstFrame: true,
  });

  return (
    <section className="relative overflow-hidden min-h-[560px] sm:min-h-[640px] md:min-h-[720px] lg:min-h-[80vh]">
      {/* Fullscreen Video Background */}
      <video
        ref={videoRef}
        src={optimizedSrc}
        {...videoProps}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isVideoReady ? 'opacity-100' : 'opacity-0'}`}
      />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Text Content */}
      <div className="relative z-10 flex items-end h-full min-h-[560px] sm:min-h-[640px] md:min-h-[720px] lg:min-h-[80vh] px-6 sm:px-10 md:px-14 lg:px-16 pb-16 sm:pb-20 md:pb-24">
        <motion.div
          className="max-w-2xl"
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
            <div className="w-10 h-[1px] bg-white/40" />
            <span className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-white/50 font-light">
              Est. Seoul, Korea
            </span>
          </motion.div>

          {/* Description */}
          <p className="text-white/80 leading-[1.8] text-sm sm:text-base md:text-lg max-w-xl mb-10 sm:mb-12 tracking-wide">
            In Korean, <span className="text-white font-medium italic">'ium' (이음)</span> means 'connection.' But to us, it means <span className="text-primary font-medium">integration</span>. 
            We engineer your entry into the Korean market using proprietary research and 
            quantitative impact analysis. We structure your narrative to flawlessly <span className="text-white font-medium italic">'ium'</span> (connect) 
            global protocols with local liquidity.
          </p>

          {/* Bottom accent */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-gradient-to-r from-primary/50 to-transparent" />
            <p className="text-white/40 text-[10px] sm:text-xs font-light tracking-[0.15em]">
              Founded by veterans from <span className="text-primary/60">Binance</span> & <span className="text-primary/60">KuCoin</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
