
"use client"

import { MOCK_USER } from "@/app/lib/mock-data"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { CalendarDays, Star } from "lucide-react"

export function VisitHistory() {
  return (
    <Card className="border-none shadow-xl bg-card overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-3">
          <CalendarDays className="h-5 w-5 text-primary" />
          <div>
            <CardTitle className="font-headline">Your Lash Journey</CardTitle>
            <CardDescription>A record of your past beauty sessions</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="border-border/50">
              <TableHead className="text-xs uppercase tracking-widest font-bold">Service</TableHead>
              <TableHead className="text-xs uppercase tracking-widest font-bold">Date</TableHead>
              <TableHead className="text-xs uppercase tracking-widest font-bold text-right">Points Earned</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_USER.serviceHistory.map((service, i) => (
              <TableRow key={i} className="border-border/50 hover:bg-muted/10 transition-colors">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">{service.serviceName}</span>
                    {service.notes && <span className="text-xs text-muted-foreground truncate max-w-[200px]">{service.notes}</span>}
                  </div>
                </TableCell>
                <TableCell className="text-sm font-medium">
                  {format(new Date(service.date), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline" className="border-primary/30 text-primary gap-1">
                    <Star className="h-3 w-3 fill-primary" />
                    {service.pointsEarned}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
