// src/components/app-sidebar.tsx
"use client"

import { Home, MessageSquare, Users, Settings, LogOut, User } from "lucide-react"
import { useUserProfile } from "@/hooks/use-user-profile"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"

type AppSidebarProps = {
  collapsible?: "icon" | "offcanvas" | "none"
}

export function AppSidebar({ collapsible = "icon" }: AppSidebarProps) {
  const { username, isLoading } = useUserProfile()

  const mainNavItems = [
    { 
      title: "Home",
      icon: Home,
      href: "/dashboard"
    },
    {
      title: "Messages",
      icon: MessageSquare,
      href: "/messages"
    },
    {
      title: "Contacts",
      icon: Users,
      href: "/contacts"
    },
    {
      title: "Profile",
      icon: User,
      href: username ? `/user/${username}` : '#',
      disabled: isLoading
    }
  ]

  const bottomNavItems = [
    {
      title: "Settings",
      icon: Settings,
      href: "/settings"
    },
    {
      title: "Logout",
      icon: LogOut,
      href: "/auth/logout"
    }
  ]

  return (
    <Sidebar collapsible={collapsible}>
      <SidebarHeader>
        <div className="flex h-[60px] items-center px-4">
          <span className="font-semibold">Pijin</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild disabled={item.disabled}>
                    <a href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  )
}