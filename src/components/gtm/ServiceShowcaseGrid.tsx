import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageCircle, Megaphone, Users, Calendar, Search, ArrowRight, ChevronRight, X } from 'lucide-react';

// Service images
import communityGrowth from '@/assets/services/community-growth.jpg';
import prMedia from '@/assets/services/pr-coindesk.png';
import kolNetwork from '@/assets/services/kol-network.jpg';
import seoAds from '@/assets/services/seo-ads.jpg';
import events from '@/assets/services/events.jpg';

// Campaign images for galleries
import mantraParty from '@/assets/campaigns/mantra-party.jpg';
import bnbEvent from '@/assets/campaigns/bnb-event.jpg';
import lbankFestival from '@/assets/campaigns/lbank-festival.jpg';
import seoulMetroBillboard from '@/assets/campaigns/seoul-metro-billboard-new.jpeg';
import synfuturesBillboard from '@/assets/campaigns/synfutures-billboard.jpg';
import openledgerInterview from '@/assets/campaigns/openledger-interview.jpg';
import kucoinCampaign from '@/assets/campaigns/kucoin-campaign.jpg';
import seoulMetroPoster from '@/assets/campaigns/seoul-metro-poster.jpeg';
import storyOriginSummit from '@/assets/campaigns/story-origin-summit.jpg';
import peaqSummit from '@/assets/campaigns/peaq-summit.jpg';
import polygonConnect from '@/assets/campaigns/polygon-connect.png';
import ondoSeminar from '@/assets/campaigns/ondo-seminar.jpg';
import bybitEvent from '@/assets/campaigns/bybit-event.jpg';

interface Service {
  id: string;
  labelKo: string;
  labelEn: string;
  icon: typeof MessageCircle;
  mainImage: string;
  description: string;
  features: string[];
  gallery: { src: string; title: string }[];
  link: string;
}

const services: Service[] = [
  {
    id: "community",
    labelKo: "커뮤니티 관리",
    labelEn: "Community Management",
    icon: MessageCircle,
    mainImage: communityGrowth,
    description: "24시간 한국어 모더레이션, Discord/Telegram 운영, AMA/이벤트 호스팅, 앰배서더 프로그램 운영",
    features: ["24/7 Korean Moderation", "Discord/Telegram Setup", "AMA & Events", "Ambassador Program"],
    gallery: [
      { src: mantraParty, title: "MANTRA Community Party" },
      { src: bnbEvent, title: "BNB Chain Event" },
      { src: lbankFestival, title: "LBank Festival" },
    ],
    link: "/services/community"
  },
  {
    id: "pr",
    labelKo: "홍보 & 미디어",
    labelEn: "PR & Media Relations",
    icon: Megaphone,
    mainImage: prMedia,
    description: "코인데스크 코리아, 블록미디어 등 50+ 미디어 네트워크를 통한 전략적 PR 캠페인",
    features: ["Tier-1 Media Placement", "Press Releases", "Thought Leadership", "Crisis Management"],
    gallery: [
      { src: seoulMetroBillboard, title: "Seoul Metro Billboard" },
      { src: synfuturesBillboard, title: "SynFutures Billboard" },
      { src: seoulMetroPoster, title: "Metro Poster" },
    ],
    link: "/services/pr"
  },
  {
    id: "influencer",
    labelKo: "인플루언서 마케팅",
    labelEn: "Influencer Marketing",
    icon: Users,
    mainImage: kolNetwork,
    description: "200+ 검증된 한국 크립토 KOL 네트워크로 진정성 있는 바이럴 마케팅 실행",
    features: ["200+ Verified KOLs", "Performance Tracking", "Content Creation", "Long-term Partnerships"],
    gallery: [
      { src: openledgerInterview, title: "KOL Interview" },
      { src: kucoinCampaign, title: "KuCoin Campaign" },
      { src: bybitEvent, title: "Bybit Event" },
    ],
    link: "/services/influencer"
  },
  {
    id: "seo",
    labelKo: "SEO & 광고",
    labelEn: "SEO & Advertising",
    icon: Search,
    mainImage: seoAds,
    description: "네이버 최적화, 카카오 광고, 국내 플랫폼에 특화된 퍼포먼스 마케팅",
    features: ["Naver SEO", "Kakao Ads", "Performance Marketing", "Analytics"],
    gallery: [
      { src: seoulMetroBillboard, title: "Outdoor Ads" },
      { src: seoulMetroPoster, title: "Station Poster" },
    ],
    link: "/services/seo"
  },
  {
    id: "events",
    labelKo: "오프라인 이벤트",
    labelEn: "Offline Events",
    icon: Calendar,
    mainImage: events,
    description: "서울 프리미엄 베뉴에서 밋업, 컨퍼런스, 프라이빗 디너 기획 및 운영",
    features: ["Premium Venues", "Conference Organization", "Private Dinners", "Full Production"],
    gallery: [
      { src: storyOriginSummit, title: "Story Origin Summit" },
      { src: peaqSummit, title: "peaq Summit" },
      { src: polygonConnect, title: "Polygon Connect" },
      { src: ondoSeminar, title: "Ondo Seminar" },
    ],
    link: "/services/offline-event"
  },
];

const ServiceCard = ({ service, isActive, onClick }: { 
  service: Service; 
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <motion.div
      layout
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl border cursor-pointer transition-all duration-500 ${
        isActive 
          ? 'col-span-2 row-span-2 border-primary/50' 
          : 'border-white/10 hover:border-white/20'
      }`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={service.mainImage}
          alt={service.labelKo}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className={`absolute inset-0 transition-all duration-500 ${
          isActive 
            ? 'bg-gradient-to-t from-black via-black/70 to-black/30' 
            : 'bg-gradient-to-t from-black/80 to-black/40'
        }`} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-primary/20 backdrop-blur-sm flex items-center justify-center mb-4">
          <service.icon className="w-6 h-6 text-primary" />
        </div>

        <h4 className="text-xl font-bold text-white">{service.labelKo}</h4>
        <p className="text-white/50 text-sm">{service.labelEn}</p>

        {/* Expanded content */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <p className="text-white/70 text-sm mb-4">{service.description}</p>
              
              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-4">
                {service.features.map((feature) => (
                  <span key={feature} className="px-3 py-1 text-xs bg-white/10 rounded-full text-white/70">
                    {feature}
                  </span>
                ))}
              </div>

              {/* Gallery Preview */}
              <div className="flex gap-2 mb-4">
                {service.gallery.slice(0, 3).map((img) => (
                  <div key={img.title} className="w-20 h-14 rounded-lg overflow-hidden">
                    <img src={img.src} alt={img.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              <Link
                to={service.link}
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const ServiceShowcaseGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeService, setActiveService] = useState<string | null>(null);

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-black overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase">Our Services</span>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mt-4">
            Full-Stack <span className="bg-gradient-to-r from-primary via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">GTM Services</span>
          </h3>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Click to explore each service with real campaign examples.
          </p>
        </motion.div>

        {/* Services Grid - Bento Style */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className={`aspect-[4/3] ${activeService === service.id ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              <ServiceCard
                service={service}
                isActive={activeService === service.id}
                onClick={() => setActiveService(activeService === service.id ? null : service.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceShowcaseGrid;
