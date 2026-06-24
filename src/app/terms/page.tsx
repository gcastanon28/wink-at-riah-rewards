import Link from "next/link";

const sections = [
  {
    title: "Eligibility",
    body: "Wink At Riah Rewards is intended for Wink At Riah clients who create an account to view loyalty points and available rewards. You must provide accurate account information and keep your login credentials private.",
  },
  {
    title: "Rewards Account",
    body: "Wink At Riah Rewards is provided for clients to view loyalty points, manage profile preferences, and redeem available rewards. You are responsible for keeping your login credentials private.",
  },
  {
    title: "Points and Rewards",
    body: "Points, tiers, reward availability, and redemption values may change based on current business rules. Rewards have no cash value and may be limited, modified, or discontinued at Wink At Riah's discretion.",
  },
  {
    title: "Redemptions",
    body: "A redemption deducts points from your account and creates a record in your reward history. If you believe a redemption or point balance is incorrect, contact support before your next appointment.",
  },
  {
    title: "Acceptable Use",
    body: "Do not attempt to access another client's account, manipulate points, interfere with the app, or misuse appointment and reward systems.",
  },
  {
    title: "Support",
    body: "For questions about your rewards account, appointments, or business policies, contact Wink At Riah through the support page.",
  },
  {
    title: "Account Deletion",
    body: "You may delete your rewards account from the Profile page. Deleting your rewards account removes your app login, profile, points, reward history, and profile photo from the rewards system.",
  },
];

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold">Terms of Use</h1>
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
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/support">Support</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </main>
  );
}
