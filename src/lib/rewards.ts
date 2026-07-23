export type RewardCatalogItem = {
  title: string;
  description: string;
  pointsCost: number;
  image: string;
  imageAlt: string;
};

export const REWARD_CATALOG: RewardCatalogItem[] = [
  {
    title: "Birthday Bonus",
    description: "Special Birthday Reward 🎉",
    pointsCost: 50,
    image: "/rewards/birthday.jpg",
    imageAlt: "Birthday Bonus",
  },
  {
    title: "Free Lash Shampoo",
    description: "Complimentary Lash Shampoo",
    pointsCost: 100,
    image: "/rewards/lash-bath.jpg",
    imageAlt: "Free Lash Shampoo",
  },
  {
    title: "$10 Off Fill",
    description: "Save $10 On Your Next Fill.",
    pointsCost: 150,
    image: "/rewards/fill.jpg",
    imageAlt: "$10 Off Fill",
  },
  {
    title: "VIP Priority Booking",
    description: "Skip the waitlist and get first access to peak appointment slots.",
    pointsCost: 150,
    image: "/rewards/vip.jpg",
    imageAlt: "VIP Priority Booking",
  },
];

const rewardOverrides: Record<string, RewardCatalogItem> = {
  "Birthday Bonus": REWARD_CATALOG[0],
  "Free Lash Bath": REWARD_CATALOG[1],
  "Free Lash Shampoo": REWARD_CATALOG[1],
  "$10 Off Fill": REWARD_CATALOG[2],
  "$10 Off": REWARD_CATALOG[2],
  "VIP Priority Booking": REWARD_CATALOG[3],
};

export function getRewardCatalogItem(title: string) {
  return rewardOverrides[title] ?? null;
}
