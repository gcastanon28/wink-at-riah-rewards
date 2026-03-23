"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/firebase";
import {
  getRewards,
  getProfileByEmail,
  getRedemptionsByUserId,
} from "@/app/lib/supabase";

export type ClientData = {
  id: string;
  name: string;
  points: number;
  tier: string;
  nextReward?: number;
  email?: string;
};

export type Reward = {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  active: boolean;
  image_url?: string;
};

export type Redemption = {
  id: string;
  rewardTitle: string;
  pointsUsed: number;
  userId: string;
  createdAt: any;
};

export function useClientData() {
  const { user } = useUser();

  const [clientData, setClientData] = useState<ClientData>({
    id: "",
    name: "beautiful✨",
    points: 0,
    tier: "New Member",
    nextReward: 150,
    email: user?.email || "",
  });

  const [rewards, setRewards] = useState<Reward[]>([]);
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Load profile by email
        if (user?.email) {
          const profile = await getProfileByEmail(user.email);

          if (profile) {
            setClientData({
              id: profile.id,
              name: profile.full_name || "beautiful✨",
              points: profile.points || 0,
              tier: profile.tier || "New Member",
              nextReward: 150,
              email: profile.email || user.email,
            });

            const userRedemptions = await getRedemptionsByUserId(profile.id);
            setRedemptions(userRedemptions || []);
          } else {
            setClientData({
              id: "",
              name: "beautiful✨",
              points: 0,
              tier: "New Member",
              nextReward: 150,
              email: user.email,
            });
            setRedemptions([]);
          }
        }

        // Load rewards
        const rewardsData = await getRewards();

        const mappedRewards = (rewardsData || []).map((reward: any) => ({
          id: reward.id,
          title: reward.title,
          description: reward.description,
          pointsRequired: reward.points_cost,
          active: reward.active,
          image_url: reward.image_url,
        }));

        setRewards(mappedRewards);
      } catch (error) {
        console.error("Error loading client data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user?.email]);

  return {
    clientData,
    rewards,
    redemptions,
    loading,
  };
}