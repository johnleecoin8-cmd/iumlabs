// Import logos
import bnbLogo from "@/assets/logos/bnb.svg";
import kucoinLogo from "@/assets/logos/kucoin.svg";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import peaqLogo from "@/assets/logos/peaq.png";
import storyLogo from "@/assets/logos/story-protocol.png";
import megaethLogo from "@/assets/logos/megaeth.png";
import triaLogo from "@/assets/logos/tria.png";
import bybitLogo from "@/assets/logos/bybit.png";
import saharaAiLogo from "@/assets/logos/sahara-ai.png";
import mantraLogo from "@/assets/logos/mantra.png";
import synfuturesLogo from "@/assets/logos/synfutures.png";

// Import campaign images
import bnbEventImg from "@/assets/campaigns/bnb-event.jpg";
import kucoinCampaignImg from "@/assets/campaigns/kucoin-campaign.jpg";
import kucoinNewImg from "@/assets/campaigns/kucoin-new.jpg";
import kucoinOldschoolImg from "@/assets/campaigns/kucoin-oldschool.jpg";
import polygonHackathonImg from "@/assets/campaigns/polygon-hackathon.jpg";
import polygonConnectImg from "@/assets/campaigns/polygon-connect.png";
import ondoSeminarImg from "@/assets/campaigns/ondo-seminar.jpg";
import peaqSummitImg from "@/assets/campaigns/peaq-summit.jpg";
import storyWorkshopImg from "@/assets/campaigns/story-workshop.jpg";
import storyOriginSummitImg from "@/assets/campaigns/story-origin-summit.jpg";
import megaethLaunchImg from "@/assets/campaigns/megaeth-launch.jpg";
import triaLaunchImg from "@/assets/campaigns/tria-launch.jpg";
import fogoFestImg from "@/assets/campaigns/fogo-fest.avif";
import bybitEventImg from "@/assets/campaigns/bybit-event.jpg";
import saharaAiImg from "@/assets/campaigns/sahara-ai.jpg";
import mantraImg from "@/assets/campaigns/mantra.jpg";
import mantraPartyImg from "@/assets/campaigns/mantra-party.jpg";
import synfuturesBillboardImg from "@/assets/campaigns/synfutures-billboard.jpg";
import openledgerInterviewImg from "@/assets/campaigns/openledger-interview.jpg";
import openledgerHeroOfficialImg from "@/assets/campaigns/openledger-hero-official.png";
import zkpassImg from "@/assets/campaigns/zkpass-verifiable-nights.jpg";
import lbankFestivalImg from "@/assets/campaigns/lbank-festival.jpg";
import seoulMetroBillboardImg from "@/assets/campaigns/seoul-metro-billboard-new.jpeg";
import seoulMetroPosterImg from "@/assets/campaigns/seoul-metro-poster.jpeg";

// Import project background images
import bnbBg from "@/assets/projects/bnb-bg.jpg";
import kucoinBg from "@/assets/projects/kucoin-bg.jpg";
import polygonBg from "@/assets/projects/polygon-bg.jpg";
import ondoBg from "@/assets/projects/ondo-bg.jpg";
import peaqBg from "@/assets/projects/peaq-bg.jpg";
import peaqFeatureImg from "@/assets/projects/peaq-feature.jpg";
import storyBg from "@/assets/projects/story-bg.jpg";
import megaethBg from "@/assets/projects/megaeth-bg.jpg";
import triaBg from "@/assets/projects/tria-bg.jpg";
import bybitBg from "@/assets/projects/bybit-bg.jpg";
import saharaAiBg from "@/assets/projects/sahara-ai-bg.jpg";
import mantraBg from "@/assets/projects/mantra-bg.jpg";

// Types
export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ProjectResult {
  metric: string;
  value: string;
}

export interface GalleryItem {
  src: string;
  title: string;
  description: string;
}

export interface NewsItem {
  title: string;
  source: string;
  date: string;
  url: string;
  image: string;
}

export interface ProjectData {
  name: string;
  logo: string;
  bgImage: string;
  bgVideo?: string; // Optional video background for hero section
  featureImage?: string; // Optional feature image for content section
  category: string;
  result: string;
  glowColor: string;
  description: string;
  challenge: string;
  whatWeDid?: string; // What we did section - service-specific description
  client_name?: string; // Optional client name for meta info
  duration?: string; // Optional project duration
  metrics: ProjectMetric[];
  strategy: string[];
  results: ProjectResult[];
  services: string[];
  shortServices: string[];
  gallery: GalleryItem[];
  news: NewsItem[];
}

