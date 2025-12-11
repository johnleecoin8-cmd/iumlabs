import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search, Calendar, Clock, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import CalendlyButton from "@/components/CalendlyButton";
import Planet3D from "@/components/Planet3D";
import cosmicNebula from "@/assets/backgrounds/cosmic-nebula.jpg";

// Research thumbnail images
import ecosystemGrowthImg from "@/assets/blog/ecosystem-growth-2025.jpg";
import aiAgentsDefiImg from "@/assets/blog/ai-agents-defi.jpg";
import avoidFloppedTgeImg from "@/assets/blog/avoid-flopped-tge.jpg";
import communityGrowthAiImg from "@/assets/blog/community-growth-ai.jpg";
import nftEvolutionImg from "@/assets/blog/nft-evolution.jpg";
import cryptoMarketingBearImg from "@/assets/blog/crypto-marketing-bear.jpg";
import kolMarketingImg from "@/assets/blog/kol-marketing.jpg";
import kaitoMindshareImg from "@/assets/blog/kaito-mindshare.jpg";

// Research posts data with full content
export const researchPosts = [
  {
    id: "1",
    slug: "ecosystem-growth-2025",
    title: "The State of Ecosystem Growth in 2025: Key Insights from the CryptoBridge Research Report",
    image: ecosystemGrowthImg,
    date: "Dec 11, 2024",
    readTime: "12 min read",
    category: "Market Research",
    author: "James Lee",
    authorRole: "Co-Founder",
    excerpt: "A comprehensive analysis of the current state of Web3 ecosystem growth, focusing on Korean market dynamics and global trends.",
    tags: ["Ecosystem", "Growth", "Korea", "2025"],
    content: `
## Executive Summary

The Web3 ecosystem in 2025 represents a significant evolution from previous years, with increased institutional adoption and more sophisticated market dynamics. This research report analyzes the key trends shaping ecosystem growth, with a particular focus on the Korean market.

## Key Findings

### 1. Institutional Adoption Acceleration

The institutional landscape has transformed dramatically. Major financial institutions are no longer just exploring cryptocurrency – they're actively building infrastructure and launching products.

- **Banking Integration**: Traditional banks in Korea have launched cryptocurrency custody services
- **Asset Management**: Multiple ETF products now available for retail investors
- **Corporate Treasury**: Companies adding Bitcoin to balance sheets

### 2. Korean Market Dynamics

Korea continues to be a unique market with distinct characteristics:

**Regulatory Environment**
- Travel Rule implementation has matured
- VASP licensing framework established
- Clear guidelines for institutional participation

**Retail Engagement**
- High trading volumes relative to market size
- Strong community-driven project support
- Growing interest in DeFi protocols

### 3. Technology Trends

The technology landscape shows several key developments:

- **Layer 2 Solutions**: Increased adoption of scaling solutions
- **Cross-chain Infrastructure**: Better interoperability between networks
- **AI Integration**: Growing intersection of AI and blockchain

## Market Opportunities

### For Projects Entering Korea

1. **Community Building First**: Korean users value strong communities
2. **Local Partnerships**: Essential for market credibility
3. **Compliance Focus**: Regulatory compliance is non-negotiable

### For Existing Projects

1. **Expansion Strategies**: Leverage established presence
2. **User Retention**: Focus on engagement and utility
3. **Innovation**: Continue product development

## Conclusion

The ecosystem growth trajectory in 2025 points toward continued maturation and mainstream integration. Projects that understand local market dynamics and maintain strong compliance practices will be best positioned for success.

---

*This research was conducted by the CryptoBridge Korea research team. For detailed market analysis and strategic consulting, contact us.*
    `,
  },
  {
    id: "2",
    slug: "ai-agents-defi",
    title: "AI Agents & DeFi: The DeFAI Future Powering Finance in 2025 & Beyond!",
    image: aiAgentsDefiImg,
    date: "Dec 10, 2024",
    readTime: "15 min read",
    category: "DeFi",
    author: "David Kim",
    authorRole: "Co-Founder",
    excerpt: "Exploring the revolutionary intersection of artificial intelligence and decentralized finance.",
    tags: ["AI", "DeFi", "Agents", "Automation"],
    content: `
## The Rise of DeFAI

The convergence of artificial intelligence and decentralized finance is creating a new paradigm we call "DeFAI" – the fusion of AI agents with DeFi protocols.

## What Are AI Agents in DeFi?

AI agents are autonomous software programs that can:

- **Execute Trades**: Make trading decisions based on market analysis
- **Manage Portfolios**: Automatically rebalance and optimize positions
- **Interact with Protocols**: Navigate complex DeFi ecosystems

## Key Use Cases

### 1. Automated Yield Optimization

AI agents continuously scan the DeFi landscape for the best yield opportunities:

- Cross-protocol yield comparison
- Risk-adjusted return calculations
- Automatic position management

### 2. MEV Protection

Protecting users from Maximum Extractable Value attacks:

- Transaction timing optimization
- Route optimization for swaps
- Front-running prevention

### 3. Governance Participation

Automating governance activities:

- Proposal analysis and voting
- Delegation optimization
- Impact assessment

## The Technical Architecture

### Agent Components

1. **Data Layer**: Real-time blockchain data ingestion
2. **Analysis Layer**: ML models for decision making
3. **Execution Layer**: Smart contract interaction

### Security Considerations

- Multi-signature controls
- Rate limiting
- Circuit breakers

## Market Impact

The DeFAI space is expected to:

- Increase DeFi accessibility for retail users
- Improve capital efficiency across protocols
- Create new financial products and services

## Looking Ahead

As AI technology advances and DeFi matures, we expect:

- More sophisticated agent capabilities
- Better integration with traditional finance
- Regulatory frameworks for AI-driven trading

---

*Stay updated on AI and DeFi developments by subscribing to our research newsletter.*
    `,
  },
  {
    id: "3",
    slug: "avoid-flopped-tge",
    title: "How to Avoid a Flopped TGE: Building a Solid Foundation for Success",
    image: avoidFloppedTgeImg,
    date: "Dec 8, 2024",
    readTime: "10 min read",
    category: "Strategy",
    author: "James Lee",
    authorRole: "Co-Founder",
    excerpt: "Essential strategies for ensuring your Token Generation Event succeeds in today's competitive market.",
    tags: ["TGE", "Token Launch", "Strategy", "Marketing"],
    content: `
## The TGE Challenge

Token Generation Events (TGEs) have become increasingly complex. With more projects launching and investor sophistication rising, the margin for error has shrunk dramatically.

## Common TGE Failures

### 1. Poor Timing

- Launching during market downturns
- Competing with major industry events
- Insufficient lead time for community building

### 2. Inadequate Community

- Low social media engagement
- Weak ambassador programs
- No organic community growth

### 3. Technical Issues

- Smart contract vulnerabilities
- Exchange listing problems
- Liquidity mismanagement

## The Success Framework

### Phase 1: Foundation (6-12 months before TGE)

**Community Building**
- Establish Discord and Telegram presence
- Create educational content
- Build ambassador network

**Technical Preparation**
- Complete security audits
- Test token contracts
- Prepare exchange integrations

### Phase 2: Momentum (3-6 months before TGE)

**Marketing Escalation**
- KOL partnerships
- PR campaigns
- Community events

**Partnership Development**
- Strategic investor outreach
- Exchange negotiations
- Integration partners

### Phase 3: Launch (0-3 months)

**Execution**
- Final community preparation
- Exchange listings
- Liquidity provision

## Key Success Metrics

Track these metrics leading up to TGE:

| Metric | Target Range |
|--------|-------------|
| Discord Members | 50,000+ |
| Twitter Followers | 100,000+ |
| Waitlist Signups | 25,000+ |
| Strategic Investors | 10+ |

## Post-TGE Strategies

The work doesn't stop at launch:

1. **Price Stability**: Implement proper market making
2. **Continued Engagement**: Keep community active
3. **Development Updates**: Show continued progress

## Conclusion

A successful TGE requires careful planning, strong execution, and continued commitment post-launch. Projects that invest in solid foundations see significantly better outcomes.

---

*Need help planning your TGE? Contact CryptoBridge Korea for comprehensive launch support.*
    `,
  },
  {
    id: "4",
    slug: "community-growth-ai",
    title: "How to Grow Your Community in the Age of AI in 2025",
    image: communityGrowthAiImg,
    date: "Dec 5, 2024",
    readTime: "8 min read",
    category: "Community",
    author: "David Kim",
    authorRole: "Co-Founder",
    excerpt: "Leveraging AI tools and strategies to build and engage Web3 communities effectively.",
    tags: ["Community", "AI", "Growth", "Engagement"],
    content: `
## The AI-Powered Community Revolution

Community management in Web3 has been transformed by AI. Projects that leverage these tools effectively are seeing unprecedented growth and engagement.

## AI Tools for Community Growth

### 1. Content Generation

AI can help create:
- Social media posts
- Educational materials
- Community updates
- Translated content

### 2. Community Moderation

Automated systems for:
- Spam filtering
- FAQ responses
- Member onboarding
- Sentiment analysis

### 3. Engagement Analytics

Track and optimize:
- Member activity patterns
- Content performance
- Community health metrics

## Implementation Strategy

### Step 1: Assessment

Evaluate your current community:
- Size and growth rate
- Engagement levels
- Content performance

### Step 2: Tool Selection

Choose appropriate AI tools:
- Chat moderation bots
- Content creation platforms
- Analytics dashboards

### Step 3: Integration

Seamlessly incorporate AI:
- Train on your brand voice
- Set appropriate guardrails
- Monitor and adjust

## Best Practices

### Do's

✅ Use AI to augment human efforts
✅ Maintain authentic community voice
✅ Continuously train and improve models
✅ Monitor for issues and edge cases

### Don'ts

❌ Replace all human interaction with AI
❌ Use AI for sensitive communications
❌ Ignore community feedback about AI
❌ Deploy without proper testing

## Measuring Success

Key metrics to track:

- Member retention rate
- Message response time
- Engagement per post
- Community sentiment score

## Conclusion

AI is a powerful tool for community growth when used thoughtfully. The key is finding the right balance between automation and authentic human connection.
    `,
  },
  {
    id: "5",
    slug: "nft-evolution",
    title: "The Evolution of NFTs: From PFPs in 2021 to Nodes and Memberships in 2025",
    image: nftEvolutionImg,
    date: "Nov 28, 2024",
    readTime: "14 min read",
    category: "NFT",
    author: "James Lee",
    authorRole: "Co-Founder",
    excerpt: "Tracing the transformation of NFTs from profile pictures to utility-driven assets.",
    tags: ["NFT", "Evolution", "Utility", "Membership"],
    content: `
## The NFT Journey

From the PFP craze of 2021 to today's utility-focused landscape, NFTs have undergone a remarkable transformation.

## Era 1: The PFP Boom (2021-2022)

### Characteristics
- Profile picture collections
- Community-driven value
- Speculation-focused

### Notable Examples
- Bored Ape Yacht Club
- CryptoPunks
- Azuki

## Era 2: The Utility Pivot (2023-2024)

### New Use Cases
- Gaming assets
- Membership tokens
- Revenue sharing

### Key Innovations
- Dynamic NFTs
- Soulbound tokens
- Cross-chain NFTs

## Era 3: Infrastructure NFTs (2025)

### Current Landscape

**Node NFTs**
Projects now use NFTs to represent:
- Network validators
- Infrastructure operators
- Revenue-generating nodes

**Membership NFTs**
Beyond simple access:
- Tiered benefits
- Governance rights
- Revenue sharing

## Market Analysis

### Growth Metrics

| Category | 2023 | 2024 | 2025 (Est) |
|----------|------|------|------------|
| PFP Volume | $8B | $3B | $1B |
| Utility NFTs | $2B | $5B | $12B |
| Node NFTs | $500M | $2B | $8B |

### Investment Trends

Investors now prioritize:
1. Sustainable revenue models
2. Clear utility propositions
3. Strong team track records

## The Korean NFT Market

### Unique Characteristics
- Strong gaming culture influence
- High mobile engagement
- Preference for utility

### Opportunities
- K-content integration
- Gaming partnerships
- Fan engagement platforms

## Future Outlook

The next wave of NFT innovation will focus on:
- Real-world asset tokenization
- Identity and credentials
- Cross-platform utility

## Conclusion

NFTs have matured from speculative assets to functional infrastructure. Projects that understand this evolution will be best positioned for success.
    `,
  },
  {
    id: "6",
    slug: "crypto-marketing-bear-market",
    title: "Top 5 Steps To Rejuvenate Your Crypto Marketing In Bear Market in 2025",
    image: cryptoMarketingBearImg,
    date: "Nov 25, 2024",
    readTime: "9 min read",
    category: "Marketing",
    author: "David Kim",
    authorRole: "Co-Founder",
    excerpt: "Strategic approaches to maintain momentum and prepare for the next bull cycle.",
    tags: ["Marketing", "Bear Market", "Strategy", "Growth"],
    content: `
## Thriving in the Bear Market

Bear markets separate the serious projects from the speculators. Here's how to use this time strategically.

## Step 1: Reassess Your Value Proposition

### Questions to Ask
- What problem are we truly solving?
- Who is our core user base?
- What makes us different?

### Actions to Take
- Conduct user research
- Refine messaging
- Update positioning

## Step 2: Focus on Product Development

Bear markets are building seasons:

- Ship delayed features
- Improve user experience
- Address technical debt
- Plan next major release

## Step 3: Strengthen Community Bonds

### Community Strategies
- Increase direct engagement
- Host educational events
- Recognize loyal members
- Create exclusive content

### Engagement Ideas
- AMAs with team members
- Community calls
- Builder workshops
- Governance discussions

## Step 4: Strategic Content Marketing

### Content Pillars
1. **Educational**: Teach your technology
2. **Thought Leadership**: Share industry insights
3. **Product Updates**: Show continuous progress
4. **Community Highlights**: Celebrate members

### Distribution Strategy
- Consistent publishing schedule
- Multi-channel approach
- SEO optimization
- Email newsletters

## Step 5: Prepare for the Bull Run

### Readiness Checklist
- [ ] Marketing materials updated
- [ ] KOL relationships maintained
- [ ] Exchange partnerships ready
- [ ] Community primed for growth

### Budget Allocation
Reserve funds for:
- Bull market marketing blitz
- Partnership opportunities
- Event sponsorships
- Influencer campaigns

## Measuring Bear Market Success

Key metrics during downturns:

| Metric | Target |
|--------|--------|
| Community Retention | >80% |
| Content Engagement | Growing |
| Product Usage | Stable |
| Partnership Pipeline | Building |

## Conclusion

Bear markets are opportunities in disguise. Projects that build during these periods emerge stronger when conditions improve.
    `,
  },
  {
    id: "7",
    slug: "kol-marketing-strategy",
    title: "The Strategic Role of KOLs in Crypto Marketing: How Top Agencies Drive Success",
    image: kolMarketingImg,
    date: "Nov 20, 2024",
    readTime: "11 min read",
    category: "Marketing",
    author: "James Lee",
    authorRole: "Co-Founder",
    excerpt: "Understanding how to leverage Key Opinion Leaders effectively in your Web3 marketing strategy.",
    tags: ["KOL", "Marketing", "Influencer", "Strategy"],
    content: `
## The KOL Landscape in 2025

Key Opinion Leaders remain crucial to crypto marketing success, but the landscape has evolved significantly.

## Types of Crypto KOLs

### 1. Technical Analysts
- Chart analysis
- Trading signals
- Market commentary

### 2. Project Reviewers
- Deep dives
- Tokenomics analysis
- Team assessments

### 3. Community Builders
- Engagement focus
- Educational content
- Long-term advocacy

### 4. Industry Thought Leaders
- Macro perspectives
- Trend analysis
- Cross-chain insights

## KOL Selection Framework

### Criteria to Evaluate

**Reach Metrics**
- Follower count
- Engagement rate
- Audience growth

**Quality Indicators**
- Content authenticity
- Past performance
- Audience alignment

**Risk Factors**
- Past controversies
- Promotion frequency
- Audience trust level

## Campaign Structures

### One-Time Promotions
- Quick awareness boost
- Event announcements
- Launch support

### Ongoing Partnerships
- Brand ambassadors
- Content series
- Community involvement

### Performance-Based
- Referral programs
- Engagement bonuses
- Conversion tracking

## Budget Allocation

### Typical Distribution

| KOL Tier | % of Budget | Typical ROI |
|----------|-------------|-------------|
| Mega (1M+) | 30% | 2-3x |
| Macro (100K-1M) | 40% | 3-5x |
| Micro (10K-100K) | 30% | 5-10x |

## Best Practices

### Do's
✅ Verify audience authenticity
✅ Set clear campaign goals
✅ Provide comprehensive briefs
✅ Track performance metrics

### Don'ts
❌ Focus solely on follower count
❌ Use misleading messaging
❌ Ignore regional differences
❌ Skip contracts and agreements

## Measuring Success

Key performance indicators:

1. **Awareness**: Impressions, reach
2. **Engagement**: Likes, comments, shares
3. **Action**: Clicks, sign-ups, purchases
4. **Retention**: Long-term community growth

## Conclusion

Effective KOL marketing requires careful selection, clear strategy, and consistent measurement. When done right, it remains one of the most powerful tools in crypto marketing.
    `,
  },
  {
    id: "8",
    slug: "kaito-mindshare",
    title: "Top 5 Strategies to Dominate Kaito Mindshare Before TGE",
    image: kaitoMindshareImg,
    date: "Nov 15, 2024",
    readTime: "7 min read",
    category: "Strategy",
    author: "David Kim",
    authorRole: "Co-Founder",
    excerpt: "Tactical approaches to maximize your project's visibility on the Kaito platform.",
    tags: ["Kaito", "Mindshare", "TGE", "Visibility"],
    content: `
## Understanding Kaito Mindshare

Kaito has become an essential metric for Web3 project visibility. Here's how to optimize your presence.

## What is Kaito Mindshare?

Kaito measures the share of conversation around crypto topics across:
- Twitter/X
- Discord
- Telegram
- Other platforms

## Strategy 1: Content Velocity

### Approach
Maintain consistent high-quality content output.

### Implementation
- Daily social posts
- Weekly threads
- Monthly reports
- Regular community updates

## Strategy 2: Engagement Amplification

### Tactics
- Respond to all mentions
- Engage with related projects
- Participate in trending discussions
- Create shareable content

### Tools
- Social listening platforms
- Engagement tracking
- Automated alerts

## Strategy 3: KOL Network Activation

### Building Relationships
- Identify aligned KOLs
- Provide exclusive content
- Create mutual value

### Coordination
- Synchronized posting
- Cross-promotion
- Event collaboration

## Strategy 4: Community Mobilization

### Empowering Members
- Content creation contests
- Engagement incentives
- Ambassador programs

### Organic Growth
- Word of mouth
- Referral programs
- Community challenges

## Strategy 5: Strategic Timing

### Key Moments
- Industry events
- Market movements
- Competitor news
- Project milestones

### Planning
- Content calendar
- Rapid response protocols
- Trend monitoring

## Measuring Kaito Performance

### Key Metrics
| Metric | Target |
|--------|--------|
| Daily Mentions | 500+ |
| Engagement Rate | >5% |
| Sentiment Score | >70% positive |
| Mindshare Rank | Top 50 |

## Common Mistakes

❌ Buying fake engagement
❌ Spamming mentions
❌ Ignoring negative sentiment
❌ Inconsistent activity

## Conclusion

Kaito mindshare is earned through consistent, authentic engagement. Focus on quality over quantity and build genuine community connections.
    `,
  },
];

