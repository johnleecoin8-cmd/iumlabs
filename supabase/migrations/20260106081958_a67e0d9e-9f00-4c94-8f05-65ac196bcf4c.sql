-- Add new fields to job_applications table
ALTER TABLE public.job_applications
ADD COLUMN telegram TEXT,
ADD COLUMN linkedin_url TEXT;