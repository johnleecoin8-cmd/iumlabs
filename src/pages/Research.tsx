import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search, Clock, ArrowRight, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormSection from "@/components/ContactFormSection";
import CTABannerSection from "@/components/CTABannerSection";
import FooterLinksSection from "@/components/FooterLinksSection";
import FloatingContactButton from "@/components/FloatingContactButton";
import ResearchHeroSection from "@/components/ResearchHeroSection";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import CalendlyButton from "@/components/CalendlyButton";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useQuery } from "@tanstack/react-query";

// Research thumbnail images
import ecosystemGrowthImg from "@/assets/blog/ecosystem-growth-2025.jpg";
import suiNetwork2026Img from "@/assets/blog/sui-network-2026.jpg";

// SUI Network chart images
import suiChartTvlPriceImg from "@/assets/blog/sui-chart-tvl-price.jpg";
import suiChartValuationImg from "@/assets/blog/sui-chart-valuation.jpg";
import suiChartArchitectureImg from "@/assets/blog/sui-chart-architecture.jpg";
import suiChartTokenomicsImg from "@/assets/blog/sui-chart-tokenomics.jpg";
import suiChartScenariosImg from "@/assets/blog/sui-chart-scenarios.jpg";

// Ecosystem Growth chart images
import ecosystemChartMarketGrowthImg from "@/assets/blog/ecosystem-chart-market-growth.jpg";
import ecosystemChartInstitutionalImg from "@/assets/blog/ecosystem-chart-institutional.jpg";
import ecosystemChartGtmStrategyImg from "@/assets/blog/ecosystem-chart-gtm-strategy.jpg";
import ecosystemChartL2AdoptionImg from "@/assets/blog/ecosystem-chart-l2-adoption.jpg";
import ecosystemChartRegulatoryImg from "@/assets/blog/ecosystem-chart-regulatory.jpg";

