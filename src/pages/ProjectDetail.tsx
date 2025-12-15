import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";
import { useEffect, useState, useRef } from "react";
// Import logos
import bnbLogo from "@/assets/logos/bnb.svg";
import kucoinLogo from "@/assets/logos/kucoin.svg";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import peaqLogo from "@/assets/logos/peaq.svg";
import storyLogo from "@/assets/logos/story-protocol.png";
import megaethLogo from "@/assets/logos/megaeth.png";
import triaLogo from "@/assets/logos/tria-official.png";
import bybitLogo from "@/assets/logos/bybit.png";
import saharaAiLogo from "@/assets/logos/sahara-ai.png";
import mantraLogo from "@/assets/logos/mantra.png";
import synfuturesLogo from "@/assets/logos/synfutures.png";
import fogoLogo from "@/assets/logos/fogo.png";
import zkpassLogo from "@/assets/logos/zkpass.png";

// Import campaign images
import bnbEventImg from "@/assets/campaigns/bnb-event.jpg";
import kucoinCampaignImg from "@/assets/campaigns/kucoin-campaign.jpg";
import polygonHackathonImg from "@/assets/campaigns/polygon-hackathon.jpg";
import ondoSeminarImg from "@/assets/campaigns/ondo-seminar.jpg";
import peaqSummitImg from "@/assets/campaigns/peaq-summit.jpg";
import storyWorkshopImg from "@/assets/campaigns/story-workshop.jpg";
import megaethLaunchImg from "@/assets/campaigns/megaeth-launch.jpg";
import triaLaunchImg from "@/assets/campaigns/tria-launch.jpg";
import fogoFestImg from "@/assets/campaigns/fogo-fest.avif";
import saharaAiImg from "@/assets/campaigns/sahara-ai.jpg";
import mantraImg from "@/assets/campaigns/mantra.jpg";
import synfuturesBillboardImg from "@/assets/campaigns/synfutures-billboard.jpg";
import zkpassImg from "@/assets/campaigns/zkpass-verifiable-nights.jpg";

// Import project background images
import bnbBg from "@/assets/projects/bnb-bg.jpg";
import kucoinBg from "@/assets/projects/kucoin-bg.jpg";
import polygonBg from "@/assets/projects/polygon-bg.jpg";
import ondoBg from "@/assets/projects/ondo-bg.jpg";
import peaqBg from "@/assets/projects/peaq-bg.jpg";
import storyBg from "@/assets/projects/story-bg.jpg";
import megaethBg from "@/assets/projects/megaeth-bg.jpg";
import triaBg from "@/assets/projects/tria-bg.jpg";
import bybitBg from "@/assets/projects/bybit-bg.jpg";
import saharaAiBg from "@/assets/projects/sahara-ai-bg.jpg";
import mantraBg from "@/assets/projects/mantra-bg.jpg";

