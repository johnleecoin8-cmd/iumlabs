import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CalendlyButton from "@/components/CalendlyButton";
import SEOHead from "@/components/SEOHead";
import { brand } from "@/config/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "@/assets/services/vasp-compliance.jpg";
import "./GTMService.css";
gsap.registerPlugin(ScrollTrigger);
const clients = ["BNB Chain","Sahara AI","PEAQ Network","Bybit","KuCoin","Polygon","Mantra","Ondo Finance","FOGO","Aptos","Kite","SynFutures"];

const BrandingService = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gtm-ed .hero-tag", { y: 30, opacity: 0, duration: 1, delay: .2, ease: "power3.out" });
      gsap.from(".gtm-ed .hero-ed h1", { y: 60, opacity: 0, duration: 1.2, delay: .4, ease: "power3.out" });
      gsap.from(".gtm-ed .hero-foot p", { y: 30, opacity: 0, duration: 1, delay: .7, ease: "power3.out" });
      gsap.utils.toArray<HTMLElement>(".gtm-ed .lbl,.gtm-ed .wk-item,.gtm-ed .manifesto p,.gtm-ed .pill,.gtm-ed .q-card,.gtm-ed .invite h2,.gtm-ed .invite-kr,.gtm-ed .appr-l").forEach(el => {
        gsap.from(el, { y: 50, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" }});
      });
      const mp = document.querySelector(".gtm-ed .manifesto p");
      if (mp) { const html = mp.innerHTML; const parts = html.split(/(<[^>]+>)/); let r = ""; parts.forEach(p => { if (p.startsWith("<")) { r += p; return; } p.split(" ").forEach(w => { if (w.trim()) r += `<span class="mw" style="display:inline-block;opacity:.15">${w}</span> `; }); }); mp.innerHTML = r; gsap.utils.toArray<HTMLElement>(".gtm-ed .mw").forEach(w => { gsap.to(w, { opacity: 1, duration: .5, scrollTrigger: { trigger: w, start: "top 90%", end: "top 60%", scrub: 1 }}); }); }
    }, containerRef);
    const tick = () => { if (clockRef.current) clockRef.current.textContent = `Seoul ${new Date().toLocaleString("en-US",{timeZone:"Asia/Seoul",hour:"2-digit",minute:"2-digit",hour12:false})}`; };
    tick(); const ci = setInterval(tick, 60000);
    return () => { ctx.revert(); clearInterval(ci); };
  }, []);

  return (
    <div className="gtm-ed" ref={containerRef}>
      <SEOHead title="Korea Regulations & Compliance | ium Labs" description="VASP registration, PIPA compliance, regulatory advisory for Korean crypto market." path="/services/compliance" keywords={["Korea Crypto Compliance","VASP Registration Korea"]} />
      <Navbar />
      <section className="hero-ed">
        <img src={heroImg} alt="" className="hero-bg" /><div className="hero-overlay" /><div className="hero-grid" /><div className="hero-orb" />
        <div className="hero-kr">규제</div><div className="hero-kr">컴플</div><div className="hero-kr">라이언스</div>
        <div className="hero-wm">ium</div>
        <div className="hero-tag">Regulations & Compliance — Seoul</div>
        <h1>Navigate Korea's <em>regulations</em> <strong>with confidence.</strong></h1>
        <div className="hero-foot"><p>In partnership with Law Office Asset and Freeman Law. VASP registration, PIPA compliance, regulatory landscape analysis, and exchange compliance documentation.</p><div className="hero-scroll">Scroll</div></div>
      </section>
      <section className="clients"><div className="cl-track">{[...clients,...clients,...clients].map((c,i) => <span key={i}>{c}</span>)}</div></section>
      <section className="why-kr"><div className="wrap">
        <div className="lbl" style={{ color: "var(--g2)" }}>Track Record</div>
        <div className="wk-grid" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
          <div className="wk-item"><div className="wk-big">19+</div><div className="wk-sub">Projects Advised</div><div className="wk-note">Across DeFi, NFT, L1, and token launches.</div></div>
          <div className="wk-item"><div className="wk-big">100%</div><div className="wk-sub">Compliance Rate</div><div className="wk-note">Zero regulatory issues for advised projects.</div></div>
          <div className="wk-item"><div className="wk-big">5</div><div className="wk-sub">Regulatory Frameworks</div><div className="wk-note">Korean Virtual Asset Act, PIPA, AML, KYC, exchange-specific.</div></div>
          <div className="wk-item"><div className="wk-big">24h</div><div className="wk-sub">Response Time</div><div className="wk-note">For urgent regulatory questions.</div></div>
        </div>
      </div></section>
      <section className="manifesto"><div className="wrap">
        <p>Korea's crypto regulations are <strong>complex and fast-changing</strong>. The Virtual Asset User Protection Act, PIPA personal data requirements, and exchange-specific listing compliance all create a regulatory maze that most global projects can't navigate alone. We provide <strong>1:1 regulatory consulting</strong> in partnership with <strong>Law Office Asset</strong> and <strong>Freeman Law</strong> — covering both strategic advisory and formal legal guidance.</p>
      </div></section>
      <section className="approach-ed"><div className="wrap">
        <div className="lbl">How We Guide</div>
        <div className="appr-grid">
          <div className="appr-l">
            <h2>Compliance as a <strong>competitive advantage.</strong></h2>
            <p>Projects that get Korean compliance right move faster. We turn regulatory requirements into a market entry accelerator, not a bottleneck.</p>
            <div className="pull-q">"한국 규제를 이해하는 것이 시장 진입의 첫걸음입니다."</div>
          </div>
          <div className="pillars">
            <div className="pill"><div className="pill-n">I</div><h4>VASP registration</h4><p>Full support for Korean Virtual Asset Service Provider registration. Documentation, application, and follow-up.</p></div>
            <div className="pill"><div className="pill-n">II</div><h4>PIPA compliance</h4><p>Personal Information Protection Act strategy. Data handling, consent flows, and compliance documentation.</p></div>
            <div className="pill"><div className="pill-n">III</div><h4>Exchange compliance</h4><p>Upbit, Bithumb, Coinone listing requirements. Due diligence prep, compliance documentation, regulatory review.</p></div>
            <div className="pill"><div className="pill-n">IV</div><h4>Legal partnerships</h4><p>Direct access to Law Office Asset and Freeman Law for formal legal opinions and regulatory submissions.</p></div>
          </div>
        </div>
      </div></section>
      <section className="quotes-sec"><div className="wrap">
        <div className="lbl" style={{ color: "var(--g2)" }}>Testimonials</div>
        <div className="quotes-grid">
          <div className="q-card"><blockquote>"ium Labs' compliance guidance saved us months. They knew exactly what Upbit's DD team would ask for and had our documentation ready before we even applied."</blockquote><cite>Legal Lead — DeFi Protocol</cite></div>
          <div className="q-card"><blockquote>"The combination of regulatory advisory and legal partnership gave us confidence to enter Korea. We were compliant from day one."</blockquote><cite>CEO — L1 Protocol</cite></div>
        </div>
      </div></section>
      <section className="invite" id="contact"><div className="invite-inner">
        <div><h2>Need Korean regulatory <strong>guidance?</strong></h2><div className="invite-kr">한국 규제, 전문가와 함께합니다</div></div>
        <div className="invite-right"><CalendlyButton className="invite-cta">Book a Compliance Call →</CalendlyButton><div className="invite-offices"><span>KR</span><span>SG</span></div></div>
      </div></section>
      <footer className="ft-ed"><div className="ft-inner"><div className="ft-cp">© 2026 ium labs — Seoul</div><div style={{ display: "flex", alignItems: "center" }}><span className="ft-clock" ref={clockRef} /><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><a href={brand.telegramLink} target="_blank" rel="noopener noreferrer">Telegram</a></div></div></footer>
    </div>
  );
};
export default BrandingService;
