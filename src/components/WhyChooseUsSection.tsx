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
    <section className="relative overflow-hidden">
      {/* Fullscreen Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src={optimizedSrc}
          {...videoProps}
          className={`w-full h-full object-cover transition-opacity duration-700 ${isVideoReady ? 'opacity-100' : 'opacity-0'}`} />

        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content — centered vertically, stats pushed to bottom */}
      <div className="relative z-10 flex flex-col min-h-[90vh]">
        <div className="flex-1 flex items-center">
        <motion.div
          className="container mx-auto px-6 sm:px-10 md:px-16 lg:px-20 py-10 sm:py-14 md:py-16 max-w-4xl text-center"
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
              className="block bg-gradient-to-r from-white via-purple-300 to-purple-400 bg-clip-text text-transparent"
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

      {/* Stats bar — bottom */}
      <div className="relative z-10 border-t border-white/[0.08] py-8 sm:py-12 md:py-14">
        <div className="container mx-auto px-6 sm:px-10 md:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 md:gap-14">
            {[
              { value: "$7B+", label: "Client Valuation" },
              { value: "230+", label: "KOL Network" },
              { value: "19+", label: "Projects Launched" },
              { value: "70+", label: "Events Hosted" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter leading-none mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="text-[11px] sm:text-sm md:text-base text-white/45 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>);

};

export default WhyChooseUsSection;