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
import { ArrowRight } from "lucide-react";

// Import logos
import polygonLogo from "@/assets/logos/polygon.svg";
import storyLogo from "@/assets/logos/story-protocol.png";
import ondoLogo from "@/assets/logos/ondo.svg";
import peaqLogo from "@/assets/logos/peaq.png";
import kucoinLogo from "@/assets/logos/kucoin.png";
import bybitLogo from "@/assets/logos/bybit.png";
import mantraLogo from "@/assets/logos/mantra.png";
import megaethLogo from "@/assets/logos/megaeth.png";
import zkpassLogo from "@/assets/logos/zkpass.png";
import saharaLogo from "@/assets/logos/sahara-ai.png";
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

const clientLogos = [
  { src: polygonLogo, alt: "Polygon" },
  { src: storyLogo, alt: "Story Protocol" },
  { src: ondoLogo, alt: "Ondo Finance" },
  { src: peaqLogo, alt: "Peaq" },
  { src: kucoinLogo, alt: "KuCoin" },
  { src: bybitLogo, alt: "Bybit" },
  { src: mantraLogo, alt: "Mantra" },
  { src: megaethLogo, alt: "MegaETH" },
  { src: zkpassLogo, alt: "zkPass" },
  { src: saharaLogo, alt: "Sahara AI" },
];

const stats = [
  { number: "3+", label: "Years in Web3 Korea", index: "01." },
  { number: "50+", label: "Projects Delivered", index: "02." },
  { number: "100+", label: "KOL Network", index: "03." },
  { number: "10+", label: "Team Members", index: "04." },
];

const positions = [
  { 
    emoji: "🔍", 
    title: "Researcher", 
    description: "Web3 시장 리서치 및 심층 분석을 담당합니다. 블록체인 생태계의 최신 트렌드를 파악하고 인사이트를 도출합니다." 
  },
  { 
    emoji: "📈", 
    title: "Growth Manager", 
    description: "글로벌 Web3 프로젝트의 한국 시장 진출 전략을 수립하고 실행합니다. 커뮤니티 빌딩과 마케팅을 리드합니다." 
  },
  { 
    emoji: "💼", 
    title: "Open Position", 
    description: "위 포지션 외에도 Web3에 대한 열정이 있다면 자유롭게 지원해주세요. 다양한 역할을 함께 만들어갑니다." 
  },
];

const benefits = [
  { text: "유연한 원격근무 환경과 자율적인 업무 시간" },
  { text: "글로벌 Web3 프로젝트와의 협업 기회" },
  { text: "경쟁력 있는 보상과 성과 인센티브" },
  { text: "지속적인 학습과 성장 지원" },
];

