"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Search, User, MessageSquare, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: number;
  name: string;
  avatar?: string;
  message: string;
  time: string;
  unread?: number;
}

export default function MessagesPage() {
  const messages: Message[] = [
    {
      id: 1,
      name: "Aahad",
      avatar: "/avatars/aahad.jpg",
      message: "See you soon bro...",
      time: "10:25 pm",
      unread: 2
    },
    {
      id: 2,
      name: "Marjorie",
      avatar: "/avatars/marjorie.jpg",
      message: "Voice message",
      time: "10:11 pm",
      unread: 2
    },
    {
      id: 3,
      name: "Philip",
      avatar: "/avatars/philip.jpg",
      message: "Where are you...",
      time: "9:55 pm"
    }
  ];

  const stories = [
    { id: 1, name: "Add Story", isAdd: true },
    { id: 2, name: "Aahad", avatar: "/avatars/aahad.jpg" },
    { id: 3, name: "Wasim", avatar: "/avatars/wasim.jpg" },
    { id: 4, name: "Asim", avatar: "/avatars/asim.jpg" },
    { id: 5, name: "Fateh", avatar: "/avatars/fateh.jpg" }
  ];

  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-6">
        <h1 className="text-2xl font-semibold">buddies</h1>
        <div className="flex gap-8">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-40 rounded-full bg-secondary/50 border-0 pl-9"
            />
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          </div>
          <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Stories */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Stories</h2>
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
      <div className="flex items-center justify-between px-4 mb-4">
        <h2 className="text-lg font-semibold">Recent Chats</h2>
        <Button variant="ghost" size="sm" className="text-muted-foreground text-sm">
          Archive Chats
        </Button>
      </div>

      {/* Messages List */}
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-4">
          {messages.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center gap-3 hover:bg-accent/5 transition-colors cursor-pointer rounded-lg p-2"
            >
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={item.avatar} alt={item.name} />
                  <AvatarFallback>{item.name[0]}</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-background" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold">{item.name}</p>
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
            </div>
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
  );
}