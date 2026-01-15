-- Add price data columns to hype_projects table for K-Leaderboard
ALTER TABLE public.hype_projects 
ADD COLUMN IF NOT EXISTS price numeric,
ADD COLUMN IF NOT EXISTS market_cap numeric,
ADD COLUMN IF NOT EXISTS change_24h numeric,
ADD COLUMN IF NOT EXISTS twitter_url text,
ADD COLUMN IF NOT EXISTS website_url text;