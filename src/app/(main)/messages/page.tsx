// src/app/(main)/messages/page.tsx
"use client";

import * as React from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Send } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="h-full p-6 bg-background">
      {/* Header with page title and New Message button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Messages</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Message
        </Button>
      </div>

      {/* Main container: sidebar + chat view */}
      <div className="grid grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
        {/* Sidebar: Conversations List */}
        <div className="col-span-1">
          <Input
            type="text"
            placeholder="Search conversations..."
            className="mb-4"
          />
          <ScrollArea className="h-[calc(100vh-12rem)]">
            {/* Conversation item 1 */}
            <Card className="mb-3 hover:bg-accent transition-colors cursor-pointer">
              <CardHeader className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold">John Doe</p>
                    <p className="text-sm text-muted-foreground truncate">
                      Hey, are we still on for...
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>
            {/* Conversation item 2 */}
            <Card className="mb-3 hover:bg-accent transition-colors cursor-pointer">
              <CardHeader className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold">Jane Smith</p>
                    <p className="text-sm text-muted-foreground truncate">
                      Got your message. I&apos;ll reply soon.
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </ScrollArea>
        </div>

        {/* Chat view */}
        <div className="col-span-3 flex flex-col bg-card rounded-lg border shadow-sm">
          {/* Chat header */}
          <div className="p-4 border-b">
            <p className="font-semibold text-lg">John Doe</p>
          </div>
          {/* Message list */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {/* Received message */}
              <div className="flex">
                <div className="bg-accent text-accent-foreground p-3 rounded-lg max-w-xs">
                  Hi there!
                </div>
              </div>
              {/* Sent message */}
              <div className="flex justify-end">
                <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-xs">
                  Hello! How can I help you?
                </div>
              </div>
            </div>
          </ScrollArea>
          {/* Message input area */}
          <div className="p-4 border-t">
            <form className="flex gap-2">
              <Input
                type="text"
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Send
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
