import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle, X } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const applicationSchema = z.object({
  position: z.string().min(1, "포지션을 선택해주세요"),
  name: z.string().trim().min(1, "이름을 입력해주세요").max(100, "이름은 100자 이내로 입력해주세요"),
  email: z.string().trim().email("유효한 이메일을 입력해주세요").max(255, "이메일은 255자 이내로 입력해주세요"),
  phone: z.string().max(50, "연락처는 50자 이내로 입력해주세요").optional(),
  portfolioUrl: z.string().url("유효한 URL을 입력해주세요").optional().or(z.literal("")),
  coverLetter: z.string().max(5000, "자기소개는 5000자 이내로 작성해주세요").optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface JobApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPosition?: string;
}

const positions = [
  { value: "researcher", label: "Researcher" },
  { value: "growth-manager", label: "Growth Manager" },
  { value: "other", label: "Other / General Application" },
];

const JobApplicationForm = ({ isOpen, onClose, defaultPosition = "" }: JobApplicationFormProps) => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    position: defaultPosition,
    name: "",
    email: "",
    phone: "",
    portfolioUrl: "",
    coverLetter: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ApplicationFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof ApplicationFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    try {
      applicationSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof ApplicationFormData, string>> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof ApplicationFormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from("job_applications")
        .insert({
          position: formData.position,
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone?.trim() || null,
          portfolio_url: formData.portfolioUrl?.trim() || null,
          cover_letter: formData.coverLetter?.trim() || null,
        });

      if (error) throw error;

      setIsSuccess(true);
      toast.success("지원서가 성공적으로 제출되었습니다!");
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          position: "",
          name: "",
          email: "",
          phone: "",
          portfolioUrl: "",
          coverLetter: "",
        });
        setIsSuccess(false);
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("지원서 제출 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      
      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-2xl shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-border bg-card">
          <div>
            <h2 className="text-2xl font-bold">지원서 작성</h2>
            <p className="text-sm text-muted-foreground mt-1">
              아래 양식을 작성해주세요
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">지원 완료!</h3>
              <p className="text-muted-foreground">
                지원서가 성공적으로 제출되었습니다.<br />
                검토 후 연락드리겠습니다.
              </p>
            </motion.div>
          ) : (
            <>
              {/* Position */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  지원 포지션 <span className="text-red-500">*</span>
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all ${
                    errors.position ? "border-red-500" : "border-border"
                  }`}
                >
                  <option value="">포지션 선택</option>
                  {positions.map(pos => (
                    <option key={pos.value} value={pos.value}>
                      {pos.label}
                    </option>
                  ))}
                </select>
                {errors.position && (
                  <p className="text-red-500 text-sm mt-1">{errors.position}</p>
                )}
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="홍길동"
                  className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all ${
                    errors.name ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  이메일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all ${
                    errors.email ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  연락처
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="010-0000-0000"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                />
              </div>

              {/* Portfolio URL */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  포트폴리오 / LinkedIn URL
                </label>
                <input
                  type="url"
                  name="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/..."
                  className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all ${
                    errors.portfolioUrl ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.portfolioUrl && (
                  <p className="text-red-500 text-sm mt-1">{errors.portfolioUrl}</p>
                )}
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  자기소개 / 지원 동기
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  rows={5}
                  placeholder="간단한 자기소개와 지원 동기를 작성해주세요..."
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.coverLetter?.length || 0} / 5000자
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white font-medium rounded-lg transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    제출 중...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    지원서 제출하기
                  </>
                )}
              </button>

              <p className="text-xs text-center text-muted-foreground">
                제출하신 정보는 채용 목적으로만 사용되며,{" "}
                <a href="/privacy" className="text-emerald-400 hover:underline">
                  개인정보처리방침
                </a>
                에 따라 관리됩니다.
              </p>
            </>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default JobApplicationForm;
