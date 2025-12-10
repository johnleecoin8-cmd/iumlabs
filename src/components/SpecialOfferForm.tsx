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
  email: z.string().email({ message: "Please enter a valid email" }),
  name: z.string().min(1, { message: "Please enter your name" }).max(100),
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
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-card/50" />
      
      {/* Dot pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--muted-foreground) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto max-w-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-6">
            <span className="text-sm font-medium text-primary">Get Started</span>
          </div>
          <h2 className="text-4xl md:text-5xl tracking-tight mb-4">
            <span className="font-serif italic text-muted-foreground">Let's</span>{" "}
            <span className="font-sans font-bold text-foreground">Connect</span>
          </h2>
          <p className="text-muted-foreground">
            {specialOffer.title}
          </p>
        </div>
        
        <div className="p-8 rounded-3xl border border-border/30 bg-card/30 backdrop-blur-sm">
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
                        className="bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground h-12 rounded-xl focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage className="text-destructive" />
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
                        className="bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground h-12 rounded-xl focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage className="text-destructive" />
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
                        className="bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground resize-none rounded-xl focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-primary hover:bg-primary/90 px-12 py-6 text-base font-medium"
                >
                  {isSubmitting ? "Sending..." : specialOffer.buttonText}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default SpecialOfferForm;