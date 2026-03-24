import { ArrowRight } from "lucide-react";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { useCountUp } from "@/hooks/useCountUp";
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
  const [textVisible, setTextVisible] = useState(false);

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
    const t1 = setTimeout(() => setTextVisible(true), 300);
    const t2 = setTimeout(() => setIsVisible(true), 800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="relative h-screen min-h-[700px] flex flex-col justify-between overflow-hidden bg-black">
      {/* Ambient glow orbs (CSS, instant load) */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-600/[0.06] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-blue-500/[0.04] rounded-full blur-[130px] pointer-events-none" />

      {/* 3D Canvas — the main visual */}
      <Suspense fallback={null}>
        <HeroCanvas />
      </Suspense>

      {/* Content */}
      <div className="flex-1 flex items-center relative z-10 px-6 lg:px-10">
        <div className="max-w-3xl">
          {/* Headline */}
          <h1
            className={`font-display text-[2rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-bold leading-[1.02] tracking-[-0.04em] mb-5 sm:mb-7 transition-all duration-1000 ease-[cubic-bezier(0.33,1,0.68,1)] ${
              textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-white block">
              Web3 Ecosystem
            </span>
            <span className="text-white block">
              Partner for{" "}
              <span
                className="bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent"
                style={{ textShadow: "0 0 60px rgba(64,128,255,0.3)" }}
              >
                Korea
              </span>
            </span>
          </h1>

          {/* Subtext */}
          <p
            className={`text-sm sm:text-base md:text-lg text-white/35 max-w-lg mb-8 sm:mb-10 leading-relaxed transition-all duration-1000 delay-200 ease-[cubic-bezier(0.33,1,0.68,1)] ${
              textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Hyper-local growth through Korea's top-tier KOL network,
            community infrastructure, and deep market research.
          </p>

          {/* CTAs — story.foundation dual button pattern */}
          <div
            className={`flex flex-wrap items-center gap-4 transition-all duration-1000 delay-400 ease-[cubic-bezier(0.33,1,0.68,1)] ${
              textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <a
              href="/contact#contact-form"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition-all duration-200 active:scale-[0.98]"
            >
              Start a Project
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/projects"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-white/15 text-white/70 text-sm font-medium rounded-full hover:border-white/30 hover:text-white transition-all duration-200"
            >
              Explore
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="relative z-10 py-6 sm:py-8 border-t border-white/[0.04]">
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

      {/* Client Logos */}
      <div className="relative z-10 py-4 overflow-hidden border-t border-white/[0.04]">
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
                  client.noInvert ? "opacity-50" : "brightness-0 invert opacity-40"
                }`}
              />
              <span className="text-white/25 text-xs font-medium whitespace-nowrap hidden sm:inline">
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
      <div className="text-[11px] sm:text-sm text-white/25 font-medium">{label}</div>
    </div>
  );
};

export default HeroSection;
