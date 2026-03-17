
"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Gift,
  History,
  User,
  Star,
  Sparkles,
  CalendarDays,
  Menu,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MOCK_USER } from "@/app/lib/mock-data"
import { cn } from "@/lib/utils"

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Points",
    url: "/points",
    icon: Star,
  },
  {
    title: "Rewards Catalog",
    url: "/rewards",
    icon: Gift,
  },
  {
    title: "Visit History",
    url: "/history",
    icon: History,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="py-6 px-4">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-headline text-lg font-bold tracking-tight text-primary">WinkLuxe</span>
            <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Rewards</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title} isActive={isActive}>
                      <Link href={item.url} className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
                        isActive ? "bg-primary text-white" : "hover:bg-muted text-sidebar-foreground"
                      )}>
                        <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-primary")} />
                        <span className="font-medium group-data-[collapsible=icon]:hidden">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Link href="/profile" className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted transition-colors group-data-[collapsible=icon]:p-0">
          <Avatar className="h-10 w-10 border-2 border-primary/20">
            <AvatarImage src={`https://picsum.photos/seed/${MOCK_USER.name}/100/100`} />
            <AvatarFallback className="bg-primary text-white">AJ</AvatarFallback>
          </Avatar>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden overflow-hidden">
            <span className="text-sm font-semibold truncate">{MOCK_USER.name}</span>
            <span className="text-xs text-muted-foreground truncate">{MOCK_USER.tier} Tier</span>
          </div>
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
