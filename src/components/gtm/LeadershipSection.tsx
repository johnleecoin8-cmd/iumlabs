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
    <section className="relative py-24 md:py-28 bg-black overflow-hidden">
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
          className="mb-14 md:mb-16"
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

        {/* CEO Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* CEO Photo */}
            <div className="relative group">
              <div className="relative aspect-[3/4] max-w-sm mx-auto md:mx-0 bg-gradient-to-br from-white/[0.06] to-white/[0.02] rounded-2xl overflow-hidden border border-white/10">
                <img 
                  src={ceoPhoto} 
                  alt="James Lee - CEO" 
                  className="absolute inset-0 w-full h-full object-cover object-top grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                {/* Corner Decorations */}
                <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-white/20" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-white/20" />
              </div>
              
              {/* Badge */}
              <div className="absolute -bottom-3 -right-3 md:right-auto md:-left-3 bg-white text-black px-4 py-2 rounded-lg font-semibold text-xs tracking-wider">
                FOUNDER & CEO
              </div>
            </div>

            {/* CEO Info */}
            <div className="space-y-6">
              <div>
                <span className="text-white/40 text-sm tracking-wider uppercase mb-2 block">Founder & CEO</span>
                <a 
                  href="https://www.linkedin.com/in/james-l-13a998251" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 group/link mb-4"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-white group-hover/link:text-white/80 transition-colors">James Lee</h3>
                  <Linkedin className="w-5 h-5 text-white/40 group-hover/link:text-[#0A66C2] transition-colors" />
                </a>
                
                <blockquote className="relative">
                  <div className="absolute -left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/40 to-transparent" />
                  <p className="text-base md:text-lg text-white/70 italic leading-relaxed pl-5">
                    "Korea is not just a market; it's a different planet. I built ium labs to be the translator of value, not just language."
                  </p>
                </blockquote>
              </div>

              <div>
                <h4 className="text-white/50 text-sm tracking-wider uppercase mb-3">Background</h4>
                <ul className="space-y-2">
                  {ceoBackground.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-white/60 text-sm">
                      <ChevronRight className="w-4 h-4 text-white/40" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-white">Core Team</h3>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="group"
              >
                <div className="relative p-6 bg-gradient-to-br from-white/[0.06] to-white/[0.02] rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                  {/* Photo */}
                  <div className="w-18 h-18 md:w-20 md:h-20 rounded-xl overflow-hidden mb-5 border border-white/10">
                    <img 
                      src={member.photo} 
                      alt={member.name}
                      className="w-full h-full object-cover object-[center_25%] scale-110 grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  {/* Name & Role */}
                  <h4 className="text-lg font-semibold text-white mb-1">{member.name}</h4>
                  <span className="text-white/50 text-sm block mb-3">{member.role}</span>

                  {/* Background */}
                  <p className="text-white/40 text-sm">{member.background}</p>

                  {/* Card Number */}
                  <div className="absolute top-5 right-5 text-white/10 text-3xl font-bold">
                    0{index + 1}
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
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