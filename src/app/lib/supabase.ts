import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(
  SUPABASE_URL || "https://placeholder.supabase.co",
  SUPABASE_ANON_KEY || "placeholder-anon-key"
);

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

export async function updateProfilePoints(
  id: string,
  points: number
) {
  const { data, error } = await supabase
    .from("profiles")
    .update({ points })
    .eq("id", id)
    .select();

  if (error) {
    throw error;
  }

  return data;
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

export async function createRedemption(data: {
  user_id: string;
  reward_title: string;
  points_used: number;
  points_before: number;
  points_after: number;
}) {
  const { data: inserted, error } = await supabase
    .from("redemptions")
    .insert([data])
    .select();

  if (error) {
    throw error;
  }

  return inserted;
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
