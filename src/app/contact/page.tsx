import Link from "next/link";
import { Calendar, Mail, ShieldQuestion } from "lucide-react";

const supportEmail = "wink.at.riah@gmail.com";

export default function ContactPage() {
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
          <h1 className="text-4xl font-bold">Contact</h1>
          <p className="text-lg leading-8 text-muted-foreground">
            Reach Wink At Riah for rewards support, profile help, appointment
            questions, account deletion help, or App Store review follow-up.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <a
            href={`mailto:${supportEmail}?subject=Wink%20At%20Riah%20Rewards%20Support`}
            className="rounded-3xl border border-white/10 bg-card p-6 transition hover:border-primary/60"
          >
            <Mail className="mb-4 h-7 w-7 text-primary" />
            <h2 className="text-2xl font-bold">Email Support</h2>
            <p className="mt-2 text-muted-foreground">{supportEmail}</p>
          </a>

          <a
            href="https://winkatriah.glossgenius.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-3xl border border-white/10 bg-card p-6 transition hover:border-primary/60"
          >
            <Calendar className="mb-4 h-7 w-7 text-primary" />
            <h2 className="text-2xl font-bold">Booking Portal</h2>
            <p className="mt-2 text-muted-foreground">
              Manage appointments through GlossGenius.
            </p>
          </a>
        </section>

        <section className="rounded-3xl border border-white/10 bg-card p-6">
          <div className="flex items-start gap-4">
            <ShieldQuestion className="mt-1 h-6 w-6 shrink-0 text-primary" />
            <div>
              <h2 className="text-2xl font-bold">Response Expectations</h2>
              <p className="mt-2 text-muted-foreground">
                Rewards and account requests are reviewed by Wink At Riah.
                Include your account email, a short description of the issue,
                and any appointment date related to the question.
              </p>
            </div>
          </div>
        </section>

        <nav className="flex flex-wrap gap-4 text-sm font-semibold text-primary">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Use</Link>
          <Link href="/support">Support</Link>
        </nav>
      </div>
    </main>
  );
}