// Research posts data with comprehensive content
export const researchPosts = [
  {
    id: "9",
    slug: "sui-network-2026",
    title: "SUI NETWORK 2026: Asset Re-Rating Imminent (Structural Alpha)",
    image: suiNetwork2026Img,
    date: "Dec 24, 2025",
    readTime: "15 min read",
    category: "Market Research",
    author: "Ium Labs Research",
    authorRole: "Research Team",
    excerpt: "The market is currently pricing Sui ($SUI) as a distressed venture token. However, smart money is pricing it as the next global settlement layer. We are witnessing a historical divergence: Price is crashing, but Utility is vertical.",
    tags: ["SUI", "Layer 1", "Institutional", "ETF", "DeFi", "2026"],
    chartImages: {
      tvlPrice: suiChartTvlPriceImg,
      valuation: suiChartValuationImg,
      architecture: suiChartArchitectureImg,
      tokenomics: suiChartTokenomicsImg,
      scenarios: suiChartScenariosImg,
    },
    content: `
## THE 60-SECOND THESIS

The market is currently pricing Sui ($SUI) as a distressed venture token, fixating on its inflation schedule (-58% Price from ATH). However, smart money is pricing it as the next global settlement layer.

The December 19, 2025 Bitwise ETF Filing was the "gunshot" that signaled the start of the institutional race. While retail investors panic-sold the October unlocks, institutions have quietly built a $2.6 Billion TVL moat.

**We are witnessing a historical divergence: Price is crashing, but Utility is vertical.**

---

## PART I: MARKET STRUCTURE & VALUATION

### 1.1 THE THESIS: A STRUCTURAL DISLOCATION

The 2025 fiscal year has revealed a critical inefficiency in the pricing of the Sui Network ($SUI). The asset is currently suffering from "Innovation-Inflation Asymmetry." While the protocol has successfully achieved product-market fit—evidenced by a 160% expansion in Total Value Locked (TVL) and sub-second finality—the token's valuation remains suppressed by a predatory supply schedule and a persistent "reliability discount."

For the institutional allocator, this is not a signal to exit, but a signal of **Deep Value**. The market is currently pricing $SUI as a distressed venture asset, ignoring its transition into a high-velocity execution layer for Real World Assets (RWA). The divergence between the network's utility and the token's price has reached a historical extreme.

### 1.2 VISUALIZING THE ALPHA GAP

Throughout 2025, $SUI demonstrated a distinct decoupling. As macro headwinds intensified in Q3/Q4, price capitulated (-58% from ATH). Conversely, on-chain capital retention remained sticky, indicating users were effectively "shorting" the volatility of the token while "longing" the utility of the network.

![TVL vs Price X-Pattern](chart:tvlPrice)

> **ANALYST NOTE (THE "SO WHAT?"):**
>
> This "X-Pattern" is the classic signature of a maturing L1 ecosystem.
> - **The Gap**: The white space between the ascending TVL line and the depressed Price line represents the "Alpha Gap."
> - **The Signal**: Smart money (Institutions) is building the "Utility" line (via RWA/DeFi), while retail liquidity is exiting the "Price" line. This is an accumulation zone.

### 1.3 STRUCTURAL FRAGILITY: THE LIQUIDITY TRAP

The October 10 flash crash (-87% intraday) was not a failure of technology, but a failure of market structure. Our forensic analysis identifies two specific culprits:

**Derivative Saturation:** Prior to the crash, Open Interest (OI) on $SUI perpetuals exceeded **$450M**, with a significant portion of long positions levered >5x. This created a "glass cannon" effect where a moderate spot correction triggered cascading liquidations.

**The Unlock/Volume Ratio:** The monthly unlock of ~44M tokens systematically drains bid-side liquidity. When daily spot volume drops below 3.0x the unlock value (Absorption Ratio < 3.0), the market lacks the depth to support the price, forcing market makers to widen spreads or pull liquidity entirely.

### 1.4 COMPARATIVE VALUATION

Benchmarking Sui's "Cheapness" relative to key competitors based on the Market Cap to TVL Ratio (MC/TVL).

![MC/TVL Comparison](chart:valuation)

> **ANALYST NOTE (THE "SO WHAT?"):**
>
> The MC/TVL ratio acts as the P/E ratio for Layer 1 blockchains.
> - **Solana (~10.5x):** Priced for perfection; carries a high monetary premium.
> - **Sui (~2.1x):** Deep Value Territory. The market is currently valuing $1 of locked capital on Sui at only ~$2.10 of market cap.
> - **Implication:** For Sui to merely catch up to Aptos' valuation multiple, price would need to appreciate ~80% from current levels, assuming TVL remains constant.

---

## PART II: INFRASTRUCTURE ALPHA (THE TECHNOCRATIC EDGE)

### 2.1 THE THESIS: LATENCY IS THE NEW LIQUIDITY

In the 2021 cycle, the primary metric for L1s was "Theoretical Throughput" (TPS). In 2025, the metric has shifted to "Time-to-Finality" (TTF). For institutional finance, high throughput is meaningless if state convergence takes seconds.

Sui's deployment of Mysticeti represents a paradigm shift, reducing consensus latency to **~390ms**. This is not merely an engineering achievement; it is a financial product upgrade. It crosses the threshold required to emulate Central Limit Order Books (CLOBs) on-chain, rendering the "Sequencer Latency" of Ethereum L2s obsolete for High-Frequency Trading (HFT).

### 2.2 ARCHITECTURE: FROM GLOBAL LOCK TO PARALLEL FLOW

Legacy blockchains (EVM, early Solana) rely on sequential processing—a "Global Lock" where the network moves at the speed of the slowest transaction. Sui's object-centric model allows for Parallel Execution.

![Parallel Execution Architecture](chart:architecture)

> **ANALYST NOTE (THE "SO WHAT?"):**
>
> **Local Fee Markets:** A spike in gaming traffic (e.g., SuiPlay0x1) does not spike gas fees for a DeFi trader. This isolation of congestion is critical for maintaining Service Level Agreements (SLAs) for enterprise RWA applications.

---

## PART III: STRATEGY & OUTLOOK (2026)

### 3.1 THE TOKENOMIC ENGINE: SURVIVING THE FLOOD

The central bearish thesis is "infinite supply." However, the network possesses a unique deflationary counter-force: the **Storage Fund**. Unlike chains that burn storage fees, Sui locks them. As state size grows (RWAs, Gaming Assets), more $SUI is removed from circulation.

![Tokenomics Flow](chart:tokenomics)

> **ANALYST NOTE:**
>
> Currently, the "VC" arrow is stronger. The strategic bet for 2026 is that the "Storage Fund" arrow thickens via massive data ingestion, eventually neutralizing the sell pressure.

### 3.2 SCENARIO PROBABILITY MATRIX

![Scenario Matrix](chart:scenarios)

| Scenario | Probability | Price Target | Conditions & Catalysts |
|----------|-------------|--------------|------------------------|
| **Bear Case** | 25% | $0.80 - $1.20 | "The Ghost Chain": Unlocks outpace demand. RWA regulation (Ondo) stifles growth. Developers migrate back to Solana/EVM. |
| **Base Case** | 50% | $3.50 - $4.50 | "The Utility Layer": Steady growth in stablecoin MC. SuiPlay0x1 creates a sticky user base (100k+ DAU). Token absorbs inflation via staking demand. |
| **Bull Case** | 25% | $7.00+ | "The Breakout": A viral consumer app (10M+ users) triggers a "Gas Wars" scenario. Institutional ETF narrative begins. Solana Firedancer fails. |

### 3.3 STRATEGIC DIRECTIVES (ACTIONABLE INTELLIGENCE)

#### A. FOR ALLOCATORS (LPs / VCs)

**Structural Arbitrage:** Do not front-run the unlocks. Program entries for T+48 hours post-unlock (typically the 3rd of the month). This captures the asset after market makers have re-balanced.

**Yield Strategy:** Utilize native liquid staking (LSTs) while holding. The ~4-5% staking yield acts as a soft hedge against the annual inflation rate.

#### B. FOR PROTOCOLS (BUILDERS)

**Latency-Sensitive Sectors:** Build on-chain logic that requires <1s feedback loops (FPS, RTS games) or high-frequency oracle updates.

**Avoid:** Simple AMMs (saturated). Build CLOB-based interfaces.

#### C. INVALIDATION CRITERIA (RISK PARAMETERS)

**The Technical Hedge:** Monitor Solana's "Firedancer" upgrade (Q1 2026). If it launches successfully with 1M TPS and zero downtime, Sui's comparative tech moat narrows.

**The Regulatory Hedge:** If the SEC rejects the Bitwise ETF in Q2, expect a short-term volatility spike (-30%). Action: Retain 20% cash reserves for this scenario.

---

## PART IV: THE IUM LABS VERDICT

> "Sui has graduated from a 'Crypto Casino' to 'Institutional Rails'. The technology has won. The market structure is healing. In 2026, the price will catch up to the value."

---

*© 2025 Ium Labs. All Rights Reserved. This report is for informational purposes only and does not constitute financial advice. Past performance is not indicative of future results.*
    `,
  },
  {
    id: "1",
    slug: "ecosystem-growth-2025",
    title: "The State of Ecosystem Growth in 2025: Key Insights from the Ium Labs Research Report",
    image: ecosystemGrowthImg,
    date: "Dec 11, 2024",
    readTime: "18 min read",
    category: "Market Research",
    author: "James Lee",
    authorRole: "Co-Founder & Ex-Lead of Korea at KuCoin",
    excerpt: "A comprehensive analysis of the current state of Web3 ecosystem growth, focusing on Korean market dynamics, institutional trends, and actionable strategies for projects entering the Asian market.",
    tags: ["Ecosystem", "Growth", "Korea", "2025", "Institutional"],
    chartImages: {
      marketGrowth: ecosystemChartMarketGrowthImg,
      institutional: ecosystemChartInstitutionalImg,
      gtmStrategy: ecosystemChartGtmStrategyImg,
      l2Adoption: ecosystemChartL2AdoptionImg,
      regulatory: ecosystemChartRegulatoryImg,
    },
    content: `
## Executive Summary

The Web3 ecosystem in 2025 represents a pivotal transformation from previous cycles. With total crypto market capitalization exceeding $4 trillion and daily trading volumes in Korea alone surpassing $15 billion, the landscape has fundamentally shifted from speculative trading to infrastructure-driven growth.

This research report analyzes 127 projects across 8 sectors, incorporating data from on-chain analytics, exchange reports, and exclusive interviews with 34 institutional investors. Our findings reveal three mega-trends shaping ecosystem development: institutional infrastructure maturation, regulatory clarity acceleration, and the emergence of Korea as a critical growth market.

![Korean Market Growth](chart:marketGrowth)

## Methodology

Our research combines:
- **Quantitative Analysis**: On-chain data from 15 major blockchains
- **Qualitative Research**: Interviews with 34 VCs, 28 exchange executives, and 45 project founders
- **Market Data**: Trading volume analysis from Korean exchanges (Upbit, Bithumb, Coinone)
- **Regulatory Review**: Analysis of 23 jurisdictions' crypto frameworks

---

## Part 1: The Institutional Transformation

### 1.1 The New Institutional Landscape

The institutional landscape has undergone a seismic shift. What began as tentative exploration in 2021 has evolved into aggressive infrastructure building and product launches.

**Key Statistics:**
- 73% of hedge funds now have crypto exposure (up from 29% in 2022)
- $47 billion in new institutional custody solutions launched in 2024
- 156 crypto ETF products now available globally

![Institutional Adoption](chart:institutional)

> **ANALYST NOTE:**
>
> The institutional adoption curve has reached an inflection point. Banks and asset managers are no longer experimenting—they're building dedicated infrastructure. This shift from "pilot programs" to "strategic priority" represents a fundamental change in capital allocation.

### 1.2 Korean Institutional Development

Korea presents a unique case study in institutional adoption:

**Banking Sector Evolution**
- All top 5 banks (KB, Shinhan, Hana, Woori, NH) now offer crypto custody
- Combined custody assets exceed $28 billion
- 67% of these assets are held by corporate clients

**Asset Management Transformation**
The Korean asset management industry has pivoted dramatically:

| Year | Crypto AUM | Number of Products | Institutional Clients |
|------|-----------|-------------------|---------------------|
| 2022 | $1.2B | 12 | 45 |
| 2023 | $4.8B | 47 | 187 |
| 2024 | $18.7B | 156 | 892 |
| 2025 (Q1) | $31.2B | 203 | 1,456 |

### 1.3 Corporate Treasury Adoption

Fortune 500 companies with crypto treasury positions have grown from 23 in 2021 to 147 in 2025. In Korea, 34 KOSPI-listed companies now hold cryptocurrency on their balance sheets, with combined holdings exceeding $890 million.

---

## Part 2: Korean Market Deep Dive

### 2.1 Market Structure Analysis

The Korean cryptocurrency market operates with distinct characteristics that differentiate it from Western markets:

**The Kimchi Premium Phenomenon**
- Average premium in 2024: 2.8% (down from 8.3% in 2021)
- Premium volatility has decreased 67% due to improved arbitrage infrastructure
- Cross-border payment solutions have narrowed the gap significantly

**Exchange Dominance**
Upbit controls approximately 82% of Korean trading volume, creating unique market dynamics:
- Listing announcements can trigger 200-400% price increases
- Projects listed on Upbit see average 340% volume increase
- Secondary listing effect: Projects listed on Upbit subsequently see easier listings on other Korean exchanges

### 2.2 Regulatory Framework

Korea's regulatory environment has matured significantly:

![Regulatory Framework Timeline](chart:regulatory)

**Virtual Asset Service Provider (VASP) Framework**
- 35 licensed VASPs as of Q1 2025
- License requirements include:
  - Minimum capital: ₩3 billion ($2.3 million)
  - ISMS certification
  - Real-name verification systems
  - Travel Rule compliance

**Upcoming Regulations (2025-2026)**
1. Stablecoin framework (expected Q3 2025)
2. DeFi regulatory guidelines (expected Q4 2025)
3. NFT classification standards (expected Q2 2026)
4. Institutional custody requirements update

### 2.3 Consumer Behavior Patterns

Korean crypto users exhibit distinctive patterns:

**Demographics**
- 34% of adults aged 20-60 own cryptocurrency
- Average portfolio size: $12,400
- 78% trade at least monthly
- 23% participate in DeFi activities

**Platform Preferences**
- Mobile-first: 91% of trades executed on mobile
- App ratings significantly impact adoption (apps below 4.2 stars see 67% lower download rates)
- Korean language support is non-negotiable (projects without Korean materials see 89% lower engagement)

---

## Part 3: Technology Trends Reshaping the Ecosystem

### 3.1 Layer 2 Revolution

Layer 2 solutions have fundamentally changed blockchain economics:

**Adoption Metrics**
- Total Value Locked in L2s: $42.3 billion (up 340% YoY)
- Average transaction cost: $0.02 (down from $4.50 on L1)
- Daily active addresses on L2s: 4.2 million

![Layer 2 Adoption in Korea](chart:l2Adoption)

> **ANALYST NOTE:**
>
> Korean users show strong preferences for established L2s with proven track records. Arbitrum and Optimism dominate due to their ecosystem maturity and DeFi integrations. Base is rapidly growing due to Coinbase's trusted brand in Korea.

**Korean L2 Preferences**
Korean users show strong preferences for:
1. Arbitrum (37% market share)
2. Optimism (28%)
3. Base (18%)
4. zkSync Era (12%)
5. Others (5%)

### 3.2 Cross-Chain Infrastructure

Interoperability has emerged as a critical success factor:

**Bridge Volume Analysis**
- Monthly cross-chain volume: $18.7 billion
- Top corridors:
  - Ethereum ↔ Arbitrum: 34%
  - Ethereum ↔ Polygon: 21%
  - BSC ↔ Ethereum: 15%

**Security Improvements**
Bridge exploits have decreased 78% since 2022 due to:
- Multi-signature implementations
- Optimistic verification systems
- Insurance protocols
- Real-time monitoring tools

### 3.3 AI-Blockchain Convergence

The intersection of AI and blockchain represents the fastest-growing sector:

**Market Size Evolution**
| Segment | 2023 | 2024 | 2025 (Projected) |
|---------|------|------|-----------------|
| AI Agents | $120M | $890M | $4.2B |
| Compute Networks | $340M | $1.2B | $5.8B |
| Data Marketplaces | $89M | $456M | $2.1B |

---

## Part 4: Strategic Recommendations for Market Entry

### 4.1 For Projects Entering Korea

Based on our analysis of 47 successful Korea market entries, we've identified critical success factors:

![GTM Strategy Framework](chart:gtmStrategy)

**Phase 1: Foundation (Months 1-3)**

1. **Legal Structure Setup**
   - Establish Korean legal entity (or partnership with licensed VASP)
   - Budget: $50,000-$150,000
   - Timeline: 6-10 weeks

2. **Localization Excellence**
   - Full Korean translation (not machine-translated)
   - Korean community managers (minimum 2)
   - Local phone support
   - KakaoTalk channel establishment

3. **Community Seeding**
   - Target: 10,000 Discord/Telegram members
   - Strategy: Partner with existing Korean crypto communities
   - Budget allocation: 40% paid, 60% organic growth

**Phase 2: Momentum Building (Months 4-6)**

1. **KOL Engagement**
   - Identify 50-100 relevant Korean KOLs
   - Focus on quality over reach (engagement rate > 5%)
   - Budget: $100,000-$300,000 for initial campaign

2. **Exchange Preparation**
   - Begin discussions with Tier 2 exchanges (Coinone, Korbit)
   - Prepare listing documentation
   - Establish market making relationships

3. **Media & PR**
   - Secure coverage in Block Media, Tokenpost, Decenter
   - Host/sponsor at least 2 offline events
   - Executive interviews and thought leadership content

**Phase 3: Scale (Months 7-12)**

1. **Exchange Listings**
   - Target Bithumb first, then Upbit
   - Prepare for extensive due diligence process
   - Budget for listing fees: $500,000-$2,000,000

2. **Sustained Marketing**
   - Maintain community growth rate of 15%+ monthly
   - Regular AMA sessions (bi-weekly minimum)
   - Quarterly offline meetups

### 4.2 Common Failure Patterns

Our research identified why 67% of projects fail in Korea:

❌ **Underestimating Localization Requirements**
- Machine translations alienate users
- Lack of local support frustrates early adopters
- Cultural missteps damage brand perception

❌ **Insufficient Runway**
- Average time to Upbit listing: 14 months
- Required sustained investment often exceeds $2 million
- Many projects exhaust budgets before achieving critical mass

❌ **Regulatory Non-Compliance**
- Operating without proper licensing
- Ignoring Travel Rule requirements
- Inadequate KYC/AML procedures

---

## Part 5: Future Outlook

### 5.1 2025 Predictions

Based on our analysis, we project:

1. **Korean crypto trading volume to reach $25 billion daily** (67% increase from current)
2. **Three additional KOSPI companies to add Bitcoin to treasury**
3. **At least two Korean banks to launch their own stablecoins**
4. **Regulatory clarity for DeFi by Q4 2025**

### 5.2 Emerging Opportunities

**High-Growth Sectors for Korea:**
1. Real-World Asset (RWA) tokenization
2. Gaming/Entertainment NFTs
3. AI-powered DeFi protocols
4. Cross-border payment solutions

---

## Conclusion

The ecosystem growth trajectory in 2025 points toward continued maturation and mainstream integration. Korea stands at the center of this transformation, offering unparalleled opportunities for projects that understand local dynamics and commit to long-term market development.

Success in Korea requires:
- Deep localization commitment
- Regulatory compliance from day one
- Patient, sustained community building
- Strategic exchange relationships

Projects that invest properly in these foundations see significantly better outcomes, with our research showing 4.7x higher success rates compared to those taking shortcuts.

---

*This research was conducted by the Ium Labs research team. For detailed market analysis, strategic consulting, and market entry support, contact us at info@iumlabs.com.*

*Next Report: "Q2 2025 Korea Crypto Market Quarterly Review" - Coming March 2025*
    `,
  },
];

