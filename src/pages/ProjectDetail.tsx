import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";
import { useEffect, useState } from "react";

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

// Project data
const projectsData: Record<string, {
  name: string;
  logo: string;
  category: string;
  result: string;
  bgStyle: string;
  description: string;
  challenge: string;
  strategy: string[];
  results: { metric: string; value: string }[];
  services: string[];
  gallery: { src: string; title: string; description: string }[];
  news: { title: string; source: string; date: string; url: string; image: string }[];
}> = {
  "bnb-chain": {
    name: "BNB Chain",
    logo: bnbLogo,
    category: "Infrastructure",
    result: "+340% Korean Trading Volume",
    bgStyle: "bg-gradient-to-br from-[#F3BA2F] via-[#F0B90B] to-[#C99100]",
    description: "BNB Chain sought to dramatically increase their presence in the Korean market, targeting both retail traders and institutional investors.",
    challenge: "Despite being one of the largest blockchain ecosystems globally, BNB Chain had limited brand recognition in Korea compared to local exchanges. They needed a comprehensive strategy to capture the Korean market while navigating local regulations.",
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
    gallery: [
      { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop", title: "Seoul Launch Event", description: "Exclusive networking event with 500+ attendees at COEX Convention Center" },
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
    category: "Exchange",
    result: "50K+ New Korean Users",
    bgStyle: "bg-gradient-to-br from-[#23AF91] via-[#1A9B7F] to-[#147A63]",
    description: "KuCoin aimed to expand their user base in Korea and establish themselves as a trusted global exchange option for Korean traders.",
    challenge: "Competing with established Korean exchanges while building trust with Korean users who typically prefer local platforms. The challenge was to demonstrate KuCoin's unique value proposition.",
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
    gallery: [
      { src: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&h=600&fit=crop", title: "Trading Competition", description: "Korean-exclusive trading event with $100K prizes" },
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
    category: "Layer 2",
    result: "$2M Korean TVL in 30 Days",
    bgStyle: "bg-gradient-to-br from-[#8247E5] via-[#7B3FE4] to-[#5A2D9C]",
    description: "Polygon wanted to increase adoption of their Layer 2 solution among Korean DeFi users and developers.",
    challenge: "While Polygon had strong technical credentials, Korean users were unfamiliar with Layer 2 solutions. Education and trust-building were critical.",
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
    gallery: [
      { src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop", title: "Developer Hackathon", description: "48-hour building event at Seoul Startup Hub" },
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
    category: "RWA",
    result: "100K+ Korean Community",
    bgStyle: "bg-gradient-to-br from-[#0A1628] via-[#1E3A5F] to-[#0D1B2A]",
    description: "Ondo Finance aimed to introduce Real World Asset (RWA) tokenization to the Korean market, targeting both retail and institutional investors.",
    challenge: "RWA was a new concept for most Korean crypto investors. Building understanding and trust around tokenized securities required extensive education.",
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
    gallery: [
      { src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop", title: "RWA Seminar", description: "Educational events for institutional investors at Korea Finance Center" },
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
    category: "DePIN",
    result: "#1 DePIN in Korea",
    bgStyle: "bg-gradient-to-br from-[#00E5A0] via-[#00D4AA] to-[#00A080]",
    description: "Peaq aimed to become the leading DePIN (Decentralized Physical Infrastructure Network) platform in Korea.",
    challenge: "DePIN was an emerging narrative with limited awareness. Peaq needed to establish thought leadership while building a strong community.",
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
    gallery: [
      { src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop", title: "DePIN Summit", description: "Korea's first DePIN-focused conference at Gangnam" },
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
    category: "IP Protocol",
    result: "5K+ Korean Creators",
    bgStyle: "bg-gradient-to-br from-[#FF6B6B] via-[#E5484D] to-[#C92A2A]",
    description: "Story Protocol sought to onboard Korean content creators to their IP tokenization platform, targeting webtoon artists, musicians, and digital creators.",
    challenge: "Korean creators were unfamiliar with IP tokenization and blockchain technology. Building trust and demonstrating clear value was essential.",
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
    gallery: [
      { src: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=600&fit=crop", title: "Creator Workshop", description: "Hands-on IP tokenization training for Korean artists" },
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
    category: "Layer 2",
    result: "+500% Korean Engagement",
    bgStyle: "bg-gradient-to-br from-[#1a1a2e] via-[#3C4DBB] to-[#627EEA]",
    description: "MegaETH aimed to build strong community presence in Korea ahead of their mainnet launch.",
    challenge: "As a new L2 project, MegaETH needed to differentiate from established competitors and build early community momentum.",
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
    gallery: [
      { src: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop", title: "Pre-Launch Campaign", description: "Hype-building social media strategy and teasers" },
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
    category: "Wallet",
    result: "30K+ Korean Wallets",
    bgStyle: "bg-gradient-to-br from-[#FF9500] via-[#FFB347] to-[#FF7F00]",
    description: "Tria wanted to become the go-to Web3 wallet for Korean users with their simplified UX approach.",
    challenge: "Korean users had many wallet options. Tria needed to demonstrate their unique value proposition and ease of use.",
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
    gallery: [
      { src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop", title: "Launch Campaign", description: "Korean market entry promotion with incentives" },
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
    category: "Exchange",
    result: "#2 Korean Exchange Traffic",
    bgStyle: "bg-gradient-to-br from-[#F7A600] via-[#FFB800] to-[#E69500]",
    description: "Bybit aimed to capture significant market share in the competitive Korean exchange landscape.",
    challenge: "Competing against dominant local exchanges required a sophisticated, multi-channel approach to user acquisition and retention.",
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
    gallery: [
      { src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop", title: "Trading Campaign", description: "Zero-fee promotion launch with massive reach" },
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
      
      {/* Hero Section */}
      <section className={`relative min-h-[70vh] ${project.bgStyle} overflow-hidden`}>
        {/* Parallax Effect */}
        <div 
          className="absolute inset-0 bg-black/20"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto max-w-6xl px-4 pt-32 pb-20">
          {/* Back Button */}
          <button
            onClick={() => navigate("/projects")}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-12 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Projects</span>
          </button>

          {/* Logo & Name */}
          <div className="flex flex-col items-start gap-6">
            <img
              src={project.logo}
              alt={project.name}
              className="w-24 h-24 object-contain filter brightness-0 invert"
            />
            <div>
              <span className="text-white/70 text-sm uppercase tracking-wider mb-2 block">
                {project.category}
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                {project.name}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl">
                {project.description}
              </p>
            </div>
          </div>

          {/* Key Result */}
          <div className="mt-12 inline-block bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-6">
            <p className="text-white/70 text-sm uppercase tracking-wider mb-1">Key Result</p>
            <p className="text-3xl md:text-4xl font-bold text-white">{project.result}</p>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <span className="number-badge text-muted-foreground mb-4 block">[ 01 ]</span>
              <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6">
                The <span className="serif-italic">Challenge</span>
              </h2>
            </div>
            <div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.challenge}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy & Services Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4">
          <span className="number-badge text-muted-foreground mb-4 block">[ 02 ]</span>
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-8">
            Our <span className="serif-italic">Strategy</span>
          </h2>

          {/* Services Tags */}
          <div className="flex flex-wrap gap-3 mb-12">
            {project.services.map((service, index) => (
              <span key={index} className="lunar-tag-light">
                {service}
              </span>
            ))}
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {project.strategy.map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-6 rounded-xl bg-background border border-border/50">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto max-w-6xl px-4">
          <span className="number-badge text-muted-foreground mb-4 block">[ 03 ]</span>
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-12">
            The <span className="serif-italic">Results</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {project.results.map((result, index) => (
              <div key={index} className={`p-6 rounded-xl ${project.bgStyle}`}>
                <p className="text-3xl md:text-4xl font-bold text-white mb-2">{result.value}</p>
                <p className="text-white/80 text-sm">{result.metric}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4">
          <span className="number-badge text-muted-foreground mb-4 block">[ 04 ]</span>
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-12">
            Campaign <span className="serif-italic">Highlights</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.gallery.map((item, index) => (
              <div 
                key={index} 
                className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-white/70 text-sm">{item.description}</p>
                </div>

                {/* Expand Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Next Project */}
      <section className={`py-24 ${nextProject.bgStyle}`}>
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-white/70 text-sm uppercase tracking-wider mb-2">Next Project</p>
              <h3 className="text-4xl md:text-5xl font-bold text-white">{nextProject.name}</h3>
              <p className="text-white/80 mt-2">{nextProject.category}</p>
            </div>
            <Link
              to={`/projects/${nextSlug}`}
              className="flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
            >
              <span>View Project</span>
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
