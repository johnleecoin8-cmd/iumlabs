import { motion } from 'framer-motion';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';

const WhyChooseUsSection = () => {
  const { videoRef, isVideoReady, optimizedSrc, videoProps } = useVideoPlayer({
    src: '/videos/about-background.mp4?v=3',
    forceFirstFrame: true
  });

  return (
    <section className="relative overflow-hidden min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh]">
      {/* Fullscreen Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src={optimizedSrc}
          {...videoProps}
          className={`w-full h-full object-cover transition-opacity duration-700 ${isVideoReady ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh]">
        <motion.div
          className="container mx-auto px-6 sm:px-10 md:px-12 py-12 sm:py-16 md:py-20 max-w-2xl mr-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Headline */}
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 tracking-tight leading-[1.1]">
            Connect to Korea.<br />
            Precisely.
          </h2>

          {/* Description */}
          <p className="text-white/60 leading-relaxed text-sm sm:text-base md:text-lg max-w-xl mb-8 sm:mb-10 tracking-wide">
            <span className="text-purple-400 font-medium">"ium (이음)"</span> means connection—and that's exactly what we build.
            We connect global teams to Korea through research-backed positioning, localized narrative systems, and partner-driven distribution.
            From first signal to sustained growth, we make your Korea entry feel native—and perform.
          </p>

          {/* Bottom accent */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-purple-400/50" />
            <p className="text-purple-400/80 text-[10px] sm:text-xs font-medium tracking-wider uppercase">
              Founded by veterans from Binance & KuCoin
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