const floatingTags = [
  { label: "Insights", top: "18%", left: "5%" },
  { label: "Reports", top: "30%", left: "18%" },
  { label: "Strategy", top: "48%", left: "4%" },
  { label: "Analysis", top: "58%", left: "14%" },
];

const researchCategories = [
  { icon: TrendingUp, label: "Market Research", count: 2 },
];

const categories = ["All", "Market Research"];

const Research = () => {
  usePageTitle("Research");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [scrollY, setScrollY] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const postsPerPage = 8;

  // Fetch from DB, fallback to hardcoded data
  const { data: dbPosts } = useQuery({
    queryKey: ['research-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('research_posts')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  // Use DB data if available, otherwise fallback to hardcoded
  const posts = dbPosts && dbPosts.length > 0 ? dbPosts.map(post => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    image: post.image || '',
    date: post.date || '',
    readTime: post.read_time || '',
    category: post.category || '',
    author: post.author || '',
    authorRole: post.author_role || '',
    excerpt: post.excerpt || '',
    tags: post.tags || [],
    content: post.content || '',
  })) : researchPosts;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubscribing(true);
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email: newsletterEmail });

      if (error) {
        if (error.code === "23505") {
          toast.error("This email is already subscribed!");
        } else {
          throw error;
        }
      } else {
        toast.success("Successfully subscribed to research updates!");
        setNewsletterEmail("");
      }
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      {/* Hero Section - Homepage Style */}
      <main className="p-0.5 sm:p-1 md:p-2 bg-[#0A0A0A]">
        <ResearchHeroSection />
      </main>

      {/* Filter Section */}
      <section className="bg-[#0F0F0F] border-t border-white/10" id="filters">
        {/* Filter Content */}
        <div className="container mx-auto max-w-7xl px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => { setSelectedCategory(category); setCurrentPage(1); }}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all hover:scale-[1.05] active:scale-[0.95] ${
                    selectedCategory === category 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10 hover:border-primary/30"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="bg-white/5 border-white/10 rounded-full pl-10 pr-4 h-10 text-white placeholder:text-white/40 focus:border-primary/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 02 - Featured Article Section */}
      {currentPage === 1 && selectedCategory === "All" && !searchQuery && (
        <section className="bg-[#121212] border-t border-white/10" id="featured">
          {/* Section Header */}
          <div className="flex items-baseline justify-between p-4 md:px-8 md:py-5 border-b border-white/5">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">02</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Featured</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">
              Latest Research
            </span>
          </div>
          
          {/* Featured Content */}
          <div className="container mx-auto max-w-7xl px-4 md:px-8 py-16">
            <Link to={`/research/${researchPosts[0].slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 group-hover:border-primary/30 transition-all duration-500 relative hover:scale-[1.02]">
                  <img 
                    src={researchPosts[0].image} 
                    alt={researchPosts[0].title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                      Read Article
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm border border-primary/20">
                      {researchPosts[0].category}
                    </span>
                    <span className="text-white/40 text-sm flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {researchPosts[0].readTime}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-medium text-white leading-tight mb-4 group-hover:text-primary/90 transition-colors duration-300">
                    {researchPosts[0].title}
                  </h2>
                  <p className="text-white/60 text-lg mb-6 line-clamp-3">
                    {researchPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary">
                        {researchPosts[0].author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{researchPosts[0].author}</p>
                        <p className="text-white/40 text-xs">{researchPosts[0].date}</p>
                      </div>
                    </div>
                    <span className="text-primary flex items-center gap-2 group-hover:gap-3 transition-all font-medium">
                      Read More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* 03 - Article Grid Section */}
      <section className="bg-[#0F0F0F] border-t border-white/10" id="articles">
        {/* Section Header */}
        <div className="flex items-baseline justify-between p-4 md:px-8 md:py-5 border-b border-white/5">
          <div className="flex items-baseline gap-6 md:gap-10">
            <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">
              {currentPage === 1 && selectedCategory === "All" && !searchQuery ? "03" : "02"}
            </span>
            <h2 className="text-lg md:text-xl font-medium text-white">All Articles</h2>
          </div>
          <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">
            {filteredPosts.length} Results
          </span>
        </div>
        
        {/* Article Grid Content */}
        <div className="container mx-auto max-w-7xl px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post) => (
              <div key={post.id}>
                <Link 
                  to={`/research/${post.slug}`}
                  className="group block"
                >
                  <div className="relative hover:-translate-y-2 transition-transform duration-300">
                    {/* Image */}
                    <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4 border border-white/10 group-hover:border-primary/30 transition-all duration-500 relative">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-400"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <span className="text-white text-sm font-medium">Read Article</span>
                        <ArrowRight className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                    
                    {/* Meta */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs border border-primary/20">
                        {post.category}
                      </span>
                      <span className="text-white/40 text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg font-medium text-white leading-snug group-hover:text-primary transition-colors duration-300 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    {/* Author & Date */}
                    <div className="flex items-center gap-2 text-white/40 text-sm">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-16">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-white/5 text-white/60 hover:bg-primary/10 hover:text-primary disabled:opacity-30 transition-all border border-white/10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-lg text-sm transition-all ${
                    currentPage === i + 1 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-white/5 text-white/60 hover:bg-primary/10 hover:text-primary border border-white/10"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-white/5 text-white/60 hover:bg-primary/10 hover:text-primary disabled:opacity-30 transition-all border border-white/10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 04 - Newsletter Section */}
      <section className="bg-[#121212] border-t border-white/10" id="newsletter">
        {/* Section Header */}
        <div className="flex items-baseline justify-between p-4 md:px-8 md:py-5 border-b border-white/5">
          <div className="flex items-baseline gap-6 md:gap-10">
            <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">
              {currentPage === 1 && selectedCategory === "All" && !searchQuery ? "04" : "03"}
            </span>
            <h2 className="text-lg md:text-xl font-medium text-white">Newsletter</h2>
          </div>
          <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">
            Stay Updated
          </span>
        </div>
        
        {/* Newsletter Content */}
        <div className="container mx-auto max-w-3xl px-4 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
            Stay <span className="text-primary">Updated</span>
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Subscribe to receive the latest research and insights directly in your inbox.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 bg-white/5 border-white/10 rounded-xl h-12 px-4 text-white placeholder:text-white/40 focus:border-primary/50 transition-colors"
            />
            <button
              type="submit"
              disabled={isSubscribing}
              className="px-8 h-12 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSubscribing ? "..." : "Subscribe"}
            </button>
          </form>
        </div>
      </section>

      {/* 05 - Contact Section */}
      <section className="bg-[#0F0F0F] border-t border-white/10">
        <ContactFormSection sectionNumber="05" />
      </section>
      
      {/* CTA Banner Section */}
      <CTABannerSection />
      
      {/* Footer Links Section */}
      <FooterLinksSection />
      
      <Footer />
      
      {/* Floating Contact Button */}
      <FloatingContactButton />
    </div>
  );
};

export default Research;
