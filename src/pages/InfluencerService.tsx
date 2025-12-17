import ServiceDetailLayout from "@/components/ServiceDetailLayout";
import kolImage from "@/assets/services/kol-network.jpg";
import seoulDDP from "@/assets/backgrounds/seoul-ddp-night.jpg";
import { Search, Users, Megaphone, PieChart } from "lucide-react";

const processSteps = [
  {
    number: "01",
    title: "Onboarding",
    description: "We define your KOL strategy in a workshop — covering objectives, narrative direction, and targeting.",
    icon: Search,
  },
  {
    number: "02",
    title: "KOL Coordination",
    description: "We source and shortlist aligned creators, handle outreach and negotiations, and lock in timelines and deliverables.",
    icon: Users,
  },
  {
    number: "03",
    title: "Campaign Goes Live",
    description: "KOLs post across X, YouTube, and Telegram while we monitor content delivery, timing, and engagement live.",
    icon: Megaphone,
  },
  {
    number: "04",
    title: "Reporting",
    description: "We report on KOL performance, engagement, ROI, and suggest adjustments for future campaigns.",
    icon: PieChart,
  },
];

const themeConfig = {
  backgroundImage: seoulDDP,
  auroraColors: {
    primary: "from-amber-500/30",
    secondary: "to-orange-500/25",
    tertiary: "from-yellow-500/20",
  },
  accentColor: "#F59E0B", // Gold/Amber - Influence, premium
  accentColorHover: "#D97706",
  floatingTags: [
    { label: "KOL Network", top: "11%", left: "8%" },
    { label: "1000+ KOLs", top: "23%", right: "9%" },
    { label: "Partnerships", top: "41%", left: "5%" },
    { label: "YouTube", top: "51%", right: "7%" },
    { label: "Campaigns", top: "31%", left: "15%" },
  ],
};

const stats = [
  { value: "120+", label: "KOL Network" },
  { value: "50M+", label: "Total Reach" },
];

const InfluencerService = () => {
  return (
    <ServiceDetailLayout
      tagline="Influencer Strategy"
      title="Influencer "
      titleHighlight="Strategy"
      subtitle="Let others tell your story to the right audience to build awareness, trust, and momentum."
      aboutText="We activate a wide range of crypto-native influencers, from top industry voices to niche micro-KOLs, to help you get seen by the right people. Our focus is on message alignment, credible distribution, and timing that supports your launch or campaign. We work with creators who start conversations, growth, and move real mindshare."
      whatIncludesText="We run end-to-end influencer campaigns that connect your narrative to relevant audiences through trusted Content Creators. From creator sourcing and briefing to live coordination and reporting, we handle the process and ensure every post delivers with purpose."
      processSteps={processSteps}
      aboutImage={kolImage}
      currentServiceSlug="influencer"
      themeConfig={themeConfig}
      stats={stats}
    />
  );
};

export default InfluencerService;
