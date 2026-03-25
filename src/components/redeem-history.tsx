"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/firebase";
import { getProfileByEmail, getRedemptionsByUserId } from "@/app/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Redemption = {
  id: string;
  rewardTitle: string;
  pointsUsed: number;
  pointsBefore?: number;
  pointsAfter?: number;
  userId: string;
  createdAt?: string;
};

export function RedeemHistory() {
  const { user } = useUser();
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRedemptions = async () => {
      try {
        if (!user?.email) {
          setRedemptions([]);
          return;
        }

        const profile = await getProfileByEmail(user.email);

        if (!profile?.id) {
          setRedemptions([]);
          return;
        }

        const items = await getRedemptionsByUserId(profile.id);
        setRedemptions(items || []);
      } catch (error) {
        console.error("Failed to load redemption history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRedemptions();
  }, [user?.email]);

  return (
    <Card className="border-none rounded-3xl bg-white/[0.04] backdrop-blur-md shadow-xl shadow-black/30">
      <CardHeader>
        <CardTitle className="text-white text-2xl">Redeem History</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {loading ? (
          <p className="text-white/70">Loading redemption history...</p>
        ) : redemptions.length === 0 ? (
          <p className="text-white/70">No rewards redeemed yet.</p>
        ) : (
          redemptions.map((item) => {
            const redeemedDate = item.createdAt
              ? new Date(item.createdAt).toLocaleDateString()
              : "Just now";

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-white font-semibold text-lg">
                      {item.rewardTitle}
                    </p>
                    <p className="text-white/60 text-sm">
                      Redeemed on {redeemedDate}
                    </p>
                  </div>

                  <span className="rounded-full bg-pink-500 px-3 py-1 text-sm font-bold text-white">
                    -{item.pointsUsed} pts
                  </span>
                </div>

                <div className="mt-3 text-sm text-white/70 space-y-1">
                  <p>Before: {item.pointsBefore ?? "--"} pts</p>
                  <p>After: {item.pointsAfter ?? "--"} pts</p>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}