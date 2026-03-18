"use client"

import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Star, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"

function AnimatedCounter({
  value,
  duration = 1200,
}: {
  value: number
  duration?: number
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = value
    if (start === end) return

    const incrementTime = 16
    const totalSteps = Math.ceil(duration / incrementTime)
    const stepValue = end / totalSteps

    const timer = setInterval(() => {
      start += stepValue

      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, incrementTime)

    return () => clearInterval(timer)
  }, [value, duration])

  return <>{count}</>
}

export function PointsOverview({ clientData }: any) {
  const points = clientData?.points ?? 0;
  const nextRewardPoints = clientData?.nextRewardPoints ?? 150;
  const progressPercent = (points / nextRewardPoints) * 100;
  const remaining = Math.max(nextRewardPoints - points, 0);

  return (
    <Card className="overflow-hidden border-none bg-gradient-to-br from-card to-secondary shadow-xl relative group">
      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
        <Star className="h-24 w-24 text-primary" fill="currentColor" />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-headline text-3xl mb-1">Your Lash Rewards</CardTitle>
            <CardDescription className="text-muted-foreground font-medium">Status: <span className="text-primary font-bold">{clientData?.tier ?? "Lash VIP"} Member</span></CardDescription>
          </div>
          <div className="bg-primary/20 p-2 rounded-lg">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-end gap-3">
          <span className="text-5xl font-bold text-primary font-headline drop-shadow-[0_0_18px_rgba(236,72,153,0.25)]">
            <AnimatedCounter value={points} />
          </span>
          <span className="text-lg text-white/70 font-semibold uppercase tracking-widest">Points</span>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-semibold">
            <span className="text-muted-foreground">Progress to Next Gift</span>
            <span className="text-primary">{remaining === 0 ? "Reward unlocked 🎉" : '${remaining} points remaining'}</span>
          </div>
          <Progress value={progressPercent} className="h-3 bg-muted" />
          <p className="text-xs text-muted-foreground italic">You're glowing! Next unlock: VIP Priority Booking status.</p>
        </div>
      </CardContent>
    </Card>
  )
}
