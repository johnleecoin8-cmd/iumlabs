-- CEO review T2/T7: track where a subscriber came from (newsletter form,
-- gtm-index report, future report landings). Nullable, no backfill needed.
ALTER TABLE public.newsletter_subscribers
  ADD COLUMN IF NOT EXISTS source text;
