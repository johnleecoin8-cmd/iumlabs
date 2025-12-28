import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Placeholder images for new cases
const placeholderLogo = "https://via.placeholder.com/80x80/1a1a1a/ffffff?text=Logo";
const placeholderBg = "https://via.placeholder.com/400x300/2a2a2a/ffffff?text=Campaign";

const featuredCases = [
  {
    name: "Bananago",
    logo: placeholderLogo,
    bgImage: placeholderBg,
    slug: "bananago",
    category: "Affiliate",
    result: "40% Binance Payback",
    description: "Real-time automated crypto affiliate platform offering the highest cashback rates in Korea.",
  },
  {
    name: "Thirdweb",
    logo: placeholderLogo,
    bgImage: placeholderBg,
    slug: "thirdweb",
    category: "Infrastructure",
    result: "Korean Developer Growth",
    description: "Full-stack Web3 development platform enabling seamless blockchain integration for Korean builders.",
  },
  {
    name: "Coinmerce",
    logo: placeholderLogo,
    bgImage: placeholderBg,
    slug: "coinmerce",
    category: "Exchange",
    result: "European Expansion",
    description: "User-friendly European crypto exchange supporting 200+ cryptocurrencies with instant deposits.",
  },
];

interface CaseCardProps {
  name: string;
  logo: string;
  bgImage: string;
  slug: string;
  category: string;
  result: string;
  description: string;
  index: number;
}

const CaseCard = ({ name, logo, bgImage, slug, category, result, description, index }: CaseCardProps) => {
  const isRightBorder = index < 2; // First two cards get right border on desktop

  return (
    <div>
      <Link
        to={`/projects/${slug}`}
        onClick={() => window.scrollTo(0, 0)}
        className={`group block p-4 sm:p-6 md:p-8 transition-all duration-300 hover:bg-secondary/50 active:bg-secondary/70 border-b md:border-b-0 border-border ${
          isRightBorder ? "md:border-r" : ""
        }`}
      >
        <div className="flex items-start gap-4 sm:gap-5">
          {/* Image */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl overflow-hidden flex-shrink-0 group-hover:shadow-lg group-hover:shadow-foreground/10 transition-all duration-300">
            <img
              src={bgImage}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 text-muted-foreground text-[11px] sm:text-xs mb-1 sm:mb-2">
              <span className="uppercase tracking-wider">{category}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 group-hover:text-foreground/80 transition-colors">
              {name}
            </h3>
            <p className="text-foreground font-medium text-sm mb-1 sm:mb-2">
              {result}
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 hidden sm:block">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors text-sm mt-3 sm:mt-4 min-h-[44px] sm:min-h-0">
          <span className="group-hover:underline underline-offset-4">View case study</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </div>
  );
};

const CasesSection = () => {
  return (
    <section className="bg-background">
      <div className="flex flex-col lg:flex-row">
        {/* Left: Cases Grid - 3 columns for 3 cases */}
        <div className="w-full lg:w-2/3 lg:border-r border-border">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {featuredCases.map((caseItem, index) => (
              <CaseCard key={caseItem.slug} {...caseItem} index={index} />
            ))}
          </div>
        </div>

        {/* Right: Sticky Info Panel */}
        <div className="w-full lg:w-1/3 p-6 md:p-8 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Recent Work
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
            Real results, not just promises. Here's how we've helped global Web3 projects conquer the Korean market.
          </p>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-4 pb-3 border-b border-border">
              <span className="text-2xl md:text-3xl font-bold text-foreground">200+</span>
              <span className="text-muted-foreground text-sm">Cryptocurrencies supported</span>
            </div>
            <div className="flex items-center gap-4 pb-3 border-b border-border">
              <span className="text-2xl md:text-3xl font-bold text-foreground">40%</span>
              <span className="text-muted-foreground text-sm">Max payback rate</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl md:text-3xl font-bold text-foreground">3</span>
              <span className="text-muted-foreground text-sm">Recent partnerships</span>
            </div>
          </div>

          <Link
            to="/contact"
            className="group inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-4 sm:py-3 text-sm font-medium rounded-full hover:bg-foreground/90 active:bg-foreground/80 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-foreground/20 transition-all duration-300 w-full sm:w-fit mb-6 min-h-[48px]"
          >
            START YOUR PROJECT
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* View All Projects */}
          <div className="pt-6 border-t border-border">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 text-foreground font-medium hover:text-foreground/70 transition-colors"
            >
              <span className="group-hover:underline underline-offset-4">View all projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
