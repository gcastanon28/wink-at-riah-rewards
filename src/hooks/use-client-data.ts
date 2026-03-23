
"use client";

import { useMemo } from "react";
import { collection, query, where, orderBy, limit } from "firebase/firestore";
import { useFirestore, useCollection, useUser } from "@/firebase";

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
};

export type Redemption = {
  id: string;
  rewardTitle: string;
  pointsUsed: number;
  userId: string;
  createdAt: any;
};

export function useClientData() {
  const db = useFirestore();
  const { user } = useUser();

  // Stable collection references
  const clientsQuery = useMemo(() => {
    if (!user?.email) return null;
    return query(collection(db, "clients"), where("email", "==", user.email), limit(1));
  }, [db, user?.email]);

  const rewardsQuery = useMemo(() => {
    return query(collection(db, "rewards"), where("active", "==", true));
  }, [db]);

  const redemptionsQuery = useMemo(() => {
    if (!user?.uid) return null;
    return query(
      collection(db, "redemptions"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
  }, [db, user?.uid]);

  const { data: clients, loading: loadingClients } = useCollection<ClientData>(clientsQuery);
  const { data: rewards, loading: loadingRewards } = useCollection<Reward>(rewardsQuery);
  const { data: redemptions, loading: loadingRedemptions } = useCollection<Redemption>(redemptionsQuery);

  const clientData = useMemo(() => {
    if (clients && clients.length > 0) {
      return clients[0];
    }
    return {
      id: "",
      name: "beautiful✨",
      points: 0,
      tier: "New Member",
      nextReward: 150,
      email: user?.email || "",
    };
  }, [clients, user?.email]);

  return {
    clientData,
    rewards,
    redemptions,
    loading: loadingClients || loadingRewards || loadingRedemptions,
  };
}
