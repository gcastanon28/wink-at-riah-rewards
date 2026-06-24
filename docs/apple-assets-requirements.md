# Apple Asset Requirements

## App Icon

Create a square, opaque app icon with no transparency and no rounded corners baked into the image. Apple applies the corner mask.

Recommended source file:

- `1024 x 1024 px`
- PNG
- sRGB
- No alpha channel
- Simple enough to read at small sizes

Xcode AppIcon slots commonly needed:

| Usage | Scale | Size |
| --- | ---: | ---: |
| iPhone Notification | 2x | 40 x 40 |
| iPhone Notification | 3x | 60 x 60 |
| iPhone Settings | 2x | 58 x 58 |
| iPhone Settings | 3x | 87 x 87 |
| iPhone Spotlight | 2x | 80 x 80 |
| iPhone Spotlight | 3x | 120 x 120 |
| iPhone App | 2x | 120 x 120 |
| iPhone App | 3x | 180 x 180 |
| iPad Notification | 1x | 20 x 20 |
| iPad Notification | 2x | 40 x 40 |
| iPad Settings | 1x | 29 x 29 |
| iPad Settings | 2x | 58 x 58 |
| iPad Spotlight | 1x | 40 x 40 |
| iPad Spotlight | 2x | 80 x 80 |
| iPad App | 1x | 76 x 76 |
| iPad App | 2x | 152 x 152 |
| iPad Pro App | 2x | 167 x 167 |
| App Store | 1x | 1024 x 1024 |

## Launch Screen / Splash Screen

Use Xcode's `LaunchScreen.storyboard` or asset catalog. Keep it simple:

- Solid dark background: `#0d0912`
- Centered Wink At Riah logo
- No network-loaded content
- No animation
- No text that may be clipped on smaller devices

Recommended source assets:

| Asset | Size |
| --- | ---: |
| Splash logo source | 1024 x 1024 px |
| Wide logo source, optional | 2048 x 1024 px |
| Background color | `#0d0912` |

## App Store Screenshots

Capture screenshots from the real TestFlight/iOS build, not browser screenshots.

Minimum recommended iPhone screenshot sets:

| Device Class | Pixel Size |
| --- | ---: |
| 6.9 inch iPhone | 1320 x 2868 |
| 6.7 inch iPhone | 1290 x 2796 |
| 6.5 inch iPhone | 1242 x 2688 |
| 5.5 inch iPhone | 1242 x 2208 |

Suggested screenshot sequence:

1. Dashboard with point balance.
2. Rewards Catalog.
3. My Points earning rules.
4. Redemption History.
5. Profile settings with account controls.
6. Staff Add Points page, only if Apple review needs staff workflow context.

## Marketing / Listing Graphic Guidance

- Do not show fake prices or cash-out claims.
- Do not imply rewards have cash value.
- Keep copy aligned with Terms: points and rewards may change at Wink At Riah's discretion.
