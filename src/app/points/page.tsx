
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { PointsOverview } from "@/components/points-overview"
import { Star, Gift, TrendingUp, Sparkles } from "lucide-react"

export default function PointsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <SidebarInset className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-12">
          <header>
            <div className="flex items-center gap-2 text-primary font-bold mb-2 uppercase tracking-widest text-xs">
              <Star className="h-4 w-4" />
              Loyalty Statistics
            </div>
            <h1 className="text-4xl md:text-5xl font-headline font-bold">My Points Detail</h1>
            <p className="text-muted-foreground mt-2">
              Deep dive into how you earn and spend your WinkLuxe rewards.
            </p>
          </header>

          <PointsOverview />

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                How to Earn
              </h2>
              <div className="space-y-4">
                {[
                  { title: "Service Spending", detail: "1 Point per $1 spent", icon: Sparkles },
                  { title: "Product Purchases", detail: "2 Points per $1 spent", icon: Gift },
                  { title: "Refer a Friend", detail: "100 Points per referral", icon: Star },
                  { title: "Birthday Reward", detail: "50 Bonus Points", icon: Gift },
                ].map((item, i) => (
                  <div key={i} className="bg-card p-5 rounded-2xl border border-border/50 shadow-sm flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-xl">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
                <Gift className="h-5 w-5 text-primary" />
                Tier Benefits
              </h2>
              <div className="bg-gradient-to-br from-primary/10 to-transparent p-8 rounded-3xl border border-primary/20 space-y-4">
                <h3 className="font-headline text-xl font-bold text-primary">Diamond Tier Status</h3>
                <ul className="space-y-3">
                  <li className="text-sm flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>Free lash bath with every full set</span>
                  </li>
                  <li className="text-sm flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>Early access to seasonal booking slots</span>
                  </li>
                  <li className="text-sm flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>10% discount on all aftercare products</span>
                  </li>
                  <li className="text-sm flex items-start gap-2 text-muted-foreground line-through decoration-primary/50">
                    <Sparkles className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                    <span>Priority same-day fill requests (Platinum only)</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </SidebarInset>
    </div>
  )
}
