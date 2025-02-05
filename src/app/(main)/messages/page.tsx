"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Send, Menu, Phone, Video, Info, X } from "lucide-react"

interface Conversation {
  id: number
  name: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
}

interface Message {
  id: number
  sender: string
  content: string
  time: string
}

const conversations: Conversation[] = [
  { id: 1, name: "Alice Johnson", lastMessage: "Hey, how are you?", time: "2m ago", unread: 2, online: true },
  { id: 2, name: "Bob Smith", lastMessage: "Can we meet tomorrow?", time: "1h ago", unread: 0, online: false },
  { id: 3, name: "Charlie Brown", lastMessage: "Thanks for your help!", time: "3h ago", unread: 1, online: true },
  // Add more conversations as needed
]

const messages: Message[] = [
  { id: 1, sender: "Alice Johnson", content: "Hey, how are you?", time: "2:30 PM" },
  { id: 2, sender: "You", content: "I'm good, thanks! How about you?", time: "2:31 PM" },
  { id: 3, sender: "Alice Johnson", content: "Doing well! Just wanted to catch up.", time: "2:32 PM" },
  // Add more messages as needed
]

export default function DirectMessages() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(() => {
    const initial = conversations[0];
    if (!initial) {
      throw new Error("No conversations available");
    }
    return initial;
  });
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    // Add message handling logic here
    setNewMessage("")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
  }

  if (!selectedConversation) {
    return <div className="h-screen flex items-center justify-center">No conversation selected</div>
  }

  return (
    <div className="h-screen flex flex-col lg:flex-row">
      {/* Conversation List */}
      <aside className={`lg:w-80 border-r ${showMobileMenu ? "block" : "hidden"} lg:block`}>
        <div className="p-4 font-semibold text-lg flex items-center justify-between">
          <span>Messages</span>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setShowMobileMenu(false)}>
            <X className="h-6 w-6" />
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
                setShowMobileMenu(false)
              }}
            >
              <Avatar>
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${conversation.name}`} />
                <AvatarFallback>
                  {getInitials(conversation.name)}
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
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        <header className="border-b p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setShowMobileMenu(true)}>
              <Menu className="h-6 w-6" />
            </Button>
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.name}`} />
              <AvatarFallback>
                {getInitials(selectedConversation.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">{selectedConversation.name}</h2>
              <p className="text-sm text-muted-foreground">{selectedConversation.online ? "Online" : "Offline"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setShowDetails(!showDetails)}>
              <Info className="h-5 w-5" />
            </Button>
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
          <form className="flex space-x-2" onSubmit={handleSendMessage}>
            <Input placeholder="Type a message..." className="flex-1" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </footer>
      </main>

      {/* Details Panel */}
      <aside className={`lg:w-80 border-l ${showDetails ? "block" : "hidden"} lg:block`}>
        <div className="p-4">
          <div className="text-center mb-6">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedConversation.name}`} />
              <AvatarFallback>
                {getInitials(selectedConversation.name)}
              </AvatarFallback>
            </Avatar>
            <h2 className="font-semibold text-xl">{selectedConversation.name}</h2>
            <p className="text-sm text-muted-foreground">{selectedConversation.online ? "Online" : "Offline"}</p>
          </div>
          <Separator className="my-4" />
          <div className="space-y-4">
            <h3 className="font-semibold">Shared Files</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">document.pdf</li>
              <li className="text-sm text-muted-foreground">image.jpg</li>
            </ul>
          </div>
          <Separator className="my-4" />
          <div className="space-y-4">
            <h3 className="font-semibold">Shared Links</h3>
            <ul className="space-y-2">
              <li className="text-sm text-blue-500 hover:underline">https://example.com</li>
              <li className="text-sm text-blue-500 hover:underline">https://anotherlink.com</li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  )
}

