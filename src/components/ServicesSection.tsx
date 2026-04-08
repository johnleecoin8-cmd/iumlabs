import { ArrowRight, Compass, Users, Search, Mic, Mic2, Newspaper, Rocket, Target, FileSearch } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import gtmImage from "@/assets/services/gtm-strategy.webp";
import websiteImage from "@/assets/services/website-creative.webp";
import eventsImage from "@/assets/services/offline-event.webp";
import communityImage from "@/assets/services/community-management.jpg";
import kolImage from "@/assets/services/kol-avatars.webp";
import prImage from "@/assets/services/pr-coindesk.jpg";
import seoAdsImage from "@/assets/services/seo-naver.jpg";
import deepResearchImage from "@/assets/services/deep-research-blog.jpg";
import amaImage from "@/assets/services/ama-spaces.jpg";

const services = [
  {
    number: "01",
    title: "GTM Strategy",
    description: "Full-stack Go-To-Market planning for Korean market entry.",
    link: "/services/gtm",
    icon: Rocket,
    image: gtmImage,
    accent: "#00C8FF",
    details: [
      "Competitive landscape & gap analysis",
      "Korea-fit narrative & positioning",
      "Launch timeline & milestone planning",
      "Exchange listing strategy (Upbit, Bithumb)",
    ],
  },
  {
    number: "02",
    title: "Influencer / KOL Marketing",
    description: "Campaigns powered by top Korean crypto voices.",
    link: "/services/influencer",
    icon: Mic2,
    image: kolImage,
    accent: "#FACC15",
    details: [
      "170+ vetted Korean KOL network",
      "YouTube, Twitter, Telegram, Naver",
      "Campaign management & ROI tracking",
      "Ambassador & long-term partnerships",
    ],
  },
  {
    number: "03",
    title: "Offline Event",
    description: "End-to-end event planning for Web3 experiences in Korea.",
    link: "/services/offline-event",
    icon: Target,
    image: eventsImage,
    accent: "#FB923C",
    details: [
      "Korea Blockchain Week (KBW) side events",
      "Seoul meetups & VIP networking dinners",
      "Venue sourcing & full logistics management",
      "Post-event content & lead capture",
    ],
  },
  {
    number: "04",
    title: "SEO / Paid Ads",
    description: "Search optimization and crypto-native advertising.",
    link: "/services/seo-ads",
    icon: Search,
    image: seoAdsImage,
    accent: "#22C55E",
    details: [
      "Naver SEO & keyword strategy",
      "Google Ads & crypto ad networks",
      "Performance tracking & ROI reporting",
      "A/B testing & conversion optimization",
    ],
  },
  {
    number: "05",
    title: "Community Management",
    description: "24/7 Korean community infrastructure across all platforms.",
    link: "/services/community",
    icon: Users,
    image: communityImage,
    accent: "#38BDF8",
    details: [
      "Telegram, Discord, KakaoTalk setup",
      "Native Korean community managers",
      "AMA hosting & engagement programs",
      "Sentiment monitoring & reporting",
    ],
  },
  {
    number: "06",
    title: "Deep Research",
    description: "Data-driven market intelligence and on-chain analytics.",
    link: "/services/deep-research",
    icon: FileSearch,
    image: deepResearchImage,
    accent: "#F43F5E",
    details: [
      "Korean market ecosystem mapping",
      "On-chain behavior & wallet profiling",
      "Competitor share-of-voice analysis",
      "Investment thesis & due diligence",
    ],
  },
  {
    number: "07",
    title: "Regulations & Compliance",
    description: "Navigate Korea's crypto regulations with confidence.",
    link: "/services/compliance",
    icon: Compass,
    image: "/images/posters/compliance-hero.avif",
    accent: "#A855F7",
    details: [
      "VASP registration & licensing guidance",
      "PIPA & personal data compliance strategy",
      "Korean crypto regulatory landscape analysis",
      "Exchange listing compliance documentation",
    ],
  },
  {
    number: "08",
    title: "PR & Media",
    description: "Narrative development and Korean media placements.",
    link: "/services/pr",
    icon: Newspaper,
    image: prImage,
    accent: "#8B5CF6",
    details: [
      "CoinDesk Korea, Block Media, TokenPost",
      "Korean press release writing & distribution",
      "Mainstream media (Chosun, MBN, Nikkei)",
      "Crisis communication & reputation management",
    ],
  },
  {
    number: "09",
    title: "AMA Hosting",
    description: "Structured AMA sessions that drive real engagement.",
    link: "/services/ama",
    icon: Mic,
    image: amaImage,
    accent: "#EC4899",
    details: [
      "Telegram, Discord, Twitter Spaces AMAs",
      "Native Korean-speaking professional hosts",
      "Pre-event promotion & question curation",
      "Post-AMA recap content & analytics",
    ],
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const Icon = service.icon;
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.01, rootMargin: '100px', triggerOnce: true });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}
    >
      <Link
        to={service.link}
        className="group block relative rounded-2xl sm:rounded-3xl overflow-hidden hover:-translate-y-1 transition-all duration-500"
        style={{ minHeight: 'clamp(320px, 60vh, 520px)' }}
      >
        {/* Full bleed background image */}
        <img
          src={service.image}
          alt={service.title}
          loading="eager"
          decoding="sync"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
        />

        {/* Multi-layer overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${service.accent}10, transparent 60%)` }} />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between z-10">
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.3em] text-white/60">
            {service.number}
          </span>
          <div
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 group-hover:scale-110 group-hover:border-opacity-60"
            style={{ backgroundColor: `${service.accent}15`, borderColor: `${service.accent}25` }}
          >
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: service.accent }} />
          </div>
        </div>

        {/* Content — bottom aligned */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 z-10">
          <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white mb-2 tracking-tight">
            {service.title}
          </h3>
          <p className="text-sm text-white/50 mb-4 leading-relaxed max-w-[90%]">
            {service.description}
          </p>

          {/* Details — always visible on mobile, hover reveal on desktop */}
          <div className="max-h-[300px] sm:max-h-0 sm:group-hover:max-h-[300px] overflow-hidden sm:transition-all sm:duration-500 sm:ease-out">
            <ul className="space-y-1.5 mb-4 sm:mb-5 pt-2 sm:pt-3 border-t border-white/10">
              {service.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-3 text-[12px] sm:text-[13px] text-white/60">
                  <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: service.accent }} />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
            <span className="text-xs sm:text-sm font-semibold tracking-wide" style={{ color: service.accent }}>
              Explore
            </span>
            <ArrowRight
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              style={{ color: service.accent }}
            />
          </div>
        </div>

        {/* Side accent line */}
        <div className="absolute top-0 left-0 bottom-0 w-[3px]">
          <div
            className="w-full h-0 group-hover:h-full transition-all duration-700 ease-out"
            style={{ backgroundColor: service.accent }}
          />
        </div>
      </Link>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section className="py-6 sm:py-10 md:py-14">
      <div className="px-3 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {services.map((service, index) => (
            <ServiceCard key={service.number} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
