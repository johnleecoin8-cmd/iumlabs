import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Users, Lightbulb, Rocket, Clock, Globe, TrendingUp, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";
import FloatingTags from "@/components/FloatingTags";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePageMeta } from "@/hooks/usePageMeta";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const heroTags = [
  { label: "Remote-Friendly", top: "25%", left: "15%" },
  { label: "Web3 Native", top: "20%", right: "15%" },
  { label: "Growth Opportunity", bottom: "25%", left: "20%" },
  { label: "Global Projects", bottom: "30%", right: "10%" },
];

const values = [
  {
    icon: Rocket,
    title: "Crypto-Native",
    description: "Web3에 대한 깊은 이해와 열정을 가진 분을 찾습니다. 직접 DeFi, NFT, 다양한 프로토콜을 경험해본 분이면 더욱 좋습니다.",
  },
  {
    icon: Lightbulb,
    title: "Research-Driven",
    description: "데이터와 리서치를 기반으로 인사이트를 도출하고, 논리적으로 의사결정을 내릴 수 있는 분을 원합니다.",
  },
  {
    icon: TrendingUp,
    title: "Self-Starter",
    description: "주어진 일만 하는 것이 아니라, 스스로 문제를 발견하고 해결책을 찾아 실행할 수 있는 주도적인 분이 필요합니다.",
  },
  {
    icon: Users,
    title: "Team Player",
    description: "작은 팀에서 긴밀하게 협업하며, 열린 마음으로 피드백을 주고받을 수 있는 분과 함께하고 싶습니다.",
  },
];

const positions = [
  {
    title: "Researcher",
    type: "Full-time",
    location: "Seoul / Remote",
    description: "한국 크립토 시장에 대한 깊이 있는 리서치를 수행하고, 글로벌 프로젝트들이 한국 시장을 이해할 수 있도록 인사이트를 제공합니다.",
    responsibilities: [
      "한국 크립토 시장 트렌드 및 생태계 분석",
      "프로젝트별 딥다이브 리서치 리포트 작성",
      "온체인 데이터 및 소셜 데이터 분석",
      "경쟁사 및 시장 벤치마킹 리서치",
    ],
    requirements: [
      "크립토 시장에 대한 1년 이상의 경험 또는 깊은 이해",
      "뛰어난 리서치 및 문서 작성 능력",
      "영어 커뮤니케이션 가능 (리포트 작성)",
      "데이터 분석 도구 활용 능력 (Dune, Nansen 등)",
    ],
    niceToHave: [
      "금융, 경제, 컴퓨터공학 관련 전공",
      "블록체인 미디어 또는 리서치 기관 경험",
      "개인 리서치 블로그 또는 트위터 운영 경험",
    ],
  },
  {
    title: "Growth Manager",
    type: "Full-time",
    location: "Seoul / Remote",
    description: "글로벌 Web3 프로젝트의 한국 시장 진출 전략을 수립하고 실행합니다. 커뮤니티, KOL, 파트너십을 통해 프로젝트의 성장을 이끕니다.",
    responsibilities: [
      "프로젝트별 GTM 전략 수립 및 실행",
      "한국 KOL 및 인플루언서 네트워크 관리",
      "커뮤니티 성장 전략 및 캠페인 기획",
      "파트너십 발굴 및 협업 프로젝트 운영",
    ],
    requirements: [
      "마케팅, BD, 커뮤니티 관리 중 1년 이상 경험",
      "크립토 생태계에 대한 이해와 관심",
      "뛰어난 커뮤니케이션 및 네트워킹 능력",
      "영어 비즈니스 커뮤니케이션 가능",
    ],
    niceToHave: [
      "Web3 프로젝트 마케팅 또는 BD 경험",
      "KOL/인플루언서 네트워크 보유",
      "이벤트 기획 및 운영 경험",
    ],
  },
];

const perks = [
  {
    icon: Clock,
    title: "유연한 근무",
    description: "자율 출퇴근 및 리모트 근무 가능",
  },
  {
    icon: Globe,
    title: "글로벌 경험",
    description: "전 세계 Top-tier 프로젝트와 협업",
  },
  {
    icon: TrendingUp,
    title: "빠른 성장",
    description: "Web3 산업의 최전선에서 성장",
  },
  {
    icon: Heart,
    title: "팀 문화",
    description: "수평적이고 자유로운 조직 문화",
  },
];

