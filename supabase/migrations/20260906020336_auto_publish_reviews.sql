alter table public.reviews
  alter column status set default 'approved';

drop policy if exists "visitors submit pending reviews" on public.reviews;
drop policy if exists "visitors publish reviews" on public.reviews;

create policy "visitors publish reviews"
on public.reviews
for insert
to anon, authenticated
with check (status = 'approved');

update public.reviews
set status = 'approved'
where status = 'pending';
