-- Add periods_found column to track which periods a project appears in
-- This helps identify new projects (1-2 periods) vs established ones
ALTER TABLE public.hype_projects 
ADD COLUMN IF NOT EXISTS periods_found text[] DEFAULT '{}'::text[];

-- Add comment for documentation
COMMENT ON COLUMN public.hype_projects.periods_found IS 'Array of period identifiers (7D, 14D, 30D, 90D) where project was found';