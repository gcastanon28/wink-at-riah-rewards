"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Calendar, ChevronRight } from "lucide-react";

import { AppSidebar } from "@/components/app-sidebar";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { RewardCard } from "@/components/reward-card";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useClientData } from "@/hooks/use-client-data";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { toast } from "@/hooks/use-toast";
import { getNextRewardProgress } from "@/lib/rewards-progress";

const dashboardRewards = [
  {
    title: "Birthday Bonus",
    description: "Special birthday-month reward 🎉",
    image: "/rewards/birthday.jpg",
    imageAlt: "Birthday Bonus",
    pointsCost: 50,
    birthdayOnly: true,
  },
  {
    title: "Free Lash Bath",
    description: "Complimentary Lash Bath",
    image: "/rewards/lash-bath.jpg",
    imageAlt: "Free Lash Bath",
    pointsCost: 75,
  },
  {
    title: "$10 Off Fill",
    description: "Save $10 On Your Next Fill.",
    image: "/rewards/fill.jpg",
    imageAlt: "$10 Off Fill",
    pointsCost: 100,
  },
  {
    title: "VIP Priority Booking",
    description:
      "Skip the waitlist and get first access to peak appointment slots.",
    image: "/rewards/vip.jpg",
    imageAlt: "VIP Priority Booking",
    pointsCost: 150,
  },
];

function toTitleCase(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

async function copyTextToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fall back for embedded browsers that expose the Clipboard API but block it.
    }
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  textArea.style.top = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const copied = document.execCommand("copy");

    if (!copied) {
      throw new Error("Copy command failed");
    }
  } finally {
    document.body.removeChild(textArea);
  }
}

async function shareReferralLink(text: string) {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Wink At Riah Rewards",
        text: "Join me on Wink At Riah Rewards.",
        url: text,
      });
      return "shared";
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return "cancelled";
      }
    }
  }

  await copyTextToClipboard(text);
  return "copied";
}

export default function DashboardPage() {
  const { clientData } = useClientData();
  const { checkingAuth } = useAuthGuard();
  const [referralStatus, setReferralStatus] = useState<string | null>(null);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
        Loading rewards...
      </div>
    );
  }

  const displayTier =
    clientData?.tier && clientData.tier.trim() !== ""
      ? toTitleCase(clientData.tier)
      : "New Member";

  const displayPoints = clientData?.points ?? 0;
  const progressInfo = getNextRewardProgress(displayPoints);

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

        <div className="mx-auto max-w-5xl p-4 pb-32 md:p-8 md:pb-8 space-y-8">
          <section className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
              Welcome Back,
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
                <span className="text-primary">
                  {progressInfo.allUnlocked
                    ? "All rewards unlocked"
                    : `${progressInfo.remaining} points remaining`}
                </span>
              </div>

              <div className="h-4 w-full rounded-full bg-muted">
                <div
                  className="h-4 rounded-full bg-primary transition-all"
                  style={{ width: `${progressInfo.progress}%` }}
                />
              </div>

              <p className="text-lg italic text-muted-foreground">
                {progressInfo.allUnlocked
                  ? "All current rewards are unlocked. Visit the catalog to redeem."
                  : `You're glowing! Next unlock: ${progressInfo.nextReward.title}.`}
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
            {dashboardRewards.map((reward) => {
              const locked =
                reward.birthdayOnly || displayPoints < reward.pointsCost;
              const pointsNeeded = reward.pointsCost - displayPoints;

              return (
                <RewardCard
                  key={reward.title}
                  title={reward.title}
                  description={reward.description}
                  image={reward.image}
                  imageAlt={reward.imageAlt}
                  disabled={locked}
                  href={locked ? undefined : "/rewards"}
                  buttonLabel={
                    reward.birthdayOnly
                      ? "Birthday Month Only"
                      : locked
                      ? `Need ${pointsNeeded} More Points`
                      : `Redeem For ${reward.pointsCost} Points`
                  }
                />
              );
            })}

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
                    const referralLink =
                      process.env.NEXT_PUBLIC_APP_URL ||
                      "https://wink-at-riah-rewards.vercel.app";
                    
                    try {
                      const result = await shareReferralLink(referralLink);

                      if (result === "cancelled") return;

                      setReferralStatus(
                        result === "shared"
                          ? "Referral link ready to send."
                          : "Referral link copied."
                      );
                      toast({
                        title:
                          result === "shared"
                            ? "Referral sheet opened"
                            : "Referral link copied",
                        description:
                          "Send it to your bestie whenever you're ready.",
                      });
                    } catch (error) {
                      console.error("Could not share referral link:", error);
                      setReferralStatus(referralLink);
                      toast({
                        title: "Referral link not copied",
                        description: referralLink,
                        variant: "destructive",
                      });
                    }
                  }}
                >
                  Refer a Bestie
                </Button>

                {referralStatus && (
                  <p className="text-center text-sm font-semibold text-primary">
                    {referralStatus}
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>
      </SidebarInset>

      <MobileBottomNav />
    </div>
  );
}
