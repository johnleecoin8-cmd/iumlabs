import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const faqs = [
  {
    question: "What is Web3 marketing?",
    answer: "Web3 marketing specializes in blockchain, cryptocurrency, NFT, and DeFi projects. It includes community building, influencer marketing, PR, and social media management tailored specifically for the Web3 ecosystem."
  },
  {
    question: "How long does a marketing campaign take?",
    answer: "Campaign duration varies based on project scope and goals. Typically, initial setup takes 1-2 weeks, with active campaigns running 1-3 months. We recommend 6+ months for sustainable community growth."
  },
  {
    question: "What types of projects do you work with?",
    answer: "We work with NFT collections, DeFi protocols, GameFi/P2E games, Layer 1/Layer 2 blockchains, crypto exchanges, DAOs, and more. We also welcome global projects looking to enter the Korean market."
  },
  {
    question: "How much does marketing cost?",
    answer: "Pricing depends on project scope, goals, and required services. We provide custom quotes after a free consultation to analyze your project and recommend the optimal package."
  },
  {
    question: "How do you measure success?",
    answer: "We track community growth rate, social media engagement, website traffic, conversion rates, PR exposure, and more. We provide transparent weekly/monthly reports sharing quantifiable results."
  },
  {
    question: "Do you offer Korea-specific services?",
    answer: "Yes, we specialize in Korean market entry with localized marketing across KakaoTalk, Naver Blog, Korean crypto media, and local KOL networks. We also provide Korean community management."
  }
];

const FAQSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 px-4 bg-card/30">
      <div className="container mx-auto max-w-4xl">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-xs font-medium text-primary mb-4 block tracking-widest uppercase">
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 uppercase tracking-tight">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
        </div>

        <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border/30 rounded-xl px-6 data-[state=open]:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-left text-base font-semibold hover:text-primary transition-colors py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
