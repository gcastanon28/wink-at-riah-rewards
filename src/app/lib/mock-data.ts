import { PlaceHolderImages } from "@/lib/placeholder-images";

export interface ServiceRecord {
  serviceName: string;
  date: string;
  notes?: string;
  pointsEarned: number;
}

export interface UserProfile {
  name: string;
  email: string;
  points: number;
  nextRewardPoints: number;
  tier: string;
  serviceHistory: ServiceRecord[];
}

export const MOCK_USER: UserProfile = {
  name: "Beautiful",
  email: "beauty@winkatriah.com",
  points: 120,
  nextRewardPoints: 150,
  tier: "Lash VIP",
  serviceHistory: [
    {
      serviceName: "Full Volume Set",
      date: "2024-03-15",
      notes: "Preferred 14mm-16mm cat-eye style.",
      pointsEarned: 50
    },
    {
      serviceName: "Volume Fill (2 Week)",
      date: "2024-03-01",
      notes: "Maintained volume well.",
      pointsEarned: 30
    },
    {
      serviceName: "Full Volume Set",
      date: "2024-02-15",
      notes: "New client set.",
      pointsEarned: 40
    }
  ]
};

export interface RewardItem {
  id: string;
  title: string;
  points: number;
  description: string;
  imageUrl: string;
}

export const MOCK_REWARDS: RewardItem[] = [
  {
    id: "reward-birthday",
    title: "Birthday Bonus",
    points: 50,
    description: "A special treat for your special day. Surprise gift included!",
    imageUrl: "/rewards/birthday.jpg"
  },
  {
    id: "reward-bath",
    title: "Free Lash Bath",
    points: 75,
    description: "Deep cleaning treatment to keep your extensions fresh and healthy.",
    imageUrl: "/rewards/lash-bath.jpg"
  },
  {
    id: "reward-fill",
    title: "$10 Off Fill",
    points: 100,
    description: "Apply a credit to your next maintenance appointment.",
    imageUrl: "/rewards/fill.jpg"
  },
  {
    id: "reward-vip",
    title: "VIP Priority Booking",
    points: 150,
    description: "Skip the waitlist and get first access to peak appointment slots.",
    imageUrl: "/rewards/vip.jpg"
  }
];
