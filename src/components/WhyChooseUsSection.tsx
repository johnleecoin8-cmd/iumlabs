import { motion } from 'framer-motion';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';
import { STATS } from '@/data/stats';
import { useIsMobile } from '@/hooks/use-mobile';

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

const WhyChooseUsSection = () => {
  const isMobile = useIsMobile();
  const { videoRef, isVideoReady, optimizedSrc, videoProps, posterProps, ShimmerOverlay } = useVideoPlayer({
    src: '/videos/about-background.mp4?v=3',
    poster: '/images/posters/about-background-poster.jpg',
    forceFirstFrame: true,
    // PageIntro preloads videos before reveal — start loading immediately so the
    // about video is ready by the time the user lands on the section, instead of
    // waiting for scroll-into-view.
    lazyLoad: false,
    preload: 'auto',
    loadTimeout: 12000,
  });

  return (
    <section className="relative overflow-hidden">
      {/* Fullscreen Video Background */}
      <div className="absolute inset-0 z-0">
        <img {...posterProps} decoding="async" />
        <ShimmerOverlay />
        <video
          ref={videoRef}
          src={optimizedSrc}
          {...videoProps}
          className={`w-full h-full object-cover transition-opacity duration-700 ${isVideoReady ? 'opacity-100' : 'opacity-0'}`} />

        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content, centered vertically, stats pushed to bottom */}
      <div className="relative z-10 flex flex-col min-h-[100vh]">
        <div className="flex-1 flex items-center">
        <motion.div
          className="container mx-auto px-6 sm:px-10 md:px-16 lg:px-20 py-10 sm:py-14 md:py-16 max-w-4xl text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}>

          {/* Headline, each line slides in separately */}
          <h2 className="font-display text-[clamp(1.75rem,6vw,5.25rem)] font-semibold text-white mb-6 sm:mb-9 tracking-[-0.02em] leading-[0.95] sm:leading-[0.92] sm:whitespace-nowrap">
            <motion.span className="block" variants={headlineLineVariants}>
              Seoul Moves Fast.
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-white via-purple-300 to-purple-400 bg-clip-text text-transparent"
              variants={headlineLineVariants}>

              We Make You Land.
            </motion.span>
          </h2>

          {/* Description, blur reveal */}
          <motion.p
            className="text-white/75 leading-[1.6] text-[14px] sm:text-lg md:text-xl max-w-3xl mx-auto tracking-[-0.01em] px-3 sm:px-0"
            variants={descriptionVariants}>
            Korea is <span className="text-purple-300 font-semibold">retail-driven, trust-first, and brutally fast</span>. We don't localize your deck, we rebuild your <span className="text-purple-300 font-semibold">narrative</span>, activate <span className="text-purple-300 font-semibold">real KOLs</span>, and run <span className="text-purple-300 font-semibold">campaigns that convert</span>. <span className="text-purple-300 font-semibold">25+ projects</span>. Zero recycled playbooks.
          </motion.p>











        </motion.div>
        </div>

      {/* Stats bar */}
      <div className="relative z-10 py-10 sm:py-14 md:py-16">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
            {[
              { value: STATS.clientValuation.display, label: STATS.clientValuation.label },
              { value: STATS.kolNetwork.display, label: STATS.kolNetwork.label },
              { value: STATS.koreaEntries.display, label: STATS.koreaEntries.label },
              { value: STATS.eventsHosted.display, label: STATS.eventsHosted.label },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                {/* vercel.com dark-hero gradient text, applied to stat numbers */}
                <div className="text-gradient-hero font-display text-3xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.02em] leading-none mb-2 sm:mb-3">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm text-white/40 font-medium uppercase tracking-[0.2em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Media Spots Marquee */}
      <div className="relative z-10 overflow-hidden">
        <div className="flex items-center justify-center gap-3 pt-4 pb-2">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-white/20" />
          <span className="text-[10px] text-white/40 tracking-[0.3em] uppercase font-medium">Media Spots</span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-white/20" />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black/60 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black/60 to-transparent z-10" />
        <div className="flex items-center py-3 sm:py-4 logo-marquee-slow">
          {[...mediaLogos, ...mediaLogos, ...mediaLogos, ...mediaLogos].map((media, index) => (
            <div key={`${media.name}-${index}`} className="flex items-center gap-1.5 sm:gap-3 mx-1 sm:mx-2 px-3 sm:px-6 py-2 sm:py-3.5 bg-zinc-900/80 rounded-full border border-white/15 hover:border-white/25 hover:bg-zinc-800/80 transition-all duration-300 flex-shrink-0">
              <img src={media.logo} alt={media.name} loading="lazy" decoding="async" className="h-3.5 sm:h-7 w-auto max-w-[60px] sm:max-w-[140px] object-contain rounded-full opacity-85" />
              <span className="text-white/75 text-[10px] sm:text-sm font-medium whitespace-nowrap">{media.name}</span>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>);

};

export default WhyChooseUsSection;