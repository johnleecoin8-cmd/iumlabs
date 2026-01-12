import { motion } from "framer-motion";
import { ChevronRight, Linkedin } from "lucide-react";
import ceoPhoto from "@/assets/team/ceo-profile.png";
import teamStrategyPhoto from "@/assets/team/team-strategy.jpeg";
import teamCommunityPhoto from "@/assets/team/team-community.jpeg";
import teamResearchPhoto from "@/assets/team/team-growth.jpeg";

interface LeaderCard {
  number: string;
  title: string;
  role: string;
  background: string;
  quote: string;
  description: string;
  descriptionKo: string;
  photo: string;
}

const LeadershipSection = () => {
  const leaders: LeaderCard[] = [
    {
      number: "01",
      title: "GO-TO-MARKET LEAD",
      role: "CEO",
      background: "Ex-KuCoin & Outlier Ventures",
      quote: "Standardizing Global Excellence.",
      description: "Defines the brand hierarchy and market entry strategy that aligns with Tier-1 global standards.",
      descriptionKo: "글로벌 탑티어 수준의 브랜드 위계와 시장 진입 전략(GTM)을 총괄 설계하여, 프로젝트의 체급을 높입니다.",
      photo: ceoPhoto
    },
    {
      number: "02",
      title: "STRATEGY LEAD",
      role: "Head of Strategy",
      background: "Ex-Binance Fiat Leads",
      quote: "Crafting the Macro-Narrative.",
      description: "Structuring compelling brand stories and adoption funnels that resonate from retail users to institutional partners.",
      descriptionKo: "Binance 출신의 시각으로, 리테일 유입부터 기관 설득까지 이어지는 거시적인 브랜드 내러티브를 설계합니다.",
      photo: teamStrategyPhoto
    },
    {
      number: "03",
      title: "OPERATION LEAD",
      role: "Head of Community",
      background: "Ex-a16z Head of Operation",
      quote: "Silicon Valley Standard Culture.",
      description: "Translating complex Web3 tech into sustainable cultural movements and fandom-driven events, powered by a16z-level operational rigor.",
      descriptionKo: "실리콘밸리(a16z) 수준의 오퍼레이션 시스템을 도입하여, 단순 커뮤니티 관리를 넘어선 '문화'와 '팬덤'을 구축합니다.",
      photo: teamCommunityPhoto
    }
  ];

  return (
    <section className="relative py-20 md:py-28 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
        <div className="absolute top-1/3 -left-32 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="text-white/40 text-sm font-mono tracking-wider">01</span>
            <div className="w-10 h-px bg-white/20" />
            <span className="text-white/60 text-sm tracking-wider uppercase">Leadership</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            The Architects
          </h2>
          
          <p className="text-lg md:text-xl text-white/50 max-w-2xl">
            "We are the bridge between global innovation and Korean culture."
          </p>
        </motion.div>

        {/* Leaders Grid - 2x2 on Desktop, 1 column on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {leaders.map((leader, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative"
            >
              <div className="relative p-6 md:p-8 bg-gradient-to-br from-white/[0.06] to-white/[0.02] rounded-2xl border border-white/10 hover:border-white/25 transition-all duration-500 h-full overflow-hidden">
                {/* Number Badge */}
                <div className="absolute top-5 right-5 md:top-6 md:right-6 text-white/[0.06] text-6xl md:text-7xl font-bold leading-none">
                  {leader.number}
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Top: Photo + Title */}
                  <div className="flex items-start gap-4 mb-5">
                    {/* Photo */}
                    <div className={`rounded-xl overflow-hidden border border-white/10 flex-shrink-0 ${index === 0 ? 'w-24 h-24' : 'w-16 h-16 md:w-20 md:h-20'}`}>
                      <img 
                        src={leader.photo} 
                        alt={leader.title}
                        className={`w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500 ${
                          index === 0 ? 'scale-150 object-[center_30%]' : 'scale-110 object-[center_25%]'
                        }`}
                      />
                    </div>
                    
                    {/* Title Info */}
                    <div className="flex-1 min-w-0">
                      <span className="text-primary text-xs font-mono tracking-wider block mb-1">{leader.number}</span>
                      <h3 className="text-lg md:text-xl font-bold text-white leading-tight mb-1">
                        {leader.title}
                      </h3>
                      <span className="text-white/50 text-sm block">{leader.role}</span>
                    </div>
                  </div>

                  {/* Background Badge */}
                  <div className="inline-flex items-center gap-2 mb-4">
                    <span className="px-3 py-1.5 bg-white/[0.08] rounded-full text-white/70 text-xs font-medium border border-white/10">
                      {leader.background}
                    </span>
                  </div>

                  {/* Quote */}
                  <blockquote className="relative mb-4">
                    <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/60 to-transparent" />
                    <p className="text-base md:text-lg text-white italic leading-relaxed pl-4">
                      "{leader.quote}"
                    </p>
                  </blockquote>

                  {/* Description */}
                  <div className="space-y-2 mt-auto">
                    <p className="text-white/60 text-sm leading-relaxed">
                      {leader.description}
                    </p>
                    <p className="text-white/40 text-sm leading-relaxed">
                      {leader.descriptionKo}
                    </p>
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mission Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 md:mt-16 text-center"
        >
          <p className="text-lg md:text-xl text-white/40 italic">
            "One Team, One Mission — To make your project the next dominant player in Korea."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadershipSection;