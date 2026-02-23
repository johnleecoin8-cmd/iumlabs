import { motion } from 'framer-motion';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';

const WhyChooseUsSection = () => {
  const { videoRef, isVideoReady, optimizedSrc, videoProps } = useVideoPlayer({
    src: '/videos/gyeongbokgung-about.mp4',
    forceFirstFrame: true,
  });

  return (
    <section className="relative overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[560px] sm:min-h-[640px] md:min-h-[720px] lg:min-h-[75vh]">
        
        {/* Left: Text Content - 35% */}
        <div className="relative z-10 flex items-center px-6 sm:px-10 md:px-14 lg:px-16 py-16 sm:py-20 md:py-24 bg-[#0A0A0A] w-full lg:w-[35%]">
          <motion.div
            className="max-w-lg"
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
                Seoul, Korea
              </span>
            </motion.div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-light text-foreground/90 mb-8 sm:mb-10 tracking-tight leading-[1.2]">
              From the heart of Seoul,{' '}
              <span className="font-serif italic text-foreground/60">
                we bridge your way
              </span>{' '}
              into Korea.
            </h2>

            {/* Bottom accent */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-gradient-to-r from-primary/50 to-transparent" />
              <p className="text-muted-foreground/40 text-[10px] sm:text-xs font-light tracking-[0.15em]">
                Research · Strategy · Execution
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right: Video */}
        <div className="relative overflow-hidden w-full lg:w-[65%]">
          <video
            ref={videoRef}
            src={optimizedSrc}
            {...videoProps}
            className={`w-full h-full object-cover transition-opacity duration-700 ${isVideoReady ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
