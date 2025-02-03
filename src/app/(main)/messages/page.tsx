// src/app/(main)/messages/page.tsx
"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Send } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header with page title and New Message button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Messages</h1>
        <Button variant="default" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Message
        </Button>
      </div>

      {/* Main container: sidebar + chat view */}
      <div className="flex gap-6">
        {/* Sidebar: Conversations List */}
        <div className="w-1/3">
          <Input
            type="text"
            placeholder="Search conversations..."
            className="mb-4"
          />
          {/* Conversation item 1 */}
          <Card className="p-4 mb-3 hover:shadow-lg cursor-pointer transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full" />
              <div>
                <p className="font-semibold text-gray-800">John Doe</p>
                <p className="text-sm text-gray-500 truncate">
                  Hey, are we still on for...
                </p>
              </div>
            </div>
          </Card>
          {/* Conversation item 2 */}
          <Card className="p-4 mb-3 hover:shadow-lg cursor-pointer transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full" />
              <div>
                <p className="font-semibold text-gray-800">Jane Smith</p>
                <p className="text-sm text-gray-500 truncate">
                  Got your message. I'll reply soon.
                </p>
              </div>
            </div>
          </Card>
          {/* You can add more conversation cards similarly */}
        </div>

        {/* Chat view */}
        <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md">
          {/* Chat header */}
          <div className="p-4 border-b border-gray-200">
            <p className="font-semibold text-lg text-gray-800">John Doe</p>
          </div>
          {/* Message list */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {/* Received message */}
            <div className="flex">
              <div className="bg-blue-100 text-blue-800 p-3 rounded-lg max-w-xs">
                Hi there!
              </div>
            </div>
            {/* Sent message */}
            <div className="flex justify-end">
              <div className="bg-green-100 text-green-800 p-3 rounded-lg max-w-xs">
                Hello! How can I help you?
              </div>
            </div>
            {/* More messages would be rendered here */}
          </div>
          {/* Message input area */}
          <div className="p-4 border-t border-gray-200">
            <form className="flex gap-2">
              <Input
                type="text"
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" variant="default" className="flex items-center gap-2">
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
