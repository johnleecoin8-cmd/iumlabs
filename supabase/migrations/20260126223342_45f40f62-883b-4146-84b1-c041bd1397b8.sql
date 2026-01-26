-- Add start_date column to track when a project first appeared
-- This enables consistent 0-padding in all charts before the appearance date
ALTER TABLE public.hype_projects 
ADD COLUMN IF NOT EXISTS start_date date DEFAULT NULL;

-- Add comment for documentation
COMMENT ON COLUMN public.hype_projects.start_date IS 'Date when project first appeared in tracking data';