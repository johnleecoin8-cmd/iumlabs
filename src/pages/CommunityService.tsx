import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CalendlyButton from "@/components/CalendlyButton";
import SEOHead from "@/components/SEOHead";
import { brand } from "@/config/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "@/assets/services/community-management.webp";
import "./GTMService.css";

gsap.registerPlugin(ScrollTrigger);

const clients = ["BNB Chain","Sahara AI","PEAQ Network","Bybit","KuCoin","Polygon","Mantra","Ondo Finance","FOGO","Aptos","Kite","SynFutures"];

const CommunityService = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gtm-ed .hero-tag", { y: 30, opacity: 0, duration: 1, delay: .2, ease: "power3.out" });
      gsap.from(".gtm-ed .hero-ed h1", { y: 60, opacity: 0, duration: 1.2, delay: .4, ease: "power3.out" });
      gsap.from(".gtm-ed .hero-foot p", { y: 30, opacity: 0, duration: 1, delay: .7, ease: "power3.out" });

      gsap.utils.toArray<HTMLElement>(".gtm-ed .lbl,.gtm-ed .wk-item,.gtm-ed .manifesto p,.gtm-ed .pill,.gtm-ed .q-card,.gtm-ed .invite h2,.gtm-ed .invite-kr,.gtm-ed .appr-l,.gtm-ed .svc-block").forEach(el => {
        gsap.from(el, { y: 50, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" }});
      });

      const mp = document.querySelector(".gtm-ed .manifesto p");
      if (mp) {
        const html = mp.innerHTML;
        const parts = html.split(/(<[^>]+>)/);
        let result = "";
        parts.forEach(part => {
          if (part.startsWith("<")) { result += part; return; }
          part.split(" ").forEach(w => { if (w.trim()) result += `<span class="mw" style="display:inline-block;opacity:.15">${w}</span> `; });
        });
        mp.innerHTML = result;
        gsap.utils.toArray<HTMLElement>(".gtm-ed .mw").forEach(w => {
          gsap.to(w, { opacity: 1, duration: .5, scrollTrigger: { trigger: w, start: "top 90%", end: "top 60%", scrub: 1 }});
        });
      }
    }, containerRef);

    const tick = () => { if (clockRef.current) clockRef.current.textContent = `Seoul ${new Date().toLocaleString("en-US",{timeZone:"Asia/Seoul",hour:"2-digit",minute:"2-digit",hour12:false})}`; };
    tick(); const ci = setInterval(tick, 60000);
    return () => { ctx.revert(); clearInterval(ci); };
  }, []);

  return (
    <div className="gtm-ed" ref={containerRef}>
      <SEOHead title="Korea Community Management | ium Labs" description="24/7 native Korean community management across Telegram, Discord, KakaoTalk." path="/services/community" keywords={["Korea Community Management","Web3 Community Korea"]} />
      <Navbar />

      <section className="hero-ed">
        <img src={heroImg} alt="" className="hero-bg" /><div className="hero-overlay" /><div className="hero-grid" /><div className="hero-orb" />
        <div className="hero-kr">커뮤</div><div className="hero-kr">니티</div><div className="hero-kr">관리</div>
        <div className="hero-wm">ium</div>
        <div className="hero-tag">Community Management — Seoul</div>
        <h1>Build the <em>community.</em> <strong>Own the culture.</strong></h1>
        <div className="hero-foot"><p>24/7 native Korean community managers across Telegram, Discord, and KakaoTalk. We don't just moderate — we design community culture.</p><div className="hero-scroll">Scroll</div></div>
      </section>

      <section className="clients"><div className="cl-track">{[...clients,...clients,...clients].map((c,i) => <span key={i}>{c}</span>)}</div></section>

      <section className="why-kr"><div className="wrap">
        <div className="lbl" style={{ color: "var(--g2)" }}>Why This Matters</div>
        <div className="wk-grid" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
          <div className="wk-item"><div className="wk-big">18</div><div className="wk-sub">Communities Managed</div><div className="wk-note">Active Korean communities across platforms.</div></div>
          <div className="wk-item"><div className="wk-big">127K+</div><div className="wk-sub">Members Engaged</div><div className="wk-note">Total members across all managed communities.</div></div>
          <div className="wk-item"><div className="wk-big">6.8%</div><div className="wk-sub">Daily Active Rate</div><div className="wk-note">Industry average is under 3%.</div></div>
          <div className="wk-item"><div className="wk-big">92%</div><div className="wk-sub">Member Retention</div><div className="wk-note">Members active after 30 days.</div></div>
        </div>
      </div></section>

      <section className="manifesto"><div className="wrap">
        <p>Korean communities don't run on the same platforms or rules as global ones. <strong>KakaoTalk Open Chat</strong> replaces Telegram for many users. <strong>Naver Cafe</strong> is where long-form discussion happens. DC Inside is where sentiment shifts. We operate all of these natively because we <strong>live inside</strong> the Korean crypto ecosystem.</p>
      </div></section>

      <section className="approach-ed"><div className="wrap">
        <div className="lbl">How We Operate</div>
        <div className="appr-grid">
          <div className="appr-l">
            <h2>Communities that <strong>retain and grow.</strong></h2>
            <p>We design community culture — from onboarding flows to weekly event programming to governance structures that keep members engaged long after the initial hype.</p>
            <div className="pull-q">"커뮤니티는 번역으로 만들 수 없습니다. 문화를 설계해야 합니다."</div>
          </div>
          <div className="pillars">
            <div className="pill"><div className="pill-n">I</div><h4>24/7 Korean moderation</h4><p>Native Korean speakers around the clock. Holidays, 3AM, weekends — always covered.</p></div>
            <div className="pill"><div className="pill-n">II</div><h4>Multi-platform native</h4><p>Telegram, Discord, KakaoTalk, Naver Cafe — each with its own culture, all operated natively.</p></div>
            <div className="pill"><div className="pill-n">III</div><h4>Engagement programming</h4><p>AMAs, trivia, quests, ambassador programs — structured engagement that drives daily activity.</p></div>
            <div className="pill"><div className="pill-n">IV</div><h4>Sentiment intelligence</h4><p>Real-time monitoring across Korean platforms. We catch issues before they become crises.</p></div>
          </div>
        </div>
      </div></section>

      <section className="quotes-sec"><div className="wrap">
        <div className="lbl" style={{ color: "var(--g2)" }}>Testimonials</div>
        <div className="quotes-grid">
          <div className="q-card"><blockquote>"ium Labs didn't just moderate our Korean Telegram — they built a community culture from scratch. The engagement metrics were unlike anything we'd seen."</blockquote><cite>Community Lead — DePIN Protocol</cite></div>
          <div className="q-card"><blockquote>"Native Korean moderators who understand crypto made all the difference. Our Korean community went from 200 to 8K in 6 weeks."</blockquote><cite>Head of Growth — AI Protocol</cite></div>
        </div>
      </div></section>

      <section className="invite" id="contact"><div className="invite-inner">
        <div><h2>Ready to build a Korean <strong>community that lasts?</strong></h2><div className="invite-kr">한국 커뮤니티를 설계합니다</div></div>
        <div className="invite-right"><CalendlyButton className="invite-cta">Book a Community Strategy Call →</CalendlyButton><div className="invite-offices"><span>KR</span><span>SG</span></div></div>
      </div></section>

      <footer className="ft-ed"><div className="ft-inner">
        <div className="ft-cp">© 2026 ium labs — Seoul</div>
        <div style={{ display: "flex", alignItems: "center" }}><span className="ft-clock" ref={clockRef} /><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><a href={brand.telegramLink} target="_blank" rel="noopener noreferrer">Telegram</a></div>
      </div></footer>
    </div>
  );
};

export default CommunityService;
