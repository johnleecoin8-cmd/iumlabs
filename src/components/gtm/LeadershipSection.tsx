import { motion } from "framer-motion";
import { ChevronRight, Linkedin } from "lucide-react";
import ceoPhoto from "@/assets/team/ceo-profile.png";
import teamStrategyPhoto from "@/assets/team/team-strategy.jpeg";
import teamOperationsPhoto from "@/assets/team/team-operations.jpeg";
import teamGrowthPhoto from "@/assets/team/team-growth.jpeg";

const LeadershipSection = () => {
  const ceoBackground = [
    "Ex-KuCoin Core Team",
    "Outlier Ventures Investment Manager",
    "CryptoBridge Korea Founder"
  ];

  const teamMembers = [
    {
      role: "Head of Strategy",
      nickname: "The Analyst",
      photo: teamStrategyPhoto,
      background: [
        "Former VC Research Analyst",
        "Specialist in Tokenomics & GTM Strategy"
      ],
      responsibility: "Market Intelligence & Planning"
    },
    {
      role: "Head of Operations",
      nickname: "The Executor",
      photo: teamOperationsPhoto,
      background: [
        "Ex-Tier 1 Exchange Listing Manager",
        "Managed 50+ Listing Campaigns"
      ],
      responsibility: "Exchange Relations & Compliance"
    },
    {
      role: "Head of Growth",
      nickname: "The Narrative Builder",
      photo: teamGrowthPhoto,
      background: [
        "Former Chief Editor at Crypto Media",
        "Expert in Viral Marketing & KOL Mgmt"
      ],
      responsibility: "PR & Community Growth"
    }
  ];

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-white/40 text-sm font-mono tracking-wider">04</span>
            <div className="w-12 h-px bg-white/20" />
            <span className="text-white/60 text-sm tracking-wider uppercase">Leadership</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            The Architects
          </h2>
          
          <p className="text-xl md:text-2xl text-white/60 max-w-3xl leading-relaxed">
            "We are the bridge between global innovation and Korean culture."
          </p>
          <p className="text-base md:text-lg text-white/40 mt-2">
            (우리는 글로벌 혁신과 한국 문화를 잇는 다리입니다.)
          </p>
        </motion.div>

        {/* Part 1: CEO Spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-24"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* CEO Photo Area */}
            <div className="relative group">
              <div className="relative aspect-[4/5] bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-2xl overflow-hidden border border-white/10">
                {/* CEO Photo */}
                <img 
                  src={ceoPhoto} 
                  alt="ium labs CEO" 
                  className="absolute inset-0 w-full h-full object-cover object-top grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                />
                
                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/20" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/20" />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 bg-white text-black px-6 py-3 rounded-lg font-semibold text-sm tracking-wider">
                FOUNDER & CEO
              </div>
            </div>

            {/* CEO Info */}
            <div className="space-y-8">
              <div>
                <span className="text-white/40 text-sm tracking-wider uppercase mb-2 block">Founder & CEO</span>
                <a 
                  href="https://www.linkedin.com/in/james-l-13a998251" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 group/link"
                >
                  <h3 className="text-3xl md:text-4xl font-bold text-white group-hover/link:text-white/80 transition-colors">James Lee</h3>
                  <Linkedin className="w-6 h-6 text-white/40 group-hover/link:text-[#0A66C2] transition-colors" />
                </a>
                
                <blockquote className="relative">
                  <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-white/40 to-transparent" />
                  <p className="text-lg md:text-xl text-white/80 italic leading-relaxed pl-6">
                    "Korea is not just a market; it's a different planet. I built ium labs to be the translator of value, not just language."
                  </p>
                  <p className="text-sm text-white/40 mt-3 pl-6">
                    (한국은 단순한 시장이 아니라, 다른 행성입니다. 저는 언어가 아닌 '가치'를 번역하기 위해 이음랩스를 세웠습니다.)
                  </p>
                </blockquote>
              </div>

              <div>
                <h4 className="text-white/60 text-sm tracking-wider uppercase mb-4">Background</h4>
                <ul className="space-y-3">
                  {ceoBackground.map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-white/70">
                      <ChevronRight className="w-4 h-4 text-white/40" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Part 2: The Squad */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white">Core Team</h3>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group relative"
              >
                <div className="relative p-8 bg-gradient-to-br from-white/[0.06] to-white/[0.02] rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 h-full">
                  {/* Photo */}
                  <div className="w-24 h-24 rounded-2xl overflow-hidden mb-6 border border-white/10">
                    <img 
                      src={member.photo} 
                      alt={member.role}
                      className="w-full h-full object-cover object-[center_20%] scale-110 grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  {/* Role & Nickname */}
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-white mb-1">{member.role}</h4>
                    <span className="text-white/40 text-sm italic">"{member.nickname}"</span>
                  </div>

                  {/* Background */}
                  <ul className="space-y-2 mb-6">
                    {member.background.map((item, i) => (
                      <li key={i} className="text-white/50 text-sm flex items-start gap-2">
                        <span className="text-white/30 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Responsibility */}
                  <div className="pt-4 border-t border-white/10">
                    <span className="text-white/30 text-xs tracking-wider uppercase">Role</span>
                    <p className="text-white/70 text-sm mt-1">{member.responsibility}</p>
                  </div>

                  {/* Card Number */}
                  <div className="absolute top-6 right-6 text-white/10 text-4xl font-bold">
                    0{index + 1}
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Part 3: The Mission */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="relative py-16 px-8">
            {/* Decorative Lines */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              One Team, One Mission.
            </h3>
            
            <p className="text-xl md:text-2xl text-white/70 leading-relaxed">
              "To make your project the next dominant player in Korea."
            </p>
            <p className="text-base text-white/40 mt-3">
              (하나의 팀, 하나의 미션. 당신의 프로젝트를 한국의 다음 지배자로 만드는 것.)
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadershipSection;
