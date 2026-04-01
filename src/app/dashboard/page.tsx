"use client";

import Link from "next/link";
import { Sparkles, Calendar, ChevronRight } from "lucide-react";

import { AppSidebar } from "@/components/app-sidebar";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
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
      <div className="hidden md:block">
        <AppSidebar />
      </div>

      <SidebarInset className="flex-1 overflow-y-auto">
        <header className="w-full overflow-hidden md:hidden">
          <img
            src="/logo-full.png"
            alt="Wink At Riah Logo"
            className="block w-full h-44 object-cover object-[50%_49.5%]"
          />
        </header>

        <div className="mx-auto max-w-5xl p-4 pb-28 md:p-8 md:pb-8 space-y-8">
          <section className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
              Welcome back,
              <br />
              beautiful✨
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground italic">
              Ready for your next glow up at Wink At Riah?{" "}
              <Sparkles className="inline h-5 w-5 text-pink-400" />
            </p>

            <a
              href="https://winkatriah.glossgenius.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="rounded-2xl px-8 py-6 text-lg">
                <Calendar className="mr-2 h-5 w-5" />
                Book Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </section>

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

          <section className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <h2 className="text-5xl font-bold">VIP Rewards</h2>

            <Link
              href="/rewards"
              className="text-3xl font-bold text-primary hover:opacity-80"
            >
              View Catalog
            </Link>
          </section>

          <section className="grid gap-8 md:grid-cols-2">
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
                    Skip the waitlist and get first access to peak appointment slots.
                  </p>
                </div>
                <Button className="w-full h-14 rounded-2xl text-xl font-semibold">
                  Redeem for 150 pts
                </Button>
              </div>
            </div>

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
                  onClick={async () => {
                    const referralLink = "https://wink-at-riah-rewards.vercel.app";
                    
                    try {
                      if  (navigator.share) {
                        await navigator.share({
                          title: "Wink At Riah Rewards 💖",
                          text: "Join Wink At Riah Rewards and earn perks!",
                          url: referralLink,
                        });
                      } else {
                        await navigator.clipboard.writeText(referralLink);
                        alert("Referral link copied!");
                      }
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                >
                  Refer a Bestie
                </Button>
              </div>
            </div>
          </section>
        </div>
      </SidebarInset>

      <MobileBottomNav />
    </div>
  );
}