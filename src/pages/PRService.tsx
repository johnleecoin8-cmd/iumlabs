import ServiceDetailLayout from "@/components/ServiceDetailLayout";
import dashboardMockup from "@/assets/dashboard-mockup.png";

const floatingTags = [
  { label: "Media", top: "18%", left: "5%", mobileTop: "12%", mobileLeft: "3%" },
  { label: "Publications", top: "28%", right: "8%", mobileTop: "15%", mobileRight: "3%" },
  { label: "Credibility", top: "52%", left: "4%", mobileTop: "75%", mobileLeft: "3%" },
  { label: "Story", bottom: "32%", right: "6%", mobileBottom: "18%", mobileRight: "3%" },
];

const processSteps = [
  {
    number: "01",
    title: "Onboarding",
    description: "We host a strategy session and research the landscape to define compelling angles and story directions.",
  },
  {
    number: "02",
    title: "Story Development",
    description: "We draft articles, design visuals, and pitch tailored stories to relevant journalists and editors.",
  },
  {
    number: "03",
    title: "Campaign Goes Live",
    description: "We secure media placements, coordinate timing, and amplify reach through supporting channels.",
  },
  {
    number: "04",
    title: "Reporting",
    description: "We share a full PR report covering placements, traffic, sentiment, and clear recommendations for follow-up.",
  },
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
      floatingTags={floatingTags}
      backgroundImage={dashboardMockup}
    />
  );
};

export default PRService;
