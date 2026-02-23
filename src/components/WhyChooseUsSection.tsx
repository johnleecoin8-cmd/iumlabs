import { motion } from 'framer-motion';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';

const WhyChooseUsSection = () => {
  const { videoRef, isVideoReady, videoProps } = useVideoPlayer({
    src: '/videos/about-background.mp4',
    forceFirstFrame: true,
  });

  return (
    <section className="bg-background relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          {...videoProps}
          className={`w-full h-full object-cover transition-opacity duration-700 ${isVideoReady ? 'opacity-100' : 'opacity-0'}`}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-[500px] sm:min-h-[560px] md:min-h-[620px] lg:min-h-[700px] flex items-center">
        <motion.div
          className="p-8 sm:p-12 md:p-16 lg:p-20 max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Small label */}
          <motion.span
            className="inline-block text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/50 font-mono mb-4 sm:mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Seoul, Korea
          </motion.span>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 tracking-tight leading-[1.1]">
            Data-Driven<br />
            Market Entry.
          </h2>

          {/* Description */}
          <p className="text-white/60 leading-relaxed text-sm sm:text-base md:text-lg max-w-xl mb-8 sm:mb-10">
            In Korean, 'ium' (이음) means 'connection.' But to us, it means integration. 
            We engineer your entry into the Korean market using proprietary research and 
            quantitative impact analysis. We structure your narrative to flawlessly 'ium' (connect) 
            global protocols with local liquidity.
          </p>

          {/* Bottom accent */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-primary/60" />
            <p className="text-primary text-xs sm:text-sm font-medium tracking-wide">
              Founded by veterans from Binance & KuCoin
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
