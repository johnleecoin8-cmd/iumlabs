-- Create a table for brand statistics with daily variance
CREATE TABLE public.brand_stats (
  id TEXT PRIMARY KEY,
  value NUMERIC NOT NULL,
  base_value NUMERIC NOT NULL,
  label TEXT NOT NULL,
  prefix TEXT DEFAULT '',
  suffix TEXT DEFAULT '',
  min_variance NUMERIC DEFAULT 2,
  max_variance NUMERIC DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.brand_stats ENABLE ROW LEVEL SECURITY;

-- Allow public read access (no auth needed for public stats)
CREATE POLICY "Brand stats are publicly readable"
ON public.brand_stats
FOR SELECT
USING (true);

-- Insert initial brand stats
INSERT INTO public.brand_stats (id, value, base_value, label, prefix, suffix, min_variance, max_variance)
VALUES
  ('client_valuation', 8, 8, 'Client Valuation', '$', 'B+', 3, 8),
  ('kol_network', 180, 180, 'KOL Network', '', '+', 2, 5),
  ('projects_launched', 18, 18, 'Projects Launched', '', '+', 1, 3),
  ('token_sales', 6, 6, 'Token Sales', '$', 'M', 5, 10),
  ('events_hosted', 42, 42, 'Events Hosted', '', '+', 2, 6),
  ('volume_generated', 1.5, 1.5, 'Volume Generated', '$', 'B+', 3, 8),
  ('active_community', 500, 500, 'Active Community', '', 'K+', 2, 5);