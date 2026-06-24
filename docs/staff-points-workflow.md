# Staff Points Workflow

## Launch Decision

Staff should not directly edit client point balances in the table editor or from a customer browser session. Points are awarded through protected database functions that validate the owner email and record every award in `public.points_ledger`.

The owner-facing app page is:

```text
/staff/points
```

Apply `docs/staff-points-live-sql.sql` in Supabase SQL Editor before using the page in production.

## Current Earning Rules

- Appointment completed: `+5` points
- Prebook next fill: `+5` points
- Birthday month bonus: `+10` points
- Review left: `+2` to `+3` points

## Award Points In The App

1. Sign in with the Wink At Riah owner account.
2. Open `/staff/points`.
3. Search by client name, email, or phone.
4. Select the customer.
5. Pick a preset or enter custom points and a reason.
6. Click `Add Points`.

The customer's balance updates immediately in `public.profiles`, and a matching row is inserted into `public.points_ledger`.

## Manual Supabase Fallback

1. Open Supabase Dashboard.
2. Go to Table Editor > `profiles`.
3. Find the client by email and copy the `id`.
4. Open SQL Editor.
5. Run:

```sql
select *
from public.owner_award_points(
  'CLIENT_PROFILE_ID_HERE',
  5,
  'Appointment completed'
);
```

Use a specific reason for the ledger, such as:

- `Appointment completed`
- `Prebooked next fill`
- `Birthday month bonus`
- `Review left`
- `Manual correction approved by owner`

## Future Admin Dashboard

If more employees are added later, replace the owner email allow-list with staff roles stored in `raw_app_meta_data` or a private staff table. Never use user-editable profile metadata for authorization decisions.
