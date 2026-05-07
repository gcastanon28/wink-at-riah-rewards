"use client";

import { useEffect, useState } from "react";
import {
  supabase,
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
  avatar_url?: string;
  phone?: string;
  email_notifications?: boolean;
  sms_reminders?: boolean;
  marketing_offers?: boolean;
};

export type Reward = {
  id: string;
  title: string;
  description: string | null;
  points_cost: number;
  active: boolean;
  image_url?: string | null;
};

export type Redemption = {
  id: string;
  rewardTitle: string;
  pointsUsed: number;
  pointsBefore?: number;
  pointsAfter?: number;
  userId: string;
  createdAt?: string | null;
};

export function useClientData() {
  const [clientData, setClientData] = useState<ClientData>({
    id: "",
    name: "",
    points: 0,
    tier: "New Member",
    nextReward: 150,
    email: "",
    phone: "",
    avatar_url: "",
    email_notifications: true,
    sms_reminders: true,
    marketing_offers: false,
  });

  const [rewards, setRewards] = useState<Reward[]>([]);
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const {
          data: { session },
        } = await supabase.auth.getSession();

        const user = session?.user;

        if (!user?.email) {
          setLoading(false);
          return;
        }

        const profile = await getProfileByEmail(user.email);

        if (profile) {
          setClientData({
            id: profile.id,
            name:
              profile.full_name ||
              user.email.split("@")[0] ||
              "Client",
            points: profile.points ?? 0,
            tier: profile.tier ?? "New Member",
            nextReward: 150,
            email: profile.email ?? user.email,
            avatar_url: profile.avatar_url || "",
            phone: profile.phone || "",
            email_notifications: profile.email_notifications ?? true,
            sms_reminders: profile.sms_reminders ?? true,
            marketing_offers: profile.marketing_offers ?? false,
          });

          const userRedemptions =
            await getRedemptionsByUserId(profile.id);

          const mappedRedemptions: Redemption[] = (
            userRedemptions || []
          ).map((item: any) => ({
            id: item.id,
            rewardTitle: item.reward_title,
            pointsUsed: item.points_used,
            pointsBefore: item.points_before,
            pointsAfter: item.points_after,
            userId: item.user_id,
            createdAt: item.created_at,
          }));

          setRedemptions(mappedRedemptions);
        }

        const rewardsData = await getRewards();

        const mappedRewards: Reward[] = (
          rewardsData || []
        ).map((reward: any) => ({
          id: reward.id,
          title: reward.title,
          description: reward.description,
          points_cost: reward.points_cost,
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
  }, []);

  return {
    clientData,
    rewards,
    redemptions,
    loading,
  };
}
