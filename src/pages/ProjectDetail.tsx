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
import peaqLogo from "@/assets/logos/peaq.png";
import storyLogo from "@/assets/logos/story-protocol.png";
import megaethLogo from "@/assets/logos/megaeth.png";
import triaLogo from "@/assets/logos/tria.png";
import bybitLogo from "@/assets/logos/bybit.png";

// Import campaign images
import bnbEventImg from "@/assets/campaigns/bnb-event.jpg";
import kucoinCampaignImg from "@/assets/campaigns/kucoin-campaign.jpg";
import polygonHackathonImg from "@/assets/campaigns/polygon-hackathon.jpg";
import ondoSeminarImg from "@/assets/campaigns/ondo-seminar.jpg";
import peaqSummitImg from "@/assets/campaigns/peaq-summit.jpg";
import storyWorkshopImg from "@/assets/campaigns/story-workshop.jpg";
import megaethLaunchImg from "@/assets/campaigns/megaeth-launch.jpg";
import triaLaunchImg from "@/assets/campaigns/tria-launch.jpg";
import bybitCompetitionImg from "@/assets/campaigns/bybit-competition.jpg";

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
      { src: bybitCompetitionImg, title: "Trading Campaign", description: "Zero-fee promotion launch with massive reach" },
      { src: "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop", title: "VIP Program", description: "Exclusive benefits for high-volume traders" },
      { src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop", title: "Esports Partnership", description: "Korean gaming community sponsorship events" },
      { src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop", title: "Brand Campaign", description: "Major marketing push across Korean channels" }
    ],
    news: [
      { title: "Bybit Becomes #2 Exchange by Traffic in Korea", source: "Block Media", date: "2024-04-05", url: "#", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop" },
      { title: "Bybit's Korean User Base Grows 200% in Q1", source: "Decenter", date: "2024-03-22", url: "#", image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=400&h=250&fit=crop" },
      { title: "Bybit Partners with Korean Esports League", source: "TokenPost", date: "2024-03-08", url: "#", image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400&h=250&fit=crop" }
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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Lightbox */}
      <Lightbox
        images={project.gallery}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
      
      {/* Hero Section - with Background Image */}
      <section className="relative min-h-[70vh] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${project.bgImage})`,
            transform: `translateY(${scrollY * 0.1}px)` 
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Glow Effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 30% 50%, ${project.glowColor}30 0%, transparent 50%)`,
          }}
        />
        
        {/* Decorative Gradient Blurs */}
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-white/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
        
        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Diagonal Lines Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              rgba(255,255,255,0.1) 20px,
              rgba(255,255,255,0.1) 21px
            )`
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto max-w-6xl px-4 pt-28 pb-16">
          {/* Back Button */}
          <button
            onClick={() => navigate("/projects")}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Projects</span>
          </button>

          {/* Logo & Name */}
          <div className="flex flex-col items-start gap-4">
            <img
              src={project.logo}
              alt={project.name}
              className="w-20 h-20 object-contain filter brightness-0 invert"
            />
            <div>
              <span className="text-white/70 text-sm uppercase tracking-wider mb-2 block">
                {project.category}
              </span>
              <h1 className="text-5xl md:text-7xl font-light text-white mb-3">
                <span className="serif-italic">{project.name}</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl">
                {project.description}
              </p>
            </div>
          </div>

          {/* Challenge Summary */}
          <div className="mt-8 bg-black/20 backdrop-blur-sm rounded-xl p-5 border border-white/10 max-w-3xl">
            <p className="text-white/70 text-sm uppercase tracking-wider mb-2">The Challenge</p>
            <p className="text-white/90 leading-relaxed">{project.challenge}</p>
          </div>
        </div>

        {/* Year Indicator - Bottom Left */}
        <div className="absolute bottom-6 left-6 z-10">
          <p className="text-white/50 text-xs uppercase tracking-widest">year: 2024</p>
        </div>
      </section>

      {/* Key Result Marquee */}
      <div className="bg-[#c8f547] py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-8 text-black text-sm font-medium uppercase tracking-wider">
              key result • key result • key result
            </span>
          ))}
        </div>
      </div>

      {/* Metrics + Scope Section Combined - Full Width with Depth */}
      <section className="relative">
        {/* Metrics Grid - Compact with subtle shadows */}
        <div className="flex flex-col md:flex-row border-b border-slate-200">
          {project.metrics.map((metric, index) => (
            <div 
              key={index} 
              className={`flex-1 bg-gradient-to-b from-slate-50 to-slate-100 p-5 md:p-6 flex flex-col justify-between min-h-[120px] md:min-h-[140px] relative
                ${index < project.metrics.length - 1 ? 'border-b md:border-b-0 md:border-r border-slate-200' : ''}
                shadow-[inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.03)]`}
            >
              <div>
                <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-1 tracking-tight">
                  {metric.value}
                </p>
                <p className="text-primary text-xs md:text-sm font-medium uppercase tracking-wide">
                  {metric.label}
                </p>
              </div>
              <span className="text-slate-400 text-xs mt-3">0{index + 1}.</span>
            </div>
          ))}
        </div>

        {/* 2-Column High Contrast Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left - THE CHALLENGE (Dark) */}
          <div className="bg-slate-900 p-10 md:p-16 flex flex-col justify-center min-h-[320px]">
            <span className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-6">The Challenge</span>
            <p className="text-white text-xl md:text-2xl lg:text-3xl font-light leading-relaxed">
              {project.challenge}
            </p>
          </div>

          {/* Right - THE APPROACH (Light) */}
          <div className="bg-slate-50 p-10 md:p-16 flex flex-col justify-center min-h-[320px]">
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-6">What We Did</span>
            
            {/* Services List */}
            <div className="space-y-3 mb-8">
              {project.shortServices.map((service, i) => (
                <div key={i} className="text-slate-800 text-lg md:text-xl font-medium">
                  {service}
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-slate-300 my-6" />

            {/* Result Quote */}
            <p className="text-slate-600 text-sm md:text-base italic leading-relaxed">
              "{project.strategy[0]}"
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section - Dark/Light Contrast */}
      <section className="grid grid-cols-1 md:grid-cols-[400px_1fr]">
        {/* Left - Title & Navigation (Dark) */}
        <div className="bg-slate-900 p-10 md:p-12 flex flex-col justify-between min-h-[300px] md:min-h-[400px]">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-6 block">Gallery</span>
            <h2 className="text-white text-3xl md:text-4xl font-light leading-tight">
              Campaign<br />
              <span className="italic text-slate-400">Highlights</span>
            </h2>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex gap-3 mt-8">
            <button
              onClick={() => scrollGallery('left')}
              className="w-12 h-12 rounded-full border border-slate-700 hover:border-slate-500 hover:bg-slate-800 flex items-center justify-center transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-slate-400" />
            </button>
            <button
              onClick={() => scrollGallery('right')}
              className="w-12 h-12 rounded-full border border-slate-700 hover:border-slate-500 hover:bg-slate-800 flex items-center justify-center transition-all"
            >
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Right - Gallery Images (Light) */}
        <div className="bg-slate-100 p-6 md:p-8 overflow-hidden">
          <div 
            ref={galleryRef}
            className="overflow-x-auto scrollbar-hide scroll-smooth -mr-6 md:-mr-8"
          >
            <div className="flex gap-4 pr-6 md:pr-8" style={{ width: 'max-content' }}>
              {project.gallery.map((item, index) => (
                <div 
                  key={index} 
                  className="relative w-64 md:w-72 aspect-[4/3] overflow-hidden group cursor-pointer flex-shrink-0"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-medium text-sm mb-1">{item.title}</h3>
                    <p className="text-white/70 text-xs line-clamp-2">{item.description}</p>
                  </div>

                  {/* Expand Icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-slate-900" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next Project - Minimal Text Style */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto max-w-6xl px-4">
          <Link 
            to={`/projects/${nextSlug}`}
            className="block group"
          >
            <p className="text-slate-400 text-sm uppercase tracking-wider mb-4">Next Project</p>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-light text-slate-900 group-hover:text-primary transition-colors duration-300 mb-2">
                  {nextProject.name}
                </h3>
                <p className="text-slate-500 text-lg">{nextProject.result}</p>
              </div>
              <ArrowUpRight className="w-10 h-10 md:w-14 md:h-14 text-slate-300 group-hover:text-primary group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300" />
            </div>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
