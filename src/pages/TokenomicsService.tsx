import { useEffect, useRef, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import ServiceSchema from "@/components/ServiceSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ContactFormSection from "@/components/ContactFormSection";
import ServiceNav from "@/components/ServiceNav";
import FooterLinksSection from "@/components/FooterLinksSection";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "@/assets/services/tokenomics-allocation.svg";
import distImg from "@/assets/platforms/res-onchain.jpg";
import floatImg from "@/assets/platforms/res-market.jpg";
import unlockImg from "@/assets/platforms/seo-report.jpg";
import utilityImg from "@/assets/platforms/res-thesis.jpg";
import emissionImg from "@/assets/platforms/seo-analytics.jpg";
import fdvImg from "@/assets/platforms/pr-analytics.jpg";
import "./ServiceDetail.css";
gsap.registerPlugin(ScrollTrigger);

const TokenomicsService = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openCap, setOpenCap] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleCap = useCallback((i: number) => setOpenCap(p => p === i ? null : i), []);
  const toggleFaq = useCallback((i: number) => setOpenFaq(p => p === i ? null : i), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".svc-detail .hero-label", { opacity: 0, y: 20, duration: .8, delay: .2 });
      gsap.from(".svc-detail .hero h1", { opacity: 0, y: 50, duration: 1.2, delay: .3, ease: "power3.out" });
      gsap.from(".svc-detail .hero-desc", { opacity: 0, y: 30, duration: 1, delay: .7 });
      gsap.from(".svc-detail .hero-stats-bar .stat", { opacity: 0, y: 20, duration: .8, delay: .9, stagger: .1 });
      gsap.utils.toArray<HTMLElement>(".svc-detail .lbl,.svc-detail .stat,.svc-detail .problem-left,.svc-detail .problem-right,.svc-detail .cap-block,.svc-detail .proc-step,.svc-detail .tier-card,.svc-detail .plat,.svc-detail .case-split,.svc-detail .faq-item,.svc-detail .invite h2,.svc-detail .invite-kr,.svc-detail .highlight-box").forEach(el => {
        gsap.from(el, { y: 40, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" }});
      });
    }, containerRef);
    return () => { ctx.revert(); };
  }, []);

  return (
    <div className="svc-detail" ref={containerRef}>
      <SEOHead title="Crypto Tokenomics Design for Korea | ium Labs" description="Token supply, distribution, vesting, unlocks, utility, and FDV — engineered for how the Korean market actually behaves and built disclosure-ready for exchange review." path="/services/tokenomics" image={heroImg} keywords={["crypto tokenomics Korea","token distribution design","token unlock schedule","token float planning","FDV valuation crypto","token utility design"]} />
      <ServiceSchema name="Tokenomics Design" description="Token supply, distribution, vesting, unlock, utility, and FDV design tuned for the Korean retail market and built disclosure-ready for exchange listing review." url="/services/tokenomics" serviceType={["Tokenomics Advisory", "Token Distribution Design", "Token Valuation"]} />
      <BreadcrumbSchema items={[{ name: "ium Labs", url: "https://iumlabs.io/" }, { name: "Services", url: "https://iumlabs.io/services/gtm" }, { name: "Tokenomics", url: "https://iumlabs.io/services/tokenomics" }]} />
      <Navbar />

      <section className="hero">
        <img src={heroImg} alt="" className="hero-bg" width={1200} height={800} /><div className="hero-overlay" />
        <div className="hero-center">
          <h1>Token <strong>Economics</strong></h1>
          <p className="hero-desc">Korean retail trades the float and the unlock, not the whitepaper. We engineer your token's supply, distribution, vesting, utility, and valuation for how this market actually behaves — and build it disclosure-ready so it stands up to exchange review.</p>
        </div>
        <div className="hero-stats-bar">
          <div className="stat"><div className="stat-val">Float</div><div className="stat-sub">Sized for Price Discovery</div></div>
          <div className="stat"><div className="stat-val">Unlock</div><div className="stat-sub">Modeled vs Supply Shock</div></div>
          <div className="stat"><div className="stat-val">Utility</div><div className="stat-sub">Value-Accrual by Design</div></div>
          <div className="stat"><div className="stat-val">FDV</div><div className="stat-sub">Korea-Comparable Benchmarks</div></div>
        </div>
      </section>

      <section className="problem"><div className="wrap">
        <div className="lbl">The Problem</div>
        <div className="problem-grid">
          <div className="problem-left"><h2>The same token can moon or bleed — it's the <strong>float and the unlock.</strong></h2></div>
          <div className="problem-right">
            <p>Korean retail is unusually sensitive to circulating float and unlock schedules. A thin float spikes and then craters on the first cliff; a concentrated or opaque distribution is both a day-one price risk and, under the 2024–2025 rules, a delisting trigger. Get the supply structure wrong and even a flawless campaign bleeds out.</p>
            <p>And a token still has to be worth holding. Without real utility, value accrual, and a defensible FDV, the bid disappears once the launch noise fades. We design the whole economic structure — supply, unlocks, utility, and valuation — so the token holds up long after listing day.</p>
          </div>
        </div>
      </div></section>

      <section className="capabilities"><div className="wrap">
        <div className="lbl">What We Do</div>
        {[
          { icon: "◎", title: "Distribution & Allocation Design", desc: "Allocation across team, investors, community, treasury, and liquidity — structured to read as credible to Korean retail and to pass the issuer-transparency and distribution scrutiny exchanges now apply.", img: distImg },
          { icon: "◉", title: "Float & Circulating-Supply Planning", desc: "How much circulating supply hits the book at launch, and how it grows. We size the initial float for healthy price discovery instead of a thin-float spike that craters on the first unlock.", img: floatImg },
          { icon: "◈", title: "Vesting & Unlock Scheduling", desc: "Cliff and unlock schedules modeled against the Korean market's sensitivity to supply shocks — so unlocks land as non-events, not sell-side avalanches.", img: unlockImg },
          { icon: "◆", title: "Utility & Value Accrual", desc: "Why the token is worth holding: fees, staking, governance, burns and buybacks. We design real demand sinks and value-accrual mechanics, not a governance token with nowhere for value to go.", img: utilityImg },
          { icon: "◇", title: "Emission & Inflation Modeling", desc: "Long-term emission curves, staking rewards, and inflation control modeled over years — so incentives fund growth without quietly debasing every holder.", img: emissionImg },
          { icon: "◐", title: "Valuation & FDV Benchmarking", desc: "Launch valuation and FDV sanity-checked against Korean-market comparables — priced to leave upside for the market, not to top-tick your own listing.", img: fdvImg },
        ].map((cap, i) => (
          <div key={i} className={`cap-block${openCap === i ? " open" : ""}`}>
            <div className="cap-head" role="button" tabIndex={0} onClick={() => toggleCap(i)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCap(i); } }} aria-expanded={openCap === i}><div className="cap-icon">{cap.icon}</div><div className="cap-title">{cap.title}</div><div className="cap-toggle">+</div></div>
            <div className="cap-body"><div className="cap-inner"><div /><div className="cap-desc">{cap.desc}</div><div className="cap-img"><img src={cap.img} alt={cap.title} width={600} height={400} /></div></div></div>
          </div>
        ))}
      </div></section>

      <section className="svc-process"><div className="wrap">
        <div className="lbl">How It Works</div>
        <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(1.8rem,3vw,2.5rem)", letterSpacing: "-.02em" }}>Supply, unlocks, and value — <strong>designed for Korea.</strong></h2>
        <div className="proc-grid">
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase I</div><div className="proc-title">Audit & Benchmark</div><div className="proc-text">Review current tokenomics against Korean-market comparables and the new listing criteria.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase II</div><div className="proc-title">Supply & Allocation</div><div className="proc-text">Design distribution, float, and unlock schedules for healthy price discovery and disclosure-readiness.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase III</div><div className="proc-title">Utility & Valuation</div><div className="proc-text">Engineer value-accrual mechanics and benchmark FDV against Korean comparables.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase IV</div><div className="proc-title">Disclosure Handoff</div><div className="proc-text">Deliver disclosure-ready supply tables straight into the CEX listing dossier and GTM plan.</div></div>
        </div>
      </div></section>

      <section className="faq"><div className="wrap">
        <div className="lbl">FAQ</div>
        {[
          { q: "How is this different from your CEX Listing Advisory?", a: "Tokenomics designs the token's economic structure — supply, distribution, unlocks, utility, and valuation. CEX Listing Advisory handles the exchange-facing process — readiness, application packaging, the securities legal opinion, KRW-vs-BTC sequencing, and relations. Tokenomics produces the disclosure-ready supply tables the listing application needs; the two hand off cleanly but don't overlap." },
          { q: "Do you redesign existing tokenomics or only new launches?", a: "Both. For pre-launch projects we design from scratch; for live tokens we optimize float, unlock cadence, and value-accrual mechanics ahead of a Korea entry. The goal is a structure that survives Korean retail behavior and the new exchange criteria." },
          { q: "Why does the Korean market need its own tokenomics view?", a: "Korean retail is unusually sensitive to float and unlocks, and the 2024–2025 listing rules explicitly penalize concentrated distribution and post-listing pumps. A globally 'fine' structure can still misfire here — both on price and on listing eligibility." },
          { q: "Do you cover utility and valuation, not just supply tables?", a: "Yes. Supply design is necessary but not sufficient. We engineer real demand sinks and value-accrual mechanics, and we sanity-check launch FDV against Korean-market comparables so the token has a reason to be held after the launch noise fades." },
        ].map((faq, i) => (
          <div key={i} className={`faq-item${openFaq === i ? " open" : ""}`}>
            <div className="faq-q" role="button" tabIndex={0} onClick={() => toggleFaq(i)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFaq(i); } }} aria-expanded={openFaq === i}><h4>{faq.q}</h4><span className="fq-t">+</span></div>
            <div className="faq-a"><p>{faq.a}</p></div>
          </div>
        ))}
      </div></section>

      <section className="svc-footer">
        <ServiceNav />
        <ContactFormSection />
        <FooterLinksSection />
        <Footer />
      </section>
    </div>
  );
};
export default TokenomicsService;
