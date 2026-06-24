import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Missing Supabase public environment variables.");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* =========================
  TYPE DEFINITIONS
========================= */

export type RewardRow = {
  id: string;
  title: string;
  description: string | null;
  points_cost: number;
  active: boolean;
  image_url?: string | null;
};

export type ProfileRow = {
  id: string;
  email: string | null;
  full_name: string | null;
  points: number | null;
  tier: string | null;
  phone?: string | null;
  avatar_url?: string | null;
  email_notifications?: boolean | null;
  sms_reminders?: boolean | null;
  marketing_offers?: boolean | null;
};

export type RedemptionRow = {
  id: string;
  user_id: string;
  reward_title: string | null;
  points_used: number | null;
  points_before?: number | null;
  points_after?: number | null;
  created_at?: string | null;
};

export type StaffCustomerRow = {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  points: number;
  tier: string | null;
  updated_at: string | null;
};

export type StaffAwardPointsResult = {
  user_id: string;
  email: string | null;
  full_name: string | null;
  points_before: number;
  points_after: number;
  points_change: number;
  reason: string;
  created_at: string;
};

/* =========================
  REWARDS
========================= */

export async function getRewards(): Promise<RewardRow[]> {
  const { data, error } = await supabase
    .from("rewards")
    .select("*")
    .eq("active", true)
    .order("points_cost", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}

/* =========================
  PROFILE
========================= */

export async function getProfileByEmail(
  email: string
): Promise<ProfileRow | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data ?? null;
}

/* =========================
  REDEMPTIONS
========================= */

export async function getRedemptionsByUserId(
  userId: string
): Promise<RedemptionRow[]> {
  const { data, error } = await supabase
    .from("redemptions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function redeemReward(rewardId: string): Promise<RedemptionRow> {
  const { data, error } = await supabase
    .rpc("redeem_reward", { p_reward_id: rewardId })
    .single();

  if (error) {
    throw error;
  }

  return data as RedemptionRow;
}

export async function searchStaffCustomers(
  search: string
): Promise<StaffCustomerRow[]> {
  const { data, error } = await supabase.rpc("owner_search_profiles", {
    p_search: search,
  });

  if (error) {
    throw error;
  }

  return (data ?? []) as StaffCustomerRow[];
}

export async function awardStaffPoints(
  userId: string,
  points: number,
  reason: string
): Promise<StaffAwardPointsResult> {
  const { data, error } = await supabase
    .rpc("owner_award_points", {
      p_user_id: userId,
      p_points: points,
      p_reason: reason,
    })
    .single();

  if (error) {
    throw error;
  }

  return data as StaffAwardPointsResult;
}

export async function uploadAvatar(file: File, userId: string) {
  const fileExt = file.name.split(".").pop()
  const filePath = `${userId}/avatar-${Date.now()}.${fileExt}`

  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    })

  if (error) {
    throw error
  }

  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath)

  return data.publicUrl
}

export async function updateProfileAvatar(id: string, avatarURL: string) {
  const { error } = await supabase
    .from("profiles")
    .update({ avatar_url: avatarURL })
    .eq("id", id)

  if (error) throw error
}
