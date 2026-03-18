"use client"

import { db } from "@/app/firebase"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import Image from "next/image"
import { toast } from "@/hooks/use-toast"
import { MOCK_REWARDS } from "@/app/lib/mock-data"
import { useEffect, useState} from "react"
import { doc, collection, runTransaction, serverTimestamp } from "firebase/firestore"

export function RewardsCatalog({
  featuredOnly = false,
  clientData,
}: {
  featuredOnly?: boolean
  clientData?: any
}) {

  const displayRewards = featuredOnly
    ? MOCK_REWARDS.slice(0, 2)
    : MOCK_REWARDS

    const [localPoints, setLocalPoints] = useState(clientData?.points ?? 0)

    useEffect(() => {
      setLocalPoints(clientData?.points ?? 0)
    }, [clientData?.points])

    const handleRedeem = async (reward: any) => {
      const clientId = "rJU09IkgTVlO6hXTWxLQ"
    
      try {
        const clientRef = doc(db, "clients", clientId)
        const redemptionRef = doc(collection(db, "clients", clientId, "redemptions"))
    
        await runTransaction(db, async (transaction) => {
          const clientSnap = await transaction.get(clientRef)
    
          if (!clientSnap.exists()) {
            throw new Error("Client not found")
          }
    
          const client = clientSnap.data()
          const currentPoints = client.points ?? 0
    
          if (currentPoints < reward.points) {
            throw new Error(`NOT_ENOUGH_POINTS:${reward.points - currentPoints}`)
          }
    
          const newPoints = currentPoints - reward.points
    
          transaction.update(clientRef, {
            points: newPoints,
          })
    
          transaction.set(redemptionRef, {
            rewardId: reward.id,
            rewardTitle: reward.title,
            cost: reward.points,
            redeemedAt: serverTimestamp(),
            pointsBefore: currentPoints,
            pointsAfter: newPoints,
          })
        })
    
        setLocalPoints((prev: number) => prev - reward.points)
    
        toast({
          title: "Redeemed 🎉",
          description: `${reward.title} was redeemed successfully.`,
        })
      } catch (error: any) {
        const message = String(error?.message ?? "")
    
        if (message.startsWith("NOT_ENOUGH_POINTS:")) {
          const needed = message.split(":")[1]
    
          toast({
            title: "Not enough points",
            description: `You need ${needed} more points.`,
            variant: "destructive",
          })
          return
        }
    
        console.error("Redeem failed:", error)
    
        toast({
          title: "Redeem failed",
          description: "Please try again.",
          variant: "destructive",
        })
      }
    }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {displayRewards.map((reward: any) => {
        const currentPoints = localPoints
        const canAfford = currentPoints >= reward.points

        return (
          <Card
            key={reward.id}
            className="group overflow-hidden border-none rounded-3xl bg-white/[0.04] backdrop-blur-md shadow-xl shadow-black/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={reward.imageUrl}
                alt={reward.title}
                fill
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute top-4 right-4">
                <span className="rounded-full bg-pink-500 px-4 py-1 text-sm font-bold text-white shadow-lg">
                  {reward.points} pts
                </span>
              </div>

              {!canAfford && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <div className="rounded-full border border-white/20 bg-white/10 p-3">
                    <Lock className="h-6 w-6 text-white/80" />
                  </div>
                </div>
              )}
            </div>

            <CardContent className="p-6 space-y-3">
              <h3 className="text-xl font-bold text-white tracking-tight">
                {reward.title}
              </h3>

              <p className="text-sm leading-relaxed text-white/70">
                {reward.description}
              </p>
            </CardContent>

            <CardFooter>
              <Button
                className="h-12 w-full rounded-2xl bg-pink-500 font-bold tracking-wide text-white shadow-lg shadow-pink-500/20 transition-all duration-300 hover:bg-pink-600 active:scale-[0.98]"
                disabled={!canAfford}
                onClick={() => handleRedeem(reward)}
              >
                {canAfford
                  ? "REDEEM NOW"
                  : "Need " + (reward.points - currentPoints) + " pts"}
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
