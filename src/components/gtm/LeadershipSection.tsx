import { motion } from "framer-motion";
import { ChevronRight, Linkedin } from "lucide-react";
import ceoPhoto from "@/assets/team/ceo-profile.png";
import teamStrategyPhoto from "@/assets/team/team-strategy.jpeg";
import teamCommunityPhoto from "@/assets/team/team-community.jpeg";
import teamResearchPhoto from "@/assets/team/team-growth.jpeg";

const LeadershipSection = () => {
  const ceoBackground = [
    "Ex-KuCoin Core Team",
    "Outlier Ventures Investment Manager",
    "CryptoBridge Korea Founder"
  ];

  const teamMembers = [
    {
      name: "David Y",
      role: "Head of Strategy",
      photo: teamStrategyPhoto,
      background: "Former Binance / Ledger"
    },
    {
      name: "Miles K",
      role: "Head of Community",
      photo: teamCommunityPhoto,
      background: "Former Head of Operation ai16z"
    },
    {
      name: "Shim K",
      role: "Senior Researcher",
      photo: teamResearchPhoto,
      background: "Former Journalist Korean Media"
    }
  ];

  return (
    <section className="relative py-20 md:py-24 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header - More Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-white/40 text-sm font-mono tracking-wider">04</span>
            <div className="w-8 h-px bg-white/20" />
            <span className="text-white/60 text-xs tracking-wider uppercase">Leadership</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            The Architects
          </h2>
          
          <p className="text-lg md:text-xl text-white/50 max-w-2xl">
            "We are the bridge between global innovation and Korean culture."
          </p>
        </motion.div>

        {/* CEO + Team in Horizontal Layout */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
          {/* CEO Card - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="relative group h-full">
              <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-2xl border border-white/10 p-6 h-full">
                {/* CEO Photo + Info Row */}
                <div className="flex gap-5 mb-5">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                    <img 
                      src={ceoPhoto} 
                      alt="James Lee - CEO" 
                      className="w-full h-full object-cover object-top grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-white/40 text-xs tracking-wider uppercase mb-1">Founder & CEO</span>
                    <a 
                      href="https://www.linkedin.com/in/james-l-13a998251" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 group/link"
                    >
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover/link:text-white/80 transition-colors">James Lee</h3>
                      <Linkedin className="w-4 h-4 text-white/40 group-hover/link:text-[#0A66C2] transition-colors" />
                    </a>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-sm text-white/60 italic leading-relaxed mb-5 border-l-2 border-white/20 pl-4">
                  "Korea is not just a market; it's a different planet."
                </p>

                {/* Background */}
                <div className="space-y-2">
                  {ceoBackground.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-white/50 text-sm">
                      <ChevronRight className="w-3 h-3 text-white/30" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Team Members - Takes 3 columns */}
          <div className="lg:col-span-3 grid sm:grid-cols-3 gap-4">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="group"
              >
                <div className="relative p-5 bg-gradient-to-br from-white/[0.05] to-transparent rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                  {/* Photo */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden mb-4 border border-white/10">
                    <img 
                      src={member.photo} 
                      alt={member.name}
                      className="w-full h-full object-cover object-[center_25%] scale-110 grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  {/* Name & Role */}
                  <h4 className="text-base font-semibold text-white mb-0.5">{member.name}</h4>
                  <span className="text-white/40 text-xs block mb-3">{member.role}</span>

                  {/* Background */}
                  <p className="text-white/30 text-xs leading-relaxed">{member.background}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mission Footer - Compact */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 md:mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 text-white/30 text-sm">
            <div className="w-8 h-px bg-white/20" />
            <span>One Team, One Mission</span>
            <div className="w-8 h-px bg-white/20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadershipSection;