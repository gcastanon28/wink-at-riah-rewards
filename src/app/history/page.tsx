"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { useClientData } from "@/hooks/use-client-data";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";

function formatDate(createdAt: any) {
  if (!createdAt) return "—";
  if (typeof createdAt?.toDate === "function") {
    return createdAt.toDate().toLocaleDateString();
  }
  return "—";
}

export default function HistoryPage() {
  const { clientData, redemptions, loading } = useClientData();

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden md:block">
        <AppSidebar />
      </div>

      <SidebarInset className="flex-1 overflow-y-auto p-6 pt-6 md:p-10 md:pt-10 lg:p-12">
        <div className="max-w-4xl mx-auto space-y-12 pb-28 md:pb-0">
          <header>
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">
              Your Records
            </p>
            <h1 className="text-4xl md:text-5xl font-headline font-bold">
              Redemption History
            </h1>
            <p className="text-muted-foreground mt-2">
              Review your redeemed rewards and loyalty activity.
            </p>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-3xl border border-border/50 p-6 text-center">
              <p className="text-sm text-muted-foreground uppercase tracking-widest">
                Current Points
              </p>
              <p className="text-4xl font-bold text-primary mt-2">
                {loading ? "..." : clientData.points}
              </p>
            </div>

            <div className="bg-card rounded-3xl border border-border/50 p-6 text-center">
              <p className="text-sm text-muted-foreground uppercase tracking-widest">
                Membership Tier
              </p>
              <p className="text-2xl font-bold text-primary mt-2">
                {loading ? "Loading..." : clientData.tier}
              </p>
            </div>

            <div className="bg-card rounded-3xl border border-border/50 p-6 text-center">
              <p className="text-sm text-muted-foreground uppercase tracking-widest">
                Total Redemptions
              </p>
              <p className="text-4xl font-bold text-primary mt-2">
                {loading ? "..." : redemptions.length}
              </p>
            </div>
          </section>

          <section className="bg-card rounded-3xl border border-border/50 overflow-hidden">
            <div className="p-6 border-b border-border/50">
              <h2 className="text-2xl font-headline font-bold">
                Your Reward Activity
              </h2>
              <p className="text-muted-foreground mt-1">
                Live data from your reward redemptions.
              </p>
            </div>

            <div className="divide-y divide-border/50">
              {redemptions.length === 0 ? (
                <div className="p-6 text-muted-foreground">
                  No redemptions yet.
                </div>
              ) : (
                redemptions.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                  >
                    <div>
                      <p className="font-bold text-lg">{item.rewardTitle}</p>
                      <p className="text-sm text-muted-foreground">
                        Redeemed on {formatDate(item.createdAt)}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-primary font-bold text-xl">
                        -{item.pointsUsed} pts
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
        <MobileBottomNav />
      </SidebarInset>
    </div>
  );
}