import { Link } from "react-router-dom";
import { useMemo } from "react";
import { ArrowLeft, Clock, Calendar, Twitter, Linkedin, Copy, ChevronRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterLinksSection from "@/components/FooterLinksSection";
import SEOHead from "@/components/SEOHead";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ArticleSchema from "@/components/ArticleSchema";
import { toast } from "sonner";
import heroImg from "@/assets/blog/ecosystem-chart-market-growth.jpg";

const slug = "upbit-dominance-how-78-percent-market-share-reshapes-token-economics";
const title = "The CEX Power Map: How Upbit's 78% Dominance Reshapes Token Economics";
const category = "Exchange, Korea, Token Economics";
const date = "May 11, 2026";
const author = "James";
const authorRole = "Co-founder";
const readTime = "19 min read";
const tags = ["Upbit", "Bithumb", "Korea", "exchange", "token economics", "listing"];

const content = `South Korea operates the most concentrated exchange market in any major crypto economy. Upbit commands 78% of domestic trading volume. This is not a market share figure that emerged gradually over a decade of competition. It is the product of structural regulatory design, banking access monopolization, and a retail user base that exhibits extreme platform loyalty. The consequences for token economics are measurable, predictable, and largely misunderstood by projects entering the Korean market.

​

## 1. The Monopoly Metrics

Upbit's 78% market share represents a level of exchange concentration that has no parallel in any other major jurisdiction. Bithumb holds approximately 15%, leaving the remaining 7% fragmented across Coinone, Korbit, and GOPAX. To contextualize this concentration: in the United States, Coinbase commands roughly 35% of domestic volume, with Kraken at 12% and a long tail of competitors. Japan's bitFlyer holds approximately 40%, with Coincheck at 25%. Even China's pre-ban exchange landscape, often cited as concentrated, never saw a single exchange exceed 45% domestic share.

### Structural Factors Behind Concentration

Three mechanisms created and sustain Upbit's dominance. First, the real-name banking account system introduced under Korea's Specific Financial Information Act requires each exchange to partner with a commercial bank for won deposits and withdrawals. Upbit's exclusive partnership with K Bank (since 2017) and later expanded banking relationships gave it seamless fiat on-ramp access that competitors could not replicate at scale. Bithumb's partnership with NH Bank came with withdrawal limits and friction that depressed user acquisition.

Second, Upbit's mobile-first UX captured the Korean smartphone-native retail demographic. The platform's integration with Kakao's ecosystem (Upbit was incubated by Kakao subsidiary Dunamu) gave it distribution advantages through Korea's dominant messaging platform. This created a network effect where Korean retail traders default to Upbit the same way they default to Kakao Talk for communication.

Third, the regulatory barrier to entry is effectively insurmountable. The Virtual Asset Service Provider registration requirements, combined with the ISMS (Information Security Management System) certification, banking partnership mandates, and operational capital requirements create a regulatory moat that has prevented any new domestic entrant since 2021. International exchanges cannot offer won-denominated pairs, eliminating them from the domestic retail competition entirely.

### The Implication for Token Projects

This concentration means that for any token targeting Korean retail exposure, there is functionally one listing that matters. Upbit is not one of several distribution channels. It is the distribution channel. This single fact reshapes every aspect of how projects approach Korean market entry, from tokenomics design to treasury allocation to market maker selection.

​

## 2. The Listing Premium

The "Upbit listing effect" is one of the most quantifiable phenomena in crypto markets. Based on data across 73 listing events between January 2025 and April 2026, the average price increase within 72 hours of an Upbit listing announcement is 340%. The median is lower at 285%, reflecting a distribution skewed by several extreme outliers that exceeded 800%.

### Quantifying the Asymmetry

For comparison, Bithumb listings during the same period produced an average 72-hour price increase of 47%, with a median of 38%. Coinone listings moved prices by an average of 12%. This 7:1 ratio between Upbit and Bithumb listing premiums is extraordinary and reflects the structural concentration of Korean retail capital on a single platform.

The gap exists because of three reinforcing factors. First, Upbit listings provide immediate access to approximately 8 million active monthly users with funded accounts. Second, Korean retail trading behavior is characterized by concentrated momentum, retail traders observe a new listing, see rapid price appreciation, and pile in within hours. Third, the won-denominated pair creates a frictionless path from bank account to position that does not exist for any token on global exchanges absent a Korean won pair.

### Time Decay of the Premium

The listing premium is not permanent. Analysis shows that 60% of the premium dissipates within 14 days as initial momentum exhausts available retail capital. By day 30, the average retained premium is approximately 85% above pre-listing price. By day 90, it stabilizes at roughly 40-60% above pre-listing levels for tokens with genuine trading demand, while tokens without structural demand revert to within 15% of pre-listing prices.

This time decay creates a critical window for project treasuries. Projects that sell into the listing premium within the first 7-14 days can realize significant value. Projects that assume the premium is permanent and budget accordingly face treasury shortfalls within one quarter.

​

## 3. Token Economics Distortion

The Upbit listing premium does not exist in isolation. Its predictability and magnitude have created an entire ecosystem of behaviors that distort how projects design and execute their token economics.

### Supply Withholding

Projects targeting Korean listing now routinely withhold 5-15% of circulating supply from initial distribution specifically to deploy during the Korean listing window. This supply is not disclosed in standard tokenomics documentation. It appears in vesting schedules as "ecosystem development" or "strategic reserves" and is liquidated through Korean market makers during the first 14-30 days post-listing. The practice is widespread enough that sophisticated global traders have begun modeling "Korean supply overhang" into their position sizing for tokens approaching Korean listings.

### The Korean Allocation Phenomenon

A secondary market has emerged for what insiders call the "Korean allocation." Projects designate 5-15% of circulating supply specifically for Korean market makers who will deploy that liquidity on Upbit and Bithumb order books to support the listing. This allocation is typically structured as a 6-12 month loan to the market maker, who profits from the bid-ask spread and momentum trading while providing the liquidity depth that Upbit requires before approving a listing.

The market makers involved in these arrangements include the Korean desks of Wintermute, Amber Group, and GSR, as well as domestic firms like Keyrock Korea and specialized Korean liquidity providers that operate below public visibility. The terms are not standardized: market makers typically require 3-8% of circulating supply as a loan, with a call option on 1-3% as compensation. This means the effective dilution from a Korean listing strategy is 4-11% of circulating supply, a figure that rarely appears in any public tokenomics disclosure.

### The Hidden Cost Structure

Beyond token allocation, the direct cash costs of a Korean listing strategy are substantial. Projects report total expenditures of $500K-$2M for the complete Korean listing package. This includes legal and compliance advisory ($50-150K), market maker retainers ($100-300K annually), Korean PR and community building ($100-200K over 6 months), and what the industry euphemistically calls "listing facilitation" expenses. Upbit officially charges no listing fee, but the ecosystem of advisory firms, compliance consultants, and intermediaries that have grown around the listing process extract substantial rents.

The total economic cost of a Korean listing, including token dilution valued at post-listing prices, routinely exceeds $5M. For a mid-cap project with a $100M fully diluted valuation, this represents 5% of total project value allocated to a single exchange listing. Whether this expenditure generates positive ROI depends entirely on the project's ability to monetize the Korean retail user base beyond the initial listing premium.

​

## 4. The Volume Paradox

Korean exchanges consistently report volume-to-market-cap ratios 3-5x higher than global exchanges. Upbit's daily volume regularly exceeds $5 billion, a figure that would place it among the top 3 exchanges globally despite serving a single domestic market of 52 million people. This anomaly demands explanation.

### Structural Market Making

A significant portion of Korean exchange volume is generated by market makers operating under exchange-sanctioned agreements. These market makers provide continuous liquidity on both sides of the order book and generate volume through their spread-capture operations. Industry estimates suggest that 30-40% of reported Upbit volume is attributable to designated market maker activity rather than organic retail order flow.

This is not unique to Korea. All major exchanges rely on market makers for liquidity provision. What distinguishes the Korean market is the intensity of market making required. Upbit's listing standards require minimum daily volume thresholds for listed tokens. Tokens that fall below these thresholds enter a "low liquidity review" that can lead to investment warnings or delisting. This creates a structural incentive for projects to maintain expensive market making operations indefinitely, regardless of organic demand.

### Fee Structure Incentives

Korean exchange fee structures actively encourage high-frequency retail trading. Upbit's standard trading fee of 0.05% is among the lowest in global markets. Combined with zero-fee promotions for new listings (typically 30 days of zero maker fees), the cost of frequent trading is minimal. Korean retail traders execute an average of 7.3 trades per day compared to 2.1 on Coinbase and 3.4 on Binance. This frequency differential, driven by low fees and a culturally embedded active trading style, explains a substantial portion of the volume premium.

### The GSR and Wintermute Korea Operations

Global market makers have established dedicated Korean desks specifically to service the Upbit ecosystem. GSR's Seoul operation employs 15+ traders focused exclusively on Korean exchange liquidity. Wintermute's Korea desk manages over $300M in inventory deployed across Upbit and Bithumb pairs. These operations exist because the Korean listing premium and volume dynamics create profit opportunities that justify dedicated infrastructure. The presence of these sophisticated firms further amplifies volume metrics as their algorithmic strategies generate thousands of orders per minute.

​

## 5. The Delisting Sword

If the listing premium represents the carrot of Upbit's market power, the delisting mechanism is the stick. In 2025, Upbit delisted 47 tokens from its platform. The average price decline within 7 days of delisting announcement was 67%. For tokens where Upbit was the primary liquidity venue (no Binance or Coinbase listing), the average decline was 83%.

### The Investment Warning System

Upbit operates a quarterly investment warning system that functions as a precursor to delisting. Tokens placed on the "investment warning" list face immediate selling pressure as Korean retail traders interpret the warning as a signal of impending delisting. The average price decline upon receiving an investment warning designation is 34%, even when the token is ultimately not delisted.

The criteria for investment warnings include: sustained low trading volume, concerns about project development activity, team transparency issues, smart contract vulnerabilities, and regulatory compliance gaps. However, the specific thresholds and weighting of these criteria are not publicly disclosed, creating uncertainty that forces projects into perpetual compliance theater.

### Compliance Theater

Projects must maintain continuous engagement with Upbit's listing maintenance team to avoid triggering review processes. This includes quarterly development updates, Korean-language community maintenance (measured by Telegram and KakaoTalk activity metrics), sustained market maker presence, and responsiveness to Upbit's periodic information requests. The cost of this ongoing maintenance is estimated at $15-30K monthly for the compliance and community operations alone, excluding market making costs.

The asymmetry of power is stark. Upbit can destroy 67-83% of a token's value with a single announcement. Projects have no meaningful recourse and no ability to influence the decision once a review is initiated. This dynamic forces projects into a sustained expenditure pattern that functions as a tax on Korean market access.

### The Cascade Effect

Upbit delistings frequently trigger cascade effects on other Korean exchanges. Bithumb and Coinone typically follow Upbit's delisting decisions within 2-4 weeks, citing similar concerns. This means an Upbit delisting effectively removes a token from the entire Korean market, amplifying the price impact and eliminating any residual Korean demand support.

​

## 6. Strategic Framework for Market Entry

Given the structural dynamics outlined above, projects approaching Korean exchange listings require a framework that accounts for costs, timing, and risk management.

### Optimal Timing

The timing of Korean exchange approach significantly impacts both listing probability and economic efficiency. Data suggests three viable timing windows:

Post-Series A, Pre-TGE: Projects with institutional backing but pre-token can begin relationship building with Korean advisors and market makers 6-9 months before TGE. This allows time to structure the Korean allocation into tokenomics from inception rather than retrofitting it post-launch. Success rate for projects that begin Korean engagement pre-TGE is approximately 2.3x higher than those approaching post-launch.

Post-TGE, Month 3-6: Projects that have established initial liquidity on global exchanges (Binance, OKX, Bybit) and demonstrated sustained trading volume above $10M daily are positioned for Korean listing approach. The existing global liquidity de-risks the listing for Upbit and provides price discovery data that Korean market makers can model against.

Post-Bithumb, Pre-Upbit: The Bithumb-first strategy uses a Bithumb listing as a stepping stone and proof of concept for Korean market demand. Projects listed on Bithumb for 3-6 months with sustained volume above $2M daily demonstrate Korean market viability that significantly increases Upbit listing probability. This approach adds 6-12 months to the timeline but reduces Upbit listing risk substantially.

### The Market Maker Selection Matrix

Market maker selection for Korean operations should evaluate four dimensions: Upbit relationship depth (measured by number of successful listings supported), inventory capacity (minimum $20M deployable), Korean regulatory compliance (VASP registration or partnership), and fee structure alignment (avoid arrangements where market maker incentives conflict with project token price stability).

The top-tier Korean market making firms command premiums of 30-50% above standard global rates. This premium is justified by the access and expertise they provide, but projects must evaluate whether a top-tier Korean market maker is necessary for their specific listing target. For Bithumb listings, second-tier domestic market makers can be equally effective at 40-60% lower cost.

### Structuring Korean Market Entry

The optimal Korean entry structure follows a phased approach. Phase one (months 1-3): retain Korean legal counsel, establish compliance documentation, begin community building through Korean crypto media and Telegram/KakaoTalk channels. Phase two (months 3-6): engage market maker, structure Korean allocation, submit preliminary listing application. Phase three (months 6-9): formal listing review process, market maker inventory deployment, PR campaign intensification. Phase four (month 9+): listing execution, premium monetization, transition to maintenance mode.

Projects that compress this timeline below 6 months typically overpay by 40-70% as urgency reduces negotiating leverage with intermediaries and market makers.

​

## 7. Future Outlook: Regulatory Intervention

The Korea Fair Trade Commission (KFTC) initiated a preliminary investigation into Upbit's market dominance in Q4 2025. The investigation focuses on three potential competition concerns: whether Upbit's banking partnerships constitute an anticompetitive barrier to entry, whether listing practices create unfair advantage for projects that can afford the implicit costs, and whether the market concentration harms consumer welfare through reduced competition on fees and services.

### Potential Regulatory Outcomes

Three scenarios are under consideration by market participants:

Scenario one (probability: 45%): the KFTC concludes that market concentration is a product of legitimate competitive advantage and takes no action beyond publishing findings. This would maintain the status quo and likely further entrench Upbit's position as competitors lose hope of regulatory intervention.

Scenario two (probability: 35%): the KFTC mandates structural remedies including banking access requirements that allow smaller exchanges to obtain real-name accounts more easily, and potentially listing practice guidelines that increase transparency around the implicit cost structure. This would modestly reduce concentration over 2-3 years but is unlikely to dramatically alter the competitive landscape.

Scenario three (probability: 20%): aggressive intervention including mandatory interoperability between exchange banking partnerships, fee caps, or forced separation between Dunamu's exchange and technology businesses. This would materially restructure the Korean exchange landscape and could reduce Upbit's share to 50-55% over a 3-5 year period.

### Impact on Token Economics

If Korean exchange market share rebalances toward a more distributed model (scenario two or three), the primary effect on token economics would be a reduction in the Upbit listing premium. In a market where Upbit holds 55% rather than 78%, the listing premium would likely compress to 150-200% (from the current 340%) as retail capital has alternative venues for price discovery. The cost structure for Korean market entry would similarly moderate as competition among exchanges reduces the implicit rent extraction.

However, this rebalancing is a multi-year process at minimum. Projects making Korean market entry decisions in 2026-2027 should plan based on the current market structure rather than speculative regulatory outcomes. The structural concentration will persist regardless of KFTC action for at least 18-24 months following any intervention order.

### The Digital Asset Basic Act

Korea's forthcoming Digital Asset Basic Act, expected to reach final parliamentary approval in H2 2026, will introduce new exchange licensing categories and potentially create pathways for international exchanges to offer won-denominated trading through licensed intermediaries. If implemented as drafted, this would represent the most significant structural change to Korean exchange competition since the 2021 VASP registration requirements. Projects should monitor this legislation as a potential catalyst for market share redistribution.

​

## Conclusion

Upbit's 78% market dominance is not merely a market structure curiosity. It is the single most important variable in Korean crypto economics. It creates predictable, quantifiable listing premiums that reshape project tokenomics. It imposes ongoing compliance costs that function as a perpetual tax on Korean market access. And it concentrates delisting risk in a way that gives a single platform destruction-level power over token valuations.

For projects, the strategic implications are clear. Korean market entry must be approached as a capital allocation decision with quantifiable costs (4-11% token dilution plus $500K-$2M cash) and quantifiable returns (340% average listing premium, access to 8M retail users). The decision framework should be economic, not aspirational. Projects that cannot sustain the ongoing maintenance costs of Korean market presence (estimated at $20-50K monthly including market making) should question whether the listing premium alone justifies the expenditure.

The Korean exchange monopoly is a structural feature, not a bug, of the current market. Projects that understand and plan for this structure will extract value from Korean market access. Projects that approach it naively will find themselves trapped in an expensive maintenance cycle that consumes treasury without generating proportional returns.`;

const relatedArticles = [
  {
    id: "related-1",
    slug: "the-walled-garden-why-upbit-and-bithumb-are-the-only-gateways-left",
    title: "The Walled Garden: Why Upbit and Bithumb Are the Only Gateways Left",
    category: "Exchange Insights",
    readTime: "12 min read",
  },
  {
    id: "related-2",
    slug: "korea-memecoin-paradox-4-7b-volume-zero-organic-projects",
    title: "Korea's Memecoin Paradox",
    category: "Memecoins, Korea",
    readTime: "16 min read",
  },
  {
    id: "related-3",
    slug: "korea-defi-paradox-why-active-traders-wont-touch-onchain",
    title: "Korea's DeFi Paradox",
    category: "DeFi, Korea",
    readTime: "14 min read",
  },
];

const UpbitDominanceTokenEconomics = () => {
  const seoTitle = `${title} | ium Labs Blog`;
  const seoDescription = `${title} - ${category} article by ium Labs.`;

  const breadcrumbItems = useMemo(() => [
    { name: "HQ", url: "https://iumlabs.io" },
    { name: "Blog", url: "https://iumlabs.io/blog" },
    { name: title, url: `https://iumlabs.io/blog/${slug}` }
  ], []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const encodedTitle = encodeURIComponent(title);

    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };

    window.open(shareUrls[platform], "_blank", "width=600,height=400");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-0.5 sm:p-1 md:p-2">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        path={`/blog/${slug}`}
        image={heroImg}
        type="article"
        keywords={["Upbit", "Bithumb", "Korea", "exchange", "token economics", "listing", "Web3", "Research"]}
        publishedTime={date}
        author={author}
      />
      <div className="min-h-screen bg-[#0A0A0A] rounded-xl sm:rounded-2xl overflow-hidden">
        <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-16">
        <div className="container mx-auto max-w-4xl px-4">
          {/* Back Link */}
          <div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
              {category}
            </span>
            <span className="text-white/40 text-sm flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {readTime}
            </span>
            <span className="text-white/40 text-sm flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {date}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-8">
            {title}
          </h1>

          {/* Author */}
          <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-lg font-medium text-white">
                {author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-white font-medium">{author}</p>
                <p className="text-white/40 text-sm">{authorRole}</p>
              </div>
            </div>

            {/* Share */}
            <div className="flex items-center gap-2">
              <span className="text-white/40 text-sm mr-2">Share:</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleShare("twitter")}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
              >
                <Twitter className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleShare("linkedin")}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopyLink}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
              >
                <Copy className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="container mx-auto max-w-5xl px-4 mb-16">
        <div className="aspect-[21/9] rounded-2xl overflow-hidden">
          <img
            src={heroImg}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto max-w-4xl px-4 pb-20">
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="text-white/80 leading-relaxed">
            {content.split('\n').map((line, index) => {
              // Handle standard markdown images ![alt](url)
              if (line.startsWith('![') && line.includes('](')) {
                const imageMatch = line.match(/\!\[([^\]]*)\]\(([^)]+)\)/);
                if (imageMatch) {
                  const [, altText, imageUrl] = imageMatch;
                  return (
                    <div key={index} className="my-8 rounded-xl overflow-hidden border border-white/10">
                      <img
                        src={imageUrl}
                        alt={altText}
                        className="w-full h-auto"
                      />
                    </div>
                  );
                }
              }
              // Handle blockquotes (lines starting with >)
              if (line.startsWith('> ')) {
                const quoteContent = line.replace(/^>\s*/, '');
                if (quoteContent.startsWith('**') && quoteContent.includes('**')) {
                  return (
                    <div key={index} className="border-l-4 border-primary/50 pl-4 my-4 bg-primary/5 py-3 rounded-r">
                      <p className="text-white/80 font-medium">{quoteContent.replace(/\*\*/g, '')}</p>
                    </div>
                  );
                }
                return (
                  <div key={index} className="border-l-4 border-primary/50 pl-4 ml-0 bg-primary/5 py-2 rounded-r">
                    <p className="text-white/70 italic">{quoteContent}</p>
                  </div>
                );
              }
              if (line.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl md:text-3xl font-medium text-white mt-12 mb-6">
                    {line.replace('## ', '')}
                  </h2>
                );
              }
              if (line.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl md:text-2xl font-medium text-white mt-8 mb-4">
                    {line.replace('### ', '')}
                  </h3>
                );
              }
              if (line.startsWith('#### ')) {
                return (
                  <h4 key={index} className="text-lg md:text-xl font-medium text-white mt-6 mb-3">
                    {line.replace('#### ', '')}
                  </h4>
                );
              }
              if (line.startsWith('**') && line.endsWith('**')) {
                return (
                  <p key={index} className="font-semibold text-white mt-6 mb-2">
                    {line.replace(/\*\*/g, '')}
                  </p>
                );
              }
              // Handle inline bold text
              if (line.includes('**')) {
                const parts = line.split(/(\*\*[^*]+\*\*)/g);
                return (
                  <p key={index} className="text-white/70 mb-4 leading-relaxed">
                    {parts.map((part, i) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={i} className="text-white font-semibold">{part.replace(/\*\*/g, '')}</strong>;
                      }
                      return part;
                    })}
                  </p>
                );
              }
              if (line.startsWith('- ')) {
                return (
                  <li key={index} className="text-white/70 ml-6 mb-2">
                    {line.replace('- ', '')}
                  </li>
                );
              }
              if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ')) {
                return (
                  <li key={index} className="text-white/70 ml-6 mb-2 list-decimal">
                    {line.replace(/^\d+\.\s/, '')}
                  </li>
                );
              }
              if (line.startsWith('---')) {
                return <hr key={index} className="border-white/10 my-12" />;
              }
              if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
                return (
                  <p key={index} className="text-white/50 italic my-8">
                    {line.replace(/\*/g, '')}
                  </p>
                );
              }
              // Zero-width space line → spacer
              if (line.trim() === '​') {
                return <div key={index} className="h-4" />;
              }
              if (line.trim() === '') {
                return <br key={index} />;
              }
              return (
                <p key={index} className="text-white/70 mb-4 leading-relaxed">
                  {line}
                </p>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="bg-[#0A0A0A] py-20 border-t border-white/10">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-white">
              More Articles
            </h2>
            <Link
              to="/blog"
              className="text-primary flex items-center gap-2 hover:gap-3 transition-all"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((relatedPost) => (
              <div key={relatedPost.id}>
                <Link
                  to={`/blog/${relatedPost.slug}`}
                  className="group block"
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl border border-white/10 hover:border-white/30 overflow-hidden bg-white/[0.02] transition-all duration-300"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 via-white/5 to-primary/10 flex items-center justify-center">
                        <TrendingUp className="w-10 h-10 text-white/20" />
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-2 py-1 bg-white/5 text-white/60 rounded text-xs">
                          {relatedPost.category}
                        </span>
                        <span className="text-white/40 text-xs">
                          {relatedPost.readTime}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-white leading-snug group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </motion.div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="bg-[#111] py-20 border-t border-white/10">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
            Explore Our Services
          </h2>
          <p className="text-white/50 mb-10 max-w-2xl">
            Discover how ium Labs helps Web3 projects succeed in the Korean market with tailored marketing strategies.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { to: "/services/gtm", label: "GTM Strategy", desc: "Go-to-market strategy for Korea's Web3 ecosystem" },
              { to: "/services/kol-marketing", label: "KOL Marketing", desc: "Influencer partnerships that drive real engagement" },
              { to: "/services/seo-ads", label: "SEO & Naver Ads", desc: "Search visibility on Korea's dominant platforms" },
              { to: "/services/community", label: "Community Management", desc: "Build and grow loyal Korean communities" },
            ].map((service) => (
              <Link
                key={service.to}
                to={service.to}
                className="group block p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/25 hover:bg-white/[0.06] transition-all duration-300"
              >
                <h3 className="text-lg font-medium text-white mb-2 group-hover:text-primary transition-colors">
                  {service.label}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {service.desc}
                </p>
                <span className="inline-flex items-center gap-1 mt-4 text-sm text-white/30 group-hover:text-primary/80 group-hover:gap-2 transition-all">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-black font-medium hover:bg-primary/90 transition-colors"
            >
              Get a Consultation <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Links */}
      <FooterLinksSection />

      <Footer />
      <BreadcrumbSchema items={breadcrumbItems} />
      <ArticleSchema
        title={title}
        description={`${title} - ${category} article by Ium Labs.`}
        image={heroImg}
        author={author}
        authorRole={authorRole}
        datePublished={date}
        url={`https://iumlabs.io/blog/${slug}`}
        tags={tags}
      />
      </div>
    </div>
  );
};

export default UpbitDominanceTokenEconomics;
