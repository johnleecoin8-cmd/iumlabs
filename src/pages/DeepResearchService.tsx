import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterLinksSection from "@/components/FooterLinksSection";
import CalendlyButton from "@/components/CalendlyButton";
import SEOHead from "@/components/SEOHead";
import deepResearchHeroImage from "@/assets/services/deep-research.png";

// Client logos — same as home hero
import bnbLogo from "@/assets/logos/bnb.png";
import kucoinLogo from "@/assets/logos/kucoin.svg";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import bybitLogo from "@/assets/logos/bybit.png";
import peaqLogo from "@/assets/logos/peaq.svg";
import spacecoinLogo from "@/assets/logos/spacecoin.png";
import triaLogo from "@/assets/logos/tria-official.png";
import mantraLogo from "@/assets/logos/mantra.png";
import saharaAiLogo from "@/assets/logos/sahara-ai.png";
import fogoLogo from "@/assets/logos/fogo.png";
import synfuturesLogo from "@/assets/logos/synfutures.png";
import aptosLogo from "@/assets/logos/aptos.png";
import kiteLogo from "@/assets/logos/kite.png";

const clientLogos = [
  { name: "BNB", logo: bnbLogo, noInvert: false, slug: "bnb-chain" },
  { name: "KuCoin", logo: kucoinLogo, noInvert: true, slug: "kucoin" },
  { name: "Polygon", logo: polygonLogo, noInvert: false, slug: "polygon" },
  { name: "Ondo Finance", logo: ondoLogo, noInvert: false, slug: "ondo" },
  { name: "Bybit", logo: bybitLogo, noInvert: false, slug: "bybit" },
  { name: "Peaq", logo: peaqLogo, noInvert: true, slug: "peaq" },
  { name: "Spacecoin", logo: spacecoinLogo, noInvert: true, slug: "spacecoin" },
  { name: "Tria", logo: triaLogo, noInvert: true, slug: "tria" },
  { name: "Mantra", logo: mantraLogo, noInvert: true, slug: "mantra" },
  { name: "Sahara AI", logo: saharaAiLogo, noInvert: true, slug: "sahara-ai" },
  { name: "FOGO", logo: fogoLogo, noInvert: true, slug: "fogo" },
  { name: "SynFutures", logo: synfuturesLogo, noInvert: true, slug: "synfutures" },
  { name: "Aptos", logo: aptosLogo, noInvert: true, slug: "aptos" },
  { name: "Kite", logo: kiteLogo, noInvert: true, slug: "kite" },
];

const serviceBreakdown = [
  {
    num: "01", title: "Market Analysis",
    desc: "Korean exchange volume mapping, retail sentiment tracking, Naver/DC Inside trend monitoring, and ecosystem sizing for your vertical.",
    tags: ["Upbit", "Bithumb", "Naver Trends"],
  },
  {
    num: "02", title: "Competitor Research",
    desc: "Share-of-voice analysis, community size benchmarking, KOL overlap mapping, and positioning gap identification across Korean channels.",
    tags: ["Benchmarking", "SOV", "Gap Analysis"],
  },
  {
    num: "03", title: "On-chain Analytics",
    desc: "Korean wallet profiling, Dune dashboards, DEX/CEX flow tracking, and whale movement alerts tailored to your protocol.",
    tags: ["Dune", "On-chain", "Wallet Profiling"],
  },
  {
    num: "04", title: "Investment Thesis",
    desc: "Investor-grade reports for Korean VCs and family offices. Tokenomics review, market fit analysis, and competitive moat documentation.",
    tags: ["Tokenomics", "VC-Ready", "Market Fit"],
  },
  {
    num: "05", title: "Trend Reports",
    desc: "Monthly and quarterly deep dives on Korean crypto trends — narrative shifts, regulatory updates, retail behavior changes, and alpha signals.",
    tags: ["Monthly Alpha", "Quarterly Review", "Signals"],
  },
  {
    num: "06", title: "Distribution",
    desc: "Research amplification through 12+ media partners, KOL review threads, executive briefings, and CoinDesk Korea syndication.",
    tags: ["CoinDesk KR", "KOL Threads", "Syndication"],
  },
];

