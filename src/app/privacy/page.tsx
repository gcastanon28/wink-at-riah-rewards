import Link from "next/link";

const sections = [
  {
    title: "Who We Are",
    body: "Wink At Riah Rewards is a client loyalty experience for Wink At Riah lash clients. For privacy questions, contact wink.at.riah@gmail.com.",
  },
  {
    title: "Information We Collect",
    body: "Wink At Riah Rewards collects account information such as your name, email address, phone number, profile preferences, reward points, reward redemptions, referral link activity, and optional profile photo. We also use Supabase Auth to manage login sessions and password reset requests.",
  },
  {
    title: "How We Use Information",
    body: "We use your information to operate the rewards program, show your points balance, process reward redemptions, personalize your profile, support appointment-related communication, and improve the client experience.",
  },
  {
    title: "Sharing",
    body: "We do not sell your personal information. Information may be processed by service providers that help run the app, including Vercel for hosting, Supabase for authentication and database storage, SendGrid for transactional email delivery, and GlossGenius when you open the booking portal.",
  },
  {
    title: "Data Retention",
    body: "We keep rewards records while your account is active so your points and redemption history can be honored. If you delete your account, the app removes your login, profile, points, reward history, and profile photo from the rewards system, except where business records must be retained separately for legal or operational reasons.",
  },
  {
    title: "Your Choices",
    body: "You can update profile and communication preferences in the app. You can also delete your account from the Profile page, which removes your login, profile, points, reward history, and profile photo. For account help or corrections, contact Wink At Riah through the support page.",
  },
  {
    title: "Security",
    body: "The app uses Supabase authentication, row-level database security, and scoped storage policies. No online service can guarantee perfect security, but the rewards system is designed to limit account access to signed-in users.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl space-y-8">
          <Link href="/login" className="text-sm font-semibold text-primary">
            Back to login
          </Link>

        <section className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Wink At Riah Rewards
          </p>
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated June 24, 2026</p>
        </section>

        <div className="space-y-6">
          {sections.map((section) => (
            <section key={section.title} className="space-y-2">
              <h2 className="text-2xl font-bold">{section.title}</h2>
              <p className="text-lg leading-8 text-muted-foreground">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <nav className="flex flex-wrap gap-4 text-sm font-semibold text-primary">
          <Link href="/terms">Terms of Use</Link>
          <Link href="/support">Support</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </main>
  );
}
