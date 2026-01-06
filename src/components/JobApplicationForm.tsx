import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle, X } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

const applicationSchema = z.object({
  position: z.string().min(1, "포지션을 선택해주세요"),
  name: z.string().trim().min(1, "이름을 입력해주세요").max(100, "이름은 100자 이내로 입력해주세요"),
  email: z.string().trim().email("유효한 이메일을 입력해주세요").max(255, "이메일은 255자 이내로 입력해주세요"),
  phone: z.string().max(50, "연락처는 50자 이내로 입력해주세요").optional(),
  telegram: z.string().max(100, "Telegram ID는 100자 이내로 입력해주세요").optional(),
  linkedinUrl: z.string().url("유효한 URL을 입력해주세요").optional().or(z.literal("")),
  portfolioUrl: z.string().url("유효한 URL을 입력해주세요").optional().or(z.literal("")),
  coverLetter: z.string().max(5000, "자기소개는 5000자 이내로 작성해주세요").optional(),
  privacyAgreed: z.boolean().refine((v) => v === true, {
    message: "개인정보처리방침에 동의해주세요",
  }),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface JobApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPosition?: string;
}

const positions = [
  { value: "researcher", label: "Researcher (리서처)" },
  { value: "growth-manager", label: "Growth Manager (그로스 매니저)" },
  { value: "other", label: "Other (기타)" },
];

// Marquee component for the header
const Marquee = () => {
  const text = "Apply Now • 지원하기 • ";
  
  return (
    <div className="overflow-hidden py-6 bg-foreground text-background">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(8)].map((_, i) => (
          <span key={i} className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mx-2">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const JobApplicationForm = ({ isOpen, onClose, defaultPosition = "" }: JobApplicationFormProps) => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    position: defaultPosition,
    name: "",
    email: "",
    phone: "",
    telegram: "",
    linkedinUrl: "",
    portfolioUrl: "",
    coverLetter: "",
    privacyAgreed: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ApplicationFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Update position when defaultPosition changes
  useEffect(() => {
    if (defaultPosition) {
      setFormData(prev => ({ ...prev, position: defaultPosition }));
    }
  }, [defaultPosition]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ApplicationFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, privacyAgreed: checked }));
    if (errors.privacyAgreed) {
      setErrors(prev => ({ ...prev, privacyAgreed: undefined }));
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
          telegram: formData.telegram?.trim() || null,
          linkedin_url: formData.linkedinUrl?.trim() || null,
          portfolio_url: formData.portfolioUrl?.trim() || null,
          cover_letter: formData.coverLetter?.trim() || null,
        });

      if (error) throw error;

      setIsSuccess(true);
      toast.success("지원서가 성공적으로 제출되었습니다!");
      
      setTimeout(() => {
        setFormData({
          position: "",
          name: "",
          email: "",
          phone: "",
          telegram: "",
          linkedinUrl: "",
          portfolioUrl: "",
          coverLetter: "",
          privacyAgreed: false,
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
    if (e.target === e.currentTarget && !isSubmitting) {
      onClose();
    }
  };

  const inputBaseClass = "w-full px-4 py-4 bg-muted border-0 rounded-xl text-base placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all";

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background border border-border rounded-2xl shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 px-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">지원 완료!</h3>
                <p className="text-muted-foreground">
                  검토 후 빠른 시일 내에 연락드리겠습니다.
                </p>
              </motion.div>
            ) : (
              <>
                {/* Marquee Header */}
                <div className="rounded-t-2xl overflow-hidden">
                  <Marquee />
                </div>

                {/* Info Section */}
                <div className="px-6 md:px-8 py-6 border-b border-border">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Monday - Friday</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        평일 기준 24시간 이내에 연락드립니다.
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      입력하신 정보는 채용 목적으로만 사용됩니다.
                    </p>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 md:px-8 py-8 space-y-5">
                  {/* Row 1: Name, Email, Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name *"
                        className={`${inputBaseClass} ${errors.name ? "ring-2 ring-red-500" : ""}`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="E-Mail *"
                        className={`${inputBaseClass} ${errors.email ? "ring-2 ring-red-500" : ""}`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        className={inputBaseClass}
                      />
                    </div>
                  </div>

                  {/* Row 2: Telegram, LinkedIn, Portfolio */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <input
                        type="text"
                        name="telegram"
                        value={formData.telegram}
                        onChange={handleChange}
                        placeholder="Telegram"
                        className={inputBaseClass}
                      />
                    </div>
                    <div>
                      <input
                        type="url"
                        name="linkedinUrl"
                        value={formData.linkedinUrl}
                        onChange={handleChange}
                        placeholder="LinkedIn URL"
                        className={`${inputBaseClass} ${errors.linkedinUrl ? "ring-2 ring-red-500" : ""}`}
                      />
                      {errors.linkedinUrl && <p className="text-red-500 text-xs mt-1">{errors.linkedinUrl}</p>}
                    </div>
                    <div>
                      <input
                        type="url"
                        name="portfolioUrl"
                        value={formData.portfolioUrl}
                        onChange={handleChange}
                        placeholder="Portfolio URL"
                        className={`${inputBaseClass} ${errors.portfolioUrl ? "ring-2 ring-red-500" : ""}`}
                      />
                      {errors.portfolioUrl && <p className="text-red-500 text-xs mt-1">{errors.portfolioUrl}</p>}
                    </div>
                  </div>

                  {/* Row 3: Position Select */}
                  <div>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className={`${inputBaseClass} cursor-pointer ${errors.position ? "ring-2 ring-red-500" : ""}`}
                    >
                      <option value="">지원 포지션 선택 *</option>
                      {positions.map(pos => (
                        <option key={pos.value} value={pos.value}>
                          {pos.label}
                        </option>
                      ))}
                    </select>
                    {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
                  </div>

                  {/* Row 4: Cover Letter */}
                  <div>
                    <textarea
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleChange}
                      rows={6}
                      placeholder="자기소개 및 지원동기를 작성해주세요"
                      className={`${inputBaseClass} resize-none min-h-[160px]`}
                    />
                    <p className="text-xs text-muted-foreground mt-1 text-right">
                      {formData.coverLetter?.length || 0} / 5,000
                    </p>
                  </div>

                  {/* Privacy Policy Checkbox */}
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="privacyAgreed"
                      checked={formData.privacyAgreed}
                      onCheckedChange={handleCheckboxChange}
                      className="mt-0.5"
                    />
                    <div>
                      <label htmlFor="privacyAgreed" className="text-sm text-muted-foreground cursor-pointer">
                        <a
                          href="/privacy"
                          target="_blank"
                          className="underline hover:text-foreground transition-colors"
                        >
                          개인정보처리방침
                        </a>
                        에 동의합니다 *
                      </label>
                      {errors.privacyAgreed && (
                        <p className="text-red-500 text-xs mt-1">{errors.privacyAgreed}</p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 h-16 bg-foreground text-background hover:bg-foreground/90 disabled:bg-foreground/50 font-semibold text-lg rounded-full transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        제출 중...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default JobApplicationForm;
