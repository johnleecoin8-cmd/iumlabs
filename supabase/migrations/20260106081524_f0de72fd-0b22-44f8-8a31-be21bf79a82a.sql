-- Create job_applications table for storing job applications
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  position VARCHAR(100) NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  portfolio_url TEXT,
  cover_letter TEXT,
  resume_url TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting applications (anyone can apply)
CREATE POLICY "Anyone can submit job applications"
ON public.job_applications
FOR INSERT
WITH CHECK (true);

-- Create policy for admins to read applications
CREATE POLICY "Admins can view job applications"
ON public.job_applications
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);

-- Create policy for admins to update applications (mark as read)
CREATE POLICY "Admins can update job applications"
ON public.job_applications
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);

-- Add index for faster queries
CREATE INDEX idx_job_applications_created_at ON public.job_applications(created_at DESC);
CREATE INDEX idx_job_applications_position ON public.job_applications(position);