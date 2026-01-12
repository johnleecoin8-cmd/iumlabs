-- Create project_leaderboard table for tracking Web3 project mindshare in Korea
CREATE TABLE public.project_leaderboard (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  category TEXT NOT NULL DEFAULT 'DeFi',
  mindshare_score NUMERIC NOT NULL DEFAULT 0,
  previous_score NUMERIC NOT NULL DEFAULT 0,
  rank INTEGER NOT NULL DEFAULT 0,
  previous_rank INTEGER NOT NULL DEFAULT 0,
  twitter_mentions INTEGER DEFAULT 0,
  telegram_members INTEGER DEFAULT 0,
  discord_members INTEGER DEFAULT 0,
  website_url TEXT,
  twitter_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create score history table for trend tracking
CREATE TABLE public.project_score_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.project_leaderboard(id) ON DELETE CASCADE,
  score NUMERIC NOT NULL,
  rank INTEGER NOT NULL,
  recorded_at DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Enable RLS
ALTER TABLE public.project_leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_score_history ENABLE ROW LEVEL SECURITY;

-- RLS policies for project_leaderboard (public read, admin write)
CREATE POLICY "Anyone can read project leaderboard"
ON public.project_leaderboard FOR SELECT
USING (true);

CREATE POLICY "Admins can manage project leaderboard"
ON public.project_leaderboard FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- RLS policies for project_score_history
CREATE POLICY "Anyone can read project score history"
ON public.project_score_history FOR SELECT
USING (true);

CREATE POLICY "Admins can manage project score history"
ON public.project_score_history FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_project_leaderboard_updated_at
BEFORE UPDATE ON public.project_leaderboard
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();