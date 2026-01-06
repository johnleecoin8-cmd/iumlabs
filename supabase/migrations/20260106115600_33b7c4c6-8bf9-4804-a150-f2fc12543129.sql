-- Create storage bucket for resumes
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'resumes', 
  'resumes', 
  false, 
  10485760, -- 10MB limit
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
);

-- Allow anyone to upload files to the resumes bucket (public upload for job applications)
CREATE POLICY "Anyone can upload resumes"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'resumes');

-- Allow anyone to read their uploaded resume (using the file path)
CREATE POLICY "Anyone can read resumes"
ON storage.objects
FOR SELECT
USING (bucket_id = 'resumes');