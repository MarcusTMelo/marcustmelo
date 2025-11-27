-- Add category_id column to blog_posts
ALTER TABLE public.blog_posts
ADD COLUMN category_id uuid REFERENCES public.blog_categories(id) ON DELETE SET NULL;