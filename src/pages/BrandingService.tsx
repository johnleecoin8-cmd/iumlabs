import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CalendlyButton from "@/components/CalendlyButton";
import SEOHead from "@/components/SEOHead";
import { brand } from "@/config/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "@/assets/services/vasp-compliance.jpg";
import capImg1 from "@/assets/platforms/comp-vasp.jpg";
import capImg2 from "@/assets/platforms/comp-pipa.jpg";
import capImg3 from "@/assets/platforms/comp-aml.jpg";
import capImg4 from "@/assets/platforms/comp-exchange.jpg";
import "./ServiceDetail.css";
gsap.registerPlugin(ScrollTrigger);

const BrandingService = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const [openCap, setOpenCap] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleCap = useCallback((i: number) => setOpenCap(p => p === i ? null : i), []);
  const toggleFaq = useCallback((i: number) => setOpenFaq(p => p === i ? null : i), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".svc-detail .hero-back", { opacity: 0, x: -20, duration: .8, delay: .3 });
      gsap.from(".svc-detail .hero-label", { opacity: 0, y: 20, duration: .8, delay: .4 });
      gsap.from(".svc-detail .hero h1", { opacity: 0, y: 40, duration: 1, delay: .5, ease: "power3.out" });
      gsap.from(".svc-detail .hero-desc", { opacity: 0, y: 30, duration: 1, delay: .9 });
      gsap.utils.toArray<HTMLElement>(".svc-detail .lbl,.svc-detail .stat,.svc-detail .problem-left,.svc-detail .problem-right,.svc-detail .cap-block,.svc-detail .proc-step,.svc-detail .plat,.svc-detail .faq-item,.svc-detail .invite h2,.svc-detail .highlight-box").forEach(el => {
        gsap.from(el, { y: 40, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" }});
      });
    }, containerRef);
    const tick = () => { if (clockRef.current) clockRef.current.textContent = `Seoul ${new Date().toLocaleString("en-US",{timeZone:"Asia/Seoul",hour:"2-digit",minute:"2-digit",hour12:false})}`; };
    tick(); const ci = setInterval(tick, 60000);
    return () => { ctx.revert(); clearInterval(ci); };
  }, []);

  return (
    <div className="svc-detail" ref={containerRef}>
      <SEOHead title="Korea Regulations & Compliance | ium Labs" description="VASP registration, PIPA compliance, regulatory advisory for Korean crypto market." path="/services/compliance" keywords={["Korea Crypto Compliance","VASP Registration Korea"]} />
      <Navbar />

      <section className="hero">
        <img src={heroImg} alt="" className="hero-bg" /><div className="hero-overlay" />
        <div className="hero-grid" /><div className="hero-orb" /><div className="hero-num">09</div>
        <div className="wrap">
          <Link to="/services/gtm" className="hero-back">All Services</Link>
          <div className="hero-label">Service 09 of 09</div>
          <h1>Regulations & <strong>Compliance</strong></h1>
          <p className="hero-desc">In partnership with Law Office Asset and Freeman Law. VASP registration, PIPA compliance, regulatory landscape analysis, and exchange compliance documentation. Navigate Korea's regulations with confidence.</p>
        </div>
      </section>

      <section className="stats"><div className="wrap"><div className="stats-grid">
        <div className="stat"><div className="stat-val">19+</div><div className="stat-sub">Projects Advised</div></div>
        <div className="stat"><div className="stat-val">100%</div><div className="stat-sub">Compliance Rate</div></div>
        <div className="stat"><div className="stat-val">5</div><div className="stat-sub">Regulatory Frameworks</div></div>
        <div className="stat"><div className="stat-val">24h</div><div className="stat-sub">Response Time</div></div>
      </div></div></section>

      <section className="problem"><div className="wrap">
        <div className="lbl">The Problem</div>
        <div className="problem-grid">
          <div className="problem-left"><h2>Korean crypto regulations are <strong>complex and fast-changing.</strong></h2></div>
          <div className="problem-right">
            <p>The Virtual Asset User Protection Act, PIPA personal data requirements, and exchange-specific listing compliance create a regulatory maze that most global projects can't navigate alone.</p>
            <p>DeFi, NFT, and token projects each face different requirements. What worked for an L1 won't work for a DeFi protocol. And the regulations change quarterly — what was compliant 6 months ago might not be today.</p>
          </div>
        </div>
      </div></section>

      <section className="capabilities"><div className="wrap">
        <div className="lbl">What We Do</div>
        {[
          { icon: "◎", img: capImg1, title: "VASP Registration", desc: "Full support for Korean Virtual Asset Service Provider registration. Documentation preparation, application submission, and follow-up with regulatory authorities." },
          { icon: "◉", img: capImg2, title: "PIPA Compliance", desc: "Personal Information Protection Act strategy. Data handling procedures, consent flows, privacy policy drafting, and compliance documentation for Korean law." },
          { icon: "◈", img: capImg3, title: "Exchange Listing Compliance", desc: "Upbit, Bithumb, Coinone listing requirements. Due diligence preparation, compliance documentation, and regulatory review to meet exchange standards." },
          { icon: "◆", img: capImg4, title: "AML/KYC Advisory", desc: "Anti-money laundering and Know Your Customer framework design. Transaction monitoring procedures, suspicious activity reporting, and compliance training." },
          { icon: "◇", img: capImg1, title: "Regulatory Landscape Analysis", desc: "Comprehensive mapping of Korean crypto regulations as they apply to your specific project type. DeFi, NFT, token, and infrastructure projects all face different requirements." },
          { icon: "◐", img: capImg2, title: "Legal Partnership Access", desc: "Direct access to Law Office Asset and Freeman Law for formal legal opinions, regulatory submissions, and litigation support when needed." },
        ].map((cap, i) => (
          <div key={i} className={`cap-block${openCap === i ? " open" : ""}`}>
            <div className="cap-head" onClick={() => toggleCap(i)}><div className="cap-icon">{cap.icon}</div><div className="cap-title">{cap.title}</div><div className="cap-toggle">+</div></div>
            <div className="cap-body"><div className="cap-inner"><div /><div className="cap-desc">{cap.desc}</div><div className="cap-img"><img src={cap.img} alt={cap.title} /></div></div></div>
          </div>
        ))}
      </div></section>

      <section className="svc-process"><div className="wrap">
        <div className="lbl">How It Works</div>
        <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(1.8rem,3vw,2.5rem)", letterSpacing: "-.02em" }}>From assessment to <strong>full compliance.</strong></h2>
        <div className="proc-grid">
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Week 1–2</div><div className="proc-title">Assessment</div><div className="proc-text">Map your project against Korean regulatory framework. Identify compliance gaps and requirements.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Week 2–4</div><div className="proc-title">Strategy</div><div className="proc-text">Develop compliance roadmap. Documentation plan, timeline, and resource requirements.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Week 4–8</div><div className="proc-title">Implementation</div><div className="proc-text">Prepare documentation, submit applications, coordinate with legal partners and regulators.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Ongoing</div><div className="proc-title">Monitoring</div><div className="proc-text">Regulatory change tracking, quarterly compliance reviews, ongoing advisory as regulations evolve.</div></div>
        </div>
      </div></section>

      <section className="faq"><div className="wrap">
        <div className="lbl">FAQ</div>
        {[
          { q: "How long does VASP registration take?", a: "Assessment takes 1-2 weeks. Full registration support typically runs 4-8 weeks depending on your project's complexity and current compliance state." },
          { q: "Do you provide legal opinions?", a: "Through our partnerships with Law Office Asset and Freeman Law, we can provide formal legal opinions and regulatory submissions. Our advisory covers both strategic guidance and formal legal work." },
          { q: "Is compliance different for DeFi vs token projects?", a: "Yes, significantly. DeFi protocols face different requirements than token issuers, NFT projects, or infrastructure providers. We map the specific regulatory framework that applies to your project type." },
          { q: "How often do Korean regulations change?", a: "Quarterly updates are common. We provide ongoing monitoring and alert you when regulatory changes affect your compliance status. Proactive updates, not reactive surprises." },
        ].map((faq, i) => (
          <div key={i} className={`faq-item${openFaq === i ? " open" : ""}`}>
            <div className="faq-q" onClick={() => toggleFaq(i)}><h4>{faq.q}</h4><span className="fq-t">+</span></div>
            <div className="faq-a"><p>{faq.a}</p></div>
          </div>
        ))}
      </div></section>

      <section className="invite" id="contact"><div className="invite-inner">
        <div className="invite-right"><Link to="/contact" className="invite-cta">Book a Compliance Call →</Link></div>
      </div></section>
      <footer className="ft-ed"><div className="ft-inner"><div>© 2026 ium labs — Seoul</div><div style={{ display: "flex", alignItems: "center" }}><span ref={clockRef} style={{ marginRight: 12 }} /><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><a href={brand.telegramLink} target="_blank" rel="noopener noreferrer">Telegram</a></div></div></footer>
    </div>
  );
};
export default BrandingService;
