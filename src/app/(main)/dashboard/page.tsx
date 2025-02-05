// src/app/(main)/dashboard/page.tsx
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, BarChart3, Bell, MessageSquare, Plus, Settings, Users } from "lucide-react";

export default function DashboardPage() {
  // Handle dynamic height adjustments
  const [contentHeight, setContentHeight] = React.useState("100dvh");

  // Update height on mount and resize
  React.useEffect(() => {
    const updateHeight = () => {
      const headerHeight = 80; // 20px * 4 for p-4 md:p-6
      const navigationHeight = 64; // Typical bottom nav height
      const safeArea = 'env(safe-area-inset-bottom, 0px)';
      
      // Use dynamic viewport height and subtract known heights
      setContentHeight(`calc(100dvh - ${headerHeight}px - ${navigationHeight}px - ${safeArea})`);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header - Stack on mobile, row on tablet+ */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <Button className="w-full sm:w-auto flex items-center justify-center gap-2">
          <Plus className="h-4 w-4" />
          New Post
        </Button>
      </div>

      {/* Main Layout - Stack on mobile, 3-column on desktop */}
      <div 
        className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 p-4 md:px-6 flex-1 overflow-hidden"
        style={{ height: contentHeight }}
      >
        {/* Stats Cards - Horizontal scroll on mobile, vertical on desktop */}
        <div className="md:col-span-3 flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto scrollbar-hide">
          <Card className="flex-shrink-0 w-[280px] md:w-auto">
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Followers</p>
                  <p className="text-xl font-bold">1,234</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Messages</p>
                  <p className="text-xl font-bold">56</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Engagement</p>
                  <p className="text-xl font-bold">85%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Feed - Full width on mobile, center on desktop */}
        <div className="md:col-span-6 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="space-y-4 pr-4">
              {[1, 2, 3].map((item) => (
                <Card key={item}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-muted flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <p className="font-semibold truncate">Jane Cooper</p>
                          <p className="text-sm text-muted-foreground">2h ago</p>
                        </div>
                        <p className="mt-2 text-sm">
                          Just launched a new project! Really excited to share this with everyone.
                          Check out the latest updates and let me know what you think.
                        </p>
                        <div className="mt-4 flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="gap-1">
                            <MessageSquare className="h-4 w-4" /> 24
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Activity className="h-4 w-4" /> 142
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Right Sidebar - Grid on mobile, stack on desktop */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 md:overflow-y-auto scrollbar-hide">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg">
                Notifications
                <Bell className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-start gap-4">
                      <div className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">New message from Alex</p>
                        <p className="text-xs text-muted-foreground">5m ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg">
                Quick Actions
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  View Profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Messages
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}