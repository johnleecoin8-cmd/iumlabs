/**
 * =====================================================
 * Site Content Configuration
 * =====================================================
 */

// =====================================================
// Brand Information
// =====================================================
export const brand = {
  name: "ium Labs",
  tagline: "Web3 Marketing Agency",
  description: "Korea's leading Web3 marketing agency. We help blockchain projects launch and grow successfully.",
  email: "info@iumlabs.io",
  address: "OFFICE 11B, Gangnam-daero 373, Gangnam, Seoul, South Korea",
  telegram: "@iumlabs",
  telegramLink: "https://t.me/iumlabs",
  linkedin: "https://www.linkedin.com/company/iumlabs",
  calendlyUrl: "https://calendly.com/iumlabs/30min",
  copyright: `© ${new Date().getFullYear()} ium Labs`,
};

// =====================================================
// Image Configuration
// =====================================================
export const images = {
  dashboardMockup: "/src/assets/dashboard-mockup.png",
  portfolio: {
    metaverse: "/src/assets/portfolio-metaverse.png",
    defi: "/src/assets/portfolio-defi.png",
    dao: "/src/assets/portfolio-dao.png",
    gamefi: "/src/assets/portfolio-gamefi.png",
  },
  team: {
    james: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    david: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
  },
  logo: null,
};

// =====================================================
// Navigation
// =====================================================
export const navigation = {
  links: [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Research", href: "/research" },
    // { name: "K-Leaderboard", href: "/k-leaderboard" }, // 임시 숨김
    { name: "Career", href: "/jobs" },
    { name: "Contact", href: "/contact" },
  ],
  ctaButton: "Get Started",
};

// =====================================================
// Hero Section
// =====================================================
export const hero = {
  badge: "Web3 Marketing Agency",
  headline: {
    line1: "Your",
    highlight: "Web3 Project",
    line2: "Launch in Korea.",
  },
  description: "We provide strategic marketing, community building, and deep local expertise for your blockchain project's success.",
  buttons: {
    primary: "Start Your Project",
    secondary: "View Portfolio",
  },
  badges: {
    liveData: "Live Data",
    roi: "+847% ROI",
  },
};

// =====================================================
// Stats Section
// =====================================================
export const stats = {
  items: [
    { 
      value: 19, 
      label: "Projects Launched", 
      suffix: "+",
    },
    { 
      value: 170, 
      label: "KOL Network", 
      suffix: "+",
    },
    { 
      value: 7, 
      label: "Token Sales", 
      prefix: "$", 
      suffix: "M",
    },
    { 
      value: 44, 
      label: "Events Host", 
      suffix: "+",
    },
  ],
  partnersLabel: "Trusted Partners",
  partners: [
    "Binance",
    "Upbit",
    "Bithumb",
    "Coinone",
    "CoinMarketCap",
    "CoinGecko",
  ],
};

// =====================================================
// Services Section
// =====================================================
export const services = {
  badge: "Our Services",
  headline: "Full-Service <highlight>Web3 Marketing</highlight> for Korea.",
  items: [
    {
      id: "web3-marketing",
      title: "Web3 Marketing",
      description: "Comprehensive marketing strategy including community building, PR, and influencer campaigns for blockchain projects.",
      fullDescription: "We provide end-to-end solutions for blockchain projects entering the Korean market. Combining deep industry knowledge with proven marketing strategies to effectively reach your target audience.",
      features: [
        "Community Building & Management",
        "KOL/Influencer Partnerships",
        "PR & Media Relations",
        "Social Media Strategy",
        "Content Marketing",
        "Event Planning & Execution",
      ],
    },
    {
      id: "nft-marketing",
      title: "NFT Marketing",
      description: "End-to-end NFT launch services from artwork strategy to marketplace listing and community engagement.",
      fullDescription: "Launch your NFT collection with maximum impact. From pre-launch hype building to post-mint community engagement, we help your collection stand out in Korea's competitive NFT market.",
      features: [
        "Collection Strategy & Positioning",
        "Whitelist Campaign Management",
        "Discord & Community Setup",
        "Marketplace Optimization",
        "Secondary Sales Strategy",
        "Holder Benefits Program",
      ],
    },
    {
      id: "defi-marketing",
      title: "DeFi Marketing",
      description: "Specialized DeFi protocol marketing for liquidity programs, yield farming campaigns, and TVL growth.",
      fullDescription: "DeFi protocols require specialized marketing approaches. We help you secure liquidity, grow TVL, and build a power-user community through targeted campaigns and strategic partnerships.",
      features: [
        "TVL Growth Campaigns",
        "Yield Farming Promotions",
        "Liquidity Mining Programs",
        "Protocol Education Content",
        "DeFi Aggregator Listings",
        "Security Audit Marketing",
      ],
    },
    {
      id: "gamefi",
      title: "GameFi",
      description: "Gaming-focused marketing strategies for P2E and GameFi projects targeting Korea's gaming market.",
      fullDescription: "Korea is one of the largest gaming markets in the world. We help blockchain games enter this promising market with culturally-adapted campaigns and partnerships with Korean gaming influencers.",
      features: [
        "Gaming Influencer Campaigns",
        "Esports Partnerships",
        "P2E Community Building",
        "Guild Partnerships",
        "Game Review Placements",
        "Beta Testing Campaigns",
      ],
    },
    {
      id: "exchange-listing",
      title: "Exchange Listing",
      description: "Expert support for Korean and global exchange listings including documentation and negotiations.",
      fullDescription: "Navigate the complex process of Korean and global exchange listings with us. With relationships at major exchanges, we guide you through compliance requirements and negotiation processes.",
      features: [
        "Exchange Application Support",
        "Documentation Preparation",
        "Compliance Consulting",
        "Market Making Partnerships",
        "Listing Announcements",
        "Post-Listing Support",
      ],
    },
    {
      id: "advisory",
      title: "Advisory Services",
      description: "Strategic consulting on tokenomics, GTM strategy, and regulatory compliance in the Korean market.",
      fullDescription: "Get strategic guidance from industry veterans. From regulatory considerations to tokenomics design and GTM strategy, we help you navigate the Korean crypto market.",
      features: [
        "Tokenomics Consulting",
        "GTM Strategy",
        "Regulatory Guidance",
        "Partnership Connections",
        "Investor Relations",
        "Crisis Management",
      ],
    },
  ],
  modal: {
    includedLabel: "What's Included",
    getStarted: "Get Started",
    close: "Close",
  },
  learnMore: "Learn More",
};

