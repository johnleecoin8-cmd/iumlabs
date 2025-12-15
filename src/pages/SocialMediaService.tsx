import ServiceDetailLayout from "@/components/ServiceDetailLayout";
import socialMediaImage from "@/assets/backgrounds/seoul-gangnam-night.jpg";

const processSteps = [
  {
    number: "01",
    title: "Onboarding",
    description: "We run a kickoff workshop and conduct competitor research to define your narrative, tone, and content strategy.",
  },
  {
    number: "02",
    title: "Content Production",
    description: "We create post copy, a content calendar, branded visuals, and a reply strategy to guide day-to-day engagement.",
  },
  {
    number: "03",
    title: "Campaign Goes Live",
    description: "We publish high-impact posts and actively monitor conversations across X, replying where relevant, surfacing mentions, and amplifying content from the community or related projects.",
  },
  {
    number: "04",
    title: "Reporting",
    description: "We deliver a performance report with insights, learnings, and next-step recommendations.",
  },
];

const themeConfig = {
  backgroundImage: socialMediaImage,
  auroraColors: {
    primary: "from-purple-600/30",
    secondary: "to-pink-500/25",
    tertiary: "from-fuchsia-500/20",
  },
  accentColor: "#a855f7",
  accentColorHover: "#9333ea",
  floatingTags: [
    { label: "X/Twitter", top: "12%", left: "7%" },
    { label: "Content", top: "24%", right: "10%" },
    { label: "Engagement", top: "40%", left: "5%" },
    { label: "Analytics", top: "50%", right: "7%" },
    { label: "Viral Growth", top: "30%", left: "14%" },
  ],
};

const SocialMediaService = () => {
  return (
    <ServiceDetailLayout
      tagline="Social Media Marketing"
      title="Social Media "
      titleHighlight="Marketing"
      subtitle="Social tactics, high-impact content, and ecosystem monitoring to build consistent visibility and engage the right audiences."
      aboutText="We manage your presence on X with consistent, high-impact content and real-time ecosystem awareness. Our team handles content strategy, post creation, community replies, and partner engagement while tracking sentiment and identifying opportunities to amplify momentum. It is more than posting. It is building a credible, consistent voice that grows with your project."
      whatIncludesText="We manage your project's presence on X by building a content strategy, creating high-impact posts, and actively monitoring the ecosystem to engage, reply, and amplify the right conversations."
      processSteps={processSteps}
      aboutImage={socialMediaImage}
      currentServiceSlug="social-media"
      themeConfig={themeConfig}
    />
  );
};

export default SocialMediaService;
