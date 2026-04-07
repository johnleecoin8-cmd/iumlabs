import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CalendlyButton from "@/components/CalendlyButton";
import SEOHead from "@/components/SEOHead";
import { brand } from "@/config/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "@/assets/services/offline-event.webp";
import kbwImg from "@/assets/platforms/event-conference.jpg";
import vipImg from "@/assets/platforms/event-dinner.jpg";
import launchImg from "@/assets/platforms/event-party.jpg";
import meetupImg from "@/assets/platforms/event-meetup.jpg";
import "./ServiceDetail.css";
gsap.registerPlugin(ScrollTrigger);

const OfflineEventService = () => {
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
      <SEOHead title="Korea Offline Events | ium Labs" description="End-to-end event production in Seoul. KBW side events, VIP dinners, launch parties." path="/services/offline-event" keywords={["Korea Web3 Events","Seoul Crypto Events"]} />
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <img src={heroImg} alt="" className="hero-bg" /><div className="hero-overlay" />
        <div className="hero-center">
          <div className="hero-label">Service 05 of 08</div>
          <h1>Offline <strong>Events</strong></h1>
          <p className="hero-desc">From 20-person VIP dinners to 500+ person parties during KBW. Full logistics, venue sourcing, speaker curation, and post-event content. Events in Seoul, run by locals.</p>
        </div>
        <div className="hero-stats-bar">
          <div className="stat"><div className="stat-val">23</div><div className="stat-sub">Events</div></div>
          <div className="stat"><div className="stat-val">2,847</div><div className="stat-sub">Attendees</div></div>
          <div className="stat"><div className="stat-val">156</div><div className="stat-sub">KOLs / VIPs</div></div>
          <div className="stat"><div className="stat-val">94%</div><div className="stat-sub">Satisfaction</div></div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="problem"><div className="wrap">
        <div className="lbl">The Problem</div>
        <div className="problem-grid">
          <div className="problem-left"><h2>Running events in Seoul requires <strong>local expertise.</strong></h2></div>
          <div className="problem-right">
            <p>You can't run a Web3 event in Seoul from a Notion doc. Venue contracts are in Korean. Catering companies need introductions. KOLs RSVP through KakaoTalk. AV teams expect Korean-language briefs. And the best venues book out months in advance.</p>
            <p>Without a local team, you end up overpaying for a mediocre venue, underwhelming turnout, and zero content to show for it. Korea's event scene rewards relationships and local knowledge — not Eventbrite links and cold emails.</p>
          </div>
        </div>
      </div></section>

      {/* CAPABILITIES */}
      <section className="capabilities"><div className="wrap">
        <div className="lbl">What We Do</div>
        {[
          { icon: "◎", title: "KBW Side Events", desc: "Korea Blockchain Week is the biggest moment of the year. We produce side events that become the talk of the conference — from venue selection to guest list curation to day-of execution.", img: kbwImg },
          { icon: "◉", title: "VIP Dinners", desc: "Intimate 20-40 person dinners with curated guest lists. Korean exchange executives, fund managers, top KOLs. We handle the venue, menu, seating arrangement, and conversation flow.", img: vipImg },
          { icon: "◈", title: "Launch Parties", desc: "Mainnet launches, token listings, partnership announcements. We produce celebration events that generate buzz, attract media coverage, and create shareable content.", img: launchImg },
          { icon: "◆", title: "Venue Sourcing", desc: "40+ venue relationships across Seoul — rooftop bars, private dining rooms, conference halls, gallery spaces. We match the venue to your brand, budget, and audience size.", img: meetupImg },
        ].map((cap, i) => (
          <div key={i} className={`cap-block${openCap === i ? " open" : ""}`}>
            <div className="cap-head" onClick={() => toggleCap(i)}>
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
        <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(1.8rem,3vw,2.5rem)", letterSpacing: "-.02em" }}>From concept to <strong>flawless execution.</strong></h2>
        <div className="proc-grid">
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Week 1</div><div className="proc-title">Scope</div><div className="proc-text">Define event objectives, audience size, budget. Shortlist venues, draft guest list strategy, align on format.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Week 2–3</div><div className="proc-title">Production</div><div className="proc-text">Lock venue, finalize catering, book AV and photography. Confirm speakers, design collateral, build run-of-show.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Week 3–4</div><div className="proc-title">Promotion</div><div className="proc-text">KOL invitations, community announcements, RSVP management. Build anticipation through coordinated social pushes.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Event Day+</div><div className="proc-title">Execute</div><div className="proc-text">On-site management, real-time coordination, photography, videography. Post-event content production and distribution.</div></div>
        </div>
      </div></section>


      {/* FAQ */}
      <section className="faq"><div className="wrap">
        <div className="lbl">FAQ</div>
        {[
          { q: "How far in advance should we plan a KBW side event?", a: "Ideally 8-10 weeks. Top venues in Gangnam and Itaewon book out fast during KBW. For VIP dinners, 4-6 weeks is usually sufficient." },
          { q: "What's the typical budget range for a Seoul event?", a: "VIP dinners start around $8K-15K. Mid-size launch parties run $20K-40K. Full KBW side events with 300+ capacity range from $40K-80K+ depending on venue and production scope." },
          { q: "Can you handle bilingual events?", a: "Yes. We provide simultaneous Korean-English interpretation, bilingual MCs, and all collateral in both languages. Most of our events are bilingual by default." },
          { q: "Do you handle post-event content production?", a: "Every event includes professional photography, videography, highlight reels, and social media recap content. We also coordinate KOL attendees to post their own event content." },
        ].map((faq, i) => (
          <div key={i} className={`faq-item${openFaq === i ? " open" : ""}`}>
            <div className="faq-q" onClick={() => toggleFaq(i)}><h4>{faq.q}</h4><span className="fq-t">+</span></div>
            <div className="faq-a"><p>{faq.a}</p></div>
          </div>
        ))}
      </div></section>

      {/* INVITE */}
      <section className="invite" id="contact"><div className="invite-inner">
        <div className="invite-right"><Link to="/contact" className="invite-cta">Plan Your Event →</Link></div>
      </div></section>
      <footer className="ft-ed"><div className="ft-inner"><div>© 2026 ium labs — Seoul</div><div style={{ display: "flex", alignItems: "center" }}><span ref={clockRef} style={{ marginRight: 12 }} /><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><a href={brand.telegramLink} target="_blank" rel="noopener noreferrer">Telegram</a></div></div></footer>
    </div>
  );
};
export default OfflineEventService;
