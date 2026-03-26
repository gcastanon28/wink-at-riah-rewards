"use client";

import Link from "next/link";
import { CalendarDays, ChevronRight } from "lucide-react";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useClientData } from "@/hooks/use-client-data";

export default function DashboardPage() {
  const { clientData } = useClientData();

  const displayTier =
    clientData?.tier && clientData.tier.trim() !== ""
      ? clientData.tier
      : "New Member";

  const displayPoints = clientData?.points ?? 0;
  const remaining = Math.max(200 - displayPoints, 0);

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />

      <SidebarInset className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl space-y-10 p-6 pt-0 md:p-10 md:pt-10 lg:p-12">
          {/* MOBILE HEADER ONLY FOR DASHBOARD */}
          <div className="relative -mx-6 md:hidden">
            <div className="border-b border-white/10 bg-black">
              <div className="flex items-center gap-4 px-6 py-4 pl-24">
                <img
                  src="/logo-full.png"
                  alt="Wink At Riah"
                  className="h-16 w-16 rounded-2xl object-cover"
                />

                <div>
                  <h2 className="text-2xl font-bold text-primary">
                    Wink At Riah
                  </h2>
                  <p className="text-lg text-muted-foreground">Lash Rewards</p>
                </div>
              </div>
            </div>

            {/* spacer so the built-in sidebar trigger stays visible on top */}
            <div className="pointer-events-none absolute left-4 top-4 z-30">
              <div className="h-14 w-14 rounded-full" />
            </div>
          </div>

          {/* HERO SECTION */}
          <section className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-5xl font-bold leading-tight md:text-7xl">
                Welcome back,
                <br />
                beautiful✨
              </h1>

              <p className="text-xl italic text-muted-foreground md:text-2xl">
                Ready for your next glow up at Wink At Riah? ✨
              </p>
            </div>

            <Button
              asChild
              className="h-14 rounded-2xl px-8 text-xl font-semibold"
            >
              <Link href="https://winkatriah.glossgenius.com/" target="_blank">
                <CalendarDays className="mr-2 h-5 w-5" />
                Book Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </section>

          {/* REWARDS SUMMARY CARD */}
          <section className="rounded-3xl border border-white/10 bg-card p-8 shadow-xl">
            <h2 className="text-4xl font-bold">Your Lash Rewards</h2>

            <p className="mt-4 text-xl">
              Status:{" "}
              <span className="font-bold text-primary">{displayTier}</span>
            </p>

            <div className="mt-6 flex items-end gap-3">
              <span className="text-7xl font-bold text-primary">
                {displayPoints}
              </span>
              <span className="pb-2 text-3xl font-bold tracking-wide">
                POINTS
              </span>
            </div>

            <div className="mt-8 space-y-3">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Progress to Next Gift</span>
                <span className="text-primary">{remaining} points remaining</span>
              </div>

              <div className="h-4 w-full rounded-full bg-muted">
                <div
                  className="h-4 rounded-full bg-primary transition-all"
                  style={{
                    width: `${Math.min((displayPoints / 200) * 100, 100)}%`,
                  }}
                />
              </div>

              <p className="text-lg italic text-muted-foreground">
                You&apos;re glowing! Next unlock: VIP Priority Booking status.
              </p>
            </div>
          </section>

          {/* VIP HEADER */}
          <section className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <h2 className="text-5xl font-bold">VIP Rewards</h2>

            <Link
              href="/rewards"
              className="text-3xl font-bold text-primary hover:opacity-80"
            >
              View Catalog
            </Link>
          </section>

          {/* DASHBOARD REWARD CARDS */}
          <section className="grid gap-8 md:grid-cols-2">
            {/* Birthday Bonus */}
            <div className="rounded-3xl overflow-hidden border border-white/10 bg-card shadow-xl">
              <img
                src="/rewards/birthday.jpg"
                alt="Birthday Bonus"
                className="h-56 w-full object-cover"
              />

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-3xl font-bold">Birthday Bonus</h3>
                  <p className="text-xl text-muted-foreground">
                    Special Birthday Reward 🎉
                  </p>
                </div>

                <Button className="w-full h-14 rounded-2xl text-xl font-semibold">
                  Redeem for 50 pts
                </Button>
              </div>
            </div>

            {/* Free Lash Bath */}
            <div className="rounded-3xl overflow-hidden border border-white/10 bg-card shadow-xl">
              <img
                src="/rewards/lash-bath.jpg"
                alt="Free Lash Bath"
                className="h-56 w-full object-cover"
              />

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-3xl font-bold">Free Lash Bath</h3>
                  <p className="text-xl text-muted-foreground">
                    Complimentary Lash Bath
                  </p>
                </div>

                <Button className="w-full h-14 rounded-2xl text-xl font-semibold">
                  Redeem for 75 pts
                </Button>
              </div>
            </div>

            {/* $10 Off Fill */}
            <div className="rounded-3xl overflow-hidden border border-white/10 bg-card shadow-xl">
              <img
                src="/rewards/fill.jpg"
                alt="$10 Off Fill"
                className="h-56 w-full object-cover"
              />

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-3xl font-bold">$10 Off Fill</h3>
                  <p className="text-xl text-muted-foreground">
                    Save $10 On Your Next Fill.
                  </p>
                </div>

                <Button className="w-full h-14 rounded-2xl text-xl font-semibold">
                  Redeem for 100 pts
                </Button>
              </div>
            </div>

            {/* VIP Priority Booking */}
            <div className="rounded-3xl overflow-hidden border border-white/10 bg-card shadow-xl">
              <img
                src="/rewards/vip.jpg"
                alt="VIP Priority Booking"
                className="h-56 w-full object-cover"
              />

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-3xl font-bold">VIP Priority Booking</h3>
                  <p className="text-xl text-muted-foreground">
                    Skip the waitlist and get first access to peak appointment
                    slots.
                  </p>
                </div>

                <Button className="w-full h-14 rounded-2xl text-xl font-semibold">
                  Redeem for 150 pts
                </Button>
              </div>
            </div>

{/* Refer a Bestie */}
<div className="rounded-3xl border border-white/10 bg-card shadow-xl md:col-span-2">
  <div className="p-6 space-y-4">
    <div>
      <h3 className="text-3xl font-bold">Refer a Bestie</h3>
      <p className="text-xl text-muted-foreground">
        Earn bonus points when your friend books their first visit 💖
      </p>
    </div>

    <Button
      className="w-full h-14 rounded-2xl text-xl font-semibold"
      onClick={() => {
        navigator.clipboard.writeText("https://wink-at-riah.com/referral");
        alert("Referral link copied!");
      }}
    >
      Copy Referral Link
    </Button>
  </div>
</div>
</section>
</div>
</SidebarInset>
</div>
  );
}