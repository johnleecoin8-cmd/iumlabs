-- Create hype_projects table for real-time market data from Python script
CREATE TABLE public.hype_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rank integer NOT NULL DEFAULT 0,
  name text NOT NULL,
  ticker text NOT NULL UNIQUE,
  score numeric NOT NULL DEFAULT 0,
  trend text DEFAULT 'neutral',
  sparkline integer[] DEFAULT '{}',
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.hype_projects ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read hype_projects (public dashboard)
CREATE POLICY "Anyone can read hype_projects" 
ON public.hype_projects 
FOR SELECT 
USING (true);

-- Allow service role to manage all data (for Python script)
CREATE POLICY "Service can manage hype_projects" 
ON public.hype_projects 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_hype_projects_rank ON public.hype_projects(rank);
CREATE INDEX idx_hype_projects_ticker ON public.hype_projects(ticker);

-- Enable realtime for instant UI updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.hype_projects;