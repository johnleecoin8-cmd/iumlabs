import { motion } from 'framer-motion';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25, delayChildren: 0.1 }
  }
};

const headlineLineVariants = {
  hidden: { opacity: 0, x: -40, filter: 'blur(8px)' },
  visible: {
    opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const descriptionVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(12px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
  }
};

const accentLineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

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
          className={`w-full h-full object-cover transition-opacity duration-700 ${isVideoReady ? 'opacity-100' : 'opacity-0'}`} />

        <div className="absolute inset-0 bg-black/65" />
        {/* Tech grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh]">
        <motion.div
          className="container mx-auto px-6 sm:px-10 md:px-16 lg:px-20 py-12 sm:py-16 md:py-20 max-w-4xl text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}>

          {/* Headline — each line slides in separately */}
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 tracking-tight leading-[1.1]">
            <motion.span className="block" variants={headlineLineVariants}>
              Seoul Moves Fast.
            </motion.span>
            <motion.span
              className="block text-white"
              variants={headlineLineVariants}>

              We Make You Land.
            </motion.span>
          </h2>

          {/* Description — blur reveal */}
          <motion.p
            className="text-white/60 leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-8 sm:mb-10 tracking-wide"
            variants={descriptionVariants}>
            We're a Seoul-native Web3 agency with a proven track record of launching 18+ global projects into Korea including BNB, Mantra, and Bybit through GTM strategy, influencer marketing, AMA, PR, community building, and offline events. One partner for full market entry.
          </motion.p>

          {/* Bottom accent — lines scale out from center */}
          















        </motion.div>
      </div>
    </section>);

};

export default WhyChooseUsSection;