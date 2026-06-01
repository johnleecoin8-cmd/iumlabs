
-- Daily snapshot of GSC URL inspection per URL
CREATE TABLE public.gsc_inspection_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recorded_at timestamptz NOT NULL DEFAULT now(),
  recorded_date date NOT NULL DEFAULT CURRENT_DATE,
  url text NOT NULL,
  verdict text,
  indexing_state text,
  coverage_state text,
  last_crawl_time timestamptz,
  page_fetch_state text,
  robots_txt_state text,
  rich_results_count integer DEFAULT 0,
  mobile_verdict text,
  raw jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_gsc_snap_date ON public.gsc_inspection_snapshots(recorded_date DESC);
CREATE INDEX idx_gsc_snap_url ON public.gsc_inspection_snapshots(url, recorded_date DESC);

GRANT SELECT ON public.gsc_inspection_snapshots TO authenticated;
GRANT ALL ON public.gsc_inspection_snapshots TO service_role;
ALTER TABLE public.gsc_inspection_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read snapshots" ON public.gsc_inspection_snapshots
  FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Service role manages snapshots" ON public.gsc_inspection_snapshots
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Daily alert log (missing / problematic URLs detected)
CREATE TABLE public.gsc_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recorded_at timestamptz NOT NULL DEFAULT now(),
  recorded_date date NOT NULL DEFAULT CURRENT_DATE,
  alert_type text NOT NULL, -- 'missing' | 'error' | 'not_indexed' | 'sitemap_error'
  url text,
  details jsonb,
  notified boolean DEFAULT false,
  notification_channel text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_gsc_alerts_date ON public.gsc_alerts(recorded_date DESC);

GRANT SELECT ON public.gsc_alerts TO authenticated;
GRANT ALL ON public.gsc_alerts TO service_role;
ALTER TABLE public.gsc_alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read alerts" ON public.gsc_alerts
  FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Service role manages alerts" ON public.gsc_alerts
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Sitemap status snapshots
CREATE TABLE public.gsc_sitemap_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recorded_at timestamptz NOT NULL DEFAULT now(),
  recorded_date date NOT NULL DEFAULT CURRENT_DATE,
  sitemap_url text NOT NULL,
  is_pending boolean,
  is_sitemaps_index boolean,
  last_submitted timestamptz,
  last_downloaded timestamptz,
  warnings integer DEFAULT 0,
  errors integer DEFAULT 0,
  contents jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_gsc_sitemap_date ON public.gsc_sitemap_snapshots(recorded_date DESC);

GRANT SELECT ON public.gsc_sitemap_snapshots TO authenticated;
GRANT ALL ON public.gsc_sitemap_snapshots TO service_role;
ALTER TABLE public.gsc_sitemap_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read sitemap snap" ON public.gsc_sitemap_snapshots
  FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Service role manages sitemap snap" ON public.gsc_sitemap_snapshots
  FOR ALL TO service_role USING (true) WITH CHECK (true);
