import ServiceDetailLayout from "@/components/ServiceDetailLayout";
import networkAbstract from "@/assets/network-abstract.jpg";

const floatingTags = [
  { label: "Positioning", top: "18%", left: "5%", mobileTop: "12%", mobileLeft: "3%" },
  { label: "Narrative", top: "28%", right: "8%", mobileTop: "15%", mobileRight: "3%" },
  { label: "Launch", top: "52%", left: "4%", mobileTop: "75%", mobileLeft: "3%" },
  { label: "Strategy", bottom: "32%", right: "6%", mobileBottom: "18%", mobileRight: "3%" },
];

const processSteps = [
  {
    number: "01",
    title: "Foundation",
    description: "We run a collaborative workshop to understand your product, vision, and key milestones. This gives us what we need to build tailored messaging, positioning, and narrative direction.",
  },
  {
    number: "02",
    title: "Strategy & Prep",
    description: "We develop and present a go-to-market strategy aligned with your goals — including messaging framework, campaign angles, and channel tactics. Then we start building content, visuals, KOL briefs, and PR concepts.",
  },
  {
    number: "03",
    title: "Launch & Execution",
    description: "The campaign goes live. We coordinate delivery across all channels, manage the rollout, and track performance in real time.",
  },
  {
    number: "04",
    title: "Report & Next Steps",
    description: "We wrap with a full campaign report: results, learnings, and actionable next steps for continued growth or future sprints.",
  },
];

const GTMStrategyService = () => {
  return (
    <ServiceDetailLayout
      tagline="Go-To-Market Strategy"
      title="Go-To-Market "
      titleHighlight="Strategy"
      subtitle="A structured launch plan that defines your narrative, timing, positioning, and channel strategy to drive early traction."
      aboutText="We help crypto projects launch with precision by aligning narrative, messaging, and timing across every touchpoint. Through focused workshops and research, we define your positioning, segment your audiences, and structure how your story is told across social, Content Creators, PR, and more. Whether you are preparing for a TGE, product launch, or revival, we deliver a GTM plan designed to drive traction, not just awareness."
      whatIncludesText="We help define your positioning, messaging, target audiences (and more) through collaborative workshops, competitor analysis, and market research, setting a clear foundation for your KOL, PR, and social campaigns."
      processSteps={processSteps}
      floatingTags={floatingTags}
      backgroundImage={networkAbstract}
    />
  );
};

export default GTMStrategyService;
