# iOS App Store Setup Guide

This project is currently a Next.js web app deployed at:

https://wink-at-riah-rewards.vercel.app

The highest-priority App Store blocker is Apple Developer Program enrollment. The repository now includes a Capacitor config and generated `ios/` project, but signing, TestFlight upload, App Store Connect setup, and App Review submission require an active Apple Developer Program membership.

## What Was Added

- `capacitor.config.json`
- `ios/`
- `package.json` scripts:
  - `ios:add`
  - `ios:sync`
  - `ios:open`

The config uses the production Vercel URL because this app depends on a server route for account deletion and on the live Supabase/Vercel deployment. This is the fastest path to an iOS wrapper, but Apple may reject apps that feel like a plain website. Before submission, test carefully and make the wrapper feel app-like with a real icon, launch screen, stable mobile layout, and complete support/legal pages.

## One-Time Local Setup In VS Code

Run these commands from the project root:

```bash
cd /Users/gabrielocastanon95/Documents/Codex/2026-05-06/are-you-able-to-fix-oci/wink-at-riah-rewards-duplicate
```

Make sure npm uses HTTPS:

```bash
npm config set registry https://registry.npmjs.org/
```

Capacitor is already installed in this workspace. If you ever clone the project fresh, install dependencies with:

```bash
npm install
```

The iOS project has already been generated. Do not run this unless `ios/` is missing:

```bash
npm run ios:add
```

Sync the current config into iOS:

```bash
npm run ios:sync
```

Open the iOS project in Xcode:

```bash
npm run ios:open
```

## Xcode Setup

1. Select the `App` project in Xcode.
2. Set the bundle identifier to:

```text
com.winkatriah.rewards
```

3. Select the Apple Developer Team after Apple Developer Program enrollment is active.
4. Set display name to:

```text
Wink At Riah
```

5. Add app icon assets.
6. Add a launch screen/splash screen using Wink At Riah branding.
7. Confirm iPhone portrait layout.
8. Build and run on a physical iPhone.

## TestFlight Build

After the app runs locally:

```bash
npm run ios:sync
```

Then in Xcode:

1. Choose `Any iOS Device`.
2. Product > Archive.
3. Distribute App.
4. Upload to App Store Connect.
5. Add the build to TestFlight.

## Required Manual App Store Connect Items

Use `docs/app-store-submission.md` for copy.

Manual checklist:

1. Create the app in App Store Connect.
2. Set app name: `Wink At Riah Rewards`.
3. Set bundle ID: `com.winkatriah.rewards`.
4. Add screenshots from the actual iOS build.
5. Add privacy policy URL:

```text
https://wink-at-riah-rewards.vercel.app/privacy
```

6. Add support URL:

```text
https://wink-at-riah-rewards.vercel.app/support
```

7. Fill App Privacy details from `docs/app-store-submission.md`.
8. Create a demo review account.
9. Add review notes explaining the rewards flow and staff-only `/staff/points` page.
10. Submit for review.

## Before Submission

Do these final checks:

```bash
npm run typecheck
npm run build
```

Then test on a real iPhone:

- Sign up
- Confirm email
- Login
- Logout
- Password reset
- Profile update
- Reward redemption
- Referral sharing
- Delete account
- External booking link

## Known Manual Blockers

- Apple Developer Program membership is not active yet.
- Apple signing must be configured after enrollment.
- App icons and launch screen must be added in Xcode.
- Screenshots must be captured from the real iOS app.
- Supabase leaked password protection is recommended if/when Supabase Pro is available, but it is not tracked as a blocker in this checklist.
