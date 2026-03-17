
"use client"

import { MOCK_REWARDS, MOCK_USER } from "@/app/lib/mock-data"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gift, Lock } from "lucide-react"
import Image from "next/image"
import { toast } from "@/hooks/use-toast"

export function RewardsCatalog({ featuredOnly = false }: { featuredOnly?: boolean }) {
  const displayRewards = featuredOnly ? MOCK_REWARDS.slice(0, 2) : MOCK_REWARDS

  const handleRedeem = (id: string, cost: number) => {
    if (MOCK_USER.points < cost) {
      toast({
        title: "Not quite enough points",
        description: `You need ${cost - MOCK_USER.points} more points for this reward.`,
        variant: "destructive"
      })
      return
    }
    toast({
      title: "Reward Redeemed!",
      description: "Check your email for your unique redemption code."
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {displayRewards.map((reward) => {
        const canAfford = MOCK_USER.points >= reward.points
        return (
          <Card key={reward.id} className="overflow-hidden border-none shadow-lg bg-card group hover:scale-[1.01] transition-transform duration-300">
            <div className="relative h-48 w-full overflow-hidden">
              <Image 
                src={reward.imageUrl} 
                alt={reward.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-3 right-3">
                <Badge className={canAfford ? "bg-primary text-white" : "bg-muted text-muted-foreground"}>
                  {reward.points} Points
                </Badge>
              </div>
              {!canAfford && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="bg-background/80 p-2 rounded-full">
                    <Lock className="h-6 w-6 text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="font-headline text-xl">{reward.title}</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {reward.description}
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full font-bold uppercase tracking-widest text-xs h-11"
                variant={canAfford ? "default" : "secondary"}
                disabled={!canAfford}
                onClick={() => handleRedeem(reward.id, reward.points)}
              >
                {canAfford ? "Redeem Now" : `Need ${reward.points - MOCK_USER.points} More Points`}
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
