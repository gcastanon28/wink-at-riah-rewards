export type RewardMilestone = {
  title: string;
  pointsCost: number;
  birthdayOnly?: boolean;
};

export const REWARD_MILESTONES: RewardMilestone[] = [
  { title: "Birthday Bonus", pointsCost: 50, birthdayOnly: true },
  { title: "Free Lash Shampoo", pointsCost: 100 },
  { title: "$10 Off Fill", pointsCost: 150 },
  { title: "VIP Priority Booking", pointsCost: 150 },
];

export function getNextRewardProgress(points: number) {
  const currentPoints = Math.max(points || 0, 0);
  const sortedMilestones = REWARD_MILESTONES.filter(
    (milestone) => !milestone.birthdayOnly
  ).sort((a, b) => a.pointsCost - b.pointsCost);
  const finalMilestone = sortedMilestones[sortedMilestones.length - 1];
  const nextReward =
    sortedMilestones.find(
      (milestone) => currentPoints < milestone.pointsCost
    ) || finalMilestone;
  const targetPoints = nextReward?.pointsCost ?? 0;
  const remaining = Math.max(targetPoints - currentPoints, 0);
  const progress =
    targetPoints > 0
      ? Math.min((currentPoints / targetPoints) * 100, 100)
      : 100;
  const allUnlocked =
    Boolean(finalMilestone) && currentPoints >= finalMilestone.pointsCost;

  return {
    allUnlocked,
    nextReward,
    progress,
    remaining,
    targetPoints,
  };
}
