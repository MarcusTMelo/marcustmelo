-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Anyone can read published posts" ON public.blog_posts;

-- Create policy for public access to published posts
CREATE POLICY "Public can read published posts" 
ON public.blog_posts 
FOR SELECT 
USING (status = 'published');

-- Create policy for admins to read all posts (including drafts)
CREATE POLICY "Admins can read all posts" 
ON public.blog_posts 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));