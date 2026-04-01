import { ArrowRight, Compass, Users, Search, Mic, Mic2, Newspaper, Rocket, Target, FileSearch } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import gtmImage from "@/assets/services/gtm-strategy.webp";
import websiteImage from "@/assets/services/website-creative.webp";
import eventsImage from "@/assets/services/offline-event.webp";
import communityImage from "@/assets/services/community-management.png";
import kolImage from "@/assets/services/kol-avatars.webp";
import prImage from "@/assets/services/pr-coindesk.png";
import seoAdsImage from "@/assets/services/seo-ads.webp";
import deepResearchImage from "@/assets/services/deep-research.png";

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
    title: "Brand Identity & Web",
    description: "Strategic brand identity and high-performance websites.",
    link: "/services/branding",
    icon: Compass,
    image: websiteImage,
    accent: "#A855F7",
    details: [
      "Logo, visual identity & brand guidelines",
      "Web3-native website design & development",
      "Korean localization & copywriting",
      "Landing pages for TGE & campaigns",
    ],
  },
  {
    number: "03",
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
    number: "04",
    title: "Offline Event",
    description: "End-to-end event planning for Web3 experiences in Korea.",
    link: "/services/offline-event",
    icon: Target,
    image: eventsImage,
    accent: "#FB923C",
    details: [
      "Seoul meetups & side event production",
      "Venue sourcing & logistics management",
      "Speaker curation & panel moderation",
      "Post-event content & lead capture",
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
    title: "Influencer / KOL",
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
    image: communityImage,
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link
        to={service.link}
        className="group block relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#111] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500"
      >
        {/* Image — large */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-black/40 to-black/10" />

          {/* Number + Icon floating on image */}
          <div className="absolute top-4 sm:top-5 left-4 sm:left-6 flex items-center gap-3">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest" style={{ color: service.accent }}>
              [ {service.number} ]
            </span>
          </div>
          <div
            className="absolute top-4 sm:top-5 right-4 sm:right-6 w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center backdrop-blur-sm border transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: `${service.accent}15`, borderColor: `${service.accent}30` }}
          >
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: service.accent }} />
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 lg:p-8">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors">
            {service.title}
          </h3>
          <p className="text-sm text-white/40 mb-5 leading-relaxed">
            {service.description}
          </p>

          {/* Detail list with dashes */}
          <ul className="space-y-2 mb-6">
            {service.details.map((detail, i) => (
              <li key={i} className="flex items-start gap-3 text-[13px] sm:text-sm text-white/55 group-hover:text-white/65 transition-colors">
                <span className="text-white/20 mt-0.5 flex-shrink-0">—</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-[13px] font-medium" style={{ color: service.accent }}>
              Learn more
            </span>
            <ArrowRight
              className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300"
              style={{ color: service.accent }}
            />
          </div>
        </div>

        {/* Bottom accent line on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px]">
          <div
            className="h-full w-0 group-hover:w-full transition-all duration-600 ease-out"
            style={{ backgroundColor: service.accent }}
          />
        </div>
      </Link>
    </motion.div>
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
