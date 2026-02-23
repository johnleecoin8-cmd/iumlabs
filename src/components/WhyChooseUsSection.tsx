import { motion } from 'framer-motion';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';

const WhyChooseUsSection = () => {
  const { videoRef, isVideoReady, videoProps } = useVideoPlayer({
    src: '/videos/about-background.mp4?v=3',
    forceFirstFrame: true
  });

  return (
    <section className="relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          {...videoProps}
          className={`w-full h-full object-cover transition-opacity duration-700 ${isVideoReady ? 'opacity-100' : 'opacity-0'}`} />

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
          viewport={{ once: true, margin: "-50px" }}>

          {/* Small label */}
          









          {/* Headline */}
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 tracking-tight leading-[1.1]">
            Data-Driven<br />
            Market Entry.
          </h2>

          {/* Description */}
          <p className="text-white/55 leading-relaxed text-sm sm:text-base md:text-lg max-w-xl mb-8 sm:mb-10 tracking-wide">
            In Korean, 'ium' (이음) means 'connection.' But to us, it means integration. 
            We engineer your entry into the Korean market using proprietary research and 
            quantitative impact analysis. We structure your narrative to flawlessly 'ium' (connect) 
            global protocols with local liquidity.
          </p>

          {/* Bottom accent */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-primary/50" />
            <p className="text-primary/80 text-[10px] sm:text-xs font-medium tracking-wider uppercase">
              Founded by veterans from Binance & KuCoin
            </p>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default WhyChooseUsSection;