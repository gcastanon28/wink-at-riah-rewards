import Link from "next/link";
import { Calendar, Mail } from "lucide-react";

const supportEmail = "wink.at.riah@gmail.com";

export default function SupportPage() {
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
          <h1 className="text-4xl font-bold">Support</h1>
          <p className="text-lg leading-8 text-muted-foreground">
            Get help with your rewards account, point balance, appointments,
            profile updates, or reward redemptions.
          </p>
        </section>

        <section className="space-y-4 rounded-3xl border border-white/10 bg-card p-6">
          <h2 className="text-2xl font-bold">Book or Manage an Appointment</h2>
          <p className="text-muted-foreground">
            Use the booking portal for appointment availability and scheduling.
          </p>
          <a
            href="https://winkatriah.glossgenius.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-2xl bg-primary px-5 py-3 font-bold text-primary-foreground"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Open Booking Portal
          </a>
        </section>

        <section className="space-y-4 rounded-3xl border border-white/10 bg-card p-6">
          <h2 className="text-2xl font-bold">Rewards Help</h2>
          <p className="text-muted-foreground">
            For point corrections, reward questions, account deletion, or
            profile support, contact Wink At Riah directly by email, through the
            booking portal, or during your next appointment.
          </p>
          <a
            href={`mailto:${supportEmail}?subject=Wink%20At%20Riah%20Rewards%20Support`}
            className="flex items-center text-primary"
          >
            <Mail className="mr-2 h-5 w-5" />
            <span className="font-semibold">{supportEmail}</span>
          </a>
        </section>

        <nav className="flex flex-wrap gap-4 text-sm font-semibold text-primary">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Use</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </main>
  );
}
