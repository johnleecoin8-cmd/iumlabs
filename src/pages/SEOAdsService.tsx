import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CalendlyButton from "@/components/CalendlyButton";
import SEOHead from "@/components/SEOHead";
import { brand } from "@/config/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "@/assets/services/seo-ads.webp";
import "./GTMService.css";
gsap.registerPlugin(ScrollTrigger);
const clients = ["BNB Chain","Sahara AI","PEAQ Network","Bybit","KuCoin","Polygon","Mantra","Ondo Finance","FOGO","Aptos","Kite","SynFutures"];

const SEOAdsService = () => {
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
      <SEOHead title="Korea SEO & Paid Ads | ium Labs" description="Naver SEO, Google Ads, crypto ad networks for Korean market." path="/services/seo-ads" keywords={["Korea Naver SEO","Crypto Ads Korea"]} />
      <Navbar />
      <section className="hero-ed">
        <img src={heroImg} alt="" className="hero-bg" /><div className="hero-overlay" /><div className="hero-grid" /><div className="hero-orb" />
        <div className="hero-kr">검색</div><div className="hero-kr">최적</div><div className="hero-kr">화</div>
        <div className="hero-wm">ium</div>
        <div className="hero-tag">SEO & Paid Ads — Seoul</div>
        <h1>Be found where <strong>Korea searches.</strong></h1>
        <div className="hero-foot"><p>Naver SEO, Google Ads, X Ads, crypto ad networks. We know which platforms ban crypto and how to get certified for the ones that don't.</p><div className="hero-scroll">Scroll</div></div>
      </section>
      <section className="clients"><div className="cl-track">{[...clients,...clients,...clients].map((c,i) => <span key={i}>{c}</span>)}</div></section>
      <section className="why-kr"><div className="wrap">
        <div className="lbl" style={{ color: "var(--g2)" }}>Results</div>
        <div className="wk-grid" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
          <div className="wk-item"><div className="wk-big">287%</div><div className="wk-sub">Avg Traffic Growth</div><div className="wk-note">Across managed Korean SEO campaigns.</div></div>
          <div className="wk-item"><div className="wk-big">19</div><div className="wk-sub">Campaigns Managed</div><div className="wk-note">Naver, Google, X, crypto networks.</div></div>
          <div className="wk-item"><div className="wk-big">3.4x</div><div className="wk-sub">Avg ROAS</div><div className="wk-note">Return on ad spend across all campaigns.</div></div>
          <div className="wk-item"><div className="wk-big">42%</div><div className="wk-sub">Lower CPA</div><div className="wk-note">vs. client's previous non-localized campaigns.</div></div>
        </div>
      </div></section>
      <section className="manifesto"><div className="wrap">
        <p>Korea doesn't Google. Korea <strong>Navers</strong>. 70% of Korean search traffic goes through Naver, and its algorithm rewards completely different content than Google. Add crypto ad bans on most platforms, and you need someone who knows which networks accept crypto, how to get <strong>Google's crypto certification</strong>, and how to structure Naver Blog SEO that actually ranks.</p>
      </div></section>
      <section className="approach-ed"><div className="wrap">
        <div className="lbl">How We Drive Traffic</div>
        <div className="appr-grid">
          <div className="appr-l">
            <h2>Korean search <strong>dominance.</strong></h2>
            <p>We handle the full spectrum — from Naver Blog SEO to Google Ads crypto certification to X promoted posts. All localized, all performance-tracked.</p>
            <div className="pull-q">"한국에서는 네이버가 곧 검색입니다."</div>
          </div>
          <div className="pillars">
            <div className="pill"><div className="pill-n">I</div><h4>Naver SEO</h4><p>Blog content strategy, keyword research, Naver-specific optimization. Different algorithm, different approach.</p></div>
            <div className="pill"><div className="pill-n">II</div><h4>Google Ads (crypto certified)</h4><p>We handle Google's crypto advertiser certification process. Most agencies can't even get approved.</p></div>
            <div className="pill"><div className="pill-n">III</div><h4>Crypto ad networks</h4><p>Coinzilla, Bitmedia, and crypto-native networks. We know which ones convert for Korean audiences.</p></div>
            <div className="pill"><div className="pill-n">IV</div><h4>Performance analytics</h4><p>A/B testing, conversion optimization, weekly reporting. Every dollar tracked to acquisition.</p></div>
          </div>
        </div>
      </div></section>
      <section className="quotes-sec"><div className="wrap">
        <div className="lbl" style={{ color: "var(--g2)" }}>Testimonials</div>
        <div className="quotes-grid">
          <div className="q-card"><blockquote>"ium Labs got us 150+ first-page Naver rankings in 3 months. Our Korean organic traffic went from zero to 850K monthly visits."</blockquote><cite>Marketing Lead — Exchange</cite></div>
          <div className="q-card"><blockquote>"They handled the Google crypto certification we'd failed twice on our own. Ads were live within 2 weeks of engagement."</blockquote><cite>Growth Lead — DeFi Protocol</cite></div>
        </div>
      </div></section>
      <section className="invite" id="contact"><div className="invite-inner">
        <div><h2>Ready to dominate <strong>Korean search?</strong></h2><div className="invite-kr">네이버에서 1페이지를 차지합니다</div></div>
        <div className="invite-right"><CalendlyButton className="invite-cta">Book an SEO Strategy Call →</CalendlyButton><div className="invite-offices"><span>KR</span><span>SG</span></div></div>
      </div></section>
      <footer className="ft-ed"><div className="ft-inner"><div className="ft-cp">© 2026 ium labs — Seoul</div><div style={{ display: "flex", alignItems: "center" }}><span className="ft-clock" ref={clockRef} /><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><a href={brand.telegramLink} target="_blank" rel="noopener noreferrer">Telegram</a></div></div></footer>
    </div>
  );
};
export default SEOAdsService;
