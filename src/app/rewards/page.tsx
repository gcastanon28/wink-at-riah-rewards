"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { RewardsCatalog } from "@/components/rewards-catalog";
import { useClientData } from "@/hooks/use-client-data";

type ClientData = {
  id: string;
  name: string;
  points: number;
  tier: string;
  nextReward?: number;
  email?: string;
};

type Reward = {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  active: boolean;
  image_url?: string;
};

export default function RewardsPage() {

  const { clientData, rewards, loading } = useClientData();

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <SidebarInset className="flex-1 overflow-y-auto p-6 pt-24 md:p-10 md:pt-10 lg:p-12">
        <div className="p-4 md:p-8 space-y-8">
          <section className="space-y-4">
            <p className="text-primary font-semibold uppercase tracking-[0.2em]">
              Member Privileges
            </p>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
              Rewards Catalog
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
              Redeem your loyalty points for bespoke beauty treatments and
              exclusive services at Wink At Riah.
            </p>
          </section>

          <section className="rounded-[2rem] bg-card p-6 md:p-8 shadow-xl">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-semibold">
              Lash Point Balance
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mt-2">
              {loading ? "Loading..." : `${clientData.points} Points`}
            </h2>
          </section>

          <section className="rounded-[2rem] bg-card p-6 md:p-8 shadow-xl">
            <div className="space-y-4 text-center">
              <p className="text-lg text-muted-foreground">
                Earn rewards with every visit to Wink At Riah ✨
              </p>

              <ul className="mt-4 space-y-3 text-center text-primary font-semibold text-lg md:text-2xl">
                <li>• 1 Appointment = +5 Points</li>
                <li>• Prebooking next fill = +5 Points</li>
                <li>• Birthday month = +10 Points</li>
                <li>• Leaving a review = +2–3 Points</li>
              </ul>
            </div>
          </section>

          <RewardsCatalog
            userPoints={clientData.points}
            rewards={rewards}
            clientId={clientData.id}
          />

          <div className="bg-muted/20 border-2 border-dashed border-muted rounded-3xl p-10 text-center">
            <h3 className="font-headline text-2xl font-bold">Coming Soon...</h3>
            <p className="text-muted-foreground max-w-sm mx-auto mt-3">
              We&apos;re curating more luxury rewards for our VIPs. Stay tuned
              for seasonal exclusives and surprise treats.
            </p>
          </div>
        </div>
      </SidebarInset>
    </div>
  );
}