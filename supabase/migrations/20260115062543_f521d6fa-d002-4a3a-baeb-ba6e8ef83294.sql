-- Add narrative and mindshare_change columns to hype_projects for Phase 1 improvements
-- narrative: Project category like AI, L2, DePIN, Meme, etc.
-- mindshare_change: Percentage change in mindshare (for displaying +12%, -5% etc.)

ALTER TABLE public.hype_projects 
ADD COLUMN narrative text DEFAULT NULL,
ADD COLUMN mindshare_change numeric DEFAULT NULL;

-- Add comment for documentation
COMMENT ON COLUMN public.hype_projects.narrative IS 'Project narrative/category: AI, L2, DePIN, Meme, DeFi, Gaming, etc.';
COMMENT ON COLUMN public.hype_projects.mindshare_change IS 'Percentage change in mindshare from previous period (e.g., +12.5 or -5.2)';