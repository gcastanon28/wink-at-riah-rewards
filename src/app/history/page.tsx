
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { VisitHistory } from "@/components/visit-history"
import { History, TrendingUp, Sparkles } from "lucide-react"

export default function HistoryPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <SidebarInset className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-12">
          <header>
            <div className="flex items-center gap-2 text-primary font-bold mb-2 uppercase tracking-widest text-xs">
              <History className="h-4 w-4" />
              Your Records
            </div>
            <h1 className="text-4xl md:text-5xl font-headline font-bold">Visit History</h1>
            <p className="text-muted-foreground mt-2">
              Review your past services, notes, and point earnings.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-md flex flex-col items-center text-center gap-2">
              <div className="p-3 bg-primary/10 rounded-full mb-2">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <span className="text-3xl font-bold">12</span>
              <span className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Total Visits</span>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-md flex flex-col items-center text-center gap-2">
              <div className="p-3 bg-primary/10 rounded-full mb-2">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <span className="text-3xl font-bold">850</span>
              <span className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Lifetime Points</span>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-md flex flex-col items-center text-center gap-2">
              <div className="p-3 bg-primary/10 rounded-full mb-2">
                <History className="h-6 w-6 text-primary" />
              </div>
              <span className="text-3xl font-bold">Feb 24</span>
              <span className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Last Visit</span>
            </div>
          </div>

          <VisitHistory />
        </div>
      </SidebarInset>
    </div>
  )
}
