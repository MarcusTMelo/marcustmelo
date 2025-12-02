-- Create newsletter_subscribers table
CREATE TABLE public.newsletter_subscribers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  name text,
  consent boolean NOT NULL DEFAULT true,
  source text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for form submissions)
CREATE POLICY "Allow public inserts" 
ON public.newsletter_subscribers 
FOR INSERT 
WITH CHECK (true);

-- Admins can read all subscribers
CREATE POLICY "Admins can read all subscribers" 
ON public.newsletter_subscribers 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete subscribers
CREATE POLICY "Admins can delete subscribers" 
ON public.newsletter_subscribers 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index on email for faster lookups
CREATE INDEX idx_newsletter_subscribers_email ON public.newsletter_subscribers(email);

-- Create index on created_at for sorting
CREATE INDEX idx_newsletter_subscribers_created_at ON public.newsletter_subscribers(created_at DESC);