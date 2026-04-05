import { Send } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCountUp } from "@/hooks/useCountUp";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";
import { brand } from "@/config/content";
import { useBrandStatsByIds } from "@/hooks/useBrandStats";
import FloatingTags from "@/components/FloatingTags";

// Import client logos
import bnbLogo from "@/assets/logos/bnb.png";
import kucoinLogo from "@/assets/logos/kucoin-mono.png";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import bybitLogo from "@/assets/logos/bybit.png";
import peaqLogo from "@/assets/logos/peaq.png";
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
  name: "Peaq",
  logo: peaqLogo,
  noInvert: true,
  slug: "peaq"
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
// Default stats as fallback
const defaultStats = [{
  id: "client_valuation",
  value: 7,
  label: "Client Valuation",
  prefix: "$",
  suffix: "B+"
}, {
  id: "kol_network",
  value: 230,
  label: "KOL Network",
  prefix: "",
  suffix: "+"
}, {
  id: "projects_launched",
  value: 22,
  label: "Korea Entries",
  prefix: "",
  suffix: "+"
}, {
  id: "events_hosted",
  value: 70,
  label: "Events Hosted",
  prefix: "",
  suffix: "+"
}];
const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  // Use unified video player hook
  const {
    videoRef,
    isVideoReady,
    hasVideoError,
    shouldDisableVideo,
    videoProps,
    posterProps,
    quality,
    networkInfo,
    ShimmerOverlay
  } = useVideoPlayer({
    src: '/videos/hero-background.mp4',
    poster: '/images/hero-poster.jpg',
    autoPlay: true,
    preload: 'auto'
  });

  // Fetch dynamic brand stats
  const { statsMap, isLoading: isLoadingStats } = useBrandStatsByIds([
  "client_valuation", "kol_network", "projects_launched", "events_hosted"]
  );

  // Merge dynamic stats with fallback defaults
  const stats = useMemo(() => {
    return defaultStats.map((defaultStat) => {
      const dynamicStat = statsMap[defaultStat.id];
      if (dynamicStat) {
        return {
          ...defaultStat,
          value: dynamicStat.value,
          prefix: dynamicStat.prefix || defaultStat.prefix,
          suffix: dynamicStat.suffix || defaultStat.suffix
        };
      }
      return defaultStat;
    });
  }, [statsMap]);

  useEffect(() => {
    // Trigger count-up animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const floatingTags = [
    { label: "GTM Strategy", top: "18%", left: "4%" },
    { label: "PR", top: "12%", left: "42%", mobileTop: "10%", mobileLeft: "60%" },
    { label: "KOL Marketing", top: "22%", right: "6%", mobileTop: "15%", mobileRight: "4%" },
    { label: "Community", top: "48%", left: "2%", mobileTop: "45%", mobileLeft: "2%" },
    { label: "Offline Events", top: "44%", right: "3%", mobileTop: "42%", mobileRight: "2%" },
    { label: "Deep Research", bottom: "32%", left: "8%", mobileBottom: "28%", mobileLeft: "4%" },
    { label: "AMA Hosting", bottom: "28%", right: "8%", mobileBottom: "25%", mobileRight: "4%" },
  ];

  return <div className="relative h-full min-h-[100vh] sm:min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Background Layer - Video */}
      <div className="absolute inset-0">
        <img {...posterProps} decoding="async" />
        <ShimmerOverlay />
        {!shouldDisableVideo && !hasVideoError &&
      <video
        ref={videoRef}
        {...videoProps}
        className="absolute inset-0 w-full h-full object-cover z-10"
        style={{
          ...videoProps.style,
          WebkitAppearance: 'none'
        }}>
            <source src="/videos/hero-background.mp4#t=0.001" type="video/mp4" />
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
          <h1 className="font-sans text-[2rem] sm:text-[5rem] md:text-[6.875rem] font-bold leading-[0.95] sm:leading-[0.9] tracking-[-0.03em] sm:tracking-[-0.04em] mb-5 sm:mb-8 mt-12 sm:mt-20 text-white sm:whitespace-nowrap">
            <span className="block">Your Web3 Ecosystem</span>
            <span className="block">Growth Partner</span>
          </h1>

          {/* Subtext */}
          <p className="text-[13px] sm:text-lg md:text-[22px] text-white/80 max-w-5xl mx-auto mb-6 sm:mb-12 font-light tracking-wide sm:whitespace-nowrap leading-relaxed px-2 sm:px-0">
            22+ projects trusted us to land in Korea.<br />Yours is next.
          </p>

          {/* CTA */}
          <div className="flex flex-col items-center gap-3">
            <a
              href="/contact"
              className="group inline-flex items-center gap-3 px-6 py-3.5 sm:px-8 sm:py-4 bg-white text-black font-semibold text-xs sm:text-sm rounded-full hover:bg-white/90 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-[0.97]"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span>Get Your Free Proposal</span>
            </a>
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-sm text-white/40">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Free 30-min call • Reply within 24h
            </span>
          </div>
        </div>
      </div>

      {/* Client Logo Marquee */}
      <div className="relative z-[14] py-4 sm:py-6 overflow-hidden">
        <div className="flex items-center logo-marquee-slow">
          {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((client, index) => <Link key={index} to={`/projects/${client.slug}`} className="flex items-center gap-2 sm:gap-3 mx-1 sm:mx-2 px-4 sm:px-6 py-2.5 sm:py-3.5 bg-zinc-900/80 rounded-full border border-white/15 hover:border-white/25 hover:bg-zinc-800/80 transition-all duration-300 flex-shrink-0">
              <img
            src={client.logo}
            alt={client.name}
            loading="lazy"
            decoding="async"
            className={`h-4 sm:h-7 w-auto max-w-[70px] sm:max-w-[140px] object-contain flex-shrink-0 ${client.noInvert ? 'opacity-90' : 'brightness-0 invert opacity-85'}`} />
              <span className="text-white/75 text-[11px] sm:text-sm font-medium whitespace-nowrap">
                {client.name}
              </span>
            </Link>)}
        </div>
      </div>
    </div>;
};

// Stat Item Component with Count-Up Animation
const StatItem = ({
  value,
  label,
  prefix = "",
  suffix = "",
  isVisible,
  delay







}: {value: number;label: string;prefix?: string;suffix?: string;isVisible: boolean;delay: number;}) => {
  const count = useCountUp({
    end: Math.round(value),
    isVisible,
    delay,
    duration: 2000,
    decimals: 0
  });
  return <div className="text-center cursor-default select-none">
      <div className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-1 sm:mb-2 tracking-tighter leading-none">
        {prefix}{count}{suffix}
      </div>
      <div className="text-[11px] sm:text-base md:text-lg text-white/50 font-medium">
        {label}
      </div>
    </div>;
};
export default HeroSection;