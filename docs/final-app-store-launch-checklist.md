# Final App Store Launch Checklist

## Current #1 Blocker

Apple Developer Program enrollment is the current #1 blocker.

You can continue preparing the app, assets, QA plan, demo account, and listing copy now, but you cannot complete signing, TestFlight upload, App Store Connect setup, or App Review submission until the Apple Developer Program membership is active.

Supabase leaked password protection is recommended, but it is not marked as a blocking item here because it requires Supabase Pro.

## Complete Before Paying For Apple Developer Membership

1. Finalize production web app:
   - Confirm `https://wink-at-riah-rewards.vercel.app` loads.
   - Confirm `/privacy`, `/terms`, `/support`, and `/contact` load.
   - Confirm `/manifest.webmanifest` loads.

2. Complete: app icons are installed in `ios/App/App/Assets.xcassets/AppIcon.appiconset`.
   - Includes 1024 x 1024 App Store icon.
   - Includes iPhone and iPad AppIcon sizes.
   - Still visually confirm the icon in Xcode.

3. Complete: splash and launch screen assets are installed.
   - Launch logo: `ios/App/App/Assets.xcassets/LaunchLogo.imageset`
   - Launch background: `ios/App/App/Assets.xcassets/LaunchBackground.colorset`
   - Splash image set: `ios/App/App/Assets.xcassets/Splash.imageset`
   - Launch storyboard: `ios/App/App/Base.lproj/LaunchScreen.storyboard`
   - Still visually confirm launch screen rendering in Xcode.

4. Local iOS project QA:
   - Run `npm run typecheck`.
   - Run `npm run build`.
   - Run `npm run ios:sync`.
   - Run `npm run ios:open`.
   - In Xcode, verify the app opens and the project settings are readable.
   - If Xcode allows local run without paid membership, test on simulator.

5. Screenshot prep:
   - Decide screenshot sequence:
     1. Dashboard with points.
     2. Rewards Catalog.
     3. My Points earning rules.
     4. Redemption History.
     5. Profile settings.
     6. Optional staff Add Points screen for review context.
   - Draft captions outside App Store Connect.
   - Wait to capture final screenshots from the actual iOS build.

6. App Store listing copy:
   - Review `docs/app-store-submission.md`.
   - Finalize subtitle, promotional text, description, keywords, category, support URL, privacy URL, and review notes.

7. Demo account setup:
   - Create a real customer demo account in production using an inbox you control.
   - Confirm the email.
   - Add test points through `/staff/points`.
   - Verify the account can log in, redeem a reward, and reset password.
   - Save credentials privately for App Review later.

8. Final QA without Apple membership:
   - Signup.
   - Email confirmation.
   - Login.
   - Logout.
   - Password reset.
   - Profile update.
   - Avatar upload.
   - Rewards catalog.
   - Redemption with enough points.
   - Insufficient-points state.
   - Referral sharing/copy fallback.
   - Delete Account with a disposable account.
   - Staff Add Points access for approved staff emails.

9. Optional but recommended security cleanup:
   - Enable Supabase leaked password protection if/when Supabase Pro is available.
   - Re-test signup/password reset after enabling.

## After Apple Developer Membership Is Active

1. Register or confirm bundle ID:
   - `com.winkatriah.rewards`

2. Open Xcode:

```bash
npm run ios:open
```

3. In Xcode:
   - Select the Apple Developer Team.
   - Confirm Bundle ID: `com.winkatriah.rewards`.
   - Confirm display name: `Wink At Riah Rewards`.
   - Confirm version: `1.0`.
   - Increment build number before each upload.
   - Visually confirm final app icon assets.
   - Visually confirm final branded launch screen.
   - Run on a real iPhone.

4. Complete `docs/testflight-checklist.md`.

5. Archive in Xcode:
   - Product > Archive.
   - Distribute App.
   - App Store Connect.
   - Upload.

6. In App Store Connect:
   - Create app record.
   - App name: `Wink At Riah Rewards`.
   - Bundle ID: `com.winkatriah.rewards`.
   - SKU: `wink-at-riah-rewards-ios`.
   - Category: Lifestyle.

7. Add URLs:
   - Privacy Policy: `https://wink-at-riah-rewards.vercel.app/privacy`
   - Support: `https://wink-at-riah-rewards.vercel.app/support`
   - Marketing, optional: `https://wink-at-riah-rewards.vercel.app`

8. Fill App Store listing copy from `docs/app-store-submission.md`.

9. Fill App Privacy labels from `docs/app-store-submission.md`.

10. Add reviewer demo credentials and App Review notes from `docs/app-store-submission.md`.

11. Attach TestFlight build to the app version.

12. Submit for App Review.

## Go / No-Go

Do not submit until:

- [ ] Apple Developer Program membership is active.
- [ ] Xcode signing is configured.
- [ ] Demo reviewer account works.
- [ ] Delete Account works from iOS.
- [ ] Screenshots are captured from the iOS build.
- [ ] App Privacy answers are complete.
- [ ] TestFlight smoke test passes on a real iPhone.
