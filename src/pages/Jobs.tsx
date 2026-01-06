import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { usePageMeta } from "@/hooks/usePageMeta";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRight, Users, TrendingUp, Globe, Award, Briefcase, GraduationCap, Clock, Wallet, BookOpen, Coffee, MapPin, DollarSign } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import CTABannerSection from "@/components/CTABannerSection";
import FooterLinksSection from "@/components/FooterLinksSection";
import FloatingContactButton from "@/components/FloatingContactButton";
import MediaPartnersSection from "@/components/MediaPartnersSection";

// Import components
import Logo3D from "@/components/Logo3D";

const applicationSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  telegram: z.string().optional(),
  linkedinUrl: z.string().optional(),
  portfolioUrl: z.string().optional(),
  position: z.string().min(1, "Please select a position"),
  coverLetter: z.string().optional(),
  privacyAgreed: z.literal(true, {
    errorMap: () => ({ message: "Please agree to the privacy policy" }),
  }),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const positions = [
  { 
    emoji: "🔍", 
    title: "Researcher", 
    description: "Responsible for Web3 market research and in-depth analysis. Identify the latest trends in the blockchain ecosystem and derive insights.",
    tags: ["Market Research", "Data Analysis", "Report Writing"],
    salary: "₩50M - 70M / year",
    workType: "Hybrid (Seoul Office + Remote)",
    jobDescription: [
      "Conduct comprehensive Web3 market trends and project research",
      "Write data-driven analysis reports and investment theses",
      "Derive actionable insights from blockchain ecosystem data",
      "Monitor and analyze on-chain metrics and market signals",
      "Collaborate with Growth team to identify strategic opportunities"
    ],
    qualifications: [
      "Deep understanding of Web3, DeFi, and blockchain technology",
      "Experience in data analysis and research methodology",
      "Strong written and verbal communication skills in English",
      "Proficiency in data tools (Dune, Flipside, etc.) is a plus",
      "Self-motivated with attention to detail"
    ]
  },
  { 
    emoji: "📈", 
    title: "Growth Manager", 
    description: "Develop and execute strategies for global Web3 projects entering the Korean market. Lead community building and marketing efforts.",
    tags: ["GTM Strategy", "Community", "Marketing"],
    salary: "₩60M - 90M / year",
    workType: "Hybrid (Seoul Office + Remote)",
    jobDescription: [
      "Develop and execute GTM strategies for Korean market entry",
      "Build and manage Korean crypto communities (Discord, Telegram, KakaoTalk)",
      "Coordinate KOL partnerships and influencer campaigns",
      "Plan and execute offline events, meetups, and conferences",
      "Manage relationships with local exchanges and media partners"
    ],
    qualifications: [
      "3+ years experience in Web3 marketing or community management",
      "Native Korean with strong English communication skills",
      "Proven track record in community building and growth",
      "Strong network within Korean crypto ecosystem",
      "Experience with crypto marketing tools and analytics"
    ]
  },
  { 
    emoji: "💼", 
    title: "Open Position", 
    description: "If you have passion for Web3, feel free to apply. We create various roles together with talented individuals.",
    tags: ["Web3 Passion", "Self-Driven", "Creative"],
    salary: "Negotiable",
    workType: "Flexible (Remote-first)",
    jobDescription: [
      "We're always looking for exceptional talent",
      "Tell us what you're passionate about and how you can contribute",
      "Shape your own role based on your unique skills",
      "Work on cutting-edge Web3 projects in Korea"
    ],
    qualifications: [
      "Genuine passion for Web3 and blockchain technology",
      "Self-driven with strong initiative",
      "Creative problem-solving abilities",
      "Ability to work in a fast-paced startup environment",
      "Open to learning and adapting quickly"
    ]
  },
];

const benefits = [
  { icon: Globe, title: "Global Projects", text: "Opportunities to collaborate with global Web3 projects" },
  { icon: Clock, title: "Flexible Work", text: "Flexible remote work environment and autonomous working hours" },
  { icon: Wallet, title: "Competitive Compensation", text: "Competitive salary and performance incentives" },
  { icon: BookOpen, title: "Growth Support", text: "Continuous learning and professional development support" },
  { icon: Coffee, title: "Team Culture", text: "Horizontal and open team culture" },
  { icon: GraduationCap, title: "Mentoring", text: "1:1 mentoring from senior team members" },
];

const process = [
  { step: "01", title: "APPLICATION", description: "Resume Review" },
  { step: "02", title: "INTERVIEW", description: "Video Interview" },
  { step: "03", title: "TASK", description: "Practical Assignment" },
  { step: "04", title: "OFFER", description: "Final Offer" },
];

