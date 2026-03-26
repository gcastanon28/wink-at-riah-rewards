"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Gift,
  History,
  User,
  Star,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

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
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useClientData } from "@/hooks/use-client-data";

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
];

export function AppSidebar() {
  const pathname = usePathname();
  const { clientData } = useClientData();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const displayName =
    clientData?.name && clientData.name.trim() !== ""
      ? clientData.name
      : "Client";

  const displayTier =
    clientData?.tier && clientData.tier.trim() !== ""
      ? clientData.tier
      : "New Member";

  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-[60] inline-flex h-12 w-12 items-center justify-center rounded-full bg-pink-500 text-white shadow-lg md:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[70] bg-black/60 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile slide-out sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-[80] h-full w-[290px] transform bg-background transition-transform duration-300 ease-in-out md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar className="h-full w-full border-r border-border">
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="absolute right-4 top-4 z-[90] inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>

          <SidebarHeader className="py-6 px-4">
            <div className="flex flex-col items-center justify-center px-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="h-6 w-6" />
              </div>

              <div className="p-6 text-center">
                <img
                  src="/logo.png"
                  alt="Wink At Riah Logo"
                  className="mx-auto mb-4 w-40 drop-shadow-[0_0_20px_rgba(255,79,198,0.5)]"
                />
                <h1 className="text-xl font-bold text-pink-400">Wink At Riah</h1>
                <p className="text-xs text-white/60">Lash Rewards</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="mb-2 px-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Member Menu
              </SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => {
                    const isActive = pathname === item.url;

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild tooltip={item.title} isActive={isActive}>
                          <Link
                            href={item.url}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-300",
                              isActive
                                ? "bg-primary text-white"
                                : "text-sidebar-foreground hover:bg-muted"
                            )}
                          >
                            <item.icon
                              className={cn(
                                "h-5 w-5",
                                isActive ? "text-white" : "text-primary"
                              )}
                            />
                            <span className="font-medium">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4">
            <Link
              href="/profile"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-muted"
            >
              <Avatar className="h-10 w-10 border-2 border-primary/20">
                <AvatarFallback className="bg-primary text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="flex min-w-0 flex-col overflow-hidden">
                <span className="truncate text-sm font-semibold">{displayName}</span>
                <span className="truncate text-xs font-bold tracking-wide text-primary">
                  {displayTier}
                </span>
              </div>
            </Link>
          </SidebarFooter>
        </Sidebar>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar collapsible="icon" className="border-r border-border">
          <SidebarHeader className="py-6 px-4">
            <div className="flex flex-col items-center justify-center px-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="h-6 w-6" />
              </div>

              <div className="p-6 text-center">
                <img
                  src="/logo.png"
                  alt="Wink At Riah Logo"
                  className="mx-auto mb-4 w-44 drop-shadow-[0_0_20px_rgba(255,79,198,0.5)]"
                />
                <h1 className="text-xl font-bold text-pink-400">Wink At Riah</h1>
                <p className="text-xs text-white/60">Lash Rewards</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="mb-2 px-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Member Menu
              </SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => {
                    const isActive = pathname === item.url;

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild tooltip={item.title} isActive={isActive}>
                          <Link
                            href={item.url}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-300",
                              isActive
                                ? "bg-primary text-white"
                                : "text-sidebar-foreground hover:bg-muted"
                            )}
                          >
                            <item.icon
                              className={cn(
                                "h-5 w-5",
                                isActive ? "text-white" : "text-primary"
                              )}
                            />
                            <span className="font-medium group-data-[collapsible=icon]:hidden">
                              {item.title}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4">
            <Link
              href="/profile"
              className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-muted group-data-[collapsible=icon]:justify-center"
            >
              <Avatar className="h-10 w-10 border-2 border-primary/20">
                <AvatarFallback className="bg-primary text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="flex min-w-0 flex-col overflow-hidden group-data-[collapsible=icon]:hidden">
                <span className="truncate text-sm font-semibold">{displayName}</span>
                <span className="truncate text-xs font-bold tracking-wide text-primary">
                  {displayTier}
                </span>
              </div>
            </Link>
          </SidebarFooter>
        </Sidebar>
      </div>
    </>
  );
}