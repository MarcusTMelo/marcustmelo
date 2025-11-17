-- Create storage bucket for blog images
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true);

-- Create policies for blog-images bucket
-- Allow authenticated users to upload images
create policy "Authenticated users can upload blog images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'blog-images');

-- Allow anyone to view blog images (public bucket)
create policy "Anyone can view blog images"
on storage.objects
for select
using (bucket_id = 'blog-images');

-- Allow authenticated users to update their uploaded images
create policy "Authenticated users can update blog images"
on storage.objects
for update
to authenticated
using (bucket_id = 'blog-images');

-- Allow authenticated users to delete blog images
create policy "Authenticated users can delete blog images"
on storage.objects
for delete
to authenticated
using (bucket_id = 'blog-images');