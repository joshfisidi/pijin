"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Activity, 
  BarChart3, 
  Bell, 
  MessageSquare, 
  Plus, 
  Search,
  Settings, 
  Users,
  User,
  Phone,
  X
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  name: string;
  avatar?: string;
  message: string;
  time: string;
  unread?: number;
  isActive?: boolean;
  messageCount?: number;
  trend?: number;
}

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.targetTouches[0];
    if (touch) setTouchStart(touch.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.targetTouches[0];
    if (touch) setTouchEnd(touch.clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;

    const distance = touchEnd - touchStart;
    const isLeftSwipe = distance < -50;
    const isRightSwipe = distance > 50;

    if (isRightSwipe && !isSidebarOpen) {
      setIsSidebarOpen(true);
    } else if (isLeftSwipe && isSidebarOpen) {
      setIsSidebarOpen(false);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const messages: Message[] = [
    {
      id: 1,
      name: "Aahad",
      avatar: "/avatars/aahad.jpg",
      message: "See you soon bro...",
      time: "10:25 pm",
      unread: 2,
      isActive: true,
      messageCount: 156,
      trend: 12
    },
    {
      id: 2,
      name: "Marjorie",
      avatar: "/avatars/marjorie.jpg",
      message: "Voice message",
      time: "10:11 pm",
      unread: 2,
      isActive: true,
      messageCount: 89,
      trend: -5
    },
    {
      id: 3,
      name: "Philip",
      avatar: "/avatars/philip.jpg",
      message: "Where are you...",
      time: "9:55 pm",
      messageCount: 45,
      trend: 8
    }
  ];

  const stories = [
    { id: 1, name: "Add Story", isAdd: true },
    { id: 2, name: "Aahad", avatar: "/avatars/aahad.jpg" },
    { id: 3, name: "Wasim", avatar: "/avatars/wasim.jpg" },
    { id: 4, name: "Asim", avatar: "/avatars/asim.jpg" },
    { id: 5, name: "Fateh", avatar: "/avatars/fateh.jpg" }
  ];

  return (
    <>
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 w-64 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-r transform transition-transform duration-300 ease-in-out z-50",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Card className="h-full border-0 rounded-none">
          <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold">Menu</CardTitle>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 cursor-pointer">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-muted-foreground">View Profile</p>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Messages
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Users className="h-5 w-5" />
                  Groups
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Activity className="h-5 w-5" />
                  Activity
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Settings className="h-5 w-5" />
                  Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div 
        className="flex flex-col h-full max-w-2xl mx-auto w-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Header */}
        <Card className="rounded-none border-x-0 border-t-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader className="p-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">buddies</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search buddies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-40 rounded-full bg-secondary/50 border-0 pl-9"
                  />
                  <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
                <div className="relative">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full text-[10px] text-white flex items-center justify-center">3</span>
                  </Button>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Quick Stats */}
        <Card className="mx-4 mt-4 mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Activity Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Active Buddies</span>
              </div>
              <Badge variant="secondary">12 online</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Stories */}
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Stories</h2>
            <Badge variant="secondary" className="rounded-full">
              <BarChart3 className="h-3 w-3 mr-1" />
              +24% views
            </Badge>
          </div>
          <ScrollArea className="w-full">
            <div className="flex gap-4 pb-4">
              {stories.map((story) => (
                <div key={story.id} className="flex flex-col items-center gap-2">
                  <div className={`relative ${!story.isAdd ? 'ring-2 ring-offset-2 ring-green-400' : ''} rounded-full`}>
                    {story.isAdd ? (
                      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                        <Plus className="h-6 w-6" />
                      </div>
                    ) : (
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={story.avatar} alt={story.name} />
                        <AvatarFallback>{story.name[0]}</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                  <span className="text-sm">{story.name}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Recent Chats Header */}
        <Card className="mx-4 mb-4">
          <CardHeader className="py-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Chats</CardTitle>
              <Button variant="ghost" size="sm" className="text-muted-foreground text-sm">
                Archive Chats
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Messages List */}
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4">
            {messages.map((item) => (
              <Card key={item.id} className="hover:bg-accent/5 transition-colors cursor-pointer">
                <CardContent className="p-2 flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={item.avatar} alt={item.name} />
                      <AvatarFallback>{item.name[0]}</AvatarFallback>
                    </Avatar>
                    {item.isActive && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-background" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{item.name}</p>
                        {item.trend && (
                          <Badge variant="secondary" className="text-xs">
                            <BarChart3 className="h-3 w-3 mr-1" />
                            {item.trend > 0 ? '+' : ''}{item.trend}%
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{item.time}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground truncate">
                        {item.message}
                      </p>
                      {item.unread && (
                        <Badge variant="default" className="rounded-full bg-blue-500 ml-2">
                          {item.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>

        {/* Bottom Navigation */}
        <div className="mt-auto border-t">
          <div className="flex justify-center gap-8 p-4">
            <Button 
              variant="default" 
              className="rounded-full px-8 bg-gradient-to-r from-blue-400 to-blue-600"
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              Chat
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Phone className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}