# Service-page media overhaul — plan

Goal: replace the generic / AI / stock media on every service detail page (and the homepage cards) with real, topically-precise media — real video or the exact right image — so each page *shows the actual work*. John's canonical example: **Paid Ads → pull a real OKX ad video from the Meta Ad Library** rather than a mockup graphic.

Standing constraint (from memory): reference-driven, not invented taste. Real assets over renders. Full color (no monochrome). Where no real asset fits, a clean branded panel (already built into ServiceTemplate).

---

## 1. Current inventory (grounding)

13 service pages via ServiceTemplate. Each: 1 hero + 2–5 feature images + 1 deliverable ≈ **60+ media slots**, plus 12 homepage cards.

**Already real / keep:**
- GTM — real campaign event photos (bnb-hanok, kucoin-party, mantra, bybit, sahara, polygon) + team.
- Offline Events — event-conference/dinner/party/meetup (real).
- Listing hero, Exchange-marketing (partially real screens).

**Bad (generic / AI / UI-mockup) → replace:**
- SEO & Paid Ads: `paid-ads-gallery.png`, `seo-performance.png`, `seo-growth-plan.webp`
- Exchange Marketing: `paid-ads-gallery.png`, `trading-kol-chart.webp`, `exchange-numbers.png`
- Influencer/KOL: `kol-performance.png`, `kol-multiplatform.png`, `kol-campaign.webp`, `kol-roster.webp`
- Community: `community-moderation.webp`, `comm-*`, `community-events.jpg`
- PR: `pr-newsroom.jpg`, `pr-distribution.webp`, `pr-mainstream.jpg`, `pr-crisis.jpg`, `pr-narrative-plan.webp`
- Deep Research: `dr-market-mapping.png`, `dr-onchain.png`, `dr-report.png`, `res-competitor.jpg`
- AMA: `ama-telegram/discord/moderation/content.jpg`, `ama-runofshow.webp`
- Capital / Liquidity: `capital-hero`, `res-market`, `liquidity-sizing`, `pr-analytics` (generic finance)
- Compliance: already converted to clean panels ✓

Phase 1 of execution = a screenshot contact-sheet audit that grades every slot keep / replace-image / replace-video / clean.

---

## 2. Per-service media strategy + source

| Service | Right media | Source |
|---|---|---|
| SEO / Paid Ads | Real KR crypto ad creatives (OKX/Bybit/Upbit), short video | **Meta Ad Library**, Google Ads Transparency, TikTok Creative Center |
| Exchange Marketing | Real exchange ad creatives + real funnel dashboard | Meta Ad Library + our own campaign numbers |
| Influencer / KOL | Real Korean crypto KOL clips/thumbnails | YouTube (real KR KOL channels), our own campaign clips |
| Community | Real meetup/event photos + Telegram/Kakao screens | Our campaign folder + captured chat screens |
| PR & Media | Real KR media article screenshots | CoinDesk Korea, TokenPost, Block Media (captured) |
| AMA | Real AMA recording clip / Spaces screenshot | YouTube/X of past AMAs |
| Deep Research | Our own native charts / on-chain dashboards | Reuse blog charts, Dune/DefiLlama captures |
| CEX Listing | Real Upbit/Bithumb listing-notice screenshots | Exchange announcement pages (captured) |
| Market Making | Real order-book depth / spread visuals | TradingView / exchange depth (captured) |
| Capital & OTC | Clean branded panel (no honest photo) | ServiceTemplate clean mode |
| GTM / Offline | Keep real event photos | — |
| Compliance | Clean panels (done) | — |

Rule of honesty: our own work first; market/competitor examples only where framed as market examples, never implied as ours.

---

## 3. Sourcing pipeline
1. **Meta Ad Library** (`facebook.com/ads/library`) — public. Search advertiser (OKX, Bybit, Bithumb, Upbit) + region KR. Capture the creative (image) or download the video. Headless capture via gstack browse.
2. **Headless screenshots** — Upbit/Bithumb notices, Naver SERP, KR media articles, on-chain dashboards. gstack browse at 1280×800, cookie banners removed, verify by eye (same discipline as blog primary-source captures).
3. **YouTube embeds** — real KOL / AMA videos, privacy-nocookie, lazy facade (click-to-load) for perf + CSP.
4. **Our own assets** — campaign folder, event footage, blog charts.

Processing: images → webp/avif, sized; videos → mp4/webm, muted, ≤ ~10s loops for ambient, poster frame captured, mobile falls back to poster image.

---

## 4. Technical build
- Extend ServiceTemplate: media slot accepts `{type: image|video|youtube, src, poster}`; feature/hero/deliverable render accordingly. Video = muted autoplay loop w/ poster + reduced-motion & mobile fallback to poster. (Clean mode already exists.)
- Homepage cards: optional video-on-hover (reference candidate: Cuberto card video-on-hover).
- Perf budget: hero video ≤ ~1.5 MB, lazy past-fold, `preload=none`, poster always set, `prefers-reduced-motion` respected.
- CSP: self-hosted video needs no external host; YouTube facade only loads on click.

---

## 5. Risks
- **Competitor creatives** (OKX/Binance ads): trademark/perception. Mitigate by framing as "market examples," preferring our own, and never implying authorship. **Needs John's call.**
- **Video weight / LCP**: strict budgets, posters, lazy load, image fallback.
- **Link rot** on captured screenshots: store the asset, cite source+date.
- **Maintenance**: ad creatives rotate; captured assets are snapshots, fine.

---

## 6. Phasing (large job, sequenced)
- **P0 Audit** — contact-sheet grade every slot (keep/replace/clean) + confirm per-service media spec.
- **P1 Plumbing** — add video/media support to ServiceTemplate + homepage card hover-video; ship with 1 pilot page (SEO/Paid Ads) end-to-end.
- **P2 Source** — batch capture/download real media per service (parallel), process to budget.
- **P3 Apply** — wire assets page by page, verify each by screenshot, keep clean panels where nothing honest fits.
- **P4 Finish** — OG re-capture where hero changed, perf pass (LCP/CLS), mobile check, push.

Pilot first (SEO/Paid Ads with a real OKX ad) to prove the pipeline before scaling to all 13.

---

## 7. Decisions (John, confirmed 2026-07-04)
- **Video hosting: HYBRID** — self-host ad-creative + event loops (mp4/webm, muted, poster, budgeted); YouTube facade (click-to-load) for long-form KOL/AMA.
- **Competitor creatives: USE AS MARKET EXAMPLES** — our own assets first; real OKX/Bybit/etc. ads from Meta Ad Library allowed, clearly framed as "Korea paid-ads market examples," never implied as ours.
- **Scope: PILOT THEN SEQUENTIAL** — build SEO/Paid Ads end-to-end with a real OKX ad to prove the pipeline, then replace worst-offenders in order (Paid Ads → Exchange → KOL → PR → Research → Community), leaving GTM / Offline Events / Compliance as-is.
