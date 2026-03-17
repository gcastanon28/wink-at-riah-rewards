
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
  tier: 'Gold' | 'Diamond' | 'Platinum';
  serviceHistory: ServiceRecord[];
}

export const MOCK_USER: UserProfile = {
  name: "Ariah Jenkins",
  email: "ariah@winkluxe.com",
  points: 450,
  nextRewardPoints: 500,
  tier: "Diamond",
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
    id: "1",
    title: "Luxury Silk Eye Mask",
    points: 200,
    description: "Protect your extensions while you sleep with our signature silk mask.",
    imageUrl: "https://picsum.photos/seed/mask/400/300"
  },
  {
    id: "2",
    title: "Signature Growth Serum",
    points: 350,
    description: "Keep your natural lashes strong and healthy between sets.",
    imageUrl: "https://picsum.photos/seed/serum/400/300"
  },
  {
    id: "3",
    title: "Complementary Lash Bath",
    points: 100,
    description: "Deep cleaning treatment for your next appointment.",
    imageUrl: "https://picsum.photos/seed/wash/400/300"
  },
  {
    id: "4",
    title: "$20 Service Credit",
    points: 500,
    description: "Applicable to any full set or fill service.",
    imageUrl: "https://picsum.photos/seed/credit/400/300"
  }
];
