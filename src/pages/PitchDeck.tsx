import { useEffect, useRef } from "react";
import logo from "@/assets/logo.png";

import seoulCta from "@/assets/backgrounds/seoul-hanriver-twilight.jpg";
import asiaGlobe from "@/assets/maps/asia-globe.png";

import logoBnb from "@/assets/logos/bnb.png";
import logoKucoin from "@/assets/logos/kucoin-mono.png";
import logoPolygon from "@/assets/logos/polygon.svg";
import logoOndo from "@/assets/logos/ondo.svg";
import logoMantra from "@/assets/logos/mantra-mono.png";
import logoSahara from "@/assets/logos/sahara-ai-mono.png";
import logoFogo from "@/assets/logos/fogo.png";
import logoSynfutures from "@/assets/logos/synfutures.png";
import logoAptos from "@/assets/logos/aptos-round.png";
import logoKite from "@/assets/logos/kite.png";
import logoBybit from "@/assets/logos/bybit.png";
import logoStory from "@/assets/logos/story-protocol-mono.png";
import logoMegaeth from "@/assets/logos/megaeth.png";
import logoTria from "@/assets/logos/tria-mono.png";
import logoSpacecoin from "@/assets/logos/spacecoin.png";
import logoPeaq from "@/assets/logos/peaq.png";

import logoCoindesk from "@/assets/logos/coindesk.png";
import logoBlockmedia from "@/assets/logos/blockmedia-new.png";
import logoHankyung from "@/assets/logos/hankyung-new.png";

import logoSaharaColor from "@/assets/logos/sahara-ai.png";
import logoStoryColor from "@/assets/logos/story-protocol-new.png";
import logoBnbColor from "@/assets/logos/bnb.png";
import logoMantraColor from "@/assets/logos/mantra.png";

import eventSahara from "@/assets/campaigns/sahara-ai-event.jpg";
import eventBnb from "@/assets/campaigns/bnb-hanok-event.jpg";
import eventStory from "@/assets/campaigns/story-origin-summit.jpg";
import eventMantra from "@/assets/campaigns/mantra-party.jpg";
import eventAptos from "@/assets/campaigns/aptos-seoul-event.jpg";
import eventPeaq from "@/assets/campaigns/peaq-summit.jpg";
import eventSynfutures from "@/assets/campaigns/synfutures-billboard.jpg";
import eventMegaeth from "@/assets/campaigns/megaeth-launch.jpg";
import eventTria from "@/assets/campaigns/tria-launch.jpg";

import teamDavid from "@/assets/team/kevin-bd-new.jpg";
import teamBennet from "@/assets/team/rachel-design.jpg";
import teamJ from "@/assets/team/j-cmo.jpg";
import teamKevin from "@/assets/team/helen-cm.jpg";
import teamSuki from "@/assets/team/bennet-coo.jpg";
import teamLewis from "@/assets/team/lewis-pr.jpg";
import teamRachel from "@/assets/team/kevin-bd.jpg";
import teamHyukjae from "@/assets/team/hyukjae-bdm-new.jpg";

const clientLogos = [
  { name: "BNB Chain", logo: logoBnb, noInvert: false },
  { name: "KuCoin", logo: logoKucoin, noInvert: true },
  { name: "Polygon", logo: logoPolygon, noInvert: false },
  { name: "Ondo Finance", logo: logoOndo, noInvert: false },
  { name: "Bybit", logo: logoBybit, noInvert: false },
  { name: "SpaceCoin", logo: logoSpacecoin, noInvert: true },
  { name: "Tria", logo: logoTria, noInvert: true },
  { name: "Mantra", logo: logoMantra, noInvert: true },
  { name: "Sahara AI", logo: logoSahara, noInvert: true },
  { name: "FOGO", logo: logoFogo, noInvert: true },
  { name: "SynFutures", logo: logoSynfutures, noInvert: true },
  { name: "Aptos", logo: logoAptos, noInvert: true },
  { name: "Kite", logo: logoKite, noInvert: true },
  { name: "MegaETH", logo: logoMegaeth, noInvert: true },
  { name: "Story", logo: logoStory, noInvert: true },
  { name: "peaq", logo: logoPeaq, noInvert: true },
];

const Marquee = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf: number;
    let x = 0;
    const speed = 0.4;
    const tick = () => {
      x -= speed;
      if (Math.abs(x) >= el.scrollWidth / 2) x = 0;
      el.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const items = [...clientLogos, ...clientLogos];
  return (
    <div className="dk-marquee">
      <div ref={trackRef} className="dk-mq-track">
        {items.map((c, i) => (
          <span key={`${c.name}-${i}`} className="dk-mq-item">
            <img
              src={c.logo}
              alt={c.name}
              className="dk-mq-logo"
              style={!c.noInvert ? { filter: "brightness(0) invert(1)" } : undefined}
            />
          </span>
        ))}
      </div>
    </div>
  );
};

