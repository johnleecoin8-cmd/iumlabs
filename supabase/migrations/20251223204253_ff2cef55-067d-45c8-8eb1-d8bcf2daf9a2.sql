-- Add detailed fields to projects table for full case study data
ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS challenge TEXT,
ADD COLUMN IF NOT EXISTS strategy TEXT[],
ADD COLUMN IF NOT EXISTS services TEXT[],
ADD COLUMN IF NOT EXISTS short_services TEXT[];

-- Create project_metrics table
CREATE TABLE public.project_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.project_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read project metrics"
ON public.project_metrics FOR SELECT USING (true);

CREATE POLICY "Admins can manage project metrics"
ON public.project_metrics FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create project_gallery table
CREATE TABLE public.project_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  src TEXT NOT NULL,
  title TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.project_gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read project gallery"
ON public.project_gallery FOR SELECT USING (true);

CREATE POLICY "Admins can manage project gallery"
ON public.project_gallery FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create project_news table
CREATE TABLE public.project_news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  source TEXT,
  date TEXT,
  url TEXT,
  image TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.project_news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read project news"
ON public.project_news FOR SELECT USING (true);

CREATE POLICY "Admins can manage project news"
ON public.project_news FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));