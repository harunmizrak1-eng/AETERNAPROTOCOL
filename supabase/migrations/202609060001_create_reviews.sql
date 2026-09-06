create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_slug text,
  product_name text,
  display_name text not null check (char_length(display_name) between 2 and 40),
  rating smallint not null check (rating between 1 and 5),
  body text not null check (char_length(body) between 20 and 700),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);
create index if not exists reviews_public_listing_idx on public.reviews (status, product_slug, created_at desc);
alter table public.reviews enable row level security;
revoke all on table public.reviews from anon, authenticated;
grant select, insert on table public.reviews to anon, authenticated;
drop policy if exists "approved reviews are public" on public.reviews;
create policy "approved reviews are public" on public.reviews for select to anon, authenticated using (status = 'approved');
drop policy if exists "visitors submit pending reviews" on public.reviews;
create policy "visitors submit pending reviews" on public.reviews for insert to anon, authenticated with check (status = 'pending');
