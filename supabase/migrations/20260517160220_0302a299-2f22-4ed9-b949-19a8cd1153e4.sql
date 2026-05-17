
DROP POLICY IF EXISTS "Admins can view job applications" ON public.job_applications;
DROP POLICY IF EXISTS "Admins can update job applications" ON public.job_applications;

CREATE POLICY "Admins can view job applications"
ON public.job_applications
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update job applications"
ON public.job_applications
FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete job applications"
ON public.job_applications
FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Anyone can read resumes" ON storage.objects;

CREATE POLICY "Admins can read resumes"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'resumes' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete resumes"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'resumes' AND public.has_role(auth.uid(), 'admin'::public.app_role));

UPDATE storage.buckets SET public = false WHERE id = 'resumes';

DROP POLICY IF EXISTS "Service can insert hype_score_history" ON public.hype_score_history;
CREATE POLICY "Service role can insert hype_score_history"
ON public.hype_score_history FOR INSERT TO service_role
WITH CHECK (true);

ALTER TABLE public.contact_submissions
  ADD CONSTRAINT contact_name_length CHECK (length(name) BETWEEN 1 AND 100) NOT VALID,
  ADD CONSTRAINT contact_email_length CHECK (length(email) BETWEEN 5 AND 255) NOT VALID,
  ADD CONSTRAINT contact_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$') NOT VALID,
  ADD CONSTRAINT contact_comments_length CHECK (comments IS NULL OR length(comments) <= 5000) NOT VALID;

ALTER TABLE public.newsletter_subscribers
  ADD CONSTRAINT newsletter_email_length CHECK (length(email) BETWEEN 5 AND 255) NOT VALID,
  ADD CONSTRAINT newsletter_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$') NOT VALID;

ALTER TABLE public.job_applications
  ADD CONSTRAINT jobapp_name_length CHECK (length(name) BETWEEN 1 AND 100) NOT VALID,
  ADD CONSTRAINT jobapp_email_length CHECK (length(email) BETWEEN 5 AND 255) NOT VALID,
  ADD CONSTRAINT jobapp_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$') NOT VALID,
  ADD CONSTRAINT jobapp_linkedin_length CHECK (linkedin_url IS NULL OR length(linkedin_url) <= 500) NOT VALID,
  ADD CONSTRAINT jobapp_telegram_length CHECK (telegram IS NULL OR length(telegram) <= 100) NOT VALID;
