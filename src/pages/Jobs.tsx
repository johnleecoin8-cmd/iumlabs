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

  const marqueeText = "Apply Now · ".repeat(12);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Marquee Banner */}
      <div className="overflow-hidden bg-foreground text-background py-5 mt-16">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          <span className="text-3xl md:text-4xl font-bold tracking-tight">
            {marqueeText}
          </span>
          <span className="text-3xl md:text-4xl font-bold tracking-tight">
            {marqueeText}
          </span>
        </motion.div>
      </div>

      {/* Form Section */}
      <main className="flex-1 flex items-center justify-center py-16 md:py-24 px-6">
        <div className="w-full max-w-4xl">
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
      </main>

      <Footer />
    </div>
  );
};

export default Jobs;
