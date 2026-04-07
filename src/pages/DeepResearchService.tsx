import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CalendlyButton from "@/components/CalendlyButton";
import SEOHead from "@/components/SEOHead";
import ServiceSchema from "@/components/ServiceSchema";
import { brand } from "@/config/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "@/assets/services/deep-research-blog.jpg";
import capImg1 from "@/assets/platforms/res-market.jpg";
import capImg2 from "@/assets/platforms/res-onchain.jpg";
import capImg3 from "@/assets/platforms/res-competitor.jpg";
import capImg4 from "@/assets/platforms/res-trend.jpg";
import capImg5 from "@/assets/platforms/res-thesis.jpg";
import capImg6 from "@/assets/platforms/res-distribution.jpg";
import "./ServiceDetail.css";
gsap.registerPlugin(ScrollTrigger);

const DeepResearchService = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
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
    const tick = () => { if (clockRef.current) clockRef.current.textContent = `Seoul ${new Date().toLocaleString("en-US",{timeZone:"Asia/Seoul",hour:"2-digit",minute:"2-digit",hour12:false})}`; };
    tick(); const ci = setInterval(tick, 60000);
    return () => { ctx.revert(); clearInterval(ci); };
  }, []);

  return (
    <div className="svc-detail" ref={containerRef}>
      <SEOHead title="Korea Deep Research | ium Labs" description="Data-driven Korean market intelligence. On-chain analytics, competitor analysis, market reports." path="/services/deep-research" keywords={["Korea Crypto Research","Web3 Market Intelligence"]} />
      <ServiceSchema name="Korea Deep Research" description="Data-driven Korean market intelligence. On-chain analytics, competitor analysis, market reports." url="/services/deep-research" serviceType={["Market Research", "On-chain Analytics", "Competitor Analysis"]} />
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <img src={heroImg} alt="" className="hero-bg" /><div className="hero-overlay" />
        <div className="hero-center">
          <div className="hero-label">Service 06 of 08</div>
          <h1>Deep <strong>Research</strong></h1>
          <p className="hero-desc">On-chain analytics, competitor analysis, market ecosystem mapping. Reports in Korean and English, distributed through our media network. Intelligence you can't get from a dashboard.</p>
        </div>
        <div className="hero-stats-bar">
          <div className="stat"><div className="stat-val">47</div><div className="stat-sub">Reports</div></div>
          <div className="stat"><div className="stat-val">12+</div><div className="stat-sub">Partners</div></div>
          <div className="stat"><div className="stat-val">850K+</div><div className="stat-sub">Impressions</div></div>
          <div className="stat"><div className="stat-val">3.2%</div><div className="stat-sub">Engagement</div></div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="problem"><div className="wrap">
        <div className="lbl">The Problem</div>
        <div className="problem-grid">
          <div className="problem-left"><h2>Global research firms don't understand <strong>Korean crypto.</strong></h2></div>
          <div className="problem-right">
            <p>The Upbit premium, DC Inside sentiment, Naver search trends, KakaoTalk group dynamics — these signals are invisible to anyone not operating inside the ecosystem daily. Global research firms give you generic Asia-Pacific reports that lump Korea in with Japan and Southeast Asia.</p>
            <p>Korea is the third largest crypto market in the world. It deserves dedicated intelligence — not a footnote in a regional deck. Our research combines on-chain data with on-the-ground intelligence you can't get from a dashboard.</p>
          </div>
        </div>
      </div></section>

      {/* CAPABILITIES */}
      <section className="capabilities"><div className="wrap">
        <div className="lbl">What We Do</div>
        {[
          { icon: "◎", img: capImg1, title: "Market Mapping", desc: "Complete Korean ecosystem analysis — exchanges, KOLs, media outlets, communities, regulations, and competitive positioning. Understand the full landscape before you enter." },
          { icon: "◉", img: capImg2, title: "On-chain Analytics", desc: "Dune, Nansen, Arkham data combined with Korean-specific signals. Wallet analysis, flow tracking, and protocol usage patterns unique to the Korean market." },
          { icon: "◈", img: capImg3, title: "Competitor Analysis", desc: "Deep-dive into how competing protocols are positioned in Korea. Their KOL relationships, community size, exchange presence, and narrative strengths and weaknesses." },
          { icon: "◆", img: capImg4, title: "Investment Thesis", desc: "Investor-grade market entry analysis. Due diligence packages, TAM sizing for Korean market, regulatory landscape, and go-to-market feasibility assessments." },
          { icon: "◇", img: capImg5, title: "Trend Reports", desc: "Monthly and quarterly reports on Korean crypto trends — what's gaining traction, which narratives are resonating, where retail attention is flowing." },
          { icon: "◐", img: capImg6, title: "Distribution", desc: "Reports distributed through our Korean media and KOL network. Bilingual publication ensures maximum reach across both Korean and international audiences." },
        ].map((cap, i) => (
          <div key={i} className={`cap-block${openCap === i ? " open" : ""}`}>
            <div className="cap-head" role="button" tabIndex={0} onClick={() => toggleCap(i)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCap(i); } }} aria-expanded={openCap === i}>
              <div className="cap-icon">{cap.icon}</div>
              <div className="cap-title">{cap.title}</div>
              <div className="cap-toggle">+</div>
            </div>
            <div className="cap-body"><div className="cap-inner"><div /><div className="cap-desc">{cap.desc}</div><div className="cap-img"><img src={cap.img} alt={cap.title} /></div></div></div>
          </div>
        ))}
      </div></section>

      {/* PROCESS */}
      <section className="svc-process"><div className="wrap">
        <div className="lbl">How It Works</div>
        <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(1.8rem,3vw,2.5rem)", letterSpacing: "-.02em" }}>From question to <strong>actionable intelligence.</strong></h2>
        <div className="proc-grid">
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase 1</div><div className="proc-title">Discovery</div><div className="proc-text">Define research objectives, scope, and key questions. Align on deliverable format and timeline.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase 2</div><div className="proc-title">Analysis</div><div className="proc-text">On-chain data collection, Korean media monitoring, community sentiment analysis, expert interviews.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase 3</div><div className="proc-title">Creation</div><div className="proc-text">Synthesize findings into investor-grade reports. Bilingual drafts reviewed by Korean market specialists.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase 4</div><div className="proc-title">Distribution</div><div className="proc-text">Publish through Korean media partners, KOL network, and client channels. Track reach and engagement.</div></div>
        </div>
      </div></section>

      {/* REPORT TYPES */}

      {/* FAQ */}
      <section className="faq"><div className="wrap">
        <div className="lbl">FAQ</div>
        {[
          { q: "How long does a typical research report take?", a: "Market entry thesis reports take 3-4 weeks. Competitor decks and tokenomics reviews take 2-3 weeks. Monthly trend reports are delivered on a recurring schedule." },
          { q: "Are reports delivered in both Korean and English?", a: "Yes. All reports are produced bilingually. The Korean version is optimized for local distribution, while the English version is structured for international stakeholders and investors." },
          { q: "How do you distribute the research?", a: "Through our network of 12+ Korean media partners and KOL relationships. Reports are published as articles, thread summaries, and newsletter features for maximum reach." },
          { q: "Can you produce custom research on specific topics?", a: "Absolutely. Most of our work is custom-scoped. Whether it's a specific competitor deep-dive, regulatory analysis, or community sentiment study, we tailor every engagement." },
        ].map((faq, i) => (
          <div key={i} className={`faq-item${openFaq === i ? " open" : ""}`}>
            <div className="faq-q" role="button" tabIndex={0} onClick={() => toggleFaq(i)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFaq(i); } }} aria-expanded={openFaq === i}><h4>{faq.q}</h4><span className="fq-t">+</span></div>
            <div className="faq-a"><p>{faq.a}</p></div>
          </div>
        ))}
      </div></section>

      {/* INVITE */}
      <section className="invite" id="contact"><div className="invite-inner">
        <div className="invite-right"><Link to="/contact" className="invite-cta">Book a Research Briefing →</Link></div>
      </div></section>
      <footer className="ft-ed"><div className="ft-inner"><div>© 2026 ium labs — Seoul</div><div style={{ display: "flex", alignItems: "center" }}><span ref={clockRef} style={{ marginRight: 12 }} /><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><a href={brand.telegramLink} target="_blank" rel="noopener noreferrer">Telegram</a></div></div></footer>
    </div>
  );
};
export default DeepResearchService;
