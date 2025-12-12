import ServiceDetailLayout from "@/components/ServiceDetailLayout";
import eventsImage from "@/assets/services/events.jpg";

const processSteps = [
  {
    number: "01",
    title: "Strategy & Onboarding",
    description: "We align on your goals, messaging, timing, and target audiences. Then we define campaign angles, create a clear briefing, and prepare the materials for launch.",
  },
  {
    number: "02",
    title: "Campaign Setup",
    description: "We publish the briefing to our 600+ Yap Circle creators — an open network of aligned, crypto-native voices — inviting them to participate based on interest, timing, and narrative fit.",
  },
  {
    number: "03",
    title: "Activation",
    description: "Creators begin posting organically across X: threads, quote RTs, memes, and reactions. We monitor delivery, track engagement, and amplify high-performing posts via KOLs and ecosystem replies.",
  },
  {
    number: "04",
    title: "Reporting & Wrap-Up",
    description: "We deliver a full report on campaign performance: reach, impressions, engagement, post volume, smart follower exposure and propose next steps for continued momentum.",
  },
];

const YapService = () => {
  return (
    <ServiceDetailLayout
      tagline="Yap Strategy"
      title="Yap "
      titleHighlight="Strategy"
      subtitle="Scale awareness with hundreds of aligned yappers to amplify your project's mindshare across Crypto X."
      aboutText="Yap Circle is our curated Yapper network designed to give your project consistent Mindshare and credible exposure across X. With 600+ Yappers, we activate waves of organic content around your narrative. It's a flexible, always-on strategy that reaches deep into crypto's most active segments without relying on Kaito's expensive leaderboard campaigns."
      whatIncludesText="We run targeted Yap campaigns by publishing briefs to our network of 600+ creators. They opt in and post aligned content that fits your story, timing, and target audience. We coordinate the rollout, monitor performance, and amplify what gains traction."
      processSteps={processSteps}
      aboutImage={eventsImage}
      currentServiceSlug="yap"
    />
  );
};

export default YapService;
