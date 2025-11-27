-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete blog images" ON storage.objects;

-- Create admin-only upload policy
CREATE POLICY "Admins can upload blog images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'blog-images' AND
  public.has_role(auth.uid(), 'admin')
);

-- Create admin-only update policy
CREATE POLICY "Admins can update blog images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'blog-images' AND
  public.has_role(auth.uid(), 'admin')
);

-- Create admin-only delete policy
CREATE POLICY "Admins can delete blog images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'blog-images' AND
  public.has_role(auth.uid(), 'admin')
);