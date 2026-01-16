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
    result: "+340% Korean Trading Volume",
    glowColor: "#F3BA2F",
    description: "BNB Chain sought to dramatically increase their presence in the Korean market, targeting both retail traders and institutional investors.",
    challenge: "Despite being one of the largest blockchain ecosystems globally, BNB Chain had limited brand recognition in Korea compared to local exchanges. They needed a comprehensive strategy to capture the Korean market while navigating local regulations.",
    metrics: [
      { value: "+340%", label: "Trading Volume" },
      { value: "150K+", label: "Community Growth" },
      { value: "50+", label: "KOL Partners" },
      { value: "8 Months", label: "Campaign Period" }
    ],
    strategy: [
      "Partnered with top Korean crypto influencers for educational content",
      "Organized exclusive community events in Seoul and Busan",
      "Developed Korean-language documentation and support",
      "Launched targeted social media campaigns on Korean platforms",
      "Established partnerships with local DeFi protocols"
    ],
    results: [
      { metric: "Trading Volume Increase", value: "+340%" },
      { metric: "Korean Community Growth", value: "150K+" },
      { metric: "Local Partnerships", value: "25+" },
      { metric: "Media Mentions", value: "500+" }
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
    result: "50K+ New Korean Users",
    glowColor: "#23AF91",
    description: "KuCoin aimed to expand their user base in Korea and establish themselves as a trusted global exchange option for Korean traders.",
    challenge: "Competing with established Korean exchanges while building trust with Korean users who typically prefer local platforms. The challenge was to demonstrate KuCoin's unique value proposition.",
    whatWeDid: "Organized premium offline events connecting KuCoin with the Korean trading community. Built creator partnerships for authentic content and brand advocacy. Developed institutional marketing materials and outreach programs targeting Korean crypto funds and professional traders.",
    metrics: [
      { value: "50K+", label: "New Users" },
      { value: "10K+", label: "Competition Users" },
      { value: "100+", label: "Ambassadors" },
      { value: "6 Months", label: "Campaign Period" }
    ],
    strategy: [
      "Created localized trading guides and tutorials",
      "Launched Korean-exclusive trading competitions",
      "Built ambassador program with Korean crypto leaders",
      "Developed Korean customer support infrastructure",
      "Partnered with Korean blockchain projects for listings"
    ],
    results: [
      { metric: "New Korean Users", value: "50K+" },
      { metric: "Trading Competition Participants", value: "10K+" },
      { metric: "Ambassador Network", value: "100+" },
      { metric: "Customer Satisfaction", value: "4.8/5" }
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
    result: "$2M Korean TVL in 30 Days",
    glowColor: "#8247E5",
    description: "Polygon wanted to increase adoption of their Layer 2 solution among Korean DeFi users and developers.",
    challenge: "While Polygon had strong technical credentials, Korean users were unfamiliar with Layer 2 solutions. Education and trust-building were critical.",
    metrics: [
      { value: "$2M", label: "TVL in 30 Days" },
      { value: "15+", label: "dApps Launched" },
      { value: "500+", label: "Workshop Attendees" },
      { value: "30 Days", label: "Time to $2M" }
    ],
    strategy: [
      "Hosted developer workshops and hackathons in Korea",
      "Created educational content explaining L2 benefits",
      "Partnered with Korean DeFi protocols for integration",
      "Launched Korean developer grants program",
      "Organized meetups with Polygon core team"
    ],
    results: [
      { metric: "Korean TVL (30 days)", value: "$2M" },
      { metric: "Korean dApps Launched", value: "15+" },
      { metric: "Developer Workshop Attendees", value: "500+" },
      { metric: "Grant Applications", value: "80+" }
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
    result: "100K+ Korean Community",
    glowColor: "#3B82F6",
    description: "Ondo Finance aimed to introduce Real World Asset (RWA) tokenization to the Korean market, targeting both retail and institutional investors.",
    challenge: "RWA was a new concept for most Korean crypto investors. Building understanding and trust around tokenized securities required extensive education.",
    metrics: [
      { value: "100K+", label: "Community Size" },
      { value: "1M+", label: "Content Views" },
      { value: "50+", label: "Institutional Leads" },
      { value: "5M+", label: "Media Reach" }
    ],
    strategy: [
      "Produced comprehensive RWA educational content",
      "Hosted seminars with traditional finance professionals",
      "Built relationships with Korean institutional investors",
      "Created Korean research reports on RWA market",
      "Developed community-driven FAQ and support"
    ],
    results: [
      { metric: "Korean Community Size", value: "100K+" },
      { metric: "Educational Content Views", value: "1M+" },
      { metric: "Institutional Inquiries", value: "50+" },
      { metric: "Media Coverage Reach", value: "5M+" }
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
    category: "DePIN",
    result: "#1 DePIN in Korea",
    glowColor: "#00CED1",
    description: "Peaq aimed to become the leading DePIN (Decentralized Physical Infrastructure Network) platform in Korea, targeting both enterprise partners and developer communities to build real-world machine economy applications.",
    challenge: "While DePIN was an emerging narrative globally, the Korean market lacked a dominant leader in the blockchain-robotics sector. Peaq needed to overcome low local awareness and establish itself not just as a participant, but as the market standard.",
    whatWeDid: "We executed a targeted strategy to position Peaq as the undisputed No. 1 Robotics project in Korea. We shifted the narrative from generic infrastructure to tangible robotics leadership, driving deep research and community engagement to secure market dominance.",
    metrics: [
      { value: "#1", label: "Robotics Position" },
      { value: "3.2M+", label: "Social Engagements" },
      { value: "4+", label: "AMA" },
      { value: "11+", label: "Media Articles/Interviews" }
    ],
    strategy: [
      "Launched comprehensive DePIN education campaign",
      "Partnered with Korean IoT and mobility companies",
      "Built developer community for DePIN applications",
      "Created Korean-specific use case demonstrations",
      "Organized DePIN-focused community events"
    ],
    results: [
      { metric: "Market Position in Korea", value: "#1 DePIN" },
      { metric: "Korean Developers", value: "200+" },
      { metric: "Partnership Agreements", value: "10+" },
      { metric: "Community Engagement Rate", value: "35%" }
    ],
    services: ["AMA", "PR Strategy", "Brand Positioning Deep Research"],
    shortServices: ["AMA", "PR", "Research"],
    gallery: [
      { src: peaqSummitImg, title: "DePIN Summit", description: "Korea's first DePIN-focused conference at Gangnam" }
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
    result: "5K+ Korean Creators",
    glowColor: "#FF6B9D",
    description: "Story Protocol sought to onboard Korean content creators to their IP tokenization platform, targeting webtoon artists, musicians, and digital creators.",
    challenge: "Korean creators were unfamiliar with IP tokenization and blockchain technology. Building trust and demonstrating clear value was essential.",
    whatWeDid: "Built and nurtured relationships with Korean content creators including webtoon artists, musicians, and digital creators. Developed platform marketing strategies tailored to the Korean creator economy, showcasing IP tokenization benefits through localized content and success stories.",
    metrics: [
      { value: "5K+", label: "Creators" },
      { value: "2K+", label: "Workshop Users" },
      { value: "50+", label: "Ambassadors" },
      { value: "10K+", label: "Content Created" }
    ],
    strategy: [
      "Partnered with major Korean content platforms",
      "Created creator-focused educational workshops",
      "Launched Korean creator ambassador program",
      "Developed simplified onboarding for non-crypto users",
      "Showcased success stories from early adopters"
    ],
    results: [
      { metric: "Korean Creators Onboarded", value: "5K+" },
      { metric: "Creator Workshop Attendees", value: "2K+" },
      { metric: "Ambassador Network", value: "50+" },
      { metric: "Platform Content Created", value: "10K+" }
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
    result: "+500% Korean Engagement",
    glowColor: "#4169E1",
    description: "MegaETH aimed to build strong community presence in Korea ahead of their mainnet launch.",
    challenge: "As a new L2 project, MegaETH needed to differentiate from established competitors and build early community momentum.",
    whatWeDid: "Designed and executed a comprehensive pre-launch marketing campaign to build anticipation and community momentum before mainnet. Created hype-building content, coordinated with Korean crypto media for exclusive coverage, and established early community channels with engaged Korean members.",
    metrics: [
      { value: "+500%", label: "Engagement" },
      { value: "30K+", label: "Community" },
      { value: "5K+", label: "Testnet Users" },
      { value: "2M+", label: "Impressions" }
    ],
    strategy: [
      "Created hype-building pre-launch campaign",
      "Partnered with Korean DeFi protocols for launch support",
      "Built engaged Discord and Telegram communities",
      "Launched Korean testnet incentive program",
      "Organized AMAs with Korean crypto media"
    ],
    results: [
      { metric: "Engagement Increase", value: "+500%" },
      { metric: "Korean Community Size", value: "30K+" },
      { metric: "Testnet Participants", value: "5K+" },
      { metric: "Media Impressions", value: "2M+" }
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
    result: "30K+ Korean Wallets",
    glowColor: "#FF7F50",
    description: "Tria wanted to become the go-to Web3 wallet for Korean users with their simplified UX approach.",
    challenge: "Korean users had many wallet options. Tria needed to demonstrate their unique value proposition and ease of use.",
    metrics: [
      { value: "30K+", label: "Wallets" },
      { value: "15K+", label: "Monthly Active" },
      { value: "20+", label: "dApp Partners" },
      { value: "65%", label: "Retention" }
    ],
    strategy: [
      "Launched user acquisition campaigns with incentives",
      "Created Korean-language tutorials and guides",
      "Partnered with Korean dApps for integration",
      "Built referral program with Korean influencers",
      "Provided Korean customer support"
    ],
    results: [
      { metric: "Korean Wallets Created", value: "30K+" },
      { metric: "Monthly Active Users", value: "15K+" },
      { metric: "dApp Integrations", value: "20+" },
      { metric: "User Retention Rate", value: "65%" }
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
    result: "#2 Korean Exchange Traffic",
    glowColor: "#F7931A",
    description: "Bybit aimed to capture significant market share in the competitive Korean exchange landscape.",
    challenge: "Competing against dominant local exchanges required a sophisticated, multi-channel approach to user acquisition and retention.",
    whatWeDid: "Planned and executed high-profile offline events in Seoul and major Korean cities, attracting thousands of traders and crypto enthusiasts. Developed multi-channel user acquisition campaigns including trading competitions, referral programs, and strategic partnerships with Korean influencers.",
    metrics: [
      { value: "#2", label: "Market Position" },
      { value: "+200%", label: "User Growth" },
      { value: "500+", label: "VIP Users" },
      { value: "+45%", label: "Brand Lift" }
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
      { metric: "New User Growth", value: "+200%" },
      { metric: "VIP User Acquisition", value: "500+" },
      { metric: "Brand Awareness Lift", value: "+45%" }
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
    result: "Korean AI x Web3 Launch",
    glowColor: "#00D4FF",
    description: "Sahara AI wanted to establish themselves as the leading AI blockchain platform in Korea's growing AI x Web3 intersection.",
    challenge: "AI blockchain was a new narrative in Korea. Sahara needed to educate the market while building developer and enterprise relationships.",
    whatWeDid: "Organized and executed offline events focused on educating the Korean market about AI x Web3 intersection. Created immersive experiences showcasing Sahara AI's technology and use cases, connecting with developers, enterprises, and crypto enthusiasts.",
    metrics: [
      { value: "50+", label: "Enterprise Leads" },
      { value: "200+", label: "Developers" },
      { value: "25K+", label: "Community" },
      { value: "10+", label: "Partnerships" }
    ],
    strategy: [
      "Launched AI x Web3 educational content series",
      "Partnered with Korean AI companies and universities",
      "Organized developer hackathons and workshops",
      "Built enterprise pipeline for AI blockchain solutions",
      "Created Korean-specific use case demonstrations"
    ],
    results: [
      { metric: "Enterprise Leads Generated", value: "50+" },
      { metric: "Korean Developers Onboarded", value: "200+" },
      { metric: "Community Size", value: "25K+" },
      { metric: "Strategic Partnerships", value: "10+" }
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
    result: "Korean RWA Expansion",
    glowColor: "#9B59B6",
    description: "Mantra aimed to become the leading RWA (Real World Assets) platform for Korean institutional investors.",
    challenge: "RWA tokenization was gaining traction but lacked mainstream adoption. Mantra needed to build trust with Korean financial institutions.",
    whatWeDid: "Executed comprehensive Korean community growth initiatives through strategic content creation, local influencer partnerships, and targeted social campaigns. Developed and implemented PR strategy including media outreach to top Korean crypto publications, securing feature coverage and building thought leadership in the RWA space.",
    metrics: [
      { value: "$50M+", label: "Pipeline" },
      { value: "30+", label: "Institutions" },
      { value: "50K+", label: "Community" },
      { value: "15+", label: "Media Features" }
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
      { metric: "Institutional Contacts", value: "30+" },
      { metric: "Korean Community", value: "50K+" },
      { metric: "Media Features", value: "15+" }
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
    result: "Gangnam Billboard Promotion",
    glowColor: "#6366F1",
    description: "SynFutures launched a high-visibility billboard campaign in Gangnam district to establish brand presence in the Korean market.",
    challenge: "As a DeFi derivatives platform, SynFutures needed to increase brand awareness among Korean traders and establish credibility in a competitive market dominated by centralized exchanges.",
    whatWeDid: "Secured and managed premium billboard placements in Gangnam district, one of Korea's most visible locations. Designed eye-catching visuals that resonated with Korean traders. Launched coordinated social media campaigns to amplify billboard visibility and drive online engagement.",
    metrics: [
      { value: "5M+", label: "Impressions" },
      { value: "+300%", label: "Brand Awareness" },
      { value: "50K+", label: "Social Reach" },
      { value: "2 Weeks", label: "Campaign Duration" }
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
      { metric: "Brand Awareness Increase", value: "+300%" },
      { metric: "Social Media Reach", value: "50K+" },
      { metric: "Community Growth", value: "+25%" }
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
    result: "Korean Community Launch",
    glowColor: "#FF6B35",
    description: "FOGO aimed to build a strong Korean community presence ahead of their network launch.",
    challenge: "As an emerging project, FOGO needed to establish brand awareness and community engagement in the competitive Korean market.",
    whatWeDid: "Built a thriving Korean community from the ground up through strategic content, engagement initiatives, and local community management. Executed pre-launch marketing activities to generate awareness and excitement ahead of the network launch.",
    metrics: [
      { value: "20K+", label: "Community" },
      { value: "+400%", label: "Engagement" },
      { value: "50+", label: "KOL Partners" },
      { value: "1M+", label: "Impressions" }
    ],
    strategy: [
      "Built Korean community channels from scratch",
      "Created localized content strategy",
      "Partnered with Korean crypto influencers",
      "Launched pre-launch hype campaigns",
      "Organized community engagement activities"
    ],
    results: [
      { metric: "Korean Community Size", value: "20K+" },
      { metric: "Engagement Growth", value: "+400%" },
      { metric: "KOL Partnerships", value: "50+" },
      { metric: "Total Impressions", value: "1M+" }
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
    result: "Korean AI Community Growth",
    glowColor: "#10B981",
    description: "OpenLedger sought to establish themselves as a leading AI blockchain platform in Korea's growing Web3 AI ecosystem.",
    challenge: "As an AI-focused blockchain project, OpenLedger needed to educate the Korean market about decentralized AI infrastructure and build a strong community of developers and users.",
    whatWeDid: "Developed and executed community growth strategies specifically tailored for the Korean AI blockchain audience. Implemented comprehensive PR strategy including media outreach, interviews, and thought leadership content to establish OpenLedger's presence in Korea.",
    metrics: [
      { value: "30K+", label: "Community" },
      { value: "100+", label: "Media Coverage" },
      { value: "25+", label: "KOL Partners" },
      { value: "2M+", label: "Impressions" }
    ],
    strategy: [
      "Built Korean AI x Web3 community",
      "Executed comprehensive PR campaign",
      "Partnered with Korean AI influencers",
      "Created educational content series",
      "Organized community AMAs and events"
    ],
    results: [
      { metric: "Korean Community Size", value: "30K+" },
      { metric: "Media Coverage", value: "100+" },
      { metric: "KOL Partnerships", value: "25+" },
      { metric: "Total Impressions", value: "2M+" }
    ],
    services: ["Community Growth", "PR Strategy"],
    shortServices: ["Community", "PR"],
    gallery: [
      { src: openledgerInterviewImg, title: "Media Interview", description: "OpenLedger executive interview with Korean crypto media" }
    ],
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
