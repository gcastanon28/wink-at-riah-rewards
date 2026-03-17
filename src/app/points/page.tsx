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
              Loyalty Perks
            </div>
            <h1 className="text-4xl md:text-5xl font-headline font-bold">Rewards Detail</h1>
            <p className="text-muted-foreground mt-2">
              Learn how to earn more points and unlock the full Wink At Riah experience.
            </p>
          </header>

          <PointsOverview />

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Earn Points
              </h2>
              <div className="space-y-4">
                {[
                  { title: "Lash Services", detail: "1 Point per $1 spent", icon: Sparkles },
                  { title: "Aftercare Products", detail: "2 Points per $1 spent", icon: Gift },
                  { title: "Refer a Bestie", detail: "100 Points per referral", icon: Star },
                  { title: "Birthday Treat", detail: "50 Bonus Points", icon: Gift },
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
                Lash VIP Benefits
              </h2>
              <div className="bg-gradient-to-br from-primary/10 to-transparent p-8 rounded-3xl border border-primary/20 space-y-4">
                <h3 className="font-headline text-xl font-bold text-primary">VIP Member Perks</h3>
                <ul className="space-y-3">
                  <li className="text-sm flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>Free Lash Bath with every full set session</span>
                  </li>
                  <li className="text-sm flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>Exclusive early access to holiday booking slots</span>
                  </li>
                  <li className="text-sm flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>10% Discount on all lash aftercare products</span>
                  </li>
                  <li className="text-sm flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>VIP priority standby for same-day fill openings</span>
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
