import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { RewardsCatalog } from "@/components/rewards-catalog"
import { MOCK_USER } from "@/app/lib/mock-data"
import { Gift, Star } from "lucide-react"

export default function RewardsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <SidebarInset className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-12">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold mb-2 uppercase tracking-widest text-xs">
                <Gift className="h-4 w-4" />
                Member Privileges
              </div>
              <h1 className="text-4xl md:text-5xl font-headline font-bold">Rewards Catalog</h1>
              <p className="text-muted-foreground mt-2 max-w-xl">
                Redeem your loyalty points for bespoke beauty treatments and exclusive services at Wink At Riah.
              </p>
            </div>
            <div className="bg-card px-6 py-4 rounded-2xl border border-border/50 shadow-lg flex items-center gap-4">
              <div className="bg-primary/20 p-2 rounded-lg">
                <Star className="h-6 w-6 text-primary fill-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Lash Point Balance</p>
                <p className="text-2xl font-bold text-primary">{MOCK_USER.points} Points</p>
              </div>
            </div>
          </header>

          <RewardsCatalog />

          <div className="bg-muted/20 border-2 border-dashed border-border rounded-3xl p-10 text-center space-y-4">
            <h3 className="font-headline text-2xl font-bold">Coming Soon...</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">We're curating more luxury rewards for our VIPs. Stay tuned for seasonal exclusives!</p>
          </div>
        </div>
      </SidebarInset>
    </div>
  )
}
