import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CalendlyButton from "@/components/CalendlyButton";
import SEOHead from "@/components/SEOHead";
import { brand } from "@/config/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "@/assets/services/offline-event.webp";
import "./GTMService.css";
gsap.registerPlugin(ScrollTrigger);
const clients = ["BNB Chain","Sahara AI","PEAQ Network","Bybit","KuCoin","Polygon","Mantra","Ondo Finance","FOGO","Aptos","Kite","SynFutures"];

const OfflineEventService = () => {
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
      <SEOHead title="Korea Offline Events | ium Labs" description="End-to-end event production in Seoul. KBW side events, VIP dinners, launch parties." path="/services/offline-event" keywords={["Korea Web3 Events","Seoul Crypto Events"]} />
      <Navbar />
      <section className="hero-ed">
        <img src={heroImg} alt="" className="hero-bg" /><div className="hero-overlay" /><div className="hero-grid" /><div className="hero-orb" />
        <div className="hero-kr">오프</div><div className="hero-kr">라인</div><div className="hero-kr">이벤트</div>
        <div className="hero-wm">ium</div>
        <div className="hero-tag">Offline Events — Seoul</div>
        <h1>Events in Seoul. <strong>Run by locals.</strong></h1>
        <div className="hero-foot"><p>From 20-person VIP dinners to 500+ person parties during KBW. Full logistics, venue sourcing, speaker curation, and post-event content.</p><div className="hero-scroll">Scroll</div></div>
      </section>
      <section className="clients"><div className="cl-track">{[...clients,...clients,...clients].map((c,i) => <span key={i}>{c}</span>)}</div></section>
      <section className="why-kr"><div className="wrap">
        <div className="lbl" style={{ color: "var(--g2)" }}>Track Record</div>
        <div className="wk-grid" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
          <div className="wk-item"><div className="wk-big">23</div><div className="wk-sub">Events Produced</div><div className="wk-note">Seoul meetups, KBW side events, VIP dinners.</div></div>
          <div className="wk-item"><div className="wk-big">2,847</div><div className="wk-sub">Total Attendees</div><div className="wk-note">Across all events in 2024-2025.</div></div>
          <div className="wk-item"><div className="wk-big">156</div><div className="wk-sub">KOLs & VIPs</div><div className="wk-note">Hosted at our events.</div></div>
          <div className="wk-item"><div className="wk-big">94%</div><div className="wk-sub">Satisfaction Rate</div><div className="wk-note">Post-event survey results.</div></div>
        </div>
      </div></section>
      <section className="manifesto"><div className="wrap">
        <p>Running a Web3 event in Seoul isn't just about booking a venue. It's about navigating <strong>language barriers</strong>, understanding <strong>Korean business etiquette</strong>, knowing which KOLs actually show up, and producing content that outlasts the night. We're the boots on the ground — from venue scouting to post-event recap.</p>
      </div></section>
      <section className="approach-ed"><div className="wrap">
        <div className="lbl">How We Produce</div>
        <div className="appr-grid">
          <div className="appr-l">
            <h2>Seoul's event <strong>infrastructure.</strong></h2>
            <p>We handle every detail — so you can focus on the networking. 40+ venue relationships, direct KOL guest lists, and full production teams on standby.</p>
            <div className="pull-q">"서울에서의 이벤트는 현지 팀 없이는 불가능합니다."</div>
          </div>
          <div className="pillars">
            <div className="pill"><div className="pill-n">I</div><h4>KBW side events</h4><p>Korea Blockchain Week is the biggest moment. We produce side events that become the talk of the conference.</p></div>
            <div className="pill"><div className="pill-n">II</div><h4>VIP networking dinners</h4><p>Intimate 20-40 person dinners with curated guest lists. Korean exchange executives, fund managers, top KOLs.</p></div>
            <div className="pill"><div className="pill-n">III</div><h4>Full logistics</h4><p>Venue sourcing, catering, AV, photography, videography, simultaneous translation. All handled in-house.</p></div>
            <div className="pill"><div className="pill-n">IV</div><h4>Content that outlasts</h4><p>Post-event recap content, highlight reels, attendee testimonials, KOL content — ROI beyond the event itself.</p></div>
          </div>
        </div>
      </div></section>
      <section className="quotes-sec"><div className="wrap">
        <div className="lbl" style={{ color: "var(--g2)" }}>Testimonials</div>
        <div className="quotes-grid">
          <div className="q-card"><blockquote>"ium Labs handled our KBW side event end-to-end. 350+ attendees, zero issues. The venue, the guest list, the content — all world-class."</blockquote><cite>Events Lead — L1 Protocol</cite></div>
          <div className="q-card"><blockquote>"The VIP dinner they organized connected us with 3 exchange BD teams we'd been trying to reach for months. Worth every penny."</blockquote><cite>CEO — RWA Protocol</cite></div>
        </div>
      </div></section>
      <section className="invite" id="contact"><div className="invite-inner">
        <div><h2>Planning an event in Seoul? <strong>We'll make it happen.</strong></h2><div className="invite-kr">서울 이벤트, 현지 팀이 필요합니다</div></div>
        <div className="invite-right"><CalendlyButton className="invite-cta">Plan Your Event →</CalendlyButton><div className="invite-offices"><span>KR</span><span>SG</span></div></div>
      </div></section>
      <footer className="ft-ed"><div className="ft-inner"><div className="ft-cp">© 2026 ium labs — Seoul</div><div style={{ display: "flex", alignItems: "center" }}><span className="ft-clock" ref={clockRef} /><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><a href={brand.telegramLink} target="_blank" rel="noopener noreferrer">Telegram</a></div></div></footer>
    </div>
  );
};
export default OfflineEventService;
