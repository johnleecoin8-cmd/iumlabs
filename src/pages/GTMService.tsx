import { Link } from "react-router-dom";
import { ArrowRight, X, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterLinksSection from "@/components/FooterLinksSection";
import CalendlyButton from "@/components/CalendlyButton";
import SEOHead from "@/components/SEOHead";
import gtmHeroImage from "@/assets/services/gtm-hero.avif";
import { projectsData } from "@/data/projectsData";

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
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-4">
            Korea Market Entry<br />Strategy & Execution
          </h1>
          <p className="text-base sm:text-lg text-white/50 max-w-2xl mb-6">
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
              19+ projects launched. $7B+ in combined client valuation.
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

      {/* ===== 5. Who This Is For ===== */}
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

      {/* ===== 6. Full-width mood image ===== */}
      <section className="px-3 sm:px-4 pb-8">
        <div className="relative rounded-2xl overflow-hidden aspect-[21/6]">
          <img src={gtmHeroImage} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.4) saturate(0.8)" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-xl sm:text-3xl lg:text-4xl font-bold text-white/80 text-center tracking-tight px-4">
              19+ projects. $7B+ valuation. One team in Seoul.
            </p>
          </div>
        </div>
      </section>

      {/* ===== 7. What We Deliver ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-8">What we deliver</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {[
              { n: "01", title: "Analyze", desc: "Competitor SOV analysis, on-chain wallet profiling, market opportunity mapping, regulatory landscape review." },
              { n: "02", title: "Build", desc: "Korea-fit narrative, community infrastructure (Telegram/Discord/KakaoTalk), Naver/Kakao integration, brand localization." },
              { n: "03", title: "Launch", desc: "Tier-1 media coverage (BlockMedia, CoinDesk Korea), verified KOL deployment, viral campaign execution, AMA hosting." },
              { n: "04", title: "Scale", desc: "Exchange listing support (Upbit, Bithumb), offline events in Seoul, ambassador programs, retention & analytics." },
            ].map((step) => (
              <div key={step.n} className="flex gap-4">
                <span className="text-2xl font-black tracking-tighter text-[#10B981]/30 pt-0.5">{step.n}</span>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1">{step.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-6">
            {[
              { title: "Market Intelligence", items: ["Competitive landscape & SOV report", "On-chain wallet behavior analysis", "Market opportunity mapping", "Regulatory compliance guidance"] },
              { title: "Launch Package", items: ["Korea-fit brand narrative", "Community infrastructure (TG, Discord, KakaoTalk)", "KOL campaign strategy & execution", "Media coverage plan"] },
              { title: "Growth & Scale", items: ["Exchange listing strategy", "Offline event production in Seoul", "Ambassador program setup", "Monthly performance analytics"] },
            ].map((d) => (
              <div key={d.title}>
                <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />{d.title}
                </h3>
                <ul className="space-y-1">
                  {d.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[13px] text-white/40 leading-relaxed">
                      <span className="text-white/15">—</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 8. Case Studies — horizontal scroll ===== */}
      <section className="pb-14 sm:pb-20">
        <div className="flex items-center justify-between mb-6 px-4 sm:px-8 lg:px-14">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Results</h2>
          <Link to="/projects" className="text-xs text-white/30 hover:text-white transition-colors">
            All projects <ArrowRight className="w-3 h-3 inline" />
          </Link>
        </div>
        <div className="flex gap-3 sm:gap-4 overflow-x-auto px-4 sm:px-8 lg:px-14 pb-4 snap-x snap-mandatory scrollbar-hide">
          {[
            ...caseStudies,
            { slug: "polygon", result: "200+ Developers", detail: "L2 hackathon and developer incentive program in Korea" },
            { slug: "sahara-ai", result: "400+ Attendees", detail: "AI launch events with Korean developer community" },
          ].map((cs) => {
            const project = projectsData[cs.slug];
            return (
              <Link
                key={cs.slug}
                to={`/projects/${cs.slug}`}
                className="group block relative flex-shrink-0 w-[75vw] sm:w-[45vw] lg:w-[30vw] rounded-2xl overflow-hidden aspect-[4/3] snap-start"
              >
                <img src={project?.bgImage || ''} alt={project?.name || ''} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <div className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">{cs.result}</div>
                  <h3 className="text-sm font-medium text-white/70">{project?.name}</h3>
                  <p className="text-xs text-white/40 mt-1.5 line-clamp-2">{cs.detail}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== 9. FAQ ===== */}
      <section className="px-4 sm:px-8 lg:px-14 pb-14 sm:pb-20">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">FAQ</h2>
        <div className="max-w-3xl space-y-5">
          {[
            { q: "What makes Korean GTM different?", a: "Korea is trust-first, retail-driven. Projects need native community managers, localized narratives, local KOLs — not translated global campaigns. We handle all of this in-house from Seoul." },
            { q: "How long does a Korea launch take?", a: "Focused launch: 2-3 weeks. Full GTM engagement: 2-3 months covering analysis, community, KOL, PR, events, and exchange strategy." },
            { q: "Do you help with exchange listings?", a: "Yes. Direct relationships with Upbit, Bithumb, Coinone, GOPAX. We handle applications, documentation, compliance, and post-listing marketing." },
            { q: "What's the budget range?", a: "Focused campaigns start at $15K/month. Full-stack GTM (PR + community + KOL + events + exchange) runs $30K–$50K/month." },
          ].map((item, i) => (
            <div key={i}>
              <p className="text-sm font-semibold text-white mb-1">{item.q}</p>
              <p className="text-sm text-white/40 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 10. CTA ===== */}
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

      <FooterLinksSection />
      <div className="border-t border-white/10"><Footer /></div>
    </div>
  );
};

export default GTMService;
