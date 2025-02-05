"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Send } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <Card className="rounded-none border-x-0 border-t-0">
        <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-xl font-semibold">Messages</CardTitle>
          <Button variant="outline" size="sm" className="rounded-full">
            <Plus className="h-4 w-4" />
            <span className="ml-2">New Message</span>
          </Button>
        </CardHeader>
      </Card>

      {/* Search */}
      <Card className="rounded-none border-x-0">
        <CardContent className="p-4">
          <Input
            type="search"
            placeholder="Search"
            className="rounded-full bg-accent/50"
          />
        </CardContent>
      </Card>

      {/* Messages List */}
      <ScrollArea className="flex-1">
        <div className="divide-y divide-border">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="rounded-none border-x-0 hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold truncate">John Doe</p>
                    <p className="text-xs text-muted-foreground whitespace-nowrap">2h ago</p>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    Hi there!
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
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
    </div>
  );
}