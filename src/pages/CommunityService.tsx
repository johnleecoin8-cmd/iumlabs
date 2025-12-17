import ServiceDetailLayout from "@/components/ServiceDetailLayout";
import communityImage from "@/assets/services/community-growth.jpg";
import seoulHanriver from "@/assets/backgrounds/seoul-hanriver-twilight.jpg";

const processSteps = [
  {
    number: "01",
    title: "Onboarding",
    description: "We run a detailed onboarding process to collect information about your project, community goals, and current setup. This gives us what we need to design your custom Discord ecosystem.",
  },
  {
    number: "02",
    title: "Infrastructure Setup",
    description: "We implement your selected infrastructure components including AI automation, gamified engagement systems, and community training modules tailored to your needs.",
  },
  {
    number: "03",
    title: "Launch & Activation",
    description: "We activate all systems, conduct A/B testing to optimize performance, and monitor early community engagement to ensure smooth operation.",
  },
  {
    number: "04",
    title: "Reporting",
    description: "We deliver performance reports with top contributors, engagement trends, and actionable recommendations for continued community growth and optimization.",
  },
];

const themeConfig = {
  backgroundImage: seoulHanriver,
  auroraColors: {
    primary: "from-blue-600/30",
    secondary: "to-cyan-500/25",
    tertiary: "from-teal-500/20",
  },
  accentColor: "#0891b2",
  accentColorHover: "#0e7490",
  floatingTags: [
    { label: "Discord", top: "12%", left: "6%" },
    { label: "Telegram", top: "22%", right: "8%" },
    { label: "Moderation", top: "38%", left: "4%" },
    { label: "AMA Hosting", top: "48%", right: "6%" },
    { label: "24/7 Support", top: "28%", left: "12%" },
  ],
};

const CommunityService = () => {
  return (
    <ServiceDetailLayout
      tagline="Community Management"
      title="Community "
      titleHighlight="Management"
      subtitle="Complete Discord community infrastructure to build sticky, scalable and self-sustaining growth."
      aboutText="Complete Discord infrastructure transforms servers into growth engines through AI automation, gamified engagement, community training and beyond. Our team handles the setup and management while tracking metrics and identifying growth opportunities. It's more than managing chat. It's building a self-sustaining ecosystem that converts visitors into active contributors without overwhelming your team."
      whatIncludesText="We provide a complete Discord infrastructure through AI integration, community training, and gamified mechanics to eliminate user confusion and build sustainable community growth."
      processSteps={processSteps}
      aboutImage={communityImage}
      currentServiceSlug="community"
      themeConfig={themeConfig}
    />
  );
};

export default CommunityService;
