"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Star, Gift, History, User, UserPlus } from "lucide-react";

import { useClientData } from "@/hooks/use-client-data";
import { isStaffEmail } from "@/lib/staff";

const items = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Points", href: "/points", icon: Star },
    { title: "Rewards", href: "/rewards", icon: Gift },
    { title: "History", href: "/history", icon: History },
    { title: "Profile", href: "/profile", icon: User },
];

export function MobileBottomNav() {
    const pathname = usePathname();
    const { clientData } = useClientData();
    const visibleItems = isStaffEmail(clientData.email)
        ? [...items, { title: "Add", href: "/staff/points", icon: UserPlus }]
        : items;

    return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/95 pb-safe backdrop-blur md:hidden">
        <div
            className={
                visibleItems.length === 6 ? "grid grid-cols-6" : "grid grid-cols-5"
            }
        >
        {visibleItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
            <Link
                key={item.href}
                href={item.href}
                className={`flex min-h-16 flex-col items-center justify-center gap-1 px-2 py-3 text-xs transition ${
                isActive ? "text-pink-400" : "text-white/70 hover:text-white"
            }`}
            >
                <Icon className="h-5 w-5" />
                <span className="truncate">{item.title}</span>
            </Link>
        );
        })}
        </div>
    </nav>
);
}
