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
  },
  {
    question: "What is TGE support and how can you help?",
    answer: "TGE (Token Generation Event) support includes pre-launch marketing, community building, exchange listing strategy, KOL campaigns, and post-launch momentum. We've helped projects raise over $500M through successful TGEs."
  },
  {
    question: "Do you help with tokenomics design?",
    answer: "Yes, our Tokenomics Consulting service includes token distribution strategy, vesting schedules, utility design, and economic modeling to ensure sustainable token economics aligned with your project goals."
  },
  {
    question: "What exchanges can you help list on?",
    answer: "We have direct partnerships with major Korean exchanges (Upbit, Bithumb, Coinone) and global exchanges (Binance, KuCoin, Bybit, OKX). Our team handles the full listing process from application to launch marketing."
  },
  {
    question: "How do you handle VASP compliance in Korea?",
    answer: "We guide projects through Korea's VASP (Virtual Asset Service Provider) regulations, including compliance documentation, legal consultation, and ongoing regulatory monitoring to ensure full compliance with Korean crypto laws."
  }
];

const FAQSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="py-10 sm:py-14">
      <div className="px-4 sm:px-6 lg:px-10 max-w-4xl mx-auto">
        <h2 className={`text-xl sm:text-2xl font-bold text-white mb-8 sm:mb-10 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          FAQ
        </h2>

        <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-white/[0.06] rounded-xl px-5 sm:px-6 data-[state=open]:border-white/[0.12] transition-colors bg-white/[0.02]"
              >
                <AccordionTrigger className="text-left text-sm sm:text-[15px] font-semibold text-white/80 hover:text-white transition-colors py-4 sm:py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/40 pb-5 text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
