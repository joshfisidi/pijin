// components/user/UserSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Settings, MessageSquare } from "lucide-react";

const navItems = [
  {
    href: "/user/settings",
    label: "Settings",
    icon: Settings
  },
  {
    href: "/user/messages",
    label: "Messages",
    icon: MessageSquare
  }
];

export default function UserSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-card">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                isActive 
                  ? "bg-accent text-accent-foreground" 
                  : "hover:bg-accent/50 text-muted-foreground hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
