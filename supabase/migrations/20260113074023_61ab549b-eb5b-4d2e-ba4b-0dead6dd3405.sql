-- Add token_status field to distinguish TGE vs Pre-TGE
ALTER TABLE public.hype_projects 
ADD COLUMN IF NOT EXISTS token_status text DEFAULT 'tge' CHECK (token_status IN ('tge', 'pre-tge'));