"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Gift,
  History,
  User,
  Star,
  Sparkles,
  Menu,
  X,
  LogOut,
} from "lucide-react";

import { useClientData } from "@/hooks/use-client-data";
import { supabase } from "@/app/lib/supabase";
import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Points", url: "/points", icon: Star },
  { title: "Rewards Catalog", url: "/rewards", icon: Gift },
  { title: "Visit History", url: "/history", icon: History },
  { title: "Profile", url: "/profile", icon: User },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { clientData } = useClientData();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [signingOut, setSigningOut] = React.useState(false);

  const displayName =
    clientData?.name && clientData.name.trim() !== ""
      ? clientData.name
      : "Client";

  const displayTier =
    clientData?.tier && clientData.tier.trim() !== ""
      ? clientData.tier
      : "New Member";

  const avatarUrl =
    (clientData as any)?.avatar_url && (clientData as any).avatar_url.trim() !== ""
      ? (clientData as any).avatar_url
      : "";

  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    try {
      setSigningOut(true);
      await supabase.auth.signOut();
      router.replace("/login");
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <>
      {/* DESKTOP SIDEBAR ONLY */}
      <aside className="hidden md:flex md:w-[280px] md:flex-col md:border-r md:border-white/10 md:bg-[#0d0912]">
        <div className="flex flex-col items-center px-6 py-8">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500/20 text-pink-400">
            <Sparkles className="h-6 w-6" />
          </div>

          <img
            src="/logo.png"
            alt="Wink At Riah Logo"
            className="mx-auto mb-4 w-44 drop-shadow-[0_0_20px_rgba(255,79,198,0.5)]"
          />

          <h1 className="text-xl font-bold text-pink-400">Wink At Riah</h1>
          <p className="text-sm text-white/60">Lash Rewards</p>
        </div>

        <div className="px-6 pb-6">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-white/70">
            Member Menu
          </p>

          <nav className="space-y-2">
            {items.map((item) => {
              const isActive = pathname === item.url;
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href={item.url}
                  className={cn(
                    "flex items-center gap-3 rounded-full px-4 py-3 text-base font-medium transition",
                    isActive
                      ? "bg-pink-500 text-white"
                      : "text-white hover:bg-white/5"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5",
                      isActive ? "text-white" : "text-pink-400"
                    )}
                  />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto border-t border-white/10 p-4">
          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-2xl p-3 transition hover:bg-white/5"
          >
            <Avatar className="h-12 w-12 border-2 border-pink-500/20">
              <AvatarImage src={avatarUrl} alt={displayName} />
              <AvatarFallback className="bg-pink-500 text-white">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {displayName}
              </p>
              <p className="truncate text-sm font-bold uppercase text-pink-400">
                {displayTier}
              </p>
            </div>
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/5 hover:text-white disabled:opacity-60"
          >
            <LogOut className="h-4 w-4 text-pink-400" />
            {signingOut ? "Signing out..." : "Sign out"}
          </button>
        </div>
      </aside>

      {/* MOBILE FACEBOOK-STYLE TOP BAR */}
      <div className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#0d0912]/95 backdrop-blur md:hidden">
        <div className="flex items-center gap-3 px-4 py-4">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-500 text-white shadow-lg"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>

      {pathname !== "/dashboard" && (
      <div className="flex items-center gap-3">
        <img
          src="/logo.png"
          alt="Wink At Riah Logo"
          className="h-12 w-12 rounded-xl object-cover"
        />
        <div className="leading-tight">
          <p className="text-lg font-bold text-pink-400">Wink At Riah</p>
          <p className="text-sm text-white/60">Lash Rewards</p>
        </div>
      </div>
    )}
          </div>
        </div>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu overlay"
            className="fixed inset-0 z-50 bg-black/50 md:hidden"
            onClick={() => setMobileOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 z-[60] w-[82%] max-w-[320px] overflow-y-auto border-r border-white/10 bg-[#0d0912] md:hidden">
            <div className="flex items-start justify-between p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/20 text-pink-400">
                <Sparkles className="h-6 w-6" />
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="px-5 pb-6">
              <div className="mb-8 text-center">
                <img
                  src="/logo.png"
                  alt="Wink At Riah Logo"
                  className="mx-auto mb-4 w-40 drop-shadow-[0_0_20px_rgba(255,79,198,0.5)]"
                />
                <h1 className="text-2xl font-bold text-pink-300">Wink At Riah</h1>
                <p className="text-base text-white/70">Lash Rewards</p>
              </div>

              <div className="border-t border-white/10 pt-6">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-white/70">
                  Member Menu
                </p>

                <nav className="space-y-3">
                  {items.map((item) => {
                    const isActive = pathname === item.url;
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.title}
                        href={item.url}
                        className={cn(
                          "flex items-center gap-4 rounded-2xl px-4 py-4 text-[18px] font-medium transition",
                          isActive
                            ? "bg-pink-500 text-white"
                            : "text-white hover:bg-white/5"
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-6 w-6",
                            isActive ? "text-white" : "text-pink-400"
                          )}
                        />
                        <span>{item.title}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 p-5">
              <Link
                href="/profile"
                className="flex items-center gap-4 rounded-2xl p-3 transition hover:bg-white/5"
              >
                <Avatar className="h-14 w-14 border-2 border-pink-500/20">
                  <AvatarImage src={avatarUrl} alt={displayName} />
                  <AvatarFallback className="bg-pink-500 text-white text-lg">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <p className="truncate text-xl font-semibold text-white">
                    {displayName}
                  </p>
                  <p className="truncate text-base font-bold uppercase text-pink-400">
                    {displayTier}
                  </p>
                </div>
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={signingOut}
                className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 px-4 py-4 text-lg font-semibold text-white/80 transition hover:bg-white/5 disabled:opacity-60"
              >
                <LogOut className="h-5 w-5 text-pink-400" />
                {signingOut ? "Signing out..." : "Sign out"}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
