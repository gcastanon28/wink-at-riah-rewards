"use client";

type ClientData = {
  id?: string;
  name: string;
  points: number;
  tier: string;
  nextReward?: number;
  email?: string;
};

type PointsOverviewProps = {
  clientData: ClientData;
  loading?: boolean;
};

export function PointsOverview({
  clientData,
  loading = false,
}: PointsOverviewProps) {
  const points = clientData?.points ?? 0;
  const tier = clientData?.tier ?? "New Member";
  const nextReward = clientData?.nextReward ?? 150;

  const remaining = Math.max(nextReward - points, 0);
  const progress = nextReward > 0 ? Math.min((points / nextReward) * 100, 100) : 0;

  return (
    <section className="bg-card rounded-3xl border border-border/50 p-8 shadow-sm">
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-3 flex-1">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">
            Your Lash Rewards
          </h2>

          <p className="text-sm md:text-base">
            Status: <span className="text-primary font-bold">{loading ? "Loading..." : tier}</span>
          </p>

          <div className="flex items-end gap-3 pt-2">
            <span className="text-6xl md:text-7xl font-headline font-bold text-primary">
              {loading ? "..." : points}
            </span>
            <span className="text-2xl font-bold tracking-wide pb-2">POINTS</span>
          </div>

          <div className="pt-4 space-y-2">
            <div className="flex items-center justify-between text-sm md:text-base">
              <span className="font-semibold">Progress to Next Gift</span>
              <span className="text-primary font-bold">
                {loading ? "Loading..." : `${remaining} points remaining`}
              </span>
            </div>

            <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-sm text-muted-foreground italic pt-1">
              You're glowing! Next unlock: VIP Priority Booking status.
            </p>
          </div>
        </div>

        <div className="hidden md:flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-3xl shrink-0">
          ✨
        </div>
      </div>
    </section>
  );
}