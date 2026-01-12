-- Create influencers table
CREATE TABLE public.influencers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('telegram', 'x', 'youtube', 'app')),
  avatar_url TEXT,
  score DECIMAL(5,2) NOT NULL DEFAULT 0,
  tier TEXT NOT NULL DEFAULT 'Retail',
  tier_color TEXT NOT NULL DEFAULT 'gray',
  trend INTEGER NOT NULL DEFAULT 0,
  followers INTEGER DEFAULT 0,
  engagement_rate DECIMAL(5,2) DEFAULT 0,
  bio TEXT,
  profile_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create influencer activity history table
CREATE TABLE public.influencer_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  influencer_id UUID NOT NULL REFERENCES public.influencers(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  description TEXT,
  impact_score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create influencer recent posts table
CREATE TABLE public.influencer_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  influencer_id UUID NOT NULL REFERENCES public.influencers(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  post_url TEXT,
  likes INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  sentiment_score DECIMAL(3,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create influencer score history table (for graph)
CREATE TABLE public.influencer_score_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  influencer_id UUID NOT NULL REFERENCES public.influencers(id) ON DELETE CASCADE,
  score DECIMAL(5,2) NOT NULL,
  recorded_at DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Enable RLS
ALTER TABLE public.influencers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.influencer_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.influencer_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.influencer_score_history ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables
CREATE POLICY "Anyone can read influencers" ON public.influencers FOR SELECT USING (true);
CREATE POLICY "Anyone can read influencer activities" ON public.influencer_activities FOR SELECT USING (true);
CREATE POLICY "Anyone can read influencer posts" ON public.influencer_posts FOR SELECT USING (true);
CREATE POLICY "Anyone can read influencer score history" ON public.influencer_score_history FOR SELECT USING (true);

-- Admin write access
CREATE POLICY "Admins can manage influencers" ON public.influencers FOR ALL USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage influencer activities" ON public.influencer_activities FOR ALL USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage influencer posts" ON public.influencer_posts FOR ALL USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage influencer score history" ON public.influencer_score_history FOR ALL USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_influencers_updated_at
  BEFORE UPDATE ON public.influencers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_influencers_platform ON public.influencers(platform);
CREATE INDEX idx_influencers_score ON public.influencers(score DESC);
CREATE INDEX idx_influencer_activities_influencer_id ON public.influencer_activities(influencer_id);
CREATE INDEX idx_influencer_posts_influencer_id ON public.influencer_posts(influencer_id);
CREATE INDEX idx_influencer_score_history_influencer_id ON public.influencer_score_history(influencer_id);