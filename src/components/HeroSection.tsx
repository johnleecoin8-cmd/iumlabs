import { Send } from "lucide-react";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { useCountUp } from "@/hooks/useCountUp";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";
import { useBrandStatsByIds } from "@/hooks/useBrandStats";

const HeroCanvas = lazy(() => import("@/components/HeroCanvas"));

// Import client logos
import bnbLogo from "@/assets/logos/bnb.png";
import kucoinLogo from "@/assets/logos/kucoin-mono.png";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import bybitLogo from "@/assets/logos/bybit.png";
import peaqLogo from "@/assets/logos/peaq.png";
import spacecoinLogo from "@/assets/logos/spacecoin.png";
import triaLogo from "@/assets/logos/tria-mono.png";
import mantraLogo from "@/assets/logos/mantra-mono.png";
import saharaAiLogo from "@/assets/logos/sahara-ai-mono.png";
import fogoLogo from "@/assets/logos/fogo.png";
import synfuturesLogo from "@/assets/logos/synfutures.png";
import aptosLogo from "@/assets/logos/aptos.png";
import kiteLogo from "@/assets/logos/kite.png";

const clientLogos = [
  { name: "BNB", logo: bnbLogo, noInvert: false },
  { name: "KuCoin", logo: kucoinLogo, noInvert: true },
  { name: "Polygon", logo: polygonLogo, noInvert: false },
  { name: "Ondo Finance", logo: ondoLogo, noInvert: false },
  { name: "Bybit", logo: bybitLogo, noInvert: false },
  { name: "Peaq", logo: peaqLogo, noInvert: true },
  { name: "Spacecoin", logo: spacecoinLogo, noInvert: true },
  { name: "Tria", logo: triaLogo, noInvert: true },
  { name: "Mantra", logo: mantraLogo, noInvert: true },
  { name: "Sahara AI", logo: saharaAiLogo, noInvert: true },
  { name: "FOGO", logo: fogoLogo, noInvert: true },
  { name: "SynFutures", logo: synfuturesLogo, noInvert: true },
  { name: "Aptos", logo: aptosLogo, noInvert: false },
  { name: "Kite", logo: kiteLogo, noInvert: true },
];

const defaultStats = [
  { id: "client_valuation", value: 7, label: "Client Valuation", prefix: "$", suffix: "B+" },
  { id: "kol_network", value: 230, label: "KOL Network", prefix: "", suffix: "+" },
  { id: "projects_launched", value: 19, label: "Projects Launched", prefix: "", suffix: "+" },
  { id: "events_hosted", value: 55, label: "Events Hosted", prefix: "", suffix: "+" },
];

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const {
    videoRef,
    isVideoReady,
    hasVideoError,
    shouldDisableVideo,
    videoProps,
    posterProps,
    ShimmerOverlay,
  } = useVideoPlayer({
    src: "/videos/hero-background.mp4",
    poster: "/images/hero-poster.jpg",
    autoPlay: true,
    preload: "auto",
  });

  const { statsMap } = useBrandStatsByIds([
    "client_valuation", "kol_network", "projects_launched", "events_hosted",
  ]);

  const stats = useMemo(() => {
    return defaultStats.map((d) => {
      const dyn = statsMap[d.id];
      return dyn
        ? { ...d, value: dyn.value, prefix: dyn.prefix || d.prefix, suffix: dyn.suffix || d.suffix }
        : d;
    });
  }, [statsMap]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-full min-h-[100vh] sm:min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <img {...posterProps} fetchPriority="high" decoding="async" />
        <ShimmerOverlay />
        {!shouldDisableVideo && !hasVideoError && (
          <video
            ref={videoRef}
            {...videoProps}
            className="absolute inset-0 w-full h-full object-cover z-10"
            style={{ ...videoProps.style, WebkitAppearance: "none" }}
          >
            <source src="/videos/hero-background.mp4#t=0.001" type="video/mp4" />
          </video>
        )}
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/60 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black z-[1]" />

      {/* 3D Particle Network */}
      <Suspense fallback={null}>
        <HeroCanvas />
      </Suspense>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-[1.75rem] sm:text-[3.2rem] md:text-[clamp(3.5rem,6.5vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.03em] mb-4 sm:mb-6 mt-20 sm:mt-0">
            <span className="text-white">
              Your Web3 Ecosystem
              <br />
              Partner for{" "}
              <span className="bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
                Korea
              </span>
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/40 max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Hyper-local growth through Korea's top-tier KOL network, community infrastructure, and deep market research.
          </p>

          {/* CTA — pill button, story style */}
          <a
            href="/contact#contact-form"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 sm:px-9 sm:py-4 bg-white text-black text-sm sm:text-base font-semibold rounded-full hover:bg-white/90 transition-all duration-200 active:scale-[0.98]"
          >
            <Send className="w-4 h-4" />
            Get Your Free Proposal
          </a>

          <p className="mt-4 text-xs text-white/30">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Free 30-min consultation · Response within 24h
            </span>
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="relative z-10 py-6 sm:py-8">
        <div className="w-full px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                value={stat.value}
                label={stat.label}
                prefix={stat.prefix}
                suffix={stat.suffix}
                isVisible={isVisible}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Client Logo Marquee */}
      <div className="relative z-10 py-4 overflow-hidden border-t border-white/[0.06]">
        <div className="flex items-center logo-marquee-slow">
          {[...clientLogos, ...clientLogos].map((client, index) => (
            <div
              key={index}
              className="flex items-center gap-2 mx-3 px-4 py-2 flex-shrink-0"
            >
              <img
                src={client.logo}
                alt={client.name}
                loading="lazy"
                decoding="async"
                className={`h-5 sm:h-6 w-auto max-w-[100px] object-contain flex-shrink-0 ${
                  client.noInvert ? "opacity-70" : "brightness-0 invert opacity-60"
                }`}
              />
              <span className="text-white/40 text-xs font-medium whitespace-nowrap">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatItem = ({
  value,
  label,
  prefix = "",
  suffix = "",
  isVisible,
  delay,
}: {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  isVisible: boolean;
  delay: number;
}) => {
  const count = useCountUp({
    end: Math.round(value),
    isVisible,
    delay,
    duration: 2000,
    decimals: 0,
  });

  return (
    <div className="text-center">
      <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-none mb-1">
        {prefix}
        {count}
        {suffix}
      </div>
      <div className="text-[11px] sm:text-sm text-white/35 font-medium">{label}</div>
    </div>
  );
};

export default HeroSection;
