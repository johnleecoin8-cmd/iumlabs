
-- 1. Admin-only UPDATE/DELETE policies on newsletter_subscribers
CREATE POLICY "Admins can update newsletter subscribers"
ON public.newsletter_subscribers
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete newsletter subscribers"
ON public.newsletter_subscribers
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 2. Revoke EXECUTE on internal SECURITY DEFINER snapshot functions from anon/authenticated.
-- These are only invoked by backend cron / edge functions (service_role).
REVOKE EXECUTE ON FUNCTION public.record_hype_snapshot() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.record_daily_project_history() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.record_hype_snapshot() TO service_role;
GRANT EXECUTE ON FUNCTION public.record_daily_project_history() TO service_role;
