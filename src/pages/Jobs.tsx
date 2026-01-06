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
import { ArrowRight, Users, TrendingUp, Globe, Award, Briefcase, GraduationCap, Clock, Wallet, BookOpen, Coffee } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import CTABannerSection from "@/components/CTABannerSection";
import FooterLinksSection from "@/components/FooterLinksSection";
import FloatingContactButton from "@/components/FloatingContactButton";
import MediaPartnersSection from "@/components/MediaPartnersSection";

// Import assets
import teamPhoto from "@/assets/team-photo.png";

const applicationSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요"),
  email: z.string().email("유효한 이메일을 입력해주세요"),
  phone: z.string().optional(),
  telegram: z.string().optional(),
  linkedinUrl: z.string().optional(),
  portfolioUrl: z.string().optional(),
  position: z.string().min(1, "포지션을 선택해주세요"),
  coverLetter: z.string().optional(),
  privacyAgreed: z.literal(true, {
    errorMap: () => ({ message: "개인정보처리방침에 동의해주세요" }),
  }),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const stats = [
  { number: "3+", label: "Years in Web3 Korea", icon: Clock },
  { number: "50+", label: "Projects Delivered", icon: Briefcase },
  { number: "100+", label: "KOL Network", icon: Users },
  { number: "10+", label: "Team Members", icon: Award },
];

const positions = [
  { 
    emoji: "🔍", 
    title: "Researcher", 
    description: "Web3 시장 리서치 및 심층 분석을 담당합니다. 블록체인 생태계의 최신 트렌드를 파악하고 인사이트를 도출합니다.",
    tags: ["Market Research", "Data Analysis", "Report Writing"]
  },
  { 
    emoji: "📈", 
    title: "Growth Manager", 
    description: "글로벌 Web3 프로젝트의 한국 시장 진출 전략을 수립하고 실행합니다. 커뮤니티 빌딩과 마케팅을 리드합니다.",
    tags: ["GTM Strategy", "Community", "Marketing"]
  },
  { 
    emoji: "💼", 
    title: "Open Position", 
    description: "위 포지션 외에도 Web3에 대한 열정이 있다면 자유롭게 지원해주세요. 다양한 역할을 함께 만들어갑니다.",
    tags: ["Web3 Passion", "Self-Driven", "Creative"]
  },
];

const benefits = [
  { icon: Globe, title: "글로벌 프로젝트", text: "글로벌 Web3 프로젝트와의 협업 기회" },
  { icon: Clock, title: "유연한 근무", text: "유연한 원격근무 환경과 자율적인 업무 시간" },
  { icon: Wallet, title: "경쟁력 있는 보상", text: "경쟁력 있는 보상과 성과 인센티브" },
  { icon: BookOpen, title: "성장 지원", text: "지속적인 학습과 성장 지원" },
  { icon: Coffee, title: "팀 문화", text: "수평적이고 자유로운 팀 문화" },
  { icon: GraduationCap, title: "멘토링", text: "시니어 멤버의 1:1 멘토링 제공" },
];

const process = [
  { step: "01", title: "APPLICATION", description: "서류 심사" },
  { step: "02", title: "INTERVIEW", description: "화상 인터뷰" },
  { step: "03", title: "TASK", description: "실무 과제" },
  { step: "04", title: "OFFER", description: "최종 합류" },
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

      toast.success("지원서가 성공적으로 제출되었습니다!");
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
      toast.error("지원서 제출 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const buildForMarquee = "Build For ".repeat(20);

  return (
    <div className="min-h-screen bg-surface-base flex flex-col">
      <Navbar />

      {/* Hero Section - Ium Labs Style */}
      <main className="p-0.5 sm:p-1 md:p-2 bg-surface-base" id="hero">
        <div className="rounded-xl sm:rounded-2xl overflow-hidden">
          <div className="relative min-h-[calc(100vh-2rem)] flex flex-col justify-center overflow-hidden rounded-2xl sm:rounded-3xl bg-surface-odd">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} />
            
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
                  글로벌 Web3 프로젝트와 한국 시장을 연결하는<br />
                  데이터 기반 리서치 & GTM 마케팅 에이전시
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
                    이음 랩스는 글로벌 Web3 프로젝트의 한국 시장 진출을 돕는 전문 에이전시입니다. 
                    데이터 기반의 리서치와 전략적인 GTM 마케팅을 통해 프로젝트의 성공적인 한국 시장 정착을 지원합니다.
                  </p>
                  <p className="text-white/60 leading-relaxed">
                    "이음"이라는 이름처럼, 우리는 글로벌과 로컬을 연결하는 다리 역할을 합니다.
                    열정적인 팀원들과 함께 Web3의 미래를 만들어가고 싶다면, 지금 합류하세요.
                  </p>
                </div>
                <div className="relative">
                  <img
                    src={teamPhoto}
                    alt="Ium Labs Team"
                    className="w-full h-auto rounded-2xl object-cover"
                  />
                  <div className="absolute -bottom-3 -right-3 w-full h-full bg-white/5 rounded-2xl -z-10" />
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

      {/* 02. Stats Section */}
      <section className="bg-surface-odd" id="stats">
        <div className="border-t border-white/10">
          <AnimatedSection>
            <div className="flex items-baseline justify-between p-4 md:px-10 md:py-4 border-b border-white/10">
              <div className="flex items-baseline gap-6 md:gap-10">
                <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">02</span>
                <h2 className="text-lg md:text-xl font-medium text-white">Stats</h2>
              </div>
              <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Our Numbers</span>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={100}>
            <div className="px-4 md:px-10 py-10 md:py-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={idx}
                      className="relative bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 group hover:bg-white/10 transition-colors"
                    >
                      <Icon className="w-5 h-5 text-white/30 mb-4" />
                      <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                        {stat.number}
                      </p>
                      <p className="text-sm md:text-base text-white/50">
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 03. Positions Section */}
      <section className="bg-surface-even" id="positions">
        <div className="border-t border-white/10">
          <AnimatedSection>
            <div className="flex items-baseline justify-between p-4 md:px-10 md:py-4 border-b border-white/10">
              <div className="flex items-baseline gap-6 md:gap-10">
                <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">03</span>
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
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col group hover:bg-white/10 hover:border-white/20 transition-all"
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
                    <a
                      href="#apply"
                      className="inline-flex items-center gap-2 text-white font-medium group-hover:text-white/80 transition-colors"
                    >
                      Apply Now
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
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
                <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">04</span>
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
                <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">05</span>
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
                <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">06</span>
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
                  평일 기준 24시간 이내에 연락드립니다.<br />
                  입력하신 정보는 채용 목적으로만 사용됩니다.
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
                      <SelectItem value="Other" className="text-white">Other / 자유지원</SelectItem>
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
                      개인정보처리방침에 동의합니다 *
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 h-auto text-lg bg-white text-black hover:bg-white/90 rounded-full font-semibold mt-6"
                  >
                    {isSubmitting ? "제출 중..." : "Submit Application"}
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
    </div>
  );
};

export default Jobs;
