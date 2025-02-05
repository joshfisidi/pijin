"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-6">
        <h1 className="text-2xl font-semibold">Messages</h1>
        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 bg-background">
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      {/* Search */}
      <div className="px-4 pb-4">
        <Input
          type="search"
          placeholder="Search messages..."
          className="rounded-full bg-secondary border-0"
        />
      </div>

      {/* Messages List */}
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-2">
          {[1, 2, 3].map((item) => (
            <div 
              key={item} 
              className="flex items-center gap-3 py-2 hover:bg-accent/5 transition-colors cursor-pointer rounded-lg px-2"
            >
              <div className="w-12 h-12 rounded-full bg-secondary flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold">
                    John Doe
                  </p>
                  <p className="text-sm text-muted-foreground">
                    2h ago
                  </p>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  Hi there! How are you doing today?
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}