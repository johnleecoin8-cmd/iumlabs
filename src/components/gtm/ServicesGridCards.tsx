import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageCircle, Megaphone, Users, Calendar, Search, ArrowRight, Check, X } from 'lucide-react';

// Service images
import communityGrowth from '@/assets/services/community-growth.jpg';
import prMedia from '@/assets/services/pr-coindesk.png';
import kolNetwork from '@/assets/services/kol-network.jpg';
import seoAds from '@/assets/services/seo-ads.jpg';
import events from '@/assets/services/events.jpg';
import brandingWebsite from '@/assets/services/branding-website.png';

// Campaign preview images
import mantraParty from '@/assets/campaigns/mantra-party.jpg';
import bnbEvent from '@/assets/campaigns/bnb-event.jpg';
import seoulMetroBillboard from '@/assets/campaigns/seoul-metro-billboard-new.jpeg';
import openledgerInterview from '@/assets/campaigns/openledger-interview.jpg';
import storyOriginSummit from '@/assets/campaigns/story-origin-summit.jpg';
import peaqSummit from '@/assets/campaigns/peaq-summit.jpg';

interface Service {
  id: string;
  labelKo: string;
  labelEn: string;
  icon: typeof MessageCircle;
  mainImage: string;
  description: string;
  features: string[];
  gallery: string[];
  link: string;
  color: string;
}

const services: Service[] = [
  {
    id: "community",
    labelKo: "커뮤니티 관리",
    labelEn: "Community Management",
    icon: MessageCircle,
    mainImage: communityGrowth,
    description: "24시간 한국어 모더레이션, Discord/Telegram 운영, AMA/이벤트 호스팅",
    features: ["24/7 Moderation", "Discord/Telegram", "AMA & Events", "Ambassador"],
    gallery: [mantraParty, bnbEvent],
    link: "/services/community",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "pr",
    labelKo: "홍보 & 미디어",
    labelEn: "PR & Media",
    icon: Megaphone,
    mainImage: prMedia,
    description: "코인데스크, 블록미디어 등 50+ 미디어 네트워크 전략적 PR",
    features: ["Tier-1 Media", "Press Release", "Thought Leadership", "Crisis Mgmt"],
    gallery: [seoulMetroBillboard],
    link: "/services/pr",
    color: "from-violet-500 to-purple-500"
  },
  {
    id: "influencer",
    labelKo: "인플루언서 마케팅",
    labelEn: "Influencer Marketing",
    icon: Users,
    mainImage: kolNetwork,
    description: "200+ 검증된 한국 크립토 KOL 네트워크로 진정성 있는 마케팅",
    features: ["200+ KOLs", "Performance Track", "Content Creation", "Partnerships"],
    gallery: [openledgerInterview],
    link: "/services/influencer",
    color: "from-fuchsia-500 to-pink-500"
  },
  {
    id: "seo",
    labelKo: "SEO & 광고",
    labelEn: "SEO & Advertising",
    icon: Search,
    mainImage: seoAds,
    description: "네이버 최적화, 카카오 광고, 국내 플랫폼 특화 퍼포먼스 마케팅",
    features: ["Naver SEO", "Kakao Ads", "Performance", "Analytics"],
    gallery: [seoulMetroBillboard],
    link: "/services/seo",
    color: "from-amber-500 to-orange-500"
  },
  {
    id: "events",
    labelKo: "오프라인 이벤트",
    labelEn: "Offline Events",
    icon: Calendar,
    mainImage: events,
    description: "서울 프리미엄 베뉴에서 밋업, 컨퍼런스, 프라이빗 디너 기획",
    features: ["Premium Venues", "Conference", "Private Dinners", "Production"],
    gallery: [storyOriginSummit, peaqSummit],
    link: "/services/offline-event",
    color: "from-emerald-500 to-teal-500"
  },
  {
    id: "branding",
    labelKo: "브랜딩 & 웹사이트",
    labelEn: "Branding & Website",
    icon: Megaphone,
    mainImage: brandingWebsite,
    description: "한국 시장에 맞는 브랜드 로컬라이제이션 및 웹사이트 개발",
    features: ["Brand Localization", "Website Dev", "UI/UX", "Design System"],
    gallery: [],
    link: "/services/branding",
    color: "from-rose-500 to-red-500"
  },
];

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <Link to={service.link} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500">
          {/* Background Image */}
          <img
            src={service.mainImage}
            alt={service.labelKo}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity`} />
          
          {/* Color accent on hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

          {/* Content */}
          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            {/* Top: Icon */}
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500`}>
              <service.icon className="w-6 h-6 text-white" />
            </div>

            {/* Bottom: Info */}
            <div>
              <h4 className="text-xl font-bold text-white mb-1">{service.labelKo}</h4>
              <p className="text-white/50 text-sm mb-3">{service.labelEn}</p>
              
              {/* Description - visible on hover */}
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}
                className="text-white/70 text-sm mb-4 leading-relaxed overflow-hidden"
              >
                {service.description}
              </motion.p>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                className="flex flex-wrap gap-2 mb-4"
              >
                {service.features.slice(0, 3).map((feature) => (
                  <span 
                    key={feature} 
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-white/10 rounded-full text-white/70"
                  >
                    <Check className="w-3 h-3 text-green-400" />
                    {feature}
                  </span>
                ))}
              </motion.div>

              {/* CTA */}
              <div className="flex items-center gap-2 text-primary group-hover:text-white transition-colors">
                <span className="text-sm font-medium">Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ServicesGridCards = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-black overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-violet-900/10 via-transparent to-transparent" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
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
            From research to scale — everything you need for a successful Korea launch.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all rounded-full text-white/70 hover:text-white"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGridCards;
