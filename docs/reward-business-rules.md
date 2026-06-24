# Reward And Points Business Rules

## Launch Rewards

| Reward | Point Cost | Rule |
| --- | ---: | --- |
| Birthday Bonus | 50 | Birthday-month reward or owner-approved surprise reward. |
| Free Lash Bath | 75 | Complimentary lash bath redeemable at a future visit. |
| $10 Off Fill | 100 | $10 credit toward a future fill appointment. |
| VIP Priority Booking | 150 | Priority access to peak appointment slots when available. |

## Earning Points

| Action | Points |
| --- | ---: |
| Appointment completed | 5 |
| Prebook next fill | 5 |
| Birthday month bonus | 10 |
| Review left | 2 to 3 |

## Operational Rules

- Points have no cash value.
- Rewards are redeemed in the app and should be shown during the next visit.
- Staff awards points through the staff app page and the protected `owner_award_points` RPC documented in `docs/staff-points-workflow.md`.
- Customers cannot directly edit point balances.
- Owner-approved corrections should use the reason `Manual correction approved by owner`.
- Seasonal rewards can be added to `public.rewards` with `active = true`; retired rewards should be set to `active = false`.
