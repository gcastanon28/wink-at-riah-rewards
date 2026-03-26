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
              <img
                src="/logo.png"
                alt="Wink At Riah"
                className="h-auto w-full object-cover"
              />
            </div>

            {/* keeps hamburger positioned ON header */}
            <div className="pointer-events-none absolute left-4 top-4 z-30">
              <div className="pointer-events-auto">
                {/* sidebar trigger spacer */}
              </div>
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

              <Button
                asChild
                className="h-14 rounded-2xl px-8 text-xl font-semibold"
              >
                <Link href="https://www.vagaro.com/" target="_blank">
                  <CalendarDays className="mr-2 h-5 w-5" />
                  Book Now
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </section>

          {/* REWARDS CARD */}
          <section className="rounded-3xl border border-white/10 bg-card p-8 shadow-xl">
            <h2 className="text-4xl font-bold">Your Lash Rewards</h2>

            <p className="mt-4 text-xl">
              Status:{" "}
              <span className="font-bold text-primary">
                {displayTier}
              </span>
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

                <span className="text-primary">
                  {remaining} points remaining
                </span>
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
                You're glowing! Next unlock: VIP Priority Booking status.
              </p>
            </div>
          </section>

          {/* VIP SECTION */}
          <section className="grid gap-8 lg:grid-cols-[1fr_auto]">
            <h2 className="text-5xl font-bold">VIP Rewards</h2>

            <Link
              href="/rewards"
              className="text-3xl font-bold text-primary hover:opacity-80"
            >
              View Catalog
            </Link>
          </section>

        </div>
      </SidebarInset>
    </div>
  );
}