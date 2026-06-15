import { Search, Target, BarChart3 } from "lucide-react";
import ServiceTemplate from "@/components/ServiceTemplate";

/* PLACEHOLDER IMAGES, swap for provided photos (update these imports only). */
import heroImg from "@/assets/services/seo-naver.jpg";
import featNaverImg from "@/assets/platforms/seo-naver.jpg";
import featPaidImg from "@/assets/services/cex-paid-ads.webp";
import featTrackImg from "@/assets/services/seo-performance.png";
import deliverableImg from "@/assets/services/seo-growth-plan.webp";

const ACCENT = "#22C55E";

const SEOAdsService = () => (
  <ServiceTemplate
    accent={ACCENT}
    breadcrumb="SEO & Paid Ads"
    seo={{
      title: "Korea Crypto SEO & Targeted Paid Ads | ium Labs",
      description: "Maximize search visibility via Naver SEO, targeted Google Ads, and specialized crypto ad networks tailored for the Korean Web3 market.",
      path: "/services/seo-ads",
      keywords: ["Korea Naver SEO", "Crypto Ads Korea", "Naver SEO crypto", "Google Ads crypto certified", "crypto paid media", "Korea search marketing"],
    }}
    schema={{ name: "Korea SEO & Paid Ads", description: "Naver SEO, Google Ads, and crypto ad networks for the Korean market.", serviceType: ["SEO", "Paid Advertising", "Search Engine Marketing"] }}
    hero={{
      eyebrow: "SEO & PAID ADS",
      titleLead: <>Be found where<br />Korea</>,
      titleAccent: "searches.",
      lede: "Naver SEO, Google Ads, X Ads, and crypto ad networks. We know which platforms ban crypto and how to get certified, then structure campaigns that actually convert Korean audiences.",
      image: heroImg,
      primaryCta: { label: "Get a search & ads audit", href: "/contact" },
    }}
    stats={[{ v: "Top-3", l: "Naver Rankings" }, { v: "12+", l: "Keywords Targeted" }, { v: "3.4x", l: "ROAS" }, { v: "42%", l: "Lower CPA" }]}
    strip={{ label: "Channels we run", items: ["Naver SEO", "Google Ads", "X Ads", "Coinzilla", "Brave Ads", "Naver Power Link", "Telegram Ads"] }}
    reality={{
      heading: "Korea doesn't Google.",
      headingAccent: "Korea Navers.",
      body: [
        "70% of Korean search traffic goes through Naver, and its algorithm rewards completely different content than Google. Naver Blog posts outrank traditional web pages, and Naver Smart Blocks dominate the SERP. If you optimize for Google only, you're invisible to Korean users.",
        "Add crypto ad bans on most platforms, and the challenge compounds. Google requires a special crypto advertiser certification, and most ad networks reject crypto campaigns outright. You need someone who knows which networks accept crypto, how to navigate certification, and how to structure campaigns that convert Korean audiences.",
      ],
    }}
    process={{
      heading: "From audit to",
      headingAccent: "first-page rankings.",
      steps: [
        { t: "PHASE 1", title: "Audit", body: "Full audit of current search presence, ad accounts, and competitor positioning across Naver and Google." },
        { t: "PHASE 2", title: "Strategy", body: "Keyword mapping, channel selection, budget allocation, and creative direction. Crypto certification if needed." },
        { t: "PHASE 3", title: "Execute", body: "Launch campaigns across approved channels. Naver Blog content, paid ads, and A/B tests all running in parallel." },
        { t: "PHASE 4", title: "Optimize", body: "Weekly performance review. Pause underperformers, scale winners, test new creatives. A continuous improvement loop." },
      ],
    }}
    features={[
      { icon: Search, eyebrow: "01 · Naver SEO", title: "Naver SEO & Keyword Strategy", body: "Naver's algorithm is completely different from Google, with different ranking factors, content formats, and link structures. We build the blog content strategy, keyword research, and Naver-specific optimization that earns first-page placement in the search engine 70% of Korea actually uses.", points: ["Naver Blog content strategy & production", "Keyword research for Korean intent", "Smart Block & SERP optimization", "Native Korean copy by in-house writers"], image: featNaverImg },
      { icon: Target, eyebrow: "02 · CEX Ads", title: "CEX Paid Ads", body: "Paid campaigns engineered to put users on an exchange, not just rack up impressions. We target by exchange, region, demographic, and gender, then optimize the full funnel, app install to sign-up to first deposit, across the crypto-friendly networks most agencies can't even get approved on.", points: ["Exchange-targeted user acquisition", "Demographic & gender-specific targeting", "Full funnel: install, sign-up, first deposit", "Certified crypto channels: Google, X, Coinzilla, Brave"], image: featPaidImg },
      { icon: BarChart3, eyebrow: "03 · Tracking", title: "Performance Tracking & ROI", body: "Every dollar is tracked from impression to click to conversion. Weekly reporting with full attribution, campaign-level and channel-level ROAS, and actionable recommendations so budget always flows to what works.", points: ["Weekly reporting with full attribution", "Campaign & channel-level ROAS", "Impression-to-conversion tracking", "Actionable optimization recommendations"], image: featTrackImg },
    ]}
    deliverable={{ eyebrow: "THE DELIVERABLE", title: <>Search & Paid Growth Plan&trade;</>, body: "Every engagement starts with a graded plan: where you rank on Naver and Google today, which channels accept your campaigns, the keywords and budget that will move the needle, and the exact sequence to execute it.", cta: "Request your growth plan", image: deliverableImg }}
    faq={{
      heading: "The questions founders actually ask.",
      sub: "Straight answers on timing, certification, budget, and what really moves Korean search.",
      items: [
        { q: "How long does Naver SEO take to show results?", a: "Naver Blog SEO can show first-page rankings within 4 to 6 weeks for targeted keywords. Sustained first-page dominance typically takes 2 to 3 months of consistent content production." },
        { q: "Can you get Google Ads approved for crypto projects?", a: "Yes. We handle the full Google crypto advertiser certification process. Approval typically takes 2 to 3 weeks, and we've never had a certification rejected." },
        { q: "What's the minimum ad budget you recommend?", a: "For Naver SEO content, $3K to $5K per month. For paid ads across Google and crypto networks, we recommend a minimum of $5K per month in ad spend to generate statistically meaningful data for optimization." },
        { q: "Do you handle creative production for ads?", a: "Yes. We produce all ad creatives, landing pages, and Naver Blog content in-house. Everything is produced in Korean by native speakers and optimized for each platform's specifications." },
      ],
    }}
  />
);

export default SEOAdsService;
