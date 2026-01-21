import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import CTABannerSection from "@/components/CTABannerSection";
import FooterLinksSection from "@/components/FooterLinksSection";
import FloatingContactButton from "@/components/FloatingContactButton";
import { Linkedin, Twitter, Mail } from "lucide-react";

// Import team NFT avatars
import jamesNft from "@/assets/team/james-nft.png";
import davidNft from "@/assets/team/david-nft.png";
import julianNft from "@/assets/team/julian-nft.png";
import kyleNft from "@/assets/team/kyle-nft.png";
import nftAvatar1 from "@/assets/team/nft-avatar-1.png";
import nftAvatar2 from "@/assets/team/nft-avatar-2.png";
import nftAvatar3 from "@/assets/team/nft-avatar-3.png";

// Team members data
const teamMembers = [
  {
    name: "James",
    role: "Co-Founder & CEO",
    description: "Ex-Binance Korea BD Lead. 10+ years in blockchain industry. Strategic partnerships and business development expert.",
    avatar: jamesNft,
    social: {
      linkedin: "https://linkedin.com/in/",
      twitter: "https://twitter.com/",
    },
  },
  {
    name: "David",
    role: "Co-Founder & COO",
    description: "Ex-KuCoin Korea Marketing Lead. Web3 marketing and community growth specialist with 8+ years experience.",
    avatar: davidNft,
    social: {
      linkedin: "https://linkedin.com/in/",
      twitter: "https://twitter.com/",
    },
  },
  {
    name: "Julian",
    role: "Head of Research",
    description: "Blockchain researcher and analyst. Deep expertise in tokenomics, DeFi protocols, and on-chain data analysis.",
    avatar: julianNft,
    social: {
      linkedin: "https://linkedin.com/in/",
      twitter: "https://twitter.com/",
    },
  },
  {
    name: "Kyle",
    role: "Head of Growth",
    description: "Growth marketing expert specializing in Korean crypto communities. Built 100K+ member communities.",
    avatar: kyleNft,
    social: {
      linkedin: "https://linkedin.com/in/",
      twitter: "https://twitter.com/",
    },
  },
  {
    name: "Mia",
    role: "KOL Manager",
    description: "Managing relationships with 180+ Korean crypto influencers. Expert in influencer marketing and campaign optimization.",
    avatar: nftAvatar1,
    social: {
      linkedin: "https://linkedin.com/in/",
      twitter: "https://twitter.com/",
    },
  },
  {
    name: "Alex",
    role: "Community Lead",
    description: "Discord & Telegram community expert. Specializes in community engagement and ambassador programs.",
    avatar: nftAvatar2,
    social: {
      linkedin: "https://linkedin.com/in/",
      twitter: "https://twitter.com/",
    },
  },
  {
    name: "Sophie",
    role: "PR & Media Manager",
    description: "Media relations specialist with connections to major Korean crypto outlets. Expert in press coverage and crisis management.",
    avatar: nftAvatar3,
    social: {
      linkedin: "https://linkedin.com/in/",
      twitter: "https://twitter.com/",
    },
  },
];

// Hero Video component
const TeamHeroVideo = () => {
  return (
    <video 
      autoPlay 
      loop 
      muted 
      playsInline
      preload="auto"
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src="/videos/services-hero.mp4#t=0.001" type="video/mp4" />
    </video>
  );
};

