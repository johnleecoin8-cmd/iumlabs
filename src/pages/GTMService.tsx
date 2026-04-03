import { Link } from "react-router-dom";
import { ArrowRight, X, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterLinksSection from "@/components/FooterLinksSection";
import CalendlyButton from "@/components/CalendlyButton";
import SEOHead from "@/components/SEOHead";
import gtmHeroImage from "@/assets/services/gtm-hero.avif";
import { projectsData } from "@/data/projectsData";

// GTM-specific project card images
import saharaAiEventImg from "@/assets/campaigns/sahara-ai-event.png";
import bnbHanokEventImg from "@/assets/campaigns/bnb-hanok-event.png";
import peaqBoothEventImg from "@/assets/campaigns/peaq-booth-event.png";
import aptosSeoulEventImg from "@/assets/campaigns/aptos-seoul-event.png";
import kucoinPartyEventImg from "@/assets/campaigns/kucoin-party-event.png";
import seoulSkylineImg from "@/assets/campaigns/seoul-skyline.png";

// Client logos
import bnbLogo from "@/assets/logos/bnb.png";
import kucoinLogo from "@/assets/logos/kucoin.svg";
import polygonLogo from "@/assets/logos/polygon.svg";
import bybitLogo from "@/assets/logos/bybit.png";
import mantraLogo from "@/assets/logos/mantra.png";
import peaqLogo from "@/assets/logos/peaq.svg";
import aptosLogo from "@/assets/logos/aptos.png";

const clientLogos = [
  { name: "BNB Chain", logo: bnbLogo },
  { name: "Bybit", logo: bybitLogo },
  { name: "KuCoin", logo: kucoinLogo },
  { name: "Polygon", logo: polygonLogo },
  { name: "Mantra", logo: mantraLogo },
  { name: "Peaq", logo: peaqLogo },
  { name: "Aptos", logo: aptosLogo },
];

const caseStudies = [
  { slug: "bnb-chain", result: "+420% Volume", detail: "2-week volume surge through KOL campaigns and Seoul networking events" },
  { slug: "bybit", result: "#2 Exchange", detail: "150+ first-page SEO rankings, 850K monthly organic visitors in Korea" },
  { slug: "mantra", result: "$50M+ Pipeline", detail: "Institutional-first market entry with Korea CEX listing support" },
];

const GTMService = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <SEOHead
        title="Korea Web3 GTM Strategy | Go-To-Market Agency | ium Labs"
        description="Full-stack Go-To-Market strategy for Web3 projects entering Korea. Market analysis, brand positioning, and actionable GTM roadmaps."
        path="/services/gtm"
        keywords={['Korea Web3 GTM', 'Go-To-Market Korea', 'Web3 Market Entry Korea', 'Crypto GTM Strategy']}
      />
      <Navbar />

      {/* ===== 1. Hero ===== */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <img src={gtmHeroImage} alt="Korea" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.3)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/30" />
        <div className="relative z-10 px-4 sm:px-8 lg:px-14 pb-10 sm:pb-14 pt-32 max-w-4xl">
          <h1 className="font-sans text-[1.75rem] sm:text-[3.5rem] md:text-[clamp(4.5rem,8vw,7.5rem)] font-bold text-white leading-[1.05] tracking-[-0.03em] mb-4">
            Korea Market Entry<br />Strategy & Execution
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-white/50 max-w-2xl mb-6 font-light tracking-wide leading-relaxed">
            Full-stack GTM for Web3 projects entering the #2 crypto market globally.
            From positioning to launch day — one partner, full execution.
          </p>
          <CalendlyButton className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition-all">
            Book a Free Strategy Call
          </CalendlyButton>
        </div>
      </section>

      {/* ===== 2. Client logo marquee ===== */}
      <section className="border-y border-white/[0.06] overflow-hidden py-5">
        <div className="flex items-center logo-marquee-slow">
          {[...clientLogos, ...clientLogos, ...clientLogos].map((client, i) => (
            <div key={i} className="flex items-center gap-2.5 mx-4 px-5 py-2 bg-white/[0.03] rounded-full border border-white/[0.06] flex-shrink-0">
              <img src={client.logo} alt={client.name} className="h-5 w-auto object-contain brightness-0 invert opacity-70" />
              <span className="text-white/50 text-xs font-medium whitespace-nowrap">{client.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 3. The Problem ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 leading-tight">
            Most global projects fail in Korea.<br />
            <span className="text-white/40">Here's why.</span>
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-white/45 leading-relaxed">
            <p>
              Korea has 16 million active crypto users — 30% of the population. Upbit processes $4B+ daily.
              The "Kimchi Premium" proves demand exists. But most projects enter with translated English campaigns,
              global KOLs who don't speak Korean, and zero presence on Naver, KakaoTalk, or Korean Telegram.
            </p>
            <p>
              Korean retail investors are trust-first. They follow native KOLs, read Korean-language research,
              and make decisions through community consensus. A project without Korean community managers,
              local media coverage, and exchange relationships is invisible here.
            </p>
            <p className="text-white/60 font-medium">
              We solve this. Our Seoul-based team handles every layer of Korean market entry —
              from competitive analysis to exchange listing, community setup to KOL activation.
              22+ projects launched. $7B+ in combined client valuation.
            </p>
          </div>
        </div>
      </section>

      {/* ===== 4. Before / After ===== */}
      <section className="px-4 sm:px-8 lg:px-14 pb-14 sm:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Before */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#111] border border-white/[0.06]">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <X className="w-3 h-3 text-red-400" />
              </div>
              <h3 className="text-base font-bold text-white">Without Korea GTM</h3>
            </div>
            <ul className="space-y-2.5">
              {[
                "Translated English campaigns that don't resonate",
                "Global KOLs with zero Korean audience",
                "No presence on Naver, KakaoTalk, or Korean Telegram",
                "Invisible on Korean exchanges",
                "Burning budget without Korean user acquisition",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-white/35 leading-relaxed">
                  <span className="text-red-400/40 mt-0.5">—</span>{item}
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#10B981]/[0.05] border border-[#10B981]/20">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-6 h-6 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center">
                <Check className="w-3 h-3 text-[#10B981]" />
              </div>
              <h3 className="text-base font-bold text-white">With ium Labs</h3>
            </div>
            <ul className="space-y-2.5">
              {[
                "Korea-fit narrative crafted by native speakers",
                "170+ vetted Korean KOLs activated for your project",
                "24/7 community on Telegram, Discord, KakaoTalk, Naver",
                "Exchange listing strategy for Upbit, Bithumb, Coinone",
                "Measurable ROI with monthly performance analytics",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-white/50 leading-relaxed">
                  <span className="text-[#10B981]/60 mt-0.5">—</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== 5. What We Deliver — FINPR style ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20">
          {/* Left — sticky title */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
              What We<br />Deliver
            </h2>
            <p className="text-sm text-white/40 leading-relaxed max-w-sm">
              End-to-end Korea market entry. From deep market analysis to exchange listing and post-launch growth, we cover every stage.
            </p>
          </div>

          {/* Right — scrolling service blocks */}
          <div className="space-y-0">
            {[
              {
                title: "Market Intelligence",
                desc: "We start with a full scan of the Korean crypto landscape. Competitor share-of-voice analysis, on-chain wallet profiling, opportunity mapping, and regulatory review. You get a clear picture of where you stand and where to move.",
              },
              {
                title: "Brand Localization",
                desc: "Your global narrative doesn't work in Korea. We rebuild it. Korea-fit brand positioning, localized content across Naver and Kakao, and community infrastructure on Telegram, Discord, and KakaoTalk.",
              },
              {
                title: "KOL & Media Launch",
                desc: "Tier-1 media coverage through BlockMedia, CoinDesk Korea, and TokenPost. Verified Korean KOL deployment across YouTube, X, Telegram, and Naver. Structured AMA sessions that drive real engagement.",
              },
              {
                title: "Community Growth",
                desc: "24/7 native Korean community managers. Telegram and Discord moderation, KakaoTalk open chat management, sentiment monitoring, and engagement programs that keep your community active and loyal.",
              },
              {
                title: "Exchange Listing",
                desc: "Direct relationships with Upbit, Bithumb, Coinone, and GOPAX. We handle applications, compliance documentation, and post-listing marketing to maximize Day 1 trading volume.",
              },
              {
                title: "Events & Scale",
                desc: "Offline events in Seoul, Korea Blockchain Week side events, VIP networking dinners. Ambassador programs, retention analytics, and monthly performance reporting to keep the momentum going.",
              },
            ].map((item, i) => (
              <div key={i} className="py-8 sm:py-10 border-b border-white/[0.06] last:border-b-0">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-sm sm:text-[15px] text-white/45 leading-relaxed max-w-xl">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 8. FAQ — same style ===== */}
      <section className="px-4 sm:px-8 lg:px-14 pb-14 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20">
          {/* Left — sticky title */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">FAQ</h2>
          </div>

          {/* Right — questions */}
          <div className="space-y-0">
            {[
              { q: "What makes Korean GTM different?", a: "Korea is trust-first, retail-driven. Projects need native community managers, localized narratives, local KOLs — not translated global campaigns. We handle all of this in-house from Seoul." },
              { q: "How long does a Korea launch take?", a: "Focused launch: 2-3 weeks. Full GTM engagement: 2-3 months covering analysis, community, KOL, PR, events, and exchange strategy." },
              { q: "Do you help with exchange listings?", a: "Yes. Direct relationships with Upbit, Bithumb, Coinone, GOPAX. We handle applications, documentation, compliance, and post-listing marketing." },
              { q: "What's the budget range?", a: "Focused campaigns start at $15K/month. Full-stack GTM (PR + community + KOL + events + exchange) runs $30K–$50K/month." },
            ].map((item, i) => (
              <div key={i} className="py-8 sm:py-10 border-b border-white/[0.06] last:border-b-0">
                <p className="text-base sm:text-lg font-semibold text-white mb-2">{item.q}</p>
                <p className="text-sm sm:text-[15px] text-white/45 leading-relaxed max-w-xl">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Who This Is For ===== */}
      <section className="px-4 sm:px-8 lg:px-14 pb-14 sm:pb-20">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Who this is for</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { title: "Pre-Launch Projects", desc: "Building toward TGE but need Korean positioning, narrative, and community before launch day." },
            { title: "Post-Launch Stalling", desc: "Launched globally but Korea traction is flat. Need local team, local KOLs, local strategy." },
            { title: "Exchange Listing Prep", desc: "Targeting Upbit or Bithumb. Need compliance guidance, documentation, and post-listing marketing." },
            { title: "Teams Burning Budget", desc: "Spending on global campaigns but can't connect efforts to Korean user acquisition or TVL." },
            { title: "Rebrands & Pivots", desc: "Repositioning for the Korean market. New narrative, refreshed community, coordinated rollout." },
            { title: "Early-Stage Projects", desc: "Still building but want Korean strategic foundations in place before launch." },
          ].map((item, i) => (
            <div key={i} className="p-4 sm:p-5 rounded-xl bg-[#111] border border-white/[0.06]">
              <h3 className="text-sm font-semibold text-white mb-1.5">{item.title}</h3>
              <p className="text-[13px] text-white/40 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Mood image ===== */}
      <section className="px-3 sm:px-4 pb-8">
        <div className="relative rounded-2xl overflow-hidden aspect-[21/6]">
          <img src={gtmHeroImage} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.4) saturate(0.8)" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-xl sm:text-3xl lg:text-4xl font-bold text-white/80 text-center tracking-tight px-4">
              22+ projects. $7B+ valuation. One team in Seoul.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="px-4 sm:px-8 lg:px-14 pb-14 sm:pb-20">
        <div className="rounded-2xl bg-[#111] border border-white/[0.06] p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-1">Ready to enter Korea?</h2>
            <p className="text-sm text-white/35">Free 30-min strategy call. We'll map out your market entry.</p>
          </div>
          <CalendlyButton className="inline-flex items-center px-7 py-3.5 rounded-full bg-[#10B981] text-white text-sm font-semibold flex-shrink-0 hover:-translate-y-0.5 transition-all">
            Book a Meeting
          </CalendlyButton>
        </div>
      </section>

      {/* ===== Project Cards Grid ===== */}
      <section className="px-4 sm:px-8 lg:px-14 pb-14 sm:pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Be Next These Projects</h2>
          <Link to="/projects" className="text-xs text-white/30 hover:text-white transition-colors">
            All projects <ArrowRight className="w-3 h-3 inline" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
          {[
            { slug: "bnb-chain", category: "Infrastructure", customImg: bnbHanokEventImg },
            { slug: "kucoin", category: "Exchange", customImg: kucoinPartyEventImg },
            { slug: "peaq", category: "DePIN", customImg: peaqBoothEventImg },
            { slug: "aptos", category: "Layer 1", customImg: aptosSeoulEventImg },
            { slug: "sahara-ai", category: "AI", customImg: saharaAiEventImg },
          ].map((cs) => {
            const project = projectsData[cs.slug];
            const cardImage = cs.customImg || project?.bgImage || '';
            return (
              <Link
                key={cs.slug}
                to={`/projects/${cs.slug}`}
                onClick={() => window.scrollTo(0, 0)}
                className="group block bg-[#0A0A0A] p-3 sm:p-4 transition-all duration-300 hover:bg-white/[0.03]"
              >
                <div className="w-full aspect-[16/9] rounded-lg overflow-hidden mb-3 group-hover:shadow-lg group-hover:shadow-white/5 transition-all duration-300">
                  <img src={cardImage} alt={project?.name || ''} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-white/30 text-[9px] sm:text-[10px] uppercase tracking-wider">{cs.category}</span>
                  <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-white/80 transition-colors line-clamp-1">
                    {project?.name}
                  </h3>
                  <p className="text-white/35 text-[10px] sm:text-xs leading-relaxed line-clamp-2 hidden sm:block">
                    {project?.description?.slice(0, 100)}...
                  </p>
                  <div className="flex items-center gap-1.5 mt-2 text-white/30 group-hover:text-white/60 transition-colors text-[10px] sm:text-xs">
                    <span className="group-hover:underline underline-offset-4">View case</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}

          {/* Be the Next CTA Card */}
          <CalendlyButton className="group block bg-[#0A0A0A] p-3 sm:p-4 text-left transition-all duration-300 hover:bg-white/[0.03]">
            <div className="w-full aspect-[16/9] rounded-lg relative overflow-hidden mb-3">
              <img src={seoulSkylineImg} alt="Seoul" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight">Your Project Here</span>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-white/20 text-[9px] sm:text-[10px] uppercase tracking-wider">Next</span>
              <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-[#10B981] transition-colors">
                Enter Korea
              </h3>
              <div className="flex items-center gap-1.5 mt-2 text-white/30 group-hover:text-[#10B981] transition-colors text-[10px] sm:text-xs">
                <span className="group-hover:underline underline-offset-4">Let's talk</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </CalendlyButton>
        </div>
      </section>

      <FooterLinksSection />
      <div className="border-t border-white/10"><Footer /></div>
    </div>
  );
};

export default GTMService;
