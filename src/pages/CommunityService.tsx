import ServiceDetailLayout from "@/components/ServiceDetailLayout";
import communityImage from "@/assets/services/community-growth.jpg";

const processSteps = [
  {
    number: "01",
    title: "Foundation",
    description: "We run a detailed onboarding process to collect information about your project, community goals, and current setup. This gives us what we need to design your custom Discord ecosystem.",
  },
  {
    number: "02",
    title: "Infrastructure Setup, A/B Testing & Launch",
    description: "We implement your selected infrastructure components, conduct A/B testing to optimize performance, and activate all chosen systems to drive sustainable growth.",
  },
  {
    number: "03",
    title: "Reporting",
    description: "We deliver performance reports with top contributors, engagement trends, and actionable recommendations for continued community growth and optimization.",
  },
];

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
    />
  );
};

export default CommunityService;
