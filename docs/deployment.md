# Deployment

## Production Host

The launch host is Vercel.

- Production URL: `https://wink-at-riah-rewards.vercel.app`
- Vercel project: `wink-at-riah-rewards`
- Production deployment verified: login, privacy, terms, and support pages return `200`.

## Production Environment Variables

These are configured in Vercel Production:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_URL`

`NEXT_PUBLIC_APP_URL` is set to:

```text
https://wink-at-riah-rewards.vercel.app
```

## Supabase Dashboard Settings

The Supabase connector used for this launch work can manage database schema, policies, functions, advisors, and logs. Hosted Auth dashboard settings were updated in the Supabase Dashboard where possible:

- Supabase organization plan is Pro.
- Email confirmation is enabled for new signups.
- Leaked password protection is enabled.
- Minimum password length is `8`.
- Password requirements are set to lowercase letters, uppercase letters, digits, and symbols.
- Redirect URLs include:

```text
https://wink-at-riah-rewards.vercel.app/**
http://localhost:3000/**
```

- Signup confirmation and password reset templates use Wink At Riah wording and preserve `{{ .ConfirmationURL }}`.
- The app passes explicit email redirect URLs for signup confirmation and password reset, so auth links return to the live origin.
- Custom SMTP is enabled for Supabase Auth through SendGrid.
- SMTP host is `smtp.sendgrid.net`, port is `587`, username is `apikey`, and the sender name is `Wink At Riah`.
- The current sender email is the verified SendGrid sender `gcastanon28@gmail.com`.
- Security Advisor reports 0 errors, 0 warnings, and 0 info suggestions.
- Performance Advisor reports 0 errors and 0 warnings. It has 2 info suggestions: one unused-index note for `public.redemptions` and one Auth connection-management strategy note. These are not public launch blockers.

Remaining dashboard decisions:

1. Supabase rejected `https://wink-at-riah-rewards.vercel.app/` as the default Auth Site URL because it contains a blocked keyword. Keep the explicit redirect URL behavior or switch to a custom/no-`rewards` production domain.
2. Verify the branded sender address or authenticate a SendGrid sending domain, then switch Supabase Auth from `gcastanon28@gmail.com` to the final Wink At Riah sender address.
3. Review Auth rate limits now that custom SMTP is configured.
4. Decide whether to keep Supabase Spend Cap enabled for cost protection or disable it for smoother scaling beyond included Pro quotas.
