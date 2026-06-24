# Launch Checklist

## Completed in this pass

- Supabase auth is the only app auth path.
- Protected app pages redirect logged-out users to `/login`.
- Sidebar navigation includes Supabase sign out.
- `.env.example` documents required public Supabase variables.
- TypeScript validation passes and production build completes.
- Supabase launch schema/RLS reference added in `docs/supabase-launch-schema.sql`.
- Live Supabase project has the signup profile trigger, scoped RLS policies, and `avatars` bucket applied.
- Signup handles both immediate-session and email-confirmation Supabase auth flows.
- Supabase RLS policies were optimized and required `user_id` indexes were added.
- Reward redemption now runs through the secure `redeem_reward` RPC instead of client-side point updates.
- Direct browser updates to `profiles.points` are blocked.
- Active rewards are seeded and matching reward image assets exist.
- Live smoke test passed for signup, login, reward fetch, profile update, avatar upload/remove, password reset request, and secure reward redemption.
- Referral links use `NEXT_PUBLIC_APP_URL` instead of a hardcoded deployment URL.
- Vercel production hosting is configured at `https://wink-at-riah-rewards.vercel.app`.
- Vercel production environment variables are set for Supabase URL, Supabase anon key, and app URL.
- Privacy, terms, and support pages are live and linked from auth screens.
- Reward and point rules are documented in `docs/reward-business-rules.md`.
- Staff point awards are handled through the protected `owner_award_points` RPC and documented in `docs/staff-points-workflow.md`.
- Supabase Auth redirect allow list includes `https://wink-at-riah-rewards.vercel.app/**` and `http://localhost:3000/**`.
- Signup and password reset email templates are branded for Wink At Riah and preserve Supabase's confirmation URL variable.
- Signup now passes an explicit email redirect URL so confirmation links return to the deployed app instead of relying on Supabase's default Site URL.
- Supabase Auth leaked password protection is recommended when Supabase Pro is available; it is not tracked as an Apple launch blocker in this checklist.
- Supabase Auth email confirmation is enabled for new signups.
- Supabase Auth password rules require at least 8 characters with lowercase, uppercase, digits, and symbols.
- Supabase Security Advisor may warn about leaked password protection when Pro-only protection is unavailable, and may warn about staff RPC functions that intentionally enforce staff access internally.
- Supabase Performance Advisor shows 0 errors and 0 warnings; the remaining 2 info suggestions are not launch blockers.
- Supabase Auth custom SMTP is enabled through SendGrid using `smtp.sendgrid.net`, username `apikey`, and port `587`.
- The current Supabase Auth sender is the verified SendGrid sender `gcastanon28@gmail.com` with sender name `Wink At Riah`.

## Before public launch

- Apple Developer Program enrollment is the current #1 blocker for App Store submission.
- Decide whether to keep using the current Vercel URL with explicit redirect URLs or move to a custom/no-`rewards` production domain. Supabase rejected `https://wink-at-riah-rewards.vercel.app/` as the default Auth Site URL because it contains a blocked keyword.
- Verify the branded sender address or authenticate a sending domain in SendGrid, then switch Supabase Auth from `gcastanon28@gmail.com` to the final Wink At Riah sender address.
- Review Supabase Auth rate limits for launch signup/password-reset traffic now that custom SMTP is configured.
- Decide whether to keep Supabase Spend Cap enabled for cost protection or disable it for smoother scaling beyond included Pro quotas.
- Rerun Supabase Security Advisor and Performance Advisor after final SMTP/domain settings are in place.
- Run one final browser test on the deployed URL with a real owner-approved test account.
- Continue pre-membership App Store prep in `docs/final-app-store-launch-checklist.md`: icons, splash assets, local iOS QA, screenshot planning, listing copy, demo account setup, and final QA.
