import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { Users, Megaphone, Building2, Mic2, Newspaper, Calendar, ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
const services = [{
  icon: Users,
  title: "KOL Marketing",
  description: "Access 1000+ vetted Korean crypto influencers across YouTube, Twitter, and Telegram",
  fullDescription: "Partner with Korea's top crypto influencers to amplify your project's reach. We manage relationships with 1,000+ verified KOLs across Twitter, YouTube, and Korean platforms like Naver.",
  features: ["Access to 1,000+ vetted Korean crypto KOLs", "YouTube, Twitter, Telegram, Naver coverage", "Performance tracking & analytics", "Campaign strategy & execution"],
  size: "large"
}, {
  icon: Megaphone,
  title: "Community Operation",
  description: "24/7 Korean community management with native speakers",
  fullDescription: "Build a thriving Korean community from scratch or enhance your existing presence. We handle everything from platform setup to 24/7 Korean moderation across Telegram, Discord, and KakaoTalk.",
  features: ["24/7 Korean native moderation", "Telegram, Discord, KakaoTalk management", "Community engagement programs", "Sentiment analysis & reporting"],
  size: "normal"
}, {
  icon: Building2,
  title: "Exchange Support",
  description: "VASP compliance and CEX/DEX listing support",
  fullDescription: "Get compliant in Korea's regulated crypto market. We guide you through VASP registration, AML/KYC requirements, and ongoing compliance obligations.",
  features: ["VASP registration guidance", "CEX & DEX listing support", "AML/KYC compliance setup", "Regulatory consulting"],
  size: "normal"
}, {
  icon: Newspaper,
  title: "Media & PR",
  description: "Coverage in top Korean crypto media outlets",
  fullDescription: "Secure coverage in leading Korean crypto publications and mainstream media. From press releases to exclusive interviews, we handle your complete Korean media strategy.",
  features: ["50+ Korean media partnerships", "Press release distribution", "Exclusive interview placements", "Crisis management"],
  size: "normal"
}, {
  icon: Mic2,
  title: "AMA Hosting",
  description: "Live AMAs with Korean communities",
  fullDescription: "Engage directly with Korean crypto communities through professionally hosted AMAs. We handle everything from scheduling to live translation and community engagement.",
  features: ["Professional AMA hosting", "Live Korean translation", "Community Q&A management", "Post-AMA content creation"],
  size: "normal"
}, {
  icon: Calendar,
  title: "Offline Events",
  description: "Side events, meetups, and conference presence in Seoul",
  fullDescription: "Make an impact at major Korean blockchain events or host your own. We manage everything from booth setup to VIP networking events and speaker placements.",
  features: ["Conference booth management", "Side event organization", "VIP networking events", "Speaker placement"],
  size: "large"
}];
const ServicesSection = () => {
  const {
    ref,
    isVisible
  } = useScrollAnimation();
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  return <div ref={ref} className="px-4 bg-[#F8F8F8] py-[20px]">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left - Vertical Title */}
          <div className={`lg:col-span-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="lg:sticky lg:top-32">
              <span className="inline-flex items-center gap-2 text-xs font-medium text-primary mb-4 tracking-widest uppercase">
                <span className="w-8 h-px bg-primary" />
                What We Do
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Our <span className="text-primary">Services</span>
              </h2>
              <p className="text-gray-600 mb-8 max-w-sm">
                End-to-end Web3 marketing solutions tailored for the Korean market
              </p>
              <Link to="/services" className="group inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                Explore all services
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right - Bento Grid with Unified Card Style */}
          <div className="lg:col-span-9">
            <div className="grid md:grid-cols-2 gap-4">
              {services.map((service, index) => <div key={index} onClick={() => setSelectedService(service)} className={`group relative p-8 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:border-primary/40 hover:-translate-y-1 transition-all duration-500 cursor-pointer ${service.size === 'large' ? 'md:col-span-2' : ''} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
              transitionDelay: `${index * 100}ms`
            }}>
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                  {/* Icon */}
                  <div className="relative w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                    <service.icon className="w-7 h-7 text-primary transition-all duration-300" />
                  </div>

                  {/* Content */}
                  <h3 className="relative text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="relative text-gray-600 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Hover Arrow */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-5 h-5 text-primary" />
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="bg-[hsl(0,0%,6%)] border-white/[0.08] text-white max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-4 mb-4">
              {selectedService && <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <selectedService.icon className="w-7 h-7 text-primary" />
                </div>}
              <DialogTitle className="text-2xl font-bold">{selectedService?.title}</DialogTitle>
            </div>
          </DialogHeader>
          
          <p className="text-white/60 leading-relaxed mb-6">
            {selectedService?.fullDescription}
          </p>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-primary uppercase tracking-wider">What's Included</h4>
            <ul className="space-y-2">
              {selectedService?.features.map((feature, i) => <li key={i} className="flex items-start gap-3 text-white/50">
                  <span className="text-primary mt-1">•</span>
                  {feature}
                </li>)}
            </ul>
          </div>

          <div className="mt-6 pt-6 border-t border-white/[0.08]">
            <Link to="/contact" className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl transition-colors" onClick={() => setSelectedService(null)}>
              Get Started
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>;
};
export default ServicesSection;