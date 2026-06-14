import { Newspaper, Send, Megaphone, ShieldAlert } from "lucide-react";
import ServiceTemplate from "@/components/ServiceTemplate";

/* PLACEHOLDER IMAGES, swap for provided photos (update these imports only). */
import heroImg from "@/assets/services/pr-hero.webp";
import featNarrativeImg from "@/assets/platforms/pr-newsroom.jpg";
import featDistributionImg from "@/assets/services/pr-distribution.webp";
import featMainstreamImg from "@/assets/platforms/pr-mainstream.jpg";
import featCrisisImg from "@/assets/platforms/pr-crisis.jpg";
import deliverableImg from "@/assets/services/pr-narrative-plan.webp";

const ACCENT = "#8B5CF6";

const PRService = () => (
  <ServiceTemplate
    accent={ACCENT}
    breadcrumb="PR & Media"
    seo={{
      title: "Korea Crypto PR Agency & Web3 Media | ium Labs",
      description: "Strategic crypto PR distribution and media relations in Korea. Localized narrative building and press coverage for global blockchain projects through CoinDesk Korea, Block Media, and TokenPost.",
      path: "/services/pr",
      keywords: ["Korea Crypto PR", "Korean Media Relations", "crypto press distribution", "Web3 media Korea", "CoinDesk Korea", "blockchain PR agency"],
    }}
    schema={{ name: "Korea PR & Media", description: "Korean press coverage and narrative building through CoinDesk Korea, Block Media, TokenPost, and mainstream outlets, built on direct journalist relationships.", serviceType: ["PR", "Media Relations", "Press Coverage"] }}
    hero={{
      eyebrow: "PR & MEDIA",
      titleLead: <>Stories Korean journalists<br />actually want</>,
      titleAccent: "to publish.",
      lede: "CoinDesk Korea, Block Media, TokenPost, and mainstream outlets. We build the narrative, write it natively in Korean, and place it through direct journalist relationships, not spray-and-pray pitching.",
      image: heroImg,
      primaryCta: { label: "Plan your coverage", href: "/contact" },
    }}
    stats={[{ v: "200+", l: "Articles Placed" }, { v: "Tier-1", l: "to Niche Outlets" }, { v: "KR · Asia", l: "Media Coverage" }, { v: "24/7", l: "Crisis-Ready" }]}
    strip={{ label: "Media coverage", items: ["CoinDesk Korea", "TokenPost", "Block Media", "Decenter", "Chosun", "MoneyToday", "Hankyung", "Nikkei"] }}
    reality={{
      heading: "Global PR does not work",
      headingAccent: "in Korean media.",
      body: [
        "Korean crypto journalists do not read English press releases. They have their own editorial calendars, beat structures, and trust networks, and a translated release sent to a generic media list gets you zero coverage.",
        "The journalists who matter respond to relationships, not cold pitches. We pitch stories, not press releases, through reporters we already know at the outlets that move the Korean crypto narrative.",
      ],
    }}
    process={{
      heading: "From story to",
      headingAccent: "published coverage.",
      steps: [
        { t: "PHASE I", title: "Story Development", body: "Identify the newsworthy angle, craft the narrative, and write Korean-native press materials that read naturally, not translated corporate speak." },
        { t: "PHASE II", title: "Media Outreach", body: "Direct, personal pitching to the right journalists at each outlet, with a tailored angle per beat instead of a blanket blast." },
        { t: "PHASE III", title: "Distribution", body: "Coordinated publishing, embargo management, and social amplification so coverage lands with maximum reach." },
        { t: "PHASE IV", title: "Impact Tracking", body: "Article performance, reach analytics, and sentiment monitoring, delivered as clear monthly reports on your Korean media presence." },
      ],
    }}
    features={[
      { icon: Newspaper, eyebrow: "01 · Narrative", title: "Narrative & Messaging", body: "Native Korean writers who understand crypto terminology and Korean media conventions. We find the newsworthy angle and craft a narrative that reads naturally to a Korean editor, not a translated corporate release.", points: ["Korean-native press materials", "Newsworthy angle development", "Crypto-fluent messaging", "Founder positioning and thought leadership"], image: featNarrativeImg },
      { icon: Send, eyebrow: "02 · Distribute", title: "Korean Press Distribution", body: "Personal relationships with reporters at CoinDesk Korea, Block Media, TokenPost, BloomingBit, and Hankyung. We pitch stories with a tailored angle per outlet, then manage embargoes and coordinated timing.", points: ["Direct journalist outreach", "Per-outlet tailored angles", "Embargo and timing management", "Interview and bylined-article placement"], image: featDistributionImg },
      { icon: Megaphone, eyebrow: "03 · Amplify", title: "Mainstream & Tier-1 Placement", body: "Coverage beyond the crypto press. For stories with broader financial relevance, we reach mainstream and Tier-1 outlets like Chosun Ilbo, Maeil Business, and MBN to put your project in front of a wider Korean audience.", points: ["Mainstream financial media reach", "Tier-1 outlet placement", "Expert commentary and op-eds", "Cross-channel social amplification"], image: featMainstreamImg },
      { icon: ShieldAlert, eyebrow: "04 · Protect", title: "Crisis Comms", body: "Korean crypto Twitter moves fast. We stand up pre-drafted statement templates, rapid response protocols, and real-time monitoring so you can respond in Korean within hours, not days, when a story breaks.", points: ["Pre-drafted Korean statements", "Rapid response protocols", "Real-time media monitoring", "Sentiment and share-of-voice tracking"], image: featCrisisImg },
    ]}
    deliverable={{ eyebrow: "THE DELIVERABLE", title: <>Media & Narrative Plan&trade;</>, body: "Every engagement starts with a written plan: your core narrative, the angles each outlet will care about, the journalists we will pitch, and the timeline from story development to published coverage.", cta: "Request your plan", image: deliverableImg }}
    faq={{
      heading: "The questions founders actually ask.",
      sub: "Straight answers on timing, guarantees, crisis response, and language.",
      items: [
        { q: "How fast can you get coverage?", a: "Urgent placements: 24 to 48 hours. Planned campaigns: 1 to 2 weeks including story development and journalist coordination." },
        { q: "Do you guarantee coverage?", a: "No ethical PR firm guarantees specific placements. Our 87% success rate means the vast majority of stories we pitch get published." },
        { q: "Can you handle crisis communication?", a: "Yes. Pre-built crisis protocols and Korean-language statements ready within hours." },
        { q: "Do you write in both Korean and English?", a: "All materials written natively in Korean. English versions also provided for your global team." },
      ],
    }}
  />
);

export default PRService;
