-- Add views_count column to blog_posts table
ALTER TABLE public.blog_posts 
ADD COLUMN views_count integer NOT NULL DEFAULT 0;

-- Create index for better performance when sorting by views
CREATE INDEX idx_blog_posts_views_count ON public.blog_posts(views_count DESC);

-- Create function to increment view count
CREATE OR REPLACE FUNCTION public.increment_post_views(post_slug text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.blog_posts
  SET views_count = views_count + 1
  WHERE slug = post_slug AND status = 'published';
END;
$$;

-- Grant execute permission to anon users (public can increment views)
GRANT EXECUTE ON FUNCTION public.increment_post_views(text) TO anon;
GRANT EXECUTE ON FUNCTION public.increment_post_views(text) TO authenticated;