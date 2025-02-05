"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Send } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full px-4 md:px-8">
      {/* Header */}
      <Card className="rounded-none border-x-0 border-t-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-xl font-semibold">Messages</CardTitle>
          <Button variant="outline" size="sm" className="rounded-full">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline-block ml-2">New Message</span>
          </Button>
        </CardHeader>
      </Card>

      {/* Search */}
      <Card className="rounded-none border-x-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardContent className="p-3 md:p-4">
          <Input
            type="search"
            placeholder="Search messages..."
            className="rounded-full bg-accent/50 max-w-full"
          />
        </CardContent>
      </Card>

      {/* Messages List */}
      <ScrollArea className="flex-1 -mx-4 px-4">
        <div className="divide-y divide-border">
          {[1, 2, 3].map((item) => (
            <Card 
              key={item} 
              className="rounded-none border-x-0 hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <CardContent className="p-3 md:p-4 flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold truncate text-sm md:text-base">
                      John Doe
                    </p>
                    <p className="text-xs text-muted-foreground whitespace-nowrap">
                      2h ago
                    </p>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground truncate">
                    Hi there! How are you doing today?
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <Card className="rounded-none border-x-0 border-b-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 hidden">
        <CardContent className="p-3 md:p-4">
          <form className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Type a message..."
              className="rounded-full"
            />
            <Button size="icon" className="rounded-full h-9 w-9 md:h-10 md:w-10 flex-shrink-0">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}