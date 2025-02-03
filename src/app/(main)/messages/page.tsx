// src/app/(main)/messages/page.tsx
"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Send, Home, MessageSquare, User } from "lucide-react";
import Link from "next/link";

export default function MessagesPage() {
  return (
    <div className="flex flex-col h-[100dvh] bg-background">
      {/* Mobile Header */}
      <Card className="rounded-none border-x-0 border-t-0">
        <CardHeader className="p-4 space-y-0 flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">Messages</CardTitle>
          <Button variant="default" size="sm" className="rounded-full">
            <Plus className="h-4 w-4" />
            <span className="ml-2">New Message</span>
          </Button>
        </CardHeader>
      </Card>

      {/* Search Bar - Fixed position on mobile */}
      <Card className="rounded-none border-x-0">
        <CardContent className="p-4">
          <Input
            type="search"
            placeholder="Search"
            className="rounded-full bg-muted"
          />
        </CardContent>
      </Card>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        {/* Conversations List */}
        <ScrollArea className="h-full">
          <div className="divide-y">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="rounded-none border-x-0">
                <CardHeader className="p-4 space-y-0">
                  <CardTitle className="text-base font-normal">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-muted flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-semibold truncate">John Doe</p>
                          <p className="text-xs text-muted-foreground whitespace-nowrap">2h ago</p>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          Hi there!
                        </p>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Message Input - Only shown in chat view */}
      <Card className="rounded-none border-x-0 border-b-0 hidden">
        <CardContent className="p-4">
          <form className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Type a message..."
              className="rounded-full"
            />
            <Button size="icon" className="rounded-full h-10 w-10">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Mobile Navigation Bar */}
      <Card className="rounded-none border-x-0 border-b-0 mt-auto">
        <CardContent className="p-2">
          <nav className="flex items-center justify-around">
            <Link 
              href="/dashboard" 
              className="flex flex-col items-center p-2 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-6 w-6" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link 
              href="/messages" 
              className="flex flex-col items-center p-2 text-primary"
            >
              <MessageSquare className="h-6 w-6" />
              <span className="text-xs mt-1">Messages</span>
            </Link>
            <Link 
              href="/profile" 
              className="flex flex-col items-center p-2 text-muted-foreground hover:text-foreground"
            >
              <User className="h-6 w-6" />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          </nav>
        </CardContent>
      </Card>
    </div>
  );
}
