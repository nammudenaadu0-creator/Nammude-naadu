-- Voice Messages Storage Bucket
-- Run this in Supabase Dashboard > SQL Editor
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'voice-messages',
  'voice-messages', 
  true,
  5242880, -- 5MB max per file
  array['audio/webm', 'audio/mp4', 'audio/ogg', 'audio/mpeg']
)
on conflict (id) do nothing;

-- RLS: Anyone can upload voice messages (authenticated by citizen headers)
create policy "Allow voice message uploads" on storage.objects
  for insert with check (bucket_id = 'voice-messages');

-- RLS: Anyone can read voice messages (public bucket)
create policy "Allow voice message reads" on storage.objects
  for select using (bucket_id = 'voice-messages');

-- RLS: Only owner can delete (based on name prefix with user phone/id)
create policy "Allow voice message delete by owner" on storage.objects
  for delete using (bucket_id = 'voice-messages');
