# App Store Readiness Audit

Last updated: June 24, 2026

## Critical Blockers

- Apple Developer Program enrollment is not active yet. App Store submission still requires signing, TestFlight upload, App Store Connect setup, and App Review submission.
- Final App Store screenshots are not present. Capture them from the finished iOS build on required Apple device sizes.
- A real Apple review demo account must be created, confirmed, funded with test points, and kept active during review.
- App Store privacy nutrition labels must be entered manually in App Store Connect using the data inventory in `docs/app-store-submission.md`.

## Fixed Automatically

- Added PWA manifest metadata and mobile web app metadata.
- Added mobile safe-area handling for notched iPhones.
- Added Contact page with support email and booking portal.
- Expanded Privacy Policy, Terms, and Support content.
- Added native share-sheet support for referral links with clipboard fallback.
- Added autocomplete/input mode attributes to authentication and profile forms.
- Aligned points earning copy with documented business rules.
- Generated App Store listing copy, review notes, privacy details draft, and support URLs.

## Verified In Code

- Sign up, login, logout, password reset, profile updates, redemption, referral sharing, staff point tools, and account deletion have implemented routes/components.
- Delete Account is implemented through a server route and does not expose the Supabase service role key to the browser.
- `NEXT_PUBLIC_` variables are limited to browser-safe Supabase URL/anon/publishable values and app URL.
- Live Supabase RLS is enabled for profiles, rewards, redemptions, points ledger, and storage objects.
- Customers can read/update their own profile rows but cannot directly update point balances.

## Remaining Manual Tasks

- Enroll in the Apple Developer Program.
- Add final iOS app icons and launch screen assets in Xcode.
- Run TestFlight on real iPhone hardware.
- Enter App Store metadata and privacy answers in App Store Connect.
- Provide App Review credentials and notes.
- Confirm Apple Developer Program enrollment and agreements are active.
- Decide whether to keep the Vercel URL or move to a branded production domain before final submission.

## Recommended Final QA

- Test signup with a new email.
- Confirm email delivery from SendGrid.
- Test login and session persistence after force closing the app.
- Test forgot-password email and reset flow.
- Test profile save, avatar upload, logout, and account deletion with a disposable account.
- Test reward redemption with enough points and insufficient points.
- Test referral share on a physical iPhone.
- Test offline/poor-network behavior in the iOS wrapper.
