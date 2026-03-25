import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

type RewardRow = {
  id: string;
  title: string;
  description: string | null;
  points_cost: number;
  active: boolean;
  image_url?: string | null;
};

type ProfileRow = {
  id: string;
  email: string | null;
  full_name: string | null;
  points: number | null;
  tier?: string | null;
  phone?: string | null;
};

type RedemptionRow = {
  id: string;
  user_id: string;
  reward_title: string | null;
  points_used: number | null;
  points_before?: number | null;
  points_after?: number | null;
  created_at?: string | null;
};

async function supabaseFetch(
  path: string,
  options: RequestInit = {}
) {
  const res = await fetch(`${SUPABASE_URL}${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Supabase request failed: ${res.status} ${errorText}`);
  }

  return res;
}

export async function getRewards(): Promise<RewardRow[]> {
  const res = await supabaseFetch(
    `/rest/v1/rewards?select=*&active=eq.true&order=points_cost.asc`,
    {
      method: "GET",
    }
  );

  return res.json();
}

export async function getProfileByEmail(
  email: string
): Promise<ProfileRow | null> {
  const encodedEmail = encodeURIComponent(email);

  const res = await supabaseFetch(
    `/rest/v1/profiles?select=*&email=eq.${encodedEmail}&limit=1`,
    {
      method: "GET",
    }
  );

  const data: ProfileRow[] = await res.json();
  return data[0] || null;
}

export async function getRedemptionsByUserId(
  userId: string
): Promise<RedemptionRow[]> {
  const res = await supabaseFetch(
    `/rest/v1/redemptions?select=*&user_id=eq.${userId}&order=created_at.desc`,
    {
      method: "GET",
    }
  );

  return res.json();
}

export async function updateProfilePoints(
  id: string,
  points: number
) {
  const res = await supabaseFetch(
    `/rest/v1/profiles?id=eq.${id}`,
    {
      method: "PATCH",
      headers: {
        Prefer: "return=representation",
      },
      body: JSON.stringify({ points }),
    }
  );

  return res.json();
}

export async function createRedemption(data: {
  user_id: string;
  reward_title: string;
  points_used: number;
  points_before: number;
  points_after: number;
}) {
  const res = await supabaseFetch(
    `/rest/v1/redemptions`,
    {
      method: "POST",
      headers: {
        Prefer: "return=representation",
      },
      body: JSON.stringify(data),
    }
  );

  return res.json();
}