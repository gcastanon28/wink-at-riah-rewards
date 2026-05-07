"use client";

import { useEffect, useMemo, useState } from "react";
import { createRedemption, updateProfilePoints } from "@/app/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

type Reward = {
  id: string;
  title: string;
  description: string | null;
  points_cost: number;
  active: boolean;
  image_url?: string | null;
};

type RewardsCatalogProps = {
  userPoints: number;
  rewards: Reward[];
  clientId: string;
};

const rewardVisuals: Record<
  string,
  {
    image: string;
    fallback: string;
  }
> = {
  "Birthday Bonus": {
    image: "/rewards/birthday.jpg",
    fallback: "/logo-full.png",
  },
  "Free Lash Bath": {
    image: "/rewards/lash-bath.jpg",
    fallback: "/logo-full.png",
  },
  "$10 Off Fill": {
    image: "/rewards/fill.jpg",
    fallback: "/logo-full.png",
  },
  "VIP Priority Booking": {
    image: "/rewards/vip.jpg",
    fallback: "/logo-full.png",
  },
};

export function RewardsCatalog({
  userPoints,
  rewards,
  clientId,
}: RewardsCatalogProps) {
  const [currentPoints, setCurrentPoints] = useState(userPoints);
  const [redeemingId, setRedeemingId] = useState<string | null>(null);

  useEffect(() => {
    setCurrentPoints(userPoints);
  }, [userPoints]);

  const mergedRewards = useMemo(() => {
    const activeRewards = rewards.filter((reward) => reward.active);
    return activeRewards.sort(
      (a, b) => a.points_cost - b.points_cost
    );
  }, [rewards]);

  const handleRedeem = async (reward: Reward) => {
    if (!clientId) return;

    if (currentPoints < reward.points_cost) {
      alert("Not enough points.");
      return;
    }

    try {
      setRedeemingId(reward.id);

      const newPoints = currentPoints - reward.points_cost;

      await updateProfilePoints(clientId, newPoints);

      await createRedemption({
        user_id: clientId,
        reward_title: reward.title,
        points_used: reward.points_cost,
        points_before: currentPoints,
        points_after: newPoints,
      });

      setCurrentPoints(newPoints);

      toast({
        title: "Reward redeemed!",
        description: "Show this reward during your next visit.",
      })

      window.location.reload();
    } catch (err) {
      console.error(err);

      toast({
        title: "Redemption failed",
        description: "Please try again.",
        variant: "destructive",
      })
    } finally {
      setRedeemingId(null);
    }
  };

  if (!mergedRewards.length) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-card p-8 text-white">
        No rewards available right now.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {mergedRewards.map((reward) => {
        const visual = rewardVisuals[reward.title] || {
          image: reward.image_url || "/logo-full.png",
          fallback: "/logo-full.png",
        };

        const locked = currentPoints < reward.points_cost;
        const pointsNeeded = reward.points_cost - currentPoints;

        return (
          <div
            key={reward.id}
            className="overflow-hidden rounded-[2rem] border border-white/10 bg-card text-white shadow-xl">
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={reward.image_url || visual.image}
                alt={reward.title}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = visual.fallback;
                }}
              />

              {locked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                  <div className="rounded-full bg-white/20 px-6 py-6 backdrop-blur-md border border-white/30">
                    <span className="text-2xl">🔒</span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4 p-6">
              <div>
                <h3 className="text-2xl font-headline font-bold">
                  {reward.title}
                </h3>
                <p className="mt-2 text-lg text-white/70">
                  {reward.description || "Reward details coming soon."}
                </p>
              </div>

              <Button
                onClick={() => handleRedeem(reward)}
                disabled={locked || redeemingId === reward.id}
                className="w-full rounded-2xl py-7 text-xl font-bold">
                {redeemingId === reward.id
                  ? "Redeeming..."
                  : locked
                  ? `Need ${pointsNeeded} more pts`
                  : `Redeem for ${reward.points_cost} pts`}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
