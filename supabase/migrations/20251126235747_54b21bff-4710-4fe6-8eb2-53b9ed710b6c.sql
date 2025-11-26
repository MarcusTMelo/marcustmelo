-- Create blog_categories table
CREATE TABLE public.blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

-- Public can read categories
CREATE POLICY "Public can read categories"
ON public.blog_categories
FOR SELECT
USING (true);

-- Only admins can create categories
CREATE POLICY "Only admins can create categories"
ON public.blog_categories
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update categories
CREATE POLICY "Only admins can update categories"
ON public.blog_categories
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete categories
CREATE POLICY "Only admins can delete categories"
ON public.blog_categories
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));