// =====================================================
// Portfolio Section
// =====================================================
export const portfolio = {
  badge: "Portfolio",
  headline: "Featured <highlight>Projects</highlight>",
  viewAll: "View All",
  fundsRaised: "Funds Raised",
  activeLabel: "● Active",
  projects: [
    {
      id: "metaverse-korea",
      name: "Metaverse Korea",
      category: "NFT",
      raised: "$12M",
      description: "Korea's leading metaverse platform with virtual real estate and social features.",
    },
    {
      id: "kimchiswap",
      name: "KimchiSwap",
      category: "DeFi",
      raised: "$8.5M",
      description: "Korea's top DEX with innovative AMM and yield farming protocols.",
    },
    {
      id: "seoul-dao",
      name: "Seoul DAO",
      category: "Web3",
      raised: "$15M",
      description: "A decentralized autonomous organization for Korean Web3 ecosystem development.",
    },
    {
      id: "k-play",
      name: "K-Play",
      category: "GameFi",
      raised: "$20M",
      description: "P2E gaming platform featuring top Korean gaming IPs.",
    },
  ],
};

// =====================================================
// CTA Section
// =====================================================
export const cta = {
  badge: "Free Consultation Available",
  headline: {
    line1: "Ready to Launch",
    highlight: "Your Project?",
  },
  description: "Talk to our Web3 marketing experts to learn how to succeed in the Korean market.",
  buttons: {
    primary: "Book Consultation",
    secondary: "Send Message",
  },
  contactLinks: {
    telegram: "Telegram",
    kakao: "KakaoTalk",
  },
};

// =====================================================
// Footer
// =====================================================
export const footer = {
  servicesTitle: "Services",
  companyTitle: "Company",
  services: [
    { name: "Web3 Marketing", href: "/services" },
    { name: "NFT Marketing", href: "/services/nft" },
    { name: "DeFi Marketing", href: "/services/defi" },
    { name: "GameFi Marketing", href: "/services/gamefi" },
  ],
  company: [
    { name: "Case Studies", href: "/projects" },
    { name: "Research", href: "/research" },
    { name: "Contact", href: "/contact" },
  ],
  social: ["LinkedIn", "Telegram", "Twitter"],
  legal: {
    privacy: "Privacy Policy",
    terms: "Terms of Service",
  },
};

// =====================================================
// About Page
// =====================================================
export const about = {
  pageTitle: "About Us",
  pageDescription: "CryptoBridge is Korea's leading Web3 marketing agency. We help blockchain projects launch and grow successfully.",
  
  mission: {
    title: "Our <highlight>Mission</highlight>",
    description1: "We provide strategic marketing partnerships for innovative Web3 projects to succeed in global markets. Beyond simple promotion, we build sustainable communities and brand value.",
    description2: "Since 2021, we've supported over 100 projects and helped raise $500M+ in funding.",
    stats: [
      { value: "100+", label: "Projects Launched" },
      { value: "$500M+", label: "Funds Raised" },
      { value: "50+", label: "Team Members" },
      { value: "30+", label: "Countries Reached" },
    ],
  },
  
  valuesTitle: "Our <highlight>Values</highlight>",
  values: [
    {
      title: "Results-Driven",
      description: "We prove project success through measurable outcomes.",
    },
    {
      title: "Innovation",
      description: "We deliver innovative marketing strategies using the latest trends and technologies.",
    },
    {
      title: "Community First",
      description: "Authentic community building is the key to Web3 success.",
    },
    {
      title: "Global Expansion",
      description: "We support expansion beyond Korea to global markets.",
    },
  ],
  
  teamTitle: "Our <highlight>Team</highlight>",
  team: [
    {
      name: "James",
      role: "Co-Founder",
      description: "Web3 strategy and business development expert",
    },
    {
      name: "David",
      role: "Co-Founder",
      description: "Blockchain marketing and community growth expert",
    },
  ],
};

