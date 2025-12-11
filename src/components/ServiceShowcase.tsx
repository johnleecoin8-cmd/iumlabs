import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceShowcaseProps {
  onLearnMore: () => void;
  isVisible: boolean;
}

// Package data based on the deck
const packages = [
  {
    id: "marketing",
    name: "Multi-channel Marketing",
    tag: "Marketing",
    description: "Quickly secure brand establishment and drive verifiable adoption through local campaigns.",
    categories: [
      {
        name: "KOL & Influence Network",
        items: [
          "Direct Trust Building with Korean investors",
          "High-Value KOL Access (X, Telegram, Youtube)",
          "CEO AMAs, interviews, and in-depth reviews"
        ]
      },
      {
        name: "Community Growth",
        items: [
          "Korean Telegram & KakaoTalk management",
          "Data-driven campaigns (giveaways, whitelists, airdrops)",
          "High engagement metrics & organic growth"
        ]
      },
      {
        name: "SEO & Media",
        items: [
          "Naver ecosystem SEO optimization",
          "Tier-1 Korean crypto media coverage",
          "Professional localized research reports"
        ]
      }
    ],
    position: { top: "15%", left: "8%" }
  },
  {
    id: "events",
    name: "Event & Compliance",
    tag: "Events",
    description: "Ensure seamless event execution and strategic regulatory guidance for Korea's Web3 ecosystem.",
    categories: [
      {
        name: "Web3 Conferences",
        items: [
          "Full planning & execution (KBW, WebX, AWS Summit)",
          "Venue sourcing & speaker acquisition",
          "Booth setup & sponsor operations"
        ]
      },
      {
        name: "Side Event Management",
        items: [
          "Exclusive side events (40-200 pax)",
          "KOL activation & media coverage via Luma",
          "Full on-site staffing & support"
        ]
      },
      {
        name: "Developer Outreach",
        items: [
          "Hackathon & dev conference sponsorship",
          "University blockchain society partnerships",
          "Future developer pipeline nurturing"
        ]
      }
    ],
    position: { top: "8%", right: "15%" }
  },
  {
    id: "institutional",
    name: "Institutional Acceleration",
    tag: "Institutional",
    description: "Support project launch with expert tokenomics design, financial modeling, and investor relations.",
    categories: [
      {
        name: "Web3 Venture Building",
        items: [
          "Custom GTM Blueprint for Korean market",
          "Tokenomics & financial modeling",
          "Long-term viability proof for VCs"
        ]
      },
      {
        name: "Exchange Settings",
        items: [
          "VASP & real-name account securement",
          "Listing strategy & documentation",
          "ISMS certification & security audit"
        ]
      },
      {
        name: "Investor Relations",
        items: [
          "VC-optimized IR deck production",
          "Korean VC targeting (Hashed, Kakao Ventures)",
          "Institutional partnership initiation"
        ]
      }
    ],
    position: { bottom: "25%", right: "5%" }
  }
];

// Additional floating service tags
const floatingTags = [
  { label: "KOL Network", top: "25%", right: "8%" },
  { label: "Community", top: "45%", left: "5%" },
  { label: "Media & PR", bottom: "35%", left: "12%" },
  { label: "Exchange Listing", bottom: "15%", right: "20%" },
  { label: "GTM Strategy", top: "35%", right: "25%" },
];

const ServiceShowcase = ({ onLearnMore, isVisible }: ServiceShowcaseProps) => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);

  const activePackage = packages.find(p => p.id === selectedPackage);

  return (
    <div
      className={`relative transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Main Hero Section */}
      <div className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/20" />
        
        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Floating Package Tags */}
        {packages.map((pkg) => (
          <button
            key={pkg.id}
            onClick={() => setSelectedPackage(selectedPackage === pkg.id ? null : pkg.id)}
            onMouseEnter={() => setHoveredTag(pkg.id)}
            onMouseLeave={() => setHoveredTag(null)}
            className={`absolute px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300 cursor-pointer z-10
              ${selectedPackage === pkg.id 
                ? "bg-primary text-primary-foreground border-primary scale-110" 
                : hoveredTag === pkg.id
                  ? "bg-foreground/10 text-foreground border-foreground/30 scale-105"
                  : "bg-card/80 text-foreground/80 border-border/50 hover:border-foreground/30"
              }`}
            style={pkg.position as React.CSSProperties}
          >
            {pkg.tag}
          </button>
        ))}

        {/* Additional Floating Tags */}
        {floatingTags.map((tag, idx) => (
          <div
            key={idx}
            className="absolute px-3 py-1.5 rounded-full border border-border/30 bg-card/50 text-xs text-muted-foreground hidden md:block"
            style={{
              ...tag as React.CSSProperties,
              animationDelay: `${idx * 0.2}s`
            }}
          >
            {tag.label}
          </div>
        ))}

        {/* Center Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-[1.1] mb-6">
            Your Bridge to
            <br />
            <span className="text-primary">Korean Market</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            We connect global Web3 projects to Korea's thriving crypto ecosystem through strategic marketing, events, and institutional support.
          </p>
          <Link to="/contact">
            <Button className="rounded-full bg-primary hover:bg-primary/90 px-8 py-6 text-base group">
              Book a Free Consultation
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          {/* Hint Text */}
          <p className="mt-8 text-sm text-muted-foreground/60">
            Click on a service tag to learn more
          </p>
        </div>
      </div>

      {/* Package Detail Modal */}
      {activePackage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPackage(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <div 
            className="relative bg-card border border-border/50 rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPackage(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-foreground/10 transition-colors z-10"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Header */}
            <div className="p-8 pb-6 border-b border-border/30">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                {activePackage.tag}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {activePackage.name}
              </h3>
              <p className="text-muted-foreground">
                {activePackage.description}
              </p>
            </div>

            {/* Categories */}
            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-6">
                {activePackage.categories.map((category, idx) => (
                  <div key={idx} className="space-y-4">
                    <h4 className="font-semibold text-foreground border-b border-border/30 pb-2">
                      {category.name}
                    </h4>
                    <ul className="space-y-3">
                      {category.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="p-8 pt-0">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-6 rounded-2xl bg-foreground/5 border border-border/30">
                <div>
                  <p className="font-medium text-foreground">Ready to get started?</p>
                  <p className="text-sm text-muted-foreground">Let's discuss your project needs.</p>
                </div>
                <Link to="/contact" onClick={() => setSelectedPackage(null)}>
                  <Button className="rounded-full bg-primary hover:bg-primary/90 px-6 group whitespace-nowrap">
                    Book a Call
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceShowcase;