const processSteps = [
  { num: "01", title: "Discovery", desc: "Protocol deep-dive, stakeholder interviews, and research scope definition. We learn your tech, your thesis, and what you need to prove.", time: "Week 1" },
  { num: "02", title: "Analysis", desc: "On-chain data mining, Korean sentiment mapping, competitor benchmarking, and ecosystem sizing. Raw intelligence, no filler.", time: "Week 2–3" },
  { num: "03", title: "Creation", desc: "Transform complex data into polished, bilingual reports (KR/EN). Visual dashboards, executive summaries, and full technical appendices.", time: "Week 3–4" },
  { num: "04", title: "Distribution", desc: "Syndicate across our media network, KOL review threads, investor briefings, and community channels. Maximum visibility, sustained authority.", time: "Week 4+" },
];

const caseStudies = [
  { slug: "bnb-chain", category: "L1 Ecosystem Report", metric: "850K+", label: "Impressions generated from a single Korean market deep-dive distributed across 12 media partners" },
  { slug: "mantra", category: "Investment Thesis", metric: "$50M+", label: "Institutional pipeline influenced through investor-grade Korean market research and BD introductions" },
  { slug: "ondo", category: "RWA Market Analysis", metric: "47", label: "Research reports delivered across DeFi, L1, RWA, and infrastructure verticals for Korean audiences" },
];