// =====================================================
// Contact Page
// =====================================================
export const contact = {
  pageTitle: "Contact Us",
  pageDescription: "Let's talk about your project. We'll recommend the best marketing strategy through a free consultation.",
  
  form: {
    title: "Send a Message",
    nameLabel: "Name *",
    namePlaceholder: "John Doe",
    emailLabel: "Email *",
    emailPlaceholder: "hello@example.com",
    companyLabel: "Company/Project",
    companyPlaceholder: "CryptoBridge",
    messageLabel: "Message *",
    messagePlaceholder: "Tell us about your project...",
    submitButton: "Send Message",
    successTitle: "Message sent!",
    successMessage: "We'll get back to you shortly.",
  },
  
  info: {
    title: "Contact Information",
    items: [
      { type: "email", label: "Email" },
      { type: "phone", label: "Phone" },
      { type: "address", label: "Address" },
      { type: "telegram", label: "Telegram" },
    ],
  },
  
  officeHours: {
    title: "Office Hours",
    weekday: { label: "Monday - Friday", time: "09:00 - 18:00" },
    saturday: { label: "Saturday", time: "10:00 - 14:00" },
    sunday: { label: "Sunday", time: "Closed" },
  },
  
  mapTitle: "Find <highlight>Us</highlight>",
};

// =====================================================
// Services Page
// =====================================================
export const servicesPage = {
  pageTitle: "Services",
  pageDescription: "We provide comprehensive marketing solutions for Web3 project success. One-stop support from strategy to execution.",
};

// =====================================================
// Projects Page
// =====================================================
export const projectsPage = {
  pageTitle: "Projects",
  pageDescription: "Check out successfully launched Web3 projects. We share growth stories and results for each project.",
};

// =====================================================
// Intro Animation
// =====================================================
export const intro = {
  tagline: "Web3 Marketing Agency",
};

// =====================================================
// Special Offer Contact Form
// =====================================================
export const specialOffer = {
  title: "CONTACT US TO GET A SPECIAL OFFER",
  emailPlaceholder: "Email",
  namePlaceholder: "Name",
  commentsPlaceholder: "Comments",
  buttonText: "SEND",
  successTitle: "Message sent!",
  successMessage: "We'll get back to you shortly.",
  errorTitle: "Failed to send",
  errorMessage: "Failed to submit. Please try again.",
};

// =====================================================
// Project Colors - Centralized Color System
// =====================================================
export const projectColors = {
  "bnb-chain": {
    primary: "#F3BA2F",
    glow: "rgba(243, 186, 47, 0.5)",
    name: "BNB Chain",
  },
  "kucoin": {
    primary: "#23AF91",
    glow: "rgba(35, 175, 145, 0.5)",
    name: "KuCoin",
  },
  "polygon": {
    primary: "#8247E5",
    glow: "rgba(130, 71, 229, 0.5)",
    name: "Polygon",
  },
  "ondo-finance": {
    primary: "#3B82F6",
    glow: "rgba(59, 130, 246, 0.5)",
    name: "Ondo Finance",
  },
  "peaq": {
    primary: "#00CED1",
    glow: "rgba(0, 206, 209, 0.5)",
    name: "Peaq",
  },
  "story-protocol": {
    primary: "#FF6B9D",
    glow: "rgba(255, 107, 157, 0.5)",
    name: "Story Protocol",
  },
  "megaeth": {
    primary: "#E040FB",
    glow: "rgba(224, 64, 251, 0.5)",
    name: "MegaETH",
  },
  "tria": {
    primary: "#00BFFF",
    glow: "rgba(0, 191, 255, 0.5)",
    name: "Tria",
  },
  "bybit": {
    primary: "#F7A600",
    glow: "rgba(247, 166, 0, 0.5)",
    name: "Bybit",
  },
  "sahara-ai": {
    primary: "#00D4FF",
    glow: "rgba(0, 212, 255, 0.5)",
    name: "Sahara AI",
  },
  "mantra": {
    primary: "#9B59B6",
    glow: "rgba(155, 89, 182, 0.5)",
    name: "Mantra",
  },
} as const;

// Helper function to get project color by slug
export const getProjectColor = (slug: string) => {
  return projectColors[slug as keyof typeof projectColors] || {
    primary: "#3B82F6",
    glow: "rgba(59, 130, 246, 0.5)",
    name: "Unknown",
  };
};

// =====================================================
// Theme Colors
// =====================================================
export const themeColors = {
  // Primary accent color for the site
  primary: "#3B82F6", // Blue
  primaryGlow: "rgba(59, 130, 246, 0.5)",
  
  // Neon Green (legacy, for reference)
  neonGreen: "#1DB954",
  neonGreenGlow: "rgba(29, 185, 84, 0.5)",
};