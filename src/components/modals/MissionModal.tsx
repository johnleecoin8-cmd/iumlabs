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
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}
    >
      {/* Background blur overlay */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className={`relative w-full max-w-2xl max-h-[85vh] mx-4 bg-background border border-border rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ${
        isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border shrink-0">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">
              Our Mission
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Connecting Global Web3 to Korea
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-muted/50 hover:bg-muted transition-colors flex items-center justify-center"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {missionPoints.map((point) => (
              <div
                key={point.title}
                className="p-5 rounded-xl border border-border hover:border-border/80 transition-all duration-300 hover:bg-muted/5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <point.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-foreground mb-1">{point.title}</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">{point.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Core Services */}
          <div className="mt-6 p-5 rounded-xl bg-primary/5 border border-primary/20">
            <h3 className="text-base font-semibold text-foreground mb-3">Core Services</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-background rounded-full text-xs text-muted-foreground border border-border">
                Web3 Marketing Agency
              </span>
              <span className="px-3 py-1.5 bg-background rounded-full text-xs text-muted-foreground border border-border">
                Proprietary Research Product
              </span>
              <span className="px-3 py-1.5 bg-background rounded-full text-xs text-muted-foreground border border-border">
                Data Analytics & Insights
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionModal;
