-- Add Telegram-specific columns to project_leaderboard
ALTER TABLE public.project_leaderboard
ADD COLUMN IF NOT EXISTS telegram_mentions_24h integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS telegram_sentiment numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_data_update timestamp with time zone DEFAULT now();

-- Create function to calculate mindshare score
-- Formula: (TG_Mentions × 0.6) + (TW_Mentions × 0.3) + (Sentiment × 100 × 0.1)
CREATE OR REPLACE FUNCTION public.calculate_mindshare_score(
  tg_mentions integer,
  tw_mentions integer,
  sentiment numeric
)
RETURNS numeric
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  RETURN ROUND(
    (COALESCE(tg_mentions, 0) * 0.6) + 
    (COALESCE(tw_mentions, 0) * 0.3) + 
    (COALESCE(sentiment, 0) * 100 * 0.1),
    2
  );
END;
$$;

-- Create function to record daily history (can be called by cron or manually)
CREATE OR REPLACE FUNCTION public.record_daily_project_history()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO project_score_history (project_id, score, rank, recorded_at)
  SELECT id, mindshare_score, rank, CURRENT_DATE
  FROM project_leaderboard
  WHERE is_active = true
  ON CONFLICT DO NOTHING;
END;
$$;