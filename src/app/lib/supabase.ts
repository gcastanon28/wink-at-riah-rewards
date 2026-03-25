const SUPABASE_URL = "https://wbjtcxdtrmlitjcunvip.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndianRjeGR0cm1saXRqY3VudmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNDI1NDMsImV4cCI6MjA4OTgxODU0M30.OY-3R6Yhs7pECP2qwwIx2LMAYLZAzvMm8o7QzwrRpi0";

const headers = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  "Content-Type": "application/json",
};

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
      ...headers,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error(`Supabase request failed: ${res.status}`);
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

export async function getProfileById(id: string): Promise<ProfileRow | null> {
  const res = await supabaseFetch(
    `/rest/v1/profiles?id=eq.${id}&select=*`,
    {
      method: "GET",
    }
  );

  const data: ProfileRow[] = await res.json();
  return data[0] ?? null;
}

export async function getProfileByEmail(
  email: string
): Promise<ProfileRow | null> {
  const res = await supabaseFetch(
    `/rest/v1/profiles?email=eq.${encodeURIComponent(email)}&select=*`,
    {
      method: "GET",
    }
  );

  const data: ProfileRow[] = await res.json();
  return data[0] ?? null;
}

export async function getRedemptionsByUserId(userId: string) {
  const res = await supabaseFetch(
    `/rest/v1/redemptions?user_id=eq.${userId}&select=*&order=created_at.desc`,
    {
      method: "GET",
    }
  );

  const data: RedemptionRow[] = await res.json();

  return (data || []).map((item) => ({
    id: item.id,
    rewardTitle: item.reward_title || "Reward",
    pointsUsed: item.points_used || 0,
    pointsBefore: item.points_before ?? undefined,
    pointsAfter: item.points_after ?? undefined,
    userId: item.user_id,
    createdAt: item.created_at || undefined,
  }));
}

export async function updateProfilePoints(
  userId: string,
  points: number
) {
  const res = await supabaseFetch(
    `/rest/v1/profiles?id=eq.${userId}`,
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

export async function updateProfile(
  userId: string,
  updates: {
    full_name?: string;
    email?: string;
    phone?: string;
    tier?: string;
  }
) {
  const res = await supabaseFetch(
    `/rest/v1/profiles?id=eq.${userId}`,
    {
      method: "PATCH",
      headers: {
        Prefer: "return=representation",
      },
      body: JSON.stringify(updates),
    }
  );

  const data = await res.json();
  return data[0] ?? null;
}

export async function createRedemption(entry: {
  user_id: string;
  reward_title: string;
  points_used: number;
  points_before?: number;
  points_after?: number;
  created_at?: string;
}) {
  const res = await supabaseFetch(`/rest/v1/redemptions`, {
    method: "POST",
    headers: {
      Prefer: "return=representation",
    },
    body: JSON.stringify([
      {
        ...entry,
        created_at: entry.created_at ?? new Date().toISOString(),
      },
    ]),
  });

  return res.json();
}