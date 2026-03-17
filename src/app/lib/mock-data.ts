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
  name: "Ariah Jenkins",
  email: "ariah@winkatriah.com",
  points: 450,
  nextRewardPoints: 500,
  tier: "Lash VIP",
  serviceHistory: [
    {
      serviceName: "Full Volume Set",
      date: "2024-03-15",
      notes: "Preferred 14mm-16mm cat-eye style.",
      pointsEarned: 150
    },
    {
      serviceName: "Volume Fill (2 Week)",
      date: "2024-03-01",
      notes: "Maintained volume well. No irritation.",
      pointsEarned: 75
    },
    {
      serviceName: "Full Volume Set",
      date: "2024-02-15",
      notes: "New client set. Cat-eye mapping.",
      pointsEarned: 150
    },
    {
      serviceName: "Lash Cleanser Kit",
      date: "2024-02-15",
      notes: "Retail purchase.",
      pointsEarned: 25
    },
    {
      serviceName: "Volume Fill (2 Week)",
      date: "2024-01-20",
      notes: "Great retention.",
      pointsEarned: 50
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
    id: "reward-1",
    title: "Free Lash Bath",
    points: 150,
    description: "Deep cleaning treatment to keep your extensions fresh and healthy.",
    imageUrl: PlaceHolderImages.find(img => img.id === "reward-bath")?.imageUrl || "https://picsum.photos/seed/bath/400/300"
  },
  {
    id: "reward-2",
    title: "$10 Off Fill",
    points: 300,
    description: "Apply a credit to your next maintenance appointment.",
    imageUrl: PlaceHolderImages.find(img => img.id === "reward-fill")?.imageUrl || "https://picsum.photos/seed/discount/400/300"
  },
  {
    id: "reward-3",
    title: "Birthday Bonus",
    points: 400,
    description: "A special treat for your special day. Surprise gift included!",
    imageUrl: PlaceHolderImages.find(img => img.id === "reward-birthday")?.imageUrl || "https://picsum.photos/seed/gift/400/300"
  },
  {
    id: "reward-4",
    title: "VIP Priority Booking",
    points: 500,
    description: "Skip the waitlist and get first access to peak appointment slots.",
    imageUrl: PlaceHolderImages.find(img => img.id === "reward-vip")?.imageUrl || "https://picsum.photos/seed/calendar/400/300"
  }
];