// Form validation schema
const applicationSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요"),
  email: z.string().email("올바른 이메일을 입력해주세요"),
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof ApplicationFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const scrollToApply = (position?: string) => {
    if (position) {
      setFormData((prev) => ({ ...prev, position }));
    }
    document.getElementById("apply-now")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = applicationSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
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
        privacyAgreed: false as boolean,
      });
      setErrors({});
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("지원서 제출 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/images/hero-poster.jpg"
          >
            <source src="/videos/services-background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        <FloatingTags tags={heroTags} />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              We're Hiring
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Join Our Team
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Shape the future of Web3 in Korea. We're looking for passionate individuals who want to bridge global projects with the Korean market.
            </p>
            <button
              onClick={() => scrollToApply()}
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors"
            >
              View Open Positions
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-emerald-400 text-sm font-mono mb-4 block">01</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-xl">
              우리가 찾는 인재상입니다. 아래 가치에 공감하신다면, 함께 성장해요.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 bg-card border border-border rounded-2xl hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-emerald-500/10 rounded-xl mb-6 group-hover:bg-emerald-500/20 transition-colors">
                  <value.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="positions" className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-emerald-400 text-sm font-mono mb-4 block">02</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
            <p className="text-muted-foreground max-w-xl">
              현재 채용 중인 포지션입니다. 관심 있는 포지션에 지원해주세요.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {positions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{position.title}</h3>
                      <div className="flex gap-3">
                        <span className="text-sm px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full">
                          {position.type}
                        </span>
                        <span className="text-sm px-3 py-1 bg-muted text-muted-foreground rounded-full">
                          {position.location}
                        </span>
                      </div>
                    </div>
                    <Briefcase className="w-8 h-8 text-emerald-400/50" />
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {position.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-3">주요 업무</h4>
                    <ul className="space-y-2">
                      {position.responsibilities.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-emerald-400 mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-3">자격 요건</h4>
                    <ul className="space-y-2">
                      {position.requirements.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-emerald-400 mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-foreground mb-3">우대 사항</h4>
                    <ul className="space-y-2">
                      {position.niceToHave.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-muted-foreground/50 mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => scrollToApply(position.title)}
                    className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors"
                  >
                    Apply Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks & Benefits Section */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-emerald-400 text-sm font-mono mb-4 block">03</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Perks & Benefits</h2>
            <p className="text-muted-foreground max-w-xl">
              Ium Labs와 함께하면 누릴 수 있는 혜택입니다.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk, index) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-14 h-14 mx-auto flex items-center justify-center bg-emerald-500/10 rounded-2xl mb-4">
                  <perk.icon className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{perk.title}</h3>
                <p className="text-sm text-muted-foreground">{perk.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Now Section - Inline Form */}
      <section id="apply-now" className="py-0">
        {/* Marquee Header */}
        <div className="overflow-hidden py-6 bg-foreground text-background">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 text-3xl md:text-4xl font-bold whitespace-nowrap"
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="flex items-center gap-8">
                <span>Apply Now</span>
                <span className="text-background/50">·</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Form Container */}
        <div className="container mx-auto max-w-4xl px-6 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-muted-foreground">
              평일 기준 24시간 이내에 연락드립니다.
              <br />
              입력하신 정보는 채용 목적으로만 사용됩니다.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Row 1: Name, Email, Phone */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Input
                  placeholder="Name *"
                  value={formData.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="bg-muted border-0 h-14 rounded-xl"
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email *"
                  value={formData.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-muted border-0 h-14 rounded-xl"
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <Input
                  placeholder="Phone"
                  value={formData.phone || ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="bg-muted border-0 h-14 rounded-xl"
                />
              </div>
            </div>

            {/* Row 2: Telegram, LinkedIn, Portfolio */}
            <div className="grid md:grid-cols-3 gap-4">
              <Input
                placeholder="Telegram"
                value={formData.telegram || ""}
                onChange={(e) => handleInputChange("telegram", e.target.value)}
                className="bg-muted border-0 h-14 rounded-xl"
              />
              <Input
                placeholder="LinkedIn / Twitter URL"
                value={formData.linkedinUrl || ""}
                onChange={(e) => handleInputChange("linkedinUrl", e.target.value)}
                className="bg-muted border-0 h-14 rounded-xl"
              />
              <Input
                placeholder="Portfolio URL"
                value={formData.portfolioUrl || ""}
                onChange={(e) => handleInputChange("portfolioUrl", e.target.value)}
                className="bg-muted border-0 h-14 rounded-xl"
              />
            </div>

            {/* Row 3: Position Select */}
            <div>
              <Select
                value={formData.position || ""}
                onValueChange={(value) => handleInputChange("position", value)}
              >
                <SelectTrigger className="bg-muted border-0 h-14 rounded-xl">
                  <SelectValue placeholder="Select a position *" />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((pos) => (
                    <SelectItem key={pos.title} value={pos.title}>
                      {pos.title}
                    </SelectItem>
                  ))}
                  <SelectItem value="Other">Other / 자유지원</SelectItem>
                </SelectContent>
              </Select>
              {errors.position && (
                <p className="text-destructive text-sm mt-1">{errors.position}</p>
              )}
            </div>

            {/* Row 4: Cover Letter */}
            <div>
              <Textarea
                placeholder="Tell us about yourself and why you want to join Ium Labs..."
                value={formData.coverLetter || ""}
                onChange={(e) => handleInputChange("coverLetter", e.target.value)}
                className="bg-muted border-0 min-h-[200px] rounded-xl resize-none"
              />
            </div>

            {/* Privacy Checkbox */}
            <div className="flex items-start gap-3">
              <Checkbox
                id="privacy"
                checked={formData.privacyAgreed || false}
                onCheckedChange={(checked) =>
                  handleInputChange("privacyAgreed", checked === true)
                }
                className="mt-0.5"
              />
              <label
                htmlFor="privacy"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                개인정보처리방침에 동의합니다 *
              </label>
            </div>
            {errors.privacyAgreed && (
              <p className="text-destructive text-sm">{errors.privacyAgreed}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 text-lg bg-foreground text-background hover:bg-foreground/90 rounded-full font-semibold transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </motion.form>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join Us?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              포지션에 맞는 공고가 없더라도, 열정이 있다면 언제든 연락주세요.
              우리는 항상 뛰어난 인재를 찾고 있습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToApply("Other")}
                className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors"
              >
                지원서 작성하기
              </button>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 border border-border hover:border-emerald-500/50 text-foreground font-medium rounded-lg transition-colors"
              >
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Jobs;
