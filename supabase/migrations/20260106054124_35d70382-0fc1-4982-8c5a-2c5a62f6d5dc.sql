-- Add client_name and duration columns to projects table
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS client_name text,
ADD COLUMN IF NOT EXISTS duration text;