// Project data
const projectsData: Record<string, {
  name: string;
  logo: string;
  bgImage: string;
  category: string;
  result: string;
  glowColor: string;
  description: string;
  challenge: string;
  metrics: { value: string; label: string }[];
  strategy: string[];
  results: { metric: string; value: string }[];
  services: string[];
  shortServices: string[];
  gallery: { src: string; title: string; description: string }[];
  news: { title: string; source: string; date: string; url: string; image: string }[];
}> = {
  "bnb-chain": {
    name: "BNB Chain",
    logo: bnbLogo,
    bgImage: bnbBg,
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
      { src: bnbEventImg, title: "Seoul Launch Event", description: "Exclusive networking event with 500+ attendees at COEX Convention Center" },
      { src: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop", title: "KOL Campaign", description: "Collaboration with 50+ Korean crypto influencers across YouTube and Twitter" },
      { src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=600&fit=crop", title: "Community Meetup", description: "Monthly community gatherings in Seoul, Busan, and Daegu" },
      { src: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop", title: "Media Coverage", description: "Featured in top Korean crypto publications and mainstream media" }
    ],
    news: [
      { title: "BNB Chain Records 340% Volume Surge in Korean Market", source: "CoinDesk Korea", date: "2024-03-15", url: "#", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop" },
      { title: "BNB Chain Partners with Major Korean DeFi Protocols", source: "Block Media", date: "2024-02-28", url: "#", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop" },
      { title: "Korean Crypto Community Embraces BNB Ecosystem", source: "TokenPost", date: "2024-02-10", url: "#", image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=250&fit=crop" }
    ]
  },
  "kucoin": {
    name: "KuCoin",
    logo: kucoinLogo,
    bgImage: kucoinBg,
    category: "Exchange",
    result: "50K+ New Korean Users",
    glowColor: "#23AF91",
    description: "KuCoin aimed to expand their user base in Korea and establish themselves as a trusted global exchange option for Korean traders.",
    challenge: "Competing with established Korean exchanges while building trust with Korean users who typically prefer local platforms. The challenge was to demonstrate KuCoin's unique value proposition.",
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
    services: ["User Acquisition", "Community Building", "Ambassador Program", "Localization"],
    shortServices: ["KOLs", "Community"],
    gallery: [
      { src: kucoinCampaignImg, title: "Trading Competition", description: "Korean-exclusive trading event with $100K prizes" },
      { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop", title: "Ambassador Program", description: "Network of 100+ Korean crypto leaders and influencers" },
      { src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop", title: "Tutorial Series", description: "Localized video guides for Korean traders on YouTube" },
      { src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop", title: "Partnership Announcement", description: "Major Korean project listing celebration events" }
    ],
    news: [
      { title: "KuCoin Surpasses 50K Korean Users Milestone", source: "Blockinpress", date: "2024-03-20", url: "#", image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=400&h=250&fit=crop" },
      { title: "KuCoin Launches Korean Trading Competition with $100K Prize Pool", source: "Decenter", date: "2024-03-05", url: "#", image: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&h=250&fit=crop" },
      { title: "Why Korean Traders Are Choosing KuCoin", source: "CoinDesk Korea", date: "2024-02-18", url: "#", image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=250&fit=crop" }
    ]
  },
  "polygon": {
    name: "Polygon",
    logo: polygonLogo,
    bgImage: polygonBg,
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
      { src: polygonHackathonImg, title: "Developer Hackathon", description: "48-hour building event at Seoul Startup Hub" },
      { src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop", title: "Workshop Series", description: "Technical deep-dives for Korean developers" },
      { src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop", title: "DeFi Integration", description: "Launch events with Korean DeFi protocols" },
      { src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop", title: "Core Team Meetup", description: "AMA sessions with Polygon founders" }
    ],
    news: [
      { title: "Polygon Achieves $2M TVL in Korea Within 30 Days", source: "The Block", date: "2024-03-12", url: "#", image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=400&h=250&fit=crop" },
      { title: "Korean Developers Flock to Polygon Hackathon", source: "Block Media", date: "2024-02-25", url: "#", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop" },
      { title: "Polygon Opens $1M Grant Program for Korean Projects", source: "TokenPost", date: "2024-02-05", url: "#", image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=250&fit=crop" }
    ]
  },
  "ondo": {
    name: "Ondo Finance",
    logo: ondoLogo,
    bgImage: ondoBg,
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
      { src: ondoSeminarImg, title: "RWA Seminar", description: "Educational events for institutional investors at Korea Finance Center" },
      { src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop", title: "Research Reports", description: "In-depth Korean market analysis and RWA outlook" },
      { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop", title: "Community Education", description: "Weekly AMA sessions and educational content" },
      { src: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&h=600&fit=crop", title: "Media Features", description: "Coverage in major Korean financial outlets" }
    ],
    news: [
      { title: "Ondo Finance Builds 100K+ Community in Korea", source: "Blockinpress", date: "2024-03-18", url: "#", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop" },
      { title: "RWA Tokens Gain Traction Among Korean Investors", source: "Hankyung Economy", date: "2024-03-02", url: "#", image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=400&h=250&fit=crop" },
      { title: "Ondo Finance Hosts First Korean RWA Summit", source: "CoinDesk Korea", date: "2024-02-12", url: "#", image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=250&fit=crop" }
    ]
  },
  "peaq": {
    name: "Peaq",
    logo: peaqLogo,
    bgImage: peaqBg,
    category: "DePIN",
    result: "#1 DePIN in Korea",
    glowColor: "#00CED1",
    description: "Peaq aimed to become the leading DePIN (Decentralized Physical Infrastructure Network) platform in Korea.",
    challenge: "DePIN was an emerging narrative with limited awareness. Peaq needed to establish thought leadership while building a strong community.",
    metrics: [
      { value: "#1", label: "DePIN Position" },
      { value: "200+", label: "Developers" },
      { value: "10+", label: "Partnerships" },
      { value: "35%", label: "Engagement Rate" }
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
    services: ["Brand Positioning", "Developer Relations", "Partnership Development", "Community Building"],
    shortServices: ["PR", "Events", "DevRel"],
    gallery: [
      { src: peaqSummitImg, title: "DePIN Summit", description: "Korea's first DePIN-focused conference at Gangnam" },
      { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", title: "IoT Partnership", description: "Collaboration with Korean tech companies" },
      { src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop", title: "Developer Workshop", description: "Building on Peaq infrastructure tutorials" },
      { src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop", title: "Use Case Demo", description: "Real-world DePIN applications showcase" }
    ],
    news: [
      { title: "Peaq Becomes #1 DePIN Platform in Korea", source: "Block Media", date: "2024-03-22", url: "#", image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&h=250&fit=crop" },
      { title: "Korean IoT Companies Partner with Peaq Network", source: "Decenter", date: "2024-03-08", url: "#", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop" },
      { title: "DePIN Revolution: Why Korea is Leading the Charge", source: "TokenPost", date: "2024-02-20", url: "#", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop" }
    ]
  },
  "story-protocol": {
    name: "Story Protocol",
    logo: storyLogo,
    bgImage: storyBg,
    category: "IP Protocol",
    result: "5K+ Korean Creators",
    glowColor: "#FF6B9D",
    description: "Story Protocol sought to onboard Korean content creators to their IP tokenization platform, targeting webtoon artists, musicians, and digital creators.",
    challenge: "Korean creators were unfamiliar with IP tokenization and blockchain technology. Building trust and demonstrating clear value was essential.",
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
    services: ["Creator Relations", "Platform Marketing", "Ambassador Program", "Content Strategy"],
    shortServices: ["KOLs", "Content"],
    gallery: [
      { src: storyWorkshopImg, title: "Creator Workshop", description: "Hands-on IP tokenization training for Korean artists" },
      { src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop", title: "Webtoon Partnership", description: "Collaboration with Korean webtoon artists and platforms" },
      { src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop", title: "Music IP Launch", description: "K-pop and indie artist IP tokenization events" },
      { src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop", title: "Success Stories", description: "Creator testimonial campaigns and case studies" }
    ],
    news: [
      { title: "Story Protocol Onboards 5,000 Korean Creators", source: "CoinDesk Korea", date: "2024-03-25", url: "#", image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=250&fit=crop" },
      { title: "Korean Webtoon Artists Embrace IP Tokenization", source: "Blockinpress", date: "2024-03-10", url: "#", image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=250&fit=crop" },
      { title: "How Story Protocol is Changing Korean Content Industry", source: "Maeil Economy", date: "2024-02-22", url: "#", image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=250&fit=crop" }
    ]
  },
  "megaeth": {
    name: "MegaETH",
    logo: megaethLogo,
    bgImage: megaethBg,
    category: "Layer 2",
    result: "+500% Korean Engagement",
    glowColor: "#4169E1",
    description: "MegaETH aimed to build strong community presence in Korea ahead of their mainnet launch.",
    challenge: "As a new L2 project, MegaETH needed to differentiate from established competitors and build early community momentum.",
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
    services: ["Pre-Launch Marketing", "Community Building", "Testnet Campaigns", "Media Relations"],
    shortServices: ["KOLs", "PR", "Community"],
    gallery: [
      { src: megaethLaunchImg, title: "Pre-Launch Campaign", description: "Hype-building social media strategy and teasers" },
      { src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop", title: "Testnet Program", description: "Korean user incentive campaign with rewards" },
      { src: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=600&fit=crop", title: "Community AMA", description: "Live Q&A sessions with the MegaETH team" },
      { src: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop", title: "Media Coverage", description: "Feature articles in major crypto publications" }
    ],
    news: [
      { title: "MegaETH Sees 500% Surge in Korean Community Engagement", source: "Block Media", date: "2024-03-28", url: "#", image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=400&h=250&fit=crop" },
      { title: "Korean Traders Show Strong Interest in MegaETH Testnet", source: "Decenter", date: "2024-03-15", url: "#", image: "https://images.unsplash.com/photo-1516245834210-c4c142787335?w=400&h=250&fit=crop" },
      { title: "MegaETH Partners with Korean DeFi Projects Ahead of Launch", source: "TokenPost", date: "2024-02-28", url: "#", image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=400&h=250&fit=crop" }
    ]
  },
  "tria": {
    name: "Tria",
    logo: triaLogo,
    bgImage: triaBg,
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
      { src: triaLaunchImg, title: "Launch Campaign", description: "Korean market entry promotion with incentives" },
      { src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop", title: "Tutorial Series", description: "Step-by-step wallet guides in Korean" },
      { src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop", title: "dApp Integration", description: "Partnership with popular Korean dApps" },
      { src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop", title: "Referral Program", description: "User growth incentive campaign with influencers" }
    ],
    news: [
      { title: "Tria Wallet Reaches 30,000 Korean Users", source: "CoinDesk Korea", date: "2024-04-01", url: "#", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop" },
      { title: "Why Korean Users Are Choosing Tria Over Traditional Wallets", source: "Blockinpress", date: "2024-03-18", url: "#", image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=250&fit=crop" },
      { title: "Tria Partners with 20 Korean dApps for Seamless Integration", source: "Block Media", date: "2024-03-05", url: "#", image: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&h=250&fit=crop" }
    ]
  },
  "bybit": {
    name: "Bybit",
    logo: bybitLogo,
    bgImage: bybitBg,
    category: "Exchange",
    result: "#2 Korean Exchange Traffic",
    glowColor: "#F7931A",
    description: "Bybit aimed to capture significant market share in the competitive Korean exchange landscape.",
    challenge: "Competing against dominant local exchanges required a sophisticated, multi-channel approach to user acquisition and retention.",
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
    services: ["Market Entry Strategy", "User Acquisition", "VIP Relations", "Brand Marketing"],
    shortServices: ["KOLs", "PR", "VIP"],
    gallery: [
      { src: fogoFestImg, title: "Trading Campaign", description: "Zero-fee promotion launch with massive reach" },
      { src: "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop", title: "VIP Program", description: "Exclusive benefits for high-volume traders" },
      { src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop", title: "Esports Partnership", description: "Korean gaming community sponsorship events" },
      { src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop", title: "Brand Campaign", description: "Major marketing push across Korean channels" }
    ],
    news: [
      { title: "Bybit Becomes #2 Exchange by Traffic in Korea", source: "Block Media", date: "2024-04-05", url: "#", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop" },
      { title: "Bybit's Korean User Base Grows 200% in Q1", source: "Decenter", date: "2024-03-22", url: "#", image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=400&h=250&fit=crop" },
      { title: "Bybit Partners with Korean Esports League", source: "TokenPost", date: "2024-03-08", url: "#", image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400&h=250&fit=crop" }
    ]
  },
  "sahara-ai": {
    name: "Sahara AI",
    logo: saharaAiLogo,
    bgImage: saharaAiBg,
    category: "AI",
    result: "Korean AI x Web3 Launch",
    glowColor: "#00D4FF",
    description: "Sahara AI wanted to establish themselves as the leading AI blockchain platform in Korea's growing AI x Web3 intersection.",
    challenge: "AI blockchain was a new narrative in Korea. Sahara needed to educate the market while building developer and enterprise relationships.",
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
    services: ["Enterprise Relations", "Developer Marketing", "Content Strategy", "Partnership Development"],
    shortServices: ["PR", "DevRel", "Enterprise"],
    gallery: [
      { src: saharaAiImg, title: "AI Summit", description: "Korean AI x Web3 summit at Gangnam Tech Center" },
      { src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop", title: "AI Demo", description: "Product demonstration events for enterprise clients" },
      { src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop", title: "Hackathon", description: "AI blockchain developer hackathon in Seoul" },
      { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop", title: "Workshop", description: "University partnership workshops" }
    ],
    news: [
      { title: "Sahara AI Launches Korean Market Entry Campaign", source: "Block Media", date: "2024-04-10", url: "#", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop" },
      { title: "Korean Enterprises Show Interest in AI Blockchain", source: "Decenter", date: "2024-03-25", url: "#", image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=250&fit=crop" },
      { title: "Sahara AI Partners with Korean Universities", source: "TokenPost", date: "2024-03-12", url: "#", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=250&fit=crop" }
    ]
  },
  "mantra": {
    name: "Mantra",
    logo: mantraLogo,
    bgImage: mantraBg,
    category: "RWA",
    result: "Korean RWA Expansion",
    glowColor: "#9B59B6",
    description: "Mantra aimed to become the leading RWA (Real World Assets) platform for Korean institutional investors.",
    challenge: "RWA tokenization was gaining traction but lacked mainstream adoption. Mantra needed to build trust with Korean financial institutions.",
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
    services: ["Institutional Relations", "Research Marketing", "Community Growth", "PR Strategy"],
    shortServices: ["PR", "Institutional", "Research"],
    gallery: [
      { src: mantraImg, title: "RWA Summit", description: "Korean institutional investor summit in Seoul" },
      { src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop", title: "Research Launch", description: "Korean RWA market research publication" },
      { src: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&h=600&fit=crop", title: "Networking Event", description: "Financial professional networking in Yeouido" },
      { src: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop", title: "Media Coverage", description: "Feature coverage in Korean financial media" }
    ],
    news: [
      { title: "Mantra Targets Korean RWA Market with $50M Pipeline", source: "CoinDesk Korea", date: "2024-04-15", url: "#", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop" },
      { title: "Korean Institutions Show Interest in RWA Tokenization", source: "Hankyung Economy", date: "2024-03-30", url: "#", image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=400&h=250&fit=crop" },
      { title: "Mantra Partners with Korean Asset Managers", source: "Block Media", date: "2024-03-15", url: "#", image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=250&fit=crop" }
    ]
  },
  "synfutures": {
    name: "SynFutures",
    logo: synfuturesLogo,
    bgImage: synfuturesBillboardImg,
    category: "DeFi",
    result: "Gangnam Billboard Promotion",
    glowColor: "#6366F1",
    description: "SynFutures launched a high-visibility billboard campaign in Gangnam district to establish brand presence in the Korean market.",
    challenge: "As a DeFi derivatives platform, SynFutures needed to increase brand awareness among Korean traders and establish credibility in a competitive market dominated by centralized exchanges.",
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
    services: ["Billboard Marketing", "Brand Awareness", "Social Media Campaign", "Market Entry"],
    shortServices: ["OOH", "Brand", "Social"],
    gallery: [
      { src: synfuturesBillboardImg, title: "Gangnam Billboard", description: "Prime billboard placement in the heart of Gangnam district" },
      { src: "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?w=800&h=600&fit=crop", title: "Night Display", description: "Billboard illumination for 24/7 visibility" },
      { src: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop", title: "Social Campaign", description: "Coordinated social media amplification" },
      { src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop", title: "Community Event", description: "Offline meetup organized near billboard location" }
    ],
    news: [
      { title: "SynFutures Launches Major Billboard Campaign in Seoul", source: "Block Media", date: "2024-04-20", url: "#", image: "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?w=400&h=250&fit=crop" },
      { title: "DeFi Platform SynFutures Targets Korean Traders", source: "CoinDesk Korea", date: "2024-04-18", url: "#", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop" },
      { title: "Gangnam Sees New Crypto Billboard Campaign", source: "TokenPost", date: "2024-04-15", url: "#", image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=400&h=250&fit=crop" }
    ]
  },
  "fogo": {
    name: "FOGO",
    logo: fogoLogo,
    bgImage: fogoFestImg,
    category: "Layer 1",
    result: "Fogo Fest 2025 Success",
    glowColor: "#FF4500",
    description: "FOGO launched their ecosystem activation in Korea with the highly successful Fogo Fest 2025 event.",
    challenge: "As a new Layer 1 blockchain, FOGO needed to establish brand presence and community in the competitive Korean market while creating memorable experiences.",
    metrics: [
      { value: "2K+", label: "Event Attendees" },
      { value: "100K+", label: "Social Reach" },
      { value: "30+", label: "KOL Partners" },
      { value: "50K+", label: "Community" }
    ],
    strategy: [
      "Organized Fogo Fest 2025 with top Korean crypto KOLs",
      "Created immersive brand experience events",
      "Launched Korean community channels and engagement",
      "Partnered with Korean crypto media for coverage",
      "Built ambassador program with Korean influencers"
    ],
    results: [
      { metric: "Event Attendance", value: "2K+" },
      { metric: "Social Media Reach", value: "100K+" },
      { metric: "KOL Partnerships", value: "30+" },
      { metric: "Korean Community", value: "50K+" }
    ],
    services: ["Event Marketing", "Community Building", "KOL Campaigns", "Brand Activation"],
    shortServices: ["Events", "KOLs", "Community"],
    gallery: [
      { src: fogoFestImg, title: "Fogo Fest 2025", description: "Flagship launch event in Seoul with 2,000+ attendees" },
      { src: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop", title: "Stage Experience", description: "Main stage presentations and community showcase" },
      { src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop", title: "Community Meetup", description: "Post-event networking with Korean community" },
      { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop", title: "Brand Activation", description: "Interactive brand experience zones" }
    ],
    news: [
      { title: "Fogo Fest 2025 Draws 2,000+ Attendees in Seoul", source: "Block Media", date: "2025-01-20", url: "#", image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=250&fit=crop" },
      { title: "FOGO Launches Korean Market Entry with Major Event", source: "CoinDesk Korea", date: "2025-01-18", url: "#", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=250&fit=crop" },
      { title: "Korean Crypto Community Welcomes FOGO Ecosystem", source: "TokenPost", date: "2025-01-15", url: "#", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=250&fit=crop" }
    ]
  },
  "zkpass": {
    name: "zkPass",
    logo: zkpassLogo,
    bgImage: zkpassImg,
    category: "Privacy",
    result: "The Verifiable Nights",
    glowColor: "#8A2BE2",
    description: "zkPass launched their privacy-focused Web3 identity solution in Korea with 'The Verifiable Nights' event series.",
    challenge: "Privacy and zero-knowledge technology needed clear explanation for Korean developers and users. Building awareness around ZK identity verification was crucial.",
    metrics: [
      { value: "500+", label: "Event Attendees" },
      { value: "200+", label: "Developers" },
      { value: "50K+", label: "Impressions" },
      { value: "15+", label: "Media Features" }
    ],
    strategy: [
      "Organized 'The Verifiable Nights' educational event series",
      "Created Korean ZK technology educational content",
      "Built developer community for zkPass integration",
      "Partnered with Korean Web3 projects for use cases",
      "Launched Korean ambassador program"
    ],
    results: [
      { metric: "Event Series Attendance", value: "500+" },
      { metric: "Developer Signups", value: "200+" },
      { metric: "Media Impressions", value: "50K+" },
      { metric: "Media Coverage", value: "15+" }
    ],
    services: ["Developer Relations", "Event Marketing", "Educational Content", "Community Building"],
    shortServices: ["DevRel", "Events", "Education"],
    gallery: [
      { src: zkpassImg, title: "The Verifiable Nights", description: "Educational event series on ZK identity verification" },
      { src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop", title: "Developer Workshop", description: "Hands-on zkPass integration tutorials" },
      { src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop", title: "Tech Talk", description: "ZK technology deep-dive sessions" },
      { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", title: "Partner Showcase", description: "Korean Web3 integration demonstrations" }
    ],
    news: [
      { title: "zkPass Hosts 'Verifiable Nights' in Seoul", source: "Block Media", date: "2024-04-25", url: "#", image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=250&fit=crop" },
      { title: "Zero-Knowledge Identity Solutions Gain Traction in Korea", source: "CoinDesk Korea", date: "2024-04-22", url: "#", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop" },
      { title: "zkPass Partners with Korean Web3 Projects", source: "TokenPost", date: "2024-04-18", url: "#", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=250&fit=crop" }
    ]
  }
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const project = slug ? projectsData[slug] : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Project Not Found</h1>
          <Link to="/projects" className="text-primary hover:underline">
            View All Projects
          </Link>
        </div>
      </div>
    );
  }

  // Get other projects for navigation
  const allSlugs = Object.keys(projectsData);
  const currentIndex = allSlugs.indexOf(slug || "");
  const nextSlug = allSlugs[(currentIndex + 1) % allSlugs.length];
  const nextProject = projectsData[nextSlug];
  const galleryRef = useRef<HTMLDivElement>(null);

  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const scrollAmount = 320;
      galleryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-white p-0.5 sm:p-1 md:p-2">
      <div className="min-h-screen bg-[#0A0A0A] rounded-xl sm:rounded-2xl overflow-hidden">
        <Navbar />
      
      {/* Lightbox */}
      <Lightbox
        images={project.gallery}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
      
      {/* Hero Section - Neon Green Marketing Style */}
      <section className="relative min-h-[85vh] overflow-hidden">
        {/* Background Image with Ken Burns */}
        <div 
          className="absolute inset-[-10%] bg-cover bg-center animate-kenburns"
          style={{ 
            backgroundImage: `url(${project.bgImage})`,
            filter: 'brightness(0.4) saturate(1.3)',
          }}
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-transparent to-transparent" />
        
        {/* Project Color Glow Blobs */}
        <div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-40 animate-pulse"
          style={{ background: `radial-gradient(circle, ${project.glowColor} 0%, transparent 70%)` }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-30"
          style={{ background: `radial-gradient(circle, ${project.glowColor} 0%, transparent 70%)` }}
        />
        
        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(${project.glowColor} 1px, transparent 1px),
              linear-gradient(90deg, ${project.glowColor} 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto max-w-6xl px-4 pt-32 pb-20">
          {/* Back Button */}
          <button
            onClick={() => navigate("/projects")}
            className="group flex items-center gap-2 text-white/60 mb-12 px-4 py-2 rounded-xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20"
            style={{ '--hover-color': project.glowColor } as React.CSSProperties}
            onMouseEnter={(e) => e.currentTarget.style.color = project.glowColor}
            onMouseLeave={(e) => e.currentTarget.style.color = ''}
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm uppercase tracking-wider">Back to Projects</span>
          </button>

          {/* Category Badge */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl mb-6 backdrop-blur-sm transition-all duration-300"
            style={{ 
              backgroundColor: `${project.glowColor}15`, 
              border: `1px solid ${project.glowColor}30` 
            }}
          >
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: project.glowColor }} />
            <span className="text-xs uppercase tracking-widest font-medium" style={{ color: project.glowColor }}>
              {project.category}
            </span>
          </div>

          {/* Logo & Name */}
          <div className="flex flex-col items-start gap-6">
            <div className="relative">
              <img
                src={project.logo}
                alt={project.name}
                className="w-24 h-24 object-contain"
                style={{ filter: `drop-shadow(0 0 30px ${project.glowColor}80)` }}
              />
              {/* Glow ring behind logo */}
              <div 
                className="absolute inset-0 rounded-full blur-xl -z-10 scale-150" 
                style={{ backgroundColor: `${project.glowColor}20` }}
              />
            </div>
            
            <div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-4 tracking-tight">
                {project.name}
              </h1>
              <p className="text-xl md:text-2xl text-white/70 max-w-2xl leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          {/* Key Result Badge */}
          <div 
            className="mt-12 inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.06]"
            style={{ border: `1px solid ${project.glowColor}25` }}
          >
            <span className="text-white/50 text-sm uppercase tracking-wider">Key Result</span>
            <span className="text-2xl md:text-3xl font-bold" style={{ color: project.glowColor }}>{project.result}</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-12 animate-pulse" style={{ background: `linear-gradient(to bottom, ${project.glowColor}, transparent)` }} />
          <span className="text-xs uppercase tracking-widest" style={{ color: `${project.glowColor}60` }}>Scroll</span>
        </div>
      </section>

      {/* Key Result Marquee - Project Color Style */}
      <div className="py-4 overflow-hidden relative" style={{ backgroundColor: project.glowColor }}>
        <div className="flex animate-marquee whitespace-nowrap relative">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-8 text-black text-sm font-bold uppercase tracking-widest flex items-center gap-4">
              <span className="w-2 h-2 rounded-full bg-black/30" />
              {project.result}
            </span>
          ))}
        </div>
      </div>

      {/* Metrics Section - Dark Project Color Style */}
      <section className="bg-[#0A0A0A] py-16">
        <div className="container mx-auto max-w-6xl px-4">
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.metrics.map((metric, index) => (
              <div 
                key={index} 
                className="group relative p-6 md:p-8 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] transition-all duration-300 ease-out overflow-hidden hover:-translate-y-1"
                style={{ '--glow-color': project.glowColor } as React.CSSProperties}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${project.glowColor}40`; e.currentTarget.style.boxShadow = `0 12px 40px ${project.glowColor}15`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.boxShadow = ''; }}
              >
                {/* Hover Glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                  style={{ backgroundColor: `${project.glowColor}06` }}
                />
                
                <div className="relative">
                  <p className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 tracking-tight" style={{ color: project.glowColor }}>
                    {metric.value}
                  </p>
                  <p className="text-white/50 text-xs md:text-sm font-medium uppercase tracking-wider">
                    {metric.label}
                  </p>
                </div>
                <span className="absolute bottom-4 right-4 text-white/20 text-xs font-mono">0{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge & Approach Section - Dark Theme */}
      <section className="bg-[#0A0A0A]">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left - THE CHALLENGE */}
            <div className="p-8 md:p-12 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] relative overflow-hidden transition-all duration-300 ease-out hover:border-white/[0.15] hover:bg-white/[0.05]">
              {/* Accent Line */}
              <div 
                className="absolute top-0 left-0 w-full h-1 rounded-t-2xl" 
                style={{ background: `linear-gradient(to right, ${project.glowColor}, ${project.glowColor}50, transparent)` }}
              />
              
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] mb-6" style={{ color: project.glowColor }}>
                <span className="w-6 h-px" style={{ backgroundColor: project.glowColor }} />
                The Challenge
              </span>
              <p className="text-white text-xl md:text-2xl font-light leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* Right - WHAT WE DID */}
            <div className="p-8 md:p-12 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] relative overflow-hidden transition-all duration-300 ease-out hover:border-white/[0.15] hover:bg-white/[0.05]">
              {/* Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r from-white/30 via-white/10 to-transparent" />
              
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50 mb-6">
                <span className="w-6 h-px bg-white/50" />
                What We Did
              </span>
              
              {/* Services List with Project Color Dots */}
              <div className="space-y-4 mb-8">
                {project.services.map((service, i) => (
                  <div key={i} className="flex items-center gap-3 transition-all duration-200 hover:translate-x-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: project.glowColor }} />
                    <span className="text-white text-lg">{service}</span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-white/[0.08] my-6" />

              {/* Strategy Quote */}
              <p className="text-white/60 text-sm italic leading-relaxed">
                "{project.strategy[0]}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Dark Project Color Style */}
      <section className="bg-[#0A0A0A] py-16">
        <div className="container mx-auto max-w-6xl px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] mb-4" style={{ color: project.glowColor }}>
                <span className="w-6 h-px" style={{ backgroundColor: project.glowColor }} />
                Gallery
              </span>
              <h2 className="text-white text-4xl md:text-5xl font-bold">
                Campaign <span style={{ color: project.glowColor }}>Highlights</span>
              </h2>
            </div>
            
            {/* Navigation Arrows */}
            <div className="flex gap-3">
              <button
                onClick={() => scrollGallery('left')}
                className="w-12 h-12 rounded-2xl border border-white/[0.1] bg-white/[0.03] backdrop-blur-sm flex items-center justify-center transition-all duration-300 ease-out group hover:-translate-y-0.5"
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${project.glowColor}50`; e.currentTarget.style.backgroundColor = `${project.glowColor}15`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.backgroundColor = ''; }}
              >
                <ChevronLeft className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
              </button>
              <button
                onClick={() => scrollGallery('right')}
                className="w-12 h-12 rounded-2xl border border-white/[0.1] bg-white/[0.03] backdrop-blur-sm flex items-center justify-center transition-all duration-300 ease-out group hover:-translate-y-0.5"
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${project.glowColor}50`; e.currentTarget.style.backgroundColor = `${project.glowColor}15`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.backgroundColor = ''; }}
              >
                <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>

          {/* Gallery Images */}
          <div 
            ref={galleryRef}
            className="overflow-x-auto scrollbar-hide scroll-smooth -mx-4 px-4"
          >
            <div className="flex gap-5" style={{ width: 'max-content' }}>
              {project.gallery.map((item, index) => (
                <div 
                  key={index} 
                  className="relative w-72 md:w-80 aspect-[4/3] overflow-hidden rounded-2xl group cursor-pointer flex-shrink-0 border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1"
                  onClick={() => openLightbox(index)}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${project.glowColor}40`; e.currentTarget.style.boxShadow = `0 16px 48px ${project.glowColor}20`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.boxShadow = ''; }}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                    <h3 className="text-white font-semibold text-base mb-1">{item.title}</h3>
                    <p className="text-white/60 text-sm line-clamp-2">{item.description}</p>
                  </div>

                  {/* Expand Icon */}
                  <div 
                    className="absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100"
                    style={{ backgroundColor: project.glowColor }}
                  >
                    <ArrowUpRight className="w-5 h-5 text-black" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next Project - Dark Project Color Style */}
      <section className="py-24 bg-[#0A0A0A] border-t border-white/[0.08]">
        <div className="container mx-auto max-w-6xl px-4">
          <Link 
            to={`/projects/${nextSlug}`}
            onClick={() => window.scrollTo(0, 0)}
            className="block group"
          >
            <p className="text-sm uppercase tracking-widest mb-6 flex items-center gap-3" style={{ color: nextProject.glowColor }}>
              <span className="w-8 h-px" style={{ backgroundColor: nextProject.glowColor }} />
              Next Project
            </p>
            <div className="flex items-center justify-between">
              <div>
                <h3 
                  className="text-5xl md:text-7xl lg:text-8xl font-bold text-white transition-all duration-300 ease-out mb-3"
                  onMouseEnter={(e) => e.currentTarget.style.color = nextProject.glowColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  {nextProject.name}
                </h3>
                <p className="text-white/50 text-xl">{nextProject.result}</p>
              </div>
              <div className="relative">
                <div 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border border-white/[0.1] bg-white/[0.03] backdrop-blur-sm flex items-center justify-center transition-all duration-300 ease-out group-hover:-translate-y-1"
                  style={{ '--next-glow': nextProject.glowColor } as React.CSSProperties}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${nextProject.glowColor}50`; e.currentTarget.style.boxShadow = `0 12px 40px ${nextProject.glowColor}25`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.boxShadow = ''; }}
                >
                  <ArrowUpRight className="w-8 h-8 md:w-10 md:h-10 text-white/50 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <Footer />
      </div>
    </div>
  );
};

export default ProjectDetail;
