import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import CalendlyButton from "@/components/CalendlyButton";
import { ArrowRight, FileText, BookOpen, Newspaper, Globe, Mic, Award, Quote } from "lucide-react";
import prImage from "@/assets/services/pr-media.jpg";
import seoulSkyline from "@/assets/seoul-skyline.jpg";

// Import media logos
import cointelegraphLogo from "@/assets/logos/cointelegraph.png";
import coindeskLogo from "@/assets/logos/coindesk.png";
import blockmediaLogo from "@/assets/logos/blockmedia-new.png";
import bloomingbitLogo from "@/assets/logos/bloomingbit.png";
import coinessLogo from "@/assets/logos/coinness.png";

const themeConfig = {
  accentColor: "#8B5CF6",
  accentColorHover: "#7C3AED",
};

// Newspaper headline articles
const headlines = [
  { 
    publication: "CoinTelegraph",
    title: "Revolutionary DeFi Protocol Secures $50M in Series B",
    category: "FUNDING",
    date: "Dec 15, 2024"
  },
  { 
    publication: "CoinDesk",
    title: "Korean Web3 Startup Partners with Major Exchange",
    category: "PARTNERSHIPS",
    date: "Dec 14, 2024"
  },
  { 
    publication: "BlockMedia",
    title: "New Layer 2 Solution Achieves 100K TPS Milestone",
    category: "TECHNOLOGY",
    date: "Dec 13, 2024"
  },
];

const mediaPartners = [
  { name: "CoinTelegraph", logo: cointelegraphLogo, type: "Global" },
  { name: "CoinDesk", logo: coindeskLogo, type: "Global" },
  { name: "BlockMedia", logo: blockmediaLogo, type: "Korea" },
  { name: "Bloomingbit", logo: bloomingbitLogo, type: "Korea" },
  { name: "Coinness", logo: coinessLogo, type: "Korea" },
];

const processTimeline = [
  { 
    date: "Week 1", 
    title: "Story Discovery",
    description: "We research your project, identify newsworthy angles, and develop compelling narratives.",
    icon: FileText
  },
  { 
    date: "Week 2", 
    title: "Content Creation",
    description: "Our editorial team crafts press releases, articles, and media kits tailored to each outlet.",
    icon: BookOpen
  },
  { 
    date: "Week 3", 
    title: "Media Outreach",
    description: "We pitch to our network of journalists and secure placements across top publications.",
    icon: Newspaper
  },
  { 
    date: "Week 4", 
    title: "Publication & Amplification",
    description: "Articles go live, and we amplify reach through social and community channels.",
    icon: Globe
  },
];

const stats = [
  { value: "200+", label: "Articles Published" },
  { value: "50+", label: "Media Partners" },
];

const allServices = [
  { slug: "community", title: "Community", color: "#3B82F6" },
  { slug: "social-media", title: "Social Media", color: "#EC4899" },
  { slug: "influencer", title: "Influencer", color: "#F59E0B" },
  { slug: "gtm", title: "GTM Strategy", color: "#10B981" },
  { slug: "yap", title: "Yap Strategy", color: "#22D3EE" },
];

