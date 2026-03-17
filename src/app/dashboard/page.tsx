
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { PointsOverview } from "@/components/points-overview"
import { AiLashTips } from "@/components/ai-lash-tips"
import { RewardsCatalog } from "@/components/rewards-catalog"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronRight, Sparkles } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <SidebarInset className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header Section */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-headline font-bold mb-2">Welcome Back, Ariah</h1>
              <p className="text-muted-foreground font-medium flex items-center gap-2 italic">
                Ready for your next glow up?
                <Sparkles className="h-4 w-4 text-primary" />
              </p>
            </div>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-8 h-14 rounded-2xl shadow-lg shadow-primary/20 group">
              <Calendar className="mr-2 h-5 w-5" />
              Book Appointment
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </header>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Stats & History */}
            <div className="lg:col-span-8 space-y-8">
              <PointsOverview />
              
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-headline font-bold">Featured Rewards</h2>
                  <Link href="/rewards" className="text-primary text-sm font-bold flex items-center hover:underline">
                    View Catalog
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                <RewardsCatalog featuredOnly={true} />
              </section>
            </div>

            {/* Right Column - AI & Actions */}
            <div className="lg:col-span-4 space-y-8">
              <AiLashTips />
              
              <div className="bg-primary rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                <h3 className="font-headline text-2xl font-bold mb-4 relative z-10">Invite a Friend</h3>
                <p className="text-white/80 text-sm mb-6 leading-relaxed relative z-10">Give your bestie $10 off their first full set and get 100 bonus points for your loyalty.</p>
                <Button className="w-full bg-white text-primary hover:bg-white/90 font-bold rounded-xl h-12 relative z-10">
                  Get Referral Link
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </div>
  )
}