const floatingTags = [
  { label: "Insights", top: "20%", left: "5%", mobileTop: "12%", mobileLeft: "3%", color: "bg-pink-400 text-white" },
  { label: "Reports", top: "32%", left: "20%", mobileTop: "15%", mobileRight: "3%", color: "bg-cyan-400 text-black" },
  { label: "Strategy", top: "50%", left: "4%", mobileTop: "75%", mobileLeft: "3%", color: "bg-purple-400 text-white" },
  { label: "Research", top: "52%", left: "24%", color: "bg-fuchsia-400 text-white" },
  { label: "Analysis", top: "18%", right: "12%", color: "bg-cyan-300 text-black" },
  { label: "Market", top: "32%", right: "5%", color: "bg-pink-300 text-black" },
  { label: "DeFi", top: "50%", right: "10%", color: "bg-purple-300 text-black" },
  { label: "Trends", bottom: "28%", right: "16%", color: "bg-fuchsia-500 text-white" },
];

const categories = ["All", "Market Research", "DeFi", "Strategy", "Community", "NFT", "Marketing"];

const Research = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [scrollY, setScrollY] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const postsPerPage = 8;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredPosts = researchPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section - Planetary Style */}
      <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat animate-kenburns"
            style={{ 
              backgroundImage: `url(${cosmicNebula})`,
              filter: "brightness(0.5) saturate(1.2)",
            }}
          />
          <div className="absolute inset-0 animate-aurora">
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-600/20 via-transparent to-cyan-500/15" />
            <div className="absolute inset-0 bg-gradient-to-bl from-purple-600/15 via-transparent to-fuchsia-500/10" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
          <Planet3D type="nebula" className="opacity-40" />
        </div>
        
        {/* Floating Tags */}
        <div>
          {floatingTags.map((tag, index) => (
            <span
              key={`${tag.label}-${index}`}
              className={`absolute animate-float hidden sm:block px-4 py-2 rounded-md text-sm font-medium shadow-lg ${tag.color}`}
              style={{
                top: tag.top,
                left: tag.left,
                right: tag.right,
                bottom: tag.bottom,
                animationDelay: `${index * 0.3}s`,
                transform: `translateY(${scrollY * 0.05}px)`,
              }}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-7xl px-4 relative z-10 pt-32 pb-16">
          <div className="mb-12">
            <span className="text-sm text-white/50 mb-4 block opacity-0 animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>[ Research ]</span>
            <h1 className="text-[10vw] md:text-[120px] lg:text-[150px] font-light text-white leading-[0.85] tracking-tight opacity-0 animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              Rese<span className="serif-italic text-primary">a</span>rch
            </h1>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 border-t border-white/10 opacity-0 animate-fade-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <p className="text-lg text-white/60 max-w-xl">
              In-depth analysis and insights on Web3 marketing, Korean market dynamics, and emerging trends.
            </p>
            <div className="flex items-center gap-4 text-white/40 text-sm">
              <span>{researchPosts.length} Articles</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="bg-background border-b border-white/10 sticky top-16 z-40">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => { setSelectedCategory(category); setCurrentPage(1); }}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                    selectedCategory === category 
                      ? "bg-primary text-white" 
                      : "bg-white/5 text-white/60 hover:bg-white/10"
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
                className="bg-white/5 border-white/10 rounded-full pl-10 pr-4 h-10 text-white placeholder:text-white/40"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {currentPage === 1 && selectedCategory === "All" && !searchQuery && (
        <section className="bg-background py-16">
          <div className="container mx-auto max-w-7xl px-4">
            <Link to={`/research/${researchPosts[0].slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="aspect-[16/10] rounded-2xl overflow-hidden">
                  <img 
                    src={researchPosts[0].image} 
                    alt={researchPosts[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                      {researchPosts[0].category}
                    </span>
                    <span className="text-white/40 text-sm flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {researchPosts[0].readTime}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-medium text-white leading-tight mb-4 group-hover:text-primary transition-colors">
                    {researchPosts[0].title}
                  </h2>
                  <p className="text-white/60 text-lg mb-6">
                    {researchPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium text-white">
                        {researchPosts[0].author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{researchPosts[0].author}</p>
                        <p className="text-white/40 text-xs">{researchPosts[0].date}</p>
                      </div>
                    </div>
                    <span className="text-primary flex items-center gap-2 group-hover:gap-3 transition-all">
                      Read Article <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Article Grid */}
      <section className="bg-[hsl(0,0%,6%)] py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post, index) => (
              <Link 
                key={post.id}
                to={`/research/${post.slug}`}
                className="group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Meta */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 bg-white/5 text-white/60 rounded text-xs">
                    {post.category}
                  </span>
                  <span className="text-white/40 text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-medium text-white leading-snug group-hover:text-primary transition-colors mb-3">
                  {post.title}
                </h3>
                
                {/* Author & Date */}
                <div className="flex items-center gap-2 text-white/40 text-sm">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-16">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 disabled:opacity-30 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-lg text-sm transition-all ${
                    currentPage === i + 1 
                      ? "bg-primary text-white" 
                      : "bg-white/5 text-white/60 hover:bg-white/10"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 disabled:opacity-30 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-background py-20">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-white/60 mb-8">
            Subscribe to receive the latest research and insights directly in your inbox.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 bg-white/5 border-white/10 rounded-xl h-12 px-4 text-white placeholder:text-white/40"
            />
            <button
              type="submit"
              disabled={isSubscribing}
              className="px-8 h-12 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isSubscribing ? "..." : "Subscribe"}
            </button>
          </form>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Research;
