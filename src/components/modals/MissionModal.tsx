import { X, ArrowLeft, Target, Globe, Users, Zap } from "lucide-react";

interface MissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const missionPoints = [
  {
    icon: Target,
    title: "Our Mission",
    content: "Bridging global Web3 projects with the Korean market through data-driven research and strategic GTM marketing."
  },
  {
    icon: Globe,
    title: "What 'Ium' Means",
    content: "'Ium' is derived from the Korean word '잇다 (Connect)', representing our role as a bridge and a foundational layer for market entry."
  },
  {
    icon: Users,
    title: "Who We Serve",
    content: "We partner with innovative blockchain projects, DeFi protocols, NFT platforms, and Web3 startups looking to establish a strong presence in the Korean market."
  },
  {
    icon: Zap,
    title: "Our Approach",
    content: "We combine proprietary market research with hands-on execution, delivering tailored strategies that resonate with Korean audiences and drive real growth."
  },
];

const MissionModal = ({ isOpen, onClose }: MissionModalProps) => {
  return (
    <div
      className={`fixed inset-0 z-[100] transition-all duration-500 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}
    >
      {/* Background blur overlay */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col">
        {/* Back Button */}
        <button
          onClick={onClose}
          className="absolute top-6 left-6 z-10 flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back</span>
        </button>

        {/* Marquee Header */}
        <div className="bg-muted/30 py-3 overflow-hidden border-b border-border/30 mt-14">
          <div className="flex animate-marquee whitespace-nowrap">
            {Array(10).fill(null).map((_, i) => (
              <div key={i} className="flex items-center mx-4">
                <span className="text-foreground text-sm mr-8">our mission</span>
                <span className="text-primary text-sm mr-8">ium labs</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 container mx-auto px-6 py-12 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Our Mission
            </h1>
            <p className="text-muted-foreground mb-10">
              Connecting Global Web3 to Korea
            </p>
            
            <div className="space-y-4">
              {missionPoints.map((point) => (
                <div
                  key={point.title}
                  className="p-6 rounded-xl border border-border hover:border-border/80 transition-all duration-300 hover:bg-muted/5"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <point.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-foreground mb-2">{point.title}</h2>
                      <p className="text-muted-foreground leading-relaxed">{point.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Core Services */}
            <div className="mt-10 p-6 rounded-xl bg-primary/5 border border-primary/20">
              <h3 className="text-lg font-semibold text-foreground mb-4">Core Services</h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-background rounded-full text-sm text-muted-foreground border border-border">
                  Web3 Marketing Agency
                </span>
                <span className="px-4 py-2 bg-background rounded-full text-sm text-muted-foreground border border-border">
                  Proprietary Research Product
                </span>
                <span className="px-4 py-2 bg-background rounded-full text-sm text-muted-foreground border border-border">
                  Data Analytics & Insights
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-muted/50 hover:bg-muted transition-colors flex items-center justify-center"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>
      </div>
    </div>
  );
};

export default MissionModal;
