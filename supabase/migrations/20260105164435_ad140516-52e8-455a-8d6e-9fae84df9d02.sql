-- Add is_featured column to research_posts table
ALTER TABLE public.research_posts 
ADD COLUMN is_featured boolean NOT NULL DEFAULT false;