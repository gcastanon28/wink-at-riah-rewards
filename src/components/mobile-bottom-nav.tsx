"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Star, Gift, History, User } from "lucide-react";

const items = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Points", href: "/points", icon: Star },
    { title: "Rewards", href: "/rewards", icon: Gift },
    { title: "History", href: "/history", icon: History },
    { title: "Profile", href: "/profile", icon: User },
];

export function MobileBottomNav() {
    const pathname = usePathname();

    return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/95 backdrop-blur md:hidden">
        <div className="grid grid-cols-5">
        {items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
            <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 px-2 py-3 text-xs transition ${
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