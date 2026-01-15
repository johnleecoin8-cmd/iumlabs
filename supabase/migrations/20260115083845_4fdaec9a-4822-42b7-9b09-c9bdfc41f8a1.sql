-- Add top_source column to track highest signal source
ALTER TABLE hype_projects ADD COLUMN IF NOT EXISTS top_source TEXT;