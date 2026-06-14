
REVOKE EXECUTE ON FUNCTION public.record_hype_snapshot() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.record_daily_project_history() FROM anon, authenticated, PUBLIC;
GRANT EXECUTE ON FUNCTION public.record_hype_snapshot() TO service_role;
GRANT EXECUTE ON FUNCTION public.record_daily_project_history() TO service_role;

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated can read hype_projects channel" ON realtime.messages;
CREATE POLICY "Authenticated can read hype_projects channel"
ON realtime.messages
FOR SELECT
TO authenticated
USING (
  (realtime.topic() = 'hype_projects')
  OR (realtime.topic() LIKE 'hype_projects:%')
);
