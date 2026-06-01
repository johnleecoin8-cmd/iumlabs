import { Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";

// Import client logos
import bnbLogo from "@/assets/logos/bnb.png";
import kucoinLogo from "@/assets/logos/kucoin-mono.png";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import bybitLogo from "@/assets/logos/bybit.png";
// Story Protocol removed per client visibility restrictions
import spacecoinLogo from "@/assets/logos/spacecoin.png";
import triaLogo from "@/assets/logos/tria-mono.png";
import mantraLogo from "@/assets/logos/mantra-mono.png";
import saharaAiLogo from "@/assets/logos/sahara-ai-mono.png";
import fogoLogo from "@/assets/logos/fogo.png";
import synfuturesLogo from "@/assets/logos/synfutures.png";
import aptosLogo from "@/assets/logos/aptos-round.png";
import kiteLogo from "@/assets/logos/kite.png";

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
  name: "Aptos",
  logo: aptosLogo,
  noInvert: true,
  slug: "aptos"
}, {
  name: "Kite",
  logo: kiteLogo,
  noInvert: true,
  slug: "kite"
}];

const HeroSection = () => {
  const {
    videoRef,
    isVideoReady,
    hasVideoError,
    shouldDisableVideo,
    optimizedSrc,
    videoProps,
    posterProps,
    ShimmerOverlay,
    ErrorOverlay,
  } = useVideoPlayer({
    src: '/videos/hero-background.mp4?v=20260601b',
    poster: '/images/posters/hero-background-poster.jpg',
    autoPlay: true,
    preload: 'auto'
  });

  return <div className="relative h-full min-h-[100vh] sm:min-h-screen flex flex-col justify-between overflow-hidden">
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
            <source src={optimizedSrc} type="video/mp4" />
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
          <h1 className="font-sans text-[clamp(2rem,8vw,6.875rem)] font-semibold leading-[0.95] sm:leading-[0.9] tracking-[-0.03em] sm:tracking-[-0.045em] mb-4 sm:mb-8 mt-8 sm:mt-20 text-white sm:whitespace-nowrap">
            <span className="block">Your Crypto Ecosystem</span>
            <span className="block">Growth Partner</span>
          </h1>

          {/* Subtext */}
          <h2 className="text-[13px] sm:text-lg md:text-xl text-white/50 max-w-5xl mx-auto mb-8 sm:mb-14 font-light tracking-wide leading-[1.7] px-2 sm:px-0">
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
      <div className="relative z-[14] py-3 sm:py-6 overflow-hidden">
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