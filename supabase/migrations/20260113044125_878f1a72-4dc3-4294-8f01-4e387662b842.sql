-- Add logo_url column to hype_projects
ALTER TABLE public.hype_projects 
ADD COLUMN logo_url text;

-- Add comment for documentation
COMMENT ON COLUMN public.hype_projects.logo_url IS 'CoinGecko image URL for the coin';

-- Create hype_score_history table for 7d/30d trend tracking
CREATE TABLE public.hype_score_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticker text NOT NULL,
  score numeric NOT NULL,
  rank integer NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT now()
);

-- Create index for efficient querying by ticker and date
CREATE INDEX idx_hype_score_history_ticker_date ON public.hype_score_history(ticker, recorded_at DESC);

-- Enable RLS
ALTER TABLE public.hype_score_history ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Anyone can read hype_score_history" 
ON public.hype_score_history 
FOR SELECT 
USING (true);

-- Allow service role to insert
CREATE POLICY "Service can insert hype_score_history" 
ON public.hype_score_history 
FOR INSERT 
WITH CHECK (true);

-- Function to record daily snapshot (call from Python or cron)
CREATE OR REPLACE FUNCTION public.record_hype_snapshot()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO hype_score_history (ticker, score, rank, recorded_at)
  SELECT ticker, score, rank, now()
  FROM hype_projects;
END;
$$;