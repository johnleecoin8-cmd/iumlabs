import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import SEOHead from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowRight, TrendingUp, Briefcase, GraduationCap, MapPin, DollarSign, Search, Send } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import CTABannerSection from "@/components/CTABannerSection";
import FooterLinksSection from "@/components/FooterLinksSection";
import FloatingContactButton from "@/components/FloatingContactButton";
import MediaPartnersSection from "@/components/MediaPartnersSection";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";


// Import components
import Logo3D from "@/components/Logo3D";

// Import team avatars

// Import client logos
import bnbLogo from "@/assets/logos/bnb.png";
import kucoinLogo from "@/assets/logos/kucoin.svg";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import bybitLogo from "@/assets/logos/bybit.png";
import peaqLogo from "@/assets/logos/peaq.svg";
import storyProtocolLogo from "@/assets/logos/story-protocol.png";
import megaethLogo from "@/assets/logos/megaeth.png";
import triaLogo from "@/assets/logos/tria-official.png";
import mantraLogo from "@/assets/logos/mantra.png";
import saharaAiLogo from "@/assets/logos/sahara-ai.png";
import fogoLogo from "@/assets/logos/fogo.png";
import synfuturesLogo from "@/assets/logos/synfutures.png";
const clientLogos = [{
  name: "BNB",
  logo: bnbLogo,
  noInvert: false
}, {
  name: "KuCoin",
  logo: kucoinLogo,
  noInvert: false
}, {
  name: "Polygon",
  logo: polygonLogo,
  noInvert: false
}, {
  name: "Ondo Finance",
  logo: ondoLogo,
  noInvert: false
}, {
  name: "Bybit",
  logo: bybitLogo,
  noInvert: false
}, {
  name: "Peaq",
  logo: peaqLogo,
  noInvert: false
}, {
  name: "Story Protocol",
  logo: storyProtocolLogo,
  noInvert: false
}, {
  name: "MegaETH",
  logo: megaethLogo,
  noInvert: false
}, {
  name: "Tria",
  logo: triaLogo,
  noInvert: true
}, {
  name: "Mantra",
  logo: mantraLogo,
  noInvert: true
}, {
  name: "Sahara AI",
  logo: saharaAiLogo,
  noInvert: true
}, {
  name: "FOGO",
  logo: fogoLogo,
  noInvert: true
}, {
  name: "SynFutures",
  logo: synfuturesLogo,
  noInvert: true
}];
const applicationSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  telegram: z.string().optional(),
  linkedinUrl: z.string().optional(),
  position: z.string().min(1, "Please select a position"),
  coverLetter: z.string().optional(),
  privacyAgreed: z.literal(true, {
    errorMap: () => ({
      message: "Please agree to the privacy policy"
    })
  })
});
type ApplicationFormData = z.infer<typeof applicationSchema>;
const positions = [{
  icon: Search,
  title: "Researcher",
  description: "Responsible for Web3 market research and in-depth analysis. Identify the latest trends in the blockchain ecosystem and derive insights.",
  salary: "Negotiable",
  workType: "Hybrid (Seoul Office + Remote)",
  jobDescription: ["Conduct comprehensive Web3 market trend analysis and produce weekly/monthly research reports covering DeFi, NFTs, L1/L2 ecosystems, and emerging narratives", "Perform deep-dive due diligence on potential client projects, analyzing tokenomics, team backgrounds, competitive landscape, and market positioning", "Monitor and interpret on-chain metrics using Dune Analytics, Flipside, Nansen, and DefiLlama to derive actionable trading and investment insights", "Track Korean crypto community sentiment across Naver, KakaoTalk, DC Inside, and local forums to identify emerging trends before mainstream adoption", "Collaborate with the Growth team to develop data-backed GTM strategies and market entry recommendations for global projects", "Create investor-grade pitch materials, one-pagers, and thesis documents that articulate project value propositions clearly", "Maintain and update internal databases of Korean exchanges, VCs, KOLs, and media contacts with relevant intelligence", "Present research findings to clients and internal teams, translating complex data into clear strategic recommendations"],
  qualifications: ["Deep understanding of Web3, DeFi protocols, and blockchain technology fundamentals", "2+ years of experience in crypto research, investment analysis, or related field", "Proficiency in on-chain analytics tools (Dune, Flipside, Nansen, Arkham)", "Strong written and verbal communication skills in both Korean and English", "Experience writing research reports or investment theses", "Self-motivated with exceptional attention to detail and analytical rigor"]
}, {
  icon: TrendingUp,
  title: "Growth Manager",
  description: "Develop and execute strategies for global Web3 projects entering the Korean market. Lead community building and marketing efforts.",
  salary: "KRW 40M - 70M / Year",
  workType: "Hybrid (Seoul Office + Remote)",
  jobDescription: ["Design and execute end-to-end Go-To-Market (GTM) strategies for global Web3 projects targeting the Korean market, from initial market analysis to full launch", "Build, nurture, and scale Korean crypto communities across Discord, Telegram, KakaoTalk open chats, and Twitter/X with engagement-focused content strategies", "Identify, negotiate, and manage relationships with Korean KOLs (Key Opinion Leaders), ensuring authentic partnerships and measurable campaign ROI", "Plan and execute high-impact offline events including meetups, conferences, hackathons, and exclusive networking dinners in Seoul", "Develop and maintain strategic partnerships with Korean exchanges (Upbit, Bithumb, Coinone) for listing support and co-marketing initiatives", "Coordinate PR campaigns with Korean crypto media outlets (Block Media, Coindesk Korea, Bloomingbit) to maximize project visibility", "Create localized marketing content including blog posts, social media assets, and video scripts tailored to Korean audience preferences", "Track and report on key growth metrics (community size, engagement rates, sentiment analysis) with data-driven optimization recommendations"],
  qualifications: ["3+ years experience in Web3 marketing, community management, or growth roles", "Native Korean speaker with professional-level English communication skills", "Proven track record of building and scaling crypto communities (10K+ members)", "Established network within the Korean crypto ecosystem (exchanges, media, KOLs)", "Experience with marketing analytics tools and community management platforms", "Strong project management skills with ability to handle multiple campaigns simultaneously"]
}];
const process = [{
  step: "01",
  title: "APPLICATION",
  description: "Resume Review"
}, {
  step: "02",
  title: "INTERVIEW",
  description: "Video Interview"
}, {
  step: "03",
  title: "TASK",
  description: "Practical Assignment"
}, {
  step: "04",
  title: "OFFER",
  description: "Final Offer"
}];


