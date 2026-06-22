import { Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";

// Import client logos
import bnbLogo from "@/assets/logos/bnb.png";
import kucoinLogo from "@/assets/logos/kucoin-mono.png";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import bybitLogo from "@/assets/logos/bybit.png";
import spacecoinLogo from "@/assets/logos/spacecoin.png";
import triaLogo from "@/assets/logos/tria-mono.png";
import mantraLogo from "@/assets/logos/mantra-mono.png";
import saharaAiLogo from "@/assets/logos/sahara-ai-mono.png";
import fogoLogo from "@/assets/logos/fogo.png";
import synfuturesLogo from "@/assets/logos/synfutures.png";
import megaethLogo from "@/assets/logos/megaeth-icon.png";
import zkpassLogo from "@/assets/logos/zkpass-icon.jpeg";
import openledgerLogo from "@/assets/logos/openledger-wordmark.png";
import multipliLogo from "@/assets/logos/multipli.png";
import talusLogo from "@/assets/logos/talus.png";

const clientLogos = [{
  name: "BNB",
  logo: bnbLogo,
  noInvert: false,
  slug: "bnb-chain"
}, {
  name: "KuCoin",
  logo: kucoinLogo,
  noInvert: true,
  slug: "kucoin"
}, {
  name: "Polygon",
  logo: polygonLogo,
  noInvert: false,
  slug: "polygon"
}, {
  name: "Ondo Finance",
  logo: ondoLogo,
  noInvert: false,
  slug: "ondo"
}, {
  name: "Bybit",
  logo: bybitLogo,
  noInvert: false,
  slug: "bybit"
}, {
  name: "Spacecoin",
  logo: spacecoinLogo,
  noInvert: true,
  slug: "spacecoin"
}, {
  name: "Tria",
  logo: triaLogo,
  noInvert: true,
  slug: "tria"
}, {
  name: "Mantra",
  logo: mantraLogo,
  noInvert: true,
  slug: "mantra"
}, {
  name: "Sahara AI",
  logo: saharaAiLogo,
  noInvert: true,
  slug: "sahara-ai"
}, {
  name: "FOGO",
  logo: fogoLogo,
  noInvert: true,
  slug: "fogo"
}, {
  name: "SynFutures",
  logo: synfuturesLogo,
  noInvert: true,
  slug: "synfutures"
}, {
  name: "MegaETH",
  logo: megaethLogo,
  noInvert: true,
  slug: "megaeth"
}, {
  name: "zkPass",
  logo: zkpassLogo,
  noInvert: true,
  slug: "zkpass"
}, {
  name: "OpenLedger",
  logo: openledgerLogo,
  noInvert: false,
  slug: "openledger"
}, {
  name: "Multipli",
  logo: multipliLogo,
  noInvert: true,
  slug: "multipli"
}, {
  name: "Talus",
  logo: talusLogo,
  noInvert: true,
  slug: "talus"
}];


const HeroSection = () => {
  const {
    videoRef,
    hasVideoError,
    shouldDisableVideo,
    shouldLoad,
    optimizedSrc,
    videoProps,
    posterProps,
    ShimmerOverlay,
    ErrorOverlay,
    DebugBanner,
  } = useVideoPlayer({
    src: '/videos/hero-background.mp4?v=20260601b',
    poster: '/images/posters/hero-background-poster.jpg',
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
          WebkitAppearance: 'none',
          imageRendering: '-webkit-optimize-contrast',
          filter: 'contrast(1.06) saturate(1.08)',
          transform: 'translateZ(0) scale(1.01)',
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
          <p className="font-display text-[clamp(2.5rem,8.2vw,7.25rem)] font-extrabold leading-[0.94] sm:leading-[0.9] tracking-[-0.035em] sm:tracking-[-0.04em] mb-5 sm:mb-9 mt-8 sm:mt-20 text-white sm:whitespace-nowrap" role="heading" aria-level={2}>
            <span className="block">Your Crypto Ecosystem</span>
            <span className="block">Growth Partner</span>
          </p>

          {/* Subtext */}
          <h2 className="text-[14px] sm:text-xl md:text-2xl text-white/75 max-w-5xl mx-auto mb-8 sm:mb-14 font-normal tracking-[-0.01em] leading-[1.55] px-2 sm:px-0">
Most agencies sell you a list. We embed operators.<br className="hidden sm:block" /><span className="sm:hidden"> </span>Korea-native, Asia-wide.
          </h2>

          {/* CTA */}
          <div className="flex flex-col items-center gap-4">
            <a
              href="/contact"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 sm:px-9 sm:py-4 bg-white text-black font-semibold text-[13px] sm:text-sm rounded-full hover:bg-white/90 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-[0.97]"
            >
              <Send className="w-4 h-4 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform duration-300" />
              <span>Get Your Free Proposal</span>
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
        <div className="flex items-center logo-marquee-slow">
          {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((client, index) => <Link key={index} to={`/projects/${client.slug}`} className="flex items-center gap-1.5 sm:gap-3 mx-1 sm:mx-2 px-3 sm:px-6 py-2 sm:py-3.5 bg-zinc-900/80 rounded-full border border-white/15 hover:border-white/25 hover:bg-zinc-800/80 transition-all duration-300 flex-shrink-0">
              <img
            src={client.logo}
            alt={client.name}
            loading="lazy"
            decoding="async"
            className={`h-3.5 sm:h-7 w-auto max-w-[60px] sm:max-w-[140px] object-contain flex-shrink-0 ${client.noInvert ? 'opacity-90' : 'brightness-0 invert opacity-85'}`} />
              <span className="text-white/75 text-[10px] sm:text-sm font-medium whitespace-nowrap">
                {client.name}
              </span>
            </Link>)}
        </div>
      </div>
    </div>;
};



export default HeroSection;