// src/app/(main)/messages/page.tsx
"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Send, Home, MessageSquare, User } from "lucide-react";
import Link from "next/link";

export default function MessagesPage() {
  return (
    <div className="flex flex-col h-[100dvh] bg-background">
      {/* Mobile Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold">Messages</h1>
        <Button variant="default" size="sm" className="rounded-full">
          <Plus className="h-4 w-4" />
          <span className="ml-2">New Message</span>
        </Button>
      </header>

      {/* Search Bar - Fixed position on mobile */}
      <div className="p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Input
          type="search"
          placeholder="Search"
          className="rounded-full bg-muted"
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        {/* Conversations List */}
        <ScrollArea className="h-full">
          <div className="divide-y">
            {[1, 2, 3].map((item) => (
              <button
                key={item}
                className="w-full p-4 flex items-center gap-3 hover:bg-accent transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-muted flex-shrink-0" />
                <div className="min-w-0 flex-1 text-left">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold truncate">John Doe</p>
                    <p className="text-xs text-muted-foreground whitespace-nowrap">2h ago</p>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    Hi there!
                  </p>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Mobile Navigation Bar */}
      <nav className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-around p-2">
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
        </div>
      </nav>
    </div>
  );
}
