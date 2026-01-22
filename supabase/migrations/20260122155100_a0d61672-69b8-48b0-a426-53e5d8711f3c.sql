-- Fix 1: Restrict contact_submissions SELECT to admins only
DROP POLICY IF EXISTS "Authenticated users can view submissions" ON public.contact_submissions;
CREATE POLICY "Admins can view contact submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Fix 2: Remove overly permissive write policy on hype_projects
DROP POLICY IF EXISTS "Service can manage hype_projects" ON public.hype_projects;
-- Note: Edge functions use service_role key which bypasses RLS, so no write policy needed