const Jobs = () => {
  usePageMeta({
    title: "Careers | Ium Labs - Join Our Web3 Team",
    description: "Join Ium Labs and shape the future of Web3 in Korea. We're looking for passionate Researchers and Growth Managers.",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    telegram: "",
    linkedinUrl: "",
    portfolioUrl: "",
    position: "",
    coverLetter: "",
    privacyAgreed: false as boolean,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<typeof positions[0] | null>(null);

  const handleInputChange = (field: keyof ApplicationFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = applicationSchema.safeParse(formData);
    if (!result.success) {
      const firstError = result.error.errors[0];
      toast.error(firstError.message);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("job_applications").insert({
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone || null,
        telegram: result.data.telegram || null,
        linkedin_url: result.data.linkedinUrl || null,
        portfolio_url: result.data.portfolioUrl || null,
        position: result.data.position,
        cover_letter: result.data.coverLetter || null,
      });

      if (error) throw error;

      toast.success("Your application has been submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        telegram: "",
        linkedinUrl: "",
        portfolioUrl: "",
        position: "",
        coverLetter: "",
        privacyAgreed: false,
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("An error occurred while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const buildForMarquee = "Build For ".repeat(20);

  return (
    <div className="min-h-screen bg-surface-base flex flex-col">
      <Navbar />

      {/* Hero Section with Video Background */}
      <main className="p-0.5 sm:p-1 md:p-2 bg-surface-base" id="hero">
        <div className="rounded-xl sm:rounded-2xl overflow-hidden">
          <div className="relative min-h-[calc(100vh-2rem)] flex flex-col justify-center overflow-hidden rounded-2xl sm:rounded-3xl bg-surface-odd">
            {/* Video Background */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/jobs-hero.mp4" type="video/mp4" />
            </video>
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60" />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface-odd/80" />
            
            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 text-center">
              <AnimatedSection>
                <span className="inline-block text-xs md:text-sm text-white/50 tracking-[0.3em] uppercase mb-6">
                  Join Our Team
                </span>
              </AnimatedSection>
              
              <AnimatedSection delay={100}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
                  Join Ium Labs
                </h1>
              </AnimatedSection>
              
              <AnimatedSection delay={200}>
                <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
                  Data-driven research & GTM marketing agency<br />
                  bridging global Web3 projects with the Korean market
                </p>
              </AnimatedSection>
              
              <AnimatedSection delay={300}>
                <a
                  href="#apply"
                  className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-colors"
                >
                  Apply Now
                  <ArrowRight className="w-5 h-5" />
                </a>
              </AnimatedSection>
            </div>
            
            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2"
              >
                <div className="w-1 h-2 bg-white/40 rounded-full" />
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* 01. About Section */}
      <section className="bg-surface-odd" id="about">
        <div className="border-t border-white/10">
          <AnimatedSection>
            <div className="flex items-baseline justify-between p-4 md:px-10 md:py-4 border-b border-white/10">
              <div className="flex items-baseline gap-6 md:gap-10">
                <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">01</span>
                <h2 className="text-lg md:text-xl font-medium text-white">About</h2>
              </div>
              <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Who We Are</span>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={100}>
            <div className="px-4 md:px-10 py-10 md:py-16">
              <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                    We bridge global Web3 projects with the Korean market
                  </h3>
                  <p className="text-white/60 leading-relaxed mb-6">
                    Ium Labs is a specialized agency helping global Web3 projects enter the Korean market. 
                    Through data-driven research and strategic GTM marketing, we support projects in successfully establishing their presence in Korea.
                  </p>
                  <p className="text-white/60 leading-relaxed">
                    True to our name "Ium" (meaning "connection" in Korean), we serve as a bridge between global and local markets.
                    If you want to build the future of Web3 with our passionate team, join us now.
                  </p>
                </div>
                <div className="relative h-64 md:h-80 lg:h-96">
                  <Logo3D className="w-full h-full" />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Media Partners Marquee - No Header */}
      <section className="bg-surface-even" id="partners">
        <AnimatedSection direction="none">
          <MediaPartnersSection />
        </AnimatedSection>
      </section>

      {/* 02. Positions Section */}
      <section className="bg-surface-even" id="positions">
        <div className="border-t border-white/10">
          <AnimatedSection>
            <div className="flex items-baseline justify-between p-4 md:px-10 md:py-4 border-b border-white/10">
              <div className="flex items-baseline gap-6 md:gap-10">
                <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">02</span>
                <h2 className="text-lg md:text-xl font-medium text-white">Positions</h2>
              </div>
              <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Open Roles</span>
            </div>
          </AnimatedSection>

          {/* Build For Marquee */}
          <div className="overflow-hidden border-b border-white/10 py-6 md:py-8">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="flex whitespace-nowrap"
            >
              {buildForMarquee.split("Build For ").map((_, idx) => (
                <span
                  key={idx}
                  className={`text-4xl md:text-6xl font-bold tracking-tight mr-8 ${
                    idx % 2 === 0 ? "text-white" : "text-white/20"
                  }`}
                >
                  Build For{" "}
                </span>
              ))}
            </motion.div>
          </div>
          
          <AnimatedSection delay={100}>
            <div className="px-4 md:px-10 py-10 md:py-16">
              <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                {positions.map((pos, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedPosition(pos)}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col group hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
                  >
                    <span className="text-4xl mb-4">{pos.emoji}</span>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {pos.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed flex-1 mb-6">
                      {pos.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {pos.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="text-xs text-white/40 px-2 py-1 border border-white/10 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-2 text-white font-medium group-hover:text-white/80 transition-colors">
                      View Details
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 04. Benefits Section */}
      <section className="bg-surface-odd" id="benefits">
        <div className="border-t border-white/10">
          <AnimatedSection>
            <div className="flex items-baseline justify-between p-4 md:px-10 md:py-4 border-b border-white/10">
              <div className="flex items-baseline gap-6 md:gap-10">
                <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">03</span>
                <h2 className="text-lg md:text-xl font-medium text-white">Benefits</h2>
              </div>
              <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">What You Get</span>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={100}>
            <div className="px-4 md:px-10 py-10 md:py-16">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {benefits.map((benefit, idx) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 group hover:bg-white/10 transition-colors"
                    >
                      <Icon className="w-6 h-6 text-white/40 mb-4" />
                      <h4 className="text-sm md:text-base font-semibold text-white mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-white/50 text-sm leading-relaxed">
                        {benefit.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 05. Process Section */}
      <section className="bg-surface-even" id="process">
        <div className="border-t border-white/10">
          <AnimatedSection>
            <div className="flex items-baseline justify-between p-4 md:px-10 md:py-4 border-b border-white/10">
              <div className="flex items-baseline gap-6 md:gap-10">
                <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">04</span>
                <h2 className="text-lg md:text-xl font-medium text-white">Process</h2>
              </div>
              <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">How It Works</span>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={100}>
            <div className="px-4 md:px-10 py-10 md:py-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {process.map((step, idx) => (
                  <div
                    key={idx}
                    className="relative bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 text-center group hover:bg-white/10 transition-colors"
                  >
                    <span className="text-3xl md:text-4xl font-bold text-white/20 block mb-2">
                      {step.step}
                    </span>
                    <h4 className="text-sm md:text-base font-semibold text-white mb-2">
                      {step.title}
                    </h4>
                    <p className="text-white/50 text-xs md:text-sm">
                      {step.description}
                    </p>
                    
                    {/* Connector Line */}
                    {idx < process.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-white/10" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 06. Apply Section */}
      <section className="bg-surface-odd" id="apply">
        <div className="border-t border-white/10">
          <AnimatedSection>
            <div className="flex items-baseline justify-between p-4 md:px-10 md:py-4 border-b border-white/10">
              <div className="flex items-baseline gap-6 md:gap-10">
                <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">05</span>
                <h2 className="text-lg md:text-xl font-medium text-white">Apply</h2>
              </div>
              <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Join Us</span>
            </div>
          </AnimatedSection>

          {/* Apply Now Marquee */}
          <div className="overflow-hidden bg-white py-4 md:py-5">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="flex whitespace-nowrap"
            >
              <span className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                {"Apply Now · ".repeat(12)}
              </span>
              <span className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                {"Apply Now · ".repeat(12)}
              </span>
            </motion.div>
          </div>
          
          <AnimatedSection delay={100}>
            <div className="px-4 md:px-10 py-10 md:py-16">
              <div className="max-w-4xl mx-auto">
                <p className="text-center text-white/50 text-sm md:text-base mb-10 leading-relaxed">
                  We will contact you within 24 hours on business days.<br />
                  The information you provide will only be used for recruitment purposes.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Row 1: Name, Email, Phone */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <Input
                      placeholder="Name *"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="bg-white/5 border-white/10 h-14 rounded-xl text-base text-white placeholder:text-white/30 focus:border-white/30"
                    />
                    <Input
                      type="email"
                      placeholder="Email *"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-white/5 border-white/10 h-14 rounded-xl text-base text-white placeholder:text-white/30 focus:border-white/30"
                    />
                    <Input
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="bg-white/5 border-white/10 h-14 rounded-xl text-base text-white placeholder:text-white/30 focus:border-white/30"
                    />
                  </div>

                  {/* Row 2: Telegram, LinkedIn, Portfolio */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <Input
                      placeholder="Telegram"
                      value={formData.telegram}
                      onChange={(e) => handleInputChange("telegram", e.target.value)}
                      className="bg-white/5 border-white/10 h-14 rounded-xl text-base text-white placeholder:text-white/30 focus:border-white/30"
                    />
                    <Input
                      placeholder="LinkedIn / Twitter URL"
                      value={formData.linkedinUrl}
                      onChange={(e) => handleInputChange("linkedinUrl", e.target.value)}
                      className="bg-white/5 border-white/10 h-14 rounded-xl text-base text-white placeholder:text-white/30 focus:border-white/30"
                    />
                    <Input
                      placeholder="Portfolio URL"
                      value={formData.portfolioUrl}
                      onChange={(e) => handleInputChange("portfolioUrl", e.target.value)}
                      className="bg-white/5 border-white/10 h-14 rounded-xl text-base text-white placeholder:text-white/30 focus:border-white/30"
                    />
                  </div>

                  {/* Row 3: Position Select */}
                  <Select
                    value={formData.position}
                    onValueChange={(value) => handleInputChange("position", value)}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 h-14 rounded-xl text-base text-white">
                      <SelectValue placeholder="Select a position *" />
                    </SelectTrigger>
                    <SelectContent className="bg-surface-odd border-white/10">
                      <SelectItem value="Researcher" className="text-white">Researcher</SelectItem>
                      <SelectItem value="Growth Manager" className="text-white">Growth Manager</SelectItem>
                      <SelectItem value="Other" className="text-white">Other / Open Application</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Row 4: Cover Letter */}
                  <Textarea
                    placeholder="Tell us about yourself and why you want to join Ium Labs..."
                    value={formData.coverLetter}
                    onChange={(e) => handleInputChange("coverLetter", e.target.value)}
                    className="bg-white/5 border-white/10 min-h-[200px] rounded-xl text-base text-white placeholder:text-white/30 focus:border-white/30 resize-none"
                  />

                  {/* Privacy Checkbox */}
                  <div className="flex items-center gap-3 pt-2">
                    <Checkbox
                      id="privacy"
                      checked={formData.privacyAgreed}
                      onCheckedChange={(checked) => handleInputChange("privacyAgreed", checked as boolean)}
                      className="h-5 w-5 border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-black"
                    />
                    <label
                      htmlFor="privacy"
                      className="text-sm text-white/50 cursor-pointer"
                    >
                      I agree to the privacy policy *
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 h-auto text-lg bg-white text-black hover:bg-white/90 rounded-full font-semibold mt-6"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Banner */}
      <AnimatedSection direction="none">
        <CTABannerSection />
      </AnimatedSection>

      {/* Footer Links */}
      <FooterLinksSection />

      {/* Footer */}
      <Footer />

      <FloatingContactButton />

      {/* Position Detail Dialog */}
      <Dialog open={!!selectedPosition} onOpenChange={(open) => !open && setSelectedPosition(null)}>
        <DialogContent className="bg-gradient-to-b from-surface-odd to-surface-base border-white/10 max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
          {selectedPosition && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <motion.span 
                    className="text-6xl"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  >
                    {selectedPosition.emoji}
                  </motion.span>
                  <div>
                    <DialogTitle className="text-2xl md:text-3xl font-bold text-white">
                      {selectedPosition.title}
                    </DialogTitle>
                    <p className="text-white/50 text-sm mt-1">{selectedPosition.description}</p>
                  </div>
                </div>

                {/* Salary & Work Type Pills */}
                <motion.div 
                  className="flex flex-wrap gap-3 mt-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm font-medium">{selectedPosition.salary}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-2 rounded-full">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">{selectedPosition.workType}</span>
                  </div>
                </motion.div>

                {/* Tags */}
                <motion.div 
                  className="flex flex-wrap gap-2 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {selectedPosition.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-white/50 px-3 py-1 bg-white/5 border border-white/10 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </DialogHeader>

              <div className="space-y-6 mt-8">
                {/* Job Description */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="bg-white/5 rounded-2xl p-6 border border-white/10"
                >
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-white/70" />
                    </div>
                    Job Description
                  </h4>
                  <ul className="space-y-3">
                    {selectedPosition.jobDescription.map((item, idx) => (
                      <motion.li 
                        key={idx} 
                        className="text-white/60 text-sm flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + idx * 0.05 }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 flex-shrink-0" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Qualifications */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="bg-white/5 rounded-2xl p-6 border border-white/10"
                >
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-white/70" />
                    </div>
                    Qualifications
                  </h4>
                  <ul className="space-y-3">
                    {selectedPosition.qualifications.map((item, idx) => (
                      <motion.li 
                        key={idx} 
                        className="text-white/60 text-sm flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + idx * 0.05 }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 flex-shrink-0" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Apply Button */}
                <motion.a
                  href="#apply"
                  onClick={() => {
                    setSelectedPosition(null);
                    handleInputChange("position", selectedPosition.title === "Open Position" ? "Other" : selectedPosition.title);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-[0.98] mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}
                >
                  Apply for this Position
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Jobs;
