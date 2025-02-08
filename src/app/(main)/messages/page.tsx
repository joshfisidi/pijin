"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"
import { format } from "date-fns"
import { Heart, ThumbsUp, Smile, Send } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type Contact = {
  id: number
  name: string
  avatar: string
  status: "online" | "offline"
  lastSeen?: Date
}

type Reaction = {
  emoji: string
  count: number
  users: string[]
}

type Message = {
  id: string
  text: string
  sender: string
  timestamp: Date
  read: boolean
  reactions: Reaction[]
}

const contacts: Contact[] = [
  { id: 1, name: "Alice", avatar: "/placeholder.svg?height=32&width=32", status: "online" },
  { id: 2, name: "Bob", avatar: "/placeholder.svg?height=32&width=32", status: "offline", lastSeen: new Date() },
  { id: 3, name: "Charlie", avatar: "/placeholder.svg?height=32&width=32", status: "online" },
]

const TYPING_TIMEOUT = 3000

export default function Home() {
  const [selectedContact, setSelectedContact] = useState<Contact>(() => {
    const initial = contacts[0];
    if (!initial) {
      throw new Error("No contacts available");
    }
    return initial;
  })
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  
  const simulateReceiveMessage = useCallback((text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: selectedContact.name,
      timestamp: new Date(),
      read: false,
      reactions: [],
    }
    setMessages(prev => [...prev, newMessage])
  }, [selectedContact.name])

  // Simulate contact typing
  useEffect(() => {
    const randomTyping = () => {
      const shouldType = Math.random() > 0.7
      if (shouldType) {
        setIsTyping(true)
        setTimeout(() => {
          setIsTyping(false)
          const randomResponses = [
            "Sure, that sounds good!",
            "Thanks for letting me know.",
            "I'll get back to you soon.",
          ]
          const randomResponse = randomResponses[Math.floor(Math.random() * randomResponses.length)]
          if (randomResponse) {
            simulateReceiveMessage(randomResponse)
          }
        }, TYPING_TIMEOUT)
      }
    }

    const typingInterval = setInterval(randomTyping, 10000)
    return () => clearInterval(typingInterval)
  }, [selectedContact, simulateReceiveMessage])

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputMessage,
        sender: "user",
        timestamp: new Date(),
        read: true,
        reactions: [],
      }
      setMessages(prev => [...prev, newMessage])
      setInputMessage("")
    }
  }

  const addReaction = (messageId: string, emoji: string) => {
    setMessages(prev => 
      prev.map(message => {
        if (message.id === messageId) {
          const existingReactionIndex = message.reactions.findIndex(r => r.emoji === emoji)
          if (existingReactionIndex > -1) {
            const updatedReactions = [...message.reactions]
            const existingReaction = updatedReactions[existingReactionIndex]
            if (existingReaction) {
              updatedReactions[existingReactionIndex] = {
                emoji,
                count: existingReaction.count + 1,
                users: [...existingReaction.users, "user"]
              }
            }
            return { ...message, reactions: updatedReactions }
          } else {
            return {
              ...message,
              reactions: [...message.reactions, { emoji, count: 1, users: ["user"] }]
            }
          }
        }
        return message
      })
    )
  }

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="flex h-screen overflow-hidden bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-full max-w-xs border-r border-border flex flex-col">
        <div className="p-4 flex justify-between items-center border-b border-border">
          <h1 className="text-xl font-bold">Contacts</h1>
          <ModeToggle />
        </div>
        <div className="px-4 py-2 border-b border-border">
          <Input
            type="search"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <ScrollArea className="flex-grow">
          {filteredContacts.map((contact) => (
            <Button
              key={contact.id}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setSelectedContact(contact)}
            >
              <div className="relative">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={contact.avatar} alt={contact.name} />
                  <AvatarFallback>{contact.name[0]}</AvatarFallback>
                </Avatar>
                <span
                  className={`absolute bottom-0 right-1 h-3 w-3 rounded-full ${
                    contact.status === "online" ? "bg-green-500" : "bg-gray-500"
                  }`}
                />
              </div>
              <div className="flex flex-col items-start">
                <span>{contact.name}</span>
                {contact.status === "offline" && contact.lastSeen && (
                  <span className="text-xs text-muted-foreground">
                    Last seen: {format(contact.lastSeen, "HH:mm")}
                  </span>
                )}
              </div>
            </Button>
          ))}
        </ScrollArea>
      </aside>

      {/* Main chat area */}
      <section className="flex-1 flex flex-col min-w-0">
        <header className="p-4 border-b border-border shrink-0">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
              <AvatarFallback>{selectedContact.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{selectedContact.name}</h2>
              <span className="text-sm text-muted-foreground">
                {selectedContact.status === "online" ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        </header>
        <ScrollArea className="flex-grow p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col ${message.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <p>{message.text}</p>
                  <div className="text-xs opacity-70 mt-1">
                    {format(message.timestamp, "HH:mm")}
                    {message.sender === "user" && (
                      <span className="ml-2">{message.read ? "✓✓" : "✓"}</span>
                    )}
                  </div>
                </div>
                {message.reactions.length > 0 && (
                  <div className="flex gap-1 mt-1">
                    {message.reactions.map((reaction, index) => (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger>
                            <span className="bg-secondary rounded-full px-2 py-1 text-xs">
                              {reaction.emoji} {reaction.count}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            {reaction.users.join(", ")}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                )}
                {message.sender !== "user" && (
                  <div className="flex gap-1 mt-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => addReaction(message.id, "❤️")}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => addReaction(message.id, "👍")}
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => addReaction(message.id, "😊")}
                    >
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
          {isTyping && (
            <div className="text-sm text-muted-foreground mt-2">
              {selectedContact.name} is typing...
            </div>
          )}
        </ScrollArea>
        <footer className="p-4 border-t border-border shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage()
            }}
            className="flex gap-2"
          >
            <Input
              type="text"
              placeholder="Type a message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </footer>
      </section>
    </main>
  )
}