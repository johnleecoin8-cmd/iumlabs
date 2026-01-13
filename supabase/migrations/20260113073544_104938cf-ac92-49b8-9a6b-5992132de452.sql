-- Add mindshare percentage field to hype_projects
ALTER TABLE public.hype_projects 
ADD COLUMN IF NOT EXISTS mindshare numeric DEFAULT 0;

-- Add mindshare to hype_score_history for historical tracking
ALTER TABLE public.hype_score_history 
ADD COLUMN IF NOT EXISTS mindshare numeric DEFAULT 0;

-- Update record_hype_snapshot function to include mindshare
CREATE OR REPLACE FUNCTION public.record_hype_snapshot()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO hype_score_history (ticker, score, rank, mindshare, recorded_at)
  SELECT ticker, score, rank, mindshare, now()
  FROM hype_projects;
END;
$function$;