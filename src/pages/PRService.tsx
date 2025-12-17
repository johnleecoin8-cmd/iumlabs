import ServiceDetailLayout from "@/components/ServiceDetailLayout";
import prImage from "@/assets/services/pr-media.jpg";
import seoulSkyline from "@/assets/seoul-skyline.jpg";
import { FileEdit, BookOpen, Newspaper, ClipboardCheck } from "lucide-react";

const processSteps = [
  {
    number: "01",
    title: "Onboarding",
    description: "We host a strategy session and research the landscape to define compelling angles and story directions.",
    icon: FileEdit,
  },
  {
    number: "02",
    title: "Story Development",
    description: "We draft articles, design visuals, and pitch tailored stories to relevant journalists and editors.",
    icon: BookOpen,
  },
  {
    number: "03",
    title: "Campaign Goes Live",
    description: "We secure media placements, coordinate timing, and amplify reach through supporting channels.",
    icon: Newspaper,
  },
  {
    number: "04",
    title: "Reporting",
    description: "We share a full PR report covering placements, traffic, sentiment, and clear recommendations for follow-up.",
    icon: ClipboardCheck,
  },
];

const themeConfig = {
  backgroundImage: seoulSkyline,
  auroraColors: {
    primary: "from-violet-600/30",
    secondary: "to-purple-500/25",
    tertiary: "from-indigo-500/20",
  },
  accentColor: "#8B5CF6", // Violet - Premium, authority
  accentColorHover: "#7C3AED",
  floatingTags: [
    { label: "Media", top: "12%", left: "8%" },
    { label: "Press", top: "24%", right: "11%" },
    { label: "Coverage", top: "42%", left: "5%" },
    { label: "Top-Tier", top: "52%", right: "9%" },
    { label: "Announcements", top: "32%", left: "13%" },
  ],
};

const stats = [
  { value: "200+", label: "Articles Published" },
  { value: "50+", label: "Media Partners" },
];

const PRService = () => {
  return (
    <ServiceDetailLayout
      tagline="PR"
      title="Public "
      titleHighlight="Relations"
      subtitle="PR campaigns designed to earn credibility, shape perception, and get your story in front of the right audience."
      aboutText="Our PR service helps your project get published in the right places and for the right reasons. We define story angles that matter, craft content that editors want, and coordinate outreach to top-tier crypto and tech publications. From TGE announcements to founder features, we focus on credibility, timing, and placements that support your long-term narrative."
      whatIncludesText="We help you craft the right narrative and secure placements in top crypto and tech media. From article creation to journalist outreach and timing coordination, we make sure your story gets published, amplified, and seen by the right audience."
      processSteps={processSteps}
      aboutImage={prImage}
      currentServiceSlug="pr"
      themeConfig={themeConfig}
      stats={stats}
    />
  );
};

export default PRService;
