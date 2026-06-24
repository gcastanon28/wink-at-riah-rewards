"use client";

import { useEffect, useMemo, useState } from "react";
import { redeemReward } from "@/app/lib/supabase";
import { RewardCard } from "@/components/reward-card";
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

function isBirthdayOnlyReward(title: string) {
  return title.trim().toLowerCase() === "birthday bonus";
}

function getRewardDescription(reward: Reward) {
  if (isBirthdayOnlyReward(reward.title)) {
    return "Special birthday-month reward 🎉";
  }

  return reward.description || "Reward details coming soon.";
}

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
      toast({
        title: "Not enough points",
        description: "Keep earning points to unlock this reward.",
        variant: "destructive",
      });
      return;
    }

    try {
      setRedeemingId(reward.id);

      const redemption = await redeemReward(reward.id);
      const newPoints = redemption.points_after ?? currentPoints - reward.points_cost;

      setCurrentPoints(newPoints);

      toast({
        title: "Reward redeemed!",
        description: "Show this reward during your next visit.",
      })
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
    <div className="grid gap-8 md:grid-cols-2">
      {mergedRewards.map((reward) => {
        const visual = rewardVisuals[reward.title] || {
          image: reward.image_url || "/logo-full.png",
          fallback: "/logo-full.png",
        };

        const birthdayOnly = isBirthdayOnlyReward(reward.title);
        const locked = birthdayOnly || currentPoints < reward.points_cost;
        const pointsNeeded = reward.points_cost - currentPoints;

        return (
          <RewardCard
            key={reward.id}
            title={reward.title}
            description={getRewardDescription(reward)}
            image={reward.image_url || visual.image}
            fallbackImage={visual.fallback}
            disabled={locked || redeemingId === reward.id}
            onClick={() => handleRedeem(reward)}
            buttonLabel={
              redeemingId === reward.id
                ? "Redeeming..."
                : birthdayOnly
                ? "Birthday Month Only"
                : locked
                ? `Need ${pointsNeeded} More Points`
                : `Redeem For ${reward.points_cost} Points`
            }
          />
        );
      })}
    </div>
  );
}
