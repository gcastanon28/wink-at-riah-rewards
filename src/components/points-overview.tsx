"use client"

import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MOCK_USER } from "@/app/lib/mock-data"
import { Star, TrendingUp } from "lucide-react"

export function PointsOverview() {
  const progressPercent = (MOCK_USER.points / MOCK_USER.nextRewardPoints) * 100
  const remaining = MOCK_USER.nextRewardPoints - MOCK_USER.points

  return (
    <Card className="overflow-hidden border-none bg-gradient-to-br from-card to-secondary shadow-xl relative group">
      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
        <Star className="h-24 w-24 text-primary" fill="currentColor" />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-headline text-3xl mb-1">Your Lash Rewards</CardTitle>
            <CardDescription className="text-muted-foreground font-medium">Status: <span className="text-primary font-bold">{MOCK_USER.tier} Member</span></CardDescription>
          </div>
          <div className="bg-primary/20 p-2 rounded-lg">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold text-primary font-headline">{MOCK_USER.points}</span>
          <span className="text-lg text-muted-foreground font-semibold uppercase tracking-widest">Points</span>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-semibold">
            <span className="text-muted-foreground">Progress to Next Gift</span>
            <span className="text-primary">{remaining} points remaining</span>
          </div>
          <Progress value={progressPercent} className="h-3 bg-muted" />
          <p className="text-xs text-muted-foreground italic">You're glowing! Next unlock: VIP Priority Booking status.</p>
        </div>
      </CardContent>
    </Card>
  )
}
