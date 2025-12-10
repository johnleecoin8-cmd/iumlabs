import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { specialOffer } from "@/config/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email({ message: "올바른 이메일을 입력해주세요" }),
  name: z.string().min(1, { message: "이름을 입력해주세요" }).max(100),
  comments: z.string().max(1000).optional(),
});

type FormData = z.infer<typeof formSchema>;

const SpecialOfferForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      comments: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        email: data.email,
        name: data.name,
        comments: data.comments || null,
      });

      if (error) throw error;

      toast({
        title: specialOffer.successTitle,
        description: specialOffer.successMessage,
      });
      form.reset();
    } catch (error) {
      toast({
        title: specialOffer.errorTitle,
        description: specialOffer.errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600" />
      
      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
      
      <div className="container mx-auto max-w-2xl relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10 tracking-wide">
          {specialOffer.title}
        </h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={specialOffer.emailPlaceholder}
                      {...field}
                      className="bg-transparent border-white/40 text-white placeholder:text-white/60 h-12 focus:border-white focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage className="text-white/80" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={specialOffer.namePlaceholder}
                      {...field}
                      className="bg-transparent border-white/40 text-white placeholder:text-white/60 h-12 focus:border-white focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage className="text-white/80" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder={specialOffer.commentsPlaceholder}
                      {...field}
                      rows={4}
                      className="bg-transparent border-white/40 text-white placeholder:text-white/60 resize-none focus:border-white focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage className="text-white/80" />
                </FormItem>
              )}
            />
            
            <div className="flex justify-center pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 px-10 py-6 text-lg font-semibold tracking-wider transition-all duration-300"
              >
                {isSubmitting ? "전송 중..." : specialOffer.buttonText}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default SpecialOfferForm;