const process = [
  { step: "01", title: "APPLICATION", above: "지원서 검토", below: "서류 심사" },
  { step: "02", title: "INTERVIEW", above: "화상 인터뷰", below: "팀 핏 확인" },
  { step: "03", title: "TASK", above: "실무 과제", below: "역량 평가" },
  { step: "04", title: "OFFER", above: "최종 합격", below: "온보딩 진행" },
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

  const logoMarquee = [...clientLogos, ...clientLogos];
  const buildForMarquee = "Build For ".repeat(20);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-sky-400 pt-20">
        {/* Floating decorations */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute top-40 right-20 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-white/20 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-yellow-300/30 rounded-full blur-lg" />
        
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight"
          >
            Join Ium Labs
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            글로벌 Web3 프로젝트와 한국 시장을 연결하는<br />
            데이터 기반 리서치 & GTM 마케팅 에이전시
          </motion.p>
          <motion.a
            href="#apply-now"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-colors"
          >
            Apply Now
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </div>

        {/* Logo Marquee */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm py-6 overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-16"
          >
            {logoMarquee.map((logo, idx) => (
              <img
                key={idx}
                src={logo.src}
                alt={logo.alt}
                className="h-8 md:h-10 w-auto opacity-80 brightness-0 invert"
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-28 px-6 bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative bg-muted/50 rounded-2xl p-6 md:p-8"
              >
                <span className="absolute bottom-4 left-4 text-xs text-muted-foreground font-medium">
                  {stat.index}
                </span>
                <p className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                  {stat.number}
                </p>
                <p className="text-sm md:text-base text-blue-600 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-28 px-6 bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm text-muted-foreground uppercase tracking-widest mb-4 block">
                about us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                We bridge global Web3 projects with the Korean market
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                이음 랩스는 글로벌 Web3 프로젝트의 한국 시장 진출을 돕는 전문 에이전시입니다. 
                데이터 기반의 리서치와 전략적인 GTM 마케팅을 통해 프로젝트의 성공적인 한국 시장 정착을 지원합니다.
              </p>
              <p className="text-muted-foreground leading-relaxed">
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
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-blue-500/20 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Build For Marquee + Position Cards */}
      <section className="py-20 md:py-28 bg-background">
        {/* Build For Marquee */}
        <div className="overflow-hidden mb-16">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap"
          >
            {buildForMarquee.split("Build For ").map((_, idx) => (
              <span
                key={idx}
                className={`text-5xl md:text-7xl font-bold tracking-tight mr-8 ${
                  idx % 2 === 0 ? "text-foreground" : "text-blue-500"
                }`}
              >
                Build For{" "}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Position Cards */}
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {positions.map((pos, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-muted/50 rounded-2xl p-8 flex flex-col"
              >
                <span className="text-4xl mb-4">{pos.emoji}</span>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {pos.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">
                  {pos.description}
                </p>
                <a
                  href="#apply-now"
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 md:py-28 px-6 bg-foreground">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {/* Benefit Cards */}
            {benefits.slice(0, 2).map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-foreground/80 border border-white/10 rounded-2xl p-6 md:p-8"
              >
                <p className="text-white/90 text-sm md:text-base leading-relaxed">
                  {benefit.text}
                </p>
              </motion.div>
            ))}
            
            {/* Center Title */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="col-span-2 md:col-span-1 bg-gradient-to-br from-purple-600 via-pink-500 to-amber-400 rounded-2xl p-6 md:p-8 flex items-center justify-center row-span-2 md:row-span-1 order-last md:order-none"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
                What You<br />Get
              </h2>
            </motion.div>

            {/* More Benefit Cards */}
            {benefits.slice(2).map((benefit, idx) => (
              <motion.div
                key={idx + 2}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (idx + 2) * 0.1 }}
                className="bg-foreground/80 border border-white/10 rounded-2xl p-6 md:p-8"
              >
                <p className="text-white/90 text-sm md:text-base leading-relaxed">
                  {benefit.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline Section */}
      <section className="py-20 md:py-28 px-6 bg-foreground">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            Recruitment Process
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            {process.map((step, idx) => (
              <div key={idx} className="flex flex-col md:flex-row items-center">
                {/* Step Box */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="flex flex-col items-center"
                >
                  <p className="text-white/60 text-xs mb-2">{step.above}</p>
                  <div className="bg-blue-500 rounded-full px-8 py-4 min-w-[140px] text-center">
                    <span className="text-white font-bold text-sm">
                      {step.step}. {step.title}
                    </span>
                  </div>
                  <p className="text-white/60 text-xs mt-2">{step.below}</p>
                </motion.div>

                {/* Arrow */}
                {idx < process.length - 1 && (
                  <div className="hidden md:block mx-4">
                    <ArrowRight className="w-6 h-6 text-white/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Now Section */}
      <section id="apply-now" className="py-20 md:py-28 px-6 bg-background">
        {/* Marquee Banner */}
        <div className="overflow-hidden bg-foreground text-background py-5 mb-16 -mx-6">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap"
          >
            <span className="text-3xl md:text-4xl font-bold tracking-tight">
              {"Apply Now · ".repeat(12)}
            </span>
            <span className="text-3xl md:text-4xl font-bold tracking-tight">
              {"Apply Now · ".repeat(12)}
            </span>
          </motion.div>
        </div>

        <div className="container mx-auto max-w-4xl">
          {/* Info Text */}
          <p className="text-center text-muted-foreground text-sm md:text-base mb-12 leading-relaxed">
            평일 기준 24시간 이내에 연락드립니다.<br />
            입력하신 정보는 채용 목적으로만 사용됩니다.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Row 1: Name, Email, Phone */}
            <div className="grid md:grid-cols-3 gap-4">
              <Input
                placeholder="Name *"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-muted border-0 h-14 rounded-xl text-base placeholder:text-muted-foreground/60"
              />
              <Input
                type="email"
                placeholder="Email *"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-muted border-0 h-14 rounded-xl text-base placeholder:text-muted-foreground/60"
              />
              <Input
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="bg-muted border-0 h-14 rounded-xl text-base placeholder:text-muted-foreground/60"
              />
            </div>

            {/* Row 2: Telegram, LinkedIn, Portfolio */}
            <div className="grid md:grid-cols-3 gap-4">
              <Input
                placeholder="Telegram"
                value={formData.telegram}
                onChange={(e) => handleInputChange("telegram", e.target.value)}
                className="bg-muted border-0 h-14 rounded-xl text-base placeholder:text-muted-foreground/60"
              />
              <Input
                placeholder="LinkedIn / Twitter URL"
                value={formData.linkedinUrl}
                onChange={(e) => handleInputChange("linkedinUrl", e.target.value)}
                className="bg-muted border-0 h-14 rounded-xl text-base placeholder:text-muted-foreground/60"
              />
              <Input
                placeholder="Portfolio URL"
                value={formData.portfolioUrl}
                onChange={(e) => handleInputChange("portfolioUrl", e.target.value)}
                className="bg-muted border-0 h-14 rounded-xl text-base placeholder:text-muted-foreground/60"
              />
            </div>

            {/* Row 3: Position Select */}
            <Select
              value={formData.position}
              onValueChange={(value) => handleInputChange("position", value)}
            >
              <SelectTrigger className="bg-muted border-0 h-14 rounded-xl text-base">
                <SelectValue placeholder="Select a position *" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Researcher">Researcher</SelectItem>
                <SelectItem value="Growth Manager">Growth Manager</SelectItem>
                <SelectItem value="Other">Other / 자유지원</SelectItem>
              </SelectContent>
            </Select>

            {/* Row 4: Cover Letter */}
            <Textarea
              placeholder="Tell us about yourself and why you want to join Ium Labs..."
              value={formData.coverLetter}
              onChange={(e) => handleInputChange("coverLetter", e.target.value)}
              className="bg-muted border-0 min-h-[200px] rounded-xl text-base placeholder:text-muted-foreground/60 resize-none"
            />

            {/* Privacy Checkbox */}
            <div className="flex items-center gap-3 pt-2">
              <Checkbox
                id="privacy"
                checked={formData.privacyAgreed}
                onCheckedChange={(checked) => handleInputChange("privacyAgreed", checked as boolean)}
                className="h-5 w-5"
              />
              <label
                htmlFor="privacy"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                개인정보처리방침에 동의합니다 *
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-6 h-auto text-lg bg-foreground text-background hover:bg-foreground/90 rounded-full font-semibold mt-6"
            >
              {isSubmitting ? "제출 중..." : "Submit Application"}
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Jobs;
