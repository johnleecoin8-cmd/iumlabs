import ServiceDetailLayout from "@/components/ServiceDetailLayout";
import gtmImage from "@/assets/services/gtm-strategy.jpg";
import koreaPalace from "@/assets/backgrounds/korea-palace-modern.jpg";
import { Compass, Map, Flag, TrendingUp } from "lucide-react";

const processSteps = [
  {
    number: "01",
    title: "Strategy Kickoff",
    description: "We align on project goals, audience profiles, and competitive landscape to inform the full GTM plan.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Narrative & Positioning",
    description: "We craft your messaging framework, value proposition, and launch storyline across all channels.",
    icon: Map,
  },
  {
    number: "03",
    title: "Launch Coordination",
    description: "We orchestrate all campaign elements — content, influencers, PR, community — into a unified launch.",
    icon: Flag,
  },
  {
    number: "04",
    title: "Optimization & Scale",
    description: "We measure results, iterate on what works, and refine strategy for sustained growth post-launch.",
    icon: TrendingUp,
  },
];

const themeConfig = {
  backgroundImage: koreaPalace,
  auroraColors: {
    primary: "from-emerald-600/30",
    secondary: "to-green-500/25",
    tertiary: "from-teal-500/20",
  },
  accentColor: "#10b981",
  accentColorHover: "#059669",
  floatingTags: [
    { label: "Launch", top: "13%", left: "9%" },
    { label: "Positioning", top: "25%", right: "11%" },
    { label: "Strategy", top: "43%", left: "6%" },
    { label: "Narrative", top: "53%", right: "8%" },
    { label: "Market Entry", top: "33%", left: "16%" },
  ],
};

const stats = [
  { value: "30+", label: "Successful Launches" },
  { value: "$50M+", label: "Token Sales Supported" },
];

const GTMStrategyService = () => {
  return (
    <ServiceDetailLayout
      tagline="GTM Strategy"
      title="GTM "
      titleHighlight="Strategy"
      subtitle="From positioning to launch execution — a strategic roadmap built for your project's Korean market entry."
      aboutText="Our Go-To-Market service helps you enter the Korean crypto market with clarity, precision, and momentum. We build a complete launch plan covering positioning, messaging, channel strategy, and execution timeline. Whether it's a token launch, product release, or market expansion, we align every piece of the puzzle so your entry makes impact."
      whatIncludesText="We design and execute a comprehensive go-to-market strategy tailored for the Korean market, covering everything from brand positioning to multi-channel launch coordination."
      processSteps={processSteps}
      aboutImage={gtmImage}
      currentServiceSlug="gtm"
      themeConfig={themeConfig}
      stats={stats}
    />
  );
};

export default GTMStrategyService;
