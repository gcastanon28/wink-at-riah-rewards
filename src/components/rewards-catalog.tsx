"use client";

import { useMemo, useState } from "react";
import { db } from "@/app/firebase";
import { addDoc, collection, doc, Timestamp, updateDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";

type Reward = {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  active: boolean;
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
    fallback: "/rewards/logo-full.png",
  },
  "Free Lash Bath": {
    image: "/rewards/lash-bath.jpg",
    fallback: "/rewards/logo-full.png",
  },
  "$10 Off Fill": {
    image: "/rewards/fill.jpg",
    fallback: "/rewards/logo-full.png",
  },
  "VIP Priority Booking": {
    image: "/rewards/vip.jpg",
    fallback: "/rewards/logo-full.png",
  },
};

export function RewardsCatalog({
  userPoints,
  rewards,
  clientId,
}: RewardsCatalogProps) {
  const [currentPoints, setCurrentPoints] = useState(userPoints);
  const [redeemingId, setRedeemingId] = useState<string | null>(null);

  const mergedRewards = useMemo(() => {
    const activeRewards = rewards.filter((reward) => reward.active);

    const hasVip = activeRewards.some(
      (reward) => reward.title === "VIP Priority Booking"
    );

    if (!hasVip) {
      activeRewards.push({
        id: "vip-priority-booking-static",
        title: "VIP Priority Booking",
        description:
          "Skip the waitlist and get first access to peak appointment slots.",
        pointsRequired: 150,
        active: true,
      });
    }

    return activeRewards.sort((a, b) => a.pointsRequired - b.pointsRequired);
  }, [rewards]);

  const handleRedeem = async (reward: Reward) => {
    if (!clientId) {
      alert("No client found.");
      return;
    }

    if (currentPoints < reward.pointsRequired) {
      alert("Not enough points for this reward.");
      return;
    }

    try {
      setRedeemingId(reward.id);

      const newPoints = currentPoints - reward.pointsRequired;

      await updateDoc(doc(db, "clients", clientId), {
        points: newPoints,
      });

      await addDoc(collection(db, "redemptions"), {
        userId: clientId,
        rewardTitle: reward.title,
        pointsUsed: reward.pointsRequired,
        createdAt: Timestamp.now(),
      });

      setCurrentPoints(newPoints);
      window.location.reload();
    } catch (error) {
      console.error("Redeem failed:", error);
      alert("Something went wrong while redeeming.");
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
        const canRedeem = currentPoints >= reward.pointsRequired;
        const visual = rewardVisuals[reward.title] || {
          image: "/rewards/logo-full.png",
          fallback: "/rewards/logo-full.png",
        };

        return (
          <div
            key={reward.id}
            className="overflow-hidden rounded-2xl bg-card border border-white/10"
          >
            <div className="relative h-32 w-full overflow-hidden bg-black">
              <img
                src={visual.image}
                alt={reward.title}
                className="h-full w-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes(visual.fallback)) {
                    target.src = visual.fallback;
                  }
                }}
              />

              <div className="absolute inset-0 bg-black/20" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full border border-white/40 bg-white/10 p-5 backdrop-blur-sm">
                  <span className="text-4xl text-white">🔒</span>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <h3 className="text-2xl font-bold text-white">{reward.title}</h3>

              <p className="text-base text-muted-foreground">
                {reward.description}
              </p>

              <Button
                onClick={() => handleRedeem(reward)}
                disabled={!canRedeem || redeemingId === reward.id}
                className="w-full rounded-2xl py-7 text-2xl font-bold"
              >
                {redeemingId === reward.id
                  ? "Redeeming..."
                  : canRedeem
                  ? `Redeem for ${reward.pointsRequired} pts`
                  : `Need ${reward.pointsRequired} pts`}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}