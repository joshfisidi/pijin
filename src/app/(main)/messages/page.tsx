// src/app/(main)/messages/page.tsx
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Send } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="min-h-screen p-4 md:p-6 bg-background">
      {/* Header - Stack on mobile, row on tablet+ */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Messages</h1>
        <Button className="w-full sm:w-auto flex items-center justify-center gap-2">
          <Plus className="h-4 w-4" />
          New Message
        </Button>
      </div>

      {/* Main Layout - Stack on mobile, sidebar + chat on tablet+ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 h-[calc(100vh-8rem)]">
        {/* Conversations List - Horizontal scroll on mobile */}
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Search conversations..."
              className="w-full"
            />
            <ScrollArea className="h-[calc(100vh-16rem)]">
              <div className="space-y-2">
                {/* Conversation items */}
                {[1, 2].map((item) => (
                  <Card 
                    key={item} 
                    className="hover:bg-accent transition-colors cursor-pointer"
                  >
                    <CardHeader className="p-4">
                      <CardTitle className="text-base font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-muted flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-semibold truncate">Tachina Gomes</p>
                              <p className="text-xs text-muted-foreground whitespace-nowrap">2h ago</p>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              Hey, are we still on for the meeting today?
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
        </div>

        {/* Chat View - Full width on mobile, flex on desktop */}
        <div className="lg:col-span-8 xl:col-span-9 flex flex-col bg-card rounded-lg border h-full">
          {/* Chat Header */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted" />
              <div className="min-w-0">
                <p className="font-semibold">John Doe</p>
                <p className="text-sm text-muted-foreground">Active now</p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {/* Received Message */}
              <div className="flex gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0 mt-1" />
                <div className="bg-accent rounded-2xl rounded-tl-sm p-3">
                  <p className="text-sm">Hi there! How can I help you today?</p>
                </div>
              </div>

              {/* Sent Message */}
              <div className="flex flex-row-reverse gap-3 max-w-[80%] ml-auto">
                <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0 mt-1" />
                <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm p-3">
                  <p className="text-sm">Hey! I had a question about the new features.</p>
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t mt-auto">
            <form className="flex gap-2">
              <Input
                type="text"
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
