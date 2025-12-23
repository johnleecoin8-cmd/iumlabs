-- Create research_posts table
CREATE TABLE public.research_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  image TEXT,
  date TEXT,
  read_time TEXT,
  category TEXT,
  author TEXT,
  author_role TEXT,
  excerpt TEXT,
  tags TEXT[] DEFAULT '{}',
  content TEXT,
  is_published BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.research_posts ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can read published research posts"
  ON public.research_posts
  FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can manage all research posts"
  ON public.research_posts
  FOR ALL
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_research_posts_updated_at
  BEFORE UPDATE ON public.research_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();