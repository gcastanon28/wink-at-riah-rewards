"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { PointsOverview } from "@/components/points-overview";
import { AiLashTips } from "@/components/ai-lash-tips";
import { RewardsCatalog } from "@/components/rewards-catalog";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { db } from "@/app/firebase";
import { collection, getDocs } from "firebase/firestore";
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
};

export default function Dashboard() {
 
  const { clientData, rewards, loading } = useClientData();

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <SidebarInset className="flex-1 overflow-y-auto">
        {/* Header Section */}
        {/* Mobile Logo Header */}
        <header className="w-full overflow-hidden md:hidden">
          <img
            src="/logo-full.png"
            alt="Wink At Riah Logo"
            className="block w-full h-44 object-cover object-[50%_49.5%]"
          />
        </header>

        <div className="p-4 md:p-8 space-y-8">
          {/* Welcome / Hero */}
          <section className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
              Welcome back,
              <br />
              beautiful✨
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground italic">
              Ready for your next glow up at Wink At Riah? <Sparkles className="inline h-5 w-5 text-primary" />
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

          {/* Points Overview */}
          <PointsOverview clientData={clientData} loading={loading} />

          {/* VIP Rewards */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-4xl font-bold text-white">VIP Rewards</h2>
              <Link
                href="/rewards"
                className="text-primary text-2xl font-semibold hover:opacity-80 transition"
              >
                View Catalog <ChevronRight className="inline h-6 w-6" />
              </Link>
            </div>

            <RewardsCatalog
              userPoints={clientData.points}
              rewards={rewards}
              clientId={clientData.id}
            />
          </section>

          {/* AI Lash Tips */}
          <AiLashTips />

          {/* Referral */}
          <section className="rounded-[2rem] bg-primary p-8 text-primary-foreground shadow-xl">
            <h3 className="text-4xl font-bold mb-4">Refer a Bestie</h3>
            <p className="text-2xl leading-relaxed mb-8">
              Gift them $10 off their first full set and earn 100 bonus points for your loyalty.
            </p>
            <Button
              variant="secondary"
              className="w-full rounded-2xl py-7 text-2xl font-bold"
            >
              Get My Link
            </Button>
          </section>
        </div>
      </SidebarInset>
    </div>
  );
}