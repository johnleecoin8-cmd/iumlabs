-- Fix: Replace overly permissive newsletter_subscribers SELECT policy with admin-only access
-- This prevents any authenticated user from harvesting subscriber emails

-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Authenticated users can view subscribers" ON public.newsletter_subscribers;

-- Create admin-only policy for viewing subscribers
CREATE POLICY "Admins can view newsletter subscribers"
ON public.newsletter_subscribers
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));