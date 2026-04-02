import { usePageMeta } from "@/hooks/usePageMeta";
import ServicePageLayout, { ServiceTag, ServiceStat, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SEOHead from "@/components/SEOHead";
import { FileText, BarChart3, Search, PenTool, Send } from "lucide-react";

const ACCENT_COLOR = "#06B6D4";

const serviceTags: ServiceTag[] = [{
  label: "Market Analysis"
}, {
  label: "Competitor Research"
}, {
  label: "Trend Reports"
}, {
  label: "Investment Thesis"
}, {
  label: "Media Distribution"
}, {
  label: "KOL Amplification"
}];

const stats: ServiceStat[] = [{
  value: 47,
  label: "Research Reports Delivered",
  suffix: ""
}, {
  value: 12,
  label: "Media Distribution Partners",
  suffix: ""
}, {
  value: 850,
  label: "Avg. Report Impressions",
  suffix: "K+"
}, {
  value: 3.2,
  label: "Avg. Engagement Rate",
  suffix: "%"
}];

const processSteps: ProcessStep[] = [{
  number: "01",
  title: "Discovery",
  description: "We learn your tech and what you want to prove to the market.",
  icon: Search
}, {
  number: "02",
  title: "Analysis",
  description: "Our analysts dig into the data, specific to the Korean ecosystem.",
  icon: BarChart3
}, {
  number: "03",
  title: "Creation",
  description: "We turn complex data into beautiful, easy-to-read reports (KR/EN).",
  icon: PenTool
}, {
  number: "04",
  title: "Distribution",
  description: "We hit the 'Go' button on our network to maximize your brand authority.",
  icon: Send
}];


const deliverables: Deliverable[] = [{
  title: "The Research Suite",
  items: ["Market Entry Thesis: Your playbook for winning in Korea", "Competitor Decks: Know who you're up against and how to beat them", "Tokenomics Review: A technical health check on your project's economy"]
}, {
  title: "The Distribution Engine",
  items: ["Media Placement: Getting your research onto the screens of Korea's biggest crypto news sites", "KOL Review Threads: Influential voices breaking down your tech in easy-to-read threads", "Executive Briefings: High-level summaries for your VCs, partners, and stakeholders"]
}, {
  title: "Always On Support",
  items: ["Monthly Alpha: Regular updates on local trends before they go global", "Quarterly Deep Dives: Keeping your strategy fresh as the market evolves"]
}];

const faqItems: FAQItem[] = [{
  question: "What makes your research different?",
  answer: "We don't do generic summaries. We combine on-chain data with local market sentiment that you won't find on Google. It's 'boots-on-the-ground' intelligence."
}, {
  question: "Can you write in both Korean and English?",
  answer: "Yes. Every report is crafted to be native in both languages, ensuring your global team and local Korean community are on the same page."
}, {
  question: "How do you ensure people actually read the research?",
  answer: "Distribution is key. We don't just dump a PDF; we create snippets, threads, and media articles that make the research digestible and viral."
}, {
  question: "How long does a full report take?",
  answer: "Usually around 2 to 4 weeks, depending on the complexity of the data we're diving into."
}];


const DeepResearchService = () => {
  usePageMeta({
    canonicalPath: "/services/deep-research",
    title: "Korea Crypto Research & Web3 Market Intelligence",
    description: "Deep dive into Korean crypto trends with our proprietary AI-powered intelligence engine. Korea's leading Web3 research agency for data-backed market entry decisions.",
    path: "/services/deep-research",
    image: "/og-image.png",
    keywords: ["Korea Web3", "Korea Crypto", "Korea Crypto Agency", "Korean Crypto Research", "Web3 Market Intelligence Korea", "On-chain Analysis Korea"]
  });

  return (
    <>
    <SEOHead
      title="Web3 Deep Research & Market Intelligence Korea | ium Labs"
      description="Data-driven Web3 market research and competitive intelligence for the Korean crypto market. Ecosystem mapping and strategic insights."
      path="/services/deep-research"
      keywords={['Web3 Research Korea', 'Crypto Market Intelligence', 'Korean Market Research Web3', 'Blockchain Analytics Korea']}
    />
    <ServicePageLayout
      serviceName="Deep Research"
      serviceTitle="Deep Research"
      serviceSubtitle="& Distribution"
      serviceDescription="Establish your authority with data-driven insights. We produce deep-dive research on the Korean market and blast it through our elite network of KOLs and media outlets to make sure your message sticks."
      serviceIcon={FileText}
      serviceTags={serviceTags}
      stats={stats}
      processSteps={processSteps}
      deliverables={deliverables}
      faqItems={faqItems}
      accentColor={ACCENT_COLOR}
      videoSrc="/videos/deep-research-hero.mp4"
      posterSrc="/images/posters/deep-research-hero.jpg"
      currentSlug="deep-research"
    />
    </>
  );
};

export default DeepResearchService;