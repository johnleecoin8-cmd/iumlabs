import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CalendlyButton from "@/components/CalendlyButton";
import SEOHead from "@/components/SEOHead";
import { brand } from "@/config/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "@/assets/services/ama-spaces.png";
import "./GTMService.css";
gsap.registerPlugin(ScrollTrigger);
const clients = ["BNB Chain","Sahara AI","PEAQ Network","Bybit","KuCoin","Polygon","Mantra","Ondo Finance","FOGO","Aptos","Kite","SynFutures"];

const AMAService = () => {
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
      <SEOHead title="Korea AMA Hosting | ium Labs" description="Structured AMA sessions with native Korean hosts across Telegram, Discord, X Spaces." path="/services/ama" keywords={["Korea AMA Hosting","Web3 AMA Korea"]} />
      <Navbar />
      <section className="hero-ed">
        <img src={heroImg} alt="" className="hero-bg" /><div className="hero-overlay" /><div className="hero-grid" /><div className="hero-orb" />
        <div className="hero-kr">에이</div><div className="hero-kr">엠에</div><div className="hero-kr">이</div>
        <div className="hero-wm">ium</div>
        <div className="hero-tag">AMA Hosting — Seoul</div>
        <h1>AMAs that move <em>communities,</em> <strong>not just timelines.</strong></h1>
        <div className="hero-foot"><p>Structured AMA sessions with native Korean-speaking hosts. Pre-event promotion, live moderation, post-AMA recap content and analytics.</p><div className="hero-scroll">Scroll</div></div>
      </section>
      <section className="clients"><div className="cl-track">{[...clients,...clients,...clients].map((c,i) => <span key={i}>{c}</span>)}</div></section>
      <section className="why-kr"><div className="wrap">
        <div className="lbl" style={{ color: "var(--g2)" }}>Track Record</div>
        <div className="wk-grid" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
          <div className="wk-item"><div className="wk-big">200+</div><div className="wk-sub">AMAs Hosted</div><div className="wk-note">Across Telegram, Discord, X Spaces, YouTube.</div></div>
          <div className="wk-item"><div className="wk-big">50K+</div><div className="wk-sub">Live Participants</div><div className="wk-note">Total attendance across all sessions.</div></div>
          <div className="wk-item"><div className="wk-big">85%</div><div className="wk-sub">Retention Rate</div><div className="wk-note">Participants who stay through the full session.</div></div>
          <div className="wk-item"><div className="wk-big">19+</div><div className="wk-sub">Projects Served</div><div className="wk-note">From pre-launch to established protocols.</div></div>
        </div>
      </div></section>
      <section className="manifesto"><div className="wrap">
        <p>Most AMAs are <strong>wasted opportunities</strong>. Generic questions, passive audiences, zero follow-up. We treat AMAs as <strong>structured community events</strong> — seeded questions, managed pacing, real-time engagement moments, and post-AMA content that extends the conversation. Every AMA hosted by <strong>native Korean speakers</strong> who understand crypto deeply.</p>
      </div></section>
      <section className="approach-ed"><div className="wrap">
        <div className="lbl">How We Host</div>
        <div className="appr-grid">
          <div className="appr-l">
            <h2>AMAs designed for <strong>conversion.</strong></h2>
            <p>We don't just open a mic. We build anticipation, curate questions, control pacing, and produce content that lives beyond the session.</p>
            <div className="pull-q">"AMA는 이벤트가 아니라 커뮤니티 전환점입니다."</div>
          </div>
          <div className="pillars">
            <div className="pill"><div className="pill-n">I</div><h4>Native Korean hosts</h4><p>Professional hosts who speak crypto fluently in Korean. No awkward translations, no lost nuance.</p></div>
            <div className="pill"><div className="pill-n">II</div><h4>Pre-event hype</h4><p>2-3 weeks of promotion across Korean channels. Question curation, teaser content, community priming.</p></div>
            <div className="pill"><div className="pill-n">III</div><h4>Multi-platform</h4><p>Telegram, Discord, X Spaces, KakaoTalk Live, YouTube Live — we host on whatever platform your audience uses.</p></div>
            <div className="pill"><div className="pill-n">IV</div><h4>Post-AMA amplification</h4><p>Written recaps, video highlights, key quote graphics, engagement analytics. The AMA keeps working after it ends.</p></div>
          </div>
        </div>
      </div></section>
      <section className="quotes-sec"><div className="wrap">
        <div className="lbl" style={{ color: "var(--g2)" }}>Testimonials</div>
        <div className="quotes-grid">
          <div className="q-card"><blockquote>"The AMA ium Labs hosted for us had 3x the engagement of any we'd done ourselves. The Korean host made all the difference — the audience actually participated."</blockquote><cite>Community Manager — DeFi Protocol</cite></div>
          <div className="q-card"><blockquote>"They turned our AMA into a full campaign. Pre-event teasers, live engagement, post-event recap thread — it drove 400+ new Korean community members."</blockquote><cite>Marketing Lead — GameFi Project</cite></div>
        </div>
      </div></section>
      <section className="invite" id="contact"><div className="invite-inner">
        <div><h2>Ready to host an AMA <strong>that converts?</strong></h2><div className="invite-kr">한국어 AMA, 전문 호스트가 필요합니다</div></div>
        <div className="invite-right"><CalendlyButton className="invite-cta">Book an AMA Planning Call →</CalendlyButton><div className="invite-offices"><span>KR</span><span>SG</span></div></div>
      </div></section>
      <footer className="ft-ed"><div className="ft-inner"><div className="ft-cp">© 2026 ium labs — Seoul</div><div style={{ display: "flex", alignItems: "center" }}><span className="ft-clock" ref={clockRef} /><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><a href={brand.telegramLink} target="_blank" rel="noopener noreferrer">Telegram</a></div></div></footer>
    </div>
  );
};
export default AMAService;