const PitchDeck = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=DM+Sans:wght@300;400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
      .dk{--bg:#0A0A0A;--off:#111113;--ink:#d4d0c8;--g1:#aaa;--g2:#777;--g3:#555;--g4:rgba(255,255,255,.1);--g5:rgba(255,255,255,.05);--accent:#a78bfa;--accent-soft:rgba(167,139,250,.04);--accent-mid:rgba(167,139,250,.12);--serif:'Cormorant Garamond',Georgia,serif;--sans:'DM Sans','Inter',sans-serif;--mono:'IBM Plex Mono',monospace;font-family:var(--sans);background:var(--bg);color:#eae7e0;-webkit-font-smoothing:antialiased}
      .dk ::selection{background:var(--accent);color:#fff}
      .dk img{display:block;max-width:100%}
      .dk .wrap{max-width:1400px;margin:0 auto;padding:0 clamp(1.25rem,4vw,3rem)}
      .dk .lbl{font-family:var(--mono);font-size:.68rem;font-weight:500;letter-spacing:.25em;text-transform:uppercase;color:var(--g2);display:flex;align-items:center;gap:1.5rem;margin-bottom:3rem}
      .dk .lbl::after{content:'';flex:1;height:1px;background:var(--g4)}
      .dk .sn{font-family:var(--mono);font-size:.65rem;color:var(--g3);letter-spacing:.1em;text-align:right;padding:2rem 0;opacity:.5}

      /* HERO */
      .dk .hero{height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;position:relative;overflow:hidden}
      .dk .hero-poster{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
      .dk .hero video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1}
      .dk .hero-ov1{position:absolute;inset:0;background:rgba(0,0,0,.45);z-index:2}
      .dk .hero-ov2{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,10,11,.3) 0%,transparent 40%,rgba(10,10,11,.85) 100%);z-index:3}
      .dk .hero-c{position:relative;z-index:10;text-align:center;max-width:900px;padding:0 2rem}
      .dk .hero h1{font-family:var(--sans);font-weight:800;font-size:clamp(3rem,8vw,6.5rem);line-height:1.02;letter-spacing:-.04em}
      .dk .hero-accent{background:linear-gradient(135deg,#b48cde,#a78bfa,#c084fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
      .dk .hero-desc{font-size:clamp(.88rem,1.5vw,1.08rem);color:rgba(255,255,255,.7);line-height:1.8;font-weight:300;margin-top:2rem;max-width:640px;margin-left:auto;margin-right:auto}
      .dk .hero-pills{display:flex;gap:.5rem;justify-content:center;margin-top:2.5rem;flex-wrap:wrap}
      .dk .hero-pill{font-family:var(--mono);font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;padding:.45rem 1rem;border:1px solid rgba(255,255,255,.12);color:rgba(255,255,255,.5);border-radius:99px}
      .dk .hero-stats{position:absolute;bottom:0;left:0;right:0;z-index:10;display:grid;grid-template-columns:repeat(4,1fr)}
      .dk .hero-stat{padding:2rem 1.5rem;text-align:center;border-top:1px solid rgba(255,255,255,.08)}
      .dk .hero-stat-n{font-family:var(--sans);font-weight:700;font-size:clamp(1.8rem,3.5vw,2.8rem);letter-spacing:-.03em;line-height:1}
      .dk .hero-stat-l{font-family:var(--mono);font-size:.55rem;color:rgba(255,255,255,.35);letter-spacing:.12em;text-transform:uppercase;margin-top:.5rem}

      /* MARQUEE */
      .dk-marquee{padding:1.8rem 0;border-bottom:1px solid var(--g4);overflow:hidden;position:relative}
      .dk-marquee::before,.dk-marquee::after{content:'';position:absolute;top:0;bottom:0;width:80px;z-index:2}
      .dk-marquee::before{left:0;background:linear-gradient(90deg,var(--bg),transparent)}
      .dk-marquee::after{right:0;background:linear-gradient(-90deg,var(--bg),transparent)}
      .dk-mq-track{display:flex;gap:3.5rem;width:max-content;align-items:center}
      .dk-mq-item{flex-shrink:0;display:flex;align-items:center}
      .dk-mq-logo{height:22px;width:auto;opacity:.4;transition:opacity .3s}
      .dk-mq-item:hover .dk-mq-logo{opacity:.8}

      /* SECTION */
      .dk .sec{padding:8rem 0}
      .dk .sec-compact{padding:5rem 0}
      .dk .sec-alt{background:#111113}
      .dk .hed{font-family:var(--serif);font-weight:300;font-size:clamp(2rem,4vw,3.5rem);line-height:1.12;letter-spacing:-.02em}
      .dk .hed strong{font-weight:600}
      .dk .hed-accent{color:var(--accent)}
      .dk .sub{font-size:1.05rem;color:var(--g1);line-height:1.75;font-weight:300;margin-top:1.5rem;max-width:640px}

      /* STAT CARDS */
      .dk .stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border:1px solid var(--g4);border-radius:12px;overflow:hidden;margin-top:3rem}
      .dk .stat-card{padding:2.5rem 1.5rem;text-align:center;border-right:1px solid var(--g4)}
      .dk .stat-card:last-child{border-right:none}
      .dk .stat-n{font-family:var(--sans);font-weight:700;font-size:clamp(2rem,4vw,3rem);letter-spacing:-.03em;line-height:1}
      .dk .stat-n .plus{font-size:.5em;color:var(--accent)}
      .dk .stat-l{font-family:var(--mono);font-size:.6rem;color:var(--g2);letter-spacing:.12em;text-transform:uppercase;margin-top:.75rem}

      /* PROBLEM CARDS */
      .dk .prob-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin-top:3rem}
      .dk .prob{padding:2.5rem;border:1px solid var(--g4);margin-right:-1px;margin-bottom:-1px}
      .dk .prob-t{font-weight:600;font-size:1rem;margin-bottom:.75rem}
      .dk .prob-d{font-size:.88rem;color:var(--g1);line-height:1.65;font-weight:300}

      /* VIDEO BREAK */
      .dk .vid-break{position:relative;height:50vh;overflow:hidden}
      .dk .vid-break video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
      .dk .vid-break-ov{position:absolute;inset:0;background:linear-gradient(180deg,var(--bg) 0%,rgba(10,10,11,.3) 20%,rgba(10,10,11,.3) 80%,var(--bg) 100%);z-index:2}
      .dk .vid-break-c{position:relative;z-index:3;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 2rem}
      .dk .vid-break-c h2{font-family:var(--serif);font-weight:300;font-size:clamp(1.8rem,4vw,3rem);line-height:1.15;letter-spacing:-.02em}
      .dk .vid-break-c p{font-size:.9rem;color:rgba(255,255,255,.5);font-weight:300;margin-top:1rem;max-width:500px}

      /* WORK PHOTOS */
      .dk .photo-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;margin-top:3rem;border-radius:12px;overflow:hidden}
      .dk .photo-grid img{width:100%;aspect-ratio:16/10;object-fit:cover;filter:brightness(.85);transition:filter .4s}
      .dk .photo-grid img:hover{filter:brightness(1)}
      .dk .photo-cap{font-family:var(--mono);font-size:.55rem;color:var(--g3);text-align:center;padding:.5rem;letter-spacing:.08em;text-transform:uppercase}

      /* CASE STUDY VIDEO CARDS */
      .dk .cs-vid-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:3px;margin-top:3rem;border-radius:12px;overflow:hidden}
      .dk .cs-vid-card{position:relative;aspect-ratio:16/9;overflow:hidden}
      .dk .cs-vid-card video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
      .dk .cs-vid-card img.cs-vid-poster{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
      .dk .cs-vid-ov{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.15) 0%,rgba(0,0,0,.7) 100%);z-index:2}
      .dk .cs-vid-c{position:absolute;bottom:0;left:0;right:0;z-index:3;padding:2rem 2.5rem}
      .dk .cs-vid-logo{height:20px;width:auto;margin-bottom:1rem;opacity:.9}
      .dk .cs-vid-title{font-weight:700;font-size:1.1rem;margin-bottom:.5rem}
      .dk .cs-vid-desc{font-size:.78rem;color:rgba(255,255,255,.65);font-weight:300;line-height:1.5}
      .dk .cs-vid-stats{display:flex;gap:2rem;margin-top:1.25rem}
      .dk .cs-vid-stat-n{font-family:var(--sans);font-weight:700;font-size:1.3rem;letter-spacing:-.02em;line-height:1}
      .dk .cs-vid-stat-l{font-family:var(--mono);font-size:.5rem;color:rgba(255,255,255,.4);letter-spacing:.1em;text-transform:uppercase;margin-top:.3rem}

      /* MINI VIDEO REEL */
      .dk .vid-reel{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;margin-top:3rem;border-radius:12px;overflow:hidden}
      .dk .vid-reel-item{position:relative;aspect-ratio:9/12;overflow:hidden}
      .dk .vid-reel-item video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
      .dk .vid-reel-ov{position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,rgba(0,0,0,.75) 100%);z-index:2}
      .dk .vid-reel-lbl{position:absolute;bottom:1.5rem;left:1.5rem;z-index:3;font-family:var(--mono);font-size:.6rem;color:rgba(255,255,255,.6);letter-spacing:.12em;text-transform:uppercase}

      /* SERVICES LIST */
      .dk .svc-item{display:grid;grid-template-columns:60px 1fr;gap:0;padding:1.8rem 0;border-bottom:1px solid var(--g4)}
      .dk .svc-item:first-child{border-top:1px solid var(--g4)}
      .dk .svc-n{font-family:var(--serif);font-size:1.8rem;font-weight:300;color:var(--g4)}
      .dk .svc-t{font-weight:600;font-size:1rem;margin-bottom:.35rem}
      .dk .svc-d{font-size:.82rem;color:var(--g2);line-height:1.6;font-weight:300}

      /* TEAM */
      .dk .team-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;margin-top:3rem;border-radius:12px;overflow:hidden}
      .dk .tm{background:var(--off);text-align:center;padding:2.5rem 1.5rem}
      .dk .tm img{width:80px;height:80px;border-radius:50%;object-fit:cover;margin:0 auto 1rem;filter:grayscale(1);border:2px solid var(--g4)}
      .dk .tm h4{font-weight:600;font-size:.9rem;margin-bottom:.2rem}
      .dk .tm span{font-family:var(--mono);font-size:.6rem;color:var(--g2);letter-spacing:.1em;text-transform:uppercase}

      /* GEO */
      .dk .geo-grid{display:grid;grid-template-columns:1fr 1.5fr;gap:4rem;align-items:center;margin-top:3rem}
      .dk .geo-cards{display:grid;grid-template-columns:1fr 1fr;gap:2px;border-radius:12px;overflow:hidden}
      .dk .geo-card{background:var(--off);padding:2rem}
      .dk .geo-card h4{font-weight:600;font-size:1.1rem;margin-bottom:.5rem}
      .dk .geo-card p{font-size:.8rem;color:var(--g2);line-height:1.55;font-weight:300}
      .dk .geo-tag{font-family:var(--mono);font-size:.55rem;color:var(--accent);letter-spacing:.15em;text-transform:uppercase;margin-bottom:.75rem}

      /* PRESS */
      .dk .press-logos{display:flex;justify-content:center;gap:4rem;align-items:center;margin:3rem 0}
      .dk .press-logos img{height:28px;opacity:.4;filter:brightness(0) invert(1)}
      .dk .press-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border:1px solid var(--g4);border-radius:12px;overflow:hidden}
      .dk .press-stat{padding:2rem;text-align:center;border-right:1px solid var(--g4)}
      .dk .press-stat:last-child{border-right:none}
      .dk .press-stat-n{font-family:var(--serif);font-size:2.5rem;font-weight:300;line-height:1;letter-spacing:-.02em}
      .dk .press-stat-l{font-family:var(--mono);font-size:.55rem;color:var(--g2);letter-spacing:.12em;text-transform:uppercase;margin-top:.5rem}

      /* CTA */
      .dk .cta-sec{position:relative;padding:10rem 0;text-align:center;overflow:hidden}
      .dk .cta-bg{position:absolute;inset:0}
      .dk .cta-bg img{width:100%;height:100%;object-fit:cover}
      .dk .cta-ov{position:absolute;inset:0;background:rgba(10,10,11,.82)}
      .dk .cta-ov2{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,10,11,.6),transparent,rgba(10,10,11,.9))}
      .dk .cta-c{position:relative;z-index:2}
      .dk .cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-top:2.5rem}
      .dk .cta-btn-w{display:inline-flex;align-items:center;gap:.5rem;padding:.75rem 2rem;background:#fff;color:#000;font-weight:600;font-size:.85rem;border-radius:99px;text-decoration:none;transition:opacity .3s}
      .dk .cta-btn-w:hover{opacity:.85}
      .dk .cta-btn-o{display:inline-flex;align-items:center;gap:.5rem;padding:.75rem 2rem;border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.6);font-size:.85rem;border-radius:99px;text-decoration:none;transition:border-color .3s}
      .dk .cta-btn-o:hover{border-color:rgba(255,255,255,.35)}

      /* RESPONSIVE */
      @media(max-width:768px){
        .dk .hero h1{font-size:clamp(2.2rem,10vw,3.5rem)}
        .dk .hero-stats{grid-template-columns:repeat(2,1fr)}
        .dk .stat-grid,.dk .prob-grid,.dk .press-stats{grid-template-columns:repeat(2,1fr)}
        .dk .cs-vid-grid{grid-template-columns:1fr}
        .dk .geo-grid{grid-template-columns:1fr;gap:2rem}
        .dk .team-grid{grid-template-columns:repeat(2,1fr)}
        .dk .photo-grid{grid-template-columns:repeat(2,1fr)}
        .dk .geo-cards{grid-template-columns:1fr}
        .dk .press-logos{gap:2rem;flex-wrap:wrap}
        .dk .vid-reel{grid-template-columns:1fr 1fr}
        .dk .vid-reel-item:last-child{display:none}
        .dk .vid-break{height:40vh}
      }
    `}</style>

    <div className="dk">

      {/* 01 — HERO */}
      <section className="hero">
        <img src="/images/posters/hero-background-poster.jpg" alt="" className="hero-poster" />
        <video autoPlay muted loop playsInline preload="auto">
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        <div className="hero-ov1" />
        <div className="hero-ov2" />
        <div className="hero-c">
          <img src={logo} alt="ium Labs" style={{ width: 52, height: 52, borderRadius: 14, margin: "0 auto 1.5rem" }} />
          <h1>Seoul Moves Fast.<br /><span className="hero-accent">We Make You Land.</span></h1>
          <p className="hero-desc">Korea-native operators engineering market entry for the world's top Web3 projects. From narrative to conversion — end-to-end.</p>
          <div className="hero-pills">
            {["Seoul HQ","Singapore","22+ Launches","$7B+ Client Valuation"].map(p => (
              <span key={p} className="hero-pill">{p}</span>
            ))}
          </div>
        </div>
        <div className="hero-stats">
          {[["14M","Active Investors"],["$12.8B","Daily Volume"],["78%","Upbit Dominance"],["340%","Listing Premium"]].map(([n,l]) => (
            <div key={l} className="hero-stat">
              <div className="hero-stat-n">{n}</div>
              <div className="hero-stat-l">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CLIENT MARQUEE */}
      <Marquee />

      {/* 02 — PROBLEM */}
      <section className="sec wrap">
        <div className="lbl">The Problem</div>
        <h2 className="hed">Why global projects <strong className="hed-accent">fail in Korea.</strong></h2>
        <p className="sub">Korea is not a "translate and launch" market. It has its own platforms, gatekeepers, cultural codes, and regulatory walls.</p>
        <div className="prob-grid">
          {([["Platform Lock-Out","Korean users live on Naver, KakaoTalk, DC Inside — not Google, Telegram, or Discord. Western playbooks have zero reach."],
            ["Exchange Gatekeeping","Upbit controls 78% of volume. Without relationships and compliance infrastructure, listing is impossible."],
            ["Cultural Mistranslation","Korean investors evaluate through institutional trust, not decentralization narratives. Western messaging doesn't convert."],
            ["KOL Fraud","60%+ of Korean crypto 'influencers' use fabricated engagement. Without direct relationships, you pay for bots."],
            ["Regulatory Complexity","VASP registration, Travel Rule, PIPA, crypto tax — the legal surface area is vast and enforcement is real."],
            ["Community Fragmentation","KakaoTalk (closed) not Telegram (open). Building across fragmented platforms requires native operators."]] as const).map(([t,d])=>(
            <div key={t} className="prob">
              <div className="prob-t">{t}</div>
              <div className="prob-d">{d}</div>
            </div>
          ))}
        </div>
        <div className="sn">02 / 10</div>
      </section>

      {/* VIDEO BREAK — Manifesto */}
      <section className="vid-break">
        <video autoPlay muted loop playsInline preload="auto" poster="/images/posters/services-hero.jpg">
          <source src="/videos/manifesto.mp4" type="video/mp4" />
        </video>
        <div className="vid-break-ov" />
        <div className="vid-break-c">
          <h2>We don't localize decks.<br />We <strong style={{ fontWeight: 600, color: "var(--accent)" }}>rebuild narratives.</strong></h2>
          <p>Built by exchange alumni. Native to platforms foreigners can't touch.</p>
        </div>
      </section>

      {/* 03 — SOLUTION */}
      <section className="sec wrap">
        <div className="lbl">The Solution</div>
        <h2 className="hed">Korea's dedicated <strong className="hed-accent">growth engine</strong> for global Web3.</h2>
        <p className="sub">ium Labs deploys operators, not consultants. Founded by Binance, KuCoin, and Upbit alumni who scaled exchanges to millions.</p>
        <div className="stat-grid" style={{ marginTop: "3rem" }}>
          {([["Operator Model","Founded by Binance, KuCoin, and Upbit operators. Same playbooks that scaled exchanges to millions."],
            ["Direct Access","230+ KOLs. Every one audience-verified, fraud-filtered. No broker markup."],
            ["End-to-End","9 services, one team. GTM to compliance. No vendor coordination."],
            ["30-Day Launch","Discovery to market presence in 30 days. Performance dashboards from week one."]] as const).map(([t,d])=>(
            <div key={t} className="stat-card" style={{ textAlign: "left" }}>
              <div style={{ fontWeight: 600, fontSize: ".9rem", marginBottom: ".5rem" }}>{t}</div>
              <div style={{ fontSize: ".8rem", color: "var(--g1)", lineHeight: 1.6, fontWeight: 300 }}>{d}</div>
            </div>
          ))}
        </div>
        <div className="sn">03 / 10</div>
      </section>

      {/* 04 — TRACTION */}
      <section className="sec sec-alt">
        <div className="wrap">
          <div className="lbl">Traction</div>
          <h2 className="hed">Numbers that <strong className="hed-accent">compound.</strong></h2>
          <div className="stat-grid">
            {[["$7B","Combined Client Valuation"],["22","Successful Korea Entries"],["230","Direct KOL Relationships"],["$30M","Revenue Attributed"]].map(([n,l])=>(
              <div key={l} className="stat-card">
                <div className="stat-n">{n}<span className="plus">+</span></div>
                <div className="stat-l">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="wrap" style={{ marginTop: "4rem" }}>
          <div className="lbl">Selected Events & Activations</div>
          <div className="photo-grid">
            {([
              [eventSahara, "Sahara AI · 400+ Attendees"],
              [eventBnb, "BNB Chain · VIP Hanok Dinner"],
              [eventAptos, "Aptos · Seoul Meetup"],
              [eventMantra, "Mantra · Networking Night"],
              [eventStory, "Story · Origin Summit 2025"],
              [eventPeaq, "peaq · Korea Summit"],
              [eventSynfutures, "SynFutures · Seoul Billboard"],
              [eventMegaeth, "MegaETH · Launch Event"],
              [eventTria, "Tria · Korea Launch"],
            ] as const).map(([img, cap]) => (
              <div key={cap}>
                <img src={img} alt={cap} />
                <div className="photo-cap">{cap}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="wrap"><div className="sn">04 / 10</div></div>
      </section>

      {/* 05 — CASE STUDIES (Multi-project with video) */}
      <section className="sec wrap">
        <div className="lbl">Case Studies</div>
        <h2 className="hed">Projects we <strong className="hed-accent">launched in Korea.</strong></h2>
        <p className="sub">From AI infrastructure to IP protocols, each entry required a tailored Korea playbook.</p>
        <div className="cs-vid-grid">
          <div className="cs-vid-card">
            <video autoPlay muted loop playsInline preload="auto" poster="/images/posters/sahara-hero.jpg">
              <source src="/videos/projects/sahara-hero.mp4" type="video/mp4" />
            </video>
            <div className="cs-vid-ov" />
            <div className="cs-vid-c">
              <img src={logoSaharaColor} alt="Sahara AI" className="cs-vid-logo" />
              <div className="cs-vid-title">AI Infrastructure Launch</div>
              <div className="cs-vid-desc">400-person Seoul flagship event, KOL blitz across Korean CT, Naver SEO + PR campaign.</div>
              <div className="cs-vid-stats">
                <div><div className="cs-vid-stat-n">400+</div><div className="cs-vid-stat-l">Event Attendees</div></div>
                <div><div className="cs-vid-stat-n">2.8M</div><div className="cs-vid-stat-l">Impressions</div></div>
                <div><div className="cs-vid-stat-n">15K</div><div className="cs-vid-stat-l">KR Community</div></div>
              </div>
            </div>
          </div>
          <div className="cs-vid-card">
            <video autoPlay muted loop playsInline preload="auto" poster="/images/posters/story-hero.jpg">
              <source src="/videos/projects/story-hero.mp4" type="video/mp4" />
            </video>
            <div className="cs-vid-ov" />
            <div className="cs-vid-c">
              <img src={logoStoryColor} alt="Story Protocol" className="cs-vid-logo" />
              <div className="cs-vid-title">Origin Summit Seoul</div>
              <div className="cs-vid-desc">Full Korea GTM: Origin Summit co-production, 50+ KOL activations, #1 trending on Korean CT.</div>
              <div className="cs-vid-stats">
                <div><div className="cs-vid-stat-n">#1</div><div className="cs-vid-stat-l">Korean CT Trending</div></div>
                <div><div className="cs-vid-stat-n">50+</div><div className="cs-vid-stat-l">KOLs Activated</div></div>
                <div><div className="cs-vid-stat-n">4.2M</div><div className="cs-vid-stat-l">Media Reach</div></div>
              </div>
            </div>
          </div>
          <div className="cs-vid-card">
            <video autoPlay muted loop playsInline preload="auto" poster="/images/posters/bnb-hero.jpg">
              <source src="/videos/projects/bnb-hero.mp4" type="video/mp4" />
            </video>
            <div className="cs-vid-ov" />
            <div className="cs-vid-c">
              <img src={logoBnbColor} alt="BNB Chain" className="cs-vid-logo" />
              <div className="cs-vid-title">Ecosystem Growth Korea</div>
              <div className="cs-vid-desc">VIP Hanok dinner series, institutional BD, ongoing community ops and quarterly events.</div>
              <div className="cs-vid-stats">
                <div><div className="cs-vid-stat-n">30+</div><div className="cs-vid-stat-l">Partnerships</div></div>
                <div><div className="cs-vid-stat-n">5</div><div className="cs-vid-stat-l">Seoul Events</div></div>
                <div><div className="cs-vid-stat-n">$1.5B</div><div className="cs-vid-stat-l">TVL</div></div>
              </div>
            </div>
          </div>
          <div className="cs-vid-card">
            <video autoPlay muted loop playsInline preload="auto" poster="/images/posters/mantra-hero.jpg">
              <source src="/videos/projects/mantra-hero.mp4" type="video/mp4" />
            </video>
            <div className="cs-vid-ov" />
            <div className="cs-vid-c">
              <img src={logoMantraColor} alt="Mantra" className="cs-vid-logo" />
              <div className="cs-vid-title">RWA Protocol Korea Entry</div>
              <div className="cs-vid-desc">Community launch, KOL campaign, exchange listing support, and ongoing PR in Korean media.</div>
              <div className="cs-vid-stats">
                <div><div className="cs-vid-stat-n">25+</div><div className="cs-vid-stat-l">KOLs Activated</div></div>
                <div><div className="cs-vid-stat-n">12</div><div className="cs-vid-stat-l">Press Articles</div></div>
                <div><div className="cs-vid-stat-n">8K</div><div className="cs-vid-stat-l">KR Community</div></div>
              </div>
            </div>
          </div>
        </div>
        <div className="sn">05 / 10</div>
      </section>

      {/* VIDEO REEL — Project Highlights */}
      <section className="sec-compact sec-alt">
        <div className="wrap">
          <div className="lbl">Project Reel</div>
          <div className="vid-reel">
            <div className="vid-reel-item">
              <video autoPlay muted loop playsInline preload="auto" poster="/images/posters/kucoin-hero.jpg">
                <source src="/videos/projects/kucoin-hero.mp4" type="video/mp4" />
              </video>
              <div className="vid-reel-ov" />
              <div className="vid-reel-lbl">KuCoin Korea</div>
            </div>
            <div className="vid-reel-item">
              <video autoPlay muted loop playsInline preload="auto" poster="/images/posters/aptos-hero.jpg">
                <source src="/videos/projects/aptos-hero.mp4" type="video/mp4" />
              </video>
              <div className="vid-reel-ov" />
              <div className="vid-reel-lbl">Aptos Seoul</div>
            </div>
            <div className="vid-reel-item">
              <video autoPlay muted loop playsInline preload="auto" poster="/images/posters/spacecoin-hero.jpg">
                <source src="/videos/projects/spacecoin-hero.mp4" type="video/mp4" />
              </video>
              <div className="vid-reel-ov" />
              <div className="vid-reel-lbl">SpaceCoin</div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — SERVICES */}
      <section className="sec wrap">
        <div className="lbl">Full-Stack Services</div>
        <h2 className="hed">Everything you need to <strong className="hed-accent">land in Korea.</strong></h2>
        <div style={{ marginTop: "2rem" }}>
          {([["01","GTM Strategy","Competitive analysis, Korea-fit narrative, audience segmentation, launch roadmap."],
            ["02","KOL & Influencer","230+ vetted KOLs. YouTube, X, Telegram, Naver. Direct — no brokers."],
            ["03","PR & Media","CoinDesk Korea, Block Media, TokenPost. 87% placement rate."],
            ["04","Community","24/7 native managers. Telegram, Discord, KakaoTalk. 92% retention."],
            ["05","Offline Events","KBW side events, VIP dinners, launch parties. 40+ Seoul venue relationships."],
            ["06","Deep Research","On-chain analytics, competitor mapping, sentiment tracking. 47 reports."],
            ["07","SEO & Paid Ads","Naver SEO, Google/X Ads, crypto ad networks. 287% traffic growth."],
            ["08","AMA Hosting","Native Korean hosts. 200+ AMAs, 50K+ live participants."],
            ["09","Regulatory & Compliance","VASP registration, PIPA, AML/KYC. Partnership with Freeman Law."]] as const).map(([n,t,d])=>(
            <div key={n} className="svc-item">
              <div className="svc-n">{n}</div>
              <div>
                <div className="svc-t">{t}</div>
                <div className="svc-d">{d}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="sn">06 / 10</div>
      </section>

      {/* VIDEO BREAK — Services */}
      <section className="vid-break">
        <video autoPlay muted loop playsInline preload="auto" poster="/images/posters/gtm-hero.jpg">
          <source src="/videos/services-hero.mp4" type="video/mp4" />
        </video>
        <div className="vid-break-ov" />
        <div className="vid-break-c">
          <h2>9 services.<br />One team. <strong style={{ fontWeight: 600, color: "var(--accent)" }}>30-day launch.</strong></h2>
        </div>
      </section>

      {/* 07 — GEOGRAPHY */}
      <section className="sec">
        <div className="wrap">
          <div className="lbl">Coverage</div>
          <h2 className="hed">Korea-native. <strong className="hed-accent">Asia-wide reach.</strong></h2>
          <div className="geo-grid">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={asiaGlobe} alt="Asia" style={{ maxWidth: 260, opacity: .5, filter: "hue-rotate(240deg) saturate(.4) brightness(1.6)" }} />
            </div>
            <div className="geo-cards">
              <div className="geo-card" style={{ borderLeft: "2px solid var(--accent)" }}>
                <div className="geo-tag">Headquarters</div>
                <h4>South Korea</h4>
                <p>Upbit, Bithumb, Korean CT, Naver, Kakao, DC Inside. Full native team.</p>
              </div>
              {([["Japan","LINE ecosystem, bitFlyer, Coincheck. Regulated entry."],["Taiwan","Local KOL network, exchange partnerships, community ops."],["China","Mainland BD, institutional network, WeChat CT."]] as const).map(([c,d])=>(
                <div key={c} className="geo-card">
                  <div className="geo-tag" style={{ color: "var(--g2)" }}>Active Market</div>
                  <h4>{c}</h4>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="wrap"><div className="sn">07 / 10</div></div>
      </section>

      {/* 08 — TEAM */}
      <section className="sec wrap">
        <div className="lbl">Team</div>
        <h2 className="hed">Built by operators, <strong className="hed-accent">not consultants.</strong></h2>
        <p className="sub">Every member has lived inside the Korean crypto ecosystem — operating exchanges, managing communities, running campaigns firsthand.</p>
        <div className="team-grid">
          {([
            [teamDavid, "David", "CEO"],
            [teamBennet, "Bennet", "COO"],
            [teamJ, "J", "CMO"],
            [teamKevin, "Kevin", "Head of BD"],
            [teamSuki, "Suki", "Managing Partner"],
            [teamLewis, "Lewis", "PR Manager"],
            [teamRachel, "Rachel", "Designer"],
            [teamHyukjae, "Hyukjae", "BD Manager"],
          ] as const).map(([img, n, r]) => (
            <div key={n} className="tm">
              <img src={img} alt={n} />
              <h4>{n}</h4>
              <span>{r}</span>
            </div>
          ))}
        </div>
        <div className="sn">08 / 10</div>
      </section>

      {/* 09 — PRESS */}
      <section className="sec-compact wrap">
        <div className="lbl">Press & Media</div>
        <div className="press-logos">
          {([
            [logoCoindesk, "CoinDesk Korea"],
            [logoBlockmedia, "Block Media"],
            [logoHankyung, "Hankyung"],
          ] as const).map(([img, name]) => (
            <img key={name} src={img} alt={name} />
          ))}
        </div>
        <div className="press-stats">
          {[["64+","Press Articles"],["87%","Placement Rate"],["47","Research Reports"],["5M+","Media Reach"]].map(([n,l])=>(
            <div key={l} className="press-stat">
              <div className="press-stat-n">{n}</div>
              <div className="press-stat-l">{l}</div>
            </div>
          ))}
        </div>
        <div className="sn">09 / 10</div>
      </section>

      {/* 10 — CTA */}
      <section className="cta-sec">
        <div className="cta-bg">
          <img src={seoulCta} alt="" />
          <div className="cta-ov" />
          <div className="cta-ov2" />
        </div>
        <div className="cta-c">
          <img src={logo} alt="ium Labs" style={{ width: 48, height: 48, borderRadius: 14, margin: "0 auto 1.5rem" }} />
          <h2 className="hed" style={{ textAlign: "center", maxWidth: 700, margin: "0 auto" }}>Ready to land <strong className="hed-accent">in Korea?</strong></h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.6)", lineHeight: 1.8, fontWeight: 300, marginTop: "1.5rem", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
            From strategy to execution. One call to align on your Korea market entry. Free 30-minute discovery. 24-hour response guarantee.
          </p>
          <div className="cta-btns">
            <a href="https://iumlabs.io/book-a-meeting" className="cta-btn-w">Book a Meeting</a>
            <a href="https://iumlabs.io/contact" className="cta-btn-o">Send a Message</a>
          </div>
          <div style={{ display: "flex", gap: "3rem", justifyContent: "center", flexWrap: "wrap", marginTop: "3rem" }}>
            {([["Email","hello@iumlabs.io"],["Web","iumlabs.io"],["Location","Seoul · Singapore"]] as const).map(([l,v])=>(
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: ".55rem", color: "var(--g3)", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: ".3rem" }}>{l}</div>
                <div style={{ fontSize: ".9rem", fontWeight: 500 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ width: 40, height: 1, background: "var(--accent)", opacity: .4, margin: "3rem auto 1rem" }} />
          <div style={{ fontFamily: "var(--mono)", fontSize: ".6rem", color: "var(--g3)", letterSpacing: ".1em" }}>Confidential — ium Labs Q2 2026</div>
        </div>
        <div className="wrap"><div className="sn">10 / 10</div></div>
      </section>

    </div>
  </>
);

export default PitchDeck;
