import { motion } from 'framer-motion';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';

// Import media logos
import coindeskLogo from "@/assets/logos/coindesk.png";
import consensysLogo from "@/assets/logos/consensys.png";
import economistLogo from "@/assets/logos/economist.png";
import cointelegraphLogo from "@/assets/logos/cointelegraph.png";
import bloomingbitLogo from "@/assets/logos/bloomingbit.png";
import coinnessLogo from "@/assets/logos/coinness.png";
import hankyungLogo from "@/assets/logos/hankyung-new.png";

const mediaLogos = [
  { name: "Cointelegraph", logo: cointelegraphLogo },
  { name: "CoinDesk", logo: coindeskLogo },
  { name: "Consensys", logo: consensysLogo },
  { name: "Coinness", logo: coinnessLogo },
  { name: "Bloomingbit", logo: bloomingbitLogo },
  { name: "The Economist", logo: economistLogo },
  { name: "한국경제", logo: hankyungLogo },
];
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
          <h2 className="font-sans text-3xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-bold text-white mb-8 sm:mb-10 tracking-[-0.03em] leading-[1.05] whitespace-nowrap">
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
            className="text-white/80 leading-relaxed text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto mb-8 sm:mb-10 tracking-wide"
            variants={descriptionVariants}>
            Seoul's leading Web3 growth agency since 2022, with a proven track record of launching 22+ global projects into Korea — including BNB, Bybit, and Mantra through <span className="text-white font-semibold">GTM</span>, <span className="text-white font-semibold">KOL</span>, <span className="text-white font-semibold">PR</span>, <span className="text-white font-semibold">community</span>, <span className="text-white font-semibold">events</span>, and full-stack execution. One partner. Full market entry.
          </motion.p>

          {/* Bottom accent — lines scale out from center */}
          















        </motion.div>
        </div>

      {/* Media Spots Marquee */}
      <div className="relative z-10 overflow-hidden">
        <div className="flex items-center justify-center gap-3 pt-4 pb-2">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-white/20" />
          <span className="text-[10px] text-white/40 tracking-[0.3em] uppercase font-light">Media Spots</span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-white/20" />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black/60 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black/60 to-transparent z-10" />
        <div className="flex items-center gap-8 sm:gap-12 md:gap-16 py-3 sm:py-4 logo-marquee-slow">
          {[...mediaLogos, ...mediaLogos].map((media, index) => (
            <div key={`${media.name}-${index}`} className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
              <img src={media.logo} alt={media.name} loading="lazy" decoding="async" className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 object-contain rounded-full opacity-80" />
              <span className="text-white/60 text-xs sm:text-sm md:text-base font-medium whitespace-nowrap">{media.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="relative z-10 border-t border-white/[0.08] py-8 sm:py-12 md:py-14">
        <div className="container mx-auto px-6 sm:px-10 md:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 md:gap-14">
            {[
              { value: "$7B+", label: "Client Valuation" },
              { value: "230+", label: "KOL Network" },
              { value: "22+", label: "Korea Entries" },
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