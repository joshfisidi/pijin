"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Send } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto w-full">
      {/* Header - Made more responsive */}
      <Card className="rounded-none border-x-0 border-t-0">
        <CardHeader className="p-4 space-y-0 flex flex-row items-center justify-between">
          <CardTitle className="text-xl md:text-2xl">Messages</CardTitle>
          <Button variant="default" size="sm" className="rounded-full">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">New Message</span>
          </Button>
        </CardHeader>
      </Card>

      {/* Search Bar - Improved padding for mobile */}
      <Card className="rounded-none border-x-0">
        <CardContent className="p-3 md:p-4">
          <Input
            type="search"
            placeholder="Search messages..."
            className="rounded-full bg-muted max-w-full"
          />
        </CardContent>
      </Card>

      {/* Main Content Area - Better overflow handling */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="divide-y">
            {[1, 2, 3].map((item) => (
              <Card 
                key={item} 
                className="rounded-none border-x-0 hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <CardHeader className="p-3 md:p-4 space-y-0">
                  <CardTitle className="text-base font-normal">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted flex-shrink-0" />
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
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Message Input - Responsive padding and sizing */}
      <Card className="rounded-none border-x-0 border-b-0 hidden">
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