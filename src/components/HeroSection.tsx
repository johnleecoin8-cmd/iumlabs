import { Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";
import heroVideoAsset from "@/assets/hero-background-v20260703d.mp4.asset.json";
import { clientLogos } from "@/data/clients";


const HeroSection = () => {
  const {
    videoRef,
    hasVideoError,
    shouldDisableVideo,
    optimizedSrc,
    videoProps,
    posterProps,
    ShimmerOverlay,
    ErrorOverlay,
    DebugBanner,
  } = useVideoPlayer({
    src: `${heroVideoAsset.url}?v=20260703d`,
    poster: '/images/posters/hero-background-poster.jpg?v=20260703d',
    autoPlay: true,
    preload: 'auto',
    lazyLoad: false,
    lazyRootMargin: '100px',
  });

  return <div className="relative h-full min-h-[100vh] sm:min-h-screen flex flex-col justify-between overflow-hidden">
      <DebugBanner />
      {/* Background Layer - Video */}
      <div className="absolute inset-0">
        <img {...posterProps} decoding="async" />
        <ShimmerOverlay />
        <ErrorOverlay />
        {!shouldDisableVideo && !hasVideoError &&
      <video
        ref={videoRef}
        {...videoProps}
        className="absolute inset-0 w-full h-full object-cover z-10"
        style={{
          ...videoProps.style,
          WebkitAppearance: 'none'
        }}>
          </video>
      }
      </div>


      {/* Overlays */}
      <div className="absolute inset-0 bg-black/40 z-[11]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#0A0A0A] z-[12]" />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center relative z-[14] px-4 sm:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Massive Headline */}
          <p className="font-display text-[clamp(2.35rem,7.1vw,6.3rem)] font-extrabold leading-[0.98] sm:leading-[0.94] tracking-[-0.02em] mb-5 sm:mb-9 mt-8 sm:mt-20 text-white sm:whitespace-nowrap" role="heading" aria-level={2}>
            <span className="reveal-line"><span className="text-gradient-hero">Your Crypto Ecosystem</span></span>
            <span className="reveal-line"><span className="text-gradient-hero">Growth Partner</span></span>
          </p>

          {/* Subtext */}
          <h2 className="reveal-fade reveal-d1 font-sans text-[14px] sm:text-xl md:text-2xl text-white/75 max-w-5xl mx-auto mb-8 sm:mb-14 font-normal tracking-[-0.01em] leading-[1.55] px-2 sm:px-0">
Most agencies sell you a list. We embed operators.<br className="hidden sm:block" /><span className="sm:hidden"> </span>Korea-native, Asia-wide.
          </h2>

          {/* CTA */}
          <div className="reveal-fade reveal-d2 flex flex-col items-center gap-4">
            <a
              href="/contact"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 sm:px-9 sm:py-4 bg-white text-black font-semibold text-[13px] sm:text-sm rounded-full [box-shadow:var(--shadow-linear)] hover:bg-white/90 transition-swift hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-[0.97]"
            >
              <Send className="w-4 h-4 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-roll"><span data-text="Get Your Free Proposal">Get Your Free Proposal</span></span>
            </a>
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs text-white/30">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400/80 animate-pulse" />
              Free 30-min call · Reply within 24h
            </span>
          </div>
        </div>
      </div>

      {/* Client Logo Marquee */}
      <div
        className="relative z-[14] py-3 sm:py-6 overflow-hidden px-4 sm:px-8"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0, black 32px, black calc(100% - 32px), transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0, black 32px, black calc(100% - 32px), transparent 100%)',
        }}
      >
        <p className="text-center text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.28em] text-white/40 mb-2.5 sm:mb-4">
          Trusted by 20+ exchanges &amp; projects entering Korea
        </p>
        <div className="flex items-center logo-marquee-slow">
          {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((client, index) => <Link key={index} to={`/projects/${client.slug}`} className="flex items-center gap-1.5 sm:gap-3 mx-1 sm:mx-2 px-3 sm:px-6 py-2 sm:py-3.5 bg-zinc-900/80 rounded-full border border-white/15 hover:border-white/25 hover:bg-zinc-800/80 transition-all duration-300 flex-shrink-0">
              <img
            src={client.logo}
            alt={client.name}
            loading="lazy"
            decoding="async"
            className="h-3.5 sm:h-7 w-auto max-w-[60px] sm:max-w-[140px] object-contain flex-shrink-0 brightness-0 invert opacity-85" />
              <span className="text-white/75 text-[10px] sm:text-sm font-medium whitespace-nowrap">
                {client.name}
              </span>
            </Link>)}
        </div>
      </div>
    </div>;
};



export default HeroSection;