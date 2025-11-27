-- Add is_read column to track read/unread status
ALTER TABLE public.contact_requests 
ADD COLUMN is_read boolean NOT NULL DEFAULT false;

-- Add index for faster unread count queries
CREATE INDEX idx_contact_requests_is_read ON public.contact_requests(is_read) WHERE is_read = false;

-- Create policy to allow admins to update contact requests (mark as read)
CREATE POLICY "Admins can update contact requests" 
ON public.contact_requests 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));