// Project data
export const projectsData: Record<string, ProjectData> = {
  "bnb-chain": {
    name: "BNB Chain",
    logo: bnbLogo,
    bgImage: bnbBg,
    bgVideo: "/videos/projects/bnb-hero.mp4",
    featureImage: bnbBg,
    category: "Infrastructure",
    result: "2M+ Impressions with VIP Network",
    glowColor: "#F3BA2F",
    description: "BNB Chain is the world's largest smart contract platform by daily active users, powering thousands of dApps across DeFi, GameFi, and NFTs. As the blockchain arm of Binance, BNB Chain sought to dramatically expand their footprint in Korea—one of the world's most active crypto trading markets—targeting both retail traders and institutional partners.",
    challenge: "Despite being one of the largest blockchain ecosystems globally, BNB Chain faced an uphill battle in Korea. Local exchanges dominated user attention, and Korean traders remained skeptical of foreign platforms. BNB Chain needed to overcome brand unfamiliarity, build trust with a notoriously discerning audience, and navigate Korea's unique regulatory landscape—all while competing against well-established local players with deep community roots.",
    whatWeDid: "We deployed a full-spectrum GTM strategy combining high-impact KOL campaigns, exclusive Seoul networking events, and comprehensive PR coverage across Korea's top crypto media outlets. Our team established strategic partnerships with local DeFi protocols, created Korean-language documentation and support infrastructure, and built an ambassador network of 150+ VIP community leaders who became the voice of BNB Chain in Korea.",
    metrics: [
      { value: "2M+", label: "Total Impressions" },
      { value: "150+", label: "VIP Ambassador Network" },
      { value: "2K+", label: "Community Members" },
      { value: "1", label: "Seoul Networking Event" }
    ],
    strategy: [
      "Partnered with top Korean crypto influencers for educational content",
      "Organized exclusive community events in Seoul and Busan",
      "Developed Korean-language documentation and support",
      "Launched targeted social media campaigns on Korean platforms",
      "Established partnerships with local DeFi protocols"
    ],
    results: [
      { metric: "Total Impressions", value: "2M+" },
      { metric: "VIP Inviters Onboarded", value: "150+" },
      { metric: "Korean Community Size", value: "2K+" },
      { metric: "Offline Events Hosted", value: "1" }
    ],
    services: ["KOL Marketing", "Community Management", "Event Planning", "PR & Media Relations"],
    shortServices: ["KOLs", "PR", "Events"],
    gallery: [
      { src: bnbEventImg, title: "Seoul Launch Event", description: "Exclusive networking event with 500+ attendees at COEX Convention Center" }
    ],
    news: []
  },
  "kucoin": {
    name: "KuCoin",
    logo: kucoinLogo,
    bgImage: kucoinBg,
    bgVideo: "/videos/projects/kucoin-hero.mp4",
    featureImage: kucoinBg,
    category: "Exchange",
    result: "$550M+ TVL & +600% SEO Growth",
    glowColor: "#23AF91",
    description: "KuCoin is a global top-5 cryptocurrency exchange known for its extensive altcoin listings and innovative trading products. With over 30 million users worldwide, KuCoin aimed to capture a significant share of Korea's highly active trading market by positioning themselves as the premium alternative to local exchanges.",
    challenge: "Korean traders are notoriously loyal to domestic exchanges like Upbit and Bithumb, which dominate over 90% of local trading volume. KuCoin faced the dual challenge of building trust with users skeptical of foreign platforms while demonstrating their unique value proposition—superior altcoin access and competitive trading fees.",
    whatWeDid: "We orchestrated premium offline experiences that positioned KuCoin as a sophisticated, trader-first platform. From exclusive trading seminars with professional analysts to VIP networking dinners with Korean crypto leaders, we created touchpoints that built genuine trust. Our creator partnership program onboarded 100+ Korean influencers who authentically showcased KuCoin's advantages to their audiences.",
    metrics: [
      { value: "$550M+", label: "TVL Achieved" },
      { value: "+600%", label: "SEO Keyword Growth" },
      { value: "300K+", label: "Campaign Impressions" },
      { value: "1", label: "Premium Offline Event" }
    ],
    strategy: [
      "Created localized trading guides and tutorials",
      "Launched Korean-exclusive trading competitions",
      "Built ambassador program with Korean crypto leaders",
      "Developed Korean customer support infrastructure",
      "Partnered with Korean blockchain projects for listings"
    ],
    results: [
      { metric: "TVL Growth", value: "$550M+" },
      { metric: "SEO Keyword Ranking", value: "+600%" },
      { metric: "Total Impressions", value: "300K+" },
      { metric: "Offline Meet-ups", value: "1" }
    ],
    services: ["Offline Event", "Creator Relations", "Institutional Marketing"],
    shortServices: ["Events", "Creator", "Institutional"],
    gallery: [
      { src: kucoinCampaignImg, title: "Trading Competition", description: "Korean-exclusive trading event with $100K prizes" }
    ],
    news: []
  },
  "polygon": {
    name: "Polygon",
    logo: polygonLogo,
    bgImage: polygonBg,
    featureImage: polygonBg,
    category: "Layer 2",
    result: "200+ Developers at L2 Hackathon",
    glowColor: "#8247E5",
    description: "Polygon is the leading Ethereum scaling solution, processing millions of transactions daily at a fraction of mainnet costs. As the backbone of major DeFi protocols and NFT marketplaces, Polygon sought to unlock the Korean market—home to some of the world's most active DeFi users—by driving developer adoption and TVL growth.",
    challenge: "While Polygon dominated the L2 landscape globally, Korean users remained tethered to Layer 1 chains and local solutions. The concept of Layer 2 scaling was poorly understood, and developers needed convincing that building on Polygon could access Korea's lucrative user base.",
    whatWeDid: "We launched Korea's most ambitious L2 education initiative, hosting developer hackathons, workshops, and meetups that demystified scaling solutions. Our team connected Polygon with leading Korean DeFi protocols for integrations, administered a Korean-specific grants program that attracted 80+ applications, and facilitated direct sessions with the Polygon core team.",
    metrics: [
      { value: "$2M", label: "Korean TVL in 30 Days" },
      { value: "200+", label: "Hackathon Participants" },
      { value: "500+", label: "DeFi Integrations" },
      { value: "80+", label: "Grant Applications" }
    ],
    strategy: [
      "Hosted developer workshops and hackathons in Korea",
      "Created educational content explaining L2 benefits",
      "Partnered with Korean DeFi protocols for integration",
      "Launched Korean developer grants program",
      "Organized meetups with Polygon core team"
    ],
    results: [
      { metric: "Korean TVL (30 Days)", value: "$2M" },
      { metric: "Hackathon Participants", value: "200+" },
      { metric: "DeFi Integrations", value: "500+" },
      { metric: "Grant Applications Received", value: "80+" }
    ],
    services: ["Developer Relations", "DeFi Marketing", "Event Management", "Grant Program Support"],
    shortServices: ["KOLs", "Dev Relations", "Events"],
    gallery: [
      { src: polygonHackathonImg, title: "Developer Hackathon", description: "48-hour building event at Seoul Startup Hub" }
    ],
    news: []
  },
  "ondo": {
    name: "Ondo Finance",
    logo: ondoLogo,
    bgImage: ondoBg,
    featureImage: ondoBg,
    category: "RWA",
    result: "50+ Institutional Leads via RWA Seminars",
    glowColor: "#3B82F6",
    description: "Ondo Finance is the pioneer of tokenized real-world assets, bringing U.S. Treasuries and institutional-grade yield products on-chain. Backed by top-tier VCs and with billions in TVL, Ondo sought to introduce RWA tokenization to Korea's sophisticated investor base—a market hungry for stable, yield-generating crypto products.",
    challenge: "Real World Asset tokenization was virtually unknown in Korea. Unlike volatile crypto assets, RWA required educating investors on regulatory frameworks, custody solutions, and the mechanics of tokenized securities. Building trust with a market that had been burned by crypto scandals demanded a carefully crafted institutional approach.",
    whatWeDid: "We positioned Ondo as Korea's gateway to institutional-grade DeFi yields. Through comprehensive educational content, seminars featuring traditional finance professionals, and targeted outreach to Korean institutional investors, we built a community of 100K+ members who understood and trusted the RWA thesis.",
    metrics: [
      { value: "100K+", label: "Korean Community" },
      { value: "1M+", label: "Educational Content Views" },
      { value: "50+", label: "Institutional Leads" },
      { value: "5M+", label: "Total Media Reach" }
    ],
    strategy: [
      "Produced comprehensive RWA educational content",
      "Hosted seminars with traditional finance professionals",
      "Built relationships with Korean institutional investors",
      "Created Korean research reports on RWA market",
      "Developed community-driven FAQ and support"
    ],
    results: [
      { metric: "Korean Community", value: "100K+" },
      { metric: "Content Views", value: "1M+" },
      { metric: "Institutional Leads", value: "50+" },
      { metric: "Media Reach", value: "5M+" }
    ],
    services: ["Institutional Relations", "Content Marketing", "Community Growth", "PR Strategy"],
    shortServices: ["KOLs", "PR"],
    gallery: [
      { src: ondoSeminarImg, title: "RWA Seminar", description: "Educational events for institutional investors at Korea Finance Center" }
    ],
    news: []
  },
  "peaq": {
    name: "Peaq",
    logo: peaqLogo,
    bgImage: peaqBg,
    bgVideo: "/videos/projects/peaq-hero.mp4",
    featureImage: peaqFeatureImg,
    category: "Robotics",
    result: "#1 Machine Economy Brand in Korea",
    glowColor: "#00CED1",
    description: "Peaq is the Layer 1 blockchain powering the Machine Economy, enabling autonomous machines, vehicles, and robots to provide real-world goods and services. As the backbone of decentralized robotics infrastructure, Peaq connects physical devices to Web3, unlocking new economic models for the future of automation.",
    challenge: "Despite global momentum in the Machine Economy narrative, Korean awareness of blockchain-powered robotics remained minimal. The market lacked a clear leader, and Peaq needed to establish dominance—not just participate, but define the category itself in Korea.",
    whatWeDid: "We executed an aggressive, multi-channel strategy to crown Peaq as Korea's undisputed No. 1 Robotics project. Through strategic AMAs with top Korean crypto communities, targeted PR placements in major tech and crypto media, and comprehensive deep research reports, we shifted the narrative from generic infrastructure to tangible robotics leadership.",
    metrics: [
      { value: "500+", label: "Offline Participants" },
      { value: "200K+", label: "Total Impressions" },
      { value: "13+", label: "PR Media Features" },
      { value: "500+", label: "Original Content Pieces" }
    ],
    strategy: [
      "Launched Korea's first Machine Economy education campaign",
      "Partnered with Korean robotics and mobility enterprises",
      "Built developer community for decentralized robotics applications",
      "Created Korean-language use case demonstrations and research",
      "Organized robotics-focused meetups and conference panels"
    ],
    results: [
      { metric: "Korea Market Position", value: "#1 Robotics" },
      { metric: "Offline Participants", value: "500+" },
      { metric: "Media Features", value: "13+" },
      { metric: "Total Impressions", value: "200K+" }
    ],
    services: ["AMA", "PR Strategy", "Brand Positioning", "Deep Research"],
    shortServices: ["AMA", "PR", "Research"],
    gallery: [
      { src: peaqSummitImg, title: "Robotics Summit", description: "Korea's first Machine Economy conference at Gangnam" }
    ],
    news: []
  },
  "story-protocol": {
    name: "Story Protocol",
    logo: storyLogo,
    bgImage: storyBg,
    bgVideo: "/videos/projects/story-hero.mp4",
    featureImage: storyBg,
    category: "IP Protocol",
    result: "500+ Creators at IP Workshop",
    glowColor: "#FF6B9D",
    description: "Story Protocol is the world's first IP infrastructure layer, enabling creators to register, license, and monetize their intellectual property on-chain. Backed by a16z and top VCs, Story Protocol sought to tap into Korea's world-renowned creator economy—home to K-pop, webtoons, and digital content that dominates global culture.",
    challenge: "Korean creators—from webtoon artists to indie musicians—had never heard of IP tokenization. Most were unfamiliar with blockchain entirely, and convincing them to adopt a fundamentally new way of managing their creative rights required a delicate balance of education, trust-building, and demonstrating tangible value without the crypto jargon.",
    whatWeDid: "We became the bridge between Story Protocol's technology and Korea's creator community. Through intimate workshop sessions, we introduced webtoon artists, musicians, and digital creators to IP tokenization in their language. Our creator ambassador program built authentic advocates who demonstrated the platform's value to their peers.",
    metrics: [
      { value: "500+", label: "Workshop Participants" },
      { value: "200K+", label: "Campaign Impressions" },
      { value: "13+", label: "Media Placements" },
      { value: "50+", label: "Creator Ambassadors" }
    ],
    strategy: [
      "Partnered with major Korean content platforms",
      "Created creator-focused educational workshops",
      "Launched Korean creator ambassador program",
      "Developed simplified onboarding for non-crypto users",
      "Showcased success stories from early adopters"
    ],
    results: [
      { metric: "Workshop Participants", value: "500+" },
      { metric: "Total Impressions", value: "200K+" },
      { metric: "Media Placements", value: "13+" },
      { metric: "Creator Ambassadors", value: "50+" }
    ],
    services: ["Creator Relations", "Platform Marketing"],
    shortServices: ["Creator", "Marketing"],
    gallery: [
      { src: storyWorkshopImg, title: "Creator Workshop", description: "Hands-on IP tokenization training for Korean artists" }
    ],
    news: []
  },
  "megaeth": {
    name: "MegaETH",
    logo: megaethLogo,
    bgImage: megaethBg,
    featureImage: megaethBg,
    category: "Layer 2",
    result: "2M+ Impressions Pre-Mainnet",
    glowColor: "#4169E1",
    description: "MegaETH is building the first real-time blockchain—an L2 capable of processing 100,000+ TPS with millisecond latency. Backed by Dragonfly and Figment, MegaETH represents the next evolution of Ethereum scaling. They came to Korea to build an early community of believers before their highly anticipated mainnet launch.",
    challenge: "As a pre-mainnet project, MegaETH had no live product to showcase. In a market saturated with Layer 2 announcements, they needed to differentiate their technological breakthrough and build genuine community excitement—not just hype—that would sustain through to launch.",
    whatWeDid: "We architected a pre-launch campaign that turned MegaETH into Korea's most anticipated L2. Through exclusive technical deep-dives, early testnet access programs, and strategic AMAs with Korean crypto media, we built a community of genuine believers.",
    metrics: [
      { value: "$3M+", label: "ICO Contribution" },
      { value: "1K+", label: "Korean Mindshare Rank" },
      { value: "2K+", label: "Testnet Participants" },
      { value: "2M+", label: "Total Impressions" }
    ],
    strategy: [
      "Created hype-building pre-launch campaign",
      "Partnered with Korean DeFi protocols for launch support",
      "Built engaged Discord and Telegram communities",
      "Launched Korean testnet incentive program",
      "Organized AMAs with Korean crypto media"
    ],
    results: [
      { metric: "ICO Contribution", value: "$3M+" },
      { metric: "Korean Mindshare", value: "1K+" },
      { metric: "Testnet Participants", value: "2K+" },
      { metric: "Total Impressions", value: "2M+" }
    ],
    services: ["Pre-Launch Marketing"],
    shortServices: ["Pre-Launch"],
    gallery: [
      { src: megaethLaunchImg, title: "Pre-Launch Campaign", description: "Hype-building social media strategy and teasers" }
    ],
    news: []
  },
  "tria": {
    name: "Tria",
    logo: triaLogo,
    bgImage: triaBg,
    featureImage: triaBg,
    category: "Wallet",
    result: "450K+ Impressions in 6 Months",
    glowColor: "#FF7F50",
    description: "Tria is reinventing the Web3 wallet experience with social login, gasless transactions, and a UX that finally makes crypto accessible to everyone. Their mission: eliminate the friction that keeps mainstream users away from Web3. Korea, with its tech-savvy population and mobile-first culture, was the perfect market to prove their thesis.",
    challenge: "Korea's wallet market is brutally competitive—dominated by established players and local solutions integrated with Korean apps. Tria needed to convince users that a new wallet, from an unknown brand, was worth the switch.",
    whatWeDid: "We positioned Tria as the wallet for Korea's next generation of Web3 users. Through strategic influencer partnerships showcasing the seamless UX, referral campaigns with compelling incentives, and integrations with popular Korean dApps, we drove sustained engagement over 6 months.",
    metrics: [
      { value: "450K+", label: "Total Impressions" },
      { value: "+250%", label: "Community Growth" },
      { value: "15+", label: "Media Articles" },
      { value: "6", label: "Months Campaign" }
    ],
    strategy: [
      "Launched user acquisition campaigns with incentives",
      "Created Korean-language tutorials and guides",
      "Partnered with Korean dApps for integration",
      "Built referral program with Korean influencers",
      "Provided Korean customer support"
    ],
    results: [
      { metric: "Total Impressions", value: "450K+" },
      { metric: "Community Growth", value: "+250%" },
      { metric: "Media Coverage", value: "15+ Articles" },
      { metric: "Campaign Duration", value: "6 Months" }
    ],
    services: ["User Acquisition", "Product Marketing", "Partnership Development", "Customer Support"],
    shortServices: ["KOLs", "Community"],
    gallery: [
      { src: triaLaunchImg, title: "Launch Campaign", description: "Korean market entry promotion with incentives" }
    ],
    news: []
  },
  "bybit": {
    name: "Bybit",
    logo: bybitLogo,
    bgImage: bybitBg,
    bgVideo: "/videos/projects/bybit-hero.mp4",
    featureImage: bybitBg,
    category: "Exchange",
    result: "#2 Exchange Traffic with VIP Program",
    glowColor: "#F7931A",
    description: "Bybit is the world's second-largest crypto derivatives exchange, known for its advanced trading tools and professional-grade platform. With ambitions to capture the Korean market—one of the most active trading regions globally—Bybit sought to position themselves as the premium alternative for Korea's demanding trader community.",
    challenge: "Korea's exchange market is a fortress dominated by local giants. Bybit faced regulatory scrutiny, user skepticism toward foreign platforms, and the need to localize everything from customer support to trading pairs.",
    whatWeDid: "We executed a comprehensive market entry strategy that transformed Bybit's Korean presence. High-profile offline events in Seoul attracted thousands of traders, while our VIP program created an exclusive community of high-volume Korean users.",
    metrics: [
      { value: "#2", label: "Korean Market Position" },
      { value: "$1.5B+", label: "TVL Contribution" },
      { value: "1200+", label: "VIP Users Acquired" },
      { value: "5+", label: "Months Active" }
    ],
    strategy: [
      "Launched aggressive trading fee promotions",
      "Created Korean-exclusive trading products",
      "Built VIP program for high-volume Korean traders",
      "Partnered with Korean esports and gaming",
      "Developed comprehensive Korean support"
    ],
    results: [
      { metric: "Korean Market Position", value: "#2 Traffic" },
      { metric: "TVL Contribution", value: "$1.5B+" },
      { metric: "VIP Users", value: "1200+" },
      { metric: "Campaign Duration", value: "5+ Months" }
    ],
    services: ["Offline Event", "User Acquisition"],
    shortServices: ["Events", "Acquisition"],
    gallery: [
      { src: bybitEventImg, title: "Trading Campaign", description: "Zero-fee promotion launch with massive reach" }
    ],
    news: []
  },
  "sahara-ai": {
    name: "Sahara AI",
    logo: saharaAiLogo,
    bgImage: saharaAiBg,
    bgVideo: "/videos/projects/sahara-hero.mp4",
    featureImage: saharaAiBg,
    category: "AI",
    result: "400+ Attendees at AI Launch Events",
    glowColor: "#00D4FF",
    description: "Sahara AI is building the decentralized AI infrastructure layer, enabling secure and private AI model training and deployment on blockchain. As AI and Web3 converge into one of crypto's hottest narratives, Sahara sought to establish themselves as the category leader in Korea.",
    challenge: "The AI x Web3 intersection was nascent in Korea, with most users familiar with either AI or crypto but rarely both. Sahara needed to educate developers and enterprises on decentralized AI while competing against well-funded competitors.",
    whatWeDid: "We positioned Sahara as Korea's gateway to the AI blockchain future. Through a series of immersive launch events showcasing live technology demonstrations, we connected Sahara with Korea's AI developer community, university researchers, and enterprise decision-makers.",
    metrics: [
      { value: "400+", label: "Event Attendees" },
      { value: "200K+", label: "Community Reach" },
      { value: "25+", label: "Partnership Deals" },
      { value: "10", label: "Launch Events Hosted" }
    ],
    strategy: [
      "Launched AI x Web3 educational content series",
      "Partnered with Korean AI companies and universities",
      "Organized developer hackathons and workshops",
      "Built enterprise pipeline for AI blockchain solutions",
      "Created Korean-specific use case demonstrations"
    ],
    results: [
      { metric: "Event Attendees", value: "400+" },
      { metric: "Community Reach", value: "200K+" },
      { metric: "Partnerships Secured", value: "25+" },
      { metric: "Launch Events", value: "10" }
    ],
    services: ["Offline Event"],
    shortServices: ["Events"],
    gallery: [
      { src: saharaAiImg, title: "AI Summit", description: "Korean AI x Web3 summit at Gangnam Tech Center" }
    ],
    news: []
  },
  "mantra": {
    name: "Mantra",
    logo: mantraLogo,
    bgImage: mantraBg,
    bgVideo: "/videos/projects/mantra-hero.mp4",
    featureImage: mantraBg,
    category: "RWA",
    result: "$50M+ Pipeline & Korea CEX Listing",
    glowColor: "#9B59B6",
    description: "Mantra is the security-first RWA Layer 1 blockchain, purpose-built for tokenizing real-world assets with regulatory compliance at its core. With partnerships across Middle Eastern sovereign wealth and major financial institutions, Mantra sought to establish a Korean beachhead.",
    challenge: "Korean institutional investors are among the world's most demanding, requiring regulatory clarity, proven partnerships, and credible security audits. Mantra needed to translate their Middle Eastern success into Korean market credibility.",
    whatWeDid: "We crafted an institutional-first market entry that positioned Mantra as the compliant RWA solution for Korean finance. Our PR strategy secured features in major Korean financial media, while targeted outreach built a pipeline of $50M+ in institutional interest.",
    metrics: [
      { value: "$50M+", label: "Institutional Pipeline" },
      { value: "1", label: "Korea CEX Listing" },
      { value: "130K+", label: "Total Impressions" },
      { value: "4+", label: "Major Media Features" }
    ],
    strategy: [
      "Hosted RWA education seminars for institutions",
      "Partnered with Korean asset management companies",
      "Created comprehensive Korean research reports",
      "Built community through educational content",
      "Organized networking events with financial professionals"
    ],
    results: [
      { metric: "Institutional Pipeline", value: "$50M+" },
      { metric: "Korea CEX Listing", value: "Completed" },
      { metric: "Total Impressions", value: "130K+" },
      { metric: "Media Features", value: "4+" }
    ],
    services: ["Community Growth", "PR Strategy"],
    shortServices: ["Community", "PR"],
    gallery: [
      { src: mantraImg, title: "RWA Summit", description: "Korean institutional investor summit in Seoul" }
    ],
    news: []
  },
  "synfutures": {
    name: "SynFutures",
    logo: synfuturesLogo,
    bgImage: synfuturesBillboardImg,
    featureImage: synfuturesBillboardImg,
    category: "DeFi",
    result: "5M+ OOH Impressions in Gangnam",
    glowColor: "#6366F1",
    description: "SynFutures is the leading decentralized derivatives exchange, pioneering permissionless perpetual futures trading with innovative AMM mechanisms. As DeFi derivatives gained mainstream traction, SynFutures sought to establish dominant brand presence in Korea.",
    challenge: "Korean traders were heavily invested in centralized derivatives platforms, with DeFi perpetuals perceived as complex and risky. SynFutures needed to break through the noise with a brand awareness campaign.",
    whatWeDid: "We executed a high-impact OOH campaign that put SynFutures front and center in Gangnam—Korea's financial and crypto heartland. Premium billboard placements generated 5M+ impressions, while coordinated digital campaigns amplified the visibility.",
    metrics: [
      { value: "5M+", label: "Billboard Impressions" },
      { value: "+300%", label: "Brand Awareness Lift" },
      { value: "4+", label: "Community AMAs" },
      { value: "1", label: "Month Campaign" }
    ],
    strategy: [
      "Secured prime billboard locations in Gangnam district",
      "Created eye-catching visual campaign targeting Korean traders",
      "Launched coordinated social media amplification campaign",
      "Organized offline-to-online engagement activations",
      "Partnered with local crypto communities for awareness"
    ],
    results: [
      { metric: "Billboard Impressions", value: "5M+" },
      { metric: "Brand Awareness", value: "+300%" },
      { metric: "AMAs Hosted", value: "4+" },
      { metric: "Campaign Period", value: "1 Month" }
    ],
    services: ["Billboard Marketing", "Social Media Campaign"],
    shortServices: ["Billboard", "Social"],
    gallery: [
      { src: synfuturesBillboardImg, title: "Gangnam Billboard", description: "Prime billboard placement in the heart of Gangnam district" }
    ],
    news: []
  },
  "fogo": {
    name: "FOGO",
    logo: megaethLogo, // Temporary - will need fogo logo
    bgImage: fogoFestImg,
    featureImage: fogoFestImg,
    category: "Infrastructure",
    result: "250+ Attendees & 55 KOL Partners",
    glowColor: "#FF6B35",
    description: "FOGO is building a next-generation high-performance blockchain optimized for real-time applications and global scale. With backing from top-tier investors, FOGO targeted Korea as a strategic launch market to build an engaged community of early believers ahead of their network launch.",
    challenge: "As an emerging infrastructure project without a live network, FOGO faced the challenge of building community enthusiasm based on vision alone. The Korean market, saturated with L1 and L2 projects, demanded differentiation.",
    whatWeDid: "We built FOGO's Korean presence from zero to thriving community. Our launch event attracted 250+ attendees, while our KOL partnership program onboarded 55+ influential voices who authentically championed FOGO's vision.",
    metrics: [
      { value: "250+", label: "Launch Event Attendees" },
      { value: "55+", label: "KOL Partners" },
      { value: "+250%", label: "Community Growth" },
      { value: "5+", label: "Media Coverage" }
    ],
    strategy: [
      "Built Korean community channels from scratch",
      "Created localized content strategy",
      "Partnered with Korean crypto influencers",
      "Launched pre-launch hype campaigns",
      "Organized community engagement activities"
    ],
    results: [
      { metric: "Launch Event Attendees", value: "250+" },
      { metric: "KOL Partners", value: "55+" },
      { metric: "Community Growth", value: "+250%" },
      { metric: "Media Coverage", value: "5+" }
    ],
    services: ["Community Growth", "Pre-Launch Marketing"],
    shortServices: ["Community", "Pre-Launch"],
    gallery: [
      { src: fogoFestImg, title: "Community Launch", description: "FOGO Korean community launch event" }
    ],
    news: []
  },
  "openledger": {
    name: "OpenLedger",
    logo: saharaAiLogo, // Temporary - will need openledger logo
    bgImage: openledgerHeroOfficialImg,
    featureImage: openledgerInterviewImg,
    category: "AI",
    result: "30M+ Reach via 100+ KOL Network",
    glowColor: "#10B981",
    description: "OpenLedger is pioneering decentralized AI data infrastructure, enabling secure and transparent data sharing for AI model training. As the AI x Web3 narrative exploded globally, OpenLedger sought to establish early dominance in Korea.",
    challenge: "The Korean AI blockchain market was becoming crowded, with multiple projects racing to claim the narrative. OpenLedger needed to differentiate their data-centric approach and build relationships with both the crypto community and Korea's influential AI research ecosystem.",
    whatWeDid: "We executed a comprehensive community and PR strategy that positioned OpenLedger as a thought leader in decentralized AI infrastructure. Our KOL partnerships reached 100+ influential voices, generating 30M+ community impressions.",
    metrics: [
      { value: "30M+", label: "Total Community Reach" },
      { value: "100+", label: "KOL Partnerships" },
      { value: "25K+", label: "Social Impressions" },
      { value: "2+", label: "Executive Interviews" }
    ],
    strategy: [
      "Built Korean AI x Web3 community",
      "Executed comprehensive PR campaign",
      "Partnered with Korean AI influencers",
      "Created educational content series",
      "Organized community AMAs and events"
    ],
    results: [
      { metric: "Community Reach", value: "30M+" },
      { metric: "KOL Partnerships", value: "100+" },
      { metric: "Social Impressions", value: "25K+" },
      { metric: "Executive Interviews", value: "2+" }
    ],
    services: ["Community Growth", "PR Strategy"],
    shortServices: ["Community", "PR"],
    gallery: [
      { src: openledgerInterviewImg, title: "Media Interview", description: "OpenLedger executive interview with Korean crypto media" }
    ],
    news: []
  },
  "world": {
    name: "World (WLD)",
    logo: "",
    bgImage: saharaAiBg,
    bgVideo: "/videos/projects/world-hero.mov",
    category: "Identity / AI",
    result: "Korea Legal & PR",
    glowColor: "#1D1D1B",
    description: "World is the largest human identity and financial network, co-founded by Sam Altman. ium Labs provided Korea legal guidance and PR & media relations to support World's market presence in Korea.",
    challenge: "Korea's strict personal data protection laws (PIPA) and biometric data regulations required careful navigation. World needed localized legal guidance to ensure compliance while building public trust through strategic media positioning.",
    whatWeDid: "We provided comprehensive Korean legal consulting on PIPA compliance and biometric data handling, while executing a targeted PR & media relations campaign across Korea's top crypto outlets including BlockMedia and CoinDesk Korea.",
    metrics: [
      { value: "Legal", label: "PIPA Compliance Guide" },
      { value: "Tier-1", label: "Media Coverage" }
    ],
    strategy: [
      "Korean legal consulting on PIPA and biometric data regulations",
      "PR & media relations across Korea's top crypto media outlets"
    ],
    results: [
      { metric: "Legal Guide", value: "PIPA Compliance" },
      { metric: "PR Coverage", value: "Tier-1 Media" }
    ],
    services: ["Legal Guide", "PR & Media Relations"],
    shortServices: ["Legal", "PR"],
    gallery: [],
    news: []
  }
};

export const getAllProjectSlugs = (): string[] => Object.keys(projectsData);

export const getProjectBySlug = (slug: string): ProjectData | undefined => projectsData[slug];

export const getNextProject = (currentSlug: string): { slug: string; project: ProjectData } | null => {
  const allSlugs = getAllProjectSlugs();
  const currentIndex = allSlugs.indexOf(currentSlug);
  if (currentIndex === -1) return null;
  const nextSlug = allSlugs[(currentIndex + 1) % allSlugs.length];
  return { slug: nextSlug, project: projectsData[nextSlug] };
};