const DeepResearchService = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <SEOHead
        title="Web3 Deep Research & Market Intelligence Korea | ium Labs"
        description="Data-driven Web3 market research and competitive intelligence for the Korean crypto market. On-chain analytics, competitor research, and investment thesis support."
        path="/services/deep-research"
        keywords={['Web3 Research Korea', 'Crypto Market Intelligence', 'Korean Market Research Web3', 'Blockchain Analytics Korea', 'On-chain Analysis Korea']}
      />
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <img src={deepResearchHeroImage} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.15)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-[#0A0A0A]" />
        <div className="relative z-10 px-4 sm:px-8 text-center max-w-5xl mx-auto pt-24">
          <p className="text-[10px] text-white/20 tracking-[0.3em] uppercase mb-6">Deep Research & Analytics</p>
          <h1 className="font-sans text-[2.2rem] sm:text-[4rem] md:text-[6rem] font-black text-white leading-[0.92] tracking-[-0.04em] mb-6">
            Know Korea.<br />
            <span className="text-white/30">Before you enter it.</span>
          </h1>
          <p className="text-sm sm:text-lg text-white/40 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            On-the-ground intelligence meets on-chain analytics. Data-driven research and distribution that builds authority in the world's #2 crypto market.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <CalendlyButton className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,255,255,0.12)] transition-all">
              Book Research Briefing
            </CalendlyButton>
            <Link to="/projects" className="inline-flex items-center gap-2 px-8 py-4 border border-white/[0.1] text-white/40 text-sm rounded-full hover:border-white/[0.2] hover:text-white/70 transition-all">
              See Our Work <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== LOGO MARQUEE ===== */}
      <div className="py-4 sm:py-6 overflow-hidden border-y border-white/[0.04]">
        <div className="flex items-center logo-marquee-slow">
          {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((client, index) => (
            <Link key={index} to={`/projects/${client.slug}`} className="flex items-center gap-2 sm:gap-3 mx-1 sm:mx-2 px-4 sm:px-6 py-2.5 sm:py-3.5 bg-zinc-900/80 rounded-full border border-white/15 hover:border-white/25 hover:bg-zinc-800/80 transition-all duration-300 flex-shrink-0">
              <img src={client.logo} alt={client.name} loading="lazy" decoding="async" className={`h-4 sm:h-7 w-auto max-w-[70px] sm:max-w-[140px] object-contain flex-shrink-0 ${client.noInvert ? 'opacity-90' : 'brightness-0 invert opacity-85'}`} />
              <span className="text-white/75 text-[11px] sm:text-sm font-medium whitespace-nowrap">{client.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ===== STATS ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {[
            { value: "47", label: "Reports Delivered" },
            { value: "12+", label: "Distribution Partners" },
            { value: "850K+", label: "Total Impressions" },
            { value: "3.2%", label: "Avg. Engagement Rate" },
          ].map((stat, i) => (
            <div key={i} className="py-8 sm:py-12 text-center border-r border-white/[0.04] last:border-r-0">
              <div className="text-3xl sm:text-5xl font-black text-white tracking-tighter">{stat.value}</div>
              <div className="text-[10px] text-white/20 tracking-[0.15em] uppercase mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== THE PROBLEM ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20 text-center">
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-[1.05] tracking-tight">
          Global research doesn't work<br />
          <span className="text-white/20">in a local market.</span>
        </h2>
        <p className="text-sm sm:text-base text-white/30 leading-relaxed max-w-2xl mx-auto">
          Korea's crypto market has its own dynamics — Upbit dominance, Naver-driven discovery, KakaoTalk alpha groups, DC Inside sentiment shifts. Generic CoinGecko data and English-only reports miss the signal entirely. You need analysts who read the Korean boards, track the local wallets, and understand what moves this market before it moves.
        </p>
      </section>

      {/* ===== SERVICE BREAKDOWN — numbered rows ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20">
        <div className="text-center mb-14">
          <p className="text-[10px] text-white/15 tracking-[0.3em] uppercase mb-4">Research Capabilities</p>
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-[1.05] tracking-tight">
            6 pillars. <span className="text-white/20">One intelligence engine.</span>
          </h2>
        </div>
        <div className="flex flex-col">
          {serviceBreakdown.map((svc) => (
            <div
              key={svc.num}
              className="group grid grid-cols-[40px_1fr] lg:grid-cols-[60px_240px_1fr_auto] gap-3 lg:gap-6 items-center py-5 sm:py-7 border-t border-white/[0.04] last:border-b last:border-white/[0.04] relative transition-all hover:bg-white/[0.015]"
            >
              <span className="text-[11px] text-white/10 font-mono group-hover:text-white/30 transition-colors">
                {svc.num}
              </span>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white/80 group-hover:text-white transition-colors tracking-tight">
                {svc.title}
              </h3>
              <p className="hidden lg:block text-[13px] text-white/25 leading-relaxed group-hover:text-white/40 transition-colors">
                {svc.desc}
              </p>
              <div className="hidden lg:flex items-center gap-2">
                {svc.tags.map(tag => (
                  <span key={tag} className="text-[9px] px-2 py-0.5 border border-white/[0.05] rounded-full text-white/15 group-hover:border-white/[0.1] group-hover:text-white/30 transition-all whitespace-nowrap">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20 bg-[#0c0c0e]">
        <div className="text-center mb-14">
          <p className="text-[10px] text-white/15 tracking-[0.3em] uppercase mb-4">How We Work</p>
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-[1.05] tracking-tight">
            From raw data to <span className="text-white/20">market authority</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 relative">
          <div className="hidden lg:block absolute top-4 left-[60px] right-[60px] h-px bg-white/[0.04]" />
          {processSteps.map((step, i) => (
            <div key={i} className="group lg:px-6 relative">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2.5 h-2.5 rounded-full bg-white/10 group-hover:bg-white/40 transition-all relative z-10" />
                <span className="text-[10px] text-white/15 tracking-[0.15em] uppercase group-hover:text-white/30 transition-colors">{step.num}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{step.title}</h3>
              <p className="text-[13px] text-white/25 leading-relaxed mb-4">{step.desc}</p>
              <span className="text-[10px] text-white/20 px-2.5 py-1 border border-white/[0.06] rounded-full">{step.time}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CASE STUDIES ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20">
        <div className="text-center mb-12">
          <p className="text-[10px] text-white/15 tracking-[0.3em] uppercase mb-4">Results</p>
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-[1.05] tracking-tight">
            Research that <span className="text-white/20">drove decisions</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">
          {caseStudies.map((cs) => (
            <Link
              key={cs.slug}
              to={`/projects/${cs.slug}`}
              onClick={() => window.scrollTo(0, 0)}
              className="group block border border-white/[0.04] rounded-2xl p-7 sm:p-9 hover:border-white/[0.08] hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-[9px] text-white/15 tracking-[0.12em] uppercase block pb-5 mb-5 border-b border-white/[0.04]">{cs.category}</span>
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tighter mb-3">{cs.metric}</div>
              <p className="text-[13px] text-white/30 leading-relaxed mb-5">{cs.label}</p>
              <span className="text-[11px] text-white/15 group-hover:text-white/40 transition-colors">
                Read case study →
              </span>
            </Link>
          ))}
        </div>
        <div className="text-center">
          <Link to="/projects" className="text-sm text-white/20 hover:text-white/50 transition-colors">
            View all projects →
          </Link>
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20 bg-[#0c0c0e]">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-[1.05] tracking-tight">
            Why ium Labs
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.03] max-w-4xl mx-auto">
          {[
            { title: "Local-first intelligence", desc: "Our analysts live in the Korean ecosystem daily — tracking Naver trends, DC Inside threads, KakaoTalk alpha groups, and Korean CT before it hits global feeds." },
            { title: "On-chain meets on-ground", desc: "We combine Dune dashboards and wallet profiling with qualitative local sentiment. Data without context is noise — we provide both." },
            { title: "Distribution built in", desc: "Research without reach is a PDF on a shelf. Every report ships with a distribution plan across 12+ media partners and KOL amplification channels." },
            { title: "Investor-grade output", desc: "Our reports are used by Korean VCs, family offices, and institutional desks. Rigorous methodology, clean design, bilingual delivery." },
          ].map((card, i) => (
            <div key={i} className="bg-[#0c0c0e] p-7 sm:p-10 group hover:bg-[#111] transition-all cursor-default">
              <h3 className="text-sm sm:text-base font-bold text-white mb-3 tracking-tight">{card.title}</h3>
              <p className="text-[13px] text-white/25 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight text-center mb-10">FAQ</h2>
        <div className="max-w-3xl mx-auto">
          {[
            { q: "What makes your research different?", a: "We don't do generic summaries. We combine on-chain data with local market sentiment that you won't find on Google. It's boots-on-the-ground intelligence from analysts embedded in the Korean ecosystem." },
            { q: "Can you write in both Korean and English?", a: "Yes. Every report is crafted to be native in both languages, ensuring your global team and local Korean community are on the same page." },
            { q: "How do you ensure people actually read the research?", a: "Distribution is built into every engagement. We don't just deliver a PDF — we create media articles, KOL review threads, and executive briefings that make the research digestible and viral." },
            { q: "How long does a full report take?", a: "Typically 2 to 4 weeks depending on scope. Market analysis and competitor research run faster. Full investment thesis reports with on-chain analytics take the full cycle." },
          ].map((item, i) => (
            <div key={i} className="py-6 sm:py-8 border-b border-white/[0.04] first:border-t cursor-default">
              <p className="text-sm sm:text-base font-semibold text-white mb-2">{item.q}</p>
              <p className="text-[13px] text-white/25 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-24 sm:py-36 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.015] blur-3xl pointer-events-none" />
        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white leading-[0.92] tracking-[-0.04em] mb-5 relative z-10">
          Know the market<br /><span className="text-white/25">before you move.</span>
        </h2>
        <p className="text-sm sm:text-base text-white/25 max-w-lg mx-auto mb-10 relative z-10 leading-relaxed">
          30-minute research briefing. We'll scope your intelligence needs — market analysis, competitor mapping, on-chain profiling. Data first.
        </p>
        <CalendlyButton className="inline-flex items-center gap-2 px-9 py-4 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(255,255,255,0.1)] transition-all relative z-10">
          Book Research Briefing <ArrowRight className="w-4 h-4" />
        </CalendlyButton>
      </section>

      <FooterLinksSection />
      <div className="border-t border-white/[0.04]"><Footer /></div>
    </div>
  );
};

export default DeepResearchService;