// Video component with mobile optimization using unified hook
const JobsHeroVideo = () => {
  const {
    videoRef,
    isVideoReady,
    hasVideoError,
    shouldDisableVideo,
    videoProps,
    posterProps,
    ShimmerOverlay,
  } = useVideoPlayer({
    src: '/videos/jobs-hero.mp4',
    poster: '/images/hero-poster.jpg',
    autoPlay: true,
    preload: 'auto',
  });

  return (
    <>
      {/* Fallback poster - always visible until video is ready */}
      <img {...posterProps} />

      {/* Shimmer loading overlay */}
      <ShimmerOverlay />

      {!shouldDisableVideo && !hasVideoError && (
        <video
          ref={videoRef}
          {...videoProps}
          className="absolute inset-0 w-full h-full object-cover z-10"
        >
          <source src="/videos/jobs-hero.mp4#t=0.001" type="video/mp4" />
        </video>
      )}
    </>
  );
};

const Jobs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telegram: "",
    linkedinUrl: "",
    position: "",
    coverLetter: "",
    privacyAgreed: false
  });
  const [selectedPosition, setSelectedPosition] = useState<typeof positions[0] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = applicationSchema.safeParse(formData);
      if (!result.success) {
        const firstError = result.error.errors[0];
        toast.error(firstError.message);
        setIsSubmitting(false);
        return;
      }
      const {
        error
      } = await supabase.from("job_applications").insert({
        name: result.data.name,
        email: result.data.email,
        phone: null,
        telegram: result.data.telegram || null,
        linkedin_url: result.data.linkedinUrl || null,
        portfolio_url: null,
        position: result.data.position,
        cover_letter: result.data.coverLetter || null
      });
      if (error) throw error;
      toast.success("Your application has been submitted successfully!");
      setFormData({
        name: "",
        email: "",
        telegram: "",
        linkedinUrl: "",
        position: "",
        coverLetter: "",
        privacyAgreed: false
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("An error occurred while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const talentMarquee = "Talent Wanted ".repeat(20);
  return <div className="min-h-screen bg-surface-base flex flex-col">
      <SEOHead
        title="Web3 Careers Korea | Join ium Labs"
        description="Join Korea's fastest-growing Web3 marketing agency. We're hiring researchers, growth managers, and crypto-native talent in Seoul."
        path="/jobs"
        keywords={['Web3 Jobs Korea', 'Crypto Careers Seoul', 'Blockchain Jobs Korea', 'Web3 Researcher', 'Growth Manager Crypto']}
      />
      <Navbar />

      {/* Hero Section with Video Background */}
      <main className="p-0.5 sm:p-1 md:p-2 bg-surface-base" id="hero">
        <div className="rounded-xl sm:rounded-2xl overflow-hidden">
          <div className="relative min-h-[calc(100vh-2rem)] flex flex-col justify-center overflow-hidden rounded-2xl sm:rounded-3xl bg-surface-odd">
            {/* Video Background */}
            <JobsHeroVideo />
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60" />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface-odd/80" />
            
            {/* Floating Tags - Lunar Strategy Style */}
            <motion.span initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.5,
            duration: 0.6
          }} className="lunar-tag-dark absolute top-[15%] left-[8%] md:left-[12%] animate-float text-xs md:text-sm hidden sm:block" style={{
            animationDelay: '0s'
          }}>
              Researcher
            </motion.span>
            <motion.span initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.7,
            duration: 0.6
          }} className="lunar-tag-dark absolute top-[22%] right-[10%] md:right-[15%] animate-float text-xs md:text-sm hidden sm:block" style={{
            animationDelay: '0.5s'
          }}>
              Growth Manager
            </motion.span>
            <motion.span initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.9,
            duration: 0.6
          }} className="lunar-tag-dark absolute bottom-[28%] left-[6%] md:left-[10%] animate-float text-xs md:text-sm hidden md:block" style={{
            animationDelay: '1s'
          }}>
              Seoul HQ
            </motion.span>
            <motion.span initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 1.1,
            duration: 0.6
          }} className="lunar-tag-dark absolute bottom-[35%] right-[8%] md:right-[12%] animate-float text-xs md:text-sm hidden sm:block" style={{
            animationDelay: '1.5s'
          }}>
              Remote OK
            </motion.span>
            <motion.span initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 1.3,
            duration: 0.6
          }} className="lunar-tag-dark absolute top-[35%] left-[4%] md:left-[6%] animate-float text-xs md:text-sm hidden lg:block" style={{
            animationDelay: '2s'
          }}>
              Web3 Native
            </motion.span>
            <motion.span initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 1.5,
            duration: 0.6
          }} className="lunar-tag-dark absolute bottom-[20%] right-[5%] md:right-[8%] animate-float text-xs md:text-sm hidden lg:block" style={{
            animationDelay: '2.5s'
          }}>
              Global Impact
            </motion.span>
            
            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 text-center">
              <AnimatedSection>
                <span className="inline-block text-xs md:text-sm text-white/50 tracking-[0.3em] uppercase mb-6">
                  We're Hiring
                </span>
              </AnimatedSection>
              
              <AnimatedSection delay={100}>
                <h1 className="font-sans text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 sm:mb-6 tracking-tight">
                  We're Looking<br className="hidden md:block" /> for You
                </h1>
              </AnimatedSection>
              
              <AnimatedSection delay={200}>
                <p className="text-sm sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed px-4">
                  한국 Web3 시장의 미래를 함께 만들 뛰어난 인재를 찾습니다.<br />
                  Your next chapter starts here.
                </p>
              </AnimatedSection>
              
              <AnimatedSection delay={300}>
                <a href="#positions" className="inline-flex items-center gap-2 bg-white text-black px-5 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-lg hover:bg-white/90 transition-colors active:scale-95 min-h-[44px]">
                  Explore Opportunities
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </AnimatedSection>
            </div>
            
            {/* Talent Wanted Marquee - Bottom of Hero */}
            <div className="absolute bottom-0 left-0 right-0 z-10 bg-white overflow-hidden">
              <motion.div animate={{
              x: ["0%", "-50%"]
            }} transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }} className="flex whitespace-nowrap py-4 md:py-5">
                {[...Array(2)].map((_, i) => <span key={i} className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-black flex items-center">
                    {[...Array(8)].map((_, j) => <span key={j} className="flex items-center">
                        <span>Talent Wanted</span>
                        <span className="mx-5 md:mx-8 w-2 h-2 md:w-2.5 md:h-2.5 bg-black rounded-full" />
                      </span>)}
                  </span>)}
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Spacer */}
      <section className="bg-white overflow-hidden" id="marquee" />

      {/* 01. Positions Section */}
      <section className="bg-surface-odd" id="positions">
        <div className="border-t border-white/10">
          <AnimatedSection>
            <div className="flex items-baseline justify-between p-3 sm:p-4 md:px-10 md:py-4 border-b border-white/10">
              <div className="flex items-baseline gap-4 sm:gap-6 md:gap-10">
                <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">01</span>
                <h2 className="text-base sm:text-lg md:text-xl font-medium text-white">Find Your Role</h2>
              </div>
              <span className="text-[10px] sm:text-xs text-white/50 tracking-wider hidden sm:block px-2 sm:px-3 py-1 border border-white/20 rounded-full">We're Actively Hiring</span>
            </div>
          </AnimatedSection>

          {/* Position Rows */}
          {positions.map((pos, idx) => {
          const Icon = pos.icon;
          return <div key={idx} onClick={() => setSelectedPosition(pos)} className="border-b border-white/10 group cursor-pointer hover:bg-white/5 transition-all active:bg-white/10">
                <div className="px-4 md:px-10 py-4 sm:py-6 md:py-8 flex items-center justify-between gap-4 sm:gap-6">
                  {/* Left: Number + Title */}
                  <div className="flex items-center gap-4 sm:gap-6 md:gap-10 flex-1 min-w-0">
                    <span className="text-2xl sm:text-3xl md:text-5xl font-bold text-white/20 group-hover:text-white/40 transition-colors">
                      0{idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-2xl md:text-4xl font-bold text-white group-hover:text-white/90 transition-colors truncate">
                        {pos.title}
                      </h3>
                      <p className="text-white/40 text-xs sm:text-sm md:text-base mt-0.5 sm:mt-1 hidden sm:block truncate">
                        {pos.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Right: Info + Arrow */}
                  <div className="flex items-center gap-3 sm:gap-4 md:gap-8 flex-shrink-0">
                    <div className="hidden lg:flex items-center gap-6 text-sm text-white/40">
                      <span className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        {pos.salary}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {pos.workType}
                      </span>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all">
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white/60 group-hover:text-black group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </div>;
        })}
        </div>
      </section>


      {/* 03. Process Section */}
      <section className="bg-surface-even" id="process">
        <div className="border-t border-white/10">
          <AnimatedSection>
            <div className="flex items-baseline justify-between p-3 sm:p-4 md:px-10 md:py-4 border-b border-white/10">
              <div className="flex items-baseline gap-4 sm:gap-6 md:gap-10">
                <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">03</span>
                <h2 className="text-base sm:text-lg md:text-xl font-medium text-white">Process</h2>
              </div>
              <span className="text-[10px] sm:text-xs text-white/50 tracking-wider hidden sm:block px-2 sm:px-3 py-1 border border-white/20 rounded-full">How It Works</span>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={100}>
            <div className="px-4 md:px-10 py-8 sm:py-10 md:py-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
                {process.map((step, idx) => <div key={idx} className="relative bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-6 md:p-8 text-center group hover:bg-white/10 transition-colors active:scale-[0.98]">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/20 block mb-1 sm:mb-2">
                      {step.step}
                    </span>
                    <h4 className="text-xs sm:text-sm md:text-base font-semibold text-white mb-1 sm:mb-2">
                      {step.title}
                    </h4>
                    <p className="text-white/50 text-[10px] sm:text-xs md:text-sm">
                      {step.description}
                    </p>
                    
                    {/* Connector Line */}
                    {idx < process.length - 1 && <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-white/10" />}
                  </div>)}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 04. Apply Section */}
      <section className="bg-surface-odd" id="apply">
        <div className="border-t border-white/10">
          <AnimatedSection>
            <div className="flex items-baseline justify-between p-3 sm:p-4 md:px-10 md:py-4 border-b border-white/10">
              <div className="flex items-baseline gap-4 sm:gap-6 md:gap-10">
                <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">04</span>
                <h2 className="text-base sm:text-lg md:text-xl font-medium text-white">We Want You</h2>
              </div>
              <span className="text-[10px] sm:text-xs text-white/50 tracking-wider hidden sm:block px-2 sm:px-3 py-1 border border-white/20 rounded-full">Tell Us Your Story</span>
            </div>
          </AnimatedSection>

          {/* We Want You Marquee */}
          
          
          <AnimatedSection delay={100}>
            <div className="px-4 md:px-10 py-8 sm:py-10 md:py-16">
              <div className="max-w-4xl mx-auto">
                <p className="text-center text-white/60 text-base sm:text-lg md:text-xl mb-3 sm:mb-4 font-medium">
                  Ready to make an impact?
                </p>
                <p className="text-center text-white/40 text-xs sm:text-sm md:text-base mb-6 sm:mb-10 leading-relaxed">
                  We're excited to hear from you. Tell us your story—we're listening.
                </p>

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  {/* Row 1: Name, Email, Phone */}
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    <Input placeholder="Name *" value={formData.name} onChange={e => handleInputChange("name", e.target.value)} className="bg-white/5 border-white/10 h-12 sm:h-14 rounded-xl text-sm sm:text-base text-white placeholder:text-white/30 focus:border-white/30" />
                    <Input type="email" placeholder="Email *" value={formData.email} onChange={e => handleInputChange("email", e.target.value)} className="bg-white/5 border-white/10 h-12 sm:h-14 rounded-xl text-sm sm:text-base text-white placeholder:text-white/30 focus:border-white/30" />
                  </div>

                  {/* Row 2: Telegram, LinkedIn */}
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    <Input placeholder="Telegram" value={formData.telegram} onChange={e => handleInputChange("telegram", e.target.value)} className="bg-white/5 border-white/10 h-12 sm:h-14 rounded-xl text-sm sm:text-base text-white placeholder:text-white/30 focus:border-white/30" />
                    <Input placeholder="LinkedIn / Twitter URL" value={formData.linkedinUrl} onChange={e => handleInputChange("linkedinUrl", e.target.value)} className="bg-white/5 border-white/10 h-12 sm:h-14 rounded-xl text-sm sm:text-base text-white placeholder:text-white/30 focus:border-white/30" />
                  </div>

                  {/* Row 3: Position Select */}
                  <Select value={formData.position} onValueChange={value => handleInputChange("position", value)}>
                    <SelectTrigger className="bg-white/5 border-white/10 h-12 sm:h-14 rounded-xl text-sm sm:text-base text-white">
                      <SelectValue placeholder="Select a position *" />
                    </SelectTrigger>
                    <SelectContent className="bg-surface-odd border-white/10">
                      {positions.map(pos => <SelectItem key={pos.title} value={pos.title} className="text-white">
                          {pos.title}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>

                  {/* Row 4: Cover Letter */}
                  <Textarea placeholder="Tell us about yourself and why you want to join Ium Labs..." value={formData.coverLetter} onChange={e => handleInputChange("coverLetter", e.target.value)} className="bg-white/5 border-white/10 min-h-[150px] sm:min-h-[200px] rounded-xl text-sm sm:text-base text-white placeholder:text-white/30 focus:border-white/30 resize-none" />

                  {/* Privacy Checkbox */}
                  <div className="flex items-center gap-3 pt-2">
                    <Checkbox id="privacy" checked={formData.privacyAgreed} onCheckedChange={checked => handleInputChange("privacyAgreed", checked as boolean)} className="h-5 w-5 border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-black" />
                    <label htmlFor="privacy" className="text-sm text-white/50 cursor-pointer">
                      I agree to the privacy policy *
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" disabled={isSubmitting} className="w-full py-6 h-auto text-lg bg-white text-black hover:bg-white/90 rounded-full font-semibold mt-6">
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Banner */}
      <AnimatedSection direction="none">
        <CTABannerSection />
      </AnimatedSection>

      {/* Footer Links */}
      <FooterLinksSection />

      {/* Footer */}
      <Footer />

      <FloatingContactButton />

      {/* Position Detail Dialog */}
      <Dialog open={!!selectedPosition} onOpenChange={open => !open && setSelectedPosition(null)}>
        <DialogContent className="bg-gradient-to-b from-surface-odd to-surface-base border-white/10 max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
          {selectedPosition && <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.3,
          ease: "easeOut"
        }}>
              <DialogHeader>
                <div className="flex items-start gap-5 mb-4">
                  <motion.div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0" initial={{
                scale: 0
              }} animate={{
                scale: 1
              }} transition={{
                delay: 0.1,
                type: "spring",
                stiffness: 200
              }}>
                    <selectedPosition.icon className="w-7 h-7 text-white/80" />
                  </motion.div>
                  <div>
                    <DialogTitle className="text-2xl md:text-3xl font-bold text-white">
                      {selectedPosition.title}
                    </DialogTitle>
                    <p className="text-white/50 text-sm mt-2 leading-relaxed">{selectedPosition.description}</p>
                  </div>
                </div>

                {/* Salary & Work Type Pills */}
                <motion.div className="flex flex-wrap gap-3 mt-4" initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: 0.15
            }}>
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm font-medium">{selectedPosition.salary}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-2 rounded-full">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">{selectedPosition.workType}</span>
                  </div>
                </motion.div>

              </DialogHeader>

              <div className="space-y-6 mt-8">
                {/* Job Description */}
                <motion.div initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.25
            }} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-white/70" />
                    </div>
                    Job Description
                  </h4>
                  <ul className="space-y-3">
                    {selectedPosition.jobDescription.map((item, idx) => <motion.li key={idx} className="text-white/60 text-sm flex items-start gap-3" initial={{
                  opacity: 0,
                  x: -10
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  delay: 0.3 + idx * 0.05
                }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 flex-shrink-0" />
                        {item}
                      </motion.li>)}
                  </ul>
                </motion.div>

                {/* Qualifications */}
                <motion.div initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.35
            }} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-white/70" />
                    </div>
                    Qualifications
                  </h4>
                  <ul className="space-y-3">
                    {selectedPosition.qualifications.map((item, idx) => <motion.li key={idx} className="text-white/60 text-sm flex items-start gap-3" initial={{
                  opacity: 0,
                  x: -10
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  delay: 0.4 + idx * 0.05
                }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 flex-shrink-0" />
                        {item}
                      </motion.li>)}
                  </ul>
                </motion.div>

                {/* Apply Button */}
                <motion.a href="#apply" onClick={() => {
              setSelectedPosition(null);
              handleInputChange("position", selectedPosition.title === "Open Position" ? "Other" : selectedPosition.title);
            }} className="w-full inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-[0.98] mt-2" initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.5
            }} whileHover={{
              boxShadow: "0 0 30px rgba(255,255,255,0.2)"
            }}>
                  Apply for this Position
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>}
        </DialogContent>
      </Dialog>
    </div>;
};
export default Jobs;