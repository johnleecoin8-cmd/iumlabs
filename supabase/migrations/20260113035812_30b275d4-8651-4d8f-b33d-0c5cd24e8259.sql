-- Add new columns for Telegram crawler integration
ALTER TABLE project_leaderboard 
ADD COLUMN IF NOT EXISTS ticker text,
ADD COLUMN IF NOT EXISTS sparkline integer[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS trend text DEFAULT 'neutral',
ADD COLUMN IF NOT EXISTS hype_score numeric DEFAULT 0;

-- Create index for faster ticker lookups
CREATE INDEX IF NOT EXISTS idx_project_leaderboard_ticker ON project_leaderboard(ticker);