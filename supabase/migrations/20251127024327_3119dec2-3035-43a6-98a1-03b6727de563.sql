-- Create table for contact form submissions
CREATE TABLE public.contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  subject text,
  message text NOT NULL,
  ip_address text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

-- Create policy allowing anonymous inserts (form submissions from public users)
CREATE POLICY "Allow anonymous inserts" 
ON public.contact_requests 
FOR INSERT 
TO anon
WITH CHECK (true);

-- Create policy for admins to read all contact requests
CREATE POLICY "Admins can read all contact requests" 
ON public.contact_requests 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create policy for admins to delete contact requests
CREATE POLICY "Admins can delete contact requests" 
ON public.contact_requests 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for rate limiting by IP
CREATE INDEX idx_contact_requests_ip_created ON public.contact_requests (ip_address, created_at);

-- Create index for admin queries
CREATE INDEX idx_contact_requests_created_at ON public.contact_requests (created_at DESC);