import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CalendlyButton from "@/components/CalendlyButton";
import SEOHead from "@/components/SEOHead";
import { brand } from "@/config/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "@/assets/services/deep-research.png";
import "./GTMService.css";
gsap.registerPlugin(ScrollTrigger);
const clients = ["BNB Chain","Sahara AI","PEAQ Network","Bybit","KuCoin","Polygon","Mantra","Ondo Finance","FOGO","Aptos","Kite","SynFutures"];

const DeepResearchService = () => {
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
      <SEOHead title="Korea Deep Research | ium Labs" description="Data-driven Korean market intelligence. On-chain analytics, competitor analysis, market reports." path="/services/deep-research" keywords={["Korea Crypto Research","Web3 Market Intelligence"]} />
      <Navbar />
      <section className="hero-ed">
        <img src={heroImg} alt="" className="hero-bg" /><div className="hero-overlay" /><div className="hero-grid" /><div className="hero-orb" />
        <div className="hero-kr">리서</div><div className="hero-kr">치</div><div className="hero-kr">분석</div>
        <div className="hero-wm">ium</div>
        <div className="hero-tag">Deep Research — Seoul</div>
        <h1>Know Korea. <strong>Before you enter it.</strong></h1>
        <div className="hero-foot"><p>On-chain analytics, competitor analysis, market ecosystem mapping. Reports in Korean and English, distributed through our media network.</p><div className="hero-scroll">Scroll</div></div>
      </section>
      <section className="clients"><div className="cl-track">{[...clients,...clients,...clients].map((c,i) => <span key={i}>{c}</span>)}</div></section>
      <section className="why-kr"><div className="wrap">
        <div className="lbl" style={{ color: "var(--g2)" }}>Output</div>
        <div className="wk-grid" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
          <div className="wk-item"><div className="wk-big">47</div><div className="wk-sub">Reports Delivered</div><div className="wk-note">Market entry, competitor, tokenomics, investment thesis.</div></div>
          <div className="wk-item"><div className="wk-big">12+</div><div className="wk-sub">Distribution Partners</div><div className="wk-note">Korean media and KOL network for report amplification.</div></div>
          <div className="wk-item"><div className="wk-big">850K+</div><div className="wk-sub">Report Impressions</div><div className="wk-note">Average reach per distributed report.</div></div>
          <div className="wk-item"><div className="wk-big">3.2%</div><div className="wk-sub">Engagement Rate</div><div className="wk-note">On distributed research content.</div></div>
        </div>
      </div></section>
      <section className="manifesto"><div className="wrap">
        <p>Global research firms don't understand Korean crypto. The <strong>Upbit premium</strong>, DC Inside sentiment, Naver search trends, KakaoTalk group dynamics — these signals are invisible to anyone not operating inside the ecosystem daily. Our research combines <strong>on-chain data</strong> with <strong>on-the-ground intelligence</strong> you can't get from a dashboard.</p>
      </div></section>
      <section className="approach-ed"><div className="wrap">
        <div className="lbl">Methodology</div>
        <div className="appr-grid">
          <div className="appr-l">
            <h2>Intelligence, not just <strong>data.</strong></h2>
            <p>We don't just pull Dune dashboards. We combine on-chain analytics with local market intelligence — Korean media monitoring, community sentiment, exchange flow analysis.</p>
            <div className="pull-q">"한국 시장은 데이터만으로는 이해할 수 없습니다."</div>
          </div>
          <div className="pillars">
            <div className="pill"><div className="pill-n">I</div><h4>Korean market mapping</h4><p>Complete ecosystem analysis — exchanges, KOLs, media, communities, regulations, competitive positioning.</p></div>
            <div className="pill"><div className="pill-n">II</div><h4>On-chain + off-chain</h4><p>Dune, Nansen, Arkham data combined with Korean social sentiment, Naver trends, and community signals.</p></div>
            <div className="pill"><div className="pill-n">III</div><h4>Bilingual distribution</h4><p>Reports in Korean and English. Distributed through our media and KOL network for maximum reach.</p></div>
            <div className="pill"><div className="pill-n">IV</div><h4>Investor-grade output</h4><p>Investment thesis support, due diligence packages, tokenomics reviews that institutional investors trust.</p></div>
          </div>
        </div>
      </div></section>
      <section className="quotes-sec"><div className="wrap">
        <div className="lbl" style={{ color: "var(--g2)" }}>Testimonials</div>
        <div className="quotes-grid">
          <div className="q-card"><blockquote>"Their Korean market report revealed competitive dynamics we had no visibility into. It completely changed our market entry strategy."</blockquote><cite>Strategy Lead — L2 Protocol</cite></div>
          <div className="q-card"><blockquote>"The combination of on-chain data with Korean community sentiment analysis was something no other research firm could provide."</blockquote><cite>Investment Manager — Crypto Fund</cite></div>
        </div>
      </div></section>
      <section className="invite" id="contact"><div className="invite-inner">
        <div><h2>Need Korean market <strong>intelligence?</strong></h2><div className="invite-kr">한국 시장을 데이터로 이해합니다</div></div>
        <div className="invite-right"><CalendlyButton className="invite-cta">Book a Research Briefing →</CalendlyButton><div className="invite-offices"><span>KR</span><span>SG</span></div></div>
      </div></section>
      <footer className="ft-ed"><div className="ft-inner"><div className="ft-cp">© 2026 ium labs — Seoul</div><div style={{ display: "flex", alignItems: "center" }}><span className="ft-clock" ref={clockRef} /><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><a href={brand.telegramLink} target="_blank" rel="noopener noreferrer">Telegram</a></div></div></footer>
    </div>
  );
};
export default DeepResearchService;
