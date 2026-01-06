import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle, X, Upload, FileText, Trash2 } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const applicationSchema = z.object({
  position: z.string().min(1, "Please select a position"),
  name: z.string().trim().min(1, "Please enter your name").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be less than 255 characters"),
  phone: z.string().max(50, "Phone must be less than 50 characters").optional(),
  telegram: z.string().max(100, "Telegram ID must be less than 100 characters").optional(),
  linkedinUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  portfolioUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  coverLetter: z.string().max(5000, "Cover letter must be less than 5000 characters").optional(),
  privacyAgreed: z.boolean().refine((v) => v === true, {
    message: "Please agree to the Privacy Policy",
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
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update position when defaultPosition changes
  useEffect(() => {
    if (defaultPosition) {
      setFormData(prev => ({ ...prev, position: defaultPosition }));
    }
  }, [defaultPosition]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setResumeError(null);
    
    if (!file) {
      setResumeFile(null);
      return;
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setResumeError("Only PDF and Word documents are allowed");
      setResumeFile(null);
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setResumeError("File size must be less than 10MB");
      setResumeFile(null);
      return;
    }

    setResumeFile(file);
  };

  const removeFile = () => {
    setResumeFile(null);
    setResumeError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadResume = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `applications/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Resume upload error:", uploadError);
      throw new Error("Failed to upload resume");
    }

    // Get the public URL (though bucket is private, we store the path)
    return filePath;
  };

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
      let resumeUrl: string | null = null;

      // Upload resume if provided
      if (resumeFile) {
        setIsUploadingResume(true);
        try {
          resumeUrl = await uploadResume(resumeFile);
        } catch (uploadErr) {
          toast.error("Failed to upload resume. Please try again.");
          setIsSubmitting(false);
          setIsUploadingResume(false);
          return;
        }
        setIsUploadingResume(false);
      }

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
          resume_url: resumeUrl,
        });

      if (error) throw error;

      setIsSuccess(true);
      toast.success("Application submitted successfully!");
      
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
        setResumeFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setIsSuccess(false);
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
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
                <h3 className="text-2xl font-bold mb-2">Application Submitted!</h3>
                <p className="text-muted-foreground">
                  We'll review your application and get back to you soon.
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

                  {/* Row 4: Resume Upload */}
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      id="resume-upload"
                    />
                    
                    {!resumeFile ? (
                      <label
                        htmlFor="resume-upload"
                        className={`${inputBaseClass} flex items-center justify-center gap-3 cursor-pointer hover:bg-muted/80 transition-colors border-2 border-dashed border-border ${resumeError ? "border-red-500" : ""}`}
                      >
                        <Upload className="w-5 h-5 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Upload Resume (PDF, DOC, DOCX - Max 10MB)
                        </span>
                      </label>
                    ) : (
                      <div className={`${inputBaseClass} flex items-center justify-between`}>
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-primary" />
                          <span className="truncate max-w-[200px] md:max-w-[400px]">
                            {resumeFile.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="p-2 hover:bg-background rounded-lg transition-colors"
                          aria-label="Remove file"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    )}
                    
                    {resumeError && (
                      <p className="text-red-500 text-xs mt-1">{resumeError}</p>
                    )}
                  </div>

                  {/* Row 5: Cover Letter */}
                  <div>
                    <textarea
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Tell us about yourself and why you want to join Ium Labs"
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
                        {isUploadingResume ? "Uploading resume..." : "Submitting..."}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit Application
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
