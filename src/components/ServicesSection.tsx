import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { Users, Megaphone, Building2, Mic2, Newspaper, Calendar, ArrowRight, Check } from "lucide-react";

// Service images
import kolNetworkImg from "@/assets/services/kol-network.jpg";
import communityGrowthImg from "@/assets/services/community-growth.jpg";
import vaspComplianceImg from "@/assets/services/vasp-compliance.jpg";
import prMediaImg from "@/assets/services/pr-media.jpg";
import eventsImg from "@/assets/services/events.jpg";

const services = [
  {
    id: "kol",
    icon: Users,
    title: "KOL Marketing",
    subtitle: "Influencer Network",
    description: "Access 1000+ vetted Korean crypto influencers across YouTube, Twitter, and Telegram to amplify your project's reach in the Korean market.",
    image: kolNetworkImg,
    stats: { value: "1,000+", label: "Vetted KOLs" },
    features: [
      "YouTube, Twitter, Telegram, Naver coverage",
      "Performance tracking & analytics dashboard",
      "Campaign strategy & execution",
      "Authentic influencer matching"
    ],
    link: "/services/influencer"
  },
  {
    id: "community",
    icon: Megaphone,
    title: "Community Operation",
    subtitle: "24/7 Management",
    description: "Build a thriving Korean community with native speakers managing your Telegram, Discord, and KakaoTalk channels around the clock.",
    image: communityGrowthImg,
    stats: { value: "24/7", label: "Support" },
    features: [
      "Korean native moderation team",
      "Telegram, Discord, KakaoTalk management",
      "Community engagement programs",
      "Sentiment analysis & reporting"
    ],
    link: "/services/community"
  },
  {
    id: "exchange",
    icon: Building2,
    title: "Exchange Support",
    subtitle: "VASP & Listings",
    description: "Navigate Korea's regulated crypto market with our VASP registration guidance and CEX/DEX listing support services.",
    image: vaspComplianceImg,
    stats: { value: "50+", label: "Exchange Partners" },
    features: [
      "VASP registration guidance",
      "CEX & DEX listing support",
      "AML/KYC compliance setup",
      "Regulatory consulting"
    ],
    link: "/services/gtm-strategy"
  },
  {
    id: "media",
    icon: Newspaper,
    title: "Media & PR",
    subtitle: "Korean Coverage",
    description: "Secure coverage in leading Korean crypto publications and mainstream media with our extensive media partnerships.",
    image: prMediaImg,
    stats: { value: "50+", label: "Media Partners" },
    features: [
      "Korean media partnerships",
      "Press release distribution",
      "Exclusive interview placements",
      "Crisis management"
    ],
    link: "/services/pr"
  },
  {
    id: "events",
    icon: Calendar,
    title: "Offline Events",
    subtitle: "Seoul Presence",
    description: "Make an impact at major Korean blockchain events or host your own exclusive side events and VIP networking sessions.",
    image: eventsImg,
    stats: { value: "38+", label: "AMAs Hosted" },
    features: [
      "Conference booth management",
      "Side event organization",
      "VIP networking events",
      "Speaker placement"
    ],
    link: "/services/yap"
  }
];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div ref={ref} className="px-4 bg-gradient-to-br from-[#0a1a14] via-[#0d1f18] to-[#0a1a14] py-24 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-green-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400 mb-4 tracking-widest uppercase">
            <span className="w-8 h-px bg-emerald-400" />
            What We Do
            <span className="w-8 h-px bg-emerald-400" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our <span className="text-emerald-400">Services</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            End-to-end Web3 marketing solutions tailored for the Korean market
          </p>
        </div>

        {/* Tab Navigation */}
        <div className={`flex flex-wrap justify-center gap-2 mb-12 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {services.map((service, index) => (
            <button
              key={service.id}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === index
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-white/[0.05] text-white/60 hover:bg-white/[0.1] hover:text-white border border-white/[0.08]'
              }`}
            >
              <service.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{service.title}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`transition-all duration-500 ${
                activeTab === index 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4 absolute pointer-events-none'
              }`}
              style={{ display: activeTab === index ? 'block' : 'none' }}
            >
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Image */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                  <div className="relative overflow-hidden rounded-3xl border border-white/[0.1]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-[300px] md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Overlay Stats */}
                    <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/[0.1]">
                      <div className="text-3xl font-bold text-emerald-400">{service.stats.value}</div>
                      <div className="text-sm text-white/60">{service.stats.label}</div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <div>
                    <span className="text-emerald-400 text-sm font-medium uppercase tracking-wider">
                      {service.subtitle}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mt-2">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-white/60 text-lg leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-white/70">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-emerald-400" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    to={service.link}
                    className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-medium px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 group"
                  >
                    Learn More
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Indicators (dots) */}
        <div className="flex justify-center gap-2 mt-12">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeTab === index 
                  ? 'w-8 bg-emerald-400' 
                  : 'bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
