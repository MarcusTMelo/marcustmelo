-- Create enum for site status
CREATE TYPE public.site_status_enum AS ENUM ('ativo', 'manutencao', 'desenvolvimento');

-- Create site_settings table
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT '00000000-0000-0000-0000-000000000001'::uuid,
  status public.site_status_enum NOT NULL DEFAULT 'ativo',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT single_settings_row CHECK (id = '00000000-0000-0000-0000-000000000001'::uuid)
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Anyone can read site status
CREATE POLICY "Anyone can read site status"
ON public.site_settings
FOR SELECT
USING (true);

-- RLS Policy: Authenticated users can update site status
CREATE POLICY "Authenticated users can update site status"
ON public.site_settings
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial settings record
INSERT INTO public.site_settings (id, status)
VALUES ('00000000-0000-0000-0000-000000000001'::uuid, 'ativo')
ON CONFLICT (id) DO NOTHING;