const Team = () => {
  const teamMarquee = "Our Team ".repeat(20);

  return (
    <div className="min-h-screen bg-surface-base flex flex-col">
      <SEOHead
        title="Our Team | Meet the Web3 Marketing Experts"
        description="Meet the ium Labs team - Korea's leading Web3 marketing experts with backgrounds from Binance, KuCoin, and top blockchain companies."
        path="/team"
        keywords={['Web3 Team Korea', 'Crypto Marketing Experts', 'Blockchain Professionals Seoul']}
      />
      <Navbar />

      {/* Hero Section */}
      <main className="p-0.5 sm:p-1 md:p-2 bg-surface-base" id="hero">
        <div className="rounded-xl sm:rounded-2xl overflow-hidden">
          <div className="relative min-h-[60vh] sm:min-h-[70vh] flex flex-col justify-center overflow-hidden rounded-2xl sm:rounded-3xl bg-surface-odd">
            {/* Video Background */}
            <TeamHeroVideo />
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60" />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface-odd/80" />
            
            {/* Floating Tags */}
            <motion.span 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.5, duration: 0.6 }}
              className="lunar-tag-dark absolute top-[15%] left-[8%] md:left-[12%] animate-float text-xs md:text-sm hidden sm:block"
              style={{ animationDelay: '0s' }}
            >
              Web3 Natives
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.7, duration: 0.6 }}
              className="lunar-tag-dark absolute top-[22%] right-[10%] md:right-[15%] animate-float text-xs md:text-sm hidden sm:block"
              style={{ animationDelay: '0.5s' }}
            >
              Ex-Binance
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.9, duration: 0.6 }}
              className="lunar-tag-dark absolute bottom-[28%] left-[6%] md:left-[10%] animate-float text-xs md:text-sm hidden md:block"
              style={{ animationDelay: '1s' }}
            >
              Seoul HQ
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 1.1, duration: 0.6 }}
              className="lunar-tag-dark absolute bottom-[35%] right-[8%] md:right-[12%] animate-float text-xs md:text-sm hidden sm:block"
              style={{ animationDelay: '1.5s' }}
            >
              Ex-KuCoin
            </motion.span>
            
            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 text-center">
              <AnimatedSection>
                <span className="inline-block text-xs md:text-sm text-white/50 tracking-[0.3em] uppercase mb-6">
                  Our Team
                </span>
              </AnimatedSection>
              
              <AnimatedSection delay={100}>
                <h1 className="font-sans text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 sm:mb-6 tracking-tight">
                  Meet the<br className="hidden md:block" /> Experts
                </h1>
              </AnimatedSection>
              
              <AnimatedSection delay={200}>
                <p className="text-sm sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed px-4">
                  글로벌 거래소 출신 전문가들이 모인<br />
                  한국 No.1 Web3 마케팅 팀
                </p>
              </AnimatedSection>
            </div>
            
            {/* Team Marquee - Bottom of Hero */}
            <div className="absolute bottom-0 left-0 right-0 z-10 bg-white overflow-hidden">
              <motion.div 
                animate={{ x: ["0%", "-50%"] }} 
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }} 
                className="flex whitespace-nowrap py-4 md:py-5"
              >
                {[...Array(2)].map((_, i) => (
                  <span key={i} className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-black flex items-center">
                    {[...Array(8)].map((_, j) => (
                      <span key={j} className="flex items-center">
                        <span>Our Team</span>
                        <span className="mx-5 md:mx-8 w-2 h-2 md:w-2.5 md:h-2.5 bg-black rounded-full" />
                      </span>
                    ))}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Spacer */}
      <section className="bg-white overflow-hidden" id="marquee" />

      {/* Team Members Section */}
      <section className="bg-surface-even" id="team">
        <div className="border-t border-white/10">
          <AnimatedSection>
            <div className="flex items-baseline justify-between p-3 sm:p-4 md:px-10 md:py-4 border-b border-white/10">
              <div className="flex items-baseline gap-4 sm:gap-6 md:gap-10">
                <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">01</span>
                <h2 className="text-base sm:text-lg md:text-xl font-medium text-white">Leadership & Team</h2>
              </div>
              <span className="text-[10px] sm:text-xs text-white/50 tracking-wider hidden sm:block px-2 sm:px-3 py-1 border border-white/20 rounded-full">
                {teamMembers.length} Team Members
              </span>
            </div>
          </AnimatedSection>

          {/* Team Grid */}
          <div className="container mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-16 md:py-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {teamMembers.map((member, idx) => (
                <AnimatedSection key={idx} delay={idx * 100}>
                  <motion.div 
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="group relative bg-surface-odd rounded-2xl overflow-hidden border border-white/10 hover:border-white/25 transition-all duration-300"
                  >
                    {/* NFT Avatar */}
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-white/5 to-transparent">
                      <img 
                        src={member.avatar} 
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-odd via-transparent to-transparent" />
                    </div>
                    
                    {/* Content */}
                    <div className="p-5 sm:p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                            {member.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-primary font-medium">
                            {member.role}
                          </p>
                        </div>
                        
                        {/* Social Links */}
                        <div className="flex gap-2">
                          {member.social.linkedin && (
                            <a 
                              href={member.social.linkedin} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/15 transition-colors"
                            >
                              <Linkedin className="w-4 h-4 text-white/60" />
                            </a>
                          )}
                          {member.social.twitter && (
                            <a 
                              href={member.social.twitter} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/15 transition-colors"
                            >
                              <Twitter className="w-4 h-4 text-white/60" />
                            </a>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm text-white/50 leading-relaxed line-clamp-3">
                        {member.description}
                      </p>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-surface-odd border-t border-white/10 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-10">
          <AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">30+</div>
                <div className="text-xs sm:text-sm text-white/50">Years Combined Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">7</div>
                <div className="text-xs sm:text-sm text-white/50">Team Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">3</div>
                <div className="text-xs sm:text-sm text-white/50">Languages Spoken</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">24/7</div>
                <div className="text-xs sm:text-sm text-white/50">Support Available</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="bg-surface-even border-t border-white/10 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-10">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                Want to Join Our Team?
              </h2>
              <p className="text-sm sm:text-base text-white/60 mb-8">
                We're always looking for talented individuals passionate about Web3 and the Korean crypto market.
              </p>
              <a 
                href="/jobs" 
                className="inline-flex items-center gap-2 bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base hover:bg-white/90 transition-colors active:scale-95 min-h-[44px]"
              >
                View Open Positions
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTABannerSection />
      <FooterLinksSection />
      <Footer />
      <FloatingContactButton />
    </div>
  );
};

export default Team;
