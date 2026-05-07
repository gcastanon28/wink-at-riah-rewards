# Launch Checklist

## Completed in this pass

- Supabase auth is the only app auth path.
- Protected app pages redirect logged-out users to `/login`.
- Sidebar navigation includes Supabase sign out.
- `.env.example` documents required public Supabase variables.
- TypeScript validation passes and production build completes.
- Supabase launch schema/RLS reference added in `docs/supabase-launch-schema.sql`.

## Before public launch

- Apply and review the Supabase schema/RLS policies in the target project.
- Create the `avatars` storage bucket and confirm storage policies.
- Seed active rewards in the `rewards` table.
- Test signup, login, password reset, avatar upload, profile update, and reward redemption with a real Supabase user.
- Confirm Supabase Auth email templates and redirect URLs match the production domain.
- Add privacy policy, terms/support contact, and app metadata for the distribution channel.
- Replace any demo copy or placeholder reward rules with final business rules.
- Decide whether this ships as a web/PWA first or gets wrapped as a native app for App Store submission.
