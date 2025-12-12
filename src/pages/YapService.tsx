import ServiceDetailLayout from "@/components/ServiceDetailLayout";
import eventsImage from "@/assets/services/events.jpg";
import seoulTech from "@/assets/backgrounds/seoul-tech-future.jpg";

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

const themeConfig = {
  backgroundImage: seoulTech,
  auroraColors: {
    primary: "from-cyan-600/30",
    secondary: "to-teal-500/25",
    tertiary: "from-sky-500/20",
  },
  accentColor: "#06b6d4",
  accentColorHover: "#0891b2",
  floatingTags: [
    { label: "테헤란로 Yap", top: "14%", left: "7%" },
    { label: "600+ Creators", top: "26%", right: "10%" },
    { label: "판교 테크", top: "42%", left: "4%" },
    { label: "Mindshare", top: "52%", right: "8%" },
    { label: "K-Yappers", top: "34%", left: "14%" },
    { label: "Viral Seoul", top: "62%", left: "11%" },
  ],
};

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
      themeConfig={themeConfig}
    />
  );
};

export default YapService;