const PRService = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      
      {/* Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20"
          style={{ background: `radial-gradient(circle, ${themeConfig.accentColor}, transparent 70%)` }}
        />
      </div>

      {/* Hero Section - Newspaper Masthead Style */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src={seoulSkyline} 
            alt="Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 pt-32">
          {/* Masthead */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px flex-1 max-w-[100px] bg-white/20" />
              <span className="text-xs uppercase tracking-[0.3em] text-white/40">The Web3 Chronicle</span>
              <div className="h-px flex-1 max-w-[100px] bg-white/20" />
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              PR & <span style={{ color: themeConfig.accentColor }}>Media</span>
            </h1>
            
            <div className="flex items-center justify-center gap-6 text-sm text-white/60">
              <span>📰 200+ Articles</span>
              <span>•</span>
              <span>🌏 50+ Media Partners</span>
              <span>•</span>
              <span>🎯 Global Reach</span>
            </div>
          </motion.div>

          {/* Headlines Grid - Newspaper Layout */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {headlines.map((headline, index) => (
              <motion.div
                key={index}
                className="relative p-6 border border-white/10 bg-white/5 backdrop-blur-sm group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.15 }}
                whileHover={{ 
                  borderColor: `${themeConfig.accentColor}60`,
                  boxShadow: `0 0 30px ${themeConfig.accentColor}20`
                }}
                style={{ 
                  borderRadius: 0,
                }}
              >
                {/* Category Badge */}
                <div 
                  className="inline-block px-2 py-1 text-[10px] font-bold tracking-wider mb-3"
                  style={{ background: themeConfig.accentColor }}
                >
                  {headline.category}
                </div>

                {/* Publication */}
                <div className="text-xs text-white/40 uppercase tracking-wider mb-2">
                  {headline.publication}
                </div>

                {/* Headline */}
                <h3 className="text-lg font-serif font-bold leading-tight mb-3 group-hover:text-violet-400 transition-colors" style={{ fontFamily: 'Georgia, serif' }}>
                  {headline.title}
                </h3>

                {/* Date */}
                <div className="text-xs text-white/40">{headline.date}</div>

                {/* Column Lines */}
                <div className="absolute top-0 bottom-0 right-0 w-px bg-white/10" />
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <CalendlyButton 
              className="px-8 py-4 rounded-none font-medium text-white border-2 hover:bg-violet-600 transition-all"
              style={{ borderColor: themeConfig.accentColor, background: themeConfig.accentColor }}
            >
              📰 Get Your Story Published
            </CalendlyButton>
          </motion.div>
        </div>
      </section>

      {/* About Section - Editorial Layout */}
      <section className="py-24 relative">
        <div 
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${themeConfig.accentColor}40, transparent)` }}
        />

        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Quote Style */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Quote className="w-16 h-16 mb-6 opacity-30" style={{ color: themeConfig.accentColor }} />
              
              <blockquote className="text-2xl md:text-3xl font-serif italic leading-relaxed mb-8" style={{ fontFamily: 'Georgia, serif' }}>
                "In crypto, perception shapes reality. The right story in the right publication can define your project's trajectory."
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center">
                  <Mic className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold">Ium Labs PR Team</div>
                  <div className="text-sm text-white/60">Strategic Communications</div>
                </div>
              </div>
            </motion.div>

            {/* Right - Magazine Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img 
                src={prImage} 
                alt="PR & Media" 
                className="w-full h-[450px] object-cover"
                style={{ boxShadow: `0 0 60px ${themeConfig.accentColor}20` }}
              />
              
              {/* Stats Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <div className="flex justify-around">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold" style={{ color: themeConfig.accentColor }}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-white/60">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Media Partners - Magazine Grid */}
      <section className="py-24 relative">
        <div 
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${themeConfig.accentColor}40, transparent)` }}
        />

        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-white/40 font-mono">[ MEDIA NETWORK ]</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mt-4" style={{ fontFamily: 'Georgia, serif' }}>
              Where Your Story <span style={{ color: themeConfig.accentColor }}>Gets Published</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {mediaPartners.map((partner, index) => (
              <motion.div
                key={index}
                className="relative p-6 border border-white/10 bg-white/5 flex flex-col items-center justify-center group hover:border-violet-500/50 transition-all"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="h-8 object-contain brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity mb-3"
                />
                <span className="text-[10px] uppercase tracking-wider text-white/40">{partner.type}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process - Breaking News Ticker Style */}
      <section className="py-24 relative bg-gradient-to-b from-[#0A0A0A] to-violet-950/10">
        <div className="container mx-auto px-4 md:px-8">
          {/* Breaking News Header */}
          <div className="flex items-center gap-4 mb-12 p-4 bg-red-600 rounded-none">
            <span className="animate-pulse text-white font-bold text-sm px-3 py-1 bg-white/20">LIVE</span>
            <div className="h-6 w-px bg-white/30" />
            <span className="text-white font-serif text-lg">How We Get You Published</span>
          </div>

          {/* News Cards Row */}
          <div className="grid md:grid-cols-4 gap-0 border border-white/10">
            {processTimeline.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 ${index < 3 ? 'border-r border-white/10' : ''} bg-white/5 hover:bg-violet-500/10 transition-colors group`}
              >
                {/* Date Badge */}
                <div className="text-xs font-bold text-violet-400 mb-3">{step.date}</div>
                
                {/* Icon */}
                <step.icon className="w-8 h-8 mb-4 text-white/40 group-hover:text-violet-400 transition-colors" />
                
                {/* Title */}
                <h3 className="text-lg font-serif font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-white/50 leading-relaxed">{step.description}</p>
                
                {/* Read more */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <span className="text-xs text-violet-400 group-hover:underline cursor-pointer">Read more →</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 relative">
        <div 
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${themeConfig.accentColor}40, transparent)` }}
        />

        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-white/40 font-mono">[ WHAT'S INCLUDED ]</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mt-4 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                Full-Service <span style={{ color: themeConfig.accentColor }}>PR Package</span>
              </h2>
              <p className="text-white/60 mb-8">
                We help you craft the right narrative and secure placements in top crypto and tech media. 
                From article creation to journalist outreach and timing coordination.
              </p>
              <CalendlyButton 
                className="inline-flex items-center gap-2 px-6 py-3 font-medium border transition-all hover:scale-105"
                style={{ 
                  borderColor: themeConfig.accentColor,
                  color: themeConfig.accentColor
                }}
              >
                Discuss Your PR Strategy <ArrowRight className="w-4 h-4" />
              </CalendlyButton>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: FileText, title: "Press Releases", desc: "Professional, newsworthy content" },
                { icon: Newspaper, title: "Media Placement", desc: "Top-tier publication features" },
                { icon: Globe, title: "Global & Korean", desc: "Dual-market coverage" },
                { icon: Award, title: "Thought Leadership", desc: "Opinion pieces & interviews" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="p-5 border border-white/10 bg-white/5 group hover:border-violet-500/50 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -3 }}
                >
                  <item.icon className="w-8 h-8 mb-3" style={{ color: themeConfig.accentColor }} />
                  <h4 className="font-bold mb-1">{item.title}</h4>
                  <p className="text-xs text-white/60">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* More Services */}
      <section className="py-24 relative">
        <div 
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${themeConfig.accentColor}40, transparent)` }}
        />

        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-white/40 font-mono">[ MORE ]</span>
            <h2 className="text-2xl font-serif font-bold mt-4" style={{ fontFamily: 'Georgia, serif' }}>
              Explore Other Services
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {allServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="block p-4 border border-white/10 bg-white/5 text-center hover:border-white/30 transition-all group"
                >
                  <span className="text-sm group-hover:text-white transition-colors" style={{ color: service.color }}>
                    {service.title}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default PRService;
