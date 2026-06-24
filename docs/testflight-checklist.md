# TestFlight Testing Checklist

## Build Verification

- [ ] `npm run typecheck` passes.
- [ ] `npm run build` passes.
- [ ] `npm run ios:sync` completes without errors.
- [ ] Xcode opens the generated `ios/App/App.xcodeproj`.
- [ ] Bundle ID is `com.winkatriah.rewards`.
- [ ] Signing team is selected.
- [ ] App version is `1.0`.
- [ ] Build number is incremented before each upload.
- [ ] App icon is visible on device.
- [ ] Launch screen is branded and not blank.

## Device Coverage

Test on at least:

- [ ] Current iPhone on latest iOS.
- [ ] Smaller iPhone viewport, simulator acceptable for layout.
- [ ] Poor network mode or airplane mode recovery.

## Customer Flow

- [ ] Fresh install opens the app.
- [ ] Signup creates account.
- [ ] Email confirmation opens successfully.
- [ ] Login works.
- [ ] Session persists after force closing and reopening.
- [ ] Logout returns to login.
- [ ] Forgot password sends email.
- [ ] Password reset link opens reset screen.
- [ ] New password login works.
- [ ] Profile name/phone/preferences save.
- [ ] Avatar upload works.
- [ ] Delete Account works on a disposable test account.

## Rewards Flow

- [ ] Dashboard point balance loads.
- [ ] Progress to next reward is correct.
- [ ] Rewards catalog loads all active rewards.
- [ ] Locked rewards show clear locked/needed points state.
- [ ] Redemption succeeds when points are sufficient.
- [ ] Redemption fails gracefully when points are insufficient.
- [ ] Redemption history updates.
- [ ] Points cannot be edited by customer profile updates.

## Referral Flow

- [ ] Refer a Bestie opens native iOS share sheet.
- [ ] Canceling share does not show an error.
- [ ] Clipboard fallback works if native share is unavailable.
- [ ] Referral URL is `https://wink-at-riah-rewards.vercel.app`.

## Staff Flow

- [ ] Staff email sees Add Points navigation.
- [ ] Non-staff email does not see Add Points navigation.
- [ ] `/staff/points` blocks non-staff accounts.
- [ ] Staff can search customers.
- [ ] Staff can award points.
- [ ] Awarded points appear for the customer.

## Legal / Support

- [ ] Privacy page loads.
- [ ] Terms page loads.
- [ ] Support page loads.
- [ ] Contact page loads.
- [ ] External GlossGenius booking link opens.
- [ ] Support email link opens mail composer.

## App Store Review Readiness

- [ ] Demo account is created and confirmed.
- [ ] Demo account has enough points to test redemption.
- [ ] Review notes include demo credentials.
- [ ] Review notes explain staff-only route is restricted.
- [ ] Privacy answers in App Store Connect match `docs/app-store-submission.md`.
