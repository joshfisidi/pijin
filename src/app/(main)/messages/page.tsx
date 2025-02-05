"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Send, Menu } from "lucide-react"

const conversations = [
  { id: 1, name: "Alice Johnson", lastMessage: "Hey, how are you?", time: "2m ago", unread: 2 },
  { id: 2, name: "Bob Smith", lastMessage: "Can we meet tomorrow?", time: "1h ago", unread: 0 },
  { id: 3, name: "Charlie Brown", lastMessage: "Thanks for your help!", time: "3h ago", unread: 1 },
]

const messages = [
  { id: 1, sender: "Alice Johnson", content: "Hey, how are you?", time: "2:30 PM" },
  { id: 2, sender: "You", content: "I'm good, thanks! How about you?", time: "2:31 PM" },
  { id: 3, sender: "Alice Johnson", content: "Doing well! Just wanted to catch up.", time: "2:32 PM" },
]

export default function DirectMessages() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0] || {
    id: 0,
    name: "No Conversation",
    lastMessage: "",
    time: "",
    unread: 0
  })
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="h-screen flex flex-col md:flex-row">
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="w-80 p-0">
          <div className="p-4 font-semibold text-lg flex items-center justify-between">
            <span>Messages</span>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-5rem)]">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                className={`w-full text-left p-4 hover:bg-accent flex items-center space-x-4 ${
                  selectedConversation.id === conversation.id ? "bg-accent" : ""
                }`}
                onClick={() => {
                  setSelectedConversation(conversation)
                  setIsSidebarOpen(false)
                }}
              >
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.name}`} />
                  <AvatarFallback>
                    {conversation.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm font-medium truncate">{conversation.name}</p>
                    <span className="text-xs text-muted-foreground">{conversation.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                    {conversation.unread}
                  </span>
                )}
              </button>
            ))}
          </ScrollArea>
        </SheetContent>
      </Sheet>
      <main className="flex-1 flex flex-col">
        <header className="border-b p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.name}`} />
              <AvatarFallback>
                {selectedConversation.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <h2 className="font-semibold">{selectedConversation.name}</h2>
          </div>
        </header>
        <ScrollArea className="flex-1 p-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex mb-4 ${message.sender === "You" ? "justify-end" : ""}`}>
              <div
                className={`max-w-[70%] ${message.sender === "You" ? "bg-primary text-primary-foreground" : "bg-muted"} rounded-lg p-3`}
              >
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-50 mt-1 block">{message.time}</span>
              </div>
            </div>
          ))}
        </ScrollArea>
        <footer className="border-t p-4">
          <form className="flex space-x-2" onSubmit={(e) => e.preventDefault()}>
            <Input placeholder="Type a message..." className="flex-1" />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </footer>
      </main>
    </div>
  )
}

