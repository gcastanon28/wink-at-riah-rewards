
"use client"

import * as React from "react"
import { generatePersonalizedLashTips, type GeneratePersonalizedLashTipsOutput } from "@/ai/flows/generate-personalized-lash-tips"
import { MOCK_USER } from "@/app/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Sparkles, Loader2, Heart, ExternalLink } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export function AiLashTips() {
  const [loading, setLoading] = React.useState(false)
  const [tips, setTips] = React.useState<GeneratePersonalizedLashTipsOutput | null>(null)

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const result = await generatePersonalizedLashTips({
        serviceHistory: MOCK_USER.serviceHistory.map(s => ({
          serviceName: s.serviceName,
          date: s.date,
          notes: s.notes
        })),
        accumulatedPoints: MOCK_USER.points
      })
      setTips(result)
    } catch (error) {
      toast({
        title: "Oh no, beauty!",
        description: "Something went wrong while curating your tips. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-card border-none shadow-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-lg">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="font-headline">Personalized Lash Ritual</CardTitle>
            <CardDescription>Tailored advice based on your history</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {!tips ? (
          <div className="text-center py-8 space-y-4">
            <div className="max-w-[280px] mx-auto text-muted-foreground text-sm leading-relaxed">
              Curate a bespoke care routine designed specifically for your unique lash style and service history.
            </div>
            <Button 
              onClick={handleGenerate} 
              disabled={loading}
              className="bg-primary hover:bg-primary/90 text-white font-bold px-8"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Curating...
                </>
              ) : (
                "Unlock My Tips"
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                <Heart className="h-4 w-4 fill-primary" />
                Care Rituals
              </h4>
              <ul className="space-y-2">
                {tips.lashCareTips.map((tip, i) => (
                  <li key={i} className="text-sm bg-muted/30 p-3 rounded-lg border-l-2 border-primary leading-relaxed italic">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Curated Products
              </h4>
              <div className="grid gap-3">
                {tips.productRecommendations.map((prod, i) => (
                  <div key={i} className="bg-secondary p-4 rounded-xl border border-border/50">
                    <p className="font-bold text-sm mb-1">{prod.productName}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{prod.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              variant="outline" 
              onClick={() => setTips(null)}
              className="w-full border-primary/30 text-primary hover:bg-primary/10"
            >
              Update My